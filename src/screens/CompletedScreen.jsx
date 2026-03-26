import { useAppStore } from '../store/useAppStore'
const DB={'diff-e':'#E8F8EE','diff-m':'#FEF0E0','diff-h':'#FDE8E8'},CB={'diff-e':'#1A6B4A','diff-m':'#9A5A10','diff-h':'#A02020'},CL={'diff-e':'Easy','diff-m':'Medium','diff-h':'Hard'}
export default function CompletedScreen({ go }) {
  const { completedList } = useAppStore()
  return (
    <div style={{background:'var(--surface)',minHeight:'100%'}}>
      <div style={{background:'linear-gradient(135deg,#1B3F72,#2558A8)',padding:'52px 20px 24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <button onClick={()=>go('home')} style={{width:36,height:36,borderRadius:99,background:'rgba(255,255,255,.15)',border:'none',color:'white',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>←</button>
          <div>
            <h1 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:800,color:'white'}}>Completed Tasks</h1>
            <div style={{fontSize:12,color:'rgba(255,255,255,.6)',marginTop:2}}>{completedList.length} task{completedList.length!==1?'s':''} completed</div>
          </div>
        </div>
      </div>
      <div style={{padding:'16px 16px 32px'}}>
        {completedList.length===0?(
          <div style={{textAlign:'center',padding:'60px 24px'}}>
            <div style={{fontSize:52,marginBottom:16}}>🎯</div>
            <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Nothing yet</div>
            <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.6}}>Complete your first task and it\'ll show up here.</div>
            <button className="btn-primary" style={{maxWidth:180,margin:'24px auto 0',display:'block',padding:'12px 0'}} onClick={()=>go('discover')}>Find a Task →</button>
          </div>
        ):(
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {completedList.map((t,i)=>(
              <div key={i} className="card" style={{padding:16,display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:48,height:48,borderRadius:13,background:'var(--blue-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{t.icon||'⚡'}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:5,lineHeight:1.3}}>{t.title}</div>
                  <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
                    <span className="diff-badge" style={{background:DB[t.dc]||'#F0F0F5',color:CB[t.dc]||'#555',fontSize:10,padding:'2px 8px'}}>{CL[t.dc]||''}</span>
                    {t.cat&&<span style={{fontSize:11,color:'var(--muted)'}}>{t.cat}</span>}
                    {t.completedAt&&<span style={{fontSize:11,color:'var(--muted)'}}>· {t.completedAt}</span>}
                  </div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontSize:13,fontWeight:800,color:'var(--purple)'}}>{t.xp}</div>
                  <div style={{fontSize:10,color:'var(--green)',fontWeight:700,marginTop:2}}>✓ Done</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}