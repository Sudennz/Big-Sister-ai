# Big Sister AI - User Flow


## 1) Cocuk/Genç Kullanici Akisi (Ana Akis)
1. Kullanici uygulamayi acar.
2. Giris ekraninda rolunu secer: **Cocuk/Genç**.
3. Ilk kullanimsa "Abla Profili" adimina gecer:
   - Yas tipi secimi (yakin yas / mentor yas)
   - Uzmanlik secimi (akademik / sanat / spor)
   - Karakter tonu secimi (sakin / motive edici / neseli)
4. Ana ekranda sohbet modu secer:
   - Akademik Mod
   - Duygusal Mod
   - Hobi Modu
5. Chat ekraninda mesajlasma baslar.
6. Sistem, secilen mod + profil bilgisine gore Gemini'den yanit alir.
7. Konusma oturum bazli kaydedilir.
8. Kullanici cikis yapar veya uygulamayi kapatir.

## 2) Ebeveyn Akisi
1. Ebeveyn uygulamayi acar.
2. Giris ekraninda rolunu secer: **Ebeveyn**.
3. Dashboard ekranina yonlendirilir.
4. Haftalik ozet kartlarini gorur:
   - Genel duygu durumu egilimi
   - Genel ilgi alanlari egilimi
5. Cocukla yapilan ozel mesaj detaylari gosterilmez.
6. Ebeveyn, sadece genel gelisim ozetlerini takip eder.

## 3) Ilk Kurulum Akisi (Onboarding)
1. Uygulama ilk kez acilir.
2. Kisa tanitim ekrani gosterilir (amac: guvenli dijital abla deneyimi).
3. Rol secimi yapilir.
4. Cocuk rolu secildiyse profil olusturma zorunlu adimdir.
5. Ebeveyn rolu secildiyse dogrudan dashboarda gidilir.

## 4) Hata ve Guvenli Yanit Akisi
1. Kullanici mesaj gonderir.
2. Mesaj guvenlik filtresinden gecer (yas uygunlugu, riskli icerik kontrolu).
3. Risk yoksa normal Gemini yaniti doner.
4. Risk varsa sistem guvenli fallback yaniti uretir:
   - Yargisiz ve destekleyici ton
   - Gerekirse yardim alma onerisi
5. API hatasi olursa kullaniciya sade hata mesaji gosterilir ve tekrar deneme secenegi sunulur.

## 5) MVP Ekran Sirasi (Basit Navigasyon)
1. Giris / Rol Secimi
2. (Cocuk) Abla Profili Olusturma
3. Mod Secim Ekrani
4. Chat Ekrani
5. (Ebeveyn) Dashboard

