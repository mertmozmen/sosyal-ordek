export type YasalBelge = {
  slug: string;
  baslik: string;
  ozet: string;
  guncelleme: string;
  icerik: string;
};

const SIRKET = `Sosyal Ördek Eğitim Hizmetleri ("Sosyal Ördek")`;

export const YASAL_BELGELER: YasalBelge[] = [
  {
    slug: "kvkk-aydinlatma",
    baslik: "KVKK Aydınlatma Metni",
    ozet: "Kişisel verilerinizin hangi amaçlarla ve nasıl işlendiğine dair bilgilendirme.",
    guncelleme: "14 Ağustos 2026",
    icerik: `## 1. Veri Sorumlusu

6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz; veri sorumlusu sıfatıyla ${SIRKET} tarafından aşağıda açıklanan kapsamda işlenmektedir.

**Adres:** [Şirket adresi eklenecek]
**E-posta:** kvkk@sosyalordek.com
**Ticaret Sicil / MERSİS:** [Eklenecek]

## 2. İşlenen Kişisel Veriler

- **Kimlik bilgileri:** Öğrencinin ve velinin adı, soyadı, öğrencinin sınıf düzeyi
- **İletişim bilgileri:** E-posta adresi, veli telefon numarası
- **Eğitim verileri:** Ders ilerlemesi, çözülen soru sayıları, deneme sonuçları, canlı ders katılım kayıtları, platformda geçirilen süre
- **Görsel ve işitsel veriler:** Canlı derslerde kamera/mikrofon açıksa ders kayıtlarında yer alan görüntü ve ses
- **İşlem güvenliği verileri:** IP adresi, oturum bilgileri, log kayıtları

## 3. İşleme Amaçları

Kişisel verileriniz;

- Eğitim hizmetinin sunulması, canlı derslerin ve ders tekrarlarının sağlanması
- Öğrencinin akademik gelişiminin takibi ve veliyle paylaşılması
- Ücretsiz ön görüşme taleplerinin karşılanması
- Sözleşmesel ve yasal yükümlülüklerin yerine getirilmesi
- Platform güvenliğinin sağlanması ve hizmet kalitesinin artırılması

amaçlarıyla işlenmektedir.

## 4. İşlemenin Hukuki Sebepleri

Verileriniz; KVKK m.5/2 uyarınca "bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması", "veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" ve "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati" hukuki sebeplerine; bu kapsama girmeyen hâllerde (ör. ders kayıtlarında görüntünün yer alması) açık rızanıza dayanılarak işlenir.

## 5. Verilerin Aktarılması

Kişisel verileriniz; yalnızca hizmetin gerektirdiği ölçüde, veri işleyen sıfatıyla hizmet aldığımız barındırma (hosting), canlı ders altyapısı ve e-posta hizmeti sağlayıcılarına ve hukuken yetkili kamu kurumlarına aktarılabilir. Verileriniz hiçbir koşulda üçüncü kişilere pazarlama amacıyla satılmaz veya kiralanmaz.

## 6. Saklama Süresi

Verileriniz, üyelik ilişkisi süresince ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.

## 7. Haklarınız (KVKK m.11)

- Kişisel verilerinizin işlenip işlenmediğini öğrenme
- İşlenmişse buna ilişkin bilgi talep etme
- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
- Eksik veya yanlış işlenmişse düzeltilmesini isteme
- KVKK m.7 kapsamında silinmesini/yok edilmesini isteme
- Otomatik sistemlerce analiz sonucu aleyhe bir sonucun ortaya çıkmasına itiraz etme
- Kanuna aykırı işleme sebebiyle zarara uğranması hâlinde zararın giderilmesini talep etme

Başvurularınızı kvkk@sosyalordek.com adresine iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.

> Not: Bu metin bir şablondur; yayına alınmadan önce hukuk danışmanınız tarafından şirket bilgilerinizle güncellenmelidir.`,
  },
  {
    slug: "acik-riza",
    baslik: "Açık Rıza Metni",
    ozet: "Açık rıza gerektiren veri işleme faaliyetlerine ilişkin onay metni.",
    guncelleme: "14 Ağustos 2026",
    icerik: `## Açık Rıza Beyanı

${SIRKET} tarafından sunulan KVKK Aydınlatma Metni'ni okudum ve anladım.

Bu kapsamda;

- Canlı derslere kamera ve/veya mikrofonla katılmam hâlinde görüntü ve ses kaydımın **ders tekrarı amacıyla kaydedilmesine ve yalnızca kayıtlı öğrencilerle platform içinde paylaşılmasına**,
- Başarı sıralamaları (leaderboard) kapsamında **ad ve soyadımın ilk harfi ile puanımın diğer öğrencilere gösterilmesine**,
- Tarafıma ders hatırlatmaları ve platform duyuruları için **e-posta gönderilmesine**,

açık rızam ile onay veriyorum.

## Önemli Bilgilendirme

- Açık rıza vermek zorunlu değildir; rıza verilmeyen başlıklar için alternatif kullanım (ör. kamerasız katılım, sıralamada gizli takma ad) sunulur.
- Açık rızanızı dilediğiniz zaman kvkk@sosyalordek.com adresine e-posta göndererek geri çekebilirsiniz. Geri çekme, geri çekilmeden önceki işlemelerin hukuka uygunluğunu etkilemez.

> Not: Bu metin bir şablondur; yayına alınmadan önce hukuk danışmanınız tarafından güncellenmelidir.`,
  },
  {
    slug: "veli-onay",
    baslik: "Veli Onay ve Muvafakat Metni",
    ozet: "18 yaş altı öğrenciler için veli/vasi onayı.",
    guncelleme: "14 Ağustos 2026",
    icerik: `## Veli / Vasi Muvafakatnamesi

Velisi/vasisi bulunduğum öğrencinin ${SIRKET} tarafından sunulan LGS eğitim platformuna üye olmasına, platformdaki canlı derslere, soru çözümü oturumlarına ve forum alanına katılmasına muvafakat ediyorum.

Bu kapsamda;

- Öğrencime ait kimlik, iletişim ve eğitim verilerinin KVKK Aydınlatma Metni'nde açıklanan amaçlarla işlenmesini,
- Öğrencimin akademik gelişim raporlarının tarafımla paylaşılmasını,
- Eğitim süreciyle ilgili tarafımın telefon/e-posta yoluyla bilgilendirilmesini,

**kabul ediyorum.**

## Bilgilendirme

- Platform, 13-15 yaş grubuna yönelik olduğundan üyelik ancak veli onayı ile tamamlanır.
- Veli, öğrencinin panelindeki ilerleme verilerine erişim talep edebilir.
- Muvafakat, kvkk@sosyalordek.com adresine yazılı bildirimle her zaman geri alınabilir; bu durumda öğrencinin üyeliği dondurulur.

> Not: Bu metin bir şablondur; yayına alınmadan önce hukuk danışmanınız tarafından güncellenmelidir.`,
  },
  {
    slug: "kullanim-kosullari",
    baslik: "Kullanım Koşulları",
    ozet: "Platformun kullanımına ilişkin kurallar ve tarafların yükümlülükleri.",
    guncelleme: "14 Ağustos 2026",
    icerik: `## 1. Taraflar ve Konu

İşbu Kullanım Koşulları; ${SIRKET} ile platforma üye olan öğrenci ve velisi arasında, platformun kullanımına ilişkin şartları düzenler. Üyelik oluşturulması, bu koşulların kabul edildiği anlamına gelir.

## 2. Hizmetin Kapsamı

- 9 aylık (28 haftalık) LGS hazırlık programı: canlı dersler, ders tekrarı kayıtları, canlı soru çözümü oturumları, haftalık çalışma planları, deneme sınavları ve forum alanı.
- Dersler; Matematik, Fen Bilimleri, Türkçe, T.C. İnkılap Tarihi ve Yabancı Dil (İngilizce) branşlarını kapsar.

## 3. Üyelik ve Hesap Güvenliği

- Üyelik bilgilerinin doğru ve güncel olması esastır; 18 yaş altı üyelikler veli onayına tabidir.
- Hesap şifresinin güvenliği kullanıcı sorumluluğundadır; hesap üçüncü kişilerle paylaşılamaz.
- Ders kayıtları ve içerikler yalnızca kayıtlı öğrencinin kişisel kullanımı içindir; kopyalanamaz, indirilip dağıtılamaz, sosyal medyada paylaşılamaz.

## 4. Forum ve Topluluk Kuralları

- Forumda hakaret, zorbalık, ayrımcılık, kişisel bilgi paylaşımı ve reklam yasaktır.
- Moderasyon ekibi kurallara aykırı içerikleri kaldırma ve gerekirse üyeliği askıya alma hakkını saklı tutar.
- Göl kuralı: Kimse kimsenin tüyünü ıslatmaz; saygı esastır. 🦆

## 5. Fikri Mülkiyet

Platformdaki tüm içerikler (video, PDF, soru bankası, tasarım ve "Sosyal Ördek" markası) ${SIRKET}'e aittir; izinsiz kullanılamaz.

## 6. Sorumluluğun Sınırlandırılması

Platform, kesintisiz erişim için makul çabayı gösterir; ancak internet altyapısından kaynaklanan kesintilerden sorumlu tutulamaz. Planlı bakımlar önceden duyurulur, kaçırılan canlı dersler kayıt olarak sunulur.

## 7. Değişiklikler ve Yürürlük

${SIRKET}, koşullarda değişiklik yapabilir; önemli değişiklikler e-posta ve platform içi duyuru ile bildirilir. Koşullar, üyeliğin oluşturulduğu tarihte yürürlüğe girer.

> Not: Bu metin bir şablondur; yayına alınmadan önce hukuk danışmanınız tarafından güncellenmelidir.`,
  },
  {
    slug: "mesafeli-satis",
    baslik: "Mesafeli Satış Sözleşmesi",
    ozet: "Eğitim hizmeti satın alımına ilişkin mesafeli sözleşme şartları.",
    guncelleme: "14 Ağustos 2026",
    icerik: `## 1. Taraflar

**Satıcı:** ${SIRKET} — [Adres, MERSİS, telefon eklenecek]
**Alıcı:** Ödeme adımında bilgileri alınan veli/vasi.

## 2. Sözleşmenin Konusu

İşbu sözleşme; Alıcı'nın elektronik ortamda siparişini verdiği 9 aylık (28 haftalık) LGS hazırlık eğitim hizmetinin sunulmasına ve bedelinin tahsiline ilişkin olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların hak ve yükümlülüklerini düzenler.

## 3. Hizmet Bedeli ve Ödeme

- Hizmet bedeli, sipariş adımında ilan edilen tutardır; tüm vergiler dahildir.
- Ödeme; kredi kartı, banka kartı veya havale/EFT ile tek seferde ya da taksitli olarak yapılabilir.
- Ödeme planı ve fatura bilgileri sipariş onay e-postasında yer alır.

## 4. Hizmetin İfası

- Eğitim, kayıt sonrasında ilan edilen dönem takviminde başlar ve 28 hafta sürer.
- Canlı ders programı dönem başında duyurulur; kaçırılan dersler kayıttan izlenebilir.

## 5. Cayma Hakkı

- Alıcı, sözleşmenin kurulduğu tarihten itibaren **14 gün içinde** herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir.
- Cayma bildirimi info@sosyalordek.com adresine yazılı olarak yapılır; bedel 14 gün içinde iade edilir.
- Cayma süresi içinde hizmetin ifasına Alıcı'nın onayı ile başlanmışsa, yararlanılan süreye karşılık gelen bedel düşülerek iade yapılır.

## 6. Erken Fesih ve İade

14 günlük süre sonrasındaki fesih taleplerinde; tamamlanan eğitim haftalarının bedeli düşülür ve kalan tutar iade edilir. Ayrıntılı iade tablosu kayıt sırasında paylaşılır.

## 7. Uyuşmazlıklar

Uyuşmazlıklarda Alıcı'nın yerleşim yerindeki Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.

> Not: Bu metin bir şablondur; fiyat, taksit ve iade tablosu eklenerek hukuk danışmanınız tarafından tamamlanmalıdır.`,
  },
  {
    slug: "gizlilik-cerez",
    baslik: "Gizlilik ve Çerez Politikası",
    ozet: "Çerezler ve gizlilik uygulamalarımız hakkında bilgilendirme.",
    guncelleme: "14 Ağustos 2026",
    icerik: `## 1. Gizlilik Yaklaşımımız

Sosyal Ördek, öğrencilerin yaş grubunu (13-15) gözeterek "önce gizlilik" ilkesiyle çalışır:

- Öğrenci verileri reklam amacıyla kullanılmaz, üçüncü taraflarla pazarlama amaçlı paylaşılmaz.
- Sıralama tablolarında yalnızca ad ve soyadın ilk harfi görünür.
- Forum alanı moderatörler tarafından denetlenir; kişisel bilgi paylaşımı engellenir.

## 2. Çerez (Cookie) Nedir?

Çerezler, ziyaret ettiğiniz siteler tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Oturumunuzu hatırlamak ve deneyiminizi iyileştirmek için kullanılır.

## 3. Kullandığımız Çerezler

- **Zorunlu çerezler:** Oturum açma ve güvenlik için gereklidir; kapatılamaz.
- **İşlevsel çerezler:** Dil, tema ve ilerleme tercihlerinizi hatırlar.
- **Analitik çerezler:** Platform kullanımını anonim olarak ölçer; yalnızca onay verirseniz çalışır.

Pazarlama/reklam çerezi **kullanmıyoruz**.

## 4. Çerez Tercihleri

Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz; zorunlu çerezlerin engellenmesi hâlinde platforma giriş yapılamayabilir.

## 5. İletişim

Gizlilikle ilgili sorularınız için: kvkk@sosyalordek.com

> Not: Bu metin bir şablondur; kullanılan analitik araçlara göre güncellenmelidir.`,
  },
];

export const YASAL_MAP: Record<string, YasalBelge> = Object.fromEntries(
  YASAL_BELGELER.map((b) => [b.slug, b])
);
