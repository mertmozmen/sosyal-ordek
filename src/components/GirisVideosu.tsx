"use client";

import { useEffect, useState } from "react";
import { OrdekKafa } from "./Logo";
import { Ikon } from "./ikonlar";
import { medyaYolu } from "@/lib/supabase";
import { useStore } from "@/lib/store";

/** Siteye ilk girişte açılan tanıtım videosu; kapatılınca Vakvak turu devralır. */
export function GirisVideosu() {
  const { siteAyarlar } = useStore();
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    const goruldu = localStorage.getItem("so_giris_videosu");
    const t = setTimeout(() => {
      if (!goruldu) setAcik(true);
    }, 600);
    const dinle = () => setAcik(true);
    window.addEventListener("so:video-ac", dinle);
    return () => {
      clearTimeout(t);
      window.removeEventListener("so:video-ac", dinle);
    };
  }, []);

  const kapat = () => {
    localStorage.setItem("so_giris_videosu", "1");
    setAcik(false);
    window.dispatchEvent(new Event("so:video-kapandi"));
  };

  if (!acik) return null;

  const url = medyaYolu(siteAyarlar["tanitim_video_url"] || "video/tanitim.mp4");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-lacivert-koyu/85 p-4 backdrop-blur-sm">
      <div className="vak-pop w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={32} className="animate-bob" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="baslik text-lg">Gölümüze hoş geldin!</h2>
            <p className="text-xs text-ink/60">
              Önce kısa tanıtımımızı izle; sonra Vakvak seni yüzerek gezdirecek.
            </p>
          </div>
          <button
            onClick={kapat}
            className="rounded-full bg-cream-deep px-3 py-1 font-bold text-lacivert transition hover:bg-duck/50"
            aria-label="Videoyu kapat"
          >
            ✕
          </button>
        </div>

        <video src={url} controls playsInline autoPlay muted className="aspect-video w-full bg-black" />

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <p className="text-xs text-ink/55">İpucu: Sesi videonun üzerindeki hoparlörden açabilirsin.</p>
          <button onClick={kapat} className="btn btn-amber btn-md">
            İzledim, gölü gezelim <Ikon ad="dalga" boy={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Hero'daki "Tanıtımı İzle" butonu (istemci tarafı) */
export function TanitimButonu() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("so:video-ac"))}
      className="btn btn-ghost btn-lg"
    >
      <Ikon ad="oynat" boy={20} /> Tanıtımı İzle
    </button>
  );
}
