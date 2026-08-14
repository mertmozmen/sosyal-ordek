import Link from "next/link";
import { OrdekAmblem } from "@/components/Logo";

export const metadata = { title: "Biz Kimiz? — Sosyal Ördek" };

export default function Hakkimizda() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <span className="chip bg-duck/40 text-lacivert">Biz kimiz?</span>
        <h1 className="baslik mt-3 text-4xl">
          Bir gölün <span className="text-amber">hikâyesi</span>
        </h1>
      </div>

      <div className="card mt-10 grid items-center gap-8 p-8 md:grid-cols-[auto_1fr] md:p-10">
        <OrdekAmblem boy={150} className="mx-auto" />
        <div className="space-y-4 leading-relaxed text-ink/80">
          <p>
            Sosyal Ördek, "LGS hazırlığı neden bu kadar soğuk ve yalnız?" sorusuna verilen sıcak
            bir cevaptır. Kurucu ekibimiz yıllarca dershanelerde ve okullarda çalışırken hep aynı
            şeyi gördü: öğrenciler bilgiye değil, <strong>kendilerini tanıyan ve takip eden bir sisteme</strong> ihtiyaç
            duyuyor.
          </p>
          <p>
            Bu yüzden kalabalık sınıflar yerine en fazla 12 kişilik gruplar kurduk. Videoları izleyip
            kaybolan öğrenciler yerine, her hafta ne yapacağını bilen; hocasına istediği an soru
            sorabilen; başarısı görüldükçe motive olan öğrenciler istedik.
          </p>
          <p>
            Adımız neden ördek? Çünkü ördekler suyun üstünde sakin görünür ama altta durmadan
            çalışır. Tıpkı iyi bir LGS hazırlığı gibi: dışarıdan telaşsız, içeride disiplinli. Bir de
            ördekler asla tek başına yüzmez — <strong>göl, hepimizin</strong>. 🦆
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            emoji: "🎯",
            baslik: "Misyonumuz",
            metin:
              "Her öğrencinin kendi ritminde ama asla plansız olmayan bir hazırlık süreci geçirmesini sağlamak; sınav kaygısını sistemle ve samimiyetle yenmek.",
          },
          {
            emoji: "🔭",
            baslik: "Vizyonumuz",
            metin:
              "Türkiye'nin her şehrindeki öğrencinin, nerede yaşarsa yaşasın, alanında uzman hocalarla küçük gruplar hâlinde çalışabildiği bir eğitim gölü kurmak.",
          },
          {
            emoji: "💛",
            baslik: "Değerlerimiz",
            metin:
              "Samimiyet, şeffaflık, düzen ve emek. Veliyle açık iletişim, öğrenciyle güven ilişkisi; forumda bile zorbalığa sıfır tolerans.",
          },
        ].map((k) => (
          <div key={k.baslik} className="card p-6">
            <span className="text-3xl">{k.emoji}</span>
            <h2 className="baslik mt-3 text-lg">{k.baslik}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{k.metin}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10 p-8">
        <h2 className="baslik text-2xl">Rakamlarla göl 📊</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            ["28", "haftalık program"],
            ["5", "branş, 5 uzman hoca"],
            ["12", "kişilik maksimum sınıf"],
            ["9", "aylık kesintisiz takip"],
          ].map(([sayi, etiket]) => (
            <div key={etiket}>
              <p className="font-display text-4xl font-extrabold text-amber">{sayi}</p>
              <p className="mt-1 text-sm font-bold text-lacivert/70">{etiket}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/on-gorusme" className="btn btn-amber btn-lg">
          Bizimle tanışın: Ücretsiz Ön Görüşme
        </Link>
      </div>
    </div>
  );
}
