"use client";

import { useEffect, useState } from "react";
import { OrdekKafa } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { VideoModal } from "@/components/VideoModal";
import { DERS_MAP, HOCALAR, type Tekrar } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function Tekrarlarim() {
  const { ilerleme, tekrarIzle, tekrarlar } = useStore();
  const [sekme, setSekme] = useState<"ders" | "soru">("ders");
  const [acik, setAcik] = useState<Tekrar | null>(null);

  useEffect(() => {
    if (window.location.search.includes("tab=soru")) setSekme("soru");
  }, []);

  const liste = tekrarlar.filter((t) => t.tur === sekme).sort((a, b) => b.hafta - a.hafta);
  const izlenenSayi = tekrarlar.filter((t) => ilerleme.tekrarlar[t.id]).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="baslik flex items-center gap-2.5 text-3xl"><Ikon ad="tekrar" boy={32} /> Ders Tekrarlarım</h1>
          <p className="mt-1 text-sm text-ink/60">
            Tüm canlı derslerin ve soru çözümü oturumlarının kayıtları burada — istediğin kadar
            geri sar!
          </p>
        </div>
        <span className="chip bg-duck/40 text-lacivert">
          {izlenenSayi}/{tekrarlar.length} kayıt izledin
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSekme("ders")}
          className={`btn btn-md ${sekme === "ders" ? "btn-lacivert" : "btn-ghost"}`}
        >
          <Ikon ad="canli" boy={16} /> Ders Tekrarları
        </button>
        <button
          onClick={() => setSekme("soru")}
          className={`btn btn-md ${sekme === "soru" ? "btn-lacivert" : "btn-ghost"}`}
        >
          <Ikon ad="soru" boy={16} /> Soru Çözüm Tekrarlarım
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {liste.map((t) => {
          const ders = DERS_MAP[t.ders];
          const hoca = HOCALAR.find((h) => h.id === t.hocaId)!;
          const izlendi = !!ilerleme.tekrarlar[t.id];
          return (
            <div key={t.id} className="card overflow-hidden">
              <button
                onClick={() => setAcik(t)}
                className="group relative block aspect-video w-full"
                style={{ background: `linear-gradient(135deg, ${ders.renk}, ${ders.renk}88)` }}
                aria-label={`${t.baslik} kaydını izle`}
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition group-hover:scale-110">
                    <Ikon ad="oynat" boy={34} />
                  </span>
                </span>
                <span className="absolute right-3 bottom-3 chip bg-black/40 text-white">{t.sure}</span>
                <span className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90">
                  <Ikon ad={ders.id} boy={22} />
                </span>
                {izlendi && (
                  <span className="absolute top-3 right-3 chip bg-white text-lacivert">✓ İzlendi</span>
                )}
              </button>
              <div className="p-4">
                <h2 className="baslik line-clamp-2 min-h-11 text-sm">{t.baslik}</h2>
                <p className="mt-1 text-xs text-ink/55">
                  {hoca.ad} · {t.tarih}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {liste.length === 0 && (
        <div className="card flex flex-col items-center gap-3 p-10 text-center">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={68} />
          </span>
          <p className="font-display font-bold text-lacivert/60">
            Henüz kayıt yok — ilk oturumdan sonra burası şenlenecek, vak!
          </p>
        </div>
      )}

      <VideoModal
        acik={!!acik}
        baslik={acik?.baslik ?? ""}
        altBaslik={acik ? `${HOCALAR.find((h) => h.id === acik.hocaId)?.ad} · ${acik.sure}` : undefined}
        onKapat={() => setAcik(null)}
        onBitti={() => acik && tekrarIzle(acik.id)}
      />
    </div>
  );
}
