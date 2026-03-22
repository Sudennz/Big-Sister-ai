const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const KRIZ_KELIMELERI = [
  'intihar', 'kendime zarar', 'ölmek istiyorum',
  'yaşamak istemiyorum', 'kendimi öldür'
];

function krizKontrol(mesaj) {
  return KRIZ_KELIMELERI.some(kelime =>
    mesaj.toLowerCase().includes(kelime)
  );
}

function sistemPromptOlustur(profil, mod, mesajlar = []) {
  const modTalimatlari = {
    duygusal: `Şu an duygusal destek modundasın. Dinle, empati kur, yargılama.
Eğer kullanıcı az önce farklı bir moddan geçtiyse "Seni dinlemek için buradayım, içini dökmek istediğin bir şey var mı?" diye sor.`,
    akademik: `Şu an akademik yardım modundasın. Derslerde rehberlik et.
Eğer kullanıcı az önce farklı bir moddan geçtiyse "Hangi ders veya konu seni zorluyor şu an?" diye sor.`,
    hobi: `Şu an hobi modundasın. Film, müzik, kitap hakkında sohbet et.
Eğer kullanıcı az önce farklı bir moddan geçtiyse "Son zamanlarda ne izledin, ne dinledin, ne okudun?" diye sor.`,
    kariyer: `Şu an kariyer modundasın. İş hayatında tavsiye ver.
Eğer kullanıcı az önce farklı bir moddan geçtiyse "Kariyer konusunda kafanda dönen ne var?" diye sor.`,
    sosyal: `Şu an sosyal ilişkiler modundasın. Arkadaşlık, aile ve iletişim konularında rehberlik et.
Eğer kullanıcı az önce farklı bir moddan geçtiyse "Biriyle yaşadığın bir durum mu var, anlatmak ister misin?" diye sor.`,
  }

  const uzmanlikTalimatlari = {
    sosyal:
      'Sosyal ilişkiler, arkadaşlık, aile dinamikleri ve iletişim konularında rehberlik et.',
  }

  const uzmanlikOdağı = uzmanlikTalimatlari[profil.uzmanlik]
    ? `Uzmanlık odağın: ${uzmanlikTalimatlari[profil.uzmanlik]}`
    : ''

  const oncekiMesajlar = mesajlar.slice(0, -1)
  const gecmisVar = oncekiMesajlar.length > 0

  const gecmisTalimat = `Konuşma geçmişine dikkat et; kullanıcının daha önce bahsettiği konulara uygun olduğunda nazikçe atıfta bulun.
Eğer kullanıcı daha önce bir şey paylaştıysa (mesaj geçmişinde varsa), gerektiğinde "Geçen bahsettiğin konuyu düşündüm…" gibi doğal bağlantılar kur; zorlama yapma, samimi ve hafif kalsın.`

  const gecmisEk = gecmisVar
    ? 'Bu mesajdan önce sohbette geçmiş var; gerektiğinde önceki paylaşımlara nazikçe dön.'
    : ''

  return `Sen ${profil.ablaAdi} adında bir ablasın.
Kullanıcının adı ${profil.kullaniciAdi}, ${profil.kullaniciYasi} yaşında.
Sen kullanıcıdan ${profil.yasfarki} yaş büyüksün.
Uzmanlık alanın: ${profil.uzmanlik}.
${uzmanlikOdağı ? `${uzmanlikOdağı}\n` : ''}${gecmisTalimat}
${gecmisEk ? `${gecmisEk}\n` : ''}Gerçek bir abla gibi sıcak ve samimi Türkçe konuş.
Kısa cevaplar ver. Robotik olma.
MEVCUT MOD: ${modTalimatlari[mod] ?? modTalimatlari.duygusal}`
}

export async function mesajGonder(mesajlar, profil, mod) {
  if (krizKontrol(mesajlar[mesajlar.length - 1].content)) {
    return `${profil.kullaniciAdi}, seni çok önemsiyorum. Lütfen hemen güvendiğin bir yetişkine başvur veya 182 numaralı ALO Psikiyatri Hattı'nı ara. Yalnız değilsin. 💙`;
  }

  const sistemPrompt = sistemPromptOlustur(profil, mod, mesajlar)

  const gecmis = mesajlar.slice(0, -1).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))

  const sonMesaj = mesajlar[mesajlar.length - 1].content;

  const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: sistemPrompt }]
        },
        contents: [
          ...gecmis,
          { role: 'user', parts: [{ text: sonMesaj }] }
        ],
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.9
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error('API hatası: ' + response.status);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
