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
import {
  CANLI_DERSLER,
  FORUM_KATEGORILER,
  FORUM_SEED,
  GOREV_MAP,
  HAFTALAR,
  SORU_OTURUMLARI,
  TEKRARLAR,
  VAK_SEVIYELER,
  type CanliDers,
  type DersId,
  type ForumBaslik,
  type ForumKategori,
  type Tekrar,
} from "./data";

export type Kullanici = {
  ad: string;
  email: string;
  sifre: string;
  sinif: string;
  veliTel: string;
  avatarRenk: string;
  kayitTarihi: string;
  hedefHaftalikSoru: number;
  bildirimDers: boolean;
  bildirimForum: boolean;
};

export type Ilerleme = {
  gorevler: Record<string, boolean>;
  tekrarlar: Record<string, boolean>;
  hocaVideolari: Record<string, boolean>;
  katilim: Record<string, boolean>;
  siteDakika: number;
  forumMesaj: number;
};

const BOS_ILERLEME: Ilerleme = {
  gorevler: {},
  tekrarlar: {},
  hocaVideolari: {},
  katilim: {},
  siteDakika: 0,
  forumMesaj: 0,
};

export const YONETICI_SIFRE = "vakvak2026";

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
    /* depolama dolu ya da kapalıysa demo sessizce devam eder */
  }
}

type Baglam = {
  yuklendi: boolean;
  kullanici: Kullanici | null;
  ilerleme: Ilerleme;
  forum: ForumBaslik[];
  kanallar: ForumKategori[];
  canliDersler: CanliDers[];
  tekrarlar: Tekrar[];
  yonetici: boolean;
  kayitOl: (
    veri: Pick<Kullanici, "ad" | "email" | "sifre" | "sinif" | "veliTel">
  ) => { ok: boolean; hata?: string };
  girisYap: (email: string, sifre: string) => { ok: boolean; hata?: string };
  demoGiris: () => void;
  cikis: () => void;
  gorevToggle: (id: string) => void;
  tekrarIzle: (id: string) => void;
  hocaVideoIzle: (id: string) => void;
  dersKatil: (id: string) => void;
  yeniBaslik: (kategori: string, baslik: string, metin: string) => string;
  yeniMesaj: (baslikId: string, metin: string) => void;
  ayarGuncelle: (kisim: Partial<Kullanici>) => void;
  verileriSifirla: () => void;
  // yönetim
  yoneticiGiris: (sifre: string) => boolean;
  yoneticiCikis: () => void;
  ogrencileriGetir: () => Kullanici[];
  ogrenciIlerlemesi: (email: string) => Ilerleme;
  ogrenciGuncelle: (email: string, kisim: Partial<Kullanici>) => void;
  ogrenciSil: (email: string) => void;
  ogrenciHaftaAc: (email: string, haftaNo: number) => void;
  ogrenciIlerlemeSifirla: (email: string) => void;
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

const VARSAYILAN_DERSLER: CanliDers[] = [...CANLI_DERSLER, ...SORU_OTURUMLARI];

export function AppProvider({ children }: { children: ReactNode }) {
  const [yuklendi, setYuklendi] = useState(false);
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [ilerleme, setIlerleme] = useState<Ilerleme>(BOS_ILERLEME);
  const [forum, setForum] = useState<ForumBaslik[]>(FORUM_SEED);
  const [kanallar, setKanallar] = useState<ForumKategori[]>(FORUM_KATEGORILER);
  const [canliDersler, setCanliDersler] = useState<CanliDers[]>(VARSAYILAN_DERSLER);
  const [tekrarlar, setTekrarlar] = useState<Tekrar[]>(TEKRARLAR);
  const [yonetici, setYonetici] = useState(false);
  const emailRef = useRef<string | null>(null);

  useEffect(() => {
    const oturum = oku<string | null>("so_oturum", null);
    if (oturum) {
      const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
      const bulunan = kullanicilar.find((k) => k.email === oturum) ?? null;
      if (bulunan) {
        emailRef.current = bulunan.email;
        setKullanici(bulunan);
        setIlerleme(oku(`so_ilerleme_${bulunan.email}`, BOS_ILERLEME));
      }
    }
    setForum(oku("so_forum", FORUM_SEED));
    setKanallar(oku("so_kanallar", FORUM_KATEGORILER));
    setCanliDersler(oku("so_dersler", VARSAYILAN_DERSLER));
    setTekrarlar(oku("so_tekrarlar", TEKRARLAR));
    setYonetici(oku("so_yonetici", false));
    setYuklendi(true);
  }, []);

  useEffect(() => {
    if (!yuklendi || !emailRef.current) return;
    yaz(`so_ilerleme_${emailRef.current}`, ilerleme);
  }, [ilerleme, yuklendi]);

  useEffect(() => {
    if (!yuklendi) return;
    yaz("so_forum", forum);
  }, [forum, yuklendi]);

  useEffect(() => {
    if (!yuklendi) return;
    yaz("so_kanallar", kanallar);
  }, [kanallar, yuklendi]);

  useEffect(() => {
    if (!yuklendi) return;
    yaz("so_dersler", canliDersler);
  }, [canliDersler, yuklendi]);

  useEffect(() => {
    if (!yuklendi) return;
    yaz("so_tekrarlar", tekrarlar);
  }, [tekrarlar, yuklendi]);

  useEffect(() => {
    if (!kullanici) return;
    const sayac = setInterval(() => {
      setIlerleme((o) => ({ ...o, siteDakika: o.siteDakika + 1 }));
    }, 60_000);
    return () => clearInterval(sayac);
  }, [kullanici]);

  const oturumAc = useCallback((k: Kullanici, hazirIlerleme?: Ilerleme) => {
    emailRef.current = k.email;
    setKullanici(k);
    const mevcut = hazirIlerleme ?? oku(`so_ilerleme_${k.email}`, BOS_ILERLEME);
    setIlerleme(mevcut);
    yaz(`so_ilerleme_${k.email}`, mevcut);
    yaz("so_oturum", k.email);
  }, []);

  const kayitOl: Baglam["kayitOl"] = useCallback(
    (veri) => {
      const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
      if (kullanicilar.some((k) => k.email === veri.email)) {
        return { ok: false, hata: "Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene!" };
      }
      const yeni: Kullanici = {
        ...veri,
        avatarRenk: "amber",
        kayitTarihi: new Date().toISOString(),
        hedefHaftalikSoru: 150,
        bildirimDers: true,
        bildirimForum: true,
      };
      yaz("so_kullanicilar", [...kullanicilar, yeni]);
      oturumAc(yeni, BOS_ILERLEME);
      return { ok: true };
    },
    [oturumAc]
  );

  const girisYap: Baglam["girisYap"] = useCallback(
    (email, sifre) => {
      const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
      const bulunan = kullanicilar.find((k) => k.email === email);
      if (!bulunan) return { ok: false, hata: "Bu e-posta ile kayıtlı hesap bulamadık." };
      if (bulunan.sifre !== sifre) return { ok: false, hata: "Şifre hatalı. Tekrar dener misin?" };
      oturumAc(bulunan);
      return { ok: true };
    },
    [oturumAc]
  );

  const demoGiris = useCallback(() => {
    const email = "demo@sosyalordek.com";
    const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
    let demo = kullanicilar.find((k) => k.email === email);
    if (!demo) {
      demo = {
        ad: "Demo Ördek",
        email,
        sifre: "demo1234",
        sinif: "8. Sınıf",
        veliTel: "0 (500) 000 00 00",
        avatarRenk: "gol",
        kayitTarihi: new Date().toISOString(),
        hedefHaftalikSoru: 150,
        bildirimDers: true,
        bildirimForum: true,
      };
      yaz("so_kullanicilar", [...kullanicilar, demo]);
    }
    const gorevler: Record<string, boolean> = {};
    HAFTALAR.slice(0, 2).forEach((h) => h.gorevler.forEach((g) => (gorevler[g.id] = true)));
    HAFTALAR[2].gorevler.slice(0, 4).forEach((g) => (gorevler[g.id] = true));
    const demoIlerleme: Ilerleme = {
      gorevler,
      tekrarlar: { "dt-1-mat": true, "dt-1-fen": true, "dt-2-mat": true, "st-1": true, "st-2": true },
      hocaVideolari: { "elif-kaya": true, "burak-demir": true, "zeynep-arslan": true },
      katilim: { "cd-mat": true, "cd-fen": true, "sc-mat": true },
      siteDakika: 412,
      forumMesaj: 3,
    };
    oturumAc(demo, demoIlerleme);
  }, [oturumAc]);

  const cikis = useCallback(() => {
    emailRef.current = null;
    setKullanici(null);
    setIlerleme(BOS_ILERLEME);
    localStorage.removeItem("so_oturum");
  }, []);

  const gorevToggle = useCallback((id: string) => {
    setIlerleme((o) => {
      const gorevler = { ...o.gorevler };
      if (gorevler[id]) delete gorevler[id];
      else gorevler[id] = true;
      return { ...o, gorevler };
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
      const simdi = "Az önce";
      const yazar = kullanici?.ad ?? "Misafir Ördek";
      const renk = kullanici?.avatarRenk ?? "amber";
      setForum((o) => [
        {
          id,
          kategori,
          baslik,
          yazar,
          avatarRenk: renk,
          tarih: simdi,
          mesajlar: [{ id: `${id}-m1`, yazar, avatarRenk: renk, metin, tarih: simdi }],
        },
        ...o,
      ]);
      setIlerleme((o) => ({ ...o, forumMesaj: o.forumMesaj + 1 }));
      return id;
    },
    [kullanici]
  );

  const yeniMesaj: Baglam["yeniMesaj"] = useCallback(
    (baslikId, metin) => {
      const yazar = kullanici?.ad ?? "Misafir Ördek";
      const renk = kullanici?.avatarRenk ?? "amber";
      setForum((o) =>
        o.map((b) =>
          b.id === baslikId
            ? {
                ...b,
                mesajlar: [
                  ...b.mesajlar,
                  { id: `${baslikId}-m${b.mesajlar.length + 1}-${Date.now()}`, yazar, avatarRenk: renk, metin, tarih: "Az önce" },
                ],
              }
            : b
        )
      );
      setIlerleme((o) => ({ ...o, forumMesaj: o.forumMesaj + 1 }));
    },
    [kullanici]
  );

  const ayarGuncelle: Baglam["ayarGuncelle"] = useCallback((kisim) => {
    setKullanici((o) => {
      if (!o) return o;
      const yeni = { ...o, ...kisim };
      const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
      yaz(
        "so_kullanicilar",
        kullanicilar.map((k) => (k.email === yeni.email ? yeni : k))
      );
      return yeni;
    });
  }, []);

  const verileriSifirla = useCallback(() => {
    const anahtarlar = Object.keys(localStorage).filter((k) => k.startsWith("so_"));
    anahtarlar.forEach((k) => localStorage.removeItem(k));
    emailRef.current = null;
    setKullanici(null);
    setIlerleme(BOS_ILERLEME);
    setForum(FORUM_SEED);
    setKanallar(FORUM_KATEGORILER);
    setCanliDersler(VARSAYILAN_DERSLER);
    setTekrarlar(TEKRARLAR);
    setYonetici(false);
  }, []);

  // ---- Yönetim ----

  const yoneticiGiris = useCallback((sifre: string) => {
    if (sifre !== YONETICI_SIFRE) return false;
    setYonetici(true);
    yaz("so_yonetici", true);
    return true;
  }, []);

  const yoneticiCikis = useCallback(() => {
    setYonetici(false);
    yaz("so_yonetici", false);
  }, []);

  const ogrencileriGetir = useCallback(() => oku<Kullanici[]>("so_kullanicilar", []), []);

  const ogrenciIlerlemesi = useCallback(
    (email: string) =>
      email === emailRef.current ? ilerleme : oku(`so_ilerleme_${email}`, BOS_ILERLEME),
    [ilerleme]
  );

  const ogrenciIlerlemeYaz = useCallback((email: string, yeni: Ilerleme) => {
    yaz(`so_ilerleme_${email}`, yeni);
    if (email === emailRef.current) setIlerleme(yeni);
  }, []);

  const ogrenciGuncelle: Baglam["ogrenciGuncelle"] = useCallback((email, kisim) => {
    const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
    yaz(
      "so_kullanicilar",
      kullanicilar.map((k) => (k.email === email ? { ...k, ...kisim } : k))
    );
    if (email === emailRef.current) {
      setKullanici((o) => (o ? { ...o, ...kisim } : o));
    }
  }, []);

  const ogrenciSil: Baglam["ogrenciSil"] = useCallback(
    (email) => {
      const kullanicilar = oku<Kullanici[]>("so_kullanicilar", []);
      yaz(
        "so_kullanicilar",
        kullanicilar.filter((k) => k.email !== email)
      );
      localStorage.removeItem(`so_ilerleme_${email}`);
      if (email === emailRef.current) cikis();
    },
    [cikis]
  );

  const ogrenciHaftaAc: Baglam["ogrenciHaftaAc"] = useCallback(
    (email, haftaNo) => {
      const mevcut =
        email === emailRef.current ? ilerleme : oku(`so_ilerleme_${email}`, BOS_ILERLEME);
      const gorevler = { ...mevcut.gorevler };
      HAFTALAR.filter((h) => h.no < haftaNo).forEach((h) =>
        h.gorevler.forEach((g) => (gorevler[g.id] = true))
      );
      ogrenciIlerlemeYaz(email, { ...mevcut, gorevler });
    },
    [ilerleme, ogrenciIlerlemeYaz]
  );

  const ogrenciIlerlemeSifirla: Baglam["ogrenciIlerlemeSifirla"] = useCallback(
    (email) => ogrenciIlerlemeYaz(email, BOS_ILERLEME),
    [ogrenciIlerlemeYaz]
  );

  const dersKaydet: Baglam["dersKaydet"] = useCallback((ders) => {
    setCanliDersler((o) => {
      const varMi = o.some((d) => d.id === ders.id);
      return varMi ? o.map((d) => (d.id === ders.id ? ders : d)) : [...o, ders];
    });
  }, []);

  const dersSil: Baglam["dersSil"] = useCallback((id) => {
    setCanliDersler((o) => o.filter((d) => d.id !== id));
  }, []);

  const tekrarKaydet: Baglam["tekrarKaydet"] = useCallback((tekrar) => {
    setTekrarlar((o) => {
      const varMi = o.some((t) => t.id === tekrar.id);
      return varMi ? o.map((t) => (t.id === tekrar.id ? tekrar : t)) : [tekrar, ...o];
    });
  }, []);

  const tekrarSil: Baglam["tekrarSil"] = useCallback((id) => {
    setTekrarlar((o) => o.filter((t) => t.id !== id));
  }, []);

  const kanalKaydet: Baglam["kanalKaydet"] = useCallback((kanal) => {
    setKanallar((o) => {
      const varMi = o.some((k) => k.id === kanal.id);
      return varMi ? o.map((k) => (k.id === kanal.id ? kanal : k)) : [...o, kanal];
    });
  }, []);

  const kanalSil: Baglam["kanalSil"] = useCallback((id) => {
    setKanallar((o) => o.filter((k) => k.id !== id));
    setForum((o) => o.filter((b) => b.kategori !== id));
  }, []);

  const baslikSil: Baglam["baslikSil"] = useCallback((id) => {
    setForum((o) => o.filter((b) => b.id !== id));
  }, []);

  const mesajSil: Baglam["mesajSil"] = useCallback((baslikId, mesajId) => {
    setForum((o) =>
      o
        .map((b) =>
          b.id === baslikId
            ? { ...b, mesajlar: b.mesajlar.filter((m) => m.id !== mesajId) }
            : b
        )
        .filter((b) => b.mesajlar.length > 0)
    );
  }, []);

  return (
    <StoreContext.Provider
      value={{
        yuklendi,
        kullanici,
        ilerleme,
        forum,
        kanallar,
        canliDersler,
        tekrarlar,
        yonetici,
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
        verileriSifirla,
        yoneticiGiris,
        yoneticiCikis,
        ogrencileriGetir,
        ogrenciIlerlemesi,
        ogrenciGuncelle,
        ogrenciSil,
        ogrenciHaftaAc,
        ogrenciIlerlemeSifirla,
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
