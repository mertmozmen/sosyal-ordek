"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "./supabase";
import {
  CANLI_DERSLER,
  FORUM_KATEGORILER,
  FORUM_SEED,
  GOREV_MAP,
  HAFTALAR,
  SORU_OTURUMLARI,
  TEKRARLAR,
  VAK_SEVIYELER,
  asamaBul,
  tamamlananHaftaSayisi,
  type CanliDers,
  type DersId,
  type ForumBaslik,
  type ForumKategori,
  type Tekrar,
} from "./data";

export type Kullanici = {
  id: string;
  ad: string;
  email: string;
  sinif: string;
  veliTel: string;
  avatarRenk: string;
  kayitTarihi: string;
  hedefHaftalikSoru: number;
  bildirimDers: boolean;
  bildirimForum: boolean;
  rol: "ogrenci" | "yonetici";
};

export type GunlukAktivite = { soru: number; dakika: number; gorev: number };

export type Ilerleme = {
  gorevler: Record<string, boolean>;
  tekrarlar: Record<string, boolean>;
  hocaVideolari: Record<string, boolean>;
  katilim: Record<string, boolean>;
  siteDakika: number;
  forumMesaj: number;
  gorulenEvrimler: Record<string, boolean>;
  gunluk: Record<string, GunlukAktivite>;
};

export function gunAnahtari(kaydir = 0): string {
  const t = new Date();
  t.setDate(t.getDate() - kaydir);
  return t.toISOString().slice(0, 10);
}

function gunlukEkle(
  gunluk: Record<string, GunlukAktivite>,
  ek: Partial<GunlukAktivite>
): Record<string, GunlukAktivite> {
  const anahtar = gunAnahtari();
  const mevcut = gunluk[anahtar] ?? { soru: 0, dakika: 0, gorev: 0 };
  return {
    ...gunluk,
    [anahtar]: {
      soru: Math.max(0, mevcut.soru + (ek.soru ?? 0)),
      dakika: Math.max(0, mevcut.dakika + (ek.dakika ?? 0)),
      gorev: Math.max(0, mevcut.gorev + (ek.gorev ?? 0)),
    },
  };
}

export type GorusmeTalebi = {
  id?: string;
  veliAd: string;
  ogrenciAd: string;
  sinif: string;
  telefon: string;
  saat: string;
  not: string;
  tarih?: string;
};

const BOS_ILERLEME: Ilerleme = {
  gorevler: {},
  tekrarlar: {},
  hocaVideolari: {},
  katilim: {},
  siteDakika: 0,
  forumMesaj: 0,
  gorulenEvrimler: {},
  gunluk: {},
};

export const YONETICI_SIFRE = "vakvak2026";
const VARSAYILAN_DERSLER: CanliDers[] = [...CANLI_DERSLER, ...SORU_OTURUMLARI];

/* eslint-disable @typescript-eslint/no-explicit-any */
type Satir = Record<string, any>;

function oku<T>(anahtar: string, varsayilan: T): T {
  try {
    const ham = localStorage.getItem(anahtar);
    return ham ? (JSON.parse(ham) as T) : varsayilan;
  } catch {
    return varsayilan;
  }
}

function yaz(anahtar: string, deger: unknown) {
  try {
    localStorage.setItem(anahtar, JSON.stringify(deger));
  } catch {
    /* demo modunda depolama hatası yut */
  }
}

function ilerlemeFromRow(r: Satir | null): Ilerleme {
  if (!r) return BOS_ILERLEME;
  return {
    gorevler: r.gorevler ?? {},
    tekrarlar: r.tekrarlar ?? {},
    hocaVideolari: r.hoca_videolari ?? {},
    katilim: r.katilim ?? {},
    siteDakika: r.site_dakika ?? 0,
    forumMesaj: r.forum_mesaj ?? 0,
    gorulenEvrimler: r.gorulen_evrimler ?? {},
    gunluk: r.gunluk ?? {},
  };
}

function ilerlemeToRow(userId: string, i: Ilerleme): Satir {
  return {
    user_id: userId,
    gorevler: i.gorevler,
    tekrarlar: i.tekrarlar,
    hoca_videolari: i.hocaVideolari,
    katilim: i.katilim,
    site_dakika: i.siteDakika,
    forum_mesaj: i.forumMesaj,
    gorulen_evrimler: i.gorulenEvrimler,
    gunluk: i.gunluk,
    updated_at: new Date().toISOString(),
  };
}

function kullaniciFromProfil(r: Satir): Kullanici {
  return {
    id: r.id,
    ad: r.ad || "Ördek",
    email: r.email || "",
    sinif: r.sinif || "8. Sınıf",
    veliTel: r.veli_tel || "",
    avatarRenk: r.avatar_renk || "amber",
    kayitTarihi: r.created_at || new Date().toISOString(),
    hedefHaftalikSoru: r.hedef_haftalik_soru ?? 150,
    bildirimDers: r.bildirim_ders ?? true,
    bildirimForum: r.bildirim_forum ?? true,
    rol: r.rol === "yonetici" ? "yonetici" : "ogrenci",
  };
}

function profilToRow(k: Kullanici): Satir {
  return {
    id: k.id,
    ad: k.ad,
    email: k.email,
    sinif: k.sinif,
    veli_tel: k.veliTel,
    avatar_renk: k.avatarRenk,
    hedef_haftalik_soru: k.hedefHaftalikSoru,
    bildirim_ders: k.bildirimDers,
    bildirim_forum: k.bildirimForum,
    rol: k.rol,
  };
}

function dersFromRow(r: Satir): CanliDers {
  return {
    id: r.id,
    baslik: r.baslik,
    ders: r.ders as DersId,
    hocaId: r.hoca_id,
    gun: r.gun,
    saat: r.saat,
    sure: r.sure,
    tur: r.tur,
  };
}

function tekrarFromRow(r: Satir): Tekrar {
  return {
    id: r.id,
    tur: r.tur,
    ders: r.ders as DersId,
    baslik: r.baslik,
    hocaId: r.hoca_id,
    sure: r.sure,
    tarih: r.tarih,
    hafta: r.hafta,
  };
}

function demoIlerlemeUret(): Ilerleme {
  const gorevler: Record<string, boolean> = {};
  HAFTALAR.slice(0, 2).forEach((h) => h.gorevler.forEach((g) => (gorevler[g.id] = true)));
  HAFTALAR[2].gorevler.slice(0, 4).forEach((g) => (gorevler[g.id] = true));
  return {
    gorevler,
    tekrarlar: { "dt-1-mat": true, "dt-1-fen": true, "dt-2-mat": true, "st-1": true, "st-2": true },
    hocaVideolari: { "elif-kaya": true, "burak-demir": true, "zeynep-arslan": true },
    katilim: { "cd-mat": true, "cd-fen": true, "sc-mat": true },
    siteDakika: 412,
    forumMesaj: 3,
    gorulenEvrimler: {},
    gunluk: Object.fromEntries(
      [42, 0, 65, 30, 78, 22, 55, 0, 60, 35, 82, 18, 48, 25].map((soru, i) => [
        gunAnahtari(13 - i),
        { soru, dakika: soru === 0 ? 5 : 25 + soru, gorev: soru === 0 ? 0 : Math.ceil(soru / 20) },
      ])
    ),
  };
}

type OgrenciOzet = { kullanici: Kullanici; ilerleme: Ilerleme };

type Baglam = {
  yuklendi: boolean;
  cevrimici: boolean;
  kullanici: Kullanici | null;
  ilerleme: Ilerleme;
  forum: ForumBaslik[];
  kanallar: ForumKategori[];
  canliDersler: CanliDers[];
  tekrarlar: Tekrar[];
  yonetici: boolean;
  siteAyarlar: Record<string, string>;
  kayitOl: (veri: {
    ad: string;
    email: string;
    sifre: string;
    sinif: string;
    veliTel: string;
  }) => Promise<{ ok: boolean; hata?: string; dogrulamaGerekli?: boolean }>;
  girisYap: (email: string, sifre: string) => Promise<{ ok: boolean; hata?: string }>;
  demoGiris: () => Promise<void>;
  cikis: () => void;
  gorevToggle: (id: string) => void;
  tekrarIzle: (id: string) => void;
  hocaVideoIzle: (id: string) => void;
  dersKatil: (id: string) => void;
  yeniBaslik: (kategori: string, baslik: string, metin: string) => string;
  yeniMesaj: (baslikId: string, metin: string) => void;
  ayarGuncelle: (kisim: Partial<Kullanici>) => void;
  sifreDegistir: (yeniSifre: string) => Promise<{ ok: boolean; hata?: string }>;
  gorusmeTalebiGonder: (veri: GorusmeTalebi) => Promise<{ ok: boolean }>;
  evrimGoruldu: (asamaNo: number) => void;
  verileriSifirla: () => void;
  // yönetim
  yoneticiGiris: (sifre: string) => Promise<boolean>;
  yoneticiCikis: () => void;
  ogrencileriYukle: () => Promise<OgrenciOzet[]>;
  ogrenciGuncelle: (id: string, kisim: Partial<Kullanici>) => Promise<void>;
  ogrenciSil: (id: string) => Promise<void>;
  ogrenciIlerlemeYaz: (id: string, ilerleme: Ilerleme) => Promise<void>;
  talepleriGetir: () => Promise<GorusmeTalebi[]>;
  siteAyarKaydet: (anahtar: string, deger: string) => Promise<void>;
  dersKaydet: (ders: CanliDers) => void;
  dersSil: (id: string) => void;
  tekrarKaydet: (tekrar: Tekrar) => void;
  tekrarSil: (id: string) => void;
  kanalKaydet: (kanal: ForumKategori) => void;
  kanalSil: (id: string) => void;
  baslikSil: (id: string) => void;
  mesajSil: (baslikId: string, mesajId: string) => void;
};

const StoreContext = createContext<Baglam | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [yuklendi, setYuklendi] = useState(false);
  const [cevrimici, setCevrimici] = useState(true);
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [ilerleme, setIlerleme] = useState<Ilerleme>(BOS_ILERLEME);
  const [forum, setForum] = useState<ForumBaslik[]>(FORUM_SEED);
  const [kanallar, setKanallar] = useState<ForumKategori[]>(FORUM_KATEGORILER);
  const [canliDersler, setCanliDersler] = useState<CanliDers[]>(VARSAYILAN_DERSLER);
  const [tekrarlar, setTekrarlar] = useState<Tekrar[]>(TEKRARLAR);
  const [yonetici, setYonetici] = useState(false);
  const [siteAyarlar, setSiteAyarlar] = useState<Record<string, string>>({});
  const oturumId = useRef<string | null>(null);
  const yerelDemo = useRef(false);

  const forumYukle = useCallback(async () => {
    const [basliklar, mesajlar] = await Promise.all([
      supabase.from("forum_basliklar").select("*").order("created_at", { ascending: false }),
      supabase.from("forum_mesajlar").select("*").order("created_at", { ascending: true }),
    ]);
    if (basliklar.error || mesajlar.error) return;
    setForum(
      (basliklar.data ?? []).map((b: Satir) => ({
        id: b.id,
        kategori: b.kanal_id,
        baslik: b.baslik,
        yazar: b.yazar_ad,
        avatarRenk: b.avatar_renk,
        asama: b.asama ?? 2,
        tarih: b.tarih,
        mesajlar: (mesajlar.data ?? [])
          .filter((m: Satir) => m.baslik_id === b.id)
          .map((m: Satir) => ({
            id: m.id,
            yazar: m.yazar_ad,
            avatarRenk: m.avatar_renk,
            asama: m.asama ?? 2,
            metin: m.metin,
            tarih: m.tarih,
          })),
      }))
    );
  }, []);

  const profilVeIlerlemeYukle = useCallback(async (userId: string, email: string, adIpucu?: string) => {
    let { data: profil } = await supabase.from("profiller").select("*").eq("id", userId).maybeSingle();
    if (!profil) {
      const yeni = {
        id: userId,
        ad: adIpucu ?? "Yeni Ördek",
        email,
        rol: "ogrenci",
      };
      await supabase.from("profiller").insert(yeni);
      profil = { ...yeni };
    }
    const { data: ilerlemeRow } = await supabase
      .from("ilerlemeler")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (!ilerlemeRow) {
      await supabase.from("ilerlemeler").insert(ilerlemeToRow(userId, BOS_ILERLEME));
    }
    const k = kullaniciFromProfil(profil);
    oturumId.current = userId;
    yerelDemo.current = false;
    setKullanici(k);
    setIlerleme(ilerlemeFromRow(ilerlemeRow));
    setYonetici(k.rol === "yonetici");
    return k;
  }, []);

  // İlk yükleme: içerik (herkese açık) + mevcut oturum
  useEffect(() => {
    let iptal = false;
    (async () => {
      try {
        const [dersler, tekrarRes, kanalRes, ayarRes] = await Promise.all([
          supabase.from("canli_dersler").select("*"),
          supabase.from("tekrarlar").select("*").order("hafta", { ascending: false }),
          supabase.from("forum_kanallar").select("*"),
          supabase.from("site_ayarlar").select("*"),
        ]);
        if (iptal) return;
        if (!dersler.error && dersler.data?.length) setCanliDersler(dersler.data.map(dersFromRow));
        if (!tekrarRes.error && tekrarRes.data?.length) setTekrarlar(tekrarRes.data.map(tekrarFromRow));
        if (!kanalRes.error && kanalRes.data?.length) {
          setKanallar(
            kanalRes.data.map((r: Satir) => ({
              id: r.id,
              ad: r.ad,
              ikon: r.ikon,
              aciklama: r.aciklama,
              renk: r.renk,
            }))
          );
        }
        if (!ayarRes.error && ayarRes.data) {
          setSiteAyarlar(Object.fromEntries(ayarRes.data.map((r: Satir) => [r.anahtar, r.deger])));
        }
        await forumYukle();

        const { data } = await supabase.auth.getSession();
        if (!iptal && data.session?.user) {
          await profilVeIlerlemeYukle(
            data.session.user.id,
            data.session.user.email ?? "",
            (data.session.user.user_metadata as Satir)?.ad
          );
        }
        setCevrimici(true);
      } catch {
        if (!iptal) {
          setCevrimici(false);
          // çevrimdışı: yerel demo oturumu varsa geri yükle
          const yerel = oku<Kullanici | null>("so_yerel_kullanici", null);
          if (yerel) {
            yerelDemo.current = true;
            setKullanici(yerel);
            setIlerleme(oku("so_yerel_ilerleme", BOS_ILERLEME));
          }
        }
      } finally {
        if (!iptal) setYuklendi(true);
      }
    })();

    const { data: dinleyici } = supabase.auth.onAuthStateChange((olay) => {
      if (olay === "SIGNED_OUT") {
        oturumId.current = null;
        setKullanici(null);
        setIlerleme(BOS_ILERLEME);
        setYonetici(false);
      }
    });
    return () => {
      iptal = true;
      dinleyici.subscription.unsubscribe();
    };
  }, [forumYukle, profilVeIlerlemeYukle]);

  // İlerlemeyi buluta (ya da yerel yedeğe) gecikmeli yaz
  useEffect(() => {
    if (!yuklendi) return;
    if (oturumId.current) {
      const id = oturumId.current;
      const t = setTimeout(() => {
        supabase.from("ilerlemeler").upsert(ilerlemeToRow(id, ilerleme)).then(undefined, () => {});
      }, 1200);
      return () => clearTimeout(t);
    }
    if (yerelDemo.current) yaz("so_yerel_ilerleme", ilerleme);
  }, [ilerleme, yuklendi]);

  // Sitede geçirilen süre sayacı
  useEffect(() => {
    if (!kullanici) return;
    const sayac = setInterval(() => {
      setIlerleme((o) => ({
        ...o,
        siteDakika: o.siteDakika + 1,
        gunluk: gunlukEkle(o.gunluk, { dakika: 1 }),
      }));
    }, 60_000);
    return () => clearInterval(sayac);
  }, [kullanici]);

  const kayitOl: Baglam["kayitOl"] = useCallback(
    async (veri) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: veri.email,
          password: veri.sifre,
          options: { data: { ad: veri.ad } },
        });
        if (error) {
          const mesaj = error.message.includes("already registered")
            ? "Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene!"
            : error.message.includes("Password")
              ? "Şifre en az 6 karakter olmalı."
              : `Kayıt yapılamadı: ${error.message}`;
          return { ok: false, hata: mesaj };
        }
        if (!data.session) {
          return { ok: true, dogrulamaGerekli: true };
        }
        await supabase.from("profiller").insert({
          id: data.session.user.id,
          ad: veri.ad,
          email: veri.email,
          sinif: veri.sinif,
          veli_tel: veri.veliTel,
          rol: "ogrenci",
        });
        await supabase.from("ilerlemeler").insert(ilerlemeToRow(data.session.user.id, BOS_ILERLEME));
        await profilVeIlerlemeYukle(data.session.user.id, veri.email, veri.ad);
        return { ok: true };
      } catch {
        return { ok: false, hata: "Sunucuya ulaşılamadı. İnternet bağlantını kontrol et." };
      }
    },
    [profilVeIlerlemeYukle]
  );

  const girisYap: Baglam["girisYap"] = useCallback(
    async (email, sifre) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: sifre });
        if (error) {
          const mesaj = error.message.includes("Invalid login")
            ? "E-posta ya da şifre hatalı. Tekrar dener misin?"
            : error.message.includes("not confirmed")
              ? "E-postan henüz doğrulanmamış. Gelen kutunu kontrol et!"
              : `Giriş yapılamadı: ${error.message}`;
          return { ok: false, hata: mesaj };
        }
        await profilVeIlerlemeYukle(
          data.session.user.id,
          data.session.user.email ?? email,
          (data.session.user.user_metadata as Satir)?.ad
        );
        return { ok: true };
      } catch {
        return { ok: false, hata: "Sunucuya ulaşılamadı. İnternet bağlantını kontrol et." };
      }
    },
    [profilVeIlerlemeYukle]
  );

  const demoGiris: Baglam["demoGiris"] = useCallback(async () => {
    const sonuc = await girisYap("demo@sosyalordek.com", "demo1234");
    if (sonuc.ok) {
      // demo hesabın ilerlemesi ya da günlük aktivitesi boşsa örnek veriyle doldur
      setIlerleme((mevcut) => {
        if (Object.keys(mevcut.gorevler).length === 0) return demoIlerlemeUret();
        if (Object.keys(mevcut.gunluk).length === 0) {
          return { ...mevcut, gunluk: demoIlerlemeUret().gunluk };
        }
        return mevcut;
      });
      return;
    }
    // çevrimdışı yedek: tarayıcıya özel demo
    const yerel: Kullanici = {
      id: "yerel-demo",
      ad: "Demo Ördek",
      email: "demo@sosyalordek.com",
      sinif: "8. Sınıf",
      veliTel: "0 (500) 000 00 00",
      avatarRenk: "gol",
      kayitTarihi: new Date().toISOString(),
      hedefHaftalikSoru: 150,
      bildirimDers: true,
      bildirimForum: true,
      rol: "ogrenci",
    };
    yerelDemo.current = true;
    oturumId.current = null;
    yaz("so_yerel_kullanici", yerel);
    setKullanici(yerel);
    setIlerleme(oku("so_yerel_ilerleme", demoIlerlemeUret()));
  }, [girisYap]);

  const cikis = useCallback(() => {
    supabase.auth.signOut().then(undefined, () => {});
    oturumId.current = null;
    yerelDemo.current = false;
    localStorage.removeItem("so_yerel_kullanici");
    setKullanici(null);
    setIlerleme(BOS_ILERLEME);
    setYonetici(false);
  }, []);

  const gorevToggle = useCallback((id: string) => {
    setIlerleme((o) => {
      const gorevler = { ...o.gorevler };
      const gorev = GOREV_MAP[id];
      const isaret = gorevler[id] ? -1 : 1;
      if (gorevler[id]) delete gorevler[id];
      else gorevler[id] = true;
      return {
        ...o,
        gorevler,
        gunluk: gunlukEkle(o.gunluk, { soru: (gorev?.soru ?? 0) * isaret, gorev: isaret }),
      };
    });
  }, []);

  const tekrarIzle = useCallback((id: string) => {
    setIlerleme((o) => ({ ...o, tekrarlar: { ...o.tekrarlar, [id]: true } }));
  }, []);

  const hocaVideoIzle = useCallback((id: string) => {
    setIlerleme((o) => ({ ...o, hocaVideolari: { ...o.hocaVideolari, [id]: true } }));
  }, []);

  const dersKatil = useCallback((id: string) => {
    setIlerleme((o) => ({ ...o, katilim: { ...o.katilim, [id]: true } }));
  }, []);

  const yeniBaslik: Baglam["yeniBaslik"] = useCallback(
    (kategori, baslik, metin) => {
      const id = `u${Date.now()}`;
      const yazar = kullanici?.ad ?? "Misafir Ördek";
      const renk = kullanici?.avatarRenk ?? "amber";
      const asama = asamaBul(tamamlananHaftaSayisi(ilerleme.gorevler)).no;
      const mesajId = `${id}-m1`;
      setForum((o) => [
        {
          id,
          kategori,
          baslik,
          yazar,
          avatarRenk: renk,
          asama,
          tarih: "Az önce",
          mesajlar: [{ id: mesajId, yazar, avatarRenk: renk, asama, metin, tarih: "Az önce" }],
        },
        ...o,
      ]);
      setIlerleme((o) => ({ ...o, forumMesaj: o.forumMesaj + 1 }));
      if (oturumId.current) {
        const uid = oturumId.current;
        supabase
          .from("forum_basliklar")
          .insert({ id, kanal_id: kategori, baslik, yazar_id: uid, yazar_ad: yazar, avatar_renk: renk, asama, tarih: "Az önce" })
          .then(() =>
            supabase
              .from("forum_mesajlar")
              .insert({ id: mesajId, baslik_id: id, yazar_id: uid, yazar_ad: yazar, avatar_renk: renk, asama, metin, tarih: "Az önce" })
              .then(undefined, () => {})
          , () => {});
      }
      return id;
    },
    [kullanici, ilerleme.gorevler]
  );

  const yeniMesaj: Baglam["yeniMesaj"] = useCallback(
    (baslikId, metin) => {
      const yazar = kullanici?.ad ?? "Misafir Ördek";
      const renk = kullanici?.avatarRenk ?? "amber";
      const asama = asamaBul(tamamlananHaftaSayisi(ilerleme.gorevler)).no;
      const mesajId = `${baslikId}-m${Date.now()}`;
      setForum((o) =>
        o.map((b) =>
          b.id === baslikId
            ? {
                ...b,
                mesajlar: [...b.mesajlar, { id: mesajId, yazar, avatarRenk: renk, asama, metin, tarih: "Az önce" }],
              }
            : b
        )
      );
      setIlerleme((o) => ({ ...o, forumMesaj: o.forumMesaj + 1 }));
      if (oturumId.current) {
        supabase
          .from("forum_mesajlar")
          .insert({ id: mesajId, baslik_id: baslikId, yazar_id: oturumId.current, yazar_ad: yazar, avatar_renk: renk, asama, metin, tarih: "Az önce" })
          .then(undefined, () => {});
      }
    },
    [kullanici, ilerleme.gorevler]
  );

  const ayarGuncelle: Baglam["ayarGuncelle"] = useCallback((kisim) => {
    setKullanici((o) => {
      if (!o) return o;
      const yeni = { ...o, ...kisim };
      if (oturumId.current) {
        supabase.from("profiller").upsert(profilToRow(yeni)).then(undefined, () => {});
      } else if (yerelDemo.current) {
        yaz("so_yerel_kullanici", yeni);
      }
      return yeni;
    });
  }, []);

  const sifreDegistir: Baglam["sifreDegistir"] = useCallback(async (yeniSifre) => {
    if (!oturumId.current) {
      return { ok: true }; // yerel demo: şifre kavramı yok
    }
    const { error } = await supabase.auth.updateUser({ password: yeniSifre });
    if (error) return { ok: false, hata: `Şifre güncellenemedi: ${error.message}` };
    return { ok: true };
  }, []);

  const gorusmeTalebiGonder: Baglam["gorusmeTalebiGonder"] = useCallback(async (veri) => {
    try {
      const { error } = await supabase.from("on_gorusme_talepleri").insert({
        veli_ad: veri.veliAd,
        ogrenci_ad: veri.ogrenciAd,
        sinif: veri.sinif,
        telefon: veri.telefon,
        saat: veri.saat,
        not_metni: veri.not,
      });
      if (error) throw error;
      return { ok: true };
    } catch {
      const talepler = oku<GorusmeTalebi[]>("so_yerel_talepler", []);
      yaz("so_yerel_talepler", [...talepler, { ...veri, tarih: new Date().toISOString() }]);
      return { ok: true };
    }
  }, []);

  const evrimGoruldu: Baglam["evrimGoruldu"] = useCallback((asamaNo) => {
    setIlerleme((o) => ({
      ...o,
      gorulenEvrimler: { ...o.gorulenEvrimler, [String(asamaNo)]: true },
    }));
  }, []);

  const verileriSifirla = useCallback(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("so_"))
      .forEach((k) => localStorage.removeItem(k));
    cikis();
    setForum(FORUM_SEED);
    setKanallar(FORUM_KATEGORILER);
    setCanliDersler(VARSAYILAN_DERSLER);
    setTekrarlar(TEKRARLAR);
  }, [cikis]);

  // ---- Yönetim ----

  const yoneticiGiris: Baglam["yoneticiGiris"] = useCallback(
    async (sifre) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "admin@sosyalordek.com",
          password: sifre,
        });
        if (error) return false;
        const k = await profilVeIlerlemeYukle(data.session.user.id, "admin@sosyalordek.com", "Göl Kaptanı");
        if (k.rol !== "yonetici") {
          await supabase.auth.signOut();
          return false;
        }
        return true;
      } catch {
        // çevrimdışı yedek: yalnızca yerel değişiklik yapılabilen mod
        if (sifre === YONETICI_SIFRE) {
          setYonetici(true);
          return true;
        }
        return false;
      }
    },
    [profilVeIlerlemeYukle]
  );

  const yoneticiCikis = useCallback(() => {
    cikis();
  }, [cikis]);

  const ogrencileriYukle: Baglam["ogrencileriYukle"] = useCallback(async () => {
    const [profiller, ilerlemeler] = await Promise.all([
      supabase.from("profiller").select("*").eq("rol", "ogrenci").order("created_at"),
      supabase.from("ilerlemeler").select("*"),
    ]);
    if (profiller.error) return [];
    const ilerlemeMap = new Map<string, Satir>(
      (ilerlemeler.data ?? []).map((r: Satir) => [r.user_id, r])
    );
    return (profiller.data ?? []).map((p: Satir) => ({
      kullanici: kullaniciFromProfil(p),
      ilerleme: ilerlemeFromRow(ilerlemeMap.get(p.id) ?? null),
    }));
  }, []);

  const ogrenciGuncelle: Baglam["ogrenciGuncelle"] = useCallback(async (id, kisim) => {
    const satir: Satir = {};
    if (kisim.ad !== undefined) satir.ad = kisim.ad;
    if (kisim.sinif !== undefined) satir.sinif = kisim.sinif;
    if (kisim.veliTel !== undefined) satir.veli_tel = kisim.veliTel;
    if (kisim.hedefHaftalikSoru !== undefined) satir.hedef_haftalik_soru = kisim.hedefHaftalikSoru;
    if (kisim.avatarRenk !== undefined) satir.avatar_renk = kisim.avatarRenk;
    await supabase.from("profiller").update(satir).eq("id", id);
  }, []);

  const ogrenciSil: Baglam["ogrenciSil"] = useCallback(async (id) => {
    await supabase.from("ilerlemeler").delete().eq("user_id", id);
    await supabase.from("profiller").delete().eq("id", id);
  }, []);

  const ogrenciIlerlemeYaz: Baglam["ogrenciIlerlemeYaz"] = useCallback(async (id, yeni) => {
    await supabase.from("ilerlemeler").upsert(ilerlemeToRow(id, yeni));
    if (id === oturumId.current) setIlerleme(yeni);
  }, []);

  const talepleriGetir: Baglam["talepleriGetir"] = useCallback(async () => {
    const { data, error } = await supabase
      .from("on_gorusme_talepleri")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return oku<GorusmeTalebi[]>("so_yerel_talepler", []);
    return (data ?? []).map((r: Satir) => ({
      id: r.id,
      veliAd: r.veli_ad,
      ogrenciAd: r.ogrenci_ad,
      sinif: r.sinif,
      telefon: r.telefon,
      saat: r.saat,
      not: r.not_metni,
      tarih: r.created_at,
    }));
  }, []);

  const siteAyarKaydet: Baglam["siteAyarKaydet"] = useCallback(async (anahtar, deger) => {
    setSiteAyarlar((o) => ({ ...o, [anahtar]: deger }));
    await supabase.from("site_ayarlar").upsert({ anahtar, deger });
  }, []);

  const dersKaydet: Baglam["dersKaydet"] = useCallback((ders) => {
    setCanliDersler((o) => {
      const varMi = o.some((d) => d.id === ders.id);
      return varMi ? o.map((d) => (d.id === ders.id ? ders : d)) : [...o, ders];
    });
    supabase
      .from("canli_dersler")
      .upsert({ id: ders.id, baslik: ders.baslik, ders: ders.ders, hoca_id: ders.hocaId, gun: ders.gun, saat: ders.saat, sure: ders.sure, tur: ders.tur })
      .then(undefined, () => {});
  }, []);

  const dersSil: Baglam["dersSil"] = useCallback((id) => {
    setCanliDersler((o) => o.filter((d) => d.id !== id));
    supabase.from("canli_dersler").delete().eq("id", id).then(undefined, () => {});
  }, []);

  const tekrarKaydet: Baglam["tekrarKaydet"] = useCallback((tekrar) => {
    setTekrarlar((o) => {
      const varMi = o.some((t) => t.id === tekrar.id);
      return varMi ? o.map((t) => (t.id === tekrar.id ? tekrar : t)) : [tekrar, ...o];
    });
    supabase
      .from("tekrarlar")
      .upsert({ id: tekrar.id, tur: tekrar.tur, ders: tekrar.ders, baslik: tekrar.baslik, hoca_id: tekrar.hocaId, sure: tekrar.sure, tarih: tekrar.tarih, hafta: tekrar.hafta })
      .then(undefined, () => {});
  }, []);

  const tekrarSil: Baglam["tekrarSil"] = useCallback((id) => {
    setTekrarlar((o) => o.filter((t) => t.id !== id));
    supabase.from("tekrarlar").delete().eq("id", id).then(undefined, () => {});
  }, []);

  const kanalKaydet: Baglam["kanalKaydet"] = useCallback((kanal) => {
    setKanallar((o) => {
      const varMi = o.some((k) => k.id === kanal.id);
      return varMi ? o.map((k) => (k.id === kanal.id ? kanal : k)) : [...o, kanal];
    });
    supabase
      .from("forum_kanallar")
      .upsert({ id: kanal.id, ad: kanal.ad, ikon: kanal.ikon, aciklama: kanal.aciklama, renk: kanal.renk })
      .then(undefined, () => {});
  }, []);

  const kanalSil: Baglam["kanalSil"] = useCallback((id) => {
    setKanallar((o) => o.filter((k) => k.id !== id));
    setForum((o) => o.filter((b) => b.kategori !== id));
    supabase.from("forum_kanallar").delete().eq("id", id).then(undefined, () => {});
  }, []);

  const baslikSil: Baglam["baslikSil"] = useCallback((id) => {
    setForum((o) => o.filter((b) => b.id !== id));
    supabase.from("forum_basliklar").delete().eq("id", id).then(undefined, () => {});
  }, []);

  const mesajSil: Baglam["mesajSil"] = useCallback((baslikId, mesajId) => {
    setForum((o) =>
      o
        .map((b) =>
          b.id === baslikId ? { ...b, mesajlar: b.mesajlar.filter((m) => m.id !== mesajId) } : b
        )
        .filter((b) => b.mesajlar.length > 0)
    );
    supabase.from("forum_mesajlar").delete().eq("id", mesajId).then(undefined, () => {});
  }, []);

  return (
    <StoreContext.Provider
      value={{
        yuklendi,
        cevrimici,
        kullanici,
        ilerleme,
        forum,
        kanallar,
        canliDersler,
        tekrarlar,
        yonetici,
        siteAyarlar,
        kayitOl,
        girisYap,
        demoGiris,
        cikis,
        gorevToggle,
        tekrarIzle,
        hocaVideoIzle,
        dersKatil,
        yeniBaslik,
        yeniMesaj,
        ayarGuncelle,
        sifreDegistir,
        gorusmeTalebiGonder,
        evrimGoruldu,
        verileriSifirla,
        yoneticiGiris,
        yoneticiCikis,
        ogrencileriYukle,
        ogrenciGuncelle,
        ogrenciSil,
        ogrenciIlerlemeYaz,
        talepleriGetir,
        siteAyarKaydet,
        dersKaydet,
        dersSil,
        tekrarKaydet,
        tekrarSil,
        kanalKaydet,
        kanalSil,
        baslikSil,
        mesajSil,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore, AppProvider içinde kullanılmalı");
  return ctx;
}

export function cozulenSorular(ilerleme: Ilerleme): {
  toplam: number;
  dersBazinda: Record<DersId, number>;
} {
  const dersBazinda: Record<DersId, number> = { mat: 0, fen: 0, tur: 0, ink: 0, ing: 0, genel: 0 };
  let toplam = 0;
  for (const id of Object.keys(ilerleme.gorevler)) {
    const gorev = GOREV_MAP[id];
    if (!gorev || !gorev.soru) continue;
    toplam += gorev.soru;
    if (gorev.ders === "genel") {
      // deneme soruları 5 derse eşit dağılır (LGS dağılımına yakın)
      const pay = Math.round(gorev.soru / 5);
      (["mat", "fen", "tur", "ink", "ing"] as DersId[]).forEach((d) => (dersBazinda[d] += pay));
    } else {
      dersBazinda[gorev.ders] += gorev.soru;
    }
  }
  return { toplam, dersBazinda };
}

export function vakPuan(ilerleme: Ilerleme): number {
  return (
    Object.keys(ilerleme.gorevler).length * 15 +
    Object.keys(ilerleme.tekrarlar).length * 8 +
    Object.keys(ilerleme.hocaVideolari).length * 5 +
    Object.keys(ilerleme.katilim).length * 20 +
    ilerleme.forumMesaj * 3 +
    Math.floor(ilerleme.siteDakika / 10)
  );
}

export function seviyeBul(puan: number) {
  let sonuc = VAK_SEVIYELER[0];
  for (const s of VAK_SEVIYELER) {
    if (puan >= s.min) sonuc = s;
  }
  return sonuc;
}
