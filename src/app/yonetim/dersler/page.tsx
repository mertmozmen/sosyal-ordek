"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Ikon } from "@/components/ikonlar";
import { DERSLER, DERS_MAP, GUNLER, HOCALAR, type CanliDers, type DersId, type YayinHedef } from "@/lib/data";
import { useStore, type Grup, type Kullanici } from "@/lib/store";

const BOS_FORM = {
  baslik: "",
  ders: "mat" as DersId,
  hocaId: HOCALAR[0].id,
  gun: 0,
  saat: "19:00",
  sure: 60,
  tur: "ders" as "ders" | "soru",
  hedef: "herkes" as YayinHedef,
  grupId: "",
  ogrenciId: "",
};

export default function YonetimDersler() {
  const { canliDersler, dersKaydet, dersSil, gruplariYukle, ogrencileriYukle } = useStore();
  const [form, setForm] = useState({ ...BOS_FORM });
  const [duzenlenen, setDuzenlenen] = useState<string | null>(null);
  const [mesaj, setMesaj] = useState("");
  const [gruplar, setGruplar] = useState<Grup[]>([]);
  const [ogrenciler, setOgrenciler] = useState<Kullanici[]>([]);

  useEffect(() => {
    gruplariYukle().then(setGruplar);
    ogrencileriYukle().then((liste) => setOgrenciler(liste.map((o) => o.kullanici)));
  }, [gruplariYukle, ogrencileriYukle]);

  const kaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.baslik.trim()) {
      setMesaj("Başlık boş olamaz.");
      return;
    }
    if (form.hedef === "grup" && !form.grupId) {
      setMesaj("Bir grup seçmelisin.");
      return;
    }
    if (form.hedef === "ogrenci" && !form.ogrenciId) {
      setMesaj("Bir öğrenci seçmelisin.");
      return;
    }
    const mevcut = duzenlenen ? canliDersler.find((d) => d.id === duzenlenen) : undefined;
    const ders: CanliDers = {
      ...mevcut,
      id: duzenlenen ?? `yd-${Date.now()}`,
      baslik: form.baslik.trim(),
      ders: form.ders,
      hocaId: form.hocaId,
      gun: Number(form.gun),
      saat: form.saat,
      sure: Number(form.sure),
      tur: form.tur,
      hedef: form.hedef,
      grupId: form.hedef === "grup" ? form.grupId : null,
      ogrenciId: form.hedef === "ogrenci" ? form.ogrenciId : null,
    };
    dersKaydet(ders);
    setMesaj(duzenlenen ? "Yayın güncellendi!" : "Canlı yayın açıldı! Öğrenci panellerine düştü.");
    setForm({ ...BOS_FORM });
    setDuzenlenen(null);
    setTimeout(() => setMesaj(""), 2500);
  };

  const duzenle = (d: CanliDers) => {
    setDuzenlenen(d.id);
    setForm({
      baslik: d.baslik, ders: d.ders, hocaId: d.hocaId, gun: d.gun, saat: d.saat, sure: d.sure, tur: d.tur,
      hedef: d.hedef ?? "herkes", grupId: d.grupId ?? "", ogrenciId: d.ogrenciId ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sirali = [...canliDersler].sort((a, b) => a.gun - b.gun || a.saat.localeCompare(b.saat));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="canli" boy={32} /> Canlı Ders & Yayın
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Haftalık canlı ders ve soru çözümü programını buradan yönet. Eklediğin her yayın
          öğrencilerin "Online Derslerim" ya da "Soru Çözümü" sayfasına anında düşer.
        </p>
      </div>

      {/* Yayın formu */}
      <form onSubmit={kaydet} className={`card space-y-4 p-6 ${duzenlenen ? "border-2 border-amber" : ""}`}>
        <h2 className="baslik flex items-center gap-2 text-lg">
          <Ikon ad={duzenlenen ? "duzenle" : "ekle"} boy={20} />
          {duzenlenen ? "Yayını düzenle" : "Yeni canlı yayın aç"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="label" htmlFor="yBaslik">Yayın başlığı</label>
            <input id="yBaslik" className="input" placeholder="Örn. Canlı Matematik Dersi"
              value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="yTur">Yayın türü</label>
            <select id="yTur" className="input" value={form.tur}
              onChange={(e) => setForm({ ...form, tur: e.target.value as "ders" | "soru" })}>
              <option value="ders">Canlı Ders</option>
              <option value="soru">Canlı Soru Çözümü</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="yDers">Ders</label>
            <select id="yDers" className="input" value={form.ders}
              onChange={(e) => setForm({ ...form, ders: e.target.value as DersId })}>
              {DERSLER.map((d) => (
                <option key={d.id} value={d.id}>{d.ad}</option>
              ))}
              <option value="genel">Genel (tüm dersler)</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="yHoca">Hoca</label>
            <select id="yHoca" className="input" value={form.hocaId}
              onChange={(e) => setForm({ ...form, hocaId: e.target.value })}>
              {HOCALAR.map((h) => (
                <option key={h.id} value={h.id}>{h.ad}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="yGun">Gün</label>
            <select id="yGun" className="input" value={form.gun}
              onChange={(e) => setForm({ ...form, gun: Number(e.target.value) })}>
              {GUNLER.map((g, i) => (
                <option key={g} value={i}>{g}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="ySaat">Saat</label>
              <input id="ySaat" type="time" className="input" value={form.saat}
                onChange={(e) => setForm({ ...form, saat: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="ySure">Süre (dk)</label>
              <input id="ySure" type="number" className="input" value={form.sure}
                onChange={(e) => setForm({ ...form, sure: Number(e.target.value) })} />
            </div>
          </div>
        </div>

        {/* Hedef kitle */}
        <div className="rounded-2xl bg-cream/70 p-4">
          <p className="label">Bu yayını kim görecek?</p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["herkes", "Herkes", "vak"],
                ["grup", "Belirli grup", "hedef"],
                ["ogrenci", "Tek öğrenci", "kullanici"],
              ] as const
            ).map(([deger, etiket, ikon]) => (
              <button key={deger} type="button"
                onClick={() => setForm({ ...form, hedef: deger })}
                className={`btn btn-sm ${form.hedef === deger ? "btn-lacivert" : "btn-ghost bg-white"}`}>
                <Ikon ad={ikon} boy={14} /> {etiket}
              </button>
            ))}
            {form.hedef === "grup" && (
              <select aria-label="Hedef grup" className="input max-w-64" value={form.grupId}
                onChange={(e) => setForm({ ...form, grupId: e.target.value })}>
                <option value="">Grup seç...</option>
                {gruplar.map((g) => (
                  <option key={g.id} value={g.id}>{g.ad} ({g.uyeler.length} üye)</option>
                ))}
              </select>
            )}
            {form.hedef === "ogrenci" && (
              <select aria-label="Hedef öğrenci" className="input max-w-64" value={form.ogrenciId}
                onChange={(e) => setForm({ ...form, ogrenciId: e.target.value })}>
                <option value="">Öğrenci seç...</option>
                {ogrenciler.map((o) => (
                  <option key={o.id} value={o.id}>{o.ad} ({o.email})</option>
                ))}
              </select>
            )}
          </div>
          {form.hedef === "grup" && gruplar.length === 0 && (
            <p className="mt-2 text-xs text-ink/50">Henüz grup yok — önce "Ders Grupları"ndan bir grup kur.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-amber btn-md">
            <Ikon ad={duzenlenen ? "tik" : "canli"} boy={16} />
            {duzenlenen ? "Değişiklikleri Kaydet" : "Yayını Aç"}
          </button>
          {duzenlenen && (
            <button type="button" className="btn btn-ghost btn-md"
              onClick={() => { setDuzenlenen(null); setForm({ ...BOS_FORM }); }}>
              Vazgeç
            </button>
          )}
          {mesaj && <span className="chip vak-pop bg-green-100 text-green-700">{mesaj}</span>}
        </div>
      </form>

      {/* Yayın listesi */}
      <div className="space-y-3">
        <h2 className="baslik text-lg">Haftalık program ({sirali.length} yayın)</h2>
        {sirali.map((d) => {
          const ders = DERS_MAP[d.ders];
          const hoca = HOCALAR.find((h) => h.id === d.hocaId);
          return (
            <div key={d.id} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${ders?.renk ?? "#F2A83B"}1f` }}
              >
                <Ikon ad={ders ? ders.id : "genel"} boy={24} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="baslik text-sm">{d.baslik}</p>
                  <span className={`chip ${d.tur === "ders" ? "bg-lacivert text-white" : "bg-amber text-lacivert-koyu"}`}>
                    {d.tur === "ders" ? "Ders" : "Soru Çözümü"}
                  </span>
                  {d.hedef === "grup" && (
                    <span className="chip bg-cream-deep text-lacivert">
                      Grup: {gruplar.find((g) => g.id === d.grupId)?.ad ?? "—"}
                    </span>
                  )}
                  {d.hedef === "ogrenci" && (
                    <span className="chip bg-cream-deep text-lacivert">
                      Özel: {ogrenciler.find((o) => o.id === d.ogrenciId)?.ad ?? "—"}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink/55">
                  {hoca?.ad ?? "—"} · {GUNLER[d.gun]} {d.saat} · {d.sure} dk
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href={`/yonetim/yayin?d=${d.id}`}
                  className={`btn btn-sm ${d.durum === "canli" ? "bg-red-500 text-white" : "btn-amber"}`}
                >
                  <span className={`h-2 w-2 rounded-full ${d.durum === "canli" ? "animate-pulse bg-white" : "bg-red-500"}`} />
                  {d.durum === "canli" ? "Yayına Dön" : "Yayın Odası"}
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={() => duzenle(d)}>
                  <Ikon ad="duzenle" boy={14} /> Düzenle
                </button>
                <button
                  className="btn btn-sm border-2 border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    if (confirm(`"${d.baslik}" yayını silinecek. Emin misin?`)) dersSil(d.id);
                  }}
                >
                  <Ikon ad="sil" boy={14} /> Sil
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
