"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
 * Sayfalar arası göl geçişi: lacivert göl ekranı kaplar, öğretmen ördek
 * yavru öğrencileriyle soldan sağa süzülür, yeni sayfa sudan çekilerek açılır.
 */
export function SayfaGecisi() {
  const router = useRouter();
  const yol = usePathname();
  const [faz, setFaz] = useState<Faz>(null);
  const hedefRef = useRef<string | null>(null);
  const baslangicRef = useRef(0);
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
        // konvoy geçidini yarıda kesmemek için en az 1.6 sn suda kal
        const gecen = Date.now() - baslangicRef.current;
        sonra(Math.max(0, 1600 - gecen), () => {
          setFaz("cekil");
          sonra(600, () => setFaz(null));
        });
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
      baslangicRef.current = Date.now();
      setFaz("dalis");
      sonra(800, () => router.push(rotayaCevir(href)));
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
      {/* Lacivert göl */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[102vh] bg-lacivert ${
          faz === "dalis" ? "gecis-su-dol" : "gecis-su-cekil"
        }`}
      >
        {/* dalga tepesi */}
        <div
          className="dalga-suzul absolute -top-8 left-0 h-9 w-[200%]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 36'%3E%3Cpath d='M0 20 Q20 0 40 20 T80 20 V36 H0 Z' fill='%231E3A5F'/%3E%3C/svg%3E\")",
            backgroundSize: "80px 36px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />

        {/* Öğretmen ördek ve öğrencileri soldan sağa geçer */}
        {faz === "dalis" && (
          <div className="gecis-konvoy absolute top-[36%] left-0 flex items-end">
            {[0, 1, 2].map((i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                src={`${KOK}/gorseller/yavru-ordek.svg`}
                alt=""
                className="w-16 sm:w-24"
                style={{
                  marginBottom: [2, 10, 4][i],
                  marginRight: -8,
                  animation: `bob ${1.7 + i * 0.35}s ease-in-out infinite`,
                }}
              />
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${KOK}/gorseller/ogretmen-ordek.svg`}
              alt=""
              className="w-36 sm:w-56"
              style={{ animation: "bob 2.4s ease-in-out infinite" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
