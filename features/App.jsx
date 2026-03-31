import { useState } from 'react'
import ChatPage from './pages/ChatPage'
import ProfilePage from './pages/ProfilePage'
import WelcomePage from './pages/WelcomePage'

const STORAGE_PROFIL = 'bigSisterProfil'

const readStoredProfil = () => {
  try {
    const raw = localStorage.getItem(STORAGE_PROFIL)
    if (!raw) {
      return null
    }
    const p = JSON.parse(raw)
    const kullaniciYasi = Number(p?.kullaniciYasi)
    const yasfarki = Number(p?.yasfarki)
    if (
      p &&
      typeof p.kullaniciAdi === 'string' &&
      typeof p.ablaAdi === 'string' &&
      Number.isFinite(kullaniciYasi) &&
      Number.isFinite(yasfarki) &&
      typeof p.uzmanlik === 'string'
    ) {
      return { ...p, kullaniciYasi, yasfarki }
    }
    return null
  } catch {
    return null
  }
}

const saveProfilToStorage = (profilObj) => {
  try {
    localStorage.setItem(STORAGE_PROFIL, JSON.stringify(profilObj))
  } catch {
    /* ignore quota / private mode */
  }
}

const App = () => {
  const stored = readStoredProfil()
  const [page, setPage] = useState(() => (stored ? 'chat' : 'welcome'))
  const [profil, setProfil] = useState(() => stored)

  const handleWelcomeStart = () => {
    setPage('profile')
  }

  const handleBackToWelcome = () => {
    setPage('welcome')
  }

  const handleProfileComplete = (data) => {
    const nextProfil = {
      kullaniciAdi: data.userName,
      kullaniciYasi: data.userAge,
      yasfarki: data.ageGap,
      uzmanlik: data.expertise,
      ablaAdi: data.sisterName,
    }
    saveProfilToStorage(nextProfil)
    setProfil(nextProfil)
    setPage('chat')
  }

  const handleBackToProfile = () => {
    setPage('profile')
  }

  return (
    <div>
      {page === 'welcome' && <WelcomePage onStart={handleWelcomeStart} />}
      {page === 'profile' && (
        <ProfilePage onComplete={handleProfileComplete} onBack={handleBackToWelcome} />
      )}
      {page === 'chat' && profil && (
        <ChatPage profil={profil} onBack={handleBackToProfile} />
      )}
    </div>
  )
}

export default App
