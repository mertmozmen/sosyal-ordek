"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EvrimFigur } from "./EvrimFigur";

type Faz = "dalis" | "cekil" | null;

// GitHub Pages alt dizininde linkler basePath ile gelir; router.push ise
// basePath'siz yol bekler (kendisi ekler). Çift eklemeyi (404) önlemek için soy.
const KOK = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function rotayaCevir(href: string): string {
  if (KOK && (href === KOK || href.startsWith(`${KOK}/`))) {
    return href.slice(KOK.length) || "/";
  }
  return href;
}

/**
 * Sayfalar arası göl geçişi: ördek tramplenden "pıt" diye göle atlar,
 * su ekranı kaplar, yeni sayfa sudan çekilerek açılır.
 */
export function SayfaGecisi() {
  const router = useRouter();
  const yol = usePathname();
  const [faz, setFaz] = useState<Faz>(null);
  const hedefRef = useRef<string | null>(null);
  const zamanlar = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sonra = (ms: number, fn: () => void) => {
    zamanlar.current.push(setTimeout(fn, ms));
  };

  // Yeni sayfa geldiğinde suyu çek (usePathname basePath içermez)
  useEffect(() => {
    if (faz === "dalis" && hedefRef.current) {
      const hedefYol = rotayaCevir(hedefRef.current).split("#")[0].split("?")[0].replace(/\/$/, "");
      if (yol.replace(/\/$/, "") === (hedefYol || "/").replace(/\/$/, "")) {
        hedefRef.current = null;
        setFaz("cekil");
        sonra(650, () => setFaz(null));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yol, faz]);

  // Tüm iç bağlantı tıklamalarını yakala
  useEffect(() => {
    const tikla = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const sayfa = href.split("#")[0].split("?")[0].replace(/\/$/, "");
      if (!sayfa && href.includes("#")) return; // salt çapa
      if (sayfa === window.location.pathname.replace(/\/$/, "")) return; // aynı sayfa
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      e.stopPropagation();
      hedefRef.current = href;
      setFaz("dalis");
      sonra(980, () => router.push(rotayaCevir(href)));
      // emniyet: rota değişmezse suyu geri çek
      sonra(3000, () => {
        if (hedefRef.current) {
          hedefRef.current = null;
          setFaz("cekil");
          sonra(650, () => setFaz(null));
        }
      });
    };
    document.addEventListener("click", tikla, true);
    return () => {
      document.removeEventListener("click", tikla, true);
      zamanlar.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!faz) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {faz === "dalis" && (
        <>
          {/* Tramplen (kran) */}
          <div className="gecis-tahta absolute top-0 right-[6vw] hidden sm:block">
            {/* direk */}
            <div
              className="absolute top-0 right-2 h-[13vh] w-3 rounded-b-lg bg-lacivert"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 14px, rgba(255,255,255,0.35) 14px 17px)",
              }}
            />
            {/* tahta */}
            <div className="absolute top-[13vh] right-0 h-3 w-[15vw] origin-right rounded-full bg-amber shadow-lg" />
            <div className="absolute top-[13vh] right-0 mt-3 h-6 w-4 rounded-b-md bg-amber-deep" />
            {/* atlayan ördek */}
            <div className="gecis-ordek absolute top-[6.5vh] right-[13vw]">
              <EvrimFigur asama={4} boy={64} />
            </div>
          </div>

          {/* PIT! + sıçrama */}
          <div className="absolute top-[64vh] right-[22vw] hidden sm:block">
            <span
              className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-3 py-1 font-display text-lg font-extrabold text-lacivert shadow-xl"
              style={{ animation: "pit-pop 0.35s cubic-bezier(.3,1.4,.5,1) 0.8s both" }}
            >
              PIT!
            </span>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((aci) => (
              <span
                key={aci}
                className="absolute top-0 left-1/2 h-3 w-3 rounded-full bg-white/90"
                style={{
                  ["--aci" as string]: `${aci}deg`,
                  animation: "parcacik 0.55s ease-out 0.8s both",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Göl suyu */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[102vh] ${
          faz === "dalis" ? "gecis-su-dol" : "gecis-su-cekil"
        }`}
      >
        {/* köpüklü dalga tepesi */}
        <div
          className="dalga-suzul absolute -top-8 left-0 h-9 w-[200%]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 36'%3E%3Cpath d='M0 20 Q20 0 40 20 T80 20 V36 H0 Z' fill='%233B9EC4'/%3E%3C/svg%3E\")",
            backgroundSize: "80px 36px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
        <div className="h-full w-full bg-gradient-to-b from-[#3B9EC4] via-[#2C7FA8] to-lacivert">
          {/* su içi kabarcıklar */}
          {[8, 22, 38, 55, 71, 86].map((sol, i) => (
            <span
              key={sol}
              className="absolute h-3 w-3 rounded-full border-2 border-white/30"
              style={{
                left: `${sol}%`,
                top: `${18 + ((i * 17) % 40)}%`,
                animation: `bob ${2 + (i % 3) * 0.6}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
