"use client";

import { useMemo } from "react";
import { OrdekKafa } from "./Logo";
import { Ikon } from "./ikonlar";
import { EvrimFigur } from "./EvrimFigur";

export { EvrimFigur };
import {
  EVRIM_ASAMALARI,
  asamaBul,
  sonrakiAsama,
  tamamlananHaftaSayisi,
} from "@/lib/data";
import { useStore } from "@/lib/store";

/** Panelim'deki "Yumurtadan Ördeğe" yolculuk şeridi */
export function EvrimSeridi() {
  const { ilerleme } = useStore();
  const tamam = tamamlananHaftaSayisi(ilerleme.gorevler);
  const asama = asamaBul(tamam);
  const sonraki = sonrakiAsama(tamam);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="baslik flex items-center gap-2 text-lg">
          <Ikon ad="yumurta" boy={20} /> Yumurtadan Ördeğe
        </h2>
        <span className="chip bg-duck/40 text-lacivert">
          {asama.ad} · {tamam}/28 hafta
        </span>
      </div>

      <div className="scrollbar-none mt-5 flex items-end justify-between gap-1 overflow-x-auto pb-1">
        {EVRIM_ASAMALARI.map((a) => {
          const durum = a.no < asama.no ? "gecti" : a.no === asama.no ? "simdi" : "kilitli";
          return (
            <div key={a.no} className="flex min-w-16 flex-col items-center gap-1.5 text-center">
              <div
                className={`relative flex items-center justify-center rounded-2xl p-1.5 transition ${
                  durum === "simdi"
                    ? "scale-110 bg-duck/30 ring-2 ring-amber"
                    : durum === "gecti"
                      ? "bg-cream-deep/70"
                      : "bg-[#EEF2F6]"
                }`}
              >
                <EvrimFigur asama={a.no} boy={durum === "simdi" ? 52 : 42} siluet={durum === "kilitli"} className={durum === "simdi" ? "animate-bob" : ""} />
                {durum === "gecti" && (
                  <span className="absolute -top-1 -right-1"><Ikon ad="tik" boy={16} /></span>
                )}
                {durum === "kilitli" && (
                  <span className="absolute -top-1 -right-1"><Ikon ad="kilit" boy={14} /></span>
                )}
              </div>
              <span className={`text-[10px] leading-tight font-bold ${durum === "simdi" ? "text-amber-deep" : "text-lacivert/60"}`}>
                {a.ad}
              </span>
              <span className="text-[9px] text-ink/40">{a.no === 0 ? "başlangıç" : `${a.minHafta}. hafta`}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 rounded-xl bg-duck/20 px-3 py-2 text-xs font-semibold text-lacivert">
        {sonraki
          ? `${sonraki.ad} olmak için ${sonraki.minHafta - tamam} hafta kaldı — ${asama.aciklama}`
          : "Yolculuk tamam: sen artık gölün mezun ördeğisin!"}
      </p>
    </div>
  );
}

/** Aşama atlanınca bir kez gösterilen kutlama ekranı */
export function EvrimKutlama() {
  const { kullanici, ilerleme, evrimGoruldu } = useStore();
  const tamam = tamamlananHaftaSayisi(ilerleme.gorevler);
  const asama = asamaBul(tamam);

  const konfetiler = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        sol: (i * 37) % 100,
        gecikme: ((i * 13) % 20) / 10,
        sure: 2.4 + ((i * 7) % 14) / 10,
        renk: ["#F5A623", "#FFC93C", "#1E3A5F", "#FFFFFF"][i % 4],
        don: (i * 53) % 360,
      })),
    []
  );

  if (!kullanici || ilerleme.gorulenEvrimler[String(asama.no)]) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-lacivert-koyu/85 p-4 backdrop-blur-sm">
      {/* konfeti yağmuru */}
      {konfetiler.map((k, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-[-5%] h-3 w-2 rounded-sm"
          style={{
            left: `${k.sol}%`,
            background: k.renk,
            transform: `rotate(${k.don}deg)`,
            animation: `konfeti-dus ${k.sure}s linear ${k.gecikme}s infinite`,
          }}
        />
      ))}

      <div className="vak-pop relative w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <span className="chip mx-auto bg-duck/40 text-lacivert">
          Yumurtadan Ördeğe · {asama.no + 1}/7
        </span>
        <div className="mt-5 flex items-center justify-center gap-4">
          {asama.no === 6 ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/gorseller/kutlama.svg`}
              alt="Mezuniyet kutlaması"
              className="sicra w-52 rounded-2xl"
            />
          ) : (
            <>
              {asama.no > 0 && (
                <>
                  <EvrimFigur asama={asama.no - 1} boy={64} siluet />
                  <span className="font-display text-2xl font-extrabold text-amber">→</span>
                </>
              )}
              <span className="sicra inline-block">
                <EvrimFigur asama={asama.no} boy={130} className="animate-bob" />
              </span>
            </>
          )}
        </div>
        <h2 className="baslik mt-4 text-3xl">
          {asama.no === 0 ? "Göle hoş geldin!" : `${asama.ad} oldun!`}
        </h2>

        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-cream-deep/60 p-4 text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
            <OrdekKafa boy={32} className="animate-bob" />
          </span>
          <p className="text-sm leading-relaxed text-ink/80">{asama.kutlama}</p>
        </div>

        <button onClick={() => evrimGoruldu(asama.no)} className="btn btn-amber btn-lg mt-6 w-full">
          Vak! Yola devam
        </button>
      </div>
    </div>
  );
}
