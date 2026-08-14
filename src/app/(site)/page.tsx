import Link from "next/link";
import { LogoDikey, OrdekKafa } from "@/components/Logo";
import { VakvakRehber } from "@/components/VakvakRehber";
import { Belir, Dalga } from "@/components/efektler";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { DERSLER, HOCALAR, SSS } from "@/lib/data";

const OZELLIKLER: { ikon: IkonAd; baslik: string; metin: string }[] = [
  {
    ikon: "canli",
    baslik: "Canlı Dersler",
    metin: "Haftanın 5 günü, en fazla 12 kişilik gruplarla interaktif canlı dersler. Kameralar açık, sorular serbest!",
  },
  {
    ikon: "tekrar",
    baslik: "Ders Tekrarlarım",
    metin: "Her canlı ders kaydedilir. Kaçırdın ya da tekrar etmek mi istedin? Gölün arşivi hep açık.",
  },
  {
    ikon: "soru",
    baslik: "Canlı Soru Çözümü",
    metin: "Takıldığın soruyu gönder, akşam oturumunda hocan canlı çözsün. Kayıtları da her an yanında.",
  },
  {
    ikon: "kilit",
    baslik: "28 Haftalık Kilitli Plan",
    metin: "Her hafta yapılacaklar belli. Haftanı bitirmeden yenisi açılmaz; konu atlamak yok, eksik kalmak yok.",
  },
  {
    ikon: "grafik",
    baslik: "Panelim",
    metin: "Kaç soru çözdün, kaç dakika çalıştın, hangi derse katıldın? Gelişimin tek ekranda, vak vak net!",
  },
  {
    ikon: "kupa",
    baslik: "Forum & Liderlik",
    metin: "Günün, haftanın ve ayın ördeği seçilir; ödüller dağıtılır. Forumda göl halkıyla sohbet hep sıcak.",
  },
];

const SUREC: { ikon: IkonAd; baslik: string; metin: string }[] = [
  {
    ikon: "tel",
    baslik: "Ücretsiz Ön Görüşme",
    metin: "30 dakikalık online tanışma: hedefleri dinliyoruz, platformu gezdiriyoruz. Hiçbir ücret ve zorunluluk yok.",
  },
  {
    ikon: "hedef",
    baslik: "Tanışma & Seviye Tespiti",
    metin: "Kayıt sonrası hocalarınla tanışıyorsun, mini seviye tespitiyle başlangıç noktanı birlikte görüyoruz.",
  },
  {
    ikon: "plan",
    baslik: "28 Haftalık Yolculuk",
    metin: "9 ay boyunca canlı dersler, haftalık planlar, denemeler ve soru maratonlarıyla düzenli ilerliyorsun.",
  },
  {
    ikon: "kupa",
    baslik: "LGS Günü: Hazırsın!",
    metin: "Final provaları ve strateji oturumlarıyla sınav gününe en hazır hâlinle, kendinden emin giriyorsun.",
  },
];

const NEDIR_KARTLARI: { ikon: IkonAd; baslik: string; metin: string }[] = [
  {
    ikon: "el",
    baslik: "Samimi ama disiplinli",
    metin: "Forumda şakalaşırız, derste tam konsantre oluruz. Gölün kuralı bu: önce sıcaklık, sonra sistem.",
  },
  {
    ikon: "hedef",
    baslik: "Takip eden sistem",
    metin: "Haftalık plan kilidi sayesinde hiçbir konu atlanmaz. Panelin, gelişimini gün gün önüne serer.",
  },
  {
    ikon: "kullanici",
    baslik: "Veli de gölün içinde",
    metin: "Aylık veli görüşmeleri ve ilerleme raporlarıyla aileler süreci adım adım takip eder.",
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
          <Belir>
            <span className="chip bg-duck/40 text-lacivert">
              <Ikon ad="vak" boy={15} /> LGS 2027 kayıtları açıldı
            </span>
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
                <Ikon ad="tel" boy={19} /> Ücretsiz Ön Görüşme
              </Link>
              <a href="#nedir" className="btn btn-ghost btn-lg">
                Platformu Keşfet
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-lacivert/75">
              {["28 haftalık plan", "5 branş, uzman hocalar", "En fazla 12 kişilik sınıflar"].map(
                (m) => (
                  <span key={m} className="inline-flex items-center gap-1.5">
                    <Ikon ad="tik" boy={16} /> {m}
                  </span>
                )
              )}
            </div>
          </Belir>

          <Belir gecikme={150} className="relative flex justify-center">
            <div className="card relative flex items-center justify-center px-10 py-12">
              <span className="pointer-events-none absolute inset-6 rounded-[2rem] border-2 border-dashed border-amber/25" />
              <LogoDikey boy={210} />
            </div>
            {DERSLER.map((d, i) => (
              <span
                key={d.id}
                className="absolute hidden rounded-2xl border border-lacivert/10 bg-white p-2.5 shadow-lg md:block"
                style={{
                  top: `${[4, 18, 68, 82, 40][i]}%`,
                  left: i % 2 === 0 ? "-2%" : "auto",
                  right: i % 2 === 1 ? "-2%" : "auto",
                  animation: `bob ${3 + i * 0.4}s ease-in-out infinite`,
                }}
                title={d.ad}
              >
                <Ikon ad={d.id} boy={30} />
              </span>
            ))}
          </Belir>
        </div>
        <Dalga renk="#FFFFFF" />
      </section>

      {/* NEDİR */}
      <section id="nedir" className="scroll-mt-20 bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4 pt-10">
          <Belir className="mx-auto max-w-2xl text-center">
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
          </Belir>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {NEDIR_KARTLARI.map((k, i) => (
              <Belir key={k.baslik} gecikme={i * 120}>
                <div className="card h-full p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(30,58,95,0.45)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-duck/25">
                    <Ikon ad={k.ikon} boy={30} />
                  </span>
                  <h3 className="baslik mt-3 text-lg">{k.baslik}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{k.metin}</p>
                </div>
              </Belir>
            ))}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <div className="bg-white">
        <Dalga renk="#1E3A5F" />
      </div>
      <section id="surec" className="scroll-mt-20 bg-lacivert pb-16 text-white">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <Belir className="mx-auto max-w-2xl text-center">
            <span className="chip bg-white/10 text-duck">9 aylık yolculuk</span>
            <h2 className="baslik mt-3 text-3xl !text-white md:text-4xl">
              Yumurtadan <span className="text-duck">gölün efsanesine</span>
            </h2>
            <p className="mt-4 text-white/70">
              Eylül'de başlayan program, haziran ayındaki LGS'ye kadar 28 hafta boyunca kesintisiz
              sürer.
            </p>
          </Belir>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {SUREC.map((a, i) => (
              <Belir key={a.baslik} gecikme={i * 140}>
                <div className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-duck/40 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white transition group-hover:scale-110">
                      <Ikon ad={a.ikon} boy={26} />
                    </span>
                    <span className="font-display text-3xl font-extrabold text-duck/40">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="baslik mt-4 text-lg !text-white">{a.baslik}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{a.metin}</p>
                </div>
              </Belir>
            ))}
          </div>
        </div>
      </section>
      <Dalga renk="#1E3A5F" ters />

      {/* DERSLER */}
      <section id="dersler" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
        <Belir className="mx-auto max-w-2xl text-center">
          <span className="chip bg-duck/40 text-lacivert">Dersler</span>
          <h2 className="baslik mt-3 text-3xl md:text-4xl">
            5 branş, <span className="text-amber">5 uzman hoca</span>
          </h2>
        </Belir>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {DERSLER.map((d, i) => {
            const hoca = HOCALAR.find((h) => h.ders === d.id)!;
            return (
              <Belir key={d.id} gecikme={i * 100}>
                <div className="card group h-full p-5 text-center transition hover:-translate-y-1.5">
                  <span
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                    style={{ background: `${d.renk}1f` }}
                  >
                    <Ikon ad={d.id} boy={30} />
                  </span>
                  <h3 className="baslik mt-3 text-base">{d.ad}</h3>
                  <p className="mt-1 text-xs font-bold" style={{ color: d.renk }}>
                    {hoca.ad}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/65">{d.aciklama}</p>
                </div>
              </Belir>
            );
          })}
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section id="ozellikler" className="scroll-mt-20 bg-cream-deep/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Belir className="mx-auto max-w-2xl text-center">
            <span className="chip bg-duck/40 text-lacivert">Platformda neler var?</span>
            <h2 className="baslik mt-3 text-3xl md:text-4xl">
              Gölün içinde <span className="text-amber">her şey hazır</span>
            </h2>
          </Belir>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OZELLIKLER.map((o, i) => (
              <Belir key={o.baslik} gecikme={(i % 3) * 120}>
                <div className="card group h-full p-6 transition hover:-translate-y-1">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-duck/25 transition group-hover:rotate-6 group-hover:scale-110">
                    <Ikon ad={o.ikon} boy={30} />
                  </span>
                  <h3 className="baslik mt-3 text-lg">{o.baslik}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{o.metin}</p>
                </div>
              </Belir>
            ))}
          </div>
        </div>
      </section>

      {/* HOCALAR */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Belir className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip bg-duck/40 text-lacivert">Ekibimiz</span>
            <h2 className="baslik mt-3 text-3xl md:text-4xl">
              Seni <span className="text-amber">tanıyan hocalar</span>
            </h2>
          </div>
          <Link href="/ekibimiz" className="btn btn-ghost btn-md">
            Tüm ekibi gör →
          </Link>
        </Belir>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {HOCALAR.map((h, i) => (
            <Belir key={h.id} gecikme={i * 90}>
              <div className="card h-full p-5 text-center transition hover:-translate-y-1">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream-deep">
                  <OrdekKafa boy={44} />
                </span>
                <h3 className="baslik mt-3 text-sm">{h.ad}</h3>
                <p className="text-xs font-bold text-amber-deep">{h.unvan}</p>
                <p className="mt-2 text-[11px] italic leading-relaxed text-ink/60">"{h.motto}"</p>
              </div>
            </Belir>
          ))}
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-4 pb-16">
        <Belir className="text-center">
          <span className="chip bg-duck/40 text-lacivert">Merak edilenler</span>
          <h2 className="baslik mt-3 text-3xl md:text-4xl">
            Sık sorulan <span className="text-amber">sorular</span>
          </h2>
        </Belir>

        <div className="mt-8 space-y-3">
          {SSS.map((s, i) => (
            <Belir key={s.soru} gecikme={i * 70}>
              <details className="card group px-6 py-4">
                <summary className="cursor-pointer list-none font-display font-bold text-lacivert marker:hidden">
                  <span className="mr-2 inline-block transition group-open:rotate-90">▸</span>
                  {s.soru}
                </summary>
                <p className="mt-3 pl-5 text-sm leading-relaxed text-ink/70">{s.cevap}</p>
              </details>
            </Belir>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <Belir>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-lacivert px-8 py-12 text-center text-white md:py-16">
            <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-duck/20 blur-2xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-amber/25 blur-2xl" />
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <OrdekKafa boy={44} className="animate-bob" />
            </span>
            <h2 className="baslik relative mt-4 text-3xl !text-white md:text-4xl">
              Göle ilk adımı <span className="text-duck">bugün at!</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/75">
              Ücretsiz ön görüşmede tanışalım; hedefinizi dinleyelim, platformu birlikte gezelim.
              Karar tamamen size ait — vak!
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/on-gorusme" className="btn btn-amber btn-lg">
                <Ikon ad="tel" boy={19} /> Ücretsiz Ön Görüşme Planla
              </Link>
              <Link
                href="/kayit"
                className="btn btn-lg border-2 border-white/25 text-white hover:bg-white/10"
              >
                Hemen Kayıt Ol
              </Link>
            </div>
          </div>
        </Belir>
      </section>

      <VakvakRehber />
    </>
  );
}
