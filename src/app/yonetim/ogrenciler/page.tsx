"use client";

import { useCallback, useEffect, useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { HAFTALAR, haftaDurumu, asamaBul, tamamlananHaftaSayisi } from "@/lib/data";
import { useStore, vakPuan, cozulenSorular, type Ilerleme, type Kullanici } from "@/lib/store";

type Ogrenci = { kullanici: Kullanici; ilerleme: Ilerleme };

export default function YonetimOgrenciler() {
  const {
    ogrencileriYukle,
    ogrenciGuncelle,
    ogrenciSil,
    ogrenciIlerlemeYaz,
  } = useStore();
  const [ogrenciler, setOgrenciler] = useState<Ogrenci[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [acik, setAcik] = useState<string | null>(null);
  const [hedefHafta, setHedefHafta] = useState(2);

  const tazele = useCallback(() => {
    ogrencileriYukle().then((liste) => {
      setOgrenciler(liste);
      setYukleniyor(false);
    });
  }, [ogrencileriYukle]);

  useEffect(() => {
    tazele();
  }, [tazele]);

  const haftaAc = async (o: Ogrenci, haftaNo: number) => {
    const gorevler = { ...o.ilerleme.gorevler };
    HAFTALAR.filter((h) => h.no < haftaNo).forEach((h) =>
      h.gorevler.forEach((g) => (gorevler[g.id] = true))
    );
    await ogrenciIlerlemeYaz(o.kullanici.id, { ...o.ilerleme, gorevler });
    tazele();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="kullanici" boy={32} /> Öğrenciler
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          {ogrenciler.length} kayıtlı öğrenci (Supabase). Bilgilerini düzenle, haftalarını aç,
          ilerlemelerini yönet.
        </p>
      </div>

      {yukleniyor && (
        <div className="card flex items-center justify-center gap-3 p-10">
          <Ikon ad="vak" boy={32} className="animate-bob" />
          <p className="font-display font-bold text-lacivert/50">Öğrenciler gölden çağırılıyor...</p>
        </div>
      )}

      {!yukleniyor && ogrenciler.length === 0 && (
        <div className="card p-10 text-center">
          <p className="baslik text-lg text-lacivert/60">
            Henüz kayıtlı öğrenci yok. Siteden bir kayıt oluşunca burada görünecek.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {ogrenciler.map((o) => {
          const k = o.kullanici;
          const puan = vakPuan(o.ilerleme);
          const hafta = haftaDurumu(o.ilerleme.gorevler);
          const asama = asamaBul(tamamlananHaftaSayisi(o.ilerleme.gorevler));
          const sorular = cozulenSorular(o.ilerleme);
          const acikMi = acik === k.id;

          return (
            <div key={k.id} className="card overflow-hidden">
              <button
                onClick={() => setAcik(acikMi ? null : k.id)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <OrdekAvatar renk={k.avatarRenk} boy={44} asama={asama.no} />
                <div className="min-w-0 flex-1">
                  <p className="baslik truncate text-base">{k.ad}</p>
                  <p className="truncate text-xs text-ink/55">
                    {k.email} · {k.sinif} · Veli: {k.veliTel || "—"}
                  </p>
                </div>
                <div className="hidden gap-2 sm:flex">
                  <span className="chip bg-amber/25 text-amber-deep">{asama.ad}</span>
                  <span className="chip bg-duck/30 text-lacivert">{puan} puan</span>
                  <span className="chip bg-cream-deep text-lacivert">{hafta}. hafta</span>
                  <span className="chip bg-cream-deep text-lacivert">{sorular.toplam} soru</span>
                </div>
                <span className={`text-lacivert/40 transition ${acikMi ? "rotate-90" : ""}`}>▸</span>
              </button>

              {acikMi && (
                <div className="space-y-5 border-t border-lacivert/8 bg-cream/60 p-5">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="label" htmlFor={`ad-${k.id}`}>Ad soyad</label>
                      <input id={`ad-${k.id}`} className="input" defaultValue={k.ad}
                        onBlur={async (e) => {
                          if (e.target.value.trim()) {
                            await ogrenciGuncelle(k.id, { ad: e.target.value.trim() });
                            tazele();
                          }
                        }} />
                    </div>
                    <div>
                      <label className="label" htmlFor={`sinif-${k.id}`}>Sınıf</label>
                      <select id={`sinif-${k.id}`} className="input" defaultValue={k.sinif}
                        onChange={async (e) => {
                          await ogrenciGuncelle(k.id, { sinif: e.target.value });
                          tazele();
                        }}>
                        <option>8. Sınıf</option>
                        <option>7. Sınıf</option>
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor={`tel-${k.id}`}>Veli telefonu</label>
                      <input id={`tel-${k.id}`} className="input" defaultValue={k.veliTel}
                        onBlur={async (e) => {
                          await ogrenciGuncelle(k.id, { veliTel: e.target.value });
                          tazele();
                        }} />
                    </div>
                    <div>
                      <label className="label" htmlFor={`hedef-${k.id}`}>Haftalık soru hedefi</label>
                      <input id={`hedef-${k.id}`} type="number" className="input" defaultValue={k.hedefHaftalikSoru}
                        onBlur={async (e) => {
                          await ogrenciGuncelle(k.id, { hedefHaftalikSoru: Number(e.target.value) || 150 });
                          tazele();
                        }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                    {[
                      [`${sorular.toplam}`, "çözülen soru"],
                      [`${Object.keys(o.ilerleme.katilim).length}`, "canlı katılım"],
                      [`${Object.keys(o.ilerleme.tekrarlar).length}`, "izlenen tekrar"],
                      [`${Math.floor(o.ilerleme.siteDakika / 60)}s ${o.ilerleme.siteDakika % 60}dk`, "gölde süre"],
                    ].map(([deger, etiket]) => (
                      <div key={etiket} className="rounded-2xl bg-white p-3">
                        <p className="baslik text-xl">{deger}</p>
                        <p className="text-[11px] font-bold text-lacivert/60">{etiket}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4">
                    <div>
                      <label className="label" htmlFor={`hafta-${k.id}`}>Hafta kilidi</label>
                      <select id={`hafta-${k.id}`} className="input w-44" value={hedefHafta}
                        onChange={(e) => setHedefHafta(Number(e.target.value))}>
                        {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}. haftaya kadar aç</option>
                        ))}
                      </select>
                    </div>
                    <button className="btn btn-lacivert btn-md" onClick={() => haftaAc(o, hedefHafta)}>
                      <Ikon ad="kilit" boy={15} /> Kilidi Aç
                    </button>
                    <button
                      className="btn btn-ghost btn-md"
                      onClick={async () => {
                        if (confirm(`${k.ad} öğrencisinin TÜM ilerlemesi sıfırlanacak. Emin misin?`)) {
                          await ogrenciIlerlemeYaz(k.id, {
                            gorevler: {}, tekrarlar: {}, hocaVideolari: {}, katilim: {}, siteDakika: 0, forumMesaj: 0, gorulenEvrimler: {},
                          });
                          tazele();
                        }
                      }}
                    >
                      <Ikon ad="tekrar" boy={15} /> İlerlemeyi Sıfırla
                    </button>
                    <button
                      className="btn btn-md border-2 border-red-200 text-red-500 hover:bg-red-50"
                      onClick={async () => {
                        if (confirm(`${k.ad} (${k.email}) hesabı ve ilerlemesi silinecek. Emin misin?`)) {
                          await ogrenciSil(k.id);
                          setAcik(null);
                          tazele();
                        }
                      }}
                    >
                      <Ikon ad="sil" boy={15} /> Öğrenciyi Sil
                    </button>
                  </div>

                  <p className="text-xs text-ink/45">
                    Şu an {hafta}. haftada · Not: "Kilidi Aç", önceki haftaların tüm görevlerini
                    tamamlanmış sayar.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
