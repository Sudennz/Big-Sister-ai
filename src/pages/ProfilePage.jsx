import { useState } from 'react'

const EXPERTISE_OPTIONS = [
  { value: 'akademik', label: 'Akademik' },
  { value: 'spor', label: 'Spor' },
  { value: 'müzik', label: 'Müzik' },
  { value: 'sanat', label: 'Sanat' },
  { value: 'sosyal', label: 'Sosyal & İlişkiler' },
  { value: 'iş', label: 'İş hayatı' },
]

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

  const handleBackClick = () => {
    if (onBack) onBack()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 px-4 py-8 sm:py-12">
      <div
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-fuchsia-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-lg pb-8">
        {onBack && (
          <button
            type="button"
            onClick={handleBackClick}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-950"
            aria-label="Geri dön"
          >
            ← Geri
          </button>
        )}

        <div className="mb-8 text-center sm:text-left">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Abla profilin
          </h1>
          <p className="text-base leading-relaxed text-fuchsia-100/85">
            Kendin ve hayalindeki abla için birkaç bilgi — yaklaşık 2 dakikada hazırsın.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl shadow-violet-950/40 backdrop-blur-xl sm:p-8"
        >
          <div>
            <label
              htmlFor="userName"
              className="mb-2 block text-sm font-semibold text-fuchsia-100/90"
            >
              Senin adın
            </label>
            <input
              id="userName"
              type="text"
              autoComplete="nickname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/20 bg-white/95 px-5 text-base text-violet-950 shadow-inner outline-none ring-violet-400/40 transition placeholder:text-slate-400 focus:border-fuchsia-400/60 focus:ring-4"
              placeholder="Örn. Zeynep"
            />
          </div>

          <div>
            <label
              htmlFor="userAge"
              className="mb-2 block text-sm font-semibold text-fuchsia-100/90"
            >
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
              className="h-14 w-full rounded-2xl border border-white/20 bg-white/95 px-5 text-base text-violet-950 shadow-inner outline-none ring-violet-400/40 transition placeholder:text-slate-400 focus:border-fuchsia-400/60 focus:ring-4"
              placeholder="Örn. 15"
            />
          </div>

          <div>
            <label
              htmlFor="ageGap"
              className="mb-2 block text-sm font-semibold text-fuchsia-100/90"
            >
              Yaş farkı (abla kaç yaş büyük olsun?)
            </label>
            <select
              id="ageGap"
              value={ageGap}
              onChange={(e) => setAgeGap(e.target.value)}
              className="h-14 w-full cursor-pointer rounded-2xl border border-white/20 bg-white/95 px-5 text-base text-violet-950 shadow-inner outline-none ring-violet-400/40 transition focus:border-fuchsia-400/60 focus:ring-4"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={String(n)}>
                  {n} yıl
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="expertise"
              className="mb-2 block text-sm font-semibold text-fuchsia-100/90"
            >
              Uzmanlık alanı
            </label>
            <select
              id="expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="h-14 w-full cursor-pointer rounded-2xl border border-white/20 bg-white/95 px-5 text-base text-violet-950 shadow-inner outline-none ring-violet-400/40 transition focus:border-fuchsia-400/60 focus:ring-4"
            >
              {EXPERTISE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sisterName"
              className="mb-2 block text-sm font-semibold text-fuchsia-100/90"
            >
              Ablanın adı
            </label>
            <input
              id="sisterName"
              type="text"
              value={sisterName}
              onChange={(e) => setSisterName(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/20 bg-white/95 px-5 text-base text-violet-950 shadow-inner outline-none ring-violet-400/40 transition placeholder:text-slate-400 focus:border-fuchsia-400/60 focus:ring-4"
              placeholder="Örn. Elif Abla"
            />
          </div>

          {error && (
            <p
              className="rounded-2xl border border-rose-400/40 bg-rose-500/15 px-4 py-3 text-sm font-medium text-rose-100"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-rose-500 to-violet-600 text-base font-bold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Sohbete geç"
          >
            Ablama kavuş
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
