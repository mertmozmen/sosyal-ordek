"use client";

import { useState } from "react";
import { Ikon } from "@/components/ikonlar";
import { DERSLER, DERS_MAP, HOCALAR, type DersId, type Tekrar } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function YonetimKayitlar() {
  const { tekrarlar, tekrarKaydet, tekrarSil } = useStore();
  const [form, setForm] = useState({
    tur: "soru" as "ders" | "soru",
    ders: "mat" as DersId,
    baslik: "",
    hocaId: HOCALAR[0].id,
    sure: 45,
    hafta: 3,
  });
  const [mesaj, setMesaj] = useState("");

  const yukle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.baslik.trim()) {
      setMesaj("Başlık boş olamaz.");
      return;
    }
    const kayit: Tekrar = {
      id: `yk-${Date.now()}`,
      tur: form.tur,
      ders: form.ders,
      baslik: form.baslik.trim(),
      hocaId: form.hocaId,
      sure: `${form.sure} dk`,
      tarih: "Bu hafta",
      hafta: Number(form.hafta),
    };
    tekrarKaydet(kayit);
    setMesaj(
      form.tur === "soru"
        ? "Soru çözümü kaydı yüklendi! 'Soru Çözüm Tekrarlarım' sekmesine düştü."
        : "Ders kaydı yüklendi! 'Ders Tekrarları' sekmesine düştü."
    );
    setForm({ ...form, baslik: "" });
    setTimeout(() => setMesaj(""), 3000);
  };

  const dersKayitlari = tekrarlar.filter((t) => t.tur === "ders");
  const soruKayitlari = tekrarlar.filter((t) => t.tur === "soru");

  const Liste = ({ baslik, liste }: { baslik: string; liste: Tekrar[] }) => (
    <div className="card p-5">
      <h2 className="baslik text-base">{baslik} ({liste.length})</h2>
      <div className="mt-3 space-y-2">
        {liste.map((t) => {
          const ders = DERS_MAP[t.ders];
          const hoca = HOCALAR.find((h) => h.id === t.hocaId);
          return (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-cream/70 p-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${ders?.renk ?? "#F2A83B"}22` }}
              >
                <Ikon ad={ders ? ders.id : "genel"} boy={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{t.baslik}</p>
                <p className="text-[11px] text-ink/50">
                  {hoca?.ad ?? "—"} · {t.sure} · {t.hafta}. hafta · {t.tarih}
                </p>
              </div>
              <button
                className="btn btn-sm shrink-0 border-2 border-red-200 text-red-500 hover:bg-red-50"
                onClick={() => {
                  if (confirm(`"${t.baslik}" kaydı silinecek. Emin misin?`)) tekrarSil(t.id);
                }}
              >
                <Ikon ad="sil" boy={13} />
              </button>
            </div>
          );
        })}
        {liste.length === 0 && (
          <p className="py-4 text-center text-sm text-ink/45">Henüz kayıt yok.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="yukle" boy={32} /> Kayıt Yükle
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Ders tekrarı ve soru çözümü kayıtlarını yayınla. Soru çözümü kayıtları, öğrencinin
          "Ders Tekrarlarım → Soru Çözüm Tekrarlarım" sekmesinde görünür.
        </p>
      </div>

      <form onSubmit={yukle} className="card space-y-4 p-6">
        <h2 className="baslik flex items-center gap-2 text-lg">
          <Ikon ad="video" boy={20} /> Yeni kayıt yayınla
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="label" htmlFor="kBaslik">Kayıt başlığı</label>
            <input id="kBaslik" className="input" placeholder="Örn. Canlı Soru Çözümü #7 · Matematik"
              value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="kTur">Kayıt türü</label>
            <select id="kTur" className="input" value={form.tur}
              onChange={(e) => setForm({ ...form, tur: e.target.value as "ders" | "soru" })}>
              <option value="soru">Soru Çözümü Kaydı</option>
              <option value="ders">Ders Kaydı</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="kDers">Ders</label>
            <select id="kDers" className="input" value={form.ders}
              onChange={(e) => setForm({ ...form, ders: e.target.value as DersId })}>
              {DERSLER.map((d) => (
                <option key={d.id} value={d.id}>{d.ad}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="kHoca">Hoca</label>
            <select id="kHoca" className="input" value={form.hocaId}
              onChange={(e) => setForm({ ...form, hocaId: e.target.value })}>
              {HOCALAR.map((h) => (
                <option key={h.id} value={h.id}>{h.ad}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="kSure">Süre (dk)</label>
              <input id="kSure" type="number" className="input" value={form.sure}
                onChange={(e) => setForm({ ...form, sure: Number(e.target.value) })} />
            </div>
            <div>
              <label className="label" htmlFor="kHafta">Hafta</label>
              <input id="kHafta" type="number" min={1} max={28} className="input" value={form.hafta}
                onChange={(e) => setForm({ ...form, hafta: Number(e.target.value) })} />
            </div>
          </div>
          <div className="flex items-end">
            <div className="w-full rounded-2xl border-2 border-dashed border-lacivert/20 p-3 text-center text-xs text-ink/50">
              <Ikon ad="yukle" boy={20} className="mb-1" />
              <br />
              Video dosyası (demo — gerçekte buraya yüklenir)
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-amber btn-md">
            <Ikon ad="yukle" boy={16} /> Kaydı Yayınla
          </button>
          {mesaj && <span className="chip vak-pop bg-green-100 text-green-700">{mesaj}</span>}
        </div>
      </form>

      <div className="grid gap-5 lg:grid-cols-2">
        <Liste baslik="Soru Çözüm Tekrarları" liste={soruKayitlari} />
        <Liste baslik="Ders Tekrarları" liste={dersKayitlari} />
      </div>
    </div>
  );
}
