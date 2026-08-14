import Link from "next/link";
import { LogoDikey, OrdekKafa } from "@/components/Logo";
import { VakvakRehber } from "@/components/VakvakRehber";
import { DERSLER, HOCALAR, SSS } from "@/lib/data";

const OZELLIKLER = [
  {
    emoji: "🎥",
    baslik: "Canlı Dersler",
    metin: "Haftanın 5 günü, en fazla 12 kişilik gruplarla interaktif canlı dersler. Kameralar açık, sorular serbest!",
  },
  {
    emoji: "🔁",
    baslik: "Ders Tekrarlarım",
    metin: "Her canlı ders kaydedilir. Kaçırdın ya da tekrar etmek mi istedin? Gölün arşivi hep açık.",
  },
  {
    emoji: "❓",
    baslik: "Canlı Soru Çözümü",
    metin: "Takıldığın soruyu gönder, akşam oturumunda hocan canlı çözsün. Kayıtları da her an yanında.",
  },
  {
    emoji: "🗓️",
    baslik: "28 Haftalık Kilitli Plan",
    metin: "Her hafta yapılacaklar belli. Haftanı bitirmeden yenisi açılmaz; konu atlamak yok, eksik kalmak yok.",
  },
  {
    emoji: "📊",
    baslik: "Panelim",
    metin: "Kaç soru çözdün, kaç dakika çalıştın, hangi derse katıldın? Gelişimin tek ekranda, vak vak net!",
  },
  {
    emoji: "🏆",
    baslik: "Forum & Liderlik",
    metin: "Günün, haftanın ve ayın ördeği seçilir; ödüller dağıtılır. Forumda göl halkıyla sohbet hep sıcak.",
  },
];

const SUREC = [
  {
    no: "1",
    baslik: "Ücretsiz Ön Görüşme",
    metin: "30 dakikalık online tanışma: hedefleri dinliyoruz, platformu gezdiriyoruz. Hiçbir ücret ve zorunluluk yok.",
  },
  {
    no: "2",
    baslik: "Tanışma & Seviye Tespiti",
    metin: "Kayıt sonrası hocalarınla tanışıyorsun, mini seviye tespitiyle başlangıç noktanı birlikte görüyoruz.",
  },
  {
    no: "3",
    baslik: "28 Haftalık Yolculuk",
    metin: "9 ay boyunca canlı dersler, haftalık planlar, denemeler ve soru maratonlarıyla düzenli ilerliyorsun.",
  },
  {
    no: "4",
    baslik: "LGS Günü: Hazırsın!",
    metin: "Final provaları ve strateji oturumlarıyla sınav gününe en hazır hâlinle, kendinden emin giriyorsun.",
  },
];

export default function AnaSayfa() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-duck/25 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-32 h-80 w-80 rounded-full bg-amber/15 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="chip bg-duck/40 text-lacivert">🦆 LGS 2027 kayıtları açıldı</span>
            <h1 className="baslik mt-4 text-4xl leading-tight md:text-5xl">
              LGS yolculuğunda
              <br />
              <span className="text-amber">yanında bir göl var.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">
              9 aylık programımızda canlı dersler, soru çözümleri, 28 haftalık planlar ve seni
              gerçekten tanıyan hocalarla liseye geçişe birlikte hazırlanıyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/on-gorusme" className="btn btn-amber btn-lg">
                🗓️ Ücretsiz Ön Görüşme
              </Link>
              <a href="#nedir" className="btn btn-ghost btn-lg">
                Platformu Keşfet
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-lacivert/70">
              <span>✅ 28 haftalık plan</span>
              <span>✅ 5 branş, uzman hocalar</span>
              <span>✅ En fazla 12 kişilik sınıflar</span>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="card flex items-center justify-center px-10 py-12">
              <LogoDikey boy={210} />
            </div>
            {DERSLER.map((d, i) => (
              <span
                key={d.id}
                className="absolute hidden rounded-2xl border border-lacivert/10 bg-white px-3 py-2 text-2xl shadow-lg md:block"
                style={{
                  top: `${[4, 18, 68, 82, 40][i]}%`,
                  left: i % 2 === 0 ? "-2%" : "auto",
                  right: i % 2 === 1 ? "-2%" : "auto",
                  animation: `bob ${3 + i * 0.4}s ease-in-out infinite`,
                }}
                title={d.ad}
              >
                {d.emoji}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEDİR */}
      <section id="nedir" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip bg-duck/40 text-lacivert">Sosyal Ördek nedir?</span>
          <h2 className="baslik mt-3 text-3xl md:text-4xl">
            Dershane değil, <span className="text-amber">bir göl.</span>
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">
            Sosyal Ördek; LGS'ye hazırlanan öğrencilerin sıkılmadan, yalnız kalmadan ve sistemli
            şekilde çalıştığı online bir eğitim yuvası. Kalabalık sınıflar yerine küçük gruplar,
            soğuk ders anlatımları yerine seni tanıyan hocalar, başıboş çalışma yerine haftası
            haftasına planlanmış 9 aylık bir yolculuk.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              emoji: "🤝",
              baslik: "Samimi ama disiplinli",
              metin: "Forumda şakalaşırız, derste tam konsantre oluruz. Gölün kuralı bu: önce sıcaklık, sonra sistem.",
            },
            {
              emoji: "🧭",
              baslik: "Takip eden sistem",
              metin: "Haftalık plan kilidi sayesinde hiçbir konu atlanmaz. Panelin, gelişimini gün gün önüne serer.",
            },
            {
              emoji: "👨‍👩‍👧",
              baslik: "Veli de gölün içinde",
              metin: "Aylık veli görüşmeleri ve ilerleme raporlarıyla aileler süreci adım adım takip eder.",
            },
          ].map((k) => (
            <div key={k.baslik} className="card p-6">
              <span className="text-3xl">{k.emoji}</span>
              <h3 className="baslik mt-3 text-lg">{k.baslik}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{k.metin}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SÜREÇ */}
      <section id="surec" className="scroll-mt-20 bg-lacivert py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip bg-white/10 text-duck">9 aylık yolculuk</span>
            <h2 className="baslik mt-3 text-3xl !text-white md:text-4xl">
              Yumurtadan <span className="text-duck">gölün efsanesine</span> 🐣→👑
            </h2>
            <p className="mt-4 text-white/70">
              Eylül'de başlayan program, haziran ayındaki LGS'ye kadar 28 hafta boyunca kesintisiz sürer.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {SUREC.map((a) => (
              <div key={a.no} className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber font-display text-lg font-extrabold text-lacivert-koyu">
                  {a.no}
                </span>
                <h3 className="baslik mt-4 text-lg !text-white">{a.baslik}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{a.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DERSLER */}
      <section id="dersler" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip bg-duck/40 text-lacivert">Dersler</span>
          <h2 className="baslik mt-3 text-3xl md:text-4xl">
            5 branş, <span className="text-amber">5 uzman hoca</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {DERSLER.map((d) => {
            const hoca = HOCALAR.find((h) => h.ders === d.id)!;
            return (
              <div key={d.id} className="card flex flex-col p-5 text-center">
                <span
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: `${d.renk}1f` }}
                >
                  {d.emoji}
                </span>
                <h3 className="baslik mt-3 text-base">{d.ad}</h3>
                <p className="mt-1 text-xs font-bold" style={{ color: d.renk }}>
                  {hoca.ad}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">{d.aciklama}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section id="ozellikler" className="bg-cream-deep/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip bg-duck/40 text-lacivert">Platformda neler var?</span>
            <h2 className="baslik mt-3 text-3xl md:text-4xl">
              Gölün içinde <span className="text-amber">her şey hazır</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OZELLIKLER.map((o) => (
              <div key={o.baslik} className="card p-6">
                <span className="text-3xl">{o.emoji}</span>
                <h3 className="baslik mt-3 text-lg">{o.baslik}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{o.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOCALAR */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip bg-duck/40 text-lacivert">Ekibimiz</span>
            <h2 className="baslik mt-3 text-3xl md:text-4xl">
              Seni <span className="text-amber">tanıyan hocalar</span>
            </h2>
          </div>
          <Link href="/ekibimiz" className="btn btn-ghost btn-md">
            Tüm ekibi gör →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {HOCALAR.map((h) => (
            <div key={h.id} className="card p-5 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream-deep">
                <OrdekKafa boy={44} />
              </span>
              <h3 className="baslik mt-3 text-sm">{h.ad}</h3>
              <p className="text-xs font-bold text-amber-deep">{h.unvan}</p>
              <p className="mt-2 text-[11px] italic leading-relaxed text-ink/60">"{h.motto}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16">
        <div className="text-center">
          <span className="chip bg-duck/40 text-lacivert">Merak edilenler</span>
          <h2 className="baslik mt-3 text-3xl md:text-4xl">
            Sık sorulan <span className="text-amber">sorular</span>
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {SSS.map((s) => (
            <details key={s.soru} className="card group px-6 py-4">
              <summary className="cursor-pointer list-none font-display font-bold text-lacivert marker:hidden">
                <span className="mr-2 inline-block transition group-open:rotate-90">▸</span>
                {s.soru}
              </summary>
              <p className="mt-3 pl-5 text-sm leading-relaxed text-ink/70">{s.cevap}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-lacivert px-8 py-12 text-center text-white md:py-16">
          <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-duck/20 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-amber/25 blur-2xl" />
          <h2 className="baslik relative text-3xl !text-white md:text-4xl">
            Göle ilk adımı <span className="text-duck">bugün at!</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">
            Ücretsiz ön görüşmede tanışalım; hedefinizi dinleyelim, platformu birlikte gezelim.
            Karar tamamen size ait — vak! 🦆
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/on-gorusme" className="btn btn-amber btn-lg">
              Ücretsiz Ön Görüşme Planla
            </Link>
            <Link href="/kayit" className="btn btn-lg border-2 border-white/25 text-white hover:bg-white/10">
              Hemen Kayıt Ol
            </Link>
          </div>
        </div>
      </section>

      <VakvakRehber />
    </>
  );
}
