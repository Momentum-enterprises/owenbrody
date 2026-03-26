import { useAppStore } from '../store/useAppStore'
const DC={e:'#E8F8EE',m:'#FEF0E0',h:'#FDE8E8'},CC={e:'#1A6B4A',m:'#9A5A10',h:'#A02020'},CL={e:'Easy',m:'Medium',h:'Hard'}
const dk=(dc)=>dc?.split('-')[1]||'e'
function getGreeting(){const h=new Date().getHours();return h<12?'morning':h<17?'afternoon':'evening'}
export default function HomeScreen({ go }) {
  const { user,activeTask,completed,streak,xp,getSuccessRate,getGlobalRank,getLevel,streakLastDate,claimStreak,showToast } = useAppStore()
  const today=new Date().toISOString().split('T')[0]
  const streakClaimed=streakLastDate===today
  const rate=getSuccessRate(),rank=getGlobalRank(),level=getLevel()
  const firstName=user?.name?.split(' ')[0]||'there'
  const k=dk(activeTask?.dc)
  return (
    <div style={{background:'var(--surface)',minHeight:'100%'}}>
      <div style={{background:'linear-gradient(135deg,#1B3F72,#2558A8)',padding:'52px 20px 28px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:13,color:'rgba(255,255,255,.6)',marginBottom:4}}>Good {getGreeting()}</div>
            <h1 style={{fontFamily:'var(--font-serif)',fontSize:26,color:'white',fontWeight:800}}>{firstName} 👋</h1>
          </div>
          <div style={{background:'rgba(255,255,255,.12)',borderRadius:14,padding:'8px 14px',textAlign:'center',cursor:'pointer'}} onClick={()=>go('profile')}>
            <div style={{fontSize:11,color:'rgba(255,255,255,.6)',fontWeight:700,letterSpacing:.5,textTransform:'uppercase'}}>Level</div>
            <div style={{fontSize:18,fontWeight:800,color:'white',fontFamily:'var(--font-serif)'}}>{level.idx}</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,.55)',fontWeight:600}}>{level.name}</div>
          </div>
        </div>
        <div style={{marginTop:18}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
            <span style={{fontSize:11,color:'rgba(255,255,255,.55)',fontWeight:600}}>{xp.toLocaleString()} XP</span>
            <span style={{fontSize:11,color:'rgba(255,255,255,.55)',fontWeight:600}}>{level.next?'→ '+level.next+' ('+level.nextMin?.toLocaleString()+' XP)':'MAX'}</span>
          </div>
          <div style={{height:5,background:'rgba(255,255,255,.15)',borderRadius:99}}>
            <div style={{height:'100%',width:level.pct+'%',background:'white',borderRadius:99,transition:'width .4s'}}/>
          </div>
        </div>
      </div>
      {!streakClaimed&&(
        <div style={{margin:'16px 16px 0',background:'linear-gradient(135deg,#F5A623,#e8920a)',borderRadius:16,padding:'14px 16px',display:'flex',alignItems:'center',gap:14}}>
          <span style={{fontSize:28}}>🔥</span>
          <div style={{flex:1}}>
            <div style={{color:'white',fontWeight:800,fontSize:14}}>Claim your {streak>0?streak+1+'-day':'first'} streak!</div>
            <div style={{color:'rgba(255,255,255,.7)',fontSize:12,marginTop:2}}>Tap to keep your streak going</div>
          </div>
          <button onClick={()=>{claimStreak();showToast('🔥 Streak claimed!')}} style={{background:'rgba(255,255,255,.2)',border:'none',borderRadius:10,padding:'8px 14px',color:'white',fontFamily:'var(--font-sans)',fontWeight:700,fontSize:13,cursor:'pointer'}}>Claim</button>
        </div>
      )}
      <div style={{padding:'16px 16px 0'}}>
        <div className="stat-grid">
          <div className="stat-cell" style={{cursor:'pointer'}} onClick={()=>go('completed')}>
            <div className="stat-num">{completed}</div><div className="stat-lbl">Completed</div>
          </div>
          <div className="stat-cell"><div className="stat-num">{streak}</div><div className="stat-lbl">Day Streak</div></div>
          <div className="stat-cell"><div className="stat-num">{rank}</div><div className="stat-lbl">Global Rank</div></div>
        </div>
      </div>
      <div style={{padding:'20px 16px 0'}}>
        <div className="sec-head">Active Task</div>
        {activeTask?(
          <div className="card" style={{padding:16,cursor:'pointer'}} onClick={()=>go('roadmap')}>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <div style={{width:46,height:46,borderRadius:13,background:'var(--blue-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{activeTask.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{activeTask.title}</div>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <span className="diff-badge" style={{background:DC[k],color:CC[k]}}>{CL[k]}</span>
                  <span style={{fontSize:11,color:'var(--muted)'}}>{activeTask.time}</span>
                  <span style={{fontSize:11,color:'var(--muted)'}}>· {activeTask.xp}</span>
                </div>
              </div>
              <span style={{color:'var(--blue)',fontWeight:700,fontSize:18}}>›</span>
            </div>
            <div style={{marginTop:12,height:4,background:'var(--border)',borderRadius:99}}>
              <div style={{height:'100%',width:'35%',background:'var(--blue)',borderRadius:99}}/>
            </div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:6}}>View your roadmap →</div>
          </div>
        ):(
          <div className="card" style={{padding:24,textAlign:'center'}}>
            <div style={{fontSize:36,marginBottom:10}}>🎯</div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>No active task</div>
            <div style={{color:'var(--muted)',fontSize:13,marginBottom:16}}>Swipe on a task to get started</div>
            <button className="btn-primary" style={{maxWidth:180,margin:'0 auto',display:'block',padding:'10px 0'}} onClick={()=>go('discover')}>Browse Tasks</button>
          </div>
        )}
      </div>
      <div style={{padding:'20px 16px 0'}}>
        <div className="sec-head">Success Rate</div>
        <div className="card" style={{padding:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontFamily:'var(--font-serif)',fontSize:32,fontWeight:800}}>{rate}%</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Weighted by difficulty</div>
          </div>
          <div style={{height:6,background:'var(--border)',borderRadius:99}}>
            <div style={{height:'100%',width:rate+'%',background:'linear-gradient(90deg,var(--blue),var(--purple))',borderRadius:99,transition:'width .4s'}}/>
          </div>
        </div>
      </div>
      <div style={{height:24}}/>
    </div>
  )
}