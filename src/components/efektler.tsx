"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Görünüme girince yumuşakça beliren sarmalayıcı */
export function Belir({
  children,
  gecikme = 0,
  className = "",
}: {
  children: ReactNode;
  gecikme?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          el.classList.add("gorunur");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`belir ${className}`} style={{ animationDelay: `${gecikme}ms` }}>
      {children}
    </div>
  );
}

/** Görünüme girince 0'dan hedefe sayan sayaç */
export function Sayac({
  deger,
  sure = 1000,
  bicim,
  className = "",
}: {
  deger: number;
  sure?: number;
  bicim?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [gosterilen, setGosterilen] = useState(0);
  const basladi = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let kesinlestir: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([giris]) => {
        if (!giris.isIntersecting || basladi.current) return;
        basladi.current = true;
        const baslangic = performance.now();
        const adim = (simdi: number) => {
          const t = Math.min(1, (simdi - baslangic) / sure);
          const yumusak = 1 - Math.pow(1 - t, 3);
          setGosterilen(Math.round(deger * yumusak));
          if (t < 1) requestAnimationFrame(adim);
        };
        requestAnimationFrame(adim);
        // arka planda rAF kısılırsa bile sonuç değeri garanti göster
        kesinlestir = setTimeout(() => setGosterilen(deger), sure + 250);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (kesinlestir) clearTimeout(kesinlestir);
    };
  }, [deger, sure]);

  useEffect(() => {
    if (basladi.current) setGosterilen(deger);
  }, [deger]);

  return (
    <span ref={ref} className={className}>
      {bicim ? bicim(gosterilen) : gosterilen}
    </span>
  );
}

/** Bölümler arası akan göl dalgası ayracı */
export function Dalga({
  renk = "#FFFFFF",
  ters = false,
  className = "",
}: {
  renk?: string;
  ters?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none relative h-14 overflow-hidden ${ters ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="dalga-suzul absolute bottom-0 left-0 h-full w-[200%]"
      >
        <path
          d="M0 30 Q60 8 120 30 T240 30 T360 30 T480 30 T600 30 T720 30 T840 30 T960 30 T1080 30 T1200 30 T1320 30 T1440 30 V56 H0 Z"
          fill={renk}
          opacity="0.5"
          transform="translate(0 -6)"
        />
        <path
          d="M0 30 Q60 8 120 30 T240 30 T360 30 T480 30 T600 30 T720 30 T840 30 T960 30 T1080 30 T1200 30 T1320 30 T1440 30 V56 H0 Z"
          fill={renk}
        />
      </svg>
    </div>
  );
}
