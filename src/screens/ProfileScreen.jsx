import { useAppStore } from '../store/useAppStore'
const DB={'diff-e':'#E8F8EE','diff-m':'#FEF0E0','diff-h':'#FDE8E8'},CB={'diff-e':'#1A6B4A','diff-m':'#9A5A10','diff-h':'#A02020'},CL={'diff-e':'Easy','diff-m':'Medium','diff-h':'Hard'}
export default function ProfileScreen({ go }) {
  const { user,xp,completed,streak,getSuccessRate,getLevel,completedList,signOut,isPremium,setPremium } = useAppStore()
  const rate=getSuccessRate(),level=getLevel()
  const initials=user?.name?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()||'ME'
  return (
    <div style={{background:'var(--surface)',minHeight:'100%'}}>
      <div style={{background:'linear-gradient(135deg,#1B3F72,#2558A8)',padding:'52px 20px 28px',textAlign:'center'}}>
        <div style={{width:72,height:72,borderRadius:99,background:'rgba(255,255,255,.15)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-serif)',fontSize:26,fontWeight:800,color:'white',margin:'0 auto 12px'}}>{initials}</div>
        <h1 style={{fontFamily:'var(--font-serif)',fontSize:22,color:'white',marginBottom:4}}>{user?.name||'Your Name'}</h1>
        <div style={{fontSize:13,color:'rgba(255,255,255,.6)'}}>Level {level.idx} · {level.name}</div>
        {!isPremium&&<button onClick={()=>setPremium(true)} style={{marginTop:14,background:'linear-gradient(135deg,var(--blue-mid),var(--purple))',border:'none',borderRadius:99,padding:'8px 20px',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:700,color:'white',cursor:'pointer'}}>✦ Get Pro</button>}
        {isPremium&&<div style={{marginTop:14,display:'inline-block',background:'rgba(255,255,255,.15)',borderRadius:99,padding:'6px 16px',fontSize:13,fontWeight:700,color:'white'}}>✦ Pro Member</div>}
      </div>
      <div style={{padding:'16px 16px 0'}}>
        <div className="stat-grid">
          <div className="stat-cell"><div className="stat-num">{xp.toLocaleString()}</div><div className="stat-lbl">Total XP</div></div>
          <div className="stat-cell"><div className="stat-num">{completed}</div><div className="stat-lbl">Completed</div></div>
          <div className="stat-cell"><div className="stat-num">{rate}%</div><div className="stat-lbl">Success Rate</div></div>
        </div>
      </div>
      <div style={{padding:'16px 16px 0'}}>
        <div className="sec-head">Level Progress</div>
        <div className="card" style={{padding:16}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <span style={{fontWeight:700,fontSize:14}}>{level.name}</span>
            <span style={{fontSize:13,color:'var(--muted)'}}>{level.pct}%</span>
          </div>
          <div style={{height:8,background:'var(--border)',borderRadius:99}}>
            <div style={{height:'100%',width:level.pct+'%',background:'linear-gradient(90deg,var(--blue),var(--purple))',borderRadius:99,transition:'width .4s'}}/>
          </div>
          {level.next&&<div style={{fontSize:12,color:'var(--muted)',marginTop:8}}>{(level.nextMin-xp).toLocaleString()} XP to {level.next}</div>}
        </div>
      </div>
      <div style={{padding:'16px 16px 0'}}>
        <div className="sec-head">Streak</div>
        <div className="card" style={{padding:16,display:'flex',alignItems:'center',gap:14}}>
          <span style={{fontSize:36}}>🔥</span>
          <div><div style={{fontFamily:'var(--font-serif)',fontSize:28,fontWeight:800}}>{streak} days</div><div style={{fontSize:13,color:'var(--muted)'}}>Current streak</div></div>
        </div>
      </div>
      {completedList.length>0&&(
        <div style={{padding:'16px 16px 0'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 0 10px'}}>
            <div className="sec-head" style={{padding:0}}>Recent Completed</div>
            <button onClick={()=>go('completed')} style={{background:'none',border:'none',fontSize:13,color:'var(--blue)',fontWeight:700,cursor:'pointer'}}>See all →</button>
          </div>
          <div className="card" style={{overflow:'hidden'}}>
            {completedList.slice(0,3).map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',borderBottom:i<Math.min(completedList.length,3)-1?'1px solid var(--border)':'none'}}>
                <div style={{width:38,height:38,borderRadius:11,background:'var(--blue-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{t.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{t.title}</div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span className="diff-badge" style={{background:DB[t.dc],color:CB[t.dc],fontSize:10,padding:'2px 8px'}}>{CL[t.dc]}</span>
                    <span style={{fontSize:11,color:'var(--muted)'}}>{t.completedAt}</span>
                  </div>
                </div>
                <div style={{fontWeight:800,fontSize:13,color:'var(--purple)'}}>{t.xp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{padding:'16px 16px 32px'}}>
        <button onClick={signOut} style={{width:'100%',padding:14,background:'white',border:'1.5px solid var(--border)',borderRadius:13,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:600,color:'var(--muted)',cursor:'pointer'}}>Sign Out</button>
      </div>
    </div>
  )
}