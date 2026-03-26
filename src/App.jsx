import { useState, useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import Toast from './components/Toast'
import NavBar from './components/NavBar'
import LandingScreen from './screens/LandingScreen'
import SurveyScreen from './screens/SurveyScreen'
import HomeScreen from './screens/HomeScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import RoadmapScreen from './screens/RoadmapScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import ProfileScreen from './screens/ProfileScreen'
import CompletedScreen from './screens/CompletedScreen'
import AcceptedScreen from './screens/AcceptedScreen'

const NAV_TABS = [
  { id:'discover', label:'DISCOVER', icon:'🔍' },
  { id:'roadmap',  label:'ROADMAP',  icon:'🗺️' },
  { id:'home',     label:'HOME',     icon:'🏠' },
  { id:'rank',     label:'RANK',     icon:'🏆' },
  { id:'profile',  label:'PROFILE',  icon:'👤' },
]

export default function App() {
  const { loggedIn, surveyDone, toast } = useAppStore()
  const [screen, setScreen] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [showAccepted, setShowAccepted] = useState(false)

  useEffect(() => {
    if (!loggedIn) { setScreen('landing'); return }
    if (!surveyDone) { setScreen('survey'); return }
    setScreen('home')
  }, [loggedIn, surveyDone])

  const go = (s) => { setScreen(s); if (['discover','roadmap','home','rank','profile'].includes(s)) setActiveTab(s) }
  const navTo = (tab) => { setActiveTab(tab); setScreen(tab) }
  const handleAccept = (task) => {
    useAppStore.getState().acceptTask(task)
    setShowAccepted(true)
    setTimeout(() => { setShowAccepted(false); go('roadmap') }, 1800)
  }

  const showNav = loggedIn && surveyDone && !showAccepted && !['landing','survey','completed'].includes(screen)

  const renderScreen = () => {
    if (!loggedIn) return <LandingScreen onDone={() => go('survey')} />
    if (!surveyDone) return <SurveyScreen onDone={() => go('home')} />
    if (showAccepted) return <AcceptedScreen />
    switch (screen) {
      case 'home':      return <HomeScreen go={go} />
      case 'discover':  return <DiscoverScreen onAccept={handleAccept} />
      case 'roadmap':   return <RoadmapScreen go={go} />
      case 'rank':      return <LeaderboardScreen />
      case 'profile':   return <ProfileScreen go={go} />
      case 'completed': return <CompletedScreen go={go} />
      default:          return <HomeScreen go={go} />
    }
  }

  return (
    <div className="phone-shell">
      <div className="screen" style={{paddingBottom:showNav?'var(--nav-h)':0}}>
        {renderScreen()}
      </div>
      {showNav && <NavBar tabs={NAV_TABS} active={activeTab} onNav={navTo} />}
      <Toast message={toast} />
    </div>
  )
}