import type { IkonAd } from "@/components/ikonlar";

export type DersId = "mat" | "fen" | "tur" | "ink" | "ing" | "genel";

export type Ders = {
  id: DersId;
  ad: string;
  kisaAd: string;
  renk: string;
  aciklama: string;
};

export const DERSLER: Ders[] = [
  {
    id: "mat",
    ad: "Matematik",
    kisaAd: "Mat",
    renk: "#4E7DE0",
    aciklama: "Sayılardan geometriye, LGS'nin en çok korkulan dersini en sevilen dersine çeviriyoruz.",
  },
  {
    id: "fen",
    ad: "Fen Bilimleri",
    kisaAd: "Fen",
    renk: "#3FA47A",
    aciklama: "Deneylerle, görsellerle ve bol soruyla fen konularını gölün berrak suyu kadar netleştiriyoruz.",
  },
  {
    id: "tur",
    ad: "Türkçe",
    kisaAd: "Tür",
    renk: "#E2574C",
    aciklama: "Paragraf hızından dil bilgisine, Türkçe'de tam puanı hedefleyen bir yol haritası.",
  },
  {
    id: "ink",
    ad: "T.C. İnkılap Tarihi",
    kisaAd: "İnk",
    renk: "#8B5CF6",
    aciklama: "Kronoloji ezberi değil; hikâyesiyle, haritasıyla, sebep-sonucuyla tarih öğreniyoruz.",
  },
  {
    id: "ing",
    ad: "Yabancı Dil (İngilizce)",
    kisaAd: "İng",
    renk: "#EC4899",
    aciklama: "Kelime oyunları ve bol pratikle İngilizce sorularını garanti puana dönüştürüyoruz.",
  },
];

export const DERS_MAP: Record<string, Ders> = Object.fromEntries(
  DERSLER.map((d) => [d.id, d])
);

export type Hoca = {
  id: string;
  ad: string;
  ders: DersId;
  unvan: string;
  deneyim: number;
  okul: string;
  motto: string;
  tanitim: string;
  videoSure: string;
};

export const HOCALAR: Hoca[] = [
  {
    id: "elif-kaya",
    ad: "Elif Kaya",
    ders: "mat",
    unvan: "Matematik Öğretmeni",
    deneyim: 11,
    okul: "ODTÜ Matematik Eğitimi",
    motto: "Matematik ezber değil, yüzme öğrenmek gibidir: bir kez kapan bir daha unutmaz.",
    tanitim:
      "Merhaba, ben Elif Hoca! 11 yıldır LGS öğrencileriyle çalışıyorum. Sosyal Ördek'te matematik derslerinizde ben olacağım; korkulan soruları adım adım, birlikte çözeceğiz. Söz veriyorum: haziran geldiğinde matematik en güvendiğiniz ders olacak.",
    videoSure: "3:24",
  },
  {
    id: "burak-demir",
    ad: "Burak Demir",
    ders: "fen",
    unvan: "Fen Bilimleri Öğretmeni",
    deneyim: 9,
    okul: "Hacettepe Fen Bilgisi Öğretmenliği",
    motto: "Fen; ezberlenen değil, gözlemlenen bir derstir.",
    tanitim:
      "Selam, ben Burak Hoca! Sosyal Ördek'te fen bilimleri yolculuğunuzda rehberiniz olacağım. Deney videoları, günlük hayattan örnekler ve bol bol soruyla DNA'dan basınca her konuyu su gibi öğreneceğiz. Vak vak, laboratuvar önlüğünü kap gel!",
    videoSure: "2:58",
  },
  {
    id: "zeynep-arslan",
    ad: "Zeynep Arslan",
    ders: "tur",
    unvan: "Türkçe Öğretmeni",
    deneyim: 13,
    okul: "İstanbul Üniversitesi Türk Dili ve Edebiyatı",
    motto: "Paragraf hız işidir; hız da doğru teknikle gelir.",
    tanitim:
      "Merhaba canlar, ben Zeynep Hoca! 13 yıldır Türkçe öğretiyorum ve Sosyal Ördek'te sizlerle olacağım. Paragrafta süre yetiştirememe derdine son veriyoruz; fiilimsiden noktalamaya her konuyu eğlenceli tekniklerle çözeceğiz.",
    videoSure: "3:41",
  },
  {
    id: "mehmet-yildiz",
    ad: "Mehmet Yıldız",
    ders: "ink",
    unvan: "Sosyal Bilgiler Öğretmeni",
    deneyim: 15,
    okul: "Ankara Üniversitesi Tarih",
    motto: "Tarihi anlayan, geleceğe hazırlanır.",
    tanitim:
      "Merhaba gençler, ben Mehmet Hoca! İnkılap Tarihi derslerinizde beraberiz. Tarihleri ezberletmem; olayların hikâyesini öyle bir anlatırım ki sorular size selam verir. Sosyal Ördek gölünde tarih, en keyifli ders olacak.",
    videoSure: "3:12",
  },
  {
    id: "selin-acar",
    ad: "Selin Acar",
    ders: "ing",
    unvan: "İngilizce Öğretmeni",
    deneyim: 8,
    okul: "Boğaziçi Yabancı Diller Eğitimi",
    motto: "Quack quack! Dil öğrenmek cesaret işidir.",
    tanitim:
      "Hello everyone, ben Selin Hoca! Sosyal Ördek'te İngilizce sorularının şifresini birlikte kıracağız. Kelime kartları, mini oyunlar ve çıkmış soru analizleriyle İngilizce, net garantileyen dersiniz olacak. See you at the pond!",
    videoSure: "2:47",
  },
];

export type GorevTip = "konu" | "test" | "icerik" | "deneme" | "cikmis";

export const GOREV_TIP: Record<GorevTip, { ad: string; ikon: IkonAd }> = {
  konu: { ad: "Konu Anlatımı", ikon: "video" },
  test: { ad: "Konu Testi", ikon: "kalem" },
  icerik: { ad: "Ders Notu", ikon: "kitap" },
  deneme: { ad: "Deneme", ikon: "deneme" },
  cikmis: { ad: "Çıkmış Sorular", ikon: "arsiv" },
};

export type Gorev = {
  id: string;
  ders: DersId;
  tip: GorevTip;
  baslik: string;
  soru: number;
  dakika: number;
};

export type Hafta = {
  no: number;
  tema: string;
  gorevler: Gorev[];
};

const KONULAR: Record<string, string[]> = {
  mat: [
    "Çarpanlar ve Katlar",
    "Üslü İfadeler",
    "Kareköklü İfadeler",
    "Veri Analizi",
    "Basit Olayların Olma Olasılığı",
    "Cebirsel İfadeler ve Özdeşlikler",
    "Doğrusal Denklemler",
    "Eşitsizlikler",
    "Üçgenler",
    "Eşlik ve Benzerlik",
    "Dönüşüm Geometrisi",
    "Geometrik Cisimler",
  ],
  fen: [
    "Mevsimler ve İklim",
    "DNA ve Genetik Kod",
    "Kalıtım ve Adaptasyon",
    "Basınç",
    "Periyodik Sistem",
    "Fiziksel ve Kimyasal Değişimler",
    "Asitler ve Bazlar",
    "Madde ve Endüstri",
    "Basit Makineler",
    "Enerji Dönüşümleri",
    "Besin Zinciri ve Enerji Akışı",
    "Elektrik Yükleri ve Elektrik Enerjisi",
  ],
  tur: [
    "Sözcükte Anlam",
    "Cümlede Anlam",
    "Paragrafta Anlam",
    "Paragrafta Yapı",
    "Fiilimsiler",
    "Cümlenin Ögeleri",
    "Fiillerde Çatı",
    "Cümle Türleri",
    "Yazım Kuralları",
    "Noktalama İşaretleri",
    "Söz Sanatları",
    "Metin Türleri",
  ],
  ink: [
    "Bir Kahraman Doğuyor",
    "Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar",
    "Milli Bir Destan: Ya İstiklal Ya Ölüm",
    "Atatürkçülük ve Çağdaşlaşan Türkiye",
    "Demokratikleşme Çabaları",
    "Atatürk Dönemi Türk Dış Politikası",
    "Atatürk'ün Ölümü ve Sonrası",
  ],
  ing: [
    "Friendship",
    "Teen Life",
    "In the Kitchen",
    "On the Phone",
    "The Internet",
    "Adventures",
    "Tourism",
    "Chores",
    "Science",
    "Natural Forces",
  ],
};

function konuSec(ders: DersId, hafta: number): string {
  const arr = KONULAR[ders];
  return arr[Math.min(Math.floor(((hafta - 1) * arr.length) / 26), arr.length - 1)];
}

const HAFTA_TEMALARI: Record<number, string> = {
  1: "Göle İlk Adım",
  4: "İlk Deneme Heyecanı",
  8: "Tempo Yükseliyor",
  12: "Yarıyıl Kampı",
  14: "Yolun Yarısı",
  18: "Bahar Sprinti",
  22: "Son Viraj",
  26: "Genel Tekrar Başlıyor",
  27: "LGS Kampı",
  28: "Final Provası",
};

function haftaUret(): Hafta[] {
  const haftalar: Hafta[] = [];
  const anaDersler = DERSLER.map((d) => d.id) as DersId[];

  for (let w = 1; w <= 28; w++) {
    const gorevler: Gorev[] = [];

    if (w <= 26) {
      anaDersler.forEach((ders, i) => {
        gorevler.push({
          id: `w${w}-konu-${i}`,
          ders,
          tip: "konu",
          baslik: `${konuSec(ders, w)} · Konu Anlatımı`,
          soru: 0,
          dakika: 35,
        });
      });
      for (let i = 0; i < 3; i++) {
        const ders = anaDersler[(w + i) % 5];
        gorevler.push({
          id: `w${w}-test-${i}`,
          ders,
          tip: "test",
          baslik: `${konuSec(ders, w)} · Konu Testi`,
          soru: 20,
          dakika: 25,
        });
      }
      gorevler.push({
        id: `w${w}-not`,
        ders: "genel",
        tip: "icerik",
        baslik: `${w}. Hafta Ders Notları ve Kazanım Özeti (PDF)`,
        soru: 0,
        dakika: 15,
      });
      if (w % 4 === 0) {
        const n = w / 4;
        gorevler.push({
          id: `w${w}-deneme`,
          ders: "genel",
          tip: "deneme",
          baslik: `LGS Genel Deneme ${n}`,
          soru: 90,
          dakika: 120,
        });
        const ders = anaDersler[(n - 1) % 5];
        gorevler.push({
          id: `w${w}-cikmis`,
          ders,
          tip: "cikmis",
          baslik: `Çıkmış Sorular · ${2019 + n} LGS ${DERS_MAP[ders].kisaAd}`,
          soru: 10,
          dakika: 20,
        });
      }
    } else {
      anaDersler.forEach((ders, i) => {
        gorevler.push({
          id: `w${w}-kamp-${i}`,
          ders,
          tip: "konu",
          baslik: `${DERS_MAP[ders].ad} · Hızlı Tekrar Kampı ${w - 26}`,
          soru: 0,
          dakika: 45,
        });
        gorevler.push({
          id: `w${w}-kamptest-${i}`,
          ders,
          tip: "test",
          baslik: `${DERS_MAP[ders].kisaAd} · Kamp Sorusu Seçkisi`,
          soru: 15,
          dakika: 20,
        });
      });
      gorevler.push({
        id: `w${w}-prova`,
        ders: "genel",
        tip: "deneme",
        baslik: w === 28 ? "LGS Final Provası (Gerçek Sınav Simülasyonu)" : "LGS Provası 1",
        soru: 90,
        dakika: 120,
      });
    }

    haftalar.push({
      no: w,
      tema: HAFTA_TEMALARI[w] ?? `${w}. Hafta`,
      gorevler,
    });
  }
  return haftalar;
}

export const HAFTALAR: Hafta[] = haftaUret();

export const GOREV_MAP: Record<string, Gorev> = Object.fromEntries(
  HAFTALAR.flatMap((h) => h.gorevler).map((g) => [g.id, g])
);

export function haftaDurumu(gorevler: Record<string, boolean>): number {
  for (const hafta of HAFTALAR) {
    const bitti = hafta.gorevler.every((g) => gorevler[g.id]);
    if (!bitti) return hafta.no;
  }
  return 28;
}

export type YayinHedef = "herkes" | "grup" | "ogrenci";
export type YayinDurum = "planli" | "canli" | "bitti";

export type CanliDers = {
  id: string;
  ders: DersId;
  baslik: string;
  hocaId: string;
  gun: number;
  saat: string;
  sure: number;
  tur: "ders" | "soru";
  // canlı yayın alanları (eski seed kayıtlarında yok → varsayılan herkese açık/planlı)
  hedef?: YayinHedef;
  grupId?: string | null;
  ogrenciId?: string | null;
  durum?: YayinDurum;
  odaKodu?: string | null;
  kayitUrl?: string | null;
};

export const CANLI_DERSLER: CanliDers[] = [
  { id: "cd-mat", ders: "mat", baslik: "Canlı Matematik Dersi", hocaId: "elif-kaya", gun: 0, saat: "19:00", sure: 60, tur: "ders" },
  { id: "cd-fen", ders: "fen", baslik: "Canlı Fen Bilimleri Dersi", hocaId: "burak-demir", gun: 1, saat: "19:00", sure: 60, tur: "ders" },
  { id: "cd-tur", ders: "tur", baslik: "Canlı Türkçe Dersi", hocaId: "zeynep-arslan", gun: 2, saat: "19:00", sure: 60, tur: "ders" },
  { id: "cd-ink", ders: "ink", baslik: "Canlı İnkılap Tarihi Dersi", hocaId: "mehmet-yildiz", gun: 3, saat: "19:00", sure: 60, tur: "ders" },
  { id: "cd-ing", ders: "ing", baslik: "Canlı İngilizce Dersi", hocaId: "selin-acar", gun: 4, saat: "19:00", sure: 60, tur: "ders" },
];

export const SORU_OTURUMLARI: CanliDers[] = [
  { id: "sc-mat", ders: "mat", baslik: "Canlı Soru Çözümü · Matematik", hocaId: "elif-kaya", gun: 1, saat: "20:30", sure: 45, tur: "soru" },
  { id: "sc-fen", ders: "fen", baslik: "Canlı Soru Çözümü · Fen Bilimleri", hocaId: "burak-demir", gun: 3, saat: "20:30", sure: 45, tur: "soru" },
  { id: "sc-maraton", ders: "genel", baslik: "Hafta Sonu Soru Maratonu (Tüm Dersler)", hocaId: "zeynep-arslan", gun: 5, saat: "14:00", sure: 90, tur: "soru" },
  { id: "sc-analiz", ders: "genel", baslik: "Deneme Analizi ve Strateji Saati", hocaId: "mehmet-yildiz", gun: 6, saat: "20:00", sure: 60, tur: "soru" },
];

export const GUNLER = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export type Tekrar = {
  id: string;
  tur: "ders" | "soru";
  ders: DersId;
  baslik: string;
  hocaId: string;
  sure: string;
  tarih: string;
  hafta: number;
  /** Canlı yayından otomatik kaydedilen video (Storage URL'i); yoksa tanıtım videosu oynar */
  videoUrl?: string | null;
};

function tekrarUret(): Tekrar[] {
  const liste: Tekrar[] = [];
  const tarihler = ["2 hafta önce", "Geçen hafta", "Bu hafta"];
  for (let w = 1; w <= 3; w++) {
    DERSLER.forEach((d) => {
      const hoca = HOCALAR.find((h) => h.ders === d.id)!;
      liste.push({
        id: `dt-${w}-${d.id}`,
        tur: "ders",
        ders: d.id,
        baslik: `${konuSec(d.id, w)} · ${w}. Hafta Canlı Dersi`,
        hocaId: hoca.id,
        sure: `${52 + ((w * 7 + d.id.length) % 12)} dk`,
        tarih: tarihler[w - 1],
        hafta: w,
      });
    });
  }
  const soruDersleri: DersId[] = ["mat", "fen", "tur", "mat", "ink", "ing"];
  soruDersleri.forEach((ders, i) => {
    const hoca = HOCALAR.find((h) => h.ders === ders)!;
    liste.push({
      id: `st-${i + 1}`,
      tur: "soru",
      ders,
      baslik: `Canlı Soru Çözümü #${i + 1} · ${DERS_MAP[ders].ad}`,
      hocaId: hoca.id,
      sure: `${40 + ((i * 9) % 15)} dk`,
      tarih: i < 2 ? "2 hafta önce" : i < 4 ? "Geçen hafta" : "Bu hafta",
      hafta: Math.min(3, Math.floor(i / 2) + 1),
    });
  });
  return liste;
}

export const TEKRARLAR: Tekrar[] = tekrarUret();

export type SiralamaOgrenci = {
  ad: string;
  avatarRenk: string;
  asama: number;
  puanGun: number;
  puanHafta: number;
  puanAy: number;
  seri: number;
  rozet: string;
};

export const SIRALAMA: SiralamaOgrenci[] = [
  { ad: "Defne K.", asama: 3, avatarRenk: "gol", puanGun: 86, puanHafta: 540, puanAy: 2140, seri: 12, rozet: "Soru Canavarı" },
  { ad: "Atlas Y.", asama: 2, avatarRenk: "amber", puanGun: 92, puanHafta: 495, puanAy: 2310, seri: 9, rozet: "Erken Kuş" },
  { ad: "Zümra A.", asama: 4, avatarRenk: "cimen", puanGun: 71, puanHafta: 512, puanAy: 1980, seri: 15, rozet: "Seri Yüzücü" },
  { ad: "Kerem B.", asama: 3, avatarRenk: "gunbatimi", puanGun: 64, puanHafta: 470, puanAy: 2050, seri: 7, rozet: "Deneme Kurdu" },
  { ad: "Elif S.", asama: 2, avatarRenk: "amber", puanGun: 58, puanHafta: 445, puanAy: 1720, seri: 11, rozet: "Paragraf Uzmanı" },
  { ad: "Miraç T.", asama: 3, avatarRenk: "gol", puanGun: 77, puanHafta: 430, puanAy: 1890, seri: 5, rozet: "Gece Kuşu" },
  { ad: "Ecrin M.", asama: 2, avatarRenk: "cimen", puanGun: 49, puanHafta: 410, puanAy: 1650, seri: 8, rozet: "Fen Aşığı" },
  { ad: "Yiğit D.", asama: 2, avatarRenk: "gunbatimi", puanGun: 55, puanHafta: 385, puanAy: 1540, seri: 4, rozet: "Tarih Bilgesi" },
  { ad: "Nehir Ç.", asama: 1, avatarRenk: "gol", puanGun: 42, puanHafta: 350, puanAy: 1480, seri: 6, rozet: "Kelime Avcısı" },
  { ad: "Emir H.", asama: 1, avatarRenk: "amber", puanGun: 38, puanHafta: 320, puanAy: 1390, seri: 3, rozet: "Yeni Palaz" },
];

export const ODULLER = {
  gun: "Günün Ördeği rozeti + forumda 24 saat özel çerçeve",
  hafta: "Haftanın Ördeği kupası + hocayla birebir 30 dk soru saati",
  ay: "Ayın Ördeği madalyası + sürpriz kitap seti",
};

export type ForumKategori = {
  id: string;
  ad: string;
  ikon: IkonAd;
  aciklama: string;
  renk: string;
};

export const FORUM_KATEGORILER: ForumKategori[] = [
  { id: "genel", ad: "Genel Sohbet", ikon: "vak", aciklama: "Göl kenarında serbest muhabbet: gündem, okul, hayat...", renk: "#4E7DE0" },
  { id: "oyun", ad: "Oyun Sohbeti", ikon: "oyun", aciklama: "Oyunlar, taktikler, turnuvalar. Mola sırasında buradayız!", renk: "#8B5CF6" },
  { id: "spor", ad: "Spor Sohbeti", ikon: "spor", aciklama: "Maç yorumları, favori takımlar, spor yapan ördekler.", renk: "#3FA47A" },
  { id: "ders", ad: "Ders & Soru Yardımlaşma", ikon: "kitap", aciklama: "Takıldığın soruyu paylaş, göl halkı yardıma gelsin.", renk: "#E2574C" },
  { id: "motivasyon", ad: "Motivasyon Köşesi", ikon: "alev", aciklama: "Hedefler, başarı hikâyeleri, moral bozukluğuna vak diyen yer.", renk: "#F2A83B" },
];

export type ForumMesaj = {
  id: string;
  yazar: string;
  avatarRenk: string;
  asama?: number;
  metin: string;
  tarih: string;
};

export type ForumBaslik = {
  id: string;
  kategori: string;
  baslik: string;
  yazar: string;
  avatarRenk: string;
  asama?: number;
  tarih: string;
  mesajlar: ForumMesaj[];
};

export const FORUM_SEED: ForumBaslik[] = [
  {
    id: "f1",
    kategori: "genel",
    baslik: "Günaydın gölüm! Bugün kaç soru hedefliyorsunuz?",
    yazar: "Defne K.",
    avatarRenk: "gol",
    tarih: "Bugün 08:12",
    mesajlar: [
      { id: "f1m1", yazar: "Defne K.", avatarRenk: "gol", metin: "Ben bugün 60 soru + akşam canlı derse katılacağım. Hadi bakalım, vak vak!", tarih: "Bugün 08:12" },
      { id: "f1m2", yazar: "Atlas Y.", avatarRenk: "amber", metin: "80 diyorum ama matematikten sonra güncellerim", tarih: "Bugün 08:30" },
      { id: "f1m3", yazar: "Zümra A.", avatarRenk: "cimen", metin: "50 soru + paragraf kampı. Akşam görüşürüz!", tarih: "Bugün 09:05" },
    ],
  },
  {
    id: "f2",
    kategori: "ders",
    baslik: "Üslü ifadelerde negatif üs kafamı karıştırıyor, yardım!",
    yazar: "Emir H.",
    avatarRenk: "amber",
    tarih: "Dün 17:40",
    mesajlar: [
      { id: "f2m1", yazar: "Emir H.", avatarRenk: "amber", metin: "2^-3 neden 1/8 oluyor? Mantığını oturtamadım bir türlü.", tarih: "Dün 17:40" },
      { id: "f2m2", yazar: "Defne K.", avatarRenk: "gol", metin: "Üs 1 azaldıkça sonucu 2'ye bölüyorsun: 2^1=2, 2^0=1, 2^-1=1/2... Böyle düşününce oturuyor!", tarih: "Dün 18:02" },
      { id: "f2m3", yazar: "Emir H.", avatarRenk: "amber", metin: "Ohaa şimdi anladım, sağ ol! Elif Hoca'nın 2. hafta videosunu da tekrar izleyeceğim.", tarih: "Dün 18:15" },
    ],
  },
  {
    id: "f3",
    kategori: "oyun",
    baslik: "Mola arası: en sevdiğiniz mobil oyun?",
    yazar: "Miraç T.",
    avatarRenk: "gol",
    tarih: "2 gün önce",
    mesajlar: [
      { id: "f3m1", yazar: "Miraç T.", avatarRenk: "gol", metin: "25 dakika ders + 5 dakika oyun kuralımı bozmuyorum. Öneri alayım", tarih: "2 gün önce" },
      { id: "f3m2", yazar: "Kerem B.", avatarRenk: "gunbatimi", metin: "Satranç! Hem mola hem beyin ısınması. Taş taşı, vak vak.", tarih: "2 gün önce" },
    ],
  },
  {
    id: "f4",
    kategori: "spor",
    baslik: "Hafta sonu maçları + ders programı nasıl dengeliyorsunuz?",
    yazar: "Yiğit D.",
    avatarRenk: "gunbatimi",
    tarih: "3 gün önce",
    mesajlar: [
      { id: "f4m1", yazar: "Yiğit D.", avatarRenk: "gunbatimi", metin: "Cumartesi sabah antrenman, öğlen soru maratonu. Yorucu ama değiyor", tarih: "3 gün önce" },
      { id: "f4m2", yazar: "Ecrin M.", avatarRenk: "cimen", metin: "Voleybol sonrası ders çalışmak daha iyi geliyor bana, kafa dağılıyor.", tarih: "3 gün önce" },
    ],
  },
  {
    id: "f5",
    kategori: "motivasyon",
    baslik: "İlk denememde netlerim düşük çıktı, moralim bozuk...",
    yazar: "Nehir Ç.",
    avatarRenk: "gol",
    tarih: "4 gün önce",
    mesajlar: [
      { id: "f5m1", yazar: "Nehir Ç.", avatarRenk: "gol", metin: "Matematikte 7 net yaptım sadece. Herkes çok iyi gibi, ben mi geriyim?", tarih: "4 gün önce" },
      { id: "f5m2", yazar: "Zümra A.", avatarRenk: "cimen", metin: "İlk denemem 5 netti, son denemem 14! İlk deneme sadece başlangıç çizgisi, yarışın kendisi değil. Yavru ördekten koca ördeğe!", tarih: "4 gün önce" },
      { id: "f5m3", yazar: "Atlas Y.", avatarRenk: "amber", metin: "Deneme Analizi oturumuna katıl, Mehmet Hoca yanlışlarını tek tek nasıl kapatacağını gösteriyor.", tarih: "4 gün önce" },
    ],
  },
];

export const VAK_SEVIYELER: { min: number; ad: string; ikon: IkonAd }[] = [
  { min: 0, ad: "Yavru Ördek", ikon: "yumurta" },
  { min: 200, ad: "Palaz", ikon: "civciv" },
  { min: 500, ad: "Çalışkan Ördek", ikon: "vak" },
  { min: 900, ad: "Bilge Ördek", ikon: "hoca" },
  { min: 1400, ad: "Gölün Efsanesi", ikon: "tac" },
];

export const GUNUN_SOZLERI = [
  "Küçük adımlar, büyük göller aşırır. Bugün bir görev bile kazançtır.",
  "Ördekler suyun üstünde sakin görünür ama altta hep çalışır. Sen de öylesin!",
  "Yanlış çözdüğün her soru, sınavda doğru çözeceğin bir sorudur.",
  "Vak vak! Bugün dünden bir soru fazlası bile ilerlemektir.",
  "Göle bakma, yüzmeyi öğren; LGS'ye bakma, konuyu öğren.",
  "Şampiyon ördekler, kötü günlerinde de gölden çıkmayanlardır.",
];

export const SSS = [
  {
    soru: "Ücretsiz ön görüşmede neler oluyor?",
    cevap:
      "30 dakikalık online görüşmede öğrencimizi tanıyoruz, hedeflerini dinliyoruz ve mevcut seviyesine göre 9 aylık yol haritasını anlatıyoruz. Hiçbir ödeme bilgisi istenmez; tamamen tanışma amaçlıdır.",
  },
  {
    soru: "Canlı dersler kaç kişilik gruplarla yapılıyor?",
    cevap:
      "Her ders en fazla 12 öğrenciyle işlenir. Böylece hocalarımız her öğrencinin kamerasını, sorusunu ve gelişimini birebir takip edebilir.",
  },
  {
    soru: "Derse katılamazsam ne olur?",
    cevap:
      "Hiç dert değil! Tüm canlı dersler ve soru çözümü oturumları kaydedilir, 'Ders Tekrarlarım' bölümünden dilediğin zaman izleyebilirsin.",
  },
  {
    soru: "Haftalık plan kilidi nasıl çalışıyor?",
    cevap:
      "28 haftalık programda her hafta; konu anlatımları, testler ve denemelerden oluşur. Bir haftanın tüm görevleri tamamlanmadan sonraki hafta açılmaz. Böylece konu atlanmaz, eksik kalmaz.",
  },
  {
    soru: "Veliler süreci nasıl takip ediyor?",
    cevap:
      "Her ay düzenli veli bilgilendirme görüşmesi yapılır; ayrıca öğrenci panelindeki ilerleme raporu (çözülen soru, katılım, deneme netleri) veliyle paylaşılır.",
  },
];

export const AVATAR_RENKLER: Record<string, { ad: string; hex: string }> = {
  amber: { ad: "Amber Göl", hex: "#F2A83B" },
  gol: { ad: "Mavi Göl", hex: "#3B9EC4" },
  cimen: { ad: "Çimen Yeşili", hex: "#6FBF73" },
  gunbatimi: { ad: "Gün Batımı", hex: "#EF8354" },
};

export type EvrimAsamasi = {
  no: number;
  ad: string;
  minHafta: number;
  aciklama: string;
  kutlama: string;
};

// Yumurtadan Ördeğe: aşamalar tamamlanan hafta sayısına kilitli
export const EVRIM_ASAMALARI: EvrimAsamasi[] = [
  { no: 0, ad: "Yumurta", minHafta: 0, aciklama: "Göle yeni bir yumurta bırakıldı. Görevler yumurtayı ısıtıyor!", kutlama: "Göle hoş geldin! Yumurtan sıcacık bir yuvada; ilk haftanı bitirince çatlamaya başlayacak. Vak!" },
  { no: 1, ad: "Çatlayan Yumurta", minHafta: 1, aciklama: "İlk hafta bitti, kabukta ilk çatlak! İçeriden vak sesleri geliyor.", kutlama: "ÇAT! İlk haftanı bitirdin ve kabuğun çatladı! Böyle giderse yakında gölü göreceksin. Vak vak!" },
  { no: 2, ad: "Civciv", minHafta: 3, aciklama: "Yumurtadan çıktın! Gölün en yeni ve en sevimli üyesisin.", kutlama: "VAAAK! YUMURTADAN ÇIKTIN! 3 haftayı devirdin ve artık resmen gölün bir üyesisin. Tüylerin kurusun, yüzmeye devam!" },
  { no: 3, ad: "Palaz", minHafta: 8, aciklama: "Tüylerin çıktı, kanatların güçleniyor. Tempo sende!", kutlama: "8 hafta! Artık civciv değil koca bir palazsın; tüylerin parlıyor. Gölün yarısı seni konuşuyor, vak!" },
  { no: 4, ad: "Genç Ördek", minHafta: 14, aciklama: "Yolun yarısı geçildi; yüzmeyi çoktan söktün.", kutlama: "YOLUN YARISI BİTTİ! 14 haftadır kulaç atıyorsun ve artık genç bir ördeksin. LGS gölü ufukta göründü!" },
  { no: 5, ad: "Usta Ördek", minHafta: 22, aciklama: "Son viraj! Gözlüğünü taktın, işi ciddiye aldın.", kutlama: "22 hafta... Sen artık bu işin ustasısın, gözlük sana çok yakıştı! Son viraja tüm gücünle gir, vak vak!" },
  { no: 6, ad: "Mezun Ördek", minHafta: 28, aciklama: "28 hafta tamam: kep senin! Logodaki ördek artık sensin.", kutlama: "VAAAAK! 28 HAFTANIN TAMAMINI BİTİRDİN! Kep artık senin başında; logodaki ördek bugün sensin. LGS'de göl seninle!" },
];

export function tamamlananHaftaSayisi(gorevler: Record<string, boolean>): number {
  return HAFTALAR.filter((h) => h.gorevler.every((g) => gorevler[g.id])).length;
}

export function asamaBul(tamamlananHafta: number): EvrimAsamasi {
  let sonuc = EVRIM_ASAMALARI[0];
  for (const a of EVRIM_ASAMALARI) {
    if (tamamlananHafta >= a.minHafta) sonuc = a;
  }
  return sonuc;
}

export function sonrakiAsama(tamamlananHafta: number): EvrimAsamasi | null {
  return EVRIM_ASAMALARI.find((a) => a.minHafta > tamamlananHafta) ?? null;
}
