"use client";

import Link from "next/link";
import { OrdekKafa } from "@/components/Logo";
import { Sayac } from "@/components/efektler";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { cozulenSorular, useStore, vakPuan } from "@/lib/store";
import {
  DERSLER,
  GOREV_MAP,
  GUNUN_SOZLERI,
  HAFTALAR,
  HOCALAR,
  haftaDurumu,
} from "@/lib/data";

export default function Panelim() {
  const { kullanici, ilerleme, tekrarlar } = useStore();
  if (!kullanici) return null;

  const sorular = cozulenSorular(ilerleme);
  const puan = vakPuan(ilerleme);
  const acikHafta = haftaDurumu(ilerleme.gorevler);
  const hafta = HAFTALAR[acikHafta - 1];
  const haftaTamam = hafta.gorevler.filter((g) => ilerleme.gorevler[g.id]).length;
  const haftaYuzde = Math.round((haftaTamam / hafta.gorevler.length) * 100);

  const haftaSoru = hafta.gorevler
    .filter((g) => ilerleme.gorevler[g.id])
    .reduce((t, g) => t + g.soru, 0);
  const hedefYuzde = Math.min(100, Math.round((haftaSoru / kullanici.hedefHaftalikSoru) * 100));

  const katilimSayi = Object.keys(ilerleme.katilim).length;
  const tekrarSayi = Object.keys(ilerleme.tekrarlar).length;
  const hocaSayi = Object.keys(ilerleme.hocaVideolari).length;

  const gunIndex = Math.floor(Date.now() / 86_400_000) % GUNUN_SOZLERI.length;

  const denemeTamam = Object.keys(ilerleme.gorevler).some(
    (id) => GOREV_MAP[id]?.tip === "deneme"
  );
  const rozetler: { ikon: IkonAd; ad: string; var: boolean; ipucu: string }[] = [
    { ikon: "yumurta", ad: "İlk Adım", var: true, ipucu: "Göle katıldın!" },
    { ikon: "hoca", ad: "Tanıştık", var: hocaSayi >= 3, ipucu: "3 hoca videosu izle" },
    { ikon: "tik", ad: "İlk Vak", var: Object.keys(ilerleme.gorevler).length >= 1, ipucu: "İlk görevini tamamla" },
    { ikon: "alev", ad: "Seri Yüzücü", var: Object.keys(ilerleme.gorevler).length >= 15, ipucu: "15 görev tamamla" },
    { ikon: "deneme", ad: "Deneme Kurdu", var: denemeTamam, ipucu: "İlk denemeni çöz" },
    { ikon: "video", ad: "Kayıt Avcısı", var: tekrarSayi >= 3, ipucu: "3 ders tekrarı izle" },
    { ikon: "forum", ad: "Sosyal Ördek", var: ilerleme.forumMesaj >= 1, ipucu: "Foruma ilk mesajını yaz" },
    { ikon: "sure", ad: "Göl Faresi", var: ilerleme.siteDakika >= 120, ipucu: "Platformda 2 saat geçir" },
  ];

  const enCokSoru = Math.max(1, ...DERSLER.map((d) => sorular.dersBazinda[d.id]));

  const istatistikler: {
    ikon: IkonAd;
    deger: number;
    bicim?: (n: number) => string;
    etiket: string;
    alt: string;
  }[] = [
    { ikon: "kalem", deger: sorular.toplam, etiket: "çözülen soru", alt: "Testler ve denemelerden" },
    {
      ikon: "sure",
      deger: ilerleme.siteDakika,
      bicim: (n) => (n >= 60 ? `${Math.floor(n / 60)}s ${n % 60}dk` : `${n}dk`),
      etiket: "gölde geçirilen süre",
      alt: "Otomatik sayılıyor",
    },
    { ikon: "canli", deger: katilimSayi, etiket: "canlı ders katılımı", alt: `≈ ${katilimSayi * 60} dakika canlı yayın` },
    { ikon: "video", deger: tekrarSayi + hocaSayi, etiket: "izlenen video", alt: `${tekrarSayi} tekrar · ${hocaSayi} hoca videosu` },
  ];

  return (
    <div className="space-y-6">
      {/* Karşılama */}
      <div className="card vak-pop flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={46} className="animate-bob" />
          </span>
          <div>
            <h1 className="baslik text-2xl">Vak vak, {kullanici.ad.split(" ")[0]}!</h1>
            <p className="mt-1 text-sm text-ink/60">"{GUNUN_SOZLERI[gunIndex]}"</p>
          </div>
        </div>
        <Link href="/panel/haftalik-plan" className="btn btn-amber btn-md shrink-0">
          <Ikon ad="plan" boy={17} /> Bu haftanın planına git
        </Link>
      </div>

      {/* İstatistik kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {istatistikler.map((k) => (
          <div key={k.etiket} className="card group p-5 transition hover:-translate-y-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-duck/25 transition group-hover:scale-110">
              <Ikon ad={k.ikon} boy={24} />
            </span>
            <p className="baslik mt-2 text-3xl">
              <Sayac deger={k.deger} bicim={k.bicim} />
            </p>
            <p className="text-sm font-bold text-lacivert/70">{k.etiket}</p>
            <p className="mt-1 text-xs text-ink/50">{k.alt}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Haftalık ilerleme */}
        <div className="card p-6">
          <h2 className="baslik flex items-center gap-2 text-lg">
            <Ikon ad="konum" boy={20} /> Neredesin?
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            {acikHafta}. haftadasın: <strong>"{hafta.tema}"</strong>
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-lacivert/70">
              <span>Hafta ilerlemesi</span>
              <span>
                {haftaTamam}/{hafta.gorevler.length} görev
              </span>
            </div>
            <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-cream-deep">
              <div
                className="h-full rounded-full bg-amber transition-all duration-700"
                style={{ width: `${haftaYuzde}%` }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-lacivert/70">
              <span>Haftalık soru hedefin ({kullanici.hedefHaftalikSoru})</span>
              <span>{haftaSoru} soru</span>
            </div>
            <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-cream-deep">
              <div
                className="h-full rounded-full bg-lacivert transition-all duration-700"
                style={{ width: `${hedefYuzde}%` }}
              />
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-duck/20 px-3 py-2 text-xs font-semibold text-lacivert">
            {haftaYuzde === 100
              ? "Bu hafta bitti, yeni hafta seni bekliyor!"
              : haftaYuzde >= 50
                ? "Yarıyı geçtin, tüyler kabarık devam!"
                : "Gölde yavaş yüzen de yüzer — bir görevle başla!"}
          </p>
        </div>

        {/* Ders bazında sorular */}
        <div className="card p-6">
          <h2 className="baslik flex items-center gap-2 text-lg">
            <Ikon ad="grafik" boy={20} /> Ders ders sorular
          </h2>
          <div className="mt-4 space-y-3">
            {DERSLER.map((d) => (
              <div key={d.id}>
                <div className="flex justify-between text-xs font-bold">
                  <span className="inline-flex items-center gap-1.5 text-lacivert/80">
                    <Ikon ad={d.id} boy={16} /> {d.kisaAd}
                  </span>
                  <span className="text-ink/50">{sorular.dersBazinda[d.id]} soru</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-cream-deep">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(sorular.dersBazinda[d.id] / enCokSoru) * 100}%`,
                      background: d.renk,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rozetler */}
        <div className="card p-6">
          <h2 className="baslik flex items-center gap-2 text-lg">
            <Ikon ad="rozet" boy={20} /> Rozetlerin
          </h2>
          <p className="mt-1 text-xs text-ink/50">{puan} vak puanı topladın</p>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {rozetler.map((r) => (
              <div
                key={r.ad}
                title={r.var ? r.ad : `Kilitli: ${r.ipucu}`}
                className={`flex flex-col items-center gap-1.5 rounded-2xl p-2 text-center transition hover:scale-105 ${
                  r.var ? "bg-duck/25" : "bg-cream-deep/60 opacity-40 grayscale"
                }`}
              >
                <Ikon ad={r.ikon} boy={26} />
                <span className="text-[9px] leading-tight font-bold text-lacivert/80">{r.ad}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hızlı erişim */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/panel/hocani-tani" className="card group p-5 transition hover:-translate-y-1">
          <p className="baslik flex items-center gap-2 text-base group-hover:text-amber-deep">
            <Ikon ad="hoca" boy={20} /> Hocanı Tanı
          </p>
          <p className="mt-1 text-xs text-ink/60">
            {hocaSayi}/{HOCALAR.length} hocayla tanıştın
          </p>
        </Link>
        <Link href="/panel/tekrarlarim" className="card group p-5 transition hover:-translate-y-1">
          <p className="baslik flex items-center gap-2 text-base group-hover:text-amber-deep">
            <Ikon ad="tekrar" boy={20} /> Ders Tekrarlarım
          </p>
          <p className="mt-1 text-xs text-ink/60">
            {Math.max(0, tekrarlar.length - tekrarSayi)} izlenmemiş kayıt seni bekliyor
          </p>
        </Link>
        <Link href="/panel/liderlik" className="card group p-5 transition hover:-translate-y-1">
          <p className="baslik flex items-center gap-2 text-base group-hover:text-amber-deep">
            <Ikon ad="kupa" boy={20} /> Liderlik Tablosu
          </p>
          <p className="mt-1 text-xs text-ink/60">Günün ördeği kim, bakmadan durma!</p>
        </Link>
      </div>
    </div>
  );
}
