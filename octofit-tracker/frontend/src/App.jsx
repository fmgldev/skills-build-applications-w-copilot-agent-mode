import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { to: '/', label: 'Overview', icon: '⌂' },
  { to: '/activities', label: 'Activities', icon: '◒' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '↗' },
  { to: '/teams', label: 'Teams', icon: '◎' },
  { to: '/users', label: 'Members', icon: '◉' },
  { to: '/workouts', label: 'Workouts', icon: '✦' },
]

function Overview() {
  return (
    <section className="overview">
      <div className="welcome-panel">
        <p className="eyebrow">Thursday, September 24</p>
        <h1>Make your move.</h1>
        <p className="lead-copy">Small wins compound. Keep your team moving and make today count.</p>
        <NavLink className="primary-action" to="/activities">View activity log <span>&rarr;</span></NavLink>
      </div>
      <div className="overview-grid">
        <NavLink to="/leaderboard" className="overview-card card-amber"><span className="card-kicker">Top performer</span><strong>Leaderboard</strong><span>See who is setting the pace &rarr;</span></NavLink>
        <NavLink to="/workouts" className="overview-card card-mint"><span className="card-kicker">Build momentum</span><strong>Find a workout</strong><span>Choose your next challenge &rarr;</span></NavLink>
        <NavLink to="/teams" className="overview-card card-ink"><span className="card-kicker">Better together</span><strong>Meet your teams</strong><span>Train with your crew &rarr;</span></NavLink>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const currentLabel = navItems.find((item) => item.to === location.pathname)?.label || 'Overview'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand"><img src="/octofitapp-small.png" alt="" /><span>OctoFit<small>TRACKER</small></span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <span className="nav-label">Workspace</span>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className="nav-link"><span>{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot"></span> API connected</div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><span className="mobile-brand">OctoFit</span><span className="breadcrumb">Workspace / {currentLabel}</span></div><div className="profile-chip"><span>AM</span><strong>Alex Morgan</strong></div></header>
        <div className="page-content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></div>
      </main>
    </div>
  )
}

export default App
