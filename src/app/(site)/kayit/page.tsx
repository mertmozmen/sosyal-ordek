"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrdekKafa } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { useStore } from "@/lib/store";

export default function Kayit() {
  const router = useRouter();
  const { kayitOl } = useStore();
  const [form, setForm] = useState({
    ad: "",
    email: "",
    sifre: "",
    sinif: "8. Sınıf",
    veliTel: "",
    kvkk: false,
    veli: false,
    kosullar: false,
  });
  const [hata, setHata] = useState("");
  const [bekliyor, setBekliyor] = useState(false);
  const [dogrulamaBekliyor, setDogrulamaBekliyor] = useState(false);

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ad || !form.email || !form.sifre) {
      setHata("İsim, e-posta ve şifre alanları zorunlu.");
      return;
    }
    if (form.sifre.length < 6) {
      setHata("Şifre en az 6 karakter olmalı.");
      return;
    }
    if (!form.kvkk || !form.veli || !form.kosullar) {
      setHata("Devam etmek için üç onay kutusunu da işaretlemen gerekiyor.");
      return;
    }
    setBekliyor(true);
    const sonuc = await kayitOl({
      ad: form.ad.trim(),
      email: form.email.trim().toLowerCase(),
      sifre: form.sifre,
      sinif: form.sinif,
      veliTel: form.veliTel,
    });
    setBekliyor(false);
    if (!sonuc.ok) {
      setHata(sonuc.hata ?? "Bir şeyler ters gitti.");
      return;
    }
    if (sonuc.dogrulamaGerekli) {
      setDogrulamaBekliyor(true);
      return;
    }
    router.push("/panel/hocani-tani?hosgeldin=1");
  };

  if (dogrulamaBekliyor) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="card p-8 text-center">
          <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={68} className="animate-bob" />
          </span>
          <h1 className="baslik mt-4 text-2xl">Bir adım kaldı!</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            <strong>{form.email}</strong> adresine bir doğrulama bağlantısı gönderdik. Gelen
            kutunu (ve gereksiz klasörünü) kontrol edip bağlantıya tıkla; sonra{" "}
            <Link href="/giris" className="font-bold text-amber-deep hover:underline">
              giriş yap
            </Link>{" "}
            ve göle dal!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="card p-8">
        <div className="text-center">
          <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={68} className="animate-bob" />
          </span>
          <h1 className="baslik mt-4 text-2xl">Göle katıl!</h1>
          <p className="mt-1 text-sm text-ink/60">
            Kayıttan hemen sonra hocalarınla tanışacaksın.
          </p>
        </div>

        <form onSubmit={gonder} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="ad">Öğrenci adı soyadı</label>
            <input id="ad" className="input" placeholder="Örn. Zeynep Yılmaz"
              value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="email">E-posta</label>
            <input id="email" type="email" className="input" placeholder="ornek@eposta.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="sifre">Şifre</label>
              <input id="sifre" type="password" className="input" placeholder="En az 6 karakter"
                value={form.sifre} onChange={(e) => setForm({ ...form, sifre: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="sinif">Sınıf</label>
              <select id="sinif" className="input" value={form.sinif}
                onChange={(e) => setForm({ ...form, sinif: e.target.value })}>
                <option>8. Sınıf</option>
                <option>7. Sınıf</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="veliTel">Veli telefonu</label>
            <input id="veliTel" className="input" placeholder="05__ ___ __ __" inputMode="tel"
              value={form.veliTel} onChange={(e) => setForm({ ...form, veliTel: e.target.value })} />
          </div>

          <div className="space-y-2.5 rounded-2xl bg-cream-deep/60 p-4 text-xs leading-relaxed text-ink/75">
            <label className="flex items-start gap-2.5">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-amber" checked={form.kvkk}
                onChange={(e) => setForm({ ...form, kvkk: e.target.checked })} />
              <span>
                <Link href="/sozlesmeler/kvkk-aydinlatma" target="_blank" className="font-bold text-amber-deep hover:underline">KVKK Aydınlatma Metni</Link>'ni
                okudum;{" "}
                <Link href="/sozlesmeler/acik-riza" target="_blank" className="font-bold text-amber-deep hover:underline">Açık Rıza Metni</Link>
                'ni kabul ediyorum.
              </span>
            </label>
            <label className="flex items-start gap-2.5">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-amber" checked={form.veli}
                onChange={(e) => setForm({ ...form, veli: e.target.checked })} />
              <span>
                Velimin bilgisi dahilinde kayıt oluyorum;{" "}
                <Link href="/sozlesmeler/veli-onay" target="_blank" className="font-bold text-amber-deep hover:underline">Veli Onay Metni</Link>{" "}
                velim tarafından onaylandı.
              </span>
            </label>
            <label className="flex items-start gap-2.5">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-amber" checked={form.kosullar}
                onChange={(e) => setForm({ ...form, kosullar: e.target.checked })} />
              <span>
                <Link href="/sozlesmeler/kullanim-kosullari" target="_blank" className="font-bold text-amber-deep hover:underline">Kullanım Koşulları</Link>{" "}
                ve{" "}
                <Link href="/sozlesmeler/mesafeli-satis" target="_blank" className="font-bold text-amber-deep hover:underline">Mesafeli Satış Sözleşmesi</Link>
                'ni kabul ediyorum.
              </span>
            </label>
          </div>

          {hata && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{hata}</p>
          )}

          <button type="submit" disabled={bekliyor} className="btn btn-amber btn-lg w-full">
            <Ikon ad="yumurta" boy={18} /> {bekliyor ? "Yumurta çatlıyor..." : "Kaydımı Oluştur"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          Zaten hesabın var mı?{" "}
          <Link href="/giris" className="font-bold text-amber-deep hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}
