const SOFT_MOOD_CARDS = [
  {
    key: 'blossom',
    emoji: '🌸',
    surfaceClass: 'bg-[#faf7f6]',
    borderClass: 'border-[#e6d4d8]',
    accentBarClass: 'bg-[#c4a5a8]',
    quoteColorClass: 'text-[#5a4a47]',
    quote: 'Bugün nasılsın gerçekten?',
  },
  {
    key: 'book',
    emoji: '📖',
    surfaceClass: 'bg-[#f6f8f4]',
    borderClass: 'border-[#cfd9cc]',
    accentBarClass: 'bg-[#9aab92]',
    quoteColorClass: 'text-[#4a5245]',
    quote: 'Sınavlar bunaltıyor mu?',
  },
  {
    key: 'music',
    emoji: '🎵',
    surfaceClass: 'bg-[#f7f5fa]',
    borderClass: 'border-[#ddd6e6]',
    accentBarClass: 'bg-[#b5a8c4]',
    quoteColorClass: 'text-[#4f4658]',
    quote: 'Şu an ne dinliyorsun?',
  },
  {
    key: 'leaf',
    emoji: '🌿',
    surfaceClass: 'bg-[#faf9f4]',
    borderClass: 'border-[#e4ddd0]',
    accentBarClass: 'bg-[#c4b8a4]',
    quoteColorClass: 'text-[#534e45]',
    quote: 'Kendin olmak bazen zor geliyor mu?',
  },
  {
    key: 'star',
    emoji: '✦',
    surfaceClass: 'bg-[#f5f2f5]',
    borderClass: 'border-[#dcd2d9]',
    accentBarClass: 'bg-[#a8929e]',
    quoteColorClass: 'text-[#4d4349]',
    quote: 'Kariyer kafanı karıştırıyor mu?',
  },
  {
    key: 'film',
    emoji: '🎞️',
    surfaceClass: 'bg-[#faf6f3]',
    borderClass: 'border-[#e6cfc2]',
    accentBarClass: 'bg-[#c49a88]',
    quoteColorClass: 'text-[#5a453d]',
    quote: 'Son izlediğin diziyi konuşalım',
  },
]

const MoodMarqueeCard = ({ card }) => (
  <li className="w-[min(72vw,240px)] shrink-0 list-none sm:w-[248px]">
    <article
      className={`flex h-[140px] max-h-[140px] overflow-hidden rounded-xl border shadow-[0_6px_24px_-8px_rgba(60,50,55,0.1)] ${card.surfaceClass} ${card.borderClass}`}
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
  const handleStartClick = () => {
    onStart()
  }

  const handleStartKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onStart()
    }
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-violet-950 via-fuchsia-900 to-rose-900 px-0 pb-14 pt-10 sm:py-14">
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-500/35 blur-3xl animate-welcome-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl animate-welcome-glow"
        style={{ animationDelay: '1.2s' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
        <div
          className="relative mb-10 w-full max-w-sm animate-welcome-float sm:max-w-md lg:mb-0 lg:max-w-[420px]"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-400/40 via-violet-400/30 to-rose-400/40 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-fuchsia-950/50 backdrop-blur-xl sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
                Yeni
              </span>
              <div className="flex gap-1">
                <span className="size-2.5 rounded-full bg-white/30" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </div>
            </div>
            <div className="space-y-3 rounded-2xl bg-white/95 p-4 shadow-inner shadow-violet-200/50">
              <div className="flex gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-lg font-bold text-white">
                  BS
                </div>
                <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                  <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-violet-200 to-fuchsia-200" />
                  <div className="h-2 w-full rounded-full bg-slate-100" />
                  <div className="h-2 w-5/6 rounded-full bg-slate-100" />
                </div>
              </div>
              <div className="ml-14 space-y-2 rounded-2xl rounded-tl-sm bg-gradient-to-br from-fuchsia-50 to-violet-50 p-3">
                <div className="h-2 w-full rounded-full bg-fuchsia-200/80" />
                <div className="h-2 w-4/5 rounded-full bg-violet-200/70" />
              </div>
            </div>
            <p className="mt-4 text-center text-xs font-medium text-white/70">
              Sohbet önizlemesi — gerçek deneyim uygulamada
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-xl text-center lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200 backdrop-blur-md sm:text-sm">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Sıcak sohbet, her zaman yanında
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.05] lg:text-6xl lg:leading-[1.02]">
            <span className="block bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-transparent drop-shadow-sm">
              Big Sister
            </span>
            <span className="mt-1 block bg-gradient-to-r from-fuchsia-300 via-rose-200 to-violet-300 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-violet-100/95 sm:text-lg lg:mx-0 lg:max-w-lg">
            Kendi abla profilini oluştur; duygusal destek, ders yardımı, hobiler veya kariyer
            konularında Türkçe ve samimi bir sohbet deneyimi yaşa.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={handleStartClick}
              onKeyDown={handleStartKeyDown}
              className="inline-flex min-h-14 min-w-[200px] items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-rose-500 to-violet-600 px-10 py-3.5 text-base font-bold text-white shadow-lg shadow-fuchsia-900/40 transition hover:brightness-110 hover:shadow-xl hover:shadow-fuchsia-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-900"
              aria-label="Uygulamaya başla"
            >
              Başla
            </button>
            <p className="max-w-xs text-center text-sm text-white/60 lg:text-left">
              Ücretsiz başla · Kayıt gerekmez · Dakikalar içinde sohbet
            </p>
          </div>
        </div>
      </div>

      <section
        className="relative z-10 mt-6 w-full border-t border-white/10 bg-black/10 pt-8 backdrop-blur-[2px] sm:mt-10 sm:pt-10"
        aria-labelledby="soft-cards-heading"
        aria-label="Ablandan mesajlar, otomatik kayan bant"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="soft-cards-heading"
            className="font-mood-quote mb-2 text-center text-2xl font-medium tracking-wide text-stone-100 sm:text-3xl"
          >
            Ablandan bir mesaj var 💌
          </h2>
          <p className="mx-auto mb-2 max-w-md text-center text-[11px] font-light uppercase tracking-[0.28em] text-stone-300/90">
            HER DUYGU İÇİN BİR KONU
          </p>
          <p className="mx-auto mb-6 max-w-xl text-center text-sm font-light leading-relaxed text-stone-300/85">
            Neyin var olursa olsun — burada konuşulur.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)]"
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

        <p className="sr-only">
          Örnek sorular: Bugün nasılsın gerçekten? Sınavlar bunaltıyor mu? Şu an ne dinliyorsun? Kendin
          olmak bazen zor geliyor mu? Kariyer kafanı karıştırıyor mu? Son izlediğin diziyi konuşalım.
        </p>
      </section>
    </div>
  )
}

export default WelcomePage
