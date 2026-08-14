"use client";

import { useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { haftaDurumu } from "@/lib/data";
import { useStore, vakPuan, cozulenSorular } from "@/lib/store";

export default function YonetimOgrenciler() {
  const {
    ogrencileriGetir,
    ogrenciIlerlemesi,
    ogrenciGuncelle,
    ogrenciSil,
    ogrenciHaftaAc,
    ogrenciIlerlemeSifirla,
  } = useStore();
  const [acik, setAcik] = useState<string | null>(null);
  const [yenile, setYenile] = useState(0);
  const [hedefHafta, setHedefHafta] = useState(2);

  const ogrenciler = ogrencileriGetir();
  const tazele = () => setYenile(yenile + 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="baslik flex items-center gap-2.5 text-3xl">
          <Ikon ad="kullanici" boy={32} /> Öğrenciler
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          {ogrenciler.length} kayıtlı öğrenci. Bilgilerini düzenle, haftalarını aç, ilerlemelerini
          yönet.
        </p>
      </div>

      {ogrenciler.length === 0 && (
        <div className="card p-10 text-center">
          <p className="baslik text-lg text-lacivert/60">
            Henüz kayıtlı öğrenci yok. Siteden bir kayıt oluşturunca burada görünecek.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {ogrenciler.map((o) => {
          const ilerleme = ogrenciIlerlemesi(o.email);
          const puan = vakPuan(ilerleme);
          const hafta = haftaDurumu(ilerleme.gorevler);
          const sorular = cozulenSorular(ilerleme);
          const acikMi = acik === o.email;

          return (
            <div key={o.email} className="card overflow-hidden">
              <button
                onClick={() => setAcik(acikMi ? null : o.email)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <OrdekAvatar renk={o.avatarRenk} boy={44} />
                <div className="min-w-0 flex-1">
                  <p className="baslik truncate text-base">{o.ad}</p>
                  <p className="truncate text-xs text-ink/55">
                    {o.email} · {o.sinif} · Veli: {o.veliTel || "—"}
                  </p>
                </div>
                <div className="hidden gap-2 sm:flex">
                  <span className="chip bg-duck/30 text-lacivert">{puan} puan</span>
                  <span className="chip bg-cream-deep text-lacivert">{hafta}. hafta</span>
                  <span className="chip bg-cream-deep text-lacivert">{sorular.toplam} soru</span>
                </div>
                <span className={`text-lacivert/40 transition ${acikMi ? "rotate-90" : ""}`}>▸</span>
              </button>

              {acikMi && (
                <div className="space-y-5 border-t border-lacivert/8 bg-cream/60 p-5">
                  {/* Bilgi düzenleme */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="label" htmlFor={`ad-${o.email}`}>Ad soyad</label>
                      <input id={`ad-${o.email}`} className="input" defaultValue={o.ad}
                        onBlur={(e) => { if (e.target.value.trim()) { ogrenciGuncelle(o.email, { ad: e.target.value.trim() }); tazele(); } }} />
                    </div>
                    <div>
                      <label className="label" htmlFor={`sinif-${o.email}`}>Sınıf</label>
                      <select id={`sinif-${o.email}`} className="input" defaultValue={o.sinif}
                        onChange={(e) => { ogrenciGuncelle(o.email, { sinif: e.target.value }); tazele(); }}>
                        <option>8. Sınıf</option>
                        <option>7. Sınıf</option>
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor={`tel-${o.email}`}>Veli telefonu</label>
                      <input id={`tel-${o.email}`} className="input" defaultValue={o.veliTel}
                        onBlur={(e) => { ogrenciGuncelle(o.email, { veliTel: e.target.value }); tazele(); }} />
                    </div>
                    <div>
                      <label className="label" htmlFor={`hedef-${o.email}`}>Haftalık soru hedefi</label>
                      <input id={`hedef-${o.email}`} type="number" className="input" defaultValue={o.hedefHaftalikSoru}
                        onBlur={(e) => { ogrenciGuncelle(o.email, { hedefHaftalikSoru: Number(e.target.value) || 150 }); tazele(); }} />
                    </div>
                  </div>

                  {/* İlerleme istatistikleri */}
                  <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                    {[
                      [`${sorular.toplam}`, "çözülen soru"],
                      [`${Object.keys(ilerleme.katilim).length}`, "canlı katılım"],
                      [`${Object.keys(ilerleme.tekrarlar).length}`, "izlenen tekrar"],
                      [`${Math.floor(ilerleme.siteDakika / 60)}s ${ilerleme.siteDakika % 60}dk`, "gölde süre"],
                    ].map(([deger, etiket]) => (
                      <div key={etiket} className="rounded-2xl bg-white p-3">
                        <p className="baslik text-xl">{deger}</p>
                        <p className="text-[11px] font-bold text-lacivert/60">{etiket}</p>
                      </div>
                    ))}
                  </div>

                  {/* Hafta yönetimi */}
                  <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4">
                    <div>
                      <label className="label" htmlFor={`hafta-${o.email}`}>Hafta kilidi</label>
                      <select id={`hafta-${o.email}`} className="input w-44" value={hedefHafta}
                        onChange={(e) => setHedefHafta(Number(e.target.value))}>
                        {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}. haftaya kadar aç</option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="btn btn-lacivert btn-md"
                      onClick={() => { ogrenciHaftaAc(o.email, hedefHafta); tazele(); }}
                    >
                      <Ikon ad="kilit" boy={15} /> Kilidi Aç
                    </button>
                    <button
                      className="btn btn-ghost btn-md"
                      onClick={() => {
                        if (confirm(`${o.ad} öğrencisinin TÜM ilerlemesi sıfırlanacak. Emin misin?`)) {
                          ogrenciIlerlemeSifirla(o.email);
                          tazele();
                        }
                      }}
                    >
                      <Ikon ad="tekrar" boy={15} /> İlerlemeyi Sıfırla
                    </button>
                    <button
                      className="btn btn-md border-2 border-red-200 text-red-500 hover:bg-red-50"
                      onClick={() => {
                        if (confirm(`${o.ad} (${o.email}) hesabı ve tüm verisi silinecek. Emin misin?`)) {
                          ogrenciSil(o.email);
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
