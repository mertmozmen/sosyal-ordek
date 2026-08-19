"use client";

import { useCallback, useEffect, useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { useStore, type Grup, type Kullanici } from "@/lib/store";

const GRUP_RENKLERI = ["#4E7DE0", "#3FA47A", "#E2574C", "#8B5CF6", "#EC4899", "#F5A623"];

export default function YonetimGruplar() {
  const { gruplariYukle, grupKaydet, grupSil, grupUyeleriYaz, ogrencileriYukle } = useStore();
  const [gruplar, setGruplar] = useState<Grup[]>([]);
  const [ogrenciler, setOgrenciler] = useState<Kullanici[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yeniAd, setYeniAd] = useState("");
  const [yeniRenk, setYeniRenk] = useState(GRUP_RENKLERI[0]);
  const [acik, setAcik] = useState<string | null>(null);
  const [secimler, setSecimler] = useState<Record<string, boolean>>({});
  const [mesaj, setMesaj] = useState("");

  const tazele = useCallback(() => {
    Promise.all([gruplariYukle(), ogrencileriYukle()]).then(([g, o]) => {
      setGruplar(g);
      setOgrenciler(o.map((x) => x.kullanici));
      setYukleniyor(false);
    });
  }, [gruplariYukle, ogrencileriYukle]);

  useEffect(() => {
    tazele();
  }, [tazele]);

  const bilgi = (m: string) => {
    setMesaj(m);
    setTimeout(() => setMesaj(""), 2500);
  };

  const olustur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniAd.trim()) return;
    const id = await grupKaydet({ ad: yeniAd.trim(), renk: yeniRenk });
    if (id) {
      setYeniAd("");
      bilgi("Grup kuruldu! Şimdi öğrenci ekleyebilirsin.");
      tazele();
      setAcik(id);
      setSecimler({});
    } else {
      bilgi("Grup kurulamadı — bağlantıyı kontrol et.");
    }
  };

  const grupAc = (g: Grup) => {
    if (acik === g.id) {
      setAcik(null);
      return;
    }
    setAcik(g.id);
    setSecimler(Object.fromEntries(g.uyeler.map((u) => [u, true])));
  };

  const uyeleriKaydet = async (g: Grup) => {
    const secilenler = Object.keys(secimler).filter((id) => secimler[id]);
    await grupUyeleriYaz(g.id, secilenler);
    bilgi(`"${g.ad}" güncellendi: ${secilenler.length} üye.`);
    tazele();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="hedef" boy={32} /> Ders Grupları
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Belirli öğrencilerle özel gruplar kur. Canlı ders açarken ya da bildirim gönderirken
          hedef olarak bu grupları seçebilirsin — yalnızca üyeleri görür.
        </p>
      </div>

      {/* Yeni grup */}
      <form onSubmit={olustur} className="card flex flex-wrap items-end gap-3 p-5">
        <div className="min-w-48 flex-1">
          <label className="label" htmlFor="gAd">Grup adı</label>
          <input id="gAd" className="input" placeholder="Örn. Şampiyon Ördekler (A Grubu)"
            value={yeniAd} onChange={(e) => setYeniAd(e.target.value)} />
        </div>
        <div>
          <label className="label">Renk</label>
          <div className="flex gap-1.5">
            {GRUP_RENKLERI.map((r) => (
              <button key={r} type="button" aria-label={`renk ${r}`}
                onClick={() => setYeniRenk(r)}
                className={`h-9 w-9 rounded-xl transition ${yeniRenk === r ? "ring-2 ring-lacivert ring-offset-2" : ""}`}
                style={{ background: r }} />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-amber btn-md">
          <Ikon ad="ekle" boy={16} /> Grup Kur
        </button>
        {mesaj && <span className="chip vak-pop bg-green-100 text-green-700">{mesaj}</span>}
      </form>

      {yukleniyor && (
        <div className="card flex items-center justify-center gap-3 p-10">
          <Ikon ad="vak" boy={32} className="animate-bob" />
          <p className="font-display font-bold text-lacivert/50">Gruplar gölden çağırılıyor...</p>
        </div>
      )}

      {!yukleniyor && gruplar.length === 0 && (
        <div className="card p-10 text-center">
          <p className="baslik text-lg text-lacivert/60">
            Henüz grup yok. Yukarıdan ilk grubunu kur, vak!
          </p>
        </div>
      )}

      <div className="space-y-3">
        {gruplar.map((g) => {
          const acikMi = acik === g.id;
          return (
            <div key={g.id} className="card overflow-hidden">
              <button onClick={() => grupAc(g)} className="flex w-full items-center gap-4 p-4 text-left">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${g.renk}22` }}>
                  <span className="h-4 w-4 rounded-full" style={{ background: g.renk }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="baslik truncate text-base">{g.ad}</p>
                  <p className="text-xs text-ink/55">{g.uyeler.length} üye</p>
                </div>
                <span className={`text-lacivert/40 transition ${acikMi ? "rotate-90" : ""}`}>▸</span>
              </button>

              {acikMi && (
                <div className="space-y-4 border-t border-lacivert/8 bg-cream/60 p-5">
                  {ogrenciler.length === 0 ? (
                    <p className="text-sm text-ink/55">Kayıtlı öğrenci yok — önce siteden kayıt olunmalı.</p>
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {ogrenciler.map((o) => (
                        <label key={o.id}
                          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-2 bg-white p-2.5 transition ${
                            secimler[o.id] ? "border-amber" : "border-transparent"
                          }`}>
                          <input type="checkbox" className="accent-amber"
                            checked={!!secimler[o.id]}
                            onChange={(e) => setSecimler((s) => ({ ...s, [o.id]: e.target.checked }))} />
                          <OrdekAvatar renk={o.avatarRenk} boy={30} />
                          <span className="min-w-0">
                            <span className="baslik block truncate text-xs">{o.ad}</span>
                            <span className="block truncate text-[10px] text-ink/50">{o.email}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-lacivert btn-md" onClick={() => uyeleriKaydet(g)}>
                      <Ikon ad="tik" boy={15} /> Üyeleri Kaydet
                    </button>
                    <button
                      className="btn btn-md border-2 border-red-200 text-red-500 hover:bg-red-50"
                      onClick={async () => {
                        if (confirm(`"${g.ad}" grubu silinecek (öğrenciler silinmez). Emin misin?`)) {
                          await grupSil(g.id);
                          setAcik(null);
                          tazele();
                        }
                      }}
                    >
                      <Ikon ad="sil" boy={15} /> Grubu Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
