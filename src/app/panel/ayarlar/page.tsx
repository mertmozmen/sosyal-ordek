"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { AVATAR_RENKLER } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function Ayarlar() {
  const { kullanici, ayarGuncelle, verileriSifirla, cikis, sifreDegistir } = useStore();
  const router = useRouter();
  const [kaydedildi, setKaydedildi] = useState(false);
  const [yeniSifre, setYeniSifre] = useState("");
  const [sifreMesaj, setSifreMesaj] = useState("");

  if (!kullanici) return null;

  const kaydet = (kisim: Parameters<typeof ayarGuncelle>[0]) => {
    ayarGuncelle(kisim);
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 1800);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="baslik flex items-center gap-2.5 text-3xl"><Ikon ad="ayar" boy={32} /> Ayarlar</h1>
          <p className="mt-1 text-sm text-ink/60">Tüylerini istediğin gibi düzenle, vak!</p>
        </div>
        {kaydedildi && (
          <span className="chip vak-pop sicra bg-green-100 text-green-700">✓ Kaydedildi</span>
        )}
      </div>

      {/* Profil */}
      <div className="card p-6">
        <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="kullanici" boy={20} /> Profil</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="ad">Ad soyad</label>
            <input id="ad" className="input" defaultValue={kullanici.ad}
              onBlur={(e) => e.target.value.trim() && kaydet({ ad: e.target.value.trim() })} />
          </div>
          <div>
            <label className="label" htmlFor="sinif">Sınıf</label>
            <select id="sinif" className="input" value={kullanici.sinif}
              onChange={(e) => kaydet({ sinif: e.target.value })}>
              <option>8. Sınıf</option>
              <option>7. Sınıf</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="eposta">E-posta</label>
            <input id="eposta" className="input opacity-60" value={kullanici.email} disabled />
          </div>
          <div>
            <label className="label" htmlFor="veliTel">Veli telefonu</label>
            <input id="veliTel" className="input" defaultValue={kullanici.veliTel}
              onBlur={(e) => kaydet({ veliTel: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Ördek avatarı */}
      <div className="card p-6">
        <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="vak" boy={20} /> Ördeğinin Rengi</h2>
        <p className="mt-1 text-xs text-ink/55">
          Forumda ve liderlik tablosunda görünecek göl rengini seç.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          {Object.entries(AVATAR_RENKLER).map(([anahtar, r]) => (
            <button
              key={anahtar}
              onClick={() => kaydet({ avatarRenk: anahtar })}
              className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition ${
                kullanici.avatarRenk === anahtar
                  ? "bg-duck/30 ring-2 ring-amber"
                  : "hover:bg-cream-deep"
              }`}
            >
              <OrdekAvatar renk={anahtar} boy={56} />
              <span className="text-xs font-bold text-lacivert/70">{r.ad}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hedef */}
      <div className="card p-6">
        <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="hedef" boy={20} /> Haftalık Soru Hedefin</h2>
        <p className="mt-1 text-xs text-ink/55">
          Panelindeki hedef çubuğu bu sayıya göre dolar. Gerçekçi başla, sonra artır!
        </p>
        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={50}
            max={500}
            step={10}
            value={kullanici.hedefHaftalikSoru}
            onChange={(e) => ayarGuncelle({ hedefHaftalikSoru: Number(e.target.value) })}
            onMouseUp={() => kaydet({})}
            className="flex-1 accent-amber"
          />
          <span className="baslik w-24 text-right text-2xl text-amber-deep">
            {kullanici.hedefHaftalikSoru}
          </span>
        </div>
      </div>

      {/* Bildirimler */}
      <div className="card p-6">
        <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="bildirim" boy={20} /> Bildirimler</h2>
        <div className="mt-4 space-y-3">
          {(
            [
              ["bildirimDers", "Canlı ders başlamadan 30 dk önce hatırlat"],
              ["bildirimForum", "Forumda mesajıma cevap gelince haber ver"],
            ] as const
          ).map(([anahtar, etiket]) => (
            <label key={anahtar} className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-cream-deep/50 px-4 py-3">
              <span className="text-sm font-semibold text-ink/80">{etiket}</span>
              <input
                type="checkbox"
                checked={kullanici[anahtar]}
                onChange={(e) => kaydet({ [anahtar]: e.target.checked })}
                className="h-5 w-5 accent-amber"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Şifre */}
      <div className="card p-6">
        <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="kilit" boy={20} /> Şifre Değiştir</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <input
            type="password"
            className="input max-w-xs"
            placeholder="Yeni şifre (en az 6 karakter)"
            value={yeniSifre}
            onChange={(e) => setYeniSifre(e.target.value)}
          />
          <button
            className="btn btn-lacivert btn-md"
            onClick={async () => {
              if (yeniSifre.length < 6) {
                setSifreMesaj("Şifre en az 6 karakter olmalı.");
                return;
              }
              const sonuc = await sifreDegistir(yeniSifre);
              setYeniSifre("");
              setSifreMesaj(sonuc.ok ? "Şifren güncellendi!" : (sonuc.hata ?? "Bir şeyler ters gitti."));
            }}
          >
            Güncelle
          </button>
        </div>
        {sifreMesaj && <p className="mt-2 text-xs font-bold text-amber-deep">{sifreMesaj}</p>}
      </div>

      {/* Gizlilik + tehlikeli bölge */}
      <div className="card p-6">
        <h2 className="baslik flex items-center gap-2 text-lg"><Ikon ad="kitap" boy={20} /> Gizlilik & Hesap</h2>
        <p className="mt-2 text-sm text-ink/65">
          Verilerinin nasıl işlendiğini{" "}
          <Link href="/sozlesmeler" className="font-bold text-amber-deep hover:underline">
            Sözleşmeler
          </Link>{" "}
          sayfasından okuyabilirsin.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="btn btn-ghost btn-md"
            onClick={() => {
              cikis();
              router.push("/");
            }}
          >
            <Ikon ad="cikis" boy={16} /> Çıkış Yap
          </button>
          <button
            className="btn btn-md border-2 border-red-200 text-red-500 hover:bg-red-50"
            onClick={() => {
              if (confirm("Tüm demo verilerin (ilerleme, forum mesajların, hesabın) silinecek. Emin misin?")) {
                verileriSifirla();
                router.push("/");
              }
            }}
          >
            <Ikon ad="sil" boy={16} /> Demo Verilerini Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}
