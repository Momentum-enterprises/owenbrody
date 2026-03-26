export default function NavBar({ tabs, active, onNav }) {
  return (
    <nav className="navbar">
      {tabs.map(tab => (
        <button key={tab.id} className={`nav-btn ${active===tab.id?'active':''}`} onClick={()=>onNav(tab.id)}>
          <span className="nav-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}