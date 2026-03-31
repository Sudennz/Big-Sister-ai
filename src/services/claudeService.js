const GROQ_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const KRIZ_KELIMELERI = [
  'intihar', 'kendime zarar', 'ölmek istiyorum',
  'yaşamak istemiyorum', 'kendimi öldür'
];

function krizKontrol(mesaj) {
  return KRIZ_KELIMELERI.some(kelime =>
    mesaj.toLowerCase().includes(kelime)
  );
}

function sistemPromptOlustur(profil, mod) {
  const modTalimatlari = {
    duygusal: `Şu an duygusal destek modundasın. Dinle, empati kur, yargılama. Eğer kullanıcı az önce farklı bir moddan geçtiyse "Seni dinlemek için buradayım, içini dökmek istediğin bir şey var mı?" diye sor.`,
    akademik: `Şu an akademik yardım modundasın. Derslerde rehberlik et. Eğer kullanıcı az önce farklı bir moddan geçtiyse "Hangi ders veya konu seni zorluyor şu an?" diye sor.`,
    hobi: `Şu an hobi modundasın. Film, müzik, kitap hakkında sohbet et. Eğer kullanıcı az önce farklı bir moddan geçtiyse "Son zamanlarda ne izledin, ne dinledin, ne okudun?" diye sor.`,
    kariyer: `Şu an kariyer modundasın. İş hayatında tavsiye ver. Eğer kullanıcı az önce farklı bir moddan geçtiyse "Kariyer konusunda kafanda dönen ne var?" diye sor.`,
    sosyal: `Şu an sosyal ilişkiler modundasın. Arkadaşlık, aile ve iletişim konularında rehberlik et. Eğer kullanıcı az önce farklı bir moddan geçtiyse "Biriyle yaşadığın bir durum mu var, anlatmak ister misin?" diye sor.`,
  }

  return `Sen ${profil.ablaAdi} adında bir ablasın. Kullanıcının adı ${profil.kullaniciAdi}, ${profil.kullaniciYasi} yaşında. Sen kullanıcıdan ${profil.yasfarki} yaş büyüksün. Uzmanlık alanın: ${profil.uzmanlik}.

  Gerçek bir abla gibi konuş. Önce dert dinle, sonra konuş. Kullanıcı bir şey paylaştığında hemen çözüm önerme — önce onun hissettiklerini anladığını göster, empati kur, birlikte dertleş. Ama bunu yaparken ChatGPT gibi soğuk ve kalıp cümleler kullanma. "Seni anlıyorum" demek yerine gerçekten o anın içine gir — "Vay be, bu çok can sıkıcı bir durum" veya "Yani arkadaşın seni böyle mi karşıladı, haksızlık bu" gibi içten tepkiler ver. Zaman zaman kendi deneyimlerinden bahsediyormuş gibi samimi ol. Çözüm önerilerini ancak kullanıcı rahatladıktan sonra, doğal bir şekilde sun.
  
  Türkçeyi akıcı ve doğal kullan. Devrik cümle kullanma. Asla İngilizce kelime karıştırma. Robotik olma.
  
 MEVCUT MOD: ${modTalimatlari[mod] ?? modTalimatlari.duygusal}

KESİNLİKLE UYULMASI GEREKEN KURAL: Sadece ve sadece Türkçe kullan. Tek bir yabancı kelime bile yazma. İngilizce, İspanyolca, Rusça veya başka herhangi bir dildeki kelime yasaktır. Tüm cümleler saf Türkçe olmalı.`
}

export async function mesajGonder(mesajlar, profil, mod) {
  if (krizKontrol(mesajlar[mesajlar.length - 1].content)) {
    return `${profil.kullaniciAdi}, seni çok önemsiyorum. Lütfen hemen güvendiğin bir yetişkine başvur veya 182 numaralı ALO Psikiyatri Hattı'nı ara. Yalnız değilsin. 💙`;
  }

  const sistemPrompt = sistemPromptOlustur(profil, mod)

  const mesajListesi = [
    ...mesajlar.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    })),
    { role: 'user', content: mesajlar[mesajlar.length - 1].content }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: sistemPrompt },
        ...mesajListesi,
      ],
      max_tokens: 1024,
      temperature: 0.9,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('Groq API hatası:', err);
    throw new Error('API hatası: ' + response.status);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}