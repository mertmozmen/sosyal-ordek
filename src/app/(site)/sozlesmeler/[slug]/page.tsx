import Link from "next/link";
import { notFound } from "next/navigation";
import { Ikon } from "@/components/ikonlar";
import { YASAL_BELGELER, YASAL_MAP } from "@/lib/legal";

export function generateStaticParams() {
  return YASAL_BELGELER.map((b) => ({ slug: b.slug }));
}

function Kalin({ metin }: { metin: string }) {
  const parcalar = metin.split("**");
  return (
    <>
      {parcalar.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))}
    </>
  );
}

function Icerik({ metin }: { metin: string }) {
  const bloklar = metin.split("\n\n");
  return (
    <div className="space-y-5">
      {bloklar.map((blok, i) => {
        if (blok.startsWith("## ")) {
          return (
            <h2 key={i} className="baslik pt-2 text-xl">
              {blok.slice(3)}
            </h2>
          );
        }
        if (blok.startsWith("> ")) {
          return (
            <aside
              key={i}
              className="flex items-start gap-2 rounded-2xl border-2 border-amber/40 bg-duck/15 px-4 py-3 text-sm font-semibold text-lacivert"
            >
              <Ikon ad="bildirim" boy={18} className="mt-0.5" /> <span><Kalin metin={blok.slice(2)} /></span>
            </aside>
          );
        }
        if (blok.split("\n").every((s) => s.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-6 text-sm leading-relaxed text-ink/80">
              {blok.split("\n").map((s, j) => (
                <li key={j}>
                  <Kalin metin={s.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed whitespace-pre-line text-ink/80">
            <Kalin metin={blok} />
          </p>
        );
      })}
    </div>
  );
}

export default async function SozlesmeDetay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const belge = YASAL_MAP[slug];
  if (!belge) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Link href="/sozlesmeler" className="text-sm font-bold text-amber-deep hover:underline">
        ← Tüm sözleşmeler
      </Link>
      <h1 className="baslik mt-3 text-3xl">{belge.baslik}</h1>
      <p className="mt-1 text-sm text-ink/50">Son güncelleme: {belge.guncelleme}</p>

      <div className="card mt-8 p-6 md:p-8">
        <Icerik metin={belge.icerik} />
      </div>
    </div>
  );
}
