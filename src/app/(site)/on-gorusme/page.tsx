"use client";

import Link from "next/link";
import { useState } from "react";
import { OrdekKafa } from "@/components/Logo";

const SAATLER = ["Hafta içi 16:00-18:00", "Hafta içi 18:00-20:00", "Cumartesi 10:00-13:00", "Pazar 14:00-17:00"];

export default function OnGorusme() {
  const [gonderildi, setGonderildi] = useState(false);
  const [form, setForm] = useState({
    veliAd: "",
    ogrenciAd: "",
    sinif: "8. Sınıf",
    telefon: "",
    saat: SAATLER[0],
    not: "",
    kvkk: false,
  });
  const [hata, setHata] = useState("");

  const gonder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.veliAd || !form.ogrenciAd || !form.telefon) {
      setHata("Lütfen isim ve telefon alanlarını doldurun.");
      return;
    }
    if (!form.kvkk) {
      setHata("Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekiyor.");
      return;
    }
    const talepler = JSON.parse(localStorage.getItem("so_ongorusme") ?? "[]");
    talepler.push({ ...form, tarih: new Date().toISOString() });
    localStorage.setItem("so_ongorusme", JSON.stringify(talepler));
    setGonderildi(true);
  };

  if (gonderildi) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="card p-10">
          <span className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={92} className="animate-bob" />
          </span>
          <h1 className="baslik mt-6 text-3xl">Vak! Talebin bize ulaştı 🎉</h1>
          <p className="mt-4 leading-relaxed text-ink/70">
            <strong>{form.ogrenciAd}</strong> için ön görüşme talebini aldık. Ekibimiz{" "}
            <strong>24 saat içinde</strong> {form.telefon} numarasından sizi arayarak "
            {form.saat}" aralığında bir görüşme planlayacak.
          </p>
          <p className="mt-3 text-sm text-ink/50">
            Bu bir demo: talep şimdilik yalnızca tarayıcınıza kaydedildi.
          </p>
          <Link href="/" className="btn btn-amber btn-lg mt-8">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-2">
      <div>
        <span className="chip bg-duck/40 text-lacivert">Ücretsiz · 30 dakika · Online</span>
        <h1 className="baslik mt-3 text-4xl">
          Önce <span className="text-amber">tanışalım</span>
        </h1>
        <p className="mt-4 leading-relaxed text-ink/75">
          Formu doldurun, ekibimiz 24 saat içinde sizi arayıp uygun bir görüşme saati planlasın.
          Görüşmede:
        </p>
        <ul className="mt-5 space-y-3 text-sm text-ink/80">
          {[
            "Öğrencimizi tanıyor, hedeflerini ve mevcut durumunu dinliyoruz",
            "9 aylık programın işleyişini ve haftalık plan sistemini anlatıyoruz",
            "Platformu canlı olarak birlikte geziyoruz (Vakvak da orada oluyor 🦆)",
            "Aklınızdaki tüm soruları yanıtlıyoruz — ödeme bilgisi istemiyoruz",
          ].map((m) => (
            <li key={m} className="flex gap-2.5">
              <span className="text-amber">✔</span>
              {m}
            </li>
          ))}
        </ul>
        <div className="card mt-8 flex items-center gap-4 p-5">
          <OrdekKafa boy={56} className="shrink-0 animate-bob" />
          <p className="text-sm italic text-ink/70">
            "Ön görüşmeye katılan öğrencilerin en çok şaşırdığı şey, hocaların ismini ilk günden
            öğrenmesi oluyor. Vak vak, biz kalabalık değil göl'üz!"
          </p>
        </div>
      </div>

      <form onSubmit={gonder} className="card h-fit p-6 md:p-8">
        <h2 className="baslik text-xl">Ön görüşme talebi</h2>

        <div className="mt-5 space-y-4">
          <div>
            <label className="label" htmlFor="veliAd">Veli adı soyadı</label>
            <input id="veliAd" className="input" placeholder="Örn. Ali Yılmaz"
              value={form.veliAd} onChange={(e) => setForm({ ...form, veliAd: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="ogrenciAd">Öğrenci adı soyadı</label>
            <input id="ogrenciAd" className="input" placeholder="Örn. Zeynep Yılmaz"
              value={form.ogrenciAd} onChange={(e) => setForm({ ...form, ogrenciAd: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="sinif">Sınıf</label>
              <select id="sinif" className="input" value={form.sinif}
                onChange={(e) => setForm({ ...form, sinif: e.target.value })}>
                <option>8. Sınıf</option>
                <option>7. Sınıf</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="telefon">Veli telefonu</label>
              <input id="telefon" className="input" placeholder="05__ ___ __ __" inputMode="tel"
                value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="saat">Sizin için uygun zaman</label>
            <select id="saat" className="input" value={form.saat}
              onChange={(e) => setForm({ ...form, saat: e.target.value })}>
              {SAATLER.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="not">Eklemek istedikleriniz (isteğe bağlı)</label>
            <textarea id="not" className="input min-h-20" placeholder="Örn. Matematikte zorlanıyor, deneme netleri..."
              value={form.not} onChange={(e) => setForm({ ...form, not: e.target.value })} />
          </div>

          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink/70">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-amber" checked={form.kvkk}
              onChange={(e) => setForm({ ...form, kvkk: e.target.checked })} />
            <span>
              <Link href="/sozlesmeler/kvkk-aydinlatma" className="font-bold text-amber-deep hover:underline" target="_blank">
                KVKK Aydınlatma Metni
              </Link>
              'ni okudum; iletişim bilgilerimin ön görüşme planlaması amacıyla işlenmesini kabul
              ediyorum.
            </span>
          </label>

          {hata && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{hata}</p>
          )}

          <button type="submit" className="btn btn-amber btn-lg w-full">
            🗓️ Görüşme Talebi Gönder
          </button>
          <p className="text-center text-xs text-ink/50">
            Ya da bizi arayın: <strong>0 (500) 000 00 00</strong>
          </p>
        </div>
      </form>
    </div>
  );
}
