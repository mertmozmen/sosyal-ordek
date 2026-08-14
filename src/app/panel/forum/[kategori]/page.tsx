"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { FORUM_KATEGORILER } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ForumKategori() {
  const params = useParams<{ kategori: string }>();
  const { forum, yeniBaslik, yeniMesaj, kullanici } = useStore();
  const [acikBaslik, setAcikBaslik] = useState<string | null>(null);
  const [yeniForm, setYeniForm] = useState(false);
  const [baslikMetni, setBaslikMetni] = useState("");
  const [mesajMetni, setMesajMetni] = useState("");
  const [cevaplar, setCevaplar] = useState<Record<string, string>>({});

  const kategori = FORUM_KATEGORILER.find((k) => k.id === params.kategori);
  if (!kategori) {
    return (
      <div className="card p-10 text-center">
        <p className="baslik text-lg">Bu gölcük bulunamadı 🤔</p>
        <Link href="/panel/forum" className="btn btn-amber btn-md mt-4">
          Foruma dön
        </Link>
      </div>
    );
  }

  const basliklar = forum.filter((b) => b.kategori === kategori.id);

  const baslikOlustur = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baslikMetni.trim() || !mesajMetni.trim()) return;
    const id = yeniBaslik(kategori.id, baslikMetni.trim(), mesajMetni.trim());
    setBaslikMetni("");
    setMesajMetni("");
    setYeniForm(false);
    setAcikBaslik(id);
  };

  const cevapGonder = (baslikId: string) => {
    const metin = cevaplar[baslikId]?.trim();
    if (!metin) return;
    yeniMesaj(baslikId, metin);
    setCevaplar((o) => ({ ...o, [baslikId]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/panel/forum" className="text-sm font-bold text-amber-deep hover:underline">
            ← Tüm gölcükler
          </Link>
          <h1 className="baslik mt-2 text-3xl">
            {kategori.emoji} {kategori.ad}
          </h1>
          <p className="mt-1 text-sm text-ink/60">{kategori.aciklama}</p>
        </div>
        <button onClick={() => setYeniForm(!yeniForm)} className="btn btn-amber btn-md">
          {yeniForm ? "Vazgeç" : "➕ Yeni Başlık Aç"}
        </button>
      </div>

      {yeniForm && (
        <form onSubmit={baslikOlustur} className="card vak-pop space-y-3 border-2 border-amber p-5">
          <div>
            <label className="label" htmlFor="yeniBaslik">Başlık</label>
            <input id="yeniBaslik" className="input" placeholder="Ne konuşalım?"
              value={baslikMetni} onChange={(e) => setBaslikMetni(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="ilkMesaj">İlk mesajın</label>
            <textarea id="ilkMesaj" className="input min-h-24" placeholder="Derdini anlat, göl dinliyor..."
              value={mesajMetni} onChange={(e) => setMesajMetni(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-amber btn-md">
            Başlığı Aç, Vak! 🦆
          </button>
        </form>
      )}

      <div className="space-y-3">
        {basliklar.map((b) => {
          const acik = acikBaslik === b.id;
          return (
            <div key={b.id} className="card overflow-hidden">
              <button
                onClick={() => setAcikBaslik(acik ? null : b.id)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <OrdekAvatar renk={b.avatarRenk} boy={42} />
                <div className="min-w-0 flex-1">
                  <h2 className="baslik truncate text-base">{b.baslik}</h2>
                  <p className="text-xs text-ink/55">
                    {b.yazar} · {b.tarih} · {b.mesajlar.length} mesaj
                  </p>
                </div>
                <span className={`text-lacivert/40 transition ${acik ? "rotate-90" : ""}`}>▸</span>
              </button>

              {acik && (
                <div className="border-t border-lacivert/8 bg-cream/60 p-4">
                  <ul className="space-y-3">
                    {b.mesajlar.map((m) => {
                      const benim = kullanici && m.yazar === kullanici.ad;
                      return (
                        <li key={m.id} className={`flex gap-3 ${benim ? "flex-row-reverse" : ""}`}>
                          <OrdekAvatar renk={m.avatarRenk} boy={34} className="mt-1 shrink-0" />
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                              benim ? "rounded-tr-md bg-duck/40" : "rounded-tl-md bg-white"
                            }`}
                          >
                            <p className="text-xs font-bold text-lacivert">
                              {m.yazar} <span className="font-normal text-ink/40">· {m.tarih}</span>
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-ink/85">{m.metin}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 flex gap-2">
                    <input
                      className="input flex-1"
                      placeholder="Cevabını yaz..."
                      value={cevaplar[b.id] ?? ""}
                      onChange={(e) => setCevaplar((o) => ({ ...o, [b.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && cevapGonder(b.id)}
                    />
                    <button onClick={() => cevapGonder(b.id)} className="btn btn-amber btn-md shrink-0">
                      Gönder
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {basliklar.length === 0 && (
          <div className="card p-10 text-center">
            <p className="baslik text-lg text-lacivert/60">
              Bu gölcük henüz sessiz... İlk "vak" senden gelsin! 🦆
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
