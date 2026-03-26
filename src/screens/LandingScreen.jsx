import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
export default function LandingScreen({ onDone }) {
  const { setLoggedIn, setUser } = useAppStore()
  const [mode, setMode] = useState('landing')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const handleSignup = (e) => { e.preventDefault(); if(!name||!email||!pass)return; setUser({name,email}); setLoggedIn(true); onDone() }
  const handleLogin = (e) => { e.preventDefault(); setUser({name:'User',email}); setLoggedIn(true); onDone() }
  if (mode==='login') return (
    <div style={{padding:'40px 24px',display:'flex',flexDirection:'column',minHeight:'100%'}}>
      <button onClick={()=>setMode('landing')} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',alignSelf:'flex-start',marginBottom:24}}>←</button>
      <h1 style={{fontFamily:'var(--font-serif)',fontSize:28,marginBottom:8}}>Welcome back</h1>
      <p style={{color:'var(--muted)',fontSize:14,marginBottom:32}}>Log in to your Momentum account</p>
      <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:14}}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} required />
        <button type="submit" className="btn-primary" style={{marginTop:8}}>Log In</button>
      </form>
    </div>
  )
  if (mode==='signup') return (
    <div style={{padding:'40px 24px',display:'flex',flexDirection:'column',minHeight:'100%'}}>
      <button onClick={()=>setMode('landing')} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',alignSelf:'flex-start',marginBottom:24}}>←</button>
      <h1 style={{fontFamily:'var(--font-serif)',fontSize:28,marginBottom:8}}>Create your account</h1>
      <p style={{color:'var(--muted)',fontSize:14,marginBottom:32}}>Start building real skills today</p>
      <form onSubmit={handleSignup} style={{display:'flex',flexDirection:'column',gap:14}}>
        <input className="input" type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} minLength={6} required />
        <button type="submit" className="btn-primary" style={{marginTop:8}}>Create Account</button>
      </form>
    </div>
  )
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',background:'linear-gradient(160deg,#0d1f3c,#1a0a35)'}}>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 24px 40px',textAlign:'center'}}>
        <div style={{width:80,height:80,background:'linear-gradient(135deg,#1B3F72,#7B4FD0)',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:38,marginBottom:28}}>⚡</div>
        <h1 style={{fontFamily:'var(--font-serif)',fontSize:36,fontWeight:800,color:'white',marginBottom:14,lineHeight:1.15}}>Build Skills.<br/>Get Verified.</h1>
        <p style={{color:'rgba(255,255,255,.6)',fontSize:15,lineHeight:1.7,maxWidth:300}}>Complete real-world tasks, submit proof, and earn verified credentials employers actually care about.</p>
      </div>
      <div style={{padding:'0 20px 32px',display:'flex',flexDirection:'column',gap:10}}>
        {[['✅ Verified proof of work','Not just a certificate — real evidence'],['🗺️ AI-built roadmaps','Step-by-step plans for any goal'],['🏆 Global leaderboard','Compete with driven people worldwide']].map(([t,s])=>(
          <div key={t} style={{background:'rgba(255,255,255,.07)',borderRadius:14,padding:'12px 16px'}}>
            <div style={{color:'white',fontSize:13,fontWeight:700}}>{t}</div>
            <div style={{color:'rgba(255,255,255,.5)',fontSize:12,marginTop:1}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{padding:'0 20px 40px',display:'flex',flexDirection:'column',gap:12}}>
        <button className="btn-primary" onClick={()=>setMode('signup')}>Get Started — It\'s Free</button>
        <button onClick={()=>setMode('login')} style={{background:'none',border:'1.5px solid rgba(255,255,255,.2)',borderRadius:14,padding:14,color:'rgba(255,255,255,.7)',fontFamily:'var(--font-sans)',fontSize:15,fontWeight:600,cursor:'pointer'}}>I already have an account</button>
      </div>
    </div>
  )
}