"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Ikon } from "@/components/ikonlar";
import { DERS_MAP, HOCALAR } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useIstemciHazir, useOgrenciYayin, useSorguParam } from "@/lib/yayin";

export default function OgrenciYayinOdasi() {
  const { canliDersler, kullanici, dersKatil } = useStore();
  const okundu = useIstemciHazir();
  const dersId = useSorguParam("d");
  const [sohbetMetni, setSohbetMetni] = useState("");
  const sohbetSonu = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const ders = canliDersler.find((d) => d.id === dersId) ?? null;
  const yayin = useOgrenciYayin(ders?.id ?? null, kullanici?.id ?? "misafir", kullanici?.ad ?? "Ördek", videoRef);

  useEffect(() => {
    sohbetSonu.current?.scrollIntoView({ behavior: "smooth" });
  }, [yayin.sohbet]);

  if (!okundu || !kullanici) return null;

  if (!ders) {
    return (
      <div className="card p-10 text-center">
        <p className="baslik text-lg">Yayın bulunamadı</p>
        <Link href="/panel/online-derslerim" className="btn btn-amber btn-md mt-4">← Online Derslerim</Link>
      </div>
    );
  }

  const dersBilgi = DERS_MAP[ders.ders];
  const hoca = HOCALAR.find((h) => h.id === ders.hocaId);
  const canliMi = ders.durum === "canli";

  // yayın hiç başlamadıysa / bittiyse
  if (!canliMi && yayin.asama === "bekliyor") {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card p-8 text-center">
          <Ikon ad="canli" boy={52} className="mx-auto opacity-40" />
          <h1 className="baslik mt-3 text-xl">Yayın şu an açık değil</h1>
          <p className="mt-2 text-sm text-ink/60">
            "{ders.baslik}" başladığında sana bildirim gelecek ve buradan katılabileceksin.
            Geçmiş yayınlar Ders Tekrarlarım'da, vak!
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/panel/online-derslerim" className="btn btn-amber btn-md">← Online Derslerim</Link>
            <Link href="/panel/tekrarlarim" className="btn btn-ghost btn-md">Ders Tekrarlarım</Link>
          </div>
        </div>
      </div>
    );
  }

  const katil = () => {
    yayin.baglan();
    dersKatil(ders.id);
  };

  const sohbetYolla = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sohbetMetni.trim()) return;
    yayin.sohbetGonder(sohbetMetni.trim());
    setSohbetMetni("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="baslik flex items-center gap-2.5 text-2xl">
            <Ikon ad="canli" boy={28} /> {ders.baslik}
            {yayin.asama === "izliyor" && (
              <span className="chip bg-red-500 text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> CANLI
              </span>
            )}
          </h1>
          <p className="mt-0.5 text-sm text-ink/60">
            {dersBilgi?.ad ?? "Genel"} · {hoca?.ad ?? "—"} · {yayin.katilimciSayisi} katılımcı
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
        {/* Video */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-3xl bg-lacivert-koyu shadow-lg">
            <video ref={videoRef} playsInline className="aspect-video w-full object-contain" />

            {yayin.asama === "bekliyor" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-lacivert-koyu/80 p-6 text-center">
                <Ikon ad="canli" boy={52} />
                <p className="max-w-sm text-sm text-white/75">
                  Derse katılmaya hazır mısın? Mikrofon izni istenecek — hocan söz verene kadar
                  kapalı kalır, merak etme.
                </p>
                <button onClick={katil} className="btn btn-amber btn-lg">
                  <Ikon ad="oynat" boy={18} /> Yayına Bağlan
                </button>
              </div>
            )}

            {yayin.asama === "baglaniyor" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-lacivert-koyu/80 text-center">
                <Ikon ad="vak" boy={44} className="animate-bob" />
                <p className="text-sm font-bold text-white/80">
                  {yayin.ogretmenVar ? "Hocana bağlanıyoruz..." : "Hoca gölde görünene kadar bekliyoruz..."}
                </p>
              </div>
            )}

            {yayin.asama === "bitti" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-lacivert-koyu/90 p-6 text-center">
                <Ikon ad="tik" boy={48} className="sicra" />
                <p className="baslik text-lg text-white">Yayın sona erdi — vak vak!</p>
                <p className="text-xs text-white/60">Kaydı birazdan Ders Tekrarlarım'da bulabilirsin.</p>
                <Link href="/panel/tekrarlarim" className="btn btn-amber btn-md mt-1">Ders Tekrarlarım</Link>
              </div>
            )}

            {yayin.asama === "hata" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-lacivert-koyu/90 p-6 text-center">
                <p className="text-sm font-bold text-red-300">{yayin.hata}</p>
                <button onClick={() => window.location.reload()} className="btn btn-amber btn-md">Yeniden dene</button>
              </div>
            )}

            {yayin.asama === "izliyor" && (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
                {yayin.mikrofonVar && !yayin.sozVerildi && (
                  <button onClick={yayin.elToggle}
                    className={`btn btn-sm ${yayin.elKaldirdi ? "bg-amber text-lacivert-koyu" : "bg-white/90 text-lacivert"}`}>
                    <Ikon ad="el" boy={14} /> {yayin.elKaldirdi ? "El kaldırdın" : "El kaldır"}
                  </button>
                )}
                {yayin.sozVerildi && (
                  <>
                    <span className="chip bg-amber text-lacivert-koyu">🎙 Söz sende — mikrofonun açık!</span>
                    <button onClick={yayin.mikrofonKapat} className="btn btn-sm bg-red-500 text-white">
                      Mikrofonu kapat
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sohbet */}
        <div className="card flex min-h-0 flex-col p-4">
          <h2 className="baslik flex items-center gap-2 text-sm">
            <Ikon ad="forum" boy={17} /> Ders Sohbeti
          </h2>
          <div className="mt-2 max-h-80 min-h-40 flex-1 space-y-2 overflow-y-auto">
            {yayin.sohbet.length === 0 && (
              <p className="text-xs text-ink/45">Henüz mesaj yok — soru sormaktan çekinme, vak!</p>
            )}
            {yayin.sohbet.map((m) => (
              <p key={m.id} className="text-xs">
                <span className={`font-bold ${m.rol === "ogretmen" ? "text-amber-deep" : "text-lacivert"}`}>
                  {m.rol === "ogretmen" ? "👨‍🏫 " : ""}{m.ad}:
                </span>{" "}
                <span className="text-ink/75">{m.metin}</span>
              </p>
            ))}
            <div ref={sohbetSonu} />
          </div>
          <form onSubmit={sohbetYolla} className="mt-2 flex gap-2">
            <input className="input flex-1 !py-2 text-sm" placeholder="Soru sor / mesaj yaz..."
              value={sohbetMetni} onChange={(e) => setSohbetMetni(e.target.value)}
              disabled={yayin.asama !== "izliyor"} />
            <button type="submit" className="btn btn-lacivert btn-sm" disabled={yayin.asama !== "izliyor"}>
              <Ikon ad="gonder" boy={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
