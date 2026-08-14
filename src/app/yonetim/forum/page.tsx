"use client";

import { useState } from "react";
import { Ikon, type IkonAd } from "@/components/ikonlar";
import { type ForumKategori } from "@/lib/data";
import { useStore } from "@/lib/store";

const IKON_SECENEKLERI: IkonAd[] = ["vak", "oyun", "spor", "kitap", "alev", "forum", "dalga", "kupa", "genel"];
const RENKLER = ["#4E7DE0", "#8B5CF6", "#3FA47A", "#E2574C", "#F2A83B", "#EC4899", "#0E7490"];

export default function YonetimForum() {
  const { kanallar, forum, kanalKaydet, kanalSil, baslikSil, mesajSil } = useStore();
  const [form, setForm] = useState({ ad: "", aciklama: "", ikon: "vak" as IkonAd, renk: RENKLER[0] });
  const [acikKanal, setAcikKanal] = useState<string | null>(null);
  const [mesaj, setMesaj] = useState("");

  const kanalOlustur = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ad.trim()) {
      setMesaj("Kanal adı boş olamaz.");
      return;
    }
    const kanal: ForumKategori = {
      id: `k-${Date.now()}`,
      ad: form.ad.trim(),
      aciklama: form.aciklama.trim() || "Yeni gölcük — hoş geldiniz!",
      ikon: form.ikon,
      renk: form.renk,
    };
    kanalKaydet(kanal);
    setForm({ ad: "", aciklama: "", ikon: "vak", renk: RENKLER[0] });
    setMesaj("Kanal açıldı!");
    setTimeout(() => setMesaj(""), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="forum" boy={32} /> Forum Yönetimi
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Kanal aç/kapat, başlıkları ve mesajları denetle. Sildiğin her şey öğrencilerin
          forumundan anında kalkar.
        </p>
      </div>

      {/* Yeni kanal */}
      <form onSubmit={kanalOlustur} className="card space-y-4 p-6">
        <h2 className="baslik flex items-center gap-2 text-lg">
          <Ikon ad="ekle" boy={20} /> Yeni kanal aç
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="kAd">Kanal adı</label>
            <input id="kAd" className="input" placeholder="Örn. Müzik Sohbeti"
              value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="kAciklama">Açıklama</label>
            <input id="kAciklama" className="input" placeholder="Bu gölcükte neler konuşulur?"
              value={form.aciklama} onChange={(e) => setForm({ ...form, aciklama: e.target.value })} />
          </div>
          <div>
            <span className="label">İkon</span>
            <div className="flex flex-wrap gap-2">
              {IKON_SECENEKLERI.map((i) => (
                <button key={i} type="button" onClick={() => setForm({ ...form, ikon: i })}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 transition ${
                    form.ikon === i ? "border-amber bg-duck/25" : "border-lacivert/10 hover:border-amber/50"
                  }`}>
                  <Ikon ad={i} boy={20} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="label">Renk</span>
            <div className="flex flex-wrap gap-2">
              {RENKLER.map((r) => (
                <button key={r} type="button" onClick={() => setForm({ ...form, renk: r })}
                  className={`h-10 w-10 rounded-xl border-2 transition ${
                    form.renk === r ? "scale-110 border-lacivert" : "border-transparent"
                  }`}
                  style={{ background: r }}
                  aria-label={`Renk ${r}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-amber btn-md">
            <Ikon ad="ekle" boy={16} /> Kanalı Aç
          </button>
          {mesaj && <span className="chip vak-pop bg-green-100 text-green-700">{mesaj}</span>}
        </div>
      </form>

      {/* Kanal listesi */}
      <div className="space-y-3">
        {kanallar.map((k) => {
          const basliklar = forum.filter((b) => b.kategori === k.id);
          const acik = acikKanal === k.id;
          return (
            <div key={k.id} className="card overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${k.renk}1f` }}
                >
                  <Ikon ad={k.ikon} boy={24} />
                </span>
                <button className="min-w-0 flex-1 text-left" onClick={() => setAcikKanal(acik ? null : k.id)}>
                  <p className="baslik text-base">{k.ad}</p>
                  <p className="truncate text-xs text-ink/55">
                    {basliklar.length} başlık · {basliklar.reduce((t, b) => t + b.mesajlar.length, 0)} mesaj · {k.aciklama}
                  </p>
                </button>
                <button className="btn btn-ghost btn-sm shrink-0" onClick={() => setAcikKanal(acik ? null : k.id)}>
                  {acik ? "Kapat" : "Denetle"}
                </button>
                <button
                  className="btn btn-sm shrink-0 border-2 border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    if (confirm(`"${k.ad}" kanalı ve içindeki ${basliklar.length} başlık silinecek. Emin misin?`)) {
                      kanalSil(k.id);
                    }
                  }}
                >
                  <Ikon ad="sil" boy={14} /> Kanalı Sil
                </button>
              </div>

              {acik && (
                <div className="space-y-3 border-t border-lacivert/8 bg-cream/60 p-4">
                  {basliklar.map((b) => (
                    <div key={b.id} className="rounded-2xl bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="baslik truncate text-sm">{b.baslik}</p>
                          <p className="text-[11px] text-ink/50">
                            {b.yazar} · {b.tarih} · {b.mesajlar.length} mesaj
                          </p>
                        </div>
                        <button
                          className="btn btn-sm shrink-0 border-2 border-red-200 text-red-500 hover:bg-red-50"
                          onClick={() => {
                            if (confirm(`"${b.baslik}" başlığı silinecek. Emin misin?`)) baslikSil(b.id);
                          }}
                        >
                          <Ikon ad="sil" boy={13} /> Başlığı Sil
                        </button>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {b.mesajlar.map((m) => (
                          <li key={m.id} className="flex items-start justify-between gap-3 rounded-xl bg-cream/80 px-3 py-2">
                            <p className="min-w-0 text-xs text-ink/75">
                              <strong>{m.yazar}:</strong> {m.metin}
                            </p>
                            <button
                              className="shrink-0 rounded-lg p-1 text-red-400 transition hover:bg-red-50"
                              aria-label="Mesajı sil"
                              onClick={() => mesajSil(b.id, m.id)}
                            >
                              <Ikon ad="sil" boy={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {basliklar.length === 0 && (
                    <p className="py-3 text-center text-sm text-ink/45">Bu kanalda henüz başlık yok.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
