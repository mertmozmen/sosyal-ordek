"use client";

import { useEffect, useState } from "react";
import { OrdekKafa } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { VideoModal } from "@/components/VideoModal";
import { DERS_MAP, HOCALAR, type Hoca } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function HocaniTani() {
  const { ilerleme, hocaVideoIzle } = useStore();
  const [hosgeldin, setHosgeldin] = useState(false);
  const [acikHoca, setAcikHoca] = useState<Hoca | null>(null);

  useEffect(() => {
    if (window.location.search.includes("hosgeldin=1")) setHosgeldin(true);
  }, []);

  const izlenen = Object.keys(ilerleme.hocaVideolari).length;

  return (
    <div className="space-y-6">
      {hosgeldin && (
        <div className="vak-pop card flex flex-col items-center gap-4 border-2 border-amber bg-duck/15 p-6 text-center sm:flex-row sm:text-left">
          <OrdekKafa boy={72} className="shrink-0 animate-bob" />
          <div>
            <h2 className="baslik text-xl">Aramıza hoş geldin!</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink/75">
              Ben Vakvak! Göldeki ilk görevin çok keyifli: aşağıdan hocalarının tanışma
              videolarını izle. Sonra "Haftalık Planlarım"dan 1. haftanı açıp yüzmeye
              başlayabilirsin. Vak vak!
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="baslik flex items-center gap-2.5 text-3xl"><Ikon ad="hoca" boy={32} /> Hocanı Tanı</h1>
          <p className="mt-1 text-sm text-ink/60">
            9 ay boyunca sana eşlik edecek ekip burada. Videolarını izle, derse öyle gel!
          </p>
        </div>
        <span className="chip bg-duck/40 text-lacivert">
          {izlenen}/{HOCALAR.length} hocayla tanıştın
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {HOCALAR.map((h) => {
          const ders = DERS_MAP[h.ders];
          const izlendi = !!ilerleme.hocaVideolari[h.id];
          return (
            <div key={h.id} className="card overflow-hidden">
              <button
                onClick={() => setAcikHoca(h)}
                className="group relative block aspect-video w-full"
                style={{ background: `linear-gradient(135deg, ${ders.renk}, ${ders.renk}99)` }}
                aria-label={`${h.ad} tanışma videosunu izle`}
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  <OrdekKafa boy={80} className="drop-shadow-lg transition group-hover:scale-110" />
                </span>
                <span className="absolute right-3 bottom-3 chip bg-black/40 text-white">
                  <Ikon ad="oynat" boy={14} /> {h.videoSure}
                </span>
                {izlendi && (
                  <span className="absolute top-3 left-3 chip bg-white text-lacivert">✓ İzledin</span>
                )}
              </button>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="baslik text-lg">{h.ad}</h2>
                  <span className="chip" style={{ background: `${ders.renk}22`, color: ders.renk }}>
                    <Ikon ad={ders.id} boy={14} /> {ders.kisaAd}
                  </span>
                </div>
                <p className="text-xs font-bold text-amber-deep">
                  {h.unvan} · {h.deneyim} yıl deneyim
                </p>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink/70">{h.tanitim}</p>
                <button onClick={() => setAcikHoca(h)} className="btn btn-ghost btn-sm mt-3">
                  {izlendi ? "Tekrar izle" : "Tanışma videosunu izle"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <VideoModal
        acik={!!acikHoca}
        baslik={acikHoca ? `${acikHoca.ad} · Tanışma Videosu` : ""}
        altBaslik={acikHoca ? `"${acikHoca.motto}"` : undefined}
        onKapat={() => setAcikHoca(null)}
        onBitti={() => acikHoca && hocaVideoIzle(acikHoca.id)}
      />
    </div>
  );
}
