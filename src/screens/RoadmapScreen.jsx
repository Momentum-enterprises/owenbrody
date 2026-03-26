import { useAppStore } from '../store/useAppStore'
import { getRoadmap } from '../lib/tasks'
const PC=['#1B3F72','#1A6B4A','#7B4FD0','#9A5A10','#8B1A1A','#0e6b6b']
const DB={'diff-e':'#E8F8EE','diff-m':'#FEF0E0','diff-h':'#FDE8E8'},CB={'diff-e':'#1A6B4A','diff-m':'#9A5A10','diff-h':'#A02020'},CL={'diff-e':'Easy','diff-m':'Medium','diff-h':'Hard'}
export default function RoadmapScreen({ go }) {
  const { activeTask,stepStates,toggleStep,completeTask,abandonTask,showToast } = useAppStore()
  if (!activeTask) return (
    <div style={{minHeight:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32,textAlign:'center'}}>
      <div style={{fontSize:52,marginBottom:16}}>🗺️</div>
      <h2 style={{fontFamily:'var(--font-serif)',fontSize:24,marginBottom:10}}>No active task</h2>
      <p style={{color:'var(--muted)',marginBottom:28,lineHeight:1.7}}>Head to Discover and accept a task to see your roadmap here.</p>
      <button className="btn-primary" style={{maxWidth:200,margin:'0 auto',padding:'12px 0'}} onClick={()=>go('discover')}>Browse Tasks →</button>
    </div>
  )
  const roadmap=getRoadmap(activeTask)
  let total=0,done=0
  roadmap.phases.forEach((ph,pi)=>ph.steps.forEach((_,si)=>{total++;if(stepStates[pi+'-'+si])done++}))
  const pct=total?Math.round(done/total*100):0
  const allDone=pct===100&&total>0
  const isUnlocked=(pi,si)=>{
    if(pi===0&&si===0)return true
    if(si===0)return roadmap.phases[pi-1]?.steps.every((_,psi)=>stepStates[(pi-1)+'-'+psi])
    return !!stepStates[pi+'-'+(si-1)]
  }
  const handleComplete=()=>{completeTask(activeTask);showToast('🎉 Task completed! XP earned.');go('home')}
  const handleAbandon=()=>{abandonTask();showToast('Task abandoned.');go('home')}
  const dk=activeTask.dc?.split('-')[1]||'e'
  return (
    <div style={{background:'var(--surface)',minHeight:'100%'}}>
      <div style={{background:'linear-gradient(135deg,#1B3F72,#2558A8)',padding:'52px 20px 24px'}}>
        <div style={{fontSize:36,marginBottom:10}}>{activeTask.icon}</div>
        <h1 style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:800,color:'white',marginBottom:8,lineHeight:1.25}}>{activeTask.title}</h1>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
          <span style={{background:'rgba(255,255,255,.15)',color:'white',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:99}}>⏱ {activeTask.time}</span>
          <span style={{background:'rgba(255,255,255,.15)',color:'white',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:99}}>★ {activeTask.xp}</span>
          <span className="diff-badge" style={{background:DB[activeTask.dc],color:CB[activeTask.dc]}}>{CL[activeTask.dc]}</span>
        </div>
        <div style={{display:'flex',gap:16,marginBottom:10}}>
          {[['Done',done],['Left',total-done],['Phases',roadmap.phases.length]].map(([l,n])=>(
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:800,color:'white'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.55)',fontWeight:600}}>{l}</div>
            </div>
          ))}
          <div style={{marginLeft:'auto',textAlign:'right'}}>
            <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:800,color:'white'}}>{pct}%</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.55)',fontWeight:600}}>Complete</div>
          </div>
        </div>
        <div style={{height:5,background:'rgba(255,255,255,.2)',borderRadius:99}}>
          <div style={{height:'100%',width:pct+'%',background:'white',borderRadius:99,transition:'width .4s'}}/>
        </div>
      </div>
      {allDone?(
        <div style={{margin:16}}>
          <div className="card" style={{padding:28,textAlign:'center'}}>
            <div style={{fontSize:52,marginBottom:12}}>✅</div>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:22,marginBottom:8}}>Every step complete.</h2>
            <p style={{color:'var(--muted)',fontSize:13,marginBottom:20,lineHeight:1.65}}>You\'ve done the work. Collect your XP and earn your Verified badge.</p>
            <button className="btn-primary" onClick={handleComplete}>Complete & Collect XP →</button>
          </div>
        </div>
      ):(
        <div style={{padding:16}}>
          {roadmap.phases.map((ph,pi)=>{
            const phDone=ph.steps.filter((_,si)=>stepStates[pi+'-'+si]).length
            const color=PC[pi%PC.length]
            return (
              <div key={pi} className="card" style={{marginBottom:12,overflow:'hidden'}}>
                <div style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid var(--border)'}}>
                  <div style={{width:32,height:32,borderRadius:8,background:color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:'var(--font-serif)',fontWeight:800,fontSize:15,flexShrink:0}}>{pi+1}</div>
                  <div style={{flex:1,fontWeight:700,fontSize:14}}>{ph.title}</div>
                  <div style={{fontSize:12,fontWeight:700,background:color+'18',color,padding:'3px 10px',borderRadius:99}}>{phDone}/{ph.steps.length}</div>
                </div>
                {ph.steps.map((st,si)=>{
                  const isDone=!!stepStates[pi+'-'+si],unlocked=isUnlocked(pi,si),locked=!unlocked&&!isDone
                  return (
                    <div key={si} onClick={()=>!locked&&toggleStep(pi,si)} style={{padding:'13px 16px',display:'flex',gap:12,alignItems:'flex-start',borderBottom:si<ph.steps.length-1?'1px solid var(--border)':'none',cursor:locked?'default':'pointer',opacity:locked?.45:1,background:isDone?'#f8fff9':'white'}}>
                      <div style={{width:26,height:26,borderRadius:99,border:`2px solid ${isDone?'#1A6B4A':unlocked?color:'var(--border)'}`,background:isDone?'#1A6B4A':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                        {isDone&&<span style={{color:'white',fontSize:13,fontWeight:700}}>✓</span>}
                        {locked&&<span style={{fontSize:11}}>🔒</span>}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:13,marginBottom:4,color:isDone?'#1A6B4A':'var(--text)',textDecoration:isDone?'line-through':'none'}}>{st.t}</div>
                        {!locked&&<div style={{fontSize:12,color:'var(--muted)',lineHeight:1.65}}>{st.d}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
          <button onClick={handleAbandon} style={{width:'100%',padding:14,background:'transparent',border:'1.5px solid var(--border)',borderRadius:13,fontFamily:'var(--font-sans)',fontSize:13,fontWeight:600,color:'var(--muted)',cursor:'pointer',marginTop:8}}>Abandon Task</button>
        </div>
      )}
      <div style={{height:16}}/>
    </div>
  )
}