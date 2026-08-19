"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OrdekAvatar } from "@/components/Logo";
import { Ikon } from "@/components/ikonlar";
import { DERS_MAP, HOCALAR, GUNLER } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useIstemciHazir, useOgretmenYayin, useSorguParam } from "@/lib/yayin";

export default function YonetimYayinOdasi() {
  const { canliDersler, kullanici, dersKaydet, bildirimGonder, kayitYukle, tekrarKaydet, tekrarlar } = useStore();
  const okundu = useIstemciHazir();
  const dersId = useSorguParam("d");
  const [sohbetMetni, setSohbetMetni] = useState("");
  const [sonuc, setSonuc] = useState<{ kayitUrl: string | null; sureDk: number; blob: Blob | null } | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [duyuruUyari, setDuyuruUyari] = useState(false);
  const sohbetSonu = useRef<HTMLDivElement>(null);
  const onizlemeRef = useRef<HTMLVideoElement>(null);

  const ders = canliDersler.find((d) => d.id === dersId) ?? null;
  const yayin = useOgretmenYayin(ders?.id ?? null, kullanici?.ad ?? "Göl Kaptanı", onizlemeRef);

  useEffect(() => {
    sohbetSonu.current?.scrollIntoView({ behavior: "smooth" });
  }, [yayin.sohbet]);

  if (!okundu) return null;
  if (!ders) {
    return (
      <div className="card p-10 text-center">
        <p className="baslik text-lg">Yayın bulunamadı</p>
        <Link href="/yonetim/dersler" className="btn btn-amber btn-md mt-4">← Canlı Ders & Yayın</Link>
      </div>
    );
  }

  const dersBilgi = DERS_MAP[ders.ders];
  const hoca = HOCALAR.find((h) => h.id === ders.hocaId);

  // Çevrimdışı yönetici modunda (gerçek oturum yok) yayın açılamaz:
  // öğrencilere ne CANLI durumu ne bildirim ulaşır.
  if (!kullanici) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card p-8 text-center">
          <Ikon ad="kilit" boy={48} className="mx-auto" />
          <h1 className="baslik mt-3 text-xl">Canlı yayın için gerçek giriş gerekli</h1>
          <p className="mt-2 text-sm text-ink/60">
            Şu an çevrimdışı yönetici modundasın. Yayın açmak, bildirim göndermek ve kayıt
            yüklemek için Kaptan Köşkü'ne e-posta + şifreyle (internet varken) girmelisin.
          </p>
          <Link href="/yonetim/dersler" className="btn btn-amber btn-md mt-5">← Yayın listesine dön</Link>
        </div>
      </div>
    );
  }

  // Öğrencilerin haberdar olması bu iki yazmaya bağlı: dersi CANLI işaretle +
  // hedef kitleye bildirim. Başarısızsa uyarı göster, tekrar denenebilsin.
  const duyur = async (): Promise<boolean> => {
    const dersOk = await dersKaydet({ ...ders, durum: "canli", odaKodu: ders.odaKodu ?? `oda-${Date.now()}` });
    const bildirimOk = await bildirimGonder({
      baslik: `🔴 ${ders.baslik} şimdi canlı!`,
      metin: "Ders başladı — katılmak için Online Derslerim'den 'Derse Katıl' de, vak!",
      tur: "canli",
      hedef: ders.hedef ?? "herkes",
      grupId: ders.grupId,
      ogrenciId: ders.ogrenciId,
      yayinId: ders.id,
    });
    const ok = dersOk && bildirimOk.ok;
    setDuyuruUyari(!ok);
    return ok;
  };

  const baslat = async () => {
    const ok = await yayin.yayinBaslat();
    if (!ok) return;
    await duyur();
  };

  const bitir = async () => {
    if (!confirm("Yayın bitirilecek ve kayıt Ders Tekrarlarım'a yüklenecek. Emin misin?")) return;
    setYukleniyor(true);
    const { blob, sureDk } = await yayin.yayinBitir();

    let kayitUrl: string | null = null;
    if (blob) {
      kayitUrl = await kayitYukle(`${ders.id}-${Date.now()}.webm`, blob);
      if (kayitUrl) {
        const tarih = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
        const hafta = Math.max(1, ...tekrarlar.map((t) => t.hafta));
        tekrarKaydet({
          id: `yt-${Date.now()}`,
          tur: ders.tur,
          ders: ders.ders,
          baslik: `${ders.baslik} — ${tarih} kaydı`,
          hocaId: ders.hocaId,
          sure: `${sureDk} dk`,
          tarih,
          hafta,
          videoUrl: kayitUrl,
        });
      }
    }
    await dersKaydet({ ...ders, durum: "bitti", kayitUrl });
    setSonuc({ kayitUrl, sureDk, blob });
    setYukleniyor(false);
  };

  const sohbetYolla = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sohbetMetni.trim()) return;
    yayin.sohbetGonder(sohbetMetni.trim());
    setSohbetMetni("");
  };

  // ---- Yayın sonrası ekran ----
  if (sonuc) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card p-8 text-center">
          <Ikon ad="tik" boy={56} className="sicra mx-auto" />
          <h1 className="baslik mt-3 text-2xl">Yayın tamamlandı!</h1>
          <p className="mt-2 text-sm text-ink/65">
            {sonuc.sureDk} dakikalık yayın sona erdi.{" "}
            {sonuc.kayitUrl
              ? "Kayıt otomatik olarak öğrencilerin Ders Tekrarlarım sayfasına düştü."
              : sonuc.blob
                ? "Kayıt buluta yüklenemedi — aşağıdan bilgisayarına indirebilirsin."
                : "Bu yayında kayıt alınamadı."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {sonuc.kayitUrl && (
              <a href={sonuc.kayitUrl} target="_blank" rel="noreferrer" className="btn btn-amber btn-md">
                <Ikon ad="oynat" boy={16} /> Kaydı izle
              </a>
            )}
            {!sonuc.kayitUrl && sonuc.blob && (
              <a
                href={URL.createObjectURL(sonuc.blob)}
                download={`${ders.id}-kayit.webm`}
                className="btn btn-amber btn-md"
              >
                <Ikon ad="yukle" boy={16} /> Kaydı indir
              </a>
            )}
            <Link href="/yonetim/dersler" className="btn btn-ghost btn-md">← Yayın listesine dön</Link>
          </div>
        </div>
      </div>
    );
  }

  const yayinda = yayin.durum === "yayinda" || yayin.durum === "bitiriliyor";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="baslik flex items-center gap-2.5 text-2xl">
            <Ikon ad="canli" boy={28} /> {ders.baslik}
            {yayinda && (
              <span className="chip bg-red-500 text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> CANLI
              </span>
            )}
          </h1>
          <p className="mt-0.5 text-sm text-ink/60">
            {dersBilgi?.ad ?? "Genel"} · {hoca?.ad ?? "—"} · {GUNLER[ders.gun]} {ders.saat} ·{" "}
            {ders.hedef === "grup" ? "Grup yayını" : ders.hedef === "ogrenci" ? "Birebir yayın" : "Herkese açık"}
          </p>
        </div>
        {yayinda && (
          <button onClick={bitir} disabled={yukleniyor} className="btn btn-md border-2 border-red-300 bg-red-500 text-white hover:bg-red-600">
            {yukleniyor ? "Kayıt yükleniyor..." : "⏹ Yayını Bitir"}
          </button>
        )}
      </div>

      {duyuruUyari && yayinda && (
        <div className="card flex flex-wrap items-center gap-3 border-2 border-red-300 bg-red-50 p-4">
          <p className="flex-1 text-sm font-bold text-red-600">
            ⚠️ Öğrencilere duyuru ulaşmadı! Ders "CANLI" olarak işaretlenemedi ya da bildirim
            gönderilemedi — öğrenciler yayını göremez. İnternetini kontrol edip tekrar dene.
          </p>
          <button onClick={duyur} className="btn btn-md bg-red-500 text-white hover:bg-red-600">
            Duyuruyu Tekrar Gönder
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        {/* Sol: video + kontroller */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-3xl bg-lacivert-koyu shadow-lg">
            <video ref={onizlemeRef} muted playsInline className="aspect-video w-full object-contain" />
            {!yayinda && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-lacivert-koyu/70 p-6 text-center">
                <Ikon ad="canli" boy={52} />
                <p className="max-w-sm text-sm text-white/75">
                  Yayını başlatınca kamera ve mikrofonun açılır, hedef kitleye anlık bildirim gider
                  ve tüm yayın otomatik kaydedilir.
                </p>
                <button onClick={baslat} className="btn btn-amber btn-lg">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" /> Yayını Başlat
                </button>
                {yayin.hata && (
                  <p className="rounded-xl bg-red-500/20 px-3 py-2 text-xs font-bold text-red-200">{yayin.hata}</p>
                )}
              </div>
            )}
            {yayinda && (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
                <button onClick={yayin.mikrofonToggle}
                  className={`btn btn-sm ${yayin.mikrofonAcik ? "bg-white/90 text-lacivert" : "bg-red-500 text-white"}`}>
                  {yayin.mikrofonAcik ? "🎙 Mikrofon açık" : "🔇 Mikrofon kapalı"}
                </button>
                <button onClick={yayin.kameraToggle}
                  className={`btn btn-sm ${yayin.kameraAcik ? "bg-white/90 text-lacivert" : "bg-red-500 text-white"}`}>
                  {yayin.kameraAcik ? "📷 Kamera açık" : "📷 Kamera kapalı"}
                </button>
                <button onClick={yayin.ekranToggle}
                  className={`btn btn-sm ${yayin.ekranPaylasimda ? "bg-amber text-lacivert-koyu" : "bg-white/90 text-lacivert"}`}>
                  🖥 {yayin.ekranPaylasimda ? "Ekranı bırak" : "Ekran paylaş"}
                </button>
                <span className="chip bg-white/20 text-white">● Kayıtta</span>
              </div>
            )}
          </div>
          <p className="text-xs text-ink/45">
            Not: Yayın süresince bu sekmeyi açık ve görünür tut — kayıt bu sekmede alınır.
          </p>
        </div>

        {/* Sağ: katılımcılar + sohbet */}
        <div className="flex flex-col gap-4">
          <div className="card p-4">
            <h2 className="baslik flex items-center gap-2 text-sm">
              <Ikon ad="kullanici" boy={17} /> Katılımcılar ({yayin.katilimcilar.length})
            </h2>
            <div className="mt-2 max-h-48 space-y-1.5 overflow-y-auto">
              {yayin.katilimcilar.length === 0 && (
                <p className="text-xs text-ink/50">Henüz katılan yok — bildirim gitti, bekliyoruz vak.</p>
              )}
              {yayin.katilimcilar.map((k) => (
                <div key={k.id} className={`flex items-center gap-2 rounded-xl p-1.5 ${k.el ? "bg-duck/25" : ""}`}>
                  <OrdekAvatar boy={28} />
                  <span className="baslik min-w-0 flex-1 truncate text-xs">{k.ad}</span>
                  {k.el && !yayin.sozVerilenler[k.id] && (
                    <button onClick={() => yayin.sozVer(k.id, true)} className="btn btn-amber btn-sm !px-2 !py-1 text-[11px]">
                      <Ikon ad="el" boy={12} /> Söz ver
                    </button>
                  )}
                  {yayin.sozVerilenler[k.id] && (
                    <button onClick={() => yayin.sozVer(k.id, false)} className="btn btn-sm !px-2 !py-1 bg-red-500 text-[11px] text-white">
                      Sözü al
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card flex min-h-0 flex-1 flex-col p-4">
            <h2 className="baslik flex items-center gap-2 text-sm">
              <Ikon ad="forum" boy={17} /> Sohbet
            </h2>
            <div className="mt-2 max-h-64 min-h-32 flex-1 space-y-2 overflow-y-auto">
              {yayin.sohbet.map((m) => (
                <p key={m.id} className="text-xs">
                  <span className={`font-bold ${m.rol === "ogretmen" ? "text-amber-deep" : "text-lacivert"}`}>{m.ad}:</span>{" "}
                  <span className="text-ink/75">{m.metin}</span>
                </p>
              ))}
              <div ref={sohbetSonu} />
            </div>
            <form onSubmit={sohbetYolla} className="mt-2 flex gap-2">
              <input className="input flex-1 !py-2 text-sm" placeholder="Mesaj yaz..."
                value={sohbetMetni} onChange={(e) => setSohbetMetni(e.target.value)} disabled={!yayinda} />
              <button type="submit" className="btn btn-lacivert btn-sm" disabled={!yayinda}>
                <Ikon ad="gonder" boy={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
