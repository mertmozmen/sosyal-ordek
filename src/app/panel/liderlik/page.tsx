"use client";

import { useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { ODULLER, SIRALAMA } from "@/lib/data";
import { useStore, vakPuan } from "@/lib/store";

type Donem = "gun" | "hafta" | "ay";

const DONEM_ETIKET: Record<Donem, { ad: string; unvan: string }> = {
  gun: { ad: "Bugün", unvan: "Günün Ördeği" },
  hafta: { ad: "Bu Hafta", unvan: "Haftanın Ördeği" },
  ay: { ad: "Bu Ay", unvan: "Ayın Ördeği" },
};

export default function Liderlik() {
  const { kullanici, ilerleme } = useStore();
  const [donem, setDonem] = useState<Donem>("gun");
  if (!kullanici) return null;

  const alan = donem === "gun" ? "puanGun" : donem === "hafta" ? "puanHafta" : "puanAy";
  const benimPuan = vakPuan(ilerleme);

  const liste = [
    ...SIRALAMA.map((o) => ({
      ad: o.ad,
      avatarRenk: o.avatarRenk,
      puan: o[alan] as number,
      seri: o.seri,
      rozet: o.rozet,
      ben: false,
    })),
    {
      ad: `${kullanici.ad} (sen)`,
      avatarRenk: kullanici.avatarRenk,
      puan: benimPuan,
      seri: 1,
      rozet: "Gölün Yenisi",
      ben: true,
    },
  ].sort((a, b) => b.puan - a.puan);

  const benimSira = liste.findIndex((o) => o.ben) + 1;
  const [birinci, ikinci, ucuncu, ...digerleri] = liste;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="baslik text-3xl">🏆 Liderlik Tablosu</h1>
          <p className="mt-1 text-sm text-ink/60">
            Gölün en çalışkan ördekleri! Puanlar; görev, soru, canlı ders ve tekrarlardan toplanır.
          </p>
        </div>
        <div className="flex gap-1.5">
          {(Object.keys(DONEM_ETIKET) as Donem[]).map((d) => (
            <button
              key={d}
              onClick={() => setDonem(d)}
              className={`btn btn-sm ${donem === d ? "btn-lacivert" : "btn-ghost"}`}
            >
              {DONEM_ETIKET[d].ad}
            </button>
          ))}
        </div>
      </div>

      {/* Şampiyon */}
      <div className="card relative overflow-hidden border-2 border-amber bg-gradient-to-br from-duck/25 to-white p-6">
        <span className="absolute top-4 right-5 text-5xl">👑</span>
        <span className="chip bg-amber text-lacivert-koyu">
          {DONEM_ETIKET[donem].unvan} 🦆
        </span>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <OrdekAvatar renk={birinci.avatarRenk} boy={72} className="ring-4 ring-amber" />
          <div>
            <h2 className="baslik text-2xl">{birinci.ad}</h2>
            <p className="text-sm font-bold text-amber-deep">
              {birinci.puan} puan · {birinci.seri} günlük seri 🔥 · "{birinci.rozet}"
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-lacivert">
          🎁 Ödül: {ODULLER[donem]}
        </p>
      </div>

      {/* Podyum 2-3 */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[ikinci, ucuncu].map((o, i) => (
          <div key={o.ad} className={`card flex items-center gap-4 p-5 ${o.ben ? "border-2 border-amber" : ""}`}>
            <span className="font-display text-3xl font-extrabold text-lacivert/30">
              {i + 2}.
            </span>
            <OrdekAvatar renk={o.avatarRenk} boy={52} />
            <div className="min-w-0 flex-1">
              <p className="baslik truncate text-base">{o.ad}</p>
              <p className="text-xs text-ink/55">
                {o.puan} puan · "{o.rozet}"
              </p>
            </div>
            <span className="text-2xl">{i === 0 ? "🥈" : "🥉"}</span>
          </div>
        ))}
      </div>

      {/* Liste */}
      <div className="card divide-y divide-lacivert/6 overflow-hidden">
        {digerleri.map((o, i) => (
          <div
            key={o.ad}
            className={`flex items-center gap-4 px-5 py-3.5 ${o.ben ? "bg-duck/20" : ""}`}
          >
            <span className="w-7 shrink-0 text-center font-display font-extrabold text-lacivert/40">
              {i + 4}
            </span>
            <OrdekAvatar renk={o.avatarRenk} boy={38} />
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-bold ${o.ben ? "text-amber-deep" : "text-ink"}`}>
                {o.ad}
              </p>
              <p className="text-[11px] text-ink/50">"{o.rozet}"</p>
            </div>
            <span className="shrink-0 font-display text-sm font-extrabold text-lacivert">
              {o.puan} p
            </span>
          </div>
        ))}
      </div>

      <div className="card flex flex-wrap items-center justify-between gap-3 bg-lacivert p-5 text-white">
        <p className="font-display font-bold">
          Senin sıran: <span className="text-duck">#{benimSira}</span> · {benimPuan} vak puanı
        </p>
        <p className="text-sm text-white/70">
          Görev tamamla, derse katıl, tekrar izle → puanlar cebine, vak! 🦆
        </p>
      </div>
    </div>
  );
}
