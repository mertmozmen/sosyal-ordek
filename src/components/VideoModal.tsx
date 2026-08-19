"use client";

import { useEffect, useRef, useState } from "react";
import { Ikon } from "./ikonlar";
import { medyaYolu } from "@/lib/supabase";
import { useStore } from "@/lib/store";

type Props = {
  acik: boolean;
  baslik: string;
  altBaslik?: string;
  /** Özel video kaynağı (örn. canlı yayın kaydı); verilmezse tanıtım videosu oynar */
  videoUrl?: string | null;
  onKapat: () => void;
  onBitti?: () => void;
};

export function VideoModal({ acik, baslik, altBaslik, videoUrl, onKapat, onBitti }: Props) {
  const { siteAyarlar } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [bitti, setBitti] = useState(false);
  const enCokOran = useRef(0);
  const sayildi = useRef(false);

  const url = videoUrl?.startsWith("http")
    ? videoUrl
    : medyaYolu(videoUrl || siteAyarlar["tanitim_video_url"] || "video/tanitim.mp4");

  useEffect(() => {
    if (!acik) {
      setBitti(false);
      enCokOran.current = 0;
      sayildi.current = false;
    }
  }, [acik]);

  if (!acik) return null;

  const izlenmisSay = () => {
    if (sayildi.current) return;
    sayildi.current = true;
    onBitti?.();
  };

  const kapat = () => {
    // videonun büyük kısmı izlendiyse kapatınca da izlenmiş say
    if (enCokOran.current >= 0.7) izlenmisSay();
    onKapat();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-lacivert-koyu/80 p-4 backdrop-blur-sm"
      onClick={kapat}
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
            onClick={kapat}
            className="rounded-full bg-cream-deep px-3 py-1 font-bold text-lacivert transition hover:bg-duck/50"
          >
            ✕
          </button>
        </div>

        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={url}
            controls
            playsInline
            autoPlay
            className="aspect-video w-full"
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration > 0) {
                enCokOran.current = Math.max(enCokOran.current, v.currentTime / v.duration);
              }
            }}
            onEnded={() => {
              setBitti(true);
              izlenmisSay();
            }}
          />
          {bitti && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-lacivert-koyu/80">
              <Ikon ad="tik" boy={56} className="sicra" />
              <p className="font-display font-bold text-white">İzlendi! Panelindeki istatistiklere eklendi.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setBitti(false);
                    videoRef.current?.play();
                  }}
                  className="btn btn-ghost btn-md !border-white/30 !bg-transparent !text-white hover:!bg-white/10"
                >
                  <Ikon ad="tekrar" boy={16} /> Tekrar izle
                </button>
                <button onClick={kapat} className="btn btn-amber btn-md">
                  Kapat
                </button>
              </div>
            </div>
          )}
          <span className="absolute top-3 left-3 chip bg-white/15 text-white backdrop-blur">
            <Ikon ad="video" boy={14} /> {videoUrl ? "Ders kaydı" : "Tanıtım videosu"}
          </span>
        </div>
      </div>
    </div>
  );
}
