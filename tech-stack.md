# Big Sister AI - Basit Tech Stack (Baslangic Seviyesi)


## 1) Neden Bu Kadar Basit?
- Hedef: Once calisan bir MVP cikarmak.
- Az teknoloji = daha az hata, daha hizli ogrenme.
- Tek frontend + tek API entegrasyonu ile ilerlemek daha kolaydir.

## 2) Onerilen Teknoloji Yigini

### Frontend
- **React (Vite ile)**  
  Hızlı kurulum, basit klasor yapisi, yeni baslayanlar icin uygun.
- **Tailwind CSS**  
  UI gelistirmeyi hizlandirir, ek CSS dosyasi karmaşasini azaltir.

### AI Entegrasyonu
- **Gemini API (Google AI Studio)**  
  Tek bir `chatService` dosyasi ile sohbet cevaplarini almak yeterli.

### Deploy
- **Netlify**  
  React projelerini kolayca yayinlamak icin en pratik seceneklerden biri.

## 3) Simdilik Onermedigim Seyler (MVP Icin)
- Backend framework (Node/Express, Nest, vb.) -> ilk asamada zorunlu degil.
- Veritabani (PostgreSQL/MongoDB/Firebase) -> ilk asamada local storage yeterli olabilir.
- Karmaşık state management (Redux, Zustand) -> once React state/useContext ile basla.

## 4) Basit Proje Mimarisi
- `src/pages` -> Sayfalar (`Login`, `ProfileSetup`, `Chat`, `ParentDashboard`)
- `src/components` -> UI parcaciklari
- `src/services/geminiService.js` -> Gemini API cagrisi
- `src/hooks` -> Tekrar eden React mantiklari
- `src/types` -> (Istersen) temel tip tanimlari

## 5) Ornek Gelistirme Sirasi
1. React + Tailwind kur.
2. Login/rol secim ekrani yap.
3. Cocuk icin profil olusturma adimi yap.
4. Mod secim ekrani ekle (Akademik/Duygusal/Hobi).
5. Gemini API ile chat ekranini calistir.
6. Ebeveyn icin sade dashboard ekle.
7. Netlify'a deploy et.

## 6) Basit Gemini API Kullanim Notu
- API anahtarini `.env` dosyasinda tut (`VITE_GEMINI_API_KEY=...`).
- Frontend'de tek bir servis fonksiyonu yaz:
  - Girdi: kullanici mesaji + secili mod + profil
  - Cikti: AI yaniti
- Her mod icin farkli sistem promptu kullan:
  - Akademik: motive edici, aciklayici
  - Duygusal: empatik, yargisiz
  - Hobi: yaratici, guncel

## 7) Baslangic Icin Minimal Paketler
- `react`
- `react-dom`
- `react-router-dom`
- `tailwindcss`

