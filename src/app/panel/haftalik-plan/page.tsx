"use client";

import { useState } from "react";
import { DERS_MAP, GOREV_TIP, HAFTALAR, haftaDurumu } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function HaftalikPlan() {
  const { ilerleme, gorevToggle } = useStore();
  const acikHafta = haftaDurumu(ilerleme.gorevler);
  const [genisletilen, setGenisletilen] = useState<number | null>(acikHafta);

  const tamamlananHafta = acikHafta - 1;
  const genelYuzde = Math.round((tamamlananHafta / HAFTALAR.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik text-3xl">🗓️ Haftalık Planlarım</h1>
        <p className="mt-1 text-sm text-ink/60">
          28 haftalık yolculuğun takvimi. Bir haftanın tüm görevlerini bitirmeden sonraki hafta
          açılmaz — göl kuralı! 🔒
        </p>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-lacivert/80">
          <span>
            🏁 {tamamlananHafta} hafta tamamlandı · {acikHafta}. haftadasın
          </span>
          <span>%{genelYuzde}</span>
        </div>
        <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-cream-deep">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber to-duck transition-all"
            style={{ width: `${Math.max(2, genelYuzde)}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {HAFTALAR.map((hafta) => {
          const durum =
            hafta.no < acikHafta ? "tamam" : hafta.no === acikHafta ? "acik" : "kilitli";
          const tamamSayi = hafta.gorevler.filter((g) => ilerleme.gorevler[g.id]).length;
          const acikMi = genisletilen === hafta.no && durum !== "kilitli";

          return (
            <div
              key={hafta.no}
              className={`card overflow-hidden transition ${
                durum === "acik" ? "border-2 border-amber" : ""
              } ${durum === "kilitli" ? "opacity-60" : ""}`}
            >
              <button
                onClick={() =>
                  durum !== "kilitli" && setGenisletilen(acikMi ? null : hafta.no)
                }
                className={`flex w-full items-center gap-4 p-4 text-left ${
                  durum === "kilitli" ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold ${
                    durum === "tamam"
                      ? "bg-green-100 text-green-700"
                      : durum === "acik"
                        ? "bg-amber text-lacivert-koyu"
                        : "bg-cream-deep text-lacivert/40"
                  }`}
                >
                  {durum === "tamam" ? "✓" : durum === "kilitli" ? "🔒" : hafta.no}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="baslik text-base">
                      {hafta.no}. Hafta · {hafta.tema}
                    </h2>
                    {durum === "acik" && (
                      <span className="chip bg-duck/40 text-lacivert">🦆 Bu haftadasın</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink/55">
                    {durum === "kilitli"
                      ? `Önce ${hafta.no - 1}. haftayı bitirmelisin`
                      : `${tamamSayi}/${hafta.gorevler.length} görev tamamlandı`}
                  </p>
                </div>
                {durum !== "kilitli" && (
                  <span className={`text-lacivert/40 transition ${acikMi ? "rotate-90" : ""}`}>▸</span>
                )}
              </button>

              {acikMi && (
                <div className="border-t border-lacivert/8 bg-cream/60 p-4">
                  <ul className="space-y-2">
                    {hafta.gorevler.map((g) => {
                      const ders = DERS_MAP[g.ders] ?? { emoji: "🌟", kisaAd: "Genel", renk: "#F2A83B" };
                      const tamam = !!ilerleme.gorevler[g.id];
                      return (
                        <li key={g.id}>
                          <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md">
                            <input
                              type="checkbox"
                              checked={tamam}
                              onChange={() => gorevToggle(g.id)}
                              className="h-5 w-5 shrink-0 accent-amber"
                            />
                            <span className="text-lg">{GOREV_TIP[g.tip].emoji}</span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block text-sm font-semibold ${
                                  tamam ? "text-ink/40 line-through" : "text-ink"
                                }`}
                              >
                                {g.baslik}
                              </span>
                              <span className="text-[11px] text-ink/50">
                                {GOREV_TIP[g.tip].ad}
                                {g.soru > 0 && ` · ${g.soru} soru`} · ~{g.dakika} dk
                              </span>
                            </span>
                            <span
                              className="chip shrink-0 text-white"
                              style={{ background: ders.renk }}
                            >
                              {ders.emoji} {ders.kisaAd}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {tamamSayi === hafta.gorevler.length && hafta.no < 28 && (
                    <p className="mt-3 rounded-xl bg-green-50 px-3 py-2 text-center text-sm font-bold text-green-700">
                      🎉 Hafta tamamlandı! Sonraki hafta açıldı, vak vak!
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
