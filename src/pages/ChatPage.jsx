import { useState, useEffect, useRef, useMemo } from 'react'
import { mesajGonder } from '../services/claudeService'

const MODES = [
  { id: 'duygusal', label: 'Duygusal', emoji: '💙' },
  { id: 'akademik', label: 'Akademik', emoji: '📚' },
  { id: 'hobi', label: 'Hobi', emoji: '🎵' },
  { id: 'sosyal', label: 'Sosyal ilişkiler', emoji: '🌿' },
  { id: 'kariyer', label: 'Kariyer', emoji: '✦' },
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
  if (!t) return 'Ablan'
  const ilk = t.split(/\s+/)[0]
  return ilk.charAt(0).toLocaleUpperCase('tr-TR') + ilk.slice(1).toLocaleLowerCase('tr-TR')
}

const ablaBasHarf = (ablaAdi) => {
  const t = (ablaAdi || '').trim()
  if (!t) return '?'
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
      if (parsed?.d === today && Array.isArray(parsed?.msgs) && parsed.msgs.length > 0) {
        return parsed.msgs
      }
    }
  } catch { /* ignore */ }

  const stored = localStorage.getItem(STORAGE_SON_GIRIS)
  if (stored !== today) {
    const msgs = [{ role: 'assistant', content: `Merhaba ${kullaniciAdi}! 🌸 Bugün nasılsın? Ne var ne yok?` }]
    try {
      localStorage.setItem(STORAGE_SON_GIRIS, today)
      sessionStorage.setItem(SESSION_GUNLUK_KARSILAMA, JSON.stringify({ d: today, msgs }))
    } catch { /* ignore */ }
    return msgs
  }
  return []
}

// Doodle SVG arka plan
const DoodleBg = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
    <defs>
      <pattern id="doodle-chat" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="4" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M50 8 Q60 18 50 28 Q40 18 50 8" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <rect x="75" y="70" width="14" height="14" rx="4" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M8 70 L18 80 M18 70 L8 80" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="85" cy="25" r="5" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M30 85 Q35 75 40 85" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="60" r="2.5" fill="#10b981" opacity="0.5" />
        <circle cx="25" cy="50" r="2" fill="#0ea5e9" opacity="0.4" />
        <path d="M70 40 L74 44 L70 48 L66 44 Z" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#doodle-chat)" />
  </svg>
)

export default function ChatPage({ profil, onBack }) {
  const [mesajlar, setMesajlar] = useState(() => buildInitialMesajlar(profil.kullaniciAdi))
  const [input, setInput] = useState('')
  const [yukluyor, setYukluyor] = useState(false)
  const [aktifMod, setAktifMod] = useState('duygusal')
  const altRef = useRef(null)

  const dusunuyorMetni = useMemo(() => `${ablaKisaAd(profil.ablaAdi)} düşünüyor…`, [profil.ablaAdi])
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
      setMesajlar((p) => [...p, { role: 'assistant', content: 'Geçiş mesajı şu an gelmedi; dilersen yazmaya devam edebilirsin.' }])
    } finally {
      setYukluyor(false)
    }
  }

  const handleModSecimi = (modeId) => {
    if (modeId === aktifMod || yukluyor) return
    const modLabel = MODES.find((m) => m.id === modeId)?.label ?? modeId
    const sistemIstegi = `Kullanıcı modu ${modLabel} olarak değiştirdi. Bu moda uygun kısa ve samimi bir geçiş sorusu sor.`
    const tetikleyici = { role: 'user', content: sistemIstegi, gizli: true }
    setAktifMod(modeId)
    const guncel = [...mesajlar, tetikleyici]
    setMesajlar(guncel)
    void runModTransition(guncel, modeId)
  }

  const gonder = async () => {
    if (!input.trim() || yukluyor) return
    const yeniMesaj = { role: 'user', content: input }
    const guncellenmis = [...mesajlar, yeniMesaj]
    setMesajlar(guncellenmis)
    setInput('')
    setYukluyor(true)
    try {
      const cevap = await mesajGonder(guncellenmis, profil, aktifMod)
      setMesajlar([...guncellenmis, { role: 'assistant', content: cevap }])
    } catch {
      setMesajlar([...guncellenmis, { role: 'assistant', content: 'Bir hata oluştu, tekrar dene.' }])
    }
    setYukluyor(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      gonder()
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-sky-50 via-white to-emerald-50/50">
      <DoodleBg />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-sky-100 bg-white/80 px-3 py-4 shadow-sm shadow-sky-100/50 backdrop-blur-xl sm:px-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <div className="flex items-start gap-3 sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onBack}
              className="shrink-0 rounded-full border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-600 shadow-sm transition hover:border-sky-400 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Profile dön"
            >
              ← Profil
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-3 sm:flex-initial sm:justify-end">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-500 text-xl font-bold text-white shadow-lg shadow-sky-300/40 ring-2 ring-white sm:size-16 sm:text-2xl"
                aria-hidden
              >
                {avatarHarf}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-500 sm:text-xs">
                  Ablan
                </p>
                <h1 className="truncate text-lg font-extrabold text-slate-800 sm:text-xl">
                  {profil.ablaAdi}
                </h1>
                <p className="truncate text-sm text-slate-500">
                  {uzmanlikGoster} · ~{profil.yasfarki} yaş büyük
                </p>
              </div>
            </div>
          </div>

          {/* Mod butonları */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sohbet modu">
            {MODES.map((mod) => {
              const secili = aktifMod === mod.id
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleModSecimi(mod.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                    secili
                      ? 'bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md shadow-sky-300/40'
                      : 'border border-sky-200 bg-white text-slate-600 shadow-sm hover:border-sky-400 hover:bg-sky-50'
                  }`}
                  aria-pressed={secili}
                >
                  <span className="mr-1">{mod.emoji}</span>
                  {mod.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Chat alanı */}
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col px-3 py-4 sm:px-4" aria-busy={yukluyor}>
        <div
          className="relative flex min-h-[min(52vh,420px)] flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white/70 p-4 shadow-inner shadow-sky-100/50 backdrop-blur-sm sm:min-h-[min(58vh,520px)] sm:p-5"
          role="log"
          aria-live="polite"
          aria-label="Mesaj geçmişi"
        >
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {mesajlar.length === 0 && (
              <div className="flex flex-col items-center justify-center px-2 py-16 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100 to-emerald-100 text-3xl shadow-inner">
                  💙
                </div>
                <p className="text-lg font-bold text-slate-700">
                  {profil.ablaAdi} seninle konuşmaya hazır!
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                  Merhaba {profil.kullaniciAdi} — sohbete başlamak için aşağıdan bir şeyler yaz.
                </p>
              </div>
            )}

            {mesajlar.map((m, i) => {
              if (m.gizli) return null
              return (
                <div
                  key={`${i}-${m.role}`}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3.5 text-sm leading-relaxed sm:max-w-[75%] sm:text-[0.9375rem] ${
                      m.role === 'user'
                        ? 'rounded-[1.35rem] rounded-br-sm bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md shadow-sky-300/30'
                        : 'rounded-[1.35rem] rounded-bl-sm border-2 border-sky-100 bg-white text-slate-700 shadow-sm'
                    }`}
                    style={
                      m.role === 'assistant'
                        ? {
                            borderRadius: '1.35rem 1.35rem 1.35rem 0.25rem',
                            boxShadow: '0 2px 12px -2px rgba(14,165,233,0.10), inset 0 0 0 2px rgba(186,230,253,0.6)',
                          }
                        : {}
                    }
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              )
            })}

            {yukluyor && (
              <div className="flex justify-start" role="status" aria-live="polite" aria-label={dusunuyorMetni}>
                <div className="flex max-w-[90%] items-center gap-3 rounded-[1.35rem] rounded-bl-sm border-2 border-sky-100 bg-white px-4 py-3 shadow-sm">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-500 text-sm font-bold text-white shadow-md"
                    aria-hidden
                  >
                    {avatarHarf}
                  </div>
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="size-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="size-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-sm font-medium text-slate-500">{dusunuyorMetni}</p>
                </div>
              </div>
            )}
            <div ref={altRef} />
          </div>
        </div>

        {/* Input alanı */}
        <div className="mt-4 flex gap-2 sm:gap-3">
          <label htmlFor="chat-input" className="sr-only">Mesajını yaz</label>
          <textarea
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mesajını yaz…"
            rows={2}
            disabled={yukluyor}
            className="min-h-[52px] flex-1 resize-y rounded-2xl border-2 border-sky-200 bg-white px-4 py-3.5 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:opacity-60 sm:min-h-[56px] sm:text-base"
            aria-label="Mesaj kutusu"
          />
          <button
            type="button"
            onClick={gonder}
            disabled={yukluyor || !input.trim()}
            className="shrink-0 self-end rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-300/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Gönder"
          >
            Gönder
          </button>
        </div>
      </main>
    </div>
  )
}