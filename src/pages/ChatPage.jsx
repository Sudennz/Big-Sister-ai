import { useState, useEffect, useRef, useMemo } from 'react'
import { mesajGonder } from '../services/claudeService'

const MODES = [
  { id: 'duygusal', label: 'Duygusal' },
  { id: 'akademik', label: 'Akademik' },
  { id: 'hobi', label: 'Hobi' },
  { id: 'sosyal', label: 'Sosyal ilişkiler' },
  { id: 'kariyer', label: 'Kariyer' },
]

const UZMANLIK_ETIKET = {
  akademik: 'Akademik',
  spor: 'Spor',
  müzik: 'Müzik',
  sanat: 'Sanat',
  sosyal: 'Sosyal & İlişkiler',
  iş: 'İş hayatı',
}

const ablaKisaAd = (ablaAdi) => {
  const t = (ablaAdi || '').trim()
  if (!t) {
    return 'Ablan'
  }
  const ilk = t.split(/\s+/)[0]
  return ilk.charAt(0).toLocaleUpperCase('tr-TR') + ilk.slice(1).toLocaleLowerCase('tr-TR')
}

const ablaBasHarf = (ablaAdi) => {
  const t = (ablaAdi || '').trim()
  if (!t) {
    return '?'
  }
  return t.charAt(0).toLocaleUpperCase('tr-TR')
}

const STORAGE_SON_GIRIS = 'bigSisterSonGiris'
const SESSION_GUNLUK_KARSILAMA = 'bigSisterGunlukKarsilamaMesaji'

const bugununTarihiYerel = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const gun = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${gun}`
}

const buildInitialMesajlar = (kullaniciAdi) => {
  const today = bugununTarihiYerel()
  try {
    const raw = sessionStorage.getItem(SESSION_GUNLUK_KARSILAMA)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (
        parsed?.d === today &&
        Array.isArray(parsed?.msgs) &&
        parsed.msgs.length > 0
      ) {
        return parsed.msgs
      }
    }
  } catch {
    /* ignore */
  }

  const stored = localStorage.getItem(STORAGE_SON_GIRIS)
  if (stored !== today) {
    const msgs = [
      {
        role: 'assistant',
        content: `Merhaba ${kullaniciAdi}! 🌸 Bugün nasılsın? Ne var ne yok?`,
      },
    ]
    try {
      localStorage.setItem(STORAGE_SON_GIRIS, today)
      sessionStorage.setItem(
        SESSION_GUNLUK_KARSILAMA,
        JSON.stringify({ d: today, msgs }),
      )
    } catch {
      /* ignore */
    }
    return msgs
  }

  return []
}

export default function ChatPage({ profil, onBack }) {
  const [mesajlar, setMesajlar] = useState(() =>
    buildInitialMesajlar(profil.kullaniciAdi),
  )
  const [input, setInput] = useState('')
  const [yukluyor, setYukluyor] = useState(false)
  const [aktifMod, setAktifMod] = useState('duygusal')
  const altRef = useRef(null)

  const dusunuyorMetni = useMemo(
    () => `${ablaKisaAd(profil.ablaAdi)} düşünüyor…`,
    [profil.ablaAdi],
  )

  const avatarHarf = useMemo(() => ablaBasHarf(profil.ablaAdi), [profil.ablaAdi])
  const uzmanlikGoster = UZMANLIK_ETIKET[profil.uzmanlik] || profil.uzmanlik

  useEffect(() => {
    altRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mesajlar, yukluyor])

  const runModTransition = async (mesajlarWithTrigger, newModId) => {
    setYukluyor(true)
    try {
      const cevap = await mesajGonder(mesajlarWithTrigger, profil, newModId)
      setMesajlar((p) => [...p, { role: 'assistant', content: cevap }])
    } catch {
      setMesajlar((p) => [
        ...p,
        {
          role: 'assistant',
          content: 'Geçiş mesajı şu an gelmedi; dilersen yazmaya devam edebilirsin.',
        },
      ])
    } finally {
      setYukluyor(false)
    }
  }

  const handleModSecimi = (modeId) => {
    if (modeId === aktifMod || yukluyor) {
      return
    }
    const modLabel = MODES.find((m) => m.id === modeId)?.label ?? modeId
    const sistemIstegi = `Kullanıcı modu ${modLabel} olarak değiştirdi. Bu moda uygun kısa ve samimi bir geçiş sorusu sor.`
    const tetikleyici = { role: 'user', content: sistemIstegi, gizli: true }

    setAktifMod(modeId)
    setMesajlar((prev) => {
      const guncel = [...prev, tetikleyici]
      void runModTransition(guncel, modeId)
      return guncel
    })
  }

  const gonder = async () => {
    if (!input.trim() || yukluyor) {
      return
    }
    const yeniMesaj = { role: 'user', content: input }
    const guncellenmis = [...mesajlar, yeniMesaj]
    setMesajlar(guncellenmis)
    setInput('')
    setYukluyor(true)
    try {
      const cevap = await mesajGonder(guncellenmis, profil, aktifMod)
      setMesajlar([...guncellenmis, { role: 'assistant', content: cevap }])
    } catch {
      setMesajlar([
        ...guncellenmis,
        { role: 'assistant', content: 'Bir hata oluştu, tekrar dene.' },
      ])
    }
    setYukluyor(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      gonder()
    }
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-violet-50 via-fuchsia-50/40 to-rose-50/80">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/75 px-3 py-4 shadow-sm shadow-violet-200/30 backdrop-blur-xl sm:px-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <div className="flex items-start gap-3 sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBackClick}
              className="shrink-0 rounded-full border border-violet-200/80 bg-white/90 px-3 py-2 text-sm font-semibold text-violet-700 shadow-sm transition hover:border-fuchsia-300 hover:text-fuchsia-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              aria-label="Profile dön"
            >
              ← Profil
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-3 sm:flex-initial sm:justify-end">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-rose-400 to-violet-600 text-xl font-bold text-white shadow-lg shadow-fuchsia-500/35 ring-2 ring-white/80 sm:size-16 sm:text-2xl"
                aria-hidden
              >
                {avatarHarf}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-600/90 sm:text-xs">
                  Ablan
                </p>
                <h1 className="truncate text-lg font-extrabold text-violet-950 sm:text-xl">
                  {profil.ablaAdi}
                </h1>
                <p className="truncate text-sm text-violet-700/85">
                  {uzmanlikGoster} · ~{profil.yasfarki} yaş büyük
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Sohbet modu"
          >
            {MODES.map((mod) => {
              const secili = aktifMod === mod.id
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleModSecimi(mod.id)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 ${
                    secili
                      ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white shadow-md shadow-fuchsia-500/30'
                      : 'border border-violet-200/90 bg-white/90 text-violet-800 shadow-sm hover:border-fuchsia-300 hover:bg-fuchsia-50/80'
                  }`}
                  aria-pressed={secili}
                  aria-label={`${mod.label} modu`}
                >
                  {mod.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-3 py-4 sm:px-4"
        aria-busy={yukluyor}
      >
        <div
          className="flex min-h-[min(52vh,420px)] flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-gradient-to-b from-white/90 to-fuchsia-50/50 p-4 shadow-inner shadow-violet-200/40 sm:min-h-[min(58vh,520px)] sm:p-5"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Mesaj geçmişi"
        >
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {mesajlar.length === 0 && (
              <div className="flex flex-col items-center justify-center px-2 py-16 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-100 to-violet-100 text-3xl shadow-inner">
                  💜
                </div>
                <p className="text-lg font-bold text-violet-950">
                  {profil.ablaAdi} seninle konuşmaya hazır!
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-violet-700/90">
                  Merhaba {profil.kullaniciAdi} — sohbete başlamak için aşağıdan bir şeyler yaz.
                </p>
              </div>
            )}
            {mesajlar.map((m, i) => {
              if (m.gizli) {
                return null
              }
              return (
                <div
                  key={`${i}-${m.role}`}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3.5 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:text-[0.9375rem] ${
                      m.role === 'user'
                        ? 'rounded-[1.35rem] rounded-br-md bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 text-white shadow-fuchsia-500/25'
                        : 'rounded-[1.35rem] rounded-bl-md border border-fuchsia-100/80 bg-gradient-to-br from-rose-50 to-violet-100/90 text-violet-950 shadow-violet-200/20'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              )
            })}

            {yukluyor && (
              <div
                className="flex justify-start"
                role="status"
                aria-live="polite"
                aria-label={dusunuyorMetni}
              >
                <div className="flex max-w-[90%] items-center gap-3 rounded-[1.35rem] rounded-bl-md border border-fuchsia-200/60 bg-gradient-to-r from-rose-50/95 to-violet-100/90 px-4 py-3 shadow-sm">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-rose-400 to-violet-600 text-sm font-bold text-white shadow-md animate-avatar-breathe"
                    aria-hidden
                  >
                    {avatarHarf}
                  </div>
                  <p className="text-sm font-medium text-violet-800 animate-thinking-soft">
                    {dusunuyorMetni}
                  </p>
                </div>
              </div>
            )}
            <div ref={altRef} />
          </div>
        </div>

        <div className="mt-4 flex gap-2 sm:gap-3">
          <label htmlFor="chat-input" className="sr-only">
            Mesajını yaz
          </label>
          <textarea
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mesajını yaz…"
            rows={2}
            disabled={yukluyor}
            className="min-h-[52px] flex-1 resize-y rounded-2xl border border-violet-200/90 bg-white/95 px-4 py-3.5 text-sm text-violet-950 shadow-sm outline-none transition placeholder:text-violet-400 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-200/50 disabled:opacity-60 sm:min-h-[56px] sm:text-base"
            aria-label="Mesaj kutusu"
          />
          <button
            type="button"
            onClick={gonder}
            disabled={yukluyor || !input.trim()}
            className="shrink-0 self-end rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Gönder"
          >
            Gönder
          </button>
        </div>
      </main>
    </div>
  )
}
