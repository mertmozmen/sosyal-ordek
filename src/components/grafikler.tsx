"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Ikon } from "./ikonlar";
import { DERSLER, EVRIM_ASAMALARI, HAFTALAR, asamaBul, tamamlananHaftaSayisi } from "@/lib/data";
import { gunAnahtari, type GunlukAktivite, type Ilerleme } from "@/lib/store";

const GUN_ADLARI = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function tarihEtiketi(anahtar: string): string {
  const t = new Date(`${anahtar}T12:00:00`);
  return `${t.getDate()} ${["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"][t.getMonth()]}`;
}

function gunAdi(anahtar: string): string {
  return GUN_ADLARI[new Date(`${anahtar}T12:00:00`).getDay()];
}

/** Son 14 günlük tek serili alan grafiği (crosshair + araç ipucu ile) */
export function AlanGrafigi({
  gunluk,
  alan,
  baslik,
  birim,
  renk = "#1E3A5F",
  dolgu = "#F5A623",
}: {
  gunluk: Record<string, GunlukAktivite>;
  alan: keyof GunlukAktivite;
  baslik: string;
  birim: string;
  renk?: string;
  dolgu?: string;
}) {
  const [secili, setSecili] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const veri = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const anahtar = gunAnahtari(13 - i);
        return { anahtar, deger: gunluk[anahtar]?.[alan] ?? 0 };
      }),
    [gunluk, alan]
  );

  const G = 560;
  const Y = 190;
  const SOL = 34;
  const ALT = 26;
  const UST = 14;
  const enCok = Math.max(10, ...veri.map((v) => v.deger));
  const x = (i: number) => SOL + (i * (G - SOL - 10)) / 13;
  const y = (d: number) => UST + (Y - ALT - UST) * (1 - d / enCok);

  const cizgi = veri.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v.deger).toFixed(1)}`).join(" ");
  const alanYolu = `${cizgi} L${x(13).toFixed(1)} ${Y - ALT} L${x(0).toFixed(1)} ${Y - ALT} Z`;

  const izle = (e: React.PointerEvent) => {
    const kutu = svgRef.current?.getBoundingClientRect();
    if (!kutu) return;
    const ekranX = ((e.clientX - kutu.left) / kutu.width) * G;
    const i = Math.round(((ekranX - SOL) / (G - SOL - 10)) * 13);
    setSecili(Math.min(13, Math.max(0, i)));
  };

  const s = secili !== null ? veri[secili] : null;

  return (
    <div className="card p-5">
      <h3 className="baslik text-base">{baslik}</h3>
      <p className="text-xs text-ink/50">Son 14 gün</p>
      <div className="relative mt-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${G} ${Y}`}
          className="w-full touch-none select-none"
          onPointerMove={izle}
          onPointerLeave={() => setSecili(null)}
        >
          <defs>
            <linearGradient id={`alan-${alan}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={dolgu} stopOpacity="0.35" />
              <stop offset="100%" stopColor={dolgu} stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* ızgara + y etiketleri */}
          {[0, 0.5, 1].map((oran) => {
            const deger = Math.round(enCok * oran);
            const yy = y(deger);
            return (
              <g key={oran}>
                <line x1={SOL} x2={G - 10} y1={yy} y2={yy} stroke="#1E3A5F" strokeOpacity="0.08" strokeWidth="1" />
                <text x={SOL - 6} y={yy + 3.5} textAnchor="end" fontSize="10" fill="#232A35" fillOpacity="0.45">
                  {deger}
                </text>
              </g>
            );
          })}

          {/* alan + çizgi */}
          <path d={alanYolu} fill={`url(#alan-${alan})`} />
          <path d={cizgi} fill="none" stroke={renk} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {/* x etiketleri */}
          {[0, 6, 13].map((i) => (
            <text key={i} x={x(i)} y={Y - 8} textAnchor="middle" fontSize="10" fill="#232A35" fillOpacity="0.45">
              {tarihEtiketi(veri[i].anahtar)}
            </text>
          ))}

          {/* crosshair + işaretçi */}
          {s && secili !== null && (
            <g>
              <line x1={x(secili)} x2={x(secili)} y1={UST} y2={Y - ALT} stroke="#1E3A5F" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={x(secili)} cy={y(s.deger)} r="5" fill={dolgu} stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
        </svg>

        {s && secili !== null && (
          <div
            className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 rounded-xl bg-lacivert px-2.5 py-1.5 text-center shadow-lg"
            style={{ left: `${(x(secili) / G) * 100}%` }}
          >
            <p className="text-[10px] whitespace-nowrap text-white/60">
              {gunAdi(s.anahtar)} · {tarihEtiketi(s.anahtar)}
            </p>
            <p className="font-display text-sm font-extrabold text-duck">
              {s.deger} {birim}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Merkezinde büyük değer olan halka (ilerleme) grafiği */
export function HalkaGrafik({
  yuzde,
  merkez,
  etiket,
  renk = "#F5A623",
}: {
  yuzde: number;
  merkez: string;
  etiket: string;
  renk?: string;
}) {
  const [dolu, setDolu] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setDolu(Math.min(100, Math.max(0, yuzde))), 80);
    return () => clearTimeout(t);
  }, [yuzde]);

  const R = 44;
  const cevre = 2 * Math.PI * R;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 112 112" className="h-full w-full -rotate-90">
          <circle cx="56" cy="56" r={R} fill="none" stroke="#1E3A5F" strokeOpacity="0.08" strokeWidth="10" />
          <circle
            cx="56"
            cy="56"
            r={R}
            fill="none"
            stroke={renk}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={cevre}
            strokeDashoffset={cevre * (1 - dolu / 100)}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.3,.7,.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-extrabold text-lacivert">{merkez}</span>
        </div>
      </div>
      <p className="text-center text-xs font-bold text-lacivert/70">{etiket}</p>
    </div>
  );
}

/** Ders bazında çözülen soru çubukları (ikon + etiketli, kimlik renge muhtaç değil) */
export function DersBarlari({ dersBazinda }: { dersBazinda: Record<string, number> }) {
  const enCok = Math.max(1, ...DERSLER.map((d) => dersBazinda[d.id] ?? 0));
  const toplam = DERSLER.reduce((t, d) => t + (dersBazinda[d.id] ?? 0), 0);

  return (
    <div className="card p-5">
      <h3 className="baslik text-base">Ders ders sorular</h3>
      <p className="text-xs text-ink/50">Toplam {toplam} soru</p>
      <div className="mt-3 space-y-2.5">
        {DERSLER.map((d) => {
          const deger = dersBazinda[d.id] ?? 0;
          return (
            <div key={d.id} className="group flex items-center gap-2" title={`${d.ad}: ${deger} soru`}>
              <span className="flex w-16 shrink-0 items-center gap-1 text-xs font-bold text-lacivert/80">
                <Ikon ad={d.id} boy={15} /> {d.kisaAd}
              </span>
              <div className="h-4 flex-1 overflow-hidden rounded-[4px] bg-cream-deep/70">
                <div
                  className="dalga-doku h-full rounded-r-[4px] transition-all duration-700 group-hover:brightness-110"
                  style={{ width: `${(deger / enCok) * 100}%`, background: d.renk }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-extrabold text-ink/70">{deger}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** 28 haftalık yolculuk ısı haritası */
export function HaftaHaritasi({ ilerleme }: { ilerleme: Ilerleme }) {
  const tamamlanan = tamamlananHaftaSayisi(ilerleme.gorevler);
  const asama = asamaBul(tamamlanan);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="baslik text-base">28 haftalık göl haritası</h3>
          <p className="text-xs text-ink/50">
            {tamamlanan} hafta bitti · şu an {asama.ad.toLocaleLowerCase("tr")} aşamasındasın
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-ink/55">
          <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-[3px] bg-amber" /> Tamamlandı</span>
          <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-[3px] border-2 border-amber bg-duck/30" /> Bu hafta</span>
          <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-[3px] bg-cream-deep" /> Kilitli</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1.5 sm:grid-cols-[repeat(14,minmax(0,1fr))]">
        {HAFTALAR.map((h) => {
          const gorevSayisi = h.gorevler.filter((g) => ilerleme.gorevler[g.id]).length;
          const durum = h.no <= tamamlanan ? "tamam" : h.no === tamamlanan + 1 ? "simdi" : "kilitli";
          const evrimNoktasi = EVRIM_ASAMALARI.find((a) => a.minHafta === h.no);
          return (
            <div
              key={h.no}
              title={`${h.no}. Hafta · ${h.tema} — ${gorevSayisi}/${h.gorevler.length} görev${evrimNoktasi ? ` · ${evrimNoktasi.ad} olunur!` : ""}`}
              className={`relative flex aspect-square items-center justify-center rounded-[5px] font-display text-[10px] font-extrabold transition hover:scale-110 ${
                durum === "tamam"
                  ? "bg-amber text-lacivert-koyu"
                  : durum === "simdi"
                    ? "border-2 border-amber bg-duck/30 text-lacivert"
                    : "bg-cream-deep text-lacivert/35"
              }`}
            >
              {h.no}
              {evrimNoktasi && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-white bg-lacivert" />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-right text-[10px] text-ink/40">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-lacivert align-middle" />
        işaretli haftalarda yeni evrim aşaması açılır
      </p>
    </div>
  );
}
