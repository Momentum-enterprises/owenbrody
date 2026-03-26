import { useAppStore } from '../store/useAppStore'
const USERS=[{n:'Alex M.',i:'AM',bg:'#1B3F72',xp:'12,400',st:'🔥34d',r:1},{n:'Jordan K.',i:'JK',bg:'#7B4FD0',xp:'11,800',st:'🔥28d',r:2},{n:'Sam R.',i:'SR',bg:'#1A6B4A',xp:'10,200',st:'🔥21d',r:3},{n:'Casey L.',i:'CL',bg:'#9A5A10',xp:'8,900',st:'🔥15d',r:4},{n:'Riley T.',i:'RT',bg:'#8B1A1A',xp:'7,600',st:'🔥12d',r:5},{n:'Morgan B.',i:'MB',bg:'#0e6b6b',xp:'6,200',st:'🔥9d',r:6},{n:'Taylor P.',i:'TP',bg:'#3730a3',xp:'5,100',st:'🔥7d',r:7},{n:'Drew C.',i:'DC',bg:'#854d0e',xp:'4,300',st:'🔥5d',r:8},{n:'Quinn S.',i:'QS',bg:'#166534',xp:'3,500',st:'🔥3d',r:9}]
const M={1:'🥇',2:'🥈',3:'🥉'}
export default function LeaderboardScreen() {
  const { user,xp,streak,getGlobalRank } = useAppStore()
  const initials=user?.name?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()||'ME'
  const rank=getGlobalRank()
  const rankNum=parseInt(rank.replace(/[^0-9]/g,''))||999
  return (
    <div style={{background:'var(--surface)',minHeight:'100%'}}>
      <div style={{background:'linear-gradient(135deg,#1B3F72,#2558A8)',padding:'52px 20px 24px'}}>
        <h1 style={{fontFamily:'var(--font-serif)',fontSize:26,color:'white',fontWeight:800,marginBottom:4}}>Leaderboard</h1>
        <p style={{color:'rgba(255,255,255,.6)',fontSize:13}}>Global rankings by XP</p>
      </div>
      <div style={{margin:'16px 16px 0'}}>
        <div className="card" style={{padding:16,display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:44,height:44,borderRadius:99,background:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:15}}>{initials}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{user?.name||'You'}</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>{xp.toLocaleString()} XP · 🔥 {streak}-day streak</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:800,color:'var(--blue)'}}>{rank}</div>
            <div style={{fontSize:11,color:'var(--muted)',fontWeight:600}}>Your rank</div>
          </div>
        </div>
      </div>
      <div style={{padding:'16px 16px'}}>
        <div className="card" style={{overflow:'hidden'}}>
          {USERS.map((u,idx)=>(
            <div key={u.r} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',borderBottom:idx<USERS.length-1?'1px solid var(--border)':'none'}}>
              <div style={{width:28,textAlign:'center',fontWeight:800,fontSize:u.r<=3?20:14,color:u.r<=3?'inherit':'var(--muted)'}}>{M[u.r]||u.r}</div>
              <div style={{width:38,height:38,borderRadius:99,background:u.bg,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:13,flexShrink:0}}>{u.i}</div>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{u.n}</div><div style={{fontSize:12,color:'var(--muted)'}}>{u.st}</div></div>
              <div style={{fontWeight:800,fontSize:14,color:'var(--purple)'}}>{u.xp} XP</div>
            </div>
          ))}
          {rankNum>USERS.length&&<>
            <div style={{padding:'8px 16px',fontSize:11,fontWeight:600,letterSpacing:1,textTransform:'uppercase',color:'var(--muted)',borderTop:'2px dashed var(--border)'}}>Your position</div>
            <div style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',background:'var(--blue-light)'}}>
              <div style={{width:28,textAlign:'center',fontWeight:800,fontSize:14,color:'var(--muted)'}}>{rankNum}</div>
              <div style={{width:38,height:38,borderRadius:99,background:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:13,flexShrink:0}}>{initials}</div>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{user?.name||'You'}</div><div style={{fontSize:12,color:'var(--muted)'}}>🔥{streak}d</div></div>
              <div style={{fontWeight:800,fontSize:14,color:'var(--purple)'}}>{xp.toLocaleString()} XP</div>
            </div>
          </>}
        </div>
      </div>
    </div>
  )
}