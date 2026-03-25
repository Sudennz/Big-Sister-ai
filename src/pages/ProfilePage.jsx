import { useState } from 'react'

const EXPERTISE_OPTIONS = [
  { value: 'akademik', label: '📚 Akademik' },
  { value: 'spor', label: '⚡ Spor' },
  { value: 'müzik', label: '🎵 Müzik' },
  { value: 'sanat', label: '🎨 Sanat' },
  { value: 'sosyal', label: '🌿 Sosyal & İlişkiler' },
  { value: 'iş', label: '✦ İş hayatı' },
]

const DoodleBg = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
    <defs>
      <pattern id="doodle-profile" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="4" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M50 8 Q60 18 50 28 Q40 18 50 8" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <rect x="75" y="70" width="14" height="14" rx="4" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M8 70 L18 80 M18 70 L8 80" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="85" cy="25" r="5" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="60" cy="60" r="2.5" fill="#10b981" opacity="0.5" />
        <circle cx="25" cy="50" r="2" fill="#0ea5e9" opacity="0.4" />
        <path d="M70 40 L74 44 L70 48 L66 44 Z" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#doodle-profile)" />
  </svg>
)

const ProfilePage = ({ onComplete, onBack }) => {
  const [userName, setUserName] = useState('')
  const [userAge, setUserAge] = useState('')
  const [ageGap, setAgeGap] = useState('3')
  const [expertise, setExpertise] = useState('akademik')
  const [sisterName, setSisterName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameTrim = userName.trim()
    const sisterTrim = sisterName.trim()
    const ageNum = Number(userAge)

    if (!nameTrim || !sisterTrim) {
      setError('Lütfen kullanıcı adı ve abla adını doldur.')
      return
    }
    if (!Number.isFinite(ageNum) || ageNum < 5 || ageNum > 120) {
      setError('Lütfen geçerli bir yaş gir (5–120).')
      return
    }

    setError('')
    onComplete({
      userName: nameTrim,
      userAge: ageNum,
      ageGap: Number(ageGap),
      expertise,
      sisterName: sisterTrim,
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-8 sm:py-12">
      <DoodleBg />

      {/* Blur blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-lg pb-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 shadow-sm transition hover:border-sky-400 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Geri dön"
          >
            ← Geri
          </button>
        )}

        <div className="mb-8 text-center sm:text-left">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Abla profilin 💙
          </h1>
          <p className="text-base leading-relaxed text-slate-500">
            Kendin ve hayalindeki abla için birkaç bilgi — yaklaşık 2 dakikada hazırsın.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[1.75rem] border border-sky-100 bg-white/80 p-6 shadow-xl shadow-sky-100/50 backdrop-blur-sm sm:p-8"
        >
          {/* Senin adın */}
          <div>
            <label htmlFor="userName" className="mb-2 block text-sm font-semibold text-slate-600">
              Senin adın
            </label>
            <input
              id="userName"
              type="text"
              autoComplete="nickname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 border-sky-100 bg-white px-5 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Örn. Zeynep"
            />
          </div>

          {/* Yaşın */}
          <div>
            <label htmlFor="userAge" className="mb-2 block text-sm font-semibold text-slate-600">
              Yaşın
            </label>
            <input
              id="userAge"
              type="number"
              inputMode="numeric"
              min={5}
              max={120}
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 border-sky-100 bg-white px-5 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Örn. 15"
            />
          </div>

          {/* Yaş farkı */}
          <div>
            <label htmlFor="ageGap" className="mb-2 block text-sm font-semibold text-slate-600">
              Yaş farkı (abla kaç yaş büyük olsun?)
            </label>
            <select
              id="ageGap"
              value={ageGap}
              onChange={(e) => setAgeGap(e.target.value)}
              className="h-14 w-full cursor-pointer rounded-2xl border-2 border-sky-100 bg-white px-5 text-base text-slate-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={String(n)}>{n} yıl</option>
              ))}
            </select>
          </div>

          {/* Uzmanlık */}
          <div>
            <label htmlFor="expertise" className="mb-2 block text-sm font-semibold text-slate-600">
              Uzmanlık alanı
            </label>
            <select
              id="expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="h-14 w-full cursor-pointer rounded-2xl border-2 border-sky-100 bg-white px-5 text-base text-slate-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              {EXPERTISE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Ablanın adı */}
          <div>
            <label htmlFor="sisterName" className="mb-2 block text-sm font-semibold text-slate-600">
              Ablanın adı
            </label>
            <input
              id="sisterName"
              type="text"
              value={sisterName}
              onChange={(e) => setSisterName(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 border-sky-100 bg-white px-5 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Örn. Elif"
            />
          </div>

          {error && (
            <p
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-base font-bold text-white shadow-lg shadow-sky-300/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            aria-label="Sohbete geç"
          >
            Ablama kavuş 💙
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
