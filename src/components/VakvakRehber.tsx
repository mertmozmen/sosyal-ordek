"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OrdekKafa } from "./Logo";

type Adim = {
  metin: string;
  eylem?: { etiket: string; hedef: string };
};

const ADIMLAR: Adim[] = [
  {
    metin:
      "Vak vak! 👋 Ben Vakvak, Sosyal Ördek'in rehber ördeğiyim. Sana gölümüzü gezdireyim mi?",
  },
  {
    metin:
      "Sosyal Ördek, LGS'ye hazırlanan öğrenciler için 9 aylık online bir eğitim yuvası: canlı dersler, ders tekrarları, soru çözümleri ve 28 haftalık planlar... Hepsi tek gölde! 🏞️",
    eylem: { etiket: "Sosyal Ördek nedir?", hedef: "#nedir" },
  },
  {
    metin:
      "Süreç çok basit: önce ücretsiz ön görüşmede tanışıyoruz, seviyeni birlikte görüyoruz, sonra sana özel 28 haftalık planınla yüzmeye başlıyorsun. 🏊",
    eylem: { etiket: "Yolculuğu gör", hedef: "#surec" },
  },
  {
    metin:
      "Matematik, Fen, Türkçe, İnkılap Tarihi ve İngilizce derslerinde uzman hocalarımız var. Kayıt olur olmaz seni tek tek onlarla tanıştırıyorum!",
    eylem: { etiket: "Derslere bak", hedef: "#dersler" },
  },
  {
    metin:
      "Aklında soru mu var? Ücretsiz ön görüşme ayarlayalım! Söz, ısırmam — ördekler ısırmaz zaten. 😄",
    eylem: { etiket: "Ücretsiz Ön Görüşme", hedef: "/on-gorusme" },
  },
  {
    metin:
      "Ben köşede yüzüyor olacağım; bir şey lazım olursa bana tıklaman yeterli. Görüşürüz, vak! 🦆",
  },
];

export function VakvakRehber() {
  const [acik, setAcik] = useState(false);
  const [adim, setAdim] = useState(0);
  const [gorunenMetin, setGorunenMetin] = useState("");

  useEffect(() => {
    const goruldu = localStorage.getItem("so_rehber_goruldu");
    const zamanlayici = setTimeout(() => {
      if (!goruldu) setAcik(true);
    }, 1200);
    return () => clearTimeout(zamanlayici);
  }, []);

  useEffect(() => {
    if (!acik) return;
    const hedef = ADIMLAR[adim].metin;
    setGorunenMetin("");
    let i = 0;
    const sayac = setInterval(() => {
      i += 3;
      setGorunenMetin(hedef.slice(0, i));
      if (i >= hedef.length) clearInterval(sayac);
    }, 24);
    return () => clearInterval(sayac);
  }, [acik, adim]);

  const kapat = () => {
    setAcik(false);
    setAdim(0);
    localStorage.setItem("so_rehber_goruldu", "1");
  };

  const suanki = ADIMLAR[adim];
  const son = adim === ADIMLAR.length - 1;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {acik && (
        <div className="vak-pop w-[19rem] rounded-3xl rounded-br-md border border-lacivert/10 bg-white p-4 shadow-[0_20px_50px_-20px_rgba(30,58,95,0.5)] sm:w-80">
          <div className="flex items-start justify-between gap-2">
            <span className="chip bg-duck/40 text-lacivert">🦆 Vakvak · Rehber Ördek</span>
            <button
              onClick={kapat}
              className="rounded-full px-2 text-lacivert/50 transition hover:bg-cream-deep hover:text-lacivert"
              aria-label="Rehberi kapat"
            >
              ✕
            </button>
          </div>
          <p className="mt-3 min-h-20 text-sm leading-relaxed text-ink">{gorunenMetin}</p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex gap-1">
              {ADIMLAR.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === adim ? "bg-amber" : "bg-lacivert/15"}`}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              {suanki.eylem &&
                (suanki.eylem.hedef.startsWith("#") ? (
                  <a href={suanki.eylem.hedef} className="btn btn-ghost btn-sm">
                    {suanki.eylem.etiket}
                  </a>
                ) : (
                  <Link href={suanki.eylem.hedef} className="btn btn-ghost btn-sm">
                    {suanki.eylem.etiket}
                  </Link>
                ))}
              {son ? (
                <button onClick={kapat} className="btn btn-amber btn-sm">
                  Görüşürüz! 👋
                </button>
              ) : (
                <button onClick={() => setAdim(adim + 1)} className="btn btn-amber btn-sm">
                  Devam vak! →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => (acik ? kapat() : (setAdim(0), setAcik(true)))}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber bg-white shadow-[0_14px_30px_-12px_rgba(242,168,59,0.8)] transition hover:scale-105 active:scale-95"
        aria-label="Vakvak rehberi aç"
      >
        <OrdekKafa boy={46} className="animate-bob" />
        {!acik && (
          <span className="absolute -top-1 -left-1 rounded-full bg-amber px-1.5 py-0.5 font-display text-[10px] font-bold text-lacivert-koyu shadow">
            Vak!
          </span>
        )}
      </button>
    </div>
  );
}
