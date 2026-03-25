const SOFT_MOOD_CARDS = [
  {
    key: 'blossom',
    emoji: '🌸',
    surfaceClass: 'bg-[#f0f9ff]',
    borderClass: 'border-[#bae6fd]',
    accentBarClass: 'bg-[#38bdf8]',
    quoteColorClass: 'text-[#0c4a6e]',
    quote: 'Bugün nasılsın gerçekten?',
  },
  {
    key: 'book',
    emoji: '📖',
    surfaceClass: 'bg-[#f0fdf4]',
    borderClass: 'border-[#bbf7d0]',
    accentBarClass: 'bg-[#34d399]',
    quoteColorClass: 'text-[#064e3b]',
    quote: 'Sınavlar bunaltıyor mu?',
  },
  {
    key: 'music',
    emoji: '🎵',
    surfaceClass: 'bg-[#f0f9ff]',
    borderClass: 'border-[#bae6fd]',
    accentBarClass: 'bg-[#0ea5e9]',
    quoteColorClass: 'text-[#0c4a6e]',
    quote: 'Şu an ne dinliyorsun?',
  },
  {
    key: 'leaf',
    emoji: '🌿',
    surfaceClass: 'bg-[#f0fdf4]',
    borderClass: 'border-[#bbf7d0]',
    accentBarClass: 'bg-[#10b981]',
    quoteColorClass: 'text-[#064e3b]',
    quote: 'Kendin olmak bazen zor geliyor mu?',
  },
  {
    key: 'star',
    emoji: '✦',
    surfaceClass: 'bg-[#ecfeff]',
    borderClass: 'border-[#a5f3fc]',
    accentBarClass: 'bg-[#06b6d4]',
    quoteColorClass: 'text-[#164e63]',
    quote: 'Kariyer kafanı karıştırıyor mu?',
  },
  {
    key: 'film',
    emoji: '🎞️',
    surfaceClass: 'bg-[#f0fdf4]',
    borderClass: 'border-[#bbf7d0]',
    accentBarClass: 'bg-[#34d399]',
    quoteColorClass: 'text-[#064e3b]',
    quote: 'Son izlediğin diziyi konuşalım',
  },
]

const MoodMarqueeCard = ({ card }) => (
  <li className="w-[min(72vw,240px)] shrink-0 list-none sm:w-[248px]">
    <article
      className={`flex h-[140px] max-h-[140px] overflow-hidden rounded-xl border shadow-[0_6px_24px_-8px_rgba(14,165,233,0.15)] ${card.surfaceClass} ${card.borderClass}`}
    >
      <div
        className={`w-1 shrink-0 self-stretch rounded-l-[10px] ${card.accentBarClass}`}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 sm:gap-3.5 sm:px-3.5">
        <span
          className="flex size-[28px] shrink-0 select-none items-center justify-center text-[28px] leading-none opacity-90"
          aria-hidden
        >
          {card.emoji}
        </span>
        <p
          className={`font-mood-quote min-w-0 text-[13px] font-medium italic leading-snug ${card.quoteColorClass}`}
        >
          {card.quote}
        </p>
      </div>
    </article>
  </li>
)

const WelcomePage = ({ onStart }) => {
  const handleStartClick = () => { onStart() }
  const handleStartKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onStart()
    }
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-0 pb-14 pt-10 sm:py-14">
      {/* Subtle background blobs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" style={{ animationDelay: '1.2s' }} aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/30 blur-3xl" aria-hidden />

      {/* Subtle doodle SVG background */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden>
        <defs>
          <pattern id="doodle-bg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
            <path d="M40 5 Q50 15 40 25 Q30 15 40 5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <rect x="60" y="55" width="12" height="12" rx="3" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
            <path d="M5 55 L15 65 M15 55 L5 65" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="70" cy="20" r="4" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#doodle-bg)" />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
        {/* Mockup card */}
        <div className="relative mb-10 w-full max-w-sm sm:max-w-md lg:mb-0 lg:max-w-[420px]" aria-hidden>
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-sky-200/50 via-cyan-100/40 to-emerald-200/50 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-200/60 bg-white/80 p-6 shadow-2xl shadow-sky-200/40 backdrop-blur-xl sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700">
                Yeni
              </span>
              <div className="flex gap-1">
                <span className="size-2.5 rounded-full bg-sky-300" />
                <span className="size-2.5 rounded-full bg-emerald-300" />
                <span className="size-2.5 rounded-full bg-cyan-300" />
              </div>
            </div>
            <div className="space-y-3 rounded-2xl bg-sky-50/80 p-4 shadow-inner shadow-sky-100">
              <div className="flex gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-500 text-lg font-bold text-white shadow-md">
                  BS
                </div>
                <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                  <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-sky-200 to-emerald-200" />
                  <div className="h-2 w-full rounded-full bg-slate-100" />
                  <div className="h-2 w-5/6 rounded-full bg-slate-100" />
                </div>
              </div>
              <div className="ml-14 space-y-2 rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
                <div className="h-2 w-full rounded-full bg-sky-100" />
                <div className="h-2 w-4/5 rounded-full bg-emerald-100" />
              </div>
            </div>
            <p className="mt-4 text-center text-xs font-medium text-slate-400">
              Sohbet önizlemesi — gerçek deneyim uygulamada
            </p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-xl text-center lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 sm:text-sm">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Her zaman yanında
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-800 sm:text-5xl sm:leading-[1.05] lg:text-6xl lg:leading-[1.02]">
            <span className="block bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 bg-clip-text text-transparent drop-shadow-sm">
              Big Sister
            </span>
            <span className="mt-1 block bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 lg:max-w-lg">
            Kendi abla profilini oluştur; duygusal destek, ders yardımı, hobiler veya kariyer
            konularında Türkçe ve samimi bir sohbet deneyimi yaşa.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={handleStartClick}
              onKeyDown={handleStartKeyDown}
              className="inline-flex min-h-14 min-w-[200px] items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-10 py-3.5 text-base font-bold text-white shadow-lg shadow-sky-300/40 transition hover:brightness-110 hover:shadow-xl hover:shadow-sky-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              aria-label="Uygulamaya başla"
            >
              Başla
            </button>
            <p className="max-w-xs text-center text-sm text-slate-400 lg:text-left">
              Ücretsiz başla · Kayıt gerekmez · Dakikalar içinde sohbet
            </p>
          </div>
        </div>
      </div>

      {/* Mood cards section */}
      <section
        className="relative z-10 mt-6 w-full border-t border-sky-100 bg-white/50 pt-8 backdrop-blur-[2px] sm:mt-10 sm:pt-10"
        aria-label="Ablandan mesajlar"
      >
        <div className="mx-auto max-w-6xl px-4">
          
          <p className="mx-auto mb-2 max-w-md text-center text-[11px] font-light uppercase tracking-[0.28em] text-slate-400">
            HER DUYGU İÇİN BİR KONU
          </p>
          <p className="mx-auto mb-6 max-w-xl text-center text-sm font-light leading-relaxed text-slate-500">
            Neyin var olursa olsun — burada konuşulur.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)]"
          role="presentation"
        >
          <ul className="mood-marquee-track list-none py-2 pl-4" aria-hidden>
            {SOFT_MOOD_CARDS.map((card) => (
              <MoodMarqueeCard key={`${card.key}-a`} card={card} />
            ))}
            {SOFT_MOOD_CARDS.map((card) => (
              <MoodMarqueeCard key={`${card.key}-b`} card={card} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default WelcomePage
