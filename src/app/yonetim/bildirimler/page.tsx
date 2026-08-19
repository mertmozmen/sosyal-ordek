"use client";

import { useEffect, useState } from "react";
import { Ikon } from "@/components/ikonlar";
import { type YayinHedef } from "@/lib/data";
import { useStore, type Grup, type Kullanici } from "@/lib/store";

export default function YonetimBildirimler() {
  const { bildirimler, bildirimGonder, bildirimSil, gruplariYukle, ogrencileriYukle } = useStore();
  const [gruplar, setGruplar] = useState<Grup[]>([]);
  const [ogrenciler, setOgrenciler] = useState<Kullanici[]>([]);
  const [baslik, setBaslik] = useState("");
  const [metin, setMetin] = useState("");
  const [hedef, setHedef] = useState<YayinHedef>("herkes");
  const [grupId, setGrupId] = useState("");
  const [ogrenciId, setOgrenciId] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  useEffect(() => {
    gruplariYukle().then(setGruplar);
    ogrencileriYukle().then((liste) => setOgrenciler(liste.map((o) => o.kullanici)));
  }, [gruplariYukle, ogrencileriYukle]);

  const bilgi = (m: string) => {
    setMesaj(m);
    setTimeout(() => setMesaj(""), 3000);
  };

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baslik.trim()) return bilgi("Başlık boş olamaz.");
    if (hedef === "grup" && !grupId) return bilgi("Bir grup seçmelisin.");
    if (hedef === "ogrenci" && !ogrenciId) return bilgi("Bir öğrenci seçmelisin.");
    setGonderiliyor(true);
    const sonuc = await bildirimGonder({
      baslik: baslik.trim(),
      metin: metin.trim(),
      hedef,
      grupId: grupId || null,
      ogrenciId: ogrenciId || null,
    });
    setGonderiliyor(false);
    if (sonuc.ok) {
      setBaslik("");
      setMetin("");
      bilgi(
        hedef === "herkes"
          ? "Bildirim tüm göle gönderildi, vak!"
          : hedef === "grup"
            ? "Bildirim grup üyelerine gönderildi!"
            : "Bildirim öğrenciye gönderildi!"
      );
    } else {
      bilgi("Gönderilemedi — bağlantıyı kontrol et.");
    }
  };

  const hedefEtiketi = (b: (typeof bildirimler)[number]) => {
    if (b.hedef === "herkes") return "Herkese";
    if (b.hedef === "grup") return `Grup: ${gruplar.find((g) => g.id === b.grupId)?.ad ?? "—"}`;
    return `Öğrenci: ${ogrenciler.find((o) => o.id === b.ogrenciId)?.ad ?? "—"}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="bildirim" boy={32} /> Bildirimler
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Öğrencilere anlık bildirim gönder. Hedefi seç: herkes, bir ders grubu ya da tek öğrenci.
          Bildirim, öğrencinin panelindeki zile anında düşer.
        </p>
      </div>

      {/* Gönderim formu */}
      <form onSubmit={gonder} className="card space-y-4 p-6">
        <h2 className="baslik flex items-center gap-2 text-lg">
          <Ikon ad="gonder" boy={20} /> Yeni bildirim
        </h2>

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["herkes", "Herkese", "vak"],
              ["grup", "Bir gruba", "hedef"],
              ["ogrenci", "Tek öğrenciye", "kullanici"],
            ] as const
          ).map(([deger, etiket, ikon]) => (
            <button
              key={deger}
              type="button"
              onClick={() => setHedef(deger)}
              className={`btn btn-md ${hedef === deger ? "btn-lacivert" : "btn-ghost"}`}
            >
              <Ikon ad={ikon} boy={16} /> {etiket}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {hedef === "grup" && (
            <div>
              <label className="label" htmlFor="bGrup">Hedef grup</label>
              <select id="bGrup" className="input" value={grupId} onChange={(e) => setGrupId(e.target.value)}>
                <option value="">Grup seç...</option>
                {gruplar.map((g) => (
                  <option key={g.id} value={g.id}>{g.ad} ({g.uyeler.length} üye)</option>
                ))}
              </select>
            </div>
          )}
          {hedef === "ogrenci" && (
            <div>
              <label className="label" htmlFor="bOgrenci">Hedef öğrenci</label>
              <select id="bOgrenci" className="input" value={ogrenciId} onChange={(e) => setOgrenciId(e.target.value)}>
                <option value="">Öğrenci seç...</option>
                {ogrenciler.map((o) => (
                  <option key={o.id} value={o.id}>{o.ad} ({o.email})</option>
                ))}
              </select>
            </div>
          )}
          <div className={hedef === "herkes" ? "sm:col-span-2" : ""}>
            <label className="label" htmlFor="bBaslik">Başlık</label>
            <input id="bBaslik" className="input" placeholder="Örn. Yarınki deneme sınavını unutma!"
              value={baslik} onChange={(e) => setBaslik(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="bMetin">Mesaj (isteğe bağlı)</label>
          <textarea id="bMetin" className="input min-h-20" placeholder="Detay yazabilirsin..."
            value={metin} onChange={(e) => setMetin(e.target.value)} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={gonderiliyor} className="btn btn-amber btn-md">
            <Ikon ad="gonder" boy={16} /> {gonderiliyor ? "Gönderiliyor..." : "Bildirimi Gönder"}
          </button>
          {mesaj && <span className="chip vak-pop bg-green-100 text-green-700">{mesaj}</span>}
        </div>
      </form>

      {/* Gönderilenler */}
      <div className="space-y-3">
        <h2 className="baslik text-lg">Gönderilen bildirimler ({bildirimler.length})</h2>
        {bildirimler.length === 0 && (
          <div className="card p-8 text-center">
            <p className="baslik text-base text-lacivert/60">Henüz bildirim gönderilmedi.</p>
          </div>
        )}
        {bildirimler.map((b) => (
          <div key={b.id} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              b.tur === "canli" ? "bg-red-50" : "bg-duck/25"
            }`}>
              <Ikon ad={b.tur === "canli" ? "canli" : "bildirim"} boy={20} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="baslik text-sm">{b.baslik}</p>
                <span className="chip bg-cream-deep text-lacivert">{hedefEtiketi(b)}</span>
              </div>
              {b.metin && <p className="mt-0.5 line-clamp-2 text-xs text-ink/60">{b.metin}</p>}
              <p className="mt-0.5 text-[10px] text-ink/40">
                {new Date(b.tarih).toLocaleString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <button
              className="btn btn-sm shrink-0 border-2 border-red-200 text-red-500 hover:bg-red-50"
              onClick={() => {
                if (confirm(`"${b.baslik}" bildirimi silinecek. Emin misin?`)) bildirimSil(b.id);
              }}
            >
              <Ikon ad="sil" boy={14} /> Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
