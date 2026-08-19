"use client";

import Link from "next/link";
import { Ikon } from "@/components/ikonlar";
import { DERS_MAP, GUNLER, HOCALAR } from "@/lib/data";
import { dersGorunurMu, useStore } from "@/lib/store";

export default function OnlineDerslerim() {
  const { ilerleme, dersKatil, canliDersler, kullanici, uyelikler } = useStore();
  const dersListesi = canliDersler.filter(
    (d) => d.tur === "ders" && dersGorunurMu(d, kullanici?.id, uyelikler)
  );
  const bugun = (new Date().getDay() + 6) % 7;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl"><Ikon ad="canli" boy={32} /> Online Derslerim</h1>
        <p className="mt-1 text-sm text-ink/60">
          Haftalık canlı ders programın. Dersler en fazla 12 kişilik gruplarla, kameralar açık
          işlenir.
        </p>
      </div>

      <div className="card flex flex-wrap items-center gap-3 border-2 border-amber/40 bg-duck/10 p-4 text-sm">
        <Ikon ad="bildirim" boy={22} />
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
        {dersListesi.map((cd) => {
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
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: `${ders.renk}1f` }}
              >
                <Ikon ad={ders.id} boy={30} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="baslik text-lg">{cd.baslik}</h2>
                  {cd.durum === "canli" && (
                    <span className="chip bg-red-500 text-white">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> CANLI
                    </span>
                  )}
                  {bugunMu && <span className="chip bg-amber text-lacivert-koyu"><Ikon ad="konum" boy={13} /> Bugün</span>}
                  {cd.hedef === "grup" && <span className="chip bg-lacivert/10 text-lacivert">Grup dersi</span>}
                  {cd.hedef === "ogrenci" && <span className="chip bg-lacivert text-duck">Sana özel</span>}
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
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" /> Derse Katıl
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
