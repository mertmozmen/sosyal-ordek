"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sayac } from "@/components/efektler";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { useStore, type GorusmeTalebi } from "@/lib/store";

export default function YonetimGenel() {
  const { canliDersler, tekrarlar, forum, kanallar, siteAyarlar, siteAyarKaydet, talepleriGetir, ogrencileriYukle } = useStore();
  const [ogrenciSayisi, setOgrenciSayisi] = useState(0);
  const [talepler, setTalepler] = useState<GorusmeTalebi[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoMesaj, setVideoMesaj] = useState("");
  const mesajSayisi = forum.reduce((t, b) => t + b.mesajlar.length, 0);

  useEffect(() => {
    ogrencileriYukle().then((liste) => setOgrenciSayisi(liste.length));
    talepleriGetir().then(setTalepler);
  }, [ogrencileriYukle, talepleriGetir]);

  useEffect(() => {
    setVideoUrl(siteAyarlar["tanitim_video_url"] ?? "");
  }, [siteAyarlar]);

  const kartlar: { ikon: IkonAd; deger: number; etiket: string; href: string; alt: string }[] = [
    { ikon: "kullanici", deger: ogrenciSayisi, etiket: "kayıtlı öğrenci", href: "/yonetim/ogrenciler", alt: "Düzenle, hafta aç, sil" },
    { ikon: "canli", deger: canliDersler.length, etiket: "planlı canlı yayın", href: "/yonetim/dersler", alt: "Ders + soru çözümü oturumu" },
    { ikon: "video", deger: tekrarlar.length, etiket: "yayınlanan kayıt", href: "/yonetim/kayitlar", alt: "Ders ve soru çözüm tekrarları" },
    { ikon: "forum", deger: mesajSayisi, etiket: "forum mesajı", href: "/yonetim/forum", alt: `${kanallar.length} kanal · ${forum.length} başlık` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="grafik" boy={32} /> Genel Bakış
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Gölün kuşbakışı hâli. Veriler Supabase bulutunda; her şey buradan yönetilir, kaptan.
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

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Ön görüşme talepleri */}
        <div className="card p-6">
          <h2 className="baslik flex items-center gap-2 text-lg">
            <Ikon ad="tel" boy={20} /> Ön Görüşme Talepleri ({talepler.length})
          </h2>
          <div className="mt-4 space-y-2">
            {talepler.slice(0, 6).map((t, i) => (
              <div key={t.id ?? i} className="rounded-2xl bg-cream/70 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-ink">
                    {t.ogrenciAd} <span className="font-normal text-ink/50">({t.sinif})</span>
                  </p>
                  <span className="chip bg-duck/30 text-lacivert">{t.telefon}</span>
                </div>
                <p className="mt-1 text-xs text-ink/60">
                  Veli: {t.veliAd} · Uygun zaman: {t.saat}
                </p>
                {t.not && <p className="mt-1 text-xs italic text-ink/50">"{t.not}"</p>}
              </div>
            ))}
            {talepler.length === 0 && (
              <p className="py-4 text-center text-sm text-ink/45">
                Henüz talep yok. Site yayında oldukça burada birikecek.
              </p>
            )}
          </div>
        </div>

        {/* Site ayarları */}
        <div className="card p-6">
          <h2 className="baslik flex items-center gap-2 text-lg">
            <Ikon ad="ayar" boy={20} /> Site Ayarları
          </h2>
          <div className="mt-4">
            <label className="label" htmlFor="videoUrl">Tanıtım videosu</label>
            <p className="mb-2 text-xs text-ink/55">
              Girişte açılan ve tüm video alanlarında oynayan video. Tam URL (https://...) ya da
              repo içi yol (video/tanitim.mp4) girilebilir.
            </p>
            <div className="flex flex-wrap gap-2">
              <input id="videoUrl" className="input flex-1" value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)} />
              <button
                className="btn btn-lacivert btn-md shrink-0"
                onClick={async () => {
                  await siteAyarKaydet("tanitim_video_url", videoUrl.trim());
                  setVideoMesaj("Kaydedildi! Tüm ziyaretçilere anında yansır.");
                  setTimeout(() => setVideoMesaj(""), 2500);
                }}
              >
                <Ikon ad="tik" boy={15} /> Kaydet
              </button>
            </div>
            {videoMesaj && (
              <p className="mt-2 chip vak-pop bg-green-100 text-green-700">{videoMesaj}</p>
            )}
          </div>
        </div>
      </div>

      <div className="card flex flex-wrap items-center gap-3 border-2 border-amber/40 bg-duck/10 p-4 text-sm">
        <Ikon ad="bildirim" boy={22} />
        <p className="flex-1 text-ink/75">
          <strong>Not:</strong> Yaptığın değişiklikler artık Supabase veritabanına yazılıyor ve
          canlı sitedeki herkese anında yansıyor.
        </p>
      </div>
    </div>
  );
}
