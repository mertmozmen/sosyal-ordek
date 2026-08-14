"use client";

import Link from "next/link";
import { CANLI_DERSLER, DERS_MAP, GUNLER, HOCALAR } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function OnlineDerslerim() {
  const { ilerleme, dersKatil } = useStore();
  const bugun = (new Date().getDay() + 6) % 7;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik text-3xl">🎥 Online Derslerim</h1>
        <p className="mt-1 text-sm text-ink/60">
          Haftalık canlı ders programın. Dersler en fazla 12 kişilik gruplarla, kameralar açık
          işlenir.
        </p>
      </div>

      <div className="card flex flex-wrap items-center gap-3 border-2 border-amber/40 bg-duck/10 p-4 text-sm">
        <span className="text-xl">💡</span>
        <p className="flex-1 text-ink/75">
          Ders bağlantısı, ders saatinden 10 dakika önce aktifleşir. Katılamadığın dersler otomatik
          olarak{" "}
          <Link href="/panel/tekrarlarim" className="font-bold text-amber-deep hover:underline">
            Ders Tekrarlarım
          </Link>
          'a düşer — hiçbir şey kaçmaz, vak!
        </p>
      </div>

      <div className="grid gap-4">
        {CANLI_DERSLER.map((cd) => {
          const ders = DERS_MAP[cd.ders];
          const hoca = HOCALAR.find((h) => h.id === cd.hocaId)!;
          const katildi = !!ilerleme.katilim[cd.id];
          const bugunMu = cd.gun === bugun;
          return (
            <div
              key={cd.id}
              className={`card flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${
                bugunMu ? "border-2 border-amber" : ""
              }`}
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{ background: `${ders.renk}1f` }}
              >
                {ders.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="baslik text-lg">{cd.baslik}</h2>
                  {bugunMu && <span className="chip bg-amber text-lacivert-koyu">📍 Bugün</span>}
                  {katildi && <span className="chip bg-green-100 text-green-700">✓ Katıldın</span>}
                </div>
                <p className="mt-1 text-sm text-ink/60">
                  {hoca.ad} · {GUNLER[cd.gun]} {cd.saat} · {cd.sure} dakika
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {katildi ? (
                  <Link href="/panel/tekrarlarim" className="btn btn-ghost btn-md">
                    Kaydı izle
                  </Link>
                ) : (
                  <button onClick={() => dersKatil(cd.id)} className="btn btn-amber btn-md">
                    🔴 Derse Katıl
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-ink/45">
        Demo not: "Derse Katıl" gerçek uygulamada Zoom/Meet bağlantısını açar; burada katılımını
        paneline işler.
      </p>
    </div>
  );
}
