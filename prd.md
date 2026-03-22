# Big Sister AI — PRD (Product Requirement Document)

## Proje Özeti
Big Sister AI, kullanıcıların kendilerine özel bir "abla" profili oluşturarak
yapay zeka destekli, kişiselleştirilmiş sohbet deneyimi yaşadığı bir web
uygulamasıdır. Türkçe ağırlıklı, kültüre uygun, sıcak ve samimi bir ton
hedeflenmektedir.

## Hedef Kullanıcılar
- **Çocuklar ve gençler (10-18 yaş):** Duygusal destek, akademik yardım,
  hobi sohbeti arayan, ebeveynleriyle yeterince vakit geçiremeyen bireyler
- **Ebeveynler:** Çocukları için güvenli bir AI abla profili kurmak isteyen aileler
- **Yetişkinler (18+):** Kariyer tavsiyesi veya duygusal destek arayan bireyler

## Temel Özellikler

### 1. Abla Profili Oluşturma
- Ablanın yaş farkı seçimi (1-10 yıl büyük)
- Uzmanlık alanı seçimi: Akademik / Spor / Müzik / Sanat / İş Hayatı
- Abla ismi belirleme
- Kullanıcı adı ve yaş girişi

### 2. Sohbet Modları
- **Duygusal Mod:** Dinler, empati kurar, yargılamaz
- **Akademik Mod:** Ders, sınav, ödev konularında rehberlik eder
- **Hobi Modu:** Film, müzik, kitap, spor hakkında sohbet eder
- **Kariyer Modu:** İş hayatında tavsiye verir (18+ kullanıcılar için)

### 3. Sohbet Arayüzü
- Gerçek zamanlı mesajlaşma arayüzü
- Mod değiştirme butonu
- Sohbet geçmişi (oturum bazlı)
- Abla profil bilgisi görünür şekilde üstte

### 4. Güvenlik Katmanı
- Kriz kelimesi tespiti (intihar, zarar verme vb.)
- Kriz durumunda kullanıcıyı bir yetişkine yönlendirme mesajı
- 10-18 yaş kullanıcılar için içerik filtresi

## Ekranlar
1. **Karşılama Ekranı:** Uygulama tanıtımı, "Başla" butonu
2. **Profil Oluşturma Ekranı:** Abla ve kullanıcı bilgileri formu
3. **Sohbet Ekranı:** Mod seçimi + mesajlaşma arayüzü

## Teknik Gereksinimler
- Frontend: React + Vite
- Stil: Tailwind CSS
- AI: Claude API (Anthropic)
- Deploy: Netlify
- Dil: Türkçe ağırlıklı

## Başarı Kriterleri
- Kullanıcı 2 dakika içinde profil oluşturup sohbet başlatabilir
- Abla robotik hissettirmez, gerçek bir abla gibi konuşur
- Uygulama mobil ve masaüstünde sorunsuz çalışır
- Kriz durumlarında güvenli yönlendirme yapılır

## Kapsam Dışı (Bu Sürümde Yok)
- Kullanıcı hesabı / giriş sistemi
- Sohbet geçmişinin kaydedilmesi
- Ebeveyn paneli
- Bildirim sistemi
