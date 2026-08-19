"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Ikon } from "./ikonlar";
import { useStore, type Bildirim } from "@/lib/store";

function zamanEtiketi(iso: string): string {
  const fark = Date.now() - new Date(iso).getTime();
  const dk = Math.floor(fark / 60_000);
  if (dk < 1) return "az önce";
  if (dk < 60) return `${dk} dk önce`;
  const saat = Math.floor(dk / 60);
  if (saat < 24) return `${saat} saat önce`;
  const gun = Math.floor(saat / 24);
  if (gun < 7) return `${gun} gün önce`;
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}

/** Panel köşesindeki bildirim zili: kırmızı sayaçlı buton, açılır liste ve
 *  canlıda düşen bildirimler için vak balonu. */
export function BildirimZili() {
  const { bildirimler, tumBildirimleriOku } = useStore();
  const [acik, setAcik] = useState(false);
  const [balon, setBalon] = useState<Bildirim | null>(null);
  const gorulenler = useRef<Set<string> | null>(null);
  const balonZamani = useRef<ReturnType<typeof setTimeout> | null>(null);

  const okunmamis = bildirimler.filter((b) => !b.okundu).length;

  // Yeni gelen (daha önce görülmemiş) bildirimde balon göster
  useEffect(() => {
    if (gorulenler.current === null) {
      // ilk yükleme: mevcutları balon çıkarmadan kaydet
      gorulenler.current = new Set(bildirimler.map((b) => b.id));
      return;
    }
    const yeni = bildirimler.find((b) => !gorulenler.current!.has(b.id));
    bildirimler.forEach((b) => gorulenler.current!.add(b.id));
    if (yeni && !yeni.okundu) {
      setBalon(yeni);
      if (balonZamani.current) clearTimeout(balonZamani.current);
      balonZamani.current = setTimeout(() => setBalon(null), 7000);
    }
  }, [bildirimler]);

  useEffect(() => () => {
    if (balonZamani.current) clearTimeout(balonZamani.current);
  }, []);

  const panelAc = () => {
    setBalon(null);
    setAcik((o) => {
      if (!o) setTimeout(tumBildirimleriOku, 1500);
      return !o;
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      {/* canlı bildirim balonu */}
      {balon && !acik && (
        <button
          onClick={panelAc}
          className="vak-pop max-w-72 rounded-2xl rounded-br-md border-2 border-amber bg-white p-3.5 text-left shadow-xl"
        >
          <p className="flex items-center gap-1.5 font-display text-sm font-extrabold text-lacivert">
            <Ikon ad={balon.tur === "canli" ? "canli" : "bildirim"} boy={16} />
            {balon.baslik}
          </p>
          {balon.metin && <p className="mt-1 line-clamp-2 text-xs text-ink/70">{balon.metin}</p>}
          <p className="mt-1 text-[10px] font-bold text-amber-deep">Vak! Görmek için tıkla</p>
        </button>
      )}

      {/* açılır bildirim listesi */}
      {acik && (
        <div className="card w-80 max-w-[calc(100vw-2rem)] overflow-hidden p-0 shadow-2xl">
          <div className="flex items-center justify-between bg-lacivert px-4 py-3">
            <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
              <Ikon ad="bildirim" boy={17} /> Bildirimler
            </p>
            <button onClick={() => setAcik(false)} className="text-white/60 transition hover:text-white">
              ✕
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {bildirimler.length === 0 && (
              <p className="p-6 text-center text-sm text-ink/50">
                Henüz bildirimin yok. Gölde her şey sakin, vak!
              </p>
            )}
            {bildirimler.map((b) => {
              const icerik = (
                <>
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      b.tur === "canli" ? "bg-red-50" : "bg-duck/25"
                    }`}
                  >
                    <Ikon ad={b.tur === "canli" ? "canli" : "bildirim"} boy={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="baslik truncate text-sm">{b.baslik}</span>
                      {!b.okundu && <span className="h-2 w-2 shrink-0 rounded-full bg-amber" />}
                    </span>
                    {b.metin && <span className="mt-0.5 line-clamp-2 block text-xs text-ink/65">{b.metin}</span>}
                    <span className="mt-0.5 block text-[10px] text-ink/40">
                      {zamanEtiketi(b.tarih)}
                      {b.hedef === "ogrenci" && " · sana özel"}
                      {b.hedef === "grup" && " · grubuna"}
                    </span>
                  </span>
                </>
              );
              const stil = `flex w-full items-start gap-3 border-b border-lacivert/6 px-4 py-3 text-left transition hover:bg-cream/70 ${
                b.okundu ? "" : "bg-duck/10"
              }`;
              return b.tur === "canli" ? (
                <Link key={b.id} href="/panel/online-derslerim" className={stil} onClick={() => setAcik(false)}>
                  {icerik}
                </Link>
              ) : (
                <div key={b.id} className={stil}>
                  {icerik}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* zil butonu */}
      <button
        onClick={panelAc}
        aria-label="Bildirimler"
        className={`relative flex h-13 w-13 items-center justify-center rounded-full bg-white shadow-lg ring-2 transition hover:scale-105 ${
          okunmamis > 0 ? "ring-amber" : "ring-lacivert/10"
        }`}
      >
        <Ikon ad="bildirim" boy={26} className={okunmamis > 0 ? "animate-bob" : ""} />
        {okunmamis > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 font-display text-[11px] font-extrabold text-white">
            {okunmamis > 9 ? "9+" : okunmamis}
          </span>
        )}
      </button>
    </div>
  );
}
