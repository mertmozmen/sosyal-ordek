"use client";

// Canlı yayın altyapısı: WebRTC (yıldız topoloji — öğretmen her öğrenciye ayrı
// bağlantı açar) + Supabase Realtime broadcast (sinyalleşme) + presence
// (katılımcı listesi / el kaldırma). Harici servis yok.

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const bosAbonelik = () => () => {};

/** URL sorgu parametresini hidrasyon-güvenli okur (statik export uyumlu). */
export function useSorguParam(anahtar: string): string | null {
  return useSyncExternalStore(
    bosAbonelik,
    () => new URLSearchParams(window.location.search).get(anahtar),
    () => null
  );
}

/** İstemcide hidrasyon tamamlandı mı? (SSR çıktısında false) */
export function useIstemciHazir(): boolean {
  return useSyncExternalStore(
    bosAbonelik,
    () => true,
    () => false
  );
}

const RTC_AYAR: RTCConfiguration = {
  iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }],
};

export type Katilimci = { id: string; ad: string; el: boolean };
export type SohbetMesaji = { id: string; ad: string; rol: "ogretmen" | "ogrenci"; metin: string };

type PresenceYuku = { ad: string; rol: "ogretmen" | "ogrenci"; el: boolean };

function mesajId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function katilimcilariCoz(kanal: RealtimeChannel): { liste: Katilimci[]; ogretmenVar: boolean } {
  const durum = kanal.presenceState<PresenceYuku>();
  const liste: Katilimci[] = [];
  let ogretmenVar = false;
  for (const [anahtar, girisler] of Object.entries(durum)) {
    const yuk = girisler[0];
    if (!yuk) continue;
    if (yuk.rol === "ogretmen") ogretmenVar = true;
    else liste.push({ id: anahtar, ad: yuk.ad, el: !!yuk.el });
  }
  return { liste, ogretmenVar };
}

/* ------------------------------------------------------------------ */
/* ÖĞRETMEN                                                            */
/* ------------------------------------------------------------------ */

export type OgretmenDurum = "hazir" | "yayinda" | "bitiriliyor" | "bitti";

export function useOgretmenYayin(
  dersId: string | null,
  ogretmenAd: string,
  onizlemeRef: RefObject<HTMLVideoElement | null>
) {
  const [durum, setDurum] = useState<OgretmenDurum>("hazir");
  const [hata, setHata] = useState("");
  const [katilimcilar, setKatilimcilar] = useState<Katilimci[]>([]);
  const [sohbet, setSohbet] = useState<SohbetMesaji[]>([]);
  const [sozVerilenler, setSozVerilenler] = useState<Record<string, boolean>>({});
  const [ekranPaylasimda, setEkranPaylasimda] = useState(false);
  const [mikrofonAcik, setMikrofonAcik] = useState(true);
  const [kameraAcik, setKameraAcik] = useState(true);

  const kanalRef = useRef<RealtimeChannel | null>(null);
  const kameraRef = useRef<MediaStream | null>(null);
  const ekranRef = useRef<MediaStream | null>(null);
  const pcler = useRef<Map<string, RTCPeerConnection>>(new Map());
  const ogrenciSesleri = useRef<Map<string, HTMLAudioElement>>(new Map());

  // kayıt (Faz 5): tuval birleştirici — kamera/ekran geçişinde kesintisiz
  const kayitci = useRef<MediaRecorder | null>(null);
  const parcalar = useRef<Blob[]>([]);
  const cizimIptal = useRef<number | null>(null);
  const sesBaglami = useRef<AudioContext | null>(null);
  const baslamaZamani = useRef(0);

  const aktifVideoTrack = useCallback((): MediaStreamTrack | null => {
    const akis = ekranRef.current ?? kameraRef.current;
    return akis?.getVideoTracks()[0] ?? null;
  }, []);

  const teklifOlustur = useCallback(
    async (ogrenciId: string) => {
      const kanal = kanalRef.current;
      const kamera = kameraRef.current;
      if (!kanal || !kamera) return;
      const eski = pcler.current.get(ogrenciId);
      if (eski && ["new", "connecting", "connected"].includes(eski.connectionState)) return;
      eski?.close();

      const pc = new RTCPeerConnection(RTC_AYAR);
      pcler.current.set(ogrenciId, pc);

      const video = aktifVideoTrack();
      const ses = kamera.getAudioTracks()[0];
      const paket = new MediaStream();
      if (video) pc.addTrack(video, paket);
      if (ses) pc.addTrack(ses, paket);

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          kanal.send({
            type: "broadcast",
            event: "aday",
            payload: { hedef: ogrenciId, yon: "ogrenciye", aday: e.candidate.toJSON() },
          });
        }
      };
      // öğrencinin mikrofonu (söz verilince açılır)
      pc.ontrack = (e) => {
        if (e.track.kind !== "audio") return;
        let el = ogrenciSesleri.current.get(ogrenciId);
        if (!el) {
          el = new Audio();
          el.autoplay = true;
          ogrenciSesleri.current.set(ogrenciId, el);
        }
        el.srcObject = e.streams[0] ?? new MediaStream([e.track]);
        el.play().catch(() => {});
      };

      const teklif = await pc.createOffer();
      await pc.setLocalDescription(teklif);
      kanal.send({
        type: "broadcast",
        event: "teklif",
        payload: { hedef: ogrenciId, sdp: pc.localDescription },
      });
    },
    [aktifVideoTrack]
  );

  const kayitBaslat = useCallback(() => {
    const tuval = document.createElement("canvas");
    tuval.width = 1280;
    tuval.height = 720;
    const cizici = tuval.getContext("2d");
    if (!cizici) return;

    const ciz = () => {
      const v = onizlemeRef.current;
      cizici.fillStyle = "#16304F";
      cizici.fillRect(0, 0, tuval.width, tuval.height);
      if (v && v.videoWidth > 0) {
        const oran = Math.min(tuval.width / v.videoWidth, tuval.height / v.videoHeight);
        const g = v.videoWidth * oran;
        const y = v.videoHeight * oran;
        cizici.drawImage(v, (tuval.width - g) / 2, (tuval.height - y) / 2, g, y);
      }
      cizimIptal.current = requestAnimationFrame(ciz);
    };
    ciz();

    const baglam = new AudioContext();
    sesBaglami.current = baglam;
    const hedefSes = baglam.createMediaStreamDestination();
    const mikrofon = kameraRef.current?.getAudioTracks()[0];
    if (mikrofon) {
      baglam.createMediaStreamSource(new MediaStream([mikrofon])).connect(hedefSes);
    }

    const akis = new MediaStream([
      ...tuval.captureStream(24).getVideoTracks(),
      ...hedefSes.stream.getAudioTracks(),
    ]);
    try {
      const mr = new MediaRecorder(akis, {
        mimeType: "video/webm;codecs=vp8,opus",
        videoBitsPerSecond: 1_200_000,
      });
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) parcalar.current.push(e.data);
      };
      mr.start(1000);
      kayitci.current = mr;
    } catch {
      // kayıt desteklenmiyorsa yayın kayıtsız sürer
      kayitci.current = null;
    }
  }, [onizlemeRef]);

  const yayinBaslat = useCallback(async (): Promise<boolean> => {
    if (!dersId) return false;
    setHata("");
    let kamera: MediaStream;
    try {
      kamera = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
    } catch {
      setHata("Kamera/mikrofon izni alınamadı. Tarayıcı izinlerini kontrol et.");
      return false;
    }
    kameraRef.current = kamera;
    if (onizlemeRef.current) {
      onizlemeRef.current.srcObject = kamera;
      onizlemeRef.current.play().catch(() => {});
    }

    const kanal = supabase.channel(`yayin-${dersId}`, {
      config: { presence: { key: "ogretmen" } },
    });
    kanalRef.current = kanal;

    kanal
      .on("presence", { event: "sync" }, () => {
        setKatilimcilar(katilimcilariCoz(kanal).liste);
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        (newPresences as unknown as (PresenceYuku & { presence_ref: string })[]).forEach((p) => {
          // presence anahtarını sync'ten okuyacağız; teklif istek eventiyle de gelir
          void p;
        });
      })
      .on("presence", { event: "leave" }, () => {
        const kalanlar = new Set(Object.keys(kanal.presenceState()));
        pcler.current.forEach((pc, id) => {
          if (!kalanlar.has(id)) {
            pc.close();
            pcler.current.delete(id);
            ogrenciSesleri.current.get(id)?.pause();
            ogrenciSesleri.current.delete(id);
          }
        });
        setKatilimcilar(katilimcilariCoz(kanal).liste);
      })
      .on("broadcast", { event: "istek" }, ({ payload }) => {
        const p = payload as { ogrenciId: string };
        teklifOlustur(p.ogrenciId).catch(() => {});
      })
      .on("broadcast", { event: "cevap" }, ({ payload }) => {
        const p = payload as { ogrenciId: string; sdp: RTCSessionDescriptionInit };
        const pc = pcler.current.get(p.ogrenciId);
        if (pc && pc.signalingState === "have-local-offer") {
          pc.setRemoteDescription(p.sdp).catch(() => {});
        }
      })
      .on("broadcast", { event: "aday" }, ({ payload }) => {
        const p = payload as { yon: string; ogrenciId?: string; aday: RTCIceCandidateInit };
        if (p.yon !== "ogretmene" || !p.ogrenciId) return;
        pcler.current.get(p.ogrenciId)?.addIceCandidate(p.aday).catch(() => {});
      })
      .on("broadcast", { event: "sohbet" }, ({ payload }) => {
        setSohbet((o) => [...o, payload as SohbetMesaji]);
      });

    const abonelik = await new Promise<boolean>((coz) => {
      kanal.subscribe((s) => {
        if (s === "SUBSCRIBED") coz(true);
        if (s === "CHANNEL_ERROR" || s === "TIMED_OUT") coz(false);
      });
    });
    if (!abonelik) {
      setHata("Yayın kanalına bağlanılamadı. İnternetini kontrol edip tekrar dene.");
      kamera.getTracks().forEach((t) => t.stop());
      return false;
    }
    await kanal.track({ ad: ogretmenAd, rol: "ogretmen", el: false } satisfies PresenceYuku);

    kayitBaslat();
    baslamaZamani.current = Date.now();
    setDurum("yayinda");
    return true;
  }, [dersId, ogretmenAd, kayitBaslat, teklifOlustur, onizlemeRef]);

  const ekranToggle = useCallback(async () => {
    const kanal = kanalRef.current;
    if (!kanal || !kameraRef.current) return;
    const kameraVideo = kameraRef.current.getVideoTracks()[0] ?? null;

    const videoyuDegistir = (track: MediaStreamTrack | null) => {
      pcler.current.forEach((pc) => {
        const gonderici = pc.getSenders().find((s) => s.track?.kind === "video");
        if (gonderici && track) gonderici.replaceTrack(track).catch(() => {});
      });
      if (onizlemeRef.current && track) {
        onizlemeRef.current.srcObject = new MediaStream(
          [track, ...(kameraRef.current?.getAudioTracks() ?? [])].filter(Boolean)
        );
        onizlemeRef.current.play().catch(() => {});
      }
    };

    if (!ekranRef.current) {
      try {
        const ekran = await navigator.mediaDevices.getDisplayMedia({ video: true });
        ekranRef.current = ekran;
        const track = ekran.getVideoTracks()[0];
        track.onended = () => {
          ekranRef.current = null;
          setEkranPaylasimda(false);
          videoyuDegistir(kameraVideo);
        };
        videoyuDegistir(track);
        setEkranPaylasimda(true);
      } catch {
        /* kullanıcı vazgeçti */
      }
    } else {
      ekranRef.current.getTracks().forEach((t) => t.stop());
      ekranRef.current = null;
      videoyuDegistir(kameraVideo);
      setEkranPaylasimda(false);
    }
  }, [onizlemeRef]);

  const mikrofonToggle = useCallback(() => {
    const track = kameraRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMikrofonAcik(track.enabled);
  }, []);

  const kameraToggle = useCallback(() => {
    const track = kameraRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setKameraAcik(track.enabled);
  }, []);

  const sozVer = useCallback((ogrenciId: string, izin: boolean) => {
    setSozVerilenler((o) => ({ ...o, [ogrenciId]: izin }));
    kanalRef.current?.send({ type: "broadcast", event: "soz", payload: { ogrenciId, izin } });
  }, []);

  const sohbetGonder = useCallback(
    (metin: string) => {
      const mesaj: SohbetMesaji = { id: mesajId(), ad: ogretmenAd, rol: "ogretmen", metin };
      setSohbet((o) => [...o, mesaj]);
      kanalRef.current?.send({ type: "broadcast", event: "sohbet", payload: mesaj });
    },
    [ogretmenAd]
  );

  const temizle = useCallback(() => {
    if (cizimIptal.current) cancelAnimationFrame(cizimIptal.current);
    sesBaglami.current?.close().catch(() => {});
    pcler.current.forEach((pc) => pc.close());
    pcler.current.clear();
    ogrenciSesleri.current.forEach((el) => el.pause());
    ogrenciSesleri.current.clear();
    kameraRef.current?.getTracks().forEach((t) => t.stop());
    ekranRef.current?.getTracks().forEach((t) => t.stop());
    kameraRef.current = null;
    ekranRef.current = null;
    if (kanalRef.current) supabase.removeChannel(kanalRef.current);
    kanalRef.current = null;
  }, []);

  const yayinBitir = useCallback(async (): Promise<{ blob: Blob | null; sureDk: number }> => {
    setDurum("bitiriliyor");
    kanalRef.current?.send({ type: "broadcast", event: "yayin-bitti", payload: {} });

    let blob: Blob | null = null;
    const mr = kayitci.current;
    if (mr && mr.state !== "inactive") {
      await new Promise<void>((coz) => {
        mr.onstop = () => coz();
        mr.stop();
      });
    }
    if (parcalar.current.length) {
      blob = new Blob(parcalar.current, { type: "video/webm" });
      parcalar.current = [];
    }
    const sureDk = Math.max(1, Math.round((Date.now() - baslamaZamani.current) / 60_000));
    temizle();
    setDurum("bitti");
    return { blob, sureDk };
  }, [temizle]);

  // sayfadan çıkılırsa her şeyi bırak
  useEffect(() => temizle, [temizle]);

  return {
    durum,
    hata,
    katilimcilar,
    sohbet,
    sozVerilenler,
    ekranPaylasimda,
    mikrofonAcik,
    kameraAcik,
    yayinBaslat,
    yayinBitir,
    ekranToggle,
    mikrofonToggle,
    kameraToggle,
    sozVer,
    sohbetGonder,
  };
}

/* ------------------------------------------------------------------ */
/* ÖĞRENCİ                                                             */
/* ------------------------------------------------------------------ */

export type OgrenciAsama = "bekliyor" | "baglaniyor" | "izliyor" | "bitti" | "hata";

export function useOgrenciYayin(
  dersId: string | null,
  kullaniciId: string,
  ad: string,
  videoRef: RefObject<HTMLVideoElement | null>
) {
  const [asama, setAsama] = useState<OgrenciAsama>("bekliyor");
  const [hata, setHata] = useState("");
  const [katilimciSayisi, setKatilimciSayisi] = useState(0);
  const [ogretmenVar, setOgretmenVar] = useState(false);
  const [sohbet, setSohbet] = useState<SohbetMesaji[]>([]);
  const [elKaldirdi, setElKaldirdi] = useState(false);
  const [sozVerildi, setSozVerildi] = useState(false);
  const [mikrofonVar, setMikrofonVar] = useState(false);

  const kanalRef = useRef<RealtimeChannel | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const mikrofonRef = useRef<MediaStream | null>(null);
  const bekleyenAdaylar = useRef<RTCIceCandidateInit[]>([]);
  const elRef = useRef(false);

  const baglan = useCallback(async () => {
    if (!dersId) return;
    setAsama("baglaniyor");
    setHata("");

    // mikrofon: söz hakkı için baştan (kapalı) eklenir; izin yoksa sadece izler
    try {
      const mik = await navigator.mediaDevices.getUserMedia({ audio: true });
      mik.getAudioTracks().forEach((t) => (t.enabled = false));
      mikrofonRef.current = mik;
      setMikrofonVar(true);
    } catch {
      setMikrofonVar(false);
    }

    const kanal = supabase.channel(`yayin-${dersId}`, {
      config: { presence: { key: kullaniciId } },
    });
    kanalRef.current = kanal;

    kanal
      .on("presence", { event: "sync" }, () => {
        const { liste, ogretmenVar: hoca } = katilimcilariCoz(kanal);
        setKatilimciSayisi(liste.length);
        setOgretmenVar(hoca);
      })
      .on("broadcast", { event: "teklif" }, async ({ payload }) => {
        const p = payload as { hedef: string; sdp: RTCSessionDescriptionInit };
        if (p.hedef !== kullaniciId) return;

        pcRef.current?.close();
        const pc = new RTCPeerConnection(RTC_AYAR);
        pcRef.current = pc;

        const mikTrack = mikrofonRef.current?.getAudioTracks()[0];
        if (mikTrack) pc.addTrack(mikTrack, mikrofonRef.current!);

        pc.ontrack = (e) => {
          const v = videoRef.current;
          if (!v) return;
          v.srcObject = e.streams[0] ?? new MediaStream([e.track]);
          v.play().catch(() => {});
        };
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            kanal.send({
              type: "broadcast",
              event: "aday",
              payload: { yon: "ogretmene", ogrenciId: kullaniciId, aday: e.candidate.toJSON() },
            });
          }
        };
        pc.onconnectionstatechange = () => {
          if (pc.connectionState === "connected") setAsama("izliyor");
          if (pc.connectionState === "failed") {
            setHata("Bağlantı kurulamadı. Sayfayı yenileyip tekrar dene.");
            setAsama("hata");
          }
        };

        await pc.setRemoteDescription(p.sdp);
        bekleyenAdaylar.current.forEach((a) => pc.addIceCandidate(a).catch(() => {}));
        bekleyenAdaylar.current = [];
        const cevap = await pc.createAnswer();
        await pc.setLocalDescription(cevap);
        kanal.send({
          type: "broadcast",
          event: "cevap",
          payload: { ogrenciId: kullaniciId, sdp: pc.localDescription },
        });
      })
      .on("broadcast", { event: "aday" }, ({ payload }) => {
        const p = payload as { hedef?: string; yon: string; aday: RTCIceCandidateInit };
        if (p.yon !== "ogrenciye" || p.hedef !== kullaniciId) return;
        const pc = pcRef.current;
        if (pc?.remoteDescription) pc.addIceCandidate(p.aday).catch(() => {});
        else bekleyenAdaylar.current.push(p.aday);
      })
      .on("broadcast", { event: "soz" }, ({ payload }) => {
        const p = payload as { ogrenciId: string; izin: boolean };
        if (p.ogrenciId !== kullaniciId) return;
        setSozVerildi(p.izin);
        mikrofonRef.current?.getAudioTracks().forEach((t) => (t.enabled = p.izin));
        if (!p.izin) {
          setElKaldirdi(false);
          elRef.current = false;
          kanalRef.current?.track({ ad, rol: "ogrenci", el: false } satisfies PresenceYuku).catch(() => {});
        }
      })
      .on("broadcast", { event: "sohbet" }, ({ payload }) => {
        setSohbet((o) => [...o, payload as SohbetMesaji]);
      })
      .on("broadcast", { event: "yayin-bitti" }, () => {
        setAsama("bitti");
        pcRef.current?.close();
        pcRef.current = null;
      });

    const abonelik = await new Promise<boolean>((coz) => {
      kanal.subscribe((s) => {
        if (s === "SUBSCRIBED") coz(true);
        if (s === "CHANNEL_ERROR" || s === "TIMED_OUT") coz(false);
      });
    });
    if (!abonelik) {
      setHata("Yayın kanalına bağlanılamadı. İnternetini kontrol et.");
      setAsama("hata");
      return;
    }
    await kanal.track({ ad, rol: "ogrenci", el: false } satisfies PresenceYuku);
    kanal.send({ type: "broadcast", event: "istek", payload: { ogrenciId: kullaniciId, ad } });
  }, [dersId, kullaniciId, ad, videoRef]);

  const elToggle = useCallback(() => {
    const yeni = !elRef.current;
    elRef.current = yeni;
    setElKaldirdi(yeni);
    kanalRef.current?.track({ ad, rol: "ogrenci", el: yeni } satisfies PresenceYuku).catch(() => {});
  }, [ad]);

  const mikrofonKapat = useCallback(() => {
    setSozVerildi(false);
    mikrofonRef.current?.getAudioTracks().forEach((t) => (t.enabled = false));
  }, []);

  const sohbetGonder = useCallback(
    (metin: string) => {
      const mesaj: SohbetMesaji = { id: mesajId(), ad, rol: "ogrenci", metin };
      setSohbet((o) => [...o, mesaj]);
      kanalRef.current?.send({ type: "broadcast", event: "sohbet", payload: mesaj });
    },
    [ad]
  );

  // ayrılınca temizle
  useEffect(() => {
    return () => {
      pcRef.current?.close();
      mikrofonRef.current?.getTracks().forEach((t) => t.stop());
      if (kanalRef.current) supabase.removeChannel(kanalRef.current);
    };
  }, []);

  return {
    asama,
    hata,
    katilimciSayisi,
    ogretmenVar,
    sohbet,
    elKaldirdi,
    sozVerildi,
    mikrofonVar,
    baglan,
    elToggle,
    mikrofonKapat,
    sohbetGonder,
  };
}
