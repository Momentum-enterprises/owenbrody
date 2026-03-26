import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
const ROLE_OPTS=[{id:'university',label:'🎓 University Student'},{id:'highschool',label:'📚 High School Student'},{id:'working',label:'💼 Working Professional'},{id:'other',label:'✨ Other'}]
const STRENGTH_OPTS=['Writing','Public Speaking','Coding','Design','Sales','Leadership','Analysis','Creativity']
const GOAL_OPTS=['Get a Job / Internship','Start a Business','Build Skills','Make Money on the Side','Get Certified','Improve Fitness','Network More']
export default function SurveyScreen({ onDone }) {
  const { setSurveyDone, setSurveyProfile, user } = useAppStore()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ role:'',major:'',career:'',strengths:[],goals:[] })
  const next = () => { if(step<4) setStep(s=>s+1); else finish() }
  const finish = () => { setSurveyProfile(data); setSurveyDone(true); onDone() }
  const toggle = (field,val) => setData(d=>({...d,[field]:d[field].includes(val)?d[field].filter(x=>x!==val):[...d[field],val]}))
  const pct = Math.round(((step+1)/5)*100)
  return (
    <div style={{minHeight:'100%',background:'white',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'20px 20px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          {step>0&&<button onClick={()=>setStep(s=>Math.max(0,s-1))} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',color:'var(--muted)'}}>←</button>}
          <div style={{flex:1,marginLeft:step>0?12:0}}>
            <div style={{height:4,background:'var(--border)',borderRadius:99}}>
              <div style={{height:'100%',width:pct+'%',background:'var(--blue)',borderRadius:99,transition:'width .3s'}}/>
            </div>
          </div>
          <span style={{marginLeft:12,fontSize:12,color:'var(--muted)',fontWeight:600}}>{step+1}/5</span>
        </div>
      </div>
      <div style={{flex:1,padding:'24px 20px 32px',overflowY:'auto'}}>
        {step===0&&<>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:26,marginBottom:8}}>Hey {user.name?.split(' ')[0]||'there'} 👋</h2>
          <p style={{color:'var(--muted)',marginBottom:28,fontSize:14}}>Which best describes you?</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {ROLE_OPTS.map(o=><button key={o.id} onClick={()=>{setData(d=>({...d,role:o.id}));setTimeout(next,150)}} style={{padding:'16px 18px',textAlign:'left',background:data.role===o.id?'var(--blue-light)':'var(--surface)',border:`2px solid ${data.role===o.id?'var(--blue)':'var(--border)'}`,borderRadius:14,fontFamily:'var(--font-sans)',fontSize:15,fontWeight:600,cursor:'pointer',color:'var(--text)'}}>{o.label}</button>)}
          </div>
        </>}
        {step===1&&<>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:26,marginBottom:8}}>What\'s your field?</h2>
          <input className="input" placeholder="e.g. Finance, Computer Science…" value={data.major} onChange={e=>setData(d=>({...d,major:e.target.value}))} style={{marginBottom:20}}/>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:22,marginBottom:8}}>Career goal?</h2>
          <input className="input" placeholder="e.g. Investment banking, Software engineer…" value={data.career} onChange={e=>setData(d=>({...d,career:e.target.value}))}/>
          <button className="btn-primary" onClick={next} style={{marginTop:24}}>Continue</button>
        </>}
        {step===2&&<>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:26,marginBottom:8}}>Your strengths</h2>
          <p style={{color:'var(--muted)',marginBottom:24,fontSize:14}}>Pick up to 3</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,marginBottom:28}}>
            {STRENGTH_OPTS.map(s=><button key={s} onClick={()=>toggle('strengths',s)} style={{padding:'10px 16px',borderRadius:99,border:`2px solid ${data.strengths.includes(s)?'var(--blue)':'var(--border)'}`,background:data.strengths.includes(s)?'var(--blue-light)':'white',color:data.strengths.includes(s)?'var(--blue)':'var(--text)',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:700,cursor:'pointer'}}>{s}</button>)}
          </div>
          <button className="btn-primary" onClick={next}>Continue</button>
        </>}
        {step===3&&<>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:26,marginBottom:8}}>Your goals</h2>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:28}}>
            {GOAL_OPTS.map(g=><button key={g} onClick={()=>toggle('goals',g)} style={{padding:'14px 18px',textAlign:'left',background:data.goals.includes(g)?'var(--blue-light)':'var(--surface)',border:`2px solid ${data.goals.includes(g)?'var(--blue)':'var(--border)'}`,borderRadius:14,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:600,cursor:'pointer',color:'var(--text)'}}>{g}</button>)}
          </div>
          <button className="btn-primary" onClick={next}>Finish Setup →</button>
        </>}
        {step===4&&<div style={{textAlign:'center',paddingTop:40}}>
          <div style={{fontSize:60,marginBottom:20}}>🚀</div>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:28,marginBottom:12}}>You\'re all set!</h2>
          <p style={{color:'var(--muted)',marginBottom:36,lineHeight:1.7}}>Your personalised task feed is ready.</p>
          <button className="btn-primary" onClick={finish}>Let\'s Go →</button>
        </div>}
      </div>
    </div>
  )
}