"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogoYatay, OrdekAvatar } from "@/components/Logo";
import { EvrimKutlama } from "@/components/Evrim";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { useStore, vakPuan } from "@/lib/store";
import { asamaBul, sonrakiAsama, tamamlananHaftaSayisi } from "@/lib/data";

const MENU: { href: string; ad: string; ikon: IkonAd }[] = [
  { href: "/panel", ad: "Panelim", ikon: "panel" },
  { href: "/panel/hocani-tani", ad: "Hocanı Tanı", ikon: "hoca" },
  { href: "/panel/online-derslerim", ad: "Online Derslerim", ikon: "canli" },
  { href: "/panel/soru-cozumu", ad: "Soru Çözümü", ikon: "soru" },
  { href: "/panel/tekrarlarim", ad: "Ders Tekrarlarım", ikon: "tekrar" },
  { href: "/panel/haftalik-plan", ad: "Haftalık Planlarım", ikon: "plan" },
  { href: "/panel/liderlik", ad: "Liderlik Tablosu", ikon: "kupa" },
  { href: "/panel/forum", ad: "Forum", ikon: "forum" },
  { href: "/panel/ayarlar", ad: "Ayarlar", ikon: "ayar" },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const { kullanici, yuklendi, ilerleme, cikis } = useStore();
  const router = useRouter();
  const yol = usePathname();

  useEffect(() => {
    if (yuklendi && !kullanici) router.replace("/giris");
  }, [yuklendi, kullanici, router]);

  if (!yuklendi || !kullanici) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Ikon ad="vak" boy={52} className="animate-bob" />
        <p className="font-display font-bold text-lacivert/50">Göl hazırlanıyor...</p>
      </div>
    );
  }

  const puan = vakPuan(ilerleme);
  const tamamHafta = tamamlananHaftaSayisi(ilerleme.gorevler);
  const asama = asamaBul(tamamHafta);
  const sonraki = sonrakiAsama(tamamHafta);
  const asamaYuzde = sonraki
    ? Math.round(((tamamHafta - asama.minHafta) / (sonraki.minHafta - asama.minHafta)) * 100)
    : 100;

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
      {/* Kenar çubuğu */}
      <aside className="shrink-0 border-b border-lacivert/8 bg-white/70 md:min-h-screen md:w-64 md:border-r md:border-b-0">
        <div className="flex items-center justify-between p-4 md:block">
          <Link href="/">
            <LogoYatay boy={36} />
          </Link>
        </div>

        <div className="mx-4 rounded-2xl bg-lacivert p-4 text-white">
          <div className="flex items-center gap-3">
            <OrdekAvatar renk={kullanici.avatarRenk} boy={46} asama={asama.no} />
            <div className="min-w-0">
              <p className="truncate font-display font-bold">{kullanici.ad}</p>
              <p className="text-xs text-white/60">{kullanici.sinif} · {puan} vak puanı</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-duck">{asama.ad}</span>
              <span className="text-white/70">{tamamHafta}/28 hafta</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-duck transition-all duration-700" style={{ width: `${asamaYuzde}%` }} />
            </div>
            {sonraki && (
              <p className="mt-1 text-[10px] text-white/50">
                {sonraki.ad} olmak için {sonraki.minHafta - tamamHafta} hafta kaldı
              </p>
            )}
          </div>
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
                    ? "bg-amber text-lacivert-koyu shadow-md shadow-amber/40"
                    : "text-lacivert/70 hover:bg-duck/20 hover:text-lacivert"
                }`}
              >
                <Ikon ad={m.ikon} boy={19} />
                {m.ad}
              </Link>
            );
          })}
          <button
            onClick={() => {
              cikis();
              router.push("/");
            }}
            className="flex shrink-0 items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-left font-display text-sm font-bold whitespace-nowrap text-red-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Ikon ad="cikis" boy={19} />
            Çıkış Yap
          </button>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      <EvrimKutlama />
    </div>
  );
}
