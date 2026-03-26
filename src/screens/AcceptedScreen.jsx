import { useAppStore } from '../store/useAppStore'
export default function AcceptedScreen() {
  const { activeTask } = useAppStore()
  return (
    <div style={{minHeight:'100%',background:'linear-gradient(160deg,#1B3F72,#0d1020)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:32}}>
      <div style={{fontSize:72,marginBottom:20}}>🎯</div>
      <h1 style={{fontFamily:'var(--font-serif)',fontSize:30,color:'white',marginBottom:12}}>Task Accepted!</h1>
      <p style={{color:'rgba(255,255,255,.6)',fontSize:15,lineHeight:1.7}}>{activeTask?.title||'Your task'}<br/>is now active. Let\'s get to work.</p>
      <style>{`@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}`}</style>
    </div>
  )
}