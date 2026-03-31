# Big Sister AI

**Gençler için kişiselleştirilmiş yapay zeka abla deneyimi.**

---

# Problem

Günümüzde çocuklar ve gençler arasında sosyal dışlanma, duygusal yalnızlık ve aile içi iletişim kopukluğu giderek artmaktadır. Ebeveynler çocuk psikolojisini tam olarak anlayamıyor; günümüz trendlerini ve alışkanlıklarını takip edemedikleri için çocuklarıyla aralarında derin bir boşluk oluşuyor. Bu boşluğu doldurmak ve gençlere güvenli bir sohbet alanı sunmak amacıyla Big Sister AI'ı geliştirdim. Yapay zeka destekli abla modeliyle çocuklar ve gençler; duygusal, akademik, sosyal ve kariyer konularında güvenilir bir ablaya danışarak yalnızlıklarını azaltabilir.

# Çözüm

Big Sister AI, kullanıcıya kişiselleştirilmiş bir abla karakteri atayan ve 5 farklı modda Türkçe sohbet eden bir yapay zeka uygulamasıdır. Groq API ile güçlendirilen abla, gerçek bir insan gibi sıcak ve samimi konuşur. Kriz kelimesi algılama sistemi sayesinde kullanıcı her zaman güvende tutulur.

---

# Canlı Demo

- Yayın Linki: https://big-sister-ai.vercel.app
- Demo Video: https://www.loom.com/share/76b3f769a4cb448bae7a75229fe15b7e

---

# Özellikler

- Kişiselleştirilmiş abla profili oluşturma (isim, yaş farkı, uzmanlık alanı)
- 5 farklı sohbet modu: Duygusal, Akademik, Hobi, Sosyal İlişkiler, Kariyer
- Mod geçişlerinde otomatik AI yönlendirmesi
- Kriz kelimesi algılama ve profesyonel yardım yönlendirme sistemi
- Günlük karşılama mesajı sistemi

---

## Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| React + Vite | Frontend framework |
| Tailwind CSS | Stil ve tasarım |
| Groq API (LLaMA 3.3 70B) | Yapay zeka motoru |
| Vercel | Deploy ve yayınlama |
| Cursor | AI destekli geliştirme ortamı |
| Claude AI | Kod geliştirme ve hata düzeltme |
| Gemini AI | Proje planlama ve dokümantasyon |

---

# Kurulum

Projeyi yerel ortamda çalıştırmak için:
```bash
git clone https://github.com/Sudennz/Big-Sister-ai.git
cd Big-Sister-ai
npm install
npm run dev
```

Kök dizinde `.env` dosyası oluştur:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## Proje Yapısı
```
src/
  pages/
    WelcomePage.jsx      # Ana karşılama sayfası
    ProfilePage.jsx      # Abla profili oluşturma
    ChatPage.jsx         # Sohbet ekranı
  services/
    claudeService.js     # Groq API entegrasyonu
```

---

## Geliştirici

Sude Naz Ateş
