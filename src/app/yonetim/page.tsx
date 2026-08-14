"use client";

import Link from "next/link";
import { Sayac } from "@/components/efektler";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { useStore } from "@/lib/store";

export default function YonetimGenel() {
  const { ogrencileriGetir, canliDersler, tekrarlar, forum, kanallar } = useStore();
  const ogrenciler = ogrencileriGetir();
  const mesajSayisi = forum.reduce((t, b) => t + b.mesajlar.length, 0);

  const kartlar: { ikon: IkonAd; deger: number; etiket: string; href: string; alt: string }[] = [
    { ikon: "kullanici", deger: ogrenciler.length, etiket: "kayıtlı öğrenci", href: "/yonetim/ogrenciler", alt: "Düzenle, hafta aç, sil" },
    { ikon: "canli", deger: canliDersler.length, etiket: "planlı canlı yayın", href: "/yonetim/dersler", alt: "Ders + soru çözümü oturumu" },
    { ikon: "video", deger: tekrarlar.length, etiket: "yayınlanan kayıt", href: "/yonetim/kayitlar", alt: "Ders ve soru çözüm tekrarları" },
    { ikon: "forum", deger: mesajSayisi, etiket: "forum mesajı", href: "/yonetim/forum", alt: `${kanallar.length} kanal · ${forum.length} başlık` },
  ];

  const hizli: { ikon: IkonAd; ad: string; href: string; aciklama: string }[] = [
    { ikon: "ekle", ad: "Canlı yayın aç", href: "/yonetim/dersler", aciklama: "Yeni ders veya soru çözümü oturumu planla" },
    { ikon: "yukle", ad: "Soru çözümü yükle", href: "/yonetim/kayitlar", aciklama: "Kaydı öğrencilerin tekrar bölümüne düşür" },
    { ikon: "sil", ad: "Forumu denetle", href: "/yonetim/forum", aciklama: "Kanal, başlık ve mesajları yönet" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="grafik" boy={32} /> Genel Bakış
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Gölün kuşbakışı hâli. Her şey buradan yönetilir, kaptan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kartlar.map((k) => (
          <Link key={k.etiket} href={k.href} className="card group p-5 transition hover:-translate-y-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-duck/25 transition group-hover:scale-110">
              <Ikon ad={k.ikon} boy={24} />
            </span>
            <p className="baslik mt-2 text-3xl">
              <Sayac deger={k.deger} />
            </p>
            <p className="text-sm font-bold text-lacivert/70">{k.etiket}</p>
            <p className="mt-1 text-xs text-ink/50">{k.alt}</p>
          </Link>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="baslik text-lg">Hızlı işlemler</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {hizli.map((h) => (
            <Link
              key={h.ad}
              href={h.href}
              className="group rounded-2xl border-2 border-lacivert/10 p-4 transition hover:border-amber hover:bg-duck/10"
            >
              <Ikon ad={h.ikon} boy={26} />
              <p className="baslik mt-2 text-sm group-hover:text-amber-deep">{h.ad}</p>
              <p className="mt-0.5 text-xs text-ink/55">{h.aciklama}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="card flex flex-wrap items-center gap-3 border-2 border-amber/40 bg-duck/10 p-4 text-sm">
        <Ikon ad="bildirim" boy={22} />
        <p className="flex-1 text-ink/75">
          <strong>Demo not:</strong> Yaptığın her değişiklik (ders ekleme, kayıt yükleme, kanal
          silme...) bu tarayıcıdaki öğrenci hesaplarına anında yansır. Gerçek sürümde bunlar
          veritabanına yazılır.
        </p>
      </div>
    </div>
  );
}
