"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { OrdekKafa } from "./Logo";
import { Ikon } from "./ikonlar";

type Durak = {
  metin: string;
  hedef: string | null;
  eylem?: { etiket: string; href: string };
};

const DURAKLAR: Durak[] = [
  {
    metin:
      "Vak vak! Ben Vakvak, Sosyal Ördek'in rehber ördeğiyim. Kanatlan bakalım, sana gölü yüzerek gezdireyim!",
    hedef: null,
  },
  {
    metin:
      "Burası gölün girişi: Sosyal Ördek, LGS'ye hazırlanan öğrenciler için 9 aylık online bir eğitim yuvası. Canlı dersler, tekrarlar, soru çözümleri... hepsi tek gölde.",
    hedef: "nedir",
  },
  {
    metin:
      "Süreç şöyle akar: önce ücretsiz ön görüşmede tanışırız, seviyeni birlikte görürüz, sonra sana özel 28 haftalık planınla yüzmeye başlarsın.",
    hedef: "surec",
  },
  {
    metin:
      "İşte kürsülerimiz! Matematik, Fen, Türkçe, İnkılap ve İngilizce'de uzman hocalarımız var. Kayıt olur olmaz seni tek tek onlarla tanıştırırım.",
    hedef: "dersler",
  },
  {
    metin:
      "Panelinde her şey seni bekler: kilitli haftalık planlar, ders kayıtları, liderlik tablosu ve forum. Gölde sıkılmak yasak!",
    hedef: "ozellikler",
  },
  {
    metin:
      "Aklında soru varsa ücretsiz ön görüşme ayarlayalım. Söz, ısırmam; ördekler ısırmaz zaten!",
    hedef: "sss",
    eylem: { etiket: "Ön Görüşme Planla", href: "/on-gorusme" },
  },
  {
    metin:
      "Ben köşemde yüzmeye devam ediyorum; bir şey lazım olursa tıklaman yeterli. Görüşürüz, vak!",
    hedef: null,
  },
];

type Faz = "ucus" | "kucul" | "dash" | "varis" | "konusma";

export function VakvakRehber() {
  const [acik, setAcik] = useState(false);
  const [adim, setAdim] = useState(0);
  const [poz, setPoz] = useState<{ x: number; y: number } | null>(null);
  const [faz, setFaz] = useState<Faz>("konusma");
  const [yakinlas, setYakinlas] = useState(false);
  const [ucusY, setUcusY] = useState(30);
  const [gorunenMetin, setGorunenMetin] = useState("");
  const [vakDe, setVakDe] = useState(false);
  const zamanlayicilar = useRef<ReturnType<typeof setTimeout>[]>([]);

  const temizle = () => {
    zamanlayicilar.current.forEach(clearTimeout);
    zamanlayicilar.current = [];
  };
  const sonra = (ms: number, fn: () => void) => {
    zamanlayicilar.current.push(setTimeout(fn, ms));
  };

  // Tanıtım videosu kapatılınca (ya da daha önce izlenmişse ilk ziyarette) turu başlat
  useEffect(() => {
    const goruldu = localStorage.getItem("so_rehber_goruldu");
    const videoIzlendi = localStorage.getItem("so_giris_videosu");
    const t = setTimeout(() => {
      if (!goruldu && videoIzlendi) setAcik(true);
    }, 1500);
    const videodanSonra = () => {
      // Tanıtım videosu her kapandığında Vakvak turu devralır
      setAdim(0);
      setTimeout(() => setAcik(true), 700);
    };
    window.addEventListener("so:video-kapandi", videodanSonra);
    return () => {
      clearTimeout(t);
      window.removeEventListener("so:video-kapandi", videodanSonra);
    };
  }, []);

  // Boştayken ara ara "Vak!" desin
  useEffect(() => {
    if (acik) return;
    const sayac = setInterval(() => {
      setVakDe(true);
      setTimeout(() => setVakDe(false), 2000);
    }, 7000);
    return () => clearInterval(sayac);
  }, [acik]);

  // Adım koreografisi: (bazen uçuş geçişi) → küçül → fırla → zıplayarak büyü → konuş
  useEffect(() => {
    if (!acik) {
      setPoz(null);
      return;
    }
    temizle();
    setGorunenMetin("");
    setYakinlas(false);

    const durak = DURAKLAR[adim];
    const dar = window.innerWidth < 768;
    const ilkSahne = poz === null;

    // "bazen" ekranı boydan boya geçsin (adıma bağlı sözde-rastgele, ~%40)
    const ucusVar = !ilkSahne && !dar && (adim * 37 + 11) % 5 < 2;

    const hedefeYerles = () => {
      const el = durak.hedef ? document.getElementById(durak.hedef) : null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

      sonra(el ? 620 : 40, () => {
        let x: number;
        let y: number;
        if (dar) {
          x = window.innerWidth - 96;
          y = window.innerHeight - 250;
        } else if (el) {
          const r = el.getBoundingClientRect();
          const solda = adim % 2 === 1;
          x = solda
            ? Math.max(24, r.left - 40)
            : Math.min(window.innerWidth - 120, r.right - 60);
          y = Math.min(Math.max(r.top + 40, 110), window.innerHeight - 320);
        } else if (adim === DURAKLAR.length - 1) {
          x = window.innerWidth - 120;
          y = window.innerHeight - 200;
        } else {
          x = window.innerWidth * 0.52;
          y = window.innerHeight * 0.3;
        }
        setPoz({ x, y });
        setFaz(ilkSahne ? "varis" : "dash");

        sonra(ilkSahne ? 60 : 500, () => {
          setFaz("varis");
          sonra(560, () => {
            setFaz("konusma");
            const hedefMetin = durak.metin;
            let i = 0;
            const yazici = setInterval(() => {
              i += 3;
              setGorunenMetin(hedefMetin.slice(0, i));
              if (i >= hedefMetin.length) clearInterval(yazici);
            }, 22);
            zamanlayicilar.current.push(yazici as unknown as ReturnType<typeof setTimeout>);

            // konuşurken ara ara ekrana yaklaş
            const yakinlastir = () => {
              setYakinlas(true);
              sonra(1650, () => setYakinlas(false));
              sonra(5200 + ((adim * 700) % 2000), yakinlastir);
            };
            sonra(2800, yakinlastir);
          });
        });
      });
    };

    if (ucusVar) {
      setUcusY(16 + ((adim * 23) % 45));
      setFaz("ucus");
      sonra(1020, () => {
        setFaz("kucul");
        hedefeYerles();
      });
    } else if (!ilkSahne) {
      setFaz("kucul");
      sonra(300, hedefeYerles);
    } else {
      hedefeYerles();
    }

    return temizle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acik, adim]);

  const kapat = useCallback(() => {
    temizle();
    setAcik(false);
    setAdim(0);
    setFaz("konusma");
    setYakinlas(false);
    localStorage.setItem("so_rehber_goruldu", "1");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const durak = DURAKLAR[adim];
  const son = adim === DURAKLAR.length - 1;
  const solTaraf = poz !== null && poz.x > (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const hareketHalinde = faz === "kucul" || faz === "dash" || faz === "ucus";

  return (
    <>
      {/* Ekranı boydan boya geçen uçuş sahnesi */}
      {acik && faz === "ucus" && (
        <div className="pointer-events-none fixed left-0 z-[60]" style={{ top: `${ucusY}%` }}>
          <div className="vakvak-ucus relative">
            {/* hız çizgileri */}
            <span className="hiz-cizgisi absolute top-3 -right-2 h-1.5 w-24 rounded-full bg-amber/70" />
            <span className="hiz-cizgisi absolute top-9 -right-8 h-1 w-32 rounded-full bg-duck/80" style={{ animationDelay: "0.12s" }} />
            <span className="hiz-cizgisi absolute top-14 -right-4 h-1.5 w-20 rounded-full bg-lacivert/20" style={{ animationDelay: "0.24s" }} />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber bg-white shadow-xl">
              <OrdekKafa boy={44} />
            </div>
            <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-amber/70"
                  style={{ animation: `damla 0.5s ease-out ${i * 0.12}s infinite` }} />
              ))}
            </span>
          </div>
        </div>
      )}

      {/* Gezen Vakvak */}
      {acik && poz && faz !== "ucus" && (
        <div
          className="fixed z-50"
          style={{
            left: poz.x,
            top: poz.y,
            transition:
              faz === "dash"
                ? "left 0.48s cubic-bezier(.55,0,.15,1), top 0.48s cubic-bezier(.55,0,.15,1)"
                : "none",
          }}
        >
          <div className="relative">
            {/* Ördek */}
            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber bg-white shadow-[0_16px_36px_-12px_rgba(242,168,59,0.85)] ${
                faz === "kucul"
                  ? "vakvak-kucul"
                  : faz === "dash"
                    ? "vakvak-mini"
                    : faz === "varis"
                      ? "vakvak-varis"
                      : yakinlas
                        ? "vakvak-yakinlas z-10"
                        : "animate-bob"
              }`}
            >
              <OrdekKafa boy={56} />
              {faz === "dash" && (
                <>
                  <span className="hiz-cizgisi absolute top-4 -right-14 h-2 w-16 rounded-full bg-amber/70" />
                  <span className="hiz-cizgisi absolute top-10 -right-20 h-1.5 w-24 rounded-full bg-duck/80" style={{ animationDelay: "0.1s" }} />
                </>
              )}
              {hareketHalinde && (
                <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-amber/70"
                      style={{ animation: `damla 0.7s ease-out ${i * 0.18}s infinite` }}
                    />
                  ))}
                </span>
              )}
            </div>

            {/* Konuşma balonu */}
            {faz === "konusma" && (
              <div
                className={`vak-pop absolute top-0 w-72 rounded-3xl border border-lacivert/10 bg-white p-4 shadow-[0_20px_50px_-18px_rgba(30,58,95,0.55)] sm:w-80 ${
                  solTaraf
                    ? "right-24 rounded-tr-md"
                    : "left-24 rounded-tl-md"
                } max-sm:right-0 max-sm:-top-2 max-sm:-translate-y-full max-sm:rounded-br-md`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="chip bg-duck/40 text-lacivert">
                    <Ikon ad="vak" boy={15} /> Vakvak · Rehber Ördek
                  </span>
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
                    {DURAKLAR.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          i === adim ? "w-4 bg-amber" : "bg-lacivert/15"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    {durak.eylem && (
                      <Link href={durak.eylem.href} className="btn btn-ghost btn-sm">
                        {durak.eylem.etiket}
                      </Link>
                    )}
                    {son ? (
                      <button onClick={kapat} className="btn btn-amber btn-sm">
                        Görüşürüz!
                      </button>
                    ) : (
                      <button onClick={() => setAdim(adim + 1)} className="btn btn-amber btn-sm">
                        Yüz bakalım →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Köşedeki bekleme hali */}
      {!acik && (
        <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
          <div className="animate-yuz relative">
            {vakDe && (
              <span className="vak-pop absolute -top-9 right-2 rounded-2xl rounded-br-sm border border-lacivert/10 bg-white px-3 py-1.5 font-display text-xs font-bold text-lacivert shadow-lg">
                Vak! Gezdireyim mi?
              </span>
            )}
            <button
              onClick={() => {
                setAdim(0);
                setAcik(true);
              }}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber bg-white shadow-[0_14px_30px_-12px_rgba(242,168,59,0.8)] transition hover:scale-110 active:scale-95"
              aria-label="Vakvak ile turu başlat"
            >
              <span className="halka" />
              <OrdekKafa boy={46} className="animate-bob" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
