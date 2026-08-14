import Link from "next/link";
import { YASAL_BELGELER } from "@/lib/legal";

export const metadata = { title: "Sözleşmeler ve Politikalar — Sosyal Ördek" };

export default function Sozlesmeler() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <span className="chip bg-duck/40 text-lacivert">Yasal</span>
        <h1 className="baslik mt-3 text-4xl">
          Sözleşmeler ve <span className="text-amber">politikalar</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/70">
          Şeffaflık gölün ilk kuralı: verilerinizi nasıl koruduğumuzu ve haklarınızı burada açıkça
          bulabilirsiniz.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {YASAL_BELGELER.map((b) => (
          <Link
            key={b.slug}
            href={`/sozlesmeler/${b.slug}`}
            className="card group p-6 transition hover:-translate-y-0.5"
          >
            <h2 className="baslik text-lg group-hover:text-amber-deep">{b.baslik}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{b.ozet}</p>
            <p className="mt-3 text-xs font-bold text-lacivert/50">
              Son güncelleme: {b.guncelleme} · Oku →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
