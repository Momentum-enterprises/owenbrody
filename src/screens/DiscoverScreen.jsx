import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { TASKS, buildLocalTask } from '../lib/tasks'
const DC={'diff-e':'#E8F8EE','diff-m':'#FEF0E0','diff-h':'#FDE8E8'},CC={'diff-e':'#1A6B4A','diff-m':'#9A5A10','diff-h':'#A02020'},CL={'diff-e':'Easy','diff-m':'Medium','diff-h':'Hard'}
const CATS=['All','Professional','Business','Tech','Certification','Finance','Content','Fitness']
export default function DiscoverScreen({ onAccept }) {
  const { seenIds,activeTask,addSeenId,showToast } = useAppStore()
  const [idx,setIdx]=useState(0),[swiping,setSwiping]=useState(null),[showAI,setShowAI]=useState(false)
  const [aiInput,setAiInput]=useState(''),[aiLoading,setAiLoading]=useState(false)
  const [aiProgress,setAiProgress]=useState(0),[aiStatus,setAiStatus]=useState('Building your roadmap…')
  const [aiResult,setAiResult]=useState(null),[filter,setFilter]=useState('All')
  const deck=TASKS.filter(t=>!seenIds.includes(t.id)&&(filter==='All'||t.cat===filter))
  const card=deck[idx%Math.max(deck.length,1)]
  const doSkip=()=>{if(!card)return;setSwiping('left');addSeenId(card.id);setTimeout(()=>{setSwiping(null);setIdx(i=>i+1)},300)}
  const doAccept=()=>{if(!card)return;if(activeTask){showToast('Finish your current task first!');return};setSwiping('right');addSeenId(card.id);setTimeout(()=>{setSwiping(null);onAccept(card)},300)}
  const generateAI=async()=>{
    if(!aiInput.trim())return;setAiLoading(true);setAiProgress(0);setAiResult(null)
    const msgs=['Building your roadmap…','Thinking through phases…','Finding best resources…','Almost done…']
    let mi=0;const iv=setInterval(()=>{setAiProgress(p=>Math.min(p+6,90));if(mi<msgs.length-1){mi++;setAiStatus(msgs[mi])}},800)
    await new Promise(r=>setTimeout(r,3500));clearInterval(iv)
    const task=buildLocalTask(aiInput);setAiProgress(100);setAiStatus('Your roadmap is ready!')
    setTimeout(()=>{setAiLoading(false);setAiResult(task)},600)
  }
  const acceptAI=()=>{if(!aiResult)return;if(activeTask){showToast('Finish your current task first!');return};setShowAI(false);setAiResult(null);setAiInput('');onAccept(aiResult)}
  return (
    <div style={{background:'var(--surface)',minHeight:'100%'}}>
      <div style={{background:'white',padding:'52px 20px 16px',borderBottom:'1px solid var(--border)'}}>
        <h1 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:800,marginBottom:14}}>Discover Tasks</h1>
        <div className="h-scroll">
          {CATS.map(c=><button key={c} onClick={()=>{setFilter(c);setIdx(0)}} style={{flexShrink:0,padding:'7px 16px',borderRadius:99,border:'none',background:filter===c?'var(--blue)':'var(--surface)',color:filter===c?'white':'var(--text)',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:700,cursor:'pointer'}}>{c}</button>)}
        </div>
      </div>
      <div style={{padding:'20px 16px'}}>
        {card?(
          <>
            <div style={{fontSize:12,color:'var(--muted)',textAlign:'center',marginBottom:10,fontWeight:600}}>← skip · tap → to accept</div>
            <div className="card" style={{padding:0,overflow:'hidden',cursor:'grab',transform:swiping==='right'?'translateX(110%) rotate(8deg)':swiping==='left'?'translateX(-110%) rotate(-8deg)':'none',opacity:swiping?0:1,transition:swiping?'transform .28s ease, opacity .28s':'none'}}>
              <div style={{height:160,background:'linear-gradient(135deg,var(--blue-light),#ddeeff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:60}}>{card.icon}</div>
              <div style={{padding:'18px 18px 22px'}}>
                <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
                  <span className="diff-badge" style={{background:DC[card.dc],color:CC[card.dc]}}>{CL[card.dc]}</span>
                  <span style={{fontSize:11,background:'var(--surface)',color:'var(--muted)',padding:'3px 10px',borderRadius:99,fontWeight:600}}>{card.cat}</span>
                  <span style={{fontSize:11,background:'var(--surface)',color:'var(--muted)',padding:'3px 10px',borderRadius:99,fontWeight:600}}>⏱ {card.time}</span>
                </div>
                <h2 style={{fontFamily:'var(--font-serif)',fontSize:21,fontWeight:700,marginBottom:8,lineHeight:1.25}}>{card.title}</h2>
                <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.65,marginBottom:18}}>{card.desc}</p>
                <div style={{display:'flex',gap:10}}>
                  <button onClick={doSkip} style={{flex:1,padding:13,background:'var(--surface)',border:'1.5px solid var(--border)',borderRadius:13,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:700,cursor:'pointer',color:'var(--muted)'}}>✕ Skip</button>
                  <button onClick={doAccept} style={{flex:1,padding:13,background:'var(--blue)',border:'none',borderRadius:13,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:700,cursor:'pointer',color:'white'}}>✓ Accept</button>
                </div>
              </div>
            </div>
          </>
        ):(
          <div className="card" style={{padding:32,textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:12}}>🎉</div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:6}}>You\'ve seen everything!</div>
            <div style={{color:'var(--muted)',fontSize:13}}>Try a different category or create a custom task with AI.</div>
          </div>
        )}
      </div>
      <div style={{padding:'0 16px 32px'}}>
        <button onClick={()=>setShowAI(true)} style={{width:'100%',padding:16,background:'linear-gradient(135deg,#1B3F72,#7B4FD0)',border:'none',borderRadius:16,fontFamily:'var(--font-sans)',fontSize:15,fontWeight:700,color:'white',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          <span style={{fontSize:18}}>✦</span> Create Any Task with AI
        </button>
      </div>
      {showAI&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&!aiLoading&&setShowAI(false)}>
          <div className="modal-sheet" style={{maxHeight:'90%',overflowY:'auto'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div style={{width:44,height:44,background:'linear-gradient(135deg,#3730a3,#7B4FD0)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>✦</div>
              <div><div style={{fontFamily:'var(--font-serif)',fontSize:18,fontWeight:700}}>Create Any Task</div><div style={{fontSize:12,color:'var(--muted)'}}>AI builds a full roadmap for anything</div></div>
            </div>
            {!aiLoading&&!aiResult&&<>
              <textarea className="input" rows={4} placeholder="e.g. Help me make a YouTube channel for my car wash business…" value={aiInput} onChange={e=>setAiInput(e.target.value)} style={{resize:'none',marginBottom:14}}/>
              <button className="btn-primary" onClick={generateAI}>✦ Generate My Roadmap</button>
              <button onClick={()=>setShowAI(false)} style={{width:'100%',padding:14,background:'none',border:'none',fontFamily:'var(--font-sans)',fontSize:14,color:'var(--muted)',cursor:'pointer',marginTop:8}}>Cancel</button>
            </>}
            {aiLoading&&(
              <div style={{background:'linear-gradient(135deg,#0d1f3c,#1a0a35)',borderRadius:14,padding:24,textAlign:'center'}}>
                <div style={{fontSize:32,marginBottom:12}}>⚡</div>
                <div style={{fontSize:15,fontWeight:700,color:'white',marginBottom:4}}>{aiStatus}</div>
                <div style={{height:6,background:'rgba(255,255,255,.15)',borderRadius:99,margin:'16px 0 8px'}}>
                  <div style={{height:'100%',width:aiProgress+'%',background:'linear-gradient(90deg,#7B4FD0,#2EB8A0)',borderRadius:99,transition:'width .4s ease'}}/>
                </div>
              </div>
            )}
            {aiResult&&<>
              <div className="card" style={{padding:16,marginBottom:16}}>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{fontSize:32,width:48,height:48,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--blue-light)',borderRadius:12}}>{aiResult.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{aiResult.title}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>{aiResult.cat} · {aiResult.diff} · {aiResult.time} · ★ {aiResult.xp}</div>
                  </div>
                </div>
                <p style={{fontSize:13,color:'var(--muted)',marginTop:10,lineHeight:1.6}}>{aiResult.desc}</p>
              </div>
              <button className="btn-primary" onClick={acceptAI}>Accept This Task →</button>
              <button onClick={()=>{setAiResult(null);setAiInput('')}} style={{width:'100%',padding:14,background:'none',border:'none',fontFamily:'var(--font-sans)',fontSize:14,color:'var(--muted)',cursor:'pointer',marginTop:8}}>Try Again</button>
            </>}
          </div>
        </div>
      )}
    </div>
  )
}