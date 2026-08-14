"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoYatay, OrdekKafa } from "@/components/Logo";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { useStore } from "@/lib/store";

const MENU: { href: string; ad: string; ikon: IkonAd }[] = [
  { href: "/yonetim", ad: "Genel Bakış", ikon: "grafik" },
  { href: "/yonetim/ogrenciler", ad: "Öğrenciler", ikon: "kullanici" },
  { href: "/yonetim/dersler", ad: "Canlı Ders & Yayın", ikon: "canli" },
  { href: "/yonetim/kayitlar", ad: "Kayıt Yükle", ikon: "yukle" },
  { href: "/yonetim/forum", ad: "Forum Yönetimi", ikon: "forum" },
];

export default function YonetimLayout({ children }: { children: React.ReactNode }) {
  const { yonetici, yoneticiGiris, yoneticiCikis, yuklendi } = useStore();
  const yol = usePathname();
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");

  if (!yuklendi) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Ikon ad="vak" boy={52} className="animate-bob" />
        <p className="font-display font-bold text-lacivert/50">Kaptan köşkü hazırlanıyor...</p>
      </div>
    );
  }

  if (!yonetici) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
        <div className="card p-8">
          <div className="text-center">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lacivert">
              <OrdekKafa boy={64} />
            </span>
            <h1 className="baslik mt-4 text-2xl">Kaptan Köşkü</h1>
            <p className="mt-1 text-sm text-ink/60">
              Sosyal Ördek yönetim paneli. Sadece göl kaptanları girebilir.
            </p>
          </div>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!yoneticiGiris(sifre)) setHata("Şifre yanlış, vak! Tekrar dene.");
            }}
          >
            <div>
              <label className="label" htmlFor="ySifre">Yönetici şifresi</label>
              <input
                id="ySifre"
                type="password"
                className="input"
                placeholder="••••••••"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
              />
            </div>
            {hata && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{hata}</p>
            )}
            <button type="submit" className="btn btn-lacivert btn-lg w-full">
              <Ikon ad="kilit" boy={17} /> Panele Gir
            </button>
            <p className="text-center text-xs text-ink/45">
              Demo şifresi: <strong>vakvak2026</strong>
            </p>
          </form>
          <Link href="/" className="btn btn-ghost btn-md mt-4 w-full">
            ← Siteye dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
      <aside className="shrink-0 border-b border-lacivert/8 bg-lacivert text-white md:min-h-screen md:w-64 md:border-r md:border-b-0">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="rounded-2xl bg-white px-3 py-2">
            <LogoYatay boy={32} />
          </Link>
        </div>
        <div className="mx-4 rounded-2xl bg-white/10 p-3">
          <p className="flex items-center gap-2 font-display text-sm font-bold text-duck">
            <Ikon ad="tac" boy={18} /> Kaptan Köşkü
          </p>
          <p className="mt-0.5 text-[11px] text-white/60">
            Yönetici modu — tüm değişiklikler anında yayına girer.
          </p>
        </div>
        <nav className="scrollbar-none mt-4 flex gap-1 overflow-x-auto px-4 pb-4 md:flex-col md:overflow-visible">
          {MENU.map((m) => {
            const aktif = yol === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex shrink-0 items-center gap-2.5 rounded-2xl px-3.5 py-2.5 font-display text-sm font-bold whitespace-nowrap transition ${
                  aktif
                    ? "bg-amber text-lacivert-koyu shadow-md shadow-amber/30"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className={aktif ? "" : "rounded-md bg-white/90 p-0.5"}>
                  <Ikon ad={m.ikon} boy={17} />
                </span>
                {m.ad}
              </Link>
            );
          })}
          <button
            onClick={yoneticiCikis}
            className="flex shrink-0 items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-left font-display text-sm font-bold whitespace-nowrap text-red-300 transition hover:bg-red-500/15"
          >
            <span className="rounded-md bg-white/90 p-0.5">
              <Ikon ad="cikis" boy={17} />
            </span>
            Yönetici Çıkışı
          </button>
        </nav>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
