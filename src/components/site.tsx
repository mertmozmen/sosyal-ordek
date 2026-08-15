"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoYatay, OrdekAvatar, OrdekAmblem, Wordmark } from "./Logo";
import { Ikon } from "./ikonlar";
import { useStore } from "@/lib/store";
import { asamaBul, tamamlananHaftaSayisi } from "@/lib/data";
import { YASAL_BELGELER } from "@/lib/legal";

const LINKLER = [
  { href: "/", ad: "Ana Sayfa" },
  { href: "/hakkimizda", ad: "Hakkımızda" },
  { href: "/ekibimiz", ad: "Ekibimiz" },
  { href: "/#sss", ad: "SSS" },
];

export function Navbar() {
  const { kullanici, yuklendi, ilerleme } = useStore();
  const [acik, setAcik] = useState(false);
  const asamaNo = asamaBul(tamamlananHaftaSayisi(ilerleme.gorevler)).no;

  return (
    <header className="sticky top-0 z-40 border-b border-lacivert/8 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label="Sosyal Ördek ana sayfa">
          <LogoYatay boy={40} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKLER.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 font-display text-sm font-bold text-lacivert/80 transition hover:bg-duck/25 hover:text-lacivert"
            >
              {l.ad}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {yuklendi && kullanici ? (
            <Link href="/panel" className="btn btn-amber btn-md">
              <OrdekAvatar renk={kullanici.avatarRenk} boy={26} asama={asamaNo} />
              Panelim
            </Link>
          ) : (
            <>
              <Link href="/giris" className="btn btn-ghost btn-md">
                Giriş Yap
              </Link>
              <Link href="/on-gorusme" className="btn btn-amber btn-md">
                Ücretsiz Ön Görüşme
              </Link>
            </>
          )}
        </div>

        <button
          className="btn btn-ghost btn-sm md:hidden"
          onClick={() => setAcik(!acik)}
          aria-label="Menüyü aç"
        >
          {acik ? "✕" : "☰"} Menü
        </button>
      </div>

      {acik && (
        <div className="border-t border-lacivert/8 bg-cream px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKLER.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setAcik(false)}
                className="rounded-xl px-3 py-2.5 font-display font-bold text-lacivert/85 hover:bg-duck/25"
              >
                {l.ad}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {yuklendi && kullanici ? (
                <Link href="/panel" className="btn btn-amber btn-md flex-1" onClick={() => setAcik(false)}>
                  Panelim
                </Link>
              ) : (
                <>
                  <Link href="/giris" className="btn btn-ghost btn-md flex-1" onClick={() => setAcik(false)}>
                    Giriş Yap
                  </Link>
                  <Link href="/on-gorusme" className="btn btn-amber btn-md flex-1" onClick={() => setAcik(false)}>
                    Ön Görüşme
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-lacivert/10 bg-lacivert text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-white p-2">
              <OrdekAmblem boy={44} gövde={false} />
            </span>
            <div className="flex flex-col">
              <Wordmark boyut="text-lg [&>span]:!text-white [&>span:last-child]:!text-duck" />
              <span className="font-logo text-[9px] font-semibold tracking-[0.28em] text-white/60">
                LGS EĞİTİM PLATFORMU
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            9 aylık yolculukta her öğrencinin yanında yüzen bir göl: canlı dersler, soru
            çözümleri ve seni tanıyan hocalar. Vak vak!
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-duck">Kurumsal</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-duck" href="/hakkimizda">Biz Kimiz?</Link></li>
            <li><Link className="hover:text-duck" href="/ekibimiz">Ekibimiz</Link></li>
            <li><Link className="hover:text-duck" href="/on-gorusme">Ücretsiz Ön Görüşme</Link></li>
            <li><Link className="hover:text-duck" href="/kayit">Öğrenci Kaydı</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-duck">Yasal</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {YASAL_BELGELER.map((b) => (
              <li key={b.slug}>
                <Link className="hover:text-duck" href={`/sozlesmeler/${b.slug}`}>
                  {b.baslik}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-duck">İletişim</h3>
          <ul className="mt-3 space-y-2.5 text-sm text-white/80">
            <li className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
                <Ikon ad="tel" boy={17} />
              </span>
              0 (500) 000 00 00
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
                <Ikon ad="mail" boy={17} />
              </span>
              info@sosyalordek.com
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
                <Ikon ad="konum" boy={17} />
              </span>
              [Adres eklenecek]
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/10 py-4 text-center text-xs text-white/50">
        <span>© 2026 Sosyal Ördek Eğitim Hizmetleri · Tüm hakları saklıdır · Gölde herkese yer var</span>
        <Link href="/yonetim" className="font-bold text-white/40 underline-offset-2 hover:text-duck hover:underline">
          Yönetim
        </Link>
      </div>
    </footer>
  );
}
