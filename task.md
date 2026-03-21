# Big Sister AI - Adim Adim Gelistirme Gorevleri

## 1) Proje Kurulumu ve Temel Altyapi
- [ ] React + Tailwind CSS tabanli frontend projesini olustur.
- [ ] Ortam degiskenleri yapisini kur (`.env.example` hazirla, API anahtari degiskenlerini tanimla).
- [ ] Temel klasor yapisini olustur (`components`, `pages`, `services`, `hooks`, `types`).
- [ ] Mobil uyumlu temel layout ve routing altyapisini kur.
- [ ] Netlify/Lovable yayinlama icin ilk deploy pipeline'ini hazirla.

## 2) Kimlik ve Rol Akisi (Cocuk / Ebeveyn)
- [ ] Giris ekranini tasarla (rol secimi: Cocuk/Gencler, Ebeveyn).
- [ ] Basit oturum yonetimi (local state veya secure storage tabanli) ekle.
- [ ] Rol bazli yonlendirme kur (cocuk sohbet ekrani, ebeveyn dashboard ekrani).
- [ ] Yetki kontrolu middleware/guard mantigini ekle.

## 3) Abla Profili Olusturma
- [ ] "Abla Profili" olusturma adimini ekle (yas tipi, uzmanlik, karakter tonu).
- [ ] Profil secimlerini kalici olarak sakla (local db/backend secimine gore).
- [ ] Secimlere gore AI persona prompt yapisini olustur.
- [ ] Profil duzenleme ekrani ekle.

## 4) Mod Tabanli Sohbet Deneyimi
- [ ] Ana ekranda mod secimi arayuzu olustur (Akademik, Duygusal, Hobi).
- [ ] Her mod icin ayri sistem promptu ve davranis kurallari tanimla.
- [ ] Gemini 1.5 API entegrasyonunu yap (`chat` servisi olustur).
- [ ] Mesajlasma UI'ini tamamla (gonder, yukleniyor durumu, hata yonetimi).
- [ ] Konusma gecmisini oturum bazli sakla.

## 5) Pedagojik Guvenlik ve Etik Katman
- [ ] AI sistem mesajlarina guvenli, destekleyici ve yargisiz iletisim kurallari ekle.
- [ ] Yas grubu (10-18) icin uygun dil ve icerik filtreleri ekle.
- [ ] Riskli anahtar kelime/senaryo algilama ve guvenli yanit fallback mekanizmasi ekle.
- [ ] Uygunsuz veya zarar verici yonlendirmeleri engelleyen guardrail testleri yaz.

## 6) Ebeveyn Dashboard (Ozet ve Analiz)
- [ ] Haftalik duygu durumu ozeti cikaran analiz servisi olustur.
- [ ] Ilgi alani trendlerini (akademik/sanat/spor vb.) gosteren paneli tasarla.
- [ ] "Ozel konusma detaylarini gosterme" kurali icin veri filtreleme katmani ekle.
- [ ] Dashboard ekranina tarih araligi ve ozet kartlari ekle.

## 7) Veri Gizliligi ve Guvenlik
- [ ] Cocuk sohbetlerini ebeveyn gorunumunden ayiran veri modelini netlestir.
- [ ] Hassas veriler icin sifreleme/maskeleme stratejisi uygula.
- [ ] KVKK/GDPR uyumlu temel gizlilik metinlerini ve acik riza ekranlarini ekle.
- [ ] Loglama politikasinda PII (kisisel veri) redaksiyonu uygula.

## 8) Kalite, Test ve Izleme
- [ ] Kritik akislara unit test yaz (profil olusturma, mod secimi, chat servisi).
- [ ] En az 3 uc-uca (E2E) senaryo test et:
- [ ] Cocuk girisi -> profil -> duygusal mod sohbeti
- [ ] Akademik modda odev yardimi akisi
- [ ] Ebeveyn dashboard haftalik ozet goruntuleme
- [ ] Hata izleme (Sentry vb.) ve temel analytics olaylarini ekle.
- [ ] Performans hedefleri belirle (ilk acilis suresi, yanit gecikmesi) ve olc.

## 9) MVP Yayini
- [ ] MVP kapsamini kilitle (olmazsa olmaz ozellikler listesi).
- [ ] Son UI/UX duzeltmelerini yap ve responsive kontrolleri tamamla.
- [ ] Production ortam degiskenlerini tanimla ve canliya al.
- [ ] Pilot kullanicilarla (ebeveyn + cocuk) geri bildirim turu yap.

## 10) MVP Sonrasi Iyilestirme Backlog'u
- [ ] Bildirim sistemi (gunluk check-in, ders hatirlatici) planla.
- [ ] Daha gelismis duygu analizi ve uzun donem trend takibi ekle.
- [ ] Coklu dil destegi (TR/EN) ekle.
- [ ] Oyunlastirma (rozet, hedef takibi) ozelligini degerlendir.
