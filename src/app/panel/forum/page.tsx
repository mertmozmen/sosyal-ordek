"use client";

import Link from "next/link";
import { Ikon } from "@/components/ikonlar";
import { useStore } from "@/lib/store";

export default function Forum() {
  const { forum, kanallar } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl"><Ikon ad="forum" boy={32} /> Forum · Göl Meydanı</h1>
        <p className="mt-1 text-sm text-ink/60">
          Ders arası mola, soru yardımlaşması, maç muhabbeti... Göl halkı burada buluşuyor.
        </p>
      </div>

      <div className="card flex flex-wrap items-center gap-3 border-2 border-amber/40 bg-duck/10 p-4 text-sm">
        <Ikon ad="dalga" boy={24} />
        <p className="flex-1 text-ink/75">
          <strong>Göl kuralları:</strong> Kimse kimsenin tüyünü ıslatmaz — saygı esas, zorbalık
          yasak, kişisel bilgi paylaşmak yok. Moderatörler her gölcükte nöbette.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {kanallar.map((k) => {
          const basliklar = forum.filter((b) => b.kategori === k.id);
          const sonBaslik = basliklar[0];
          const mesajSayisi = basliklar.reduce((t, b) => t + b.mesajlar.length, 0);
          return (
            <Link
              key={k.id}
              href={`/panel/forum/kanal?k=${k.id}`}
              className="card group p-6 transition hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${k.renk}1f` }}
                >
                  <Ikon ad={k.ikon} boy={26} />
                </span>
                <div>
                  <h2 className="baslik text-lg group-hover:text-amber-deep">{k.ad}</h2>
                  <p className="text-xs text-ink/50">
                    {basliklar.length} başlık · {mesajSayisi} mesaj
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{k.aciklama}</p>
              {sonBaslik && (
                <p className="mt-3 truncate rounded-xl bg-cream-deep/60 px-3 py-2 text-xs text-ink/60">
                  Son: <strong>{sonBaslik.baslik}</strong> — {sonBaslik.yazar}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
