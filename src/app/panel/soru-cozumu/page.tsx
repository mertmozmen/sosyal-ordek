"use client";

import Link from "next/link";
import { useState } from "react";
import { Ikon } from "@/components/ikonlar";
import { DERSLER, DERS_MAP, GUNLER, HOCALAR } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function SoruCozumu() {
  const { ilerleme, dersKatil, canliDersler } = useStore();
  const oturumlar = canliDersler.filter((d) => d.tur === "soru");
  const [soruDers, setSoruDers] = useState("mat");
  const [soruMetin, setSoruMetin] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const bugun = (new Date().getDay() + 6) % 7;

  const soruGonder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!soruMetin.trim()) return;
    const sorular = JSON.parse(localStorage.getItem("so_gonderilen_sorular") ?? "[]");
    sorular.push({ ders: soruDers, metin: soruMetin, tarih: new Date().toISOString() });
    localStorage.setItem("so_gonderilen_sorular", JSON.stringify(sorular));
    setGonderildi(true);
    setSoruMetin("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl"><Ikon ad="soru" boy={32} /> Soru Çözümü</h1>
        <p className="mt-1 text-sm text-ink/60">
          Takıldığın soruyu önceden gönder, canlı oturumda hocan herkes için çözsün. Tüm
          oturumlar kaydedilir ve{" "}
          <Link
            href="/panel/tekrarlarim?tab=soru"
            className="font-bold text-amber-deep hover:underline"
          >
            Soru Çözüm Tekrarlarım
          </Link>
          'da yayınlanır.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <h2 className="baslik text-lg">Bu haftanın canlı oturumları</h2>
          {oturumlar.map((o) => {
            const ders = DERS_MAP[o.ders] ?? { id: "genel", renk: "#F2A83B", kisaAd: "Genel" };
            const hoca = HOCALAR.find((h) => h.id === o.hocaId)!;
            const katildi = !!ilerleme.katilim[o.id];
            const bugunMu = o.gun === bugun;
            return (
              <div
                key={o.id}
                className={`card flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${
                  bugunMu ? "border-2 border-amber" : ""
                }`}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${ders.renk}1f` }}
                >
                  <Ikon ad={o.ders === "genel" ? "genel" : o.ders} boy={26} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="baslik text-base">{o.baslik}</h3>
                    {bugunMu && <span className="chip bg-amber text-lacivert-koyu"><Ikon ad="konum" boy={13} /> Bugün</span>}
                    {katildi && <span className="chip bg-green-100 text-green-700">✓ Katıldın</span>}
                  </div>
                  <p className="mt-1 text-sm text-ink/60">
                    {hoca.ad} · {GUNLER[o.gun]} {o.saat} · {o.sure} dk
                  </p>
                </div>
                {katildi ? (
                  <Link href="/panel/tekrarlarim?tab=soru" className="btn btn-ghost btn-md shrink-0">
                    Kaydı izle
                  </Link>
                ) : (
                  <button onClick={() => dersKatil(o.id)} className="btn btn-amber btn-md shrink-0">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" /> Oturuma Katıl
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={soruGonder} className="card h-fit p-6">
          <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="gonder" boy={20} /> Soru Gönder</h2>
          <p className="mt-1 text-xs text-ink/55">
            Sorunu yaz (gerçek uygulamada fotoğrafını da yükleyebileceksin); sıradaki oturumda
            çözülsün.
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label" htmlFor="soruDers">Ders</label>
              <select id="soruDers" className="input" value={soruDers}
                onChange={(e) => setSoruDers(e.target.value)}>
                {DERSLER.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.ad}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="soruMetin">Sorun</label>
              <textarea id="soruMetin" className="input min-h-28"
                placeholder="Örn. 3. deneme 12. soru: kareköklü ifadede neden 2√5 oluyor?"
                value={soruMetin} onChange={(e) => setSoruMetin(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-amber btn-md w-full">
              <Ikon ad="gonder" boy={16} /> Gönder, vak!
            </button>
            {gonderildi && (
              <p className="rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                ✓ Sorun hocana iletildi! Sıradaki oturumda çözülecek.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
