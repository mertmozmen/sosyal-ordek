"use client";

import { useEffect, useRef, useState } from "react";
import { OrdekKafa } from "./Logo";

type Props = {
  acik: boolean;
  baslik: string;
  altBaslik?: string;
  onKapat: () => void;
  onBitti?: () => void;
};

export function VideoModal({ acik, baslik, altBaslik, onKapat, onBitti }: Props) {
  const [oynuyor, setOynuyor] = useState(false);
  const [yuzde, setYuzde] = useState(0);
  const bittiRef = useRef(false);

  useEffect(() => {
    if (!acik) {
      setOynuyor(false);
      setYuzde(0);
      bittiRef.current = false;
    }
  }, [acik]);

  useEffect(() => {
    if (!oynuyor) return;
    const sayac = setInterval(() => {
      setYuzde((o) => {
        const yeni = Math.min(100, o + 2);
        if (yeni === 100 && !bittiRef.current) {
          bittiRef.current = true;
          onBitti?.();
        }
        return yeni;
      });
    }, 80);
    return () => clearInterval(sayac);
  }, [oynuyor, onBitti]);

  if (!acik) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-lacivert-koyu/70 p-4 backdrop-blur-sm"
      onClick={onKapat}
    >
      <div
        className="vak-pop w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-3.5">
          <div>
            <h3 className="font-display text-base font-bold text-lacivert">{baslik}</h3>
            {altBaslik && <p className="text-xs text-ink/60">{altBaslik}</p>}
          </div>
          <button
            onClick={onKapat}
            className="rounded-full bg-cream-deep px-3 py-1 font-bold text-lacivert transition hover:bg-duck/50"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-video bg-lacivert-koyu">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            {yuzde === 100 ? (
              <>
                <span className="text-5xl">✅</span>
                <p className="font-display font-bold text-white">İzlendi! Panelindeki istatistiklere eklendi.</p>
                <button onClick={onKapat} className="btn btn-amber btn-md">
                  Kapat
                </button>
              </>
            ) : oynuyor ? (
              <div className="flex flex-col items-center gap-3">
                <OrdekKafa boy={90} className="animate-bob" />
                <div className="flex items-end gap-1">
                  {[14, 26, 18, 32, 22, 28, 16].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-full bg-duck"
                      style={{ height: h, animation: `bob 0.${6 + i}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/60">Demo video oynatılıyor...</p>
              </div>
            ) : (
              <button
                onClick={() => setOynuyor(true)}
                className="group flex flex-col items-center gap-3"
                aria-label="Videoyu oynat"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-amber text-3xl text-lacivert-koyu shadow-xl transition group-hover:scale-110">
                  ▶
                </span>
                <span className="font-display text-sm font-bold text-white/80">
                  Oynatmak için tıkla
                </span>
              </button>
            )}
          </div>
          <span className="absolute top-3 left-3 chip bg-white/15 text-white backdrop-blur">
            🎬 Demo İçerik
          </span>
        </div>

        <div className="h-2 bg-cream-deep">
          <div className="h-full bg-amber transition-all duration-100" style={{ width: `${yuzde}%` }} />
        </div>
      </div>
    </div>
  );
}
