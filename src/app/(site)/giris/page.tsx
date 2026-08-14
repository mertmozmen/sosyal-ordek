"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrdekKafa } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { useStore } from "@/lib/store";

export default function Giris() {
  const router = useRouter();
  const { girisYap, demoGiris } = useStore();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");

  const gonder = (e: React.FormEvent) => {
    e.preventDefault();
    const sonuc = girisYap(email.trim().toLowerCase(), sifre);
    if (!sonuc.ok) {
      setHata(sonuc.hata ?? "Bir şeyler ters gitti.");
      return;
    }
    router.push("/panel");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card p-8">
        <div className="text-center">
          <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream-deep">
            <OrdekKafa boy={68} className="animate-bob" />
          </span>
          <h1 className="baslik mt-4 text-2xl">Tekrar hoş geldin!</h1>
          <p className="mt-1 text-sm text-ink/60">Göl seni özledi, vak vak!</p>
        </div>

        <form onSubmit={gonder} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="email">E-posta</label>
            <input id="email" type="email" className="input" placeholder="ornek@eposta.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="sifre">Şifre</label>
            <input id="sifre" type="password" className="input" placeholder="••••••••"
              value={sifre} onChange={(e) => setSifre(e.target.value)} />
          </div>

          {hata && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{hata}</p>
          )}

          <button type="submit" className="btn btn-amber btn-lg w-full">
            Giriş Yap
          </button>
        </form>

        <button
          onClick={() => {
            demoGiris();
            router.push("/panel");
          }}
          className="btn btn-ghost btn-md mt-3 w-full"
        >
          <Ikon ad="vak" boy={18} /> Demo hesabıyla gez
        </button>

        <p className="mt-6 text-center text-sm text-ink/60">
          Henüz hesabın yok mu?{" "}
          <Link href="/kayit" className="font-bold text-amber-deep hover:underline">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}
