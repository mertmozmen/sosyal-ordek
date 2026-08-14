import Link from "next/link";
import { OrdekKafa } from "@/components/Logo";
import { DERS_MAP, HOCALAR } from "@/lib/data";

export const metadata = { title: "Ekibimiz — Sosyal Ördek" };

const DIGER_EKIP = [
  {
    ad: "Ayşe Öztürk",
    unvan: "Kurucu & Eğitim Koordinatörü",
    metin:
      "Programın 28 haftalık iskeletini kuran, hocaların ders planlarını denetleyen ve her ay veli görüşmelerini yöneten kişi. Gölün kaptanı.",
    emoji: "🧭",
  },
  {
    ad: "Deniz Şahin",
    unvan: "Rehber Öğretmen & Motivasyon Koçu",
    metin:
      "Sınav kaygısı, hedef belirleme ve çalışma alışkanlıkları üzerine öğrencilerle birebir görüşür. Forumdaki Motivasyon Köşesi'nin de moderatörü.",
    emoji: "🧠",
  },
  {
    ad: "Can Aydın",
    unvan: "Teknoloji & Platform Sorumlusu",
    metin:
      "Canlı derslerin kesintisiz akması, kayıtların zamanında yüklenmesi ve Vakvak'ın tüylerinin parlak kalması ondan sorulur.",
    emoji: "🛠️",
  },
];

export default function Ekibimiz() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="text-center">
        <span className="chip bg-duck/40 text-lacivert">Ekibimiz</span>
        <h1 className="baslik mt-3 text-4xl">
          Gölün <span className="text-amber">hocaları</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/70">
          Kayıt olduğunda her hocanın tanışma videosunu "Hocanı Tanı" bölümünde izleyeceksin.
          Şimdilik kısaca tanışın:
        </p>
      </div>

      <div className="mt-10 space-y-5">
        {HOCALAR.map((h, i) => {
          const ders = DERS_MAP[h.ders];
          return (
            <div
              key={h.id}
              className={`card flex flex-col gap-6 p-6 md:flex-row md:items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex shrink-0 flex-col items-center gap-2">
                <span
                  className="flex h-28 w-28 items-center justify-center rounded-full"
                  style={{ background: `${ders.renk}1a` }}
                >
                  <OrdekKafa boy={76} />
                </span>
                <span className="chip text-white" style={{ background: ders.renk }}>
                  {ders.emoji} {ders.ad}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="baslik text-xl">{h.ad}</h2>
                <p className="text-sm font-bold text-amber-deep">
                  {h.unvan} · {h.deneyim} yıl deneyim · {h.okul}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{h.tanitim}</p>
                <p className="mt-3 text-sm italic text-lacivert/60">"{h.motto}"</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <span className="chip bg-duck/40 text-lacivert">Sahne arkası</span>
        <h2 className="baslik mt-3 text-3xl">
          Gölün <span className="text-amber">arkasındakiler</span>
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {DIGER_EKIP.map((k) => (
          <div key={k.ad} className="card p-6 text-center">
            <span className="text-4xl">{k.emoji}</span>
            <h3 className="baslik mt-3 text-lg">{k.ad}</h3>
            <p className="text-xs font-bold text-amber-deep">{k.unvan}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{k.metin}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/on-gorusme" className="btn btn-amber btn-lg">
          Ekiple tanışmak için ön görüşme planla
        </Link>
      </div>
    </div>
  );
}
