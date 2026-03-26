import { create } from 'zustand'
const ls = {
  get: (k, fb=null) => { try { const v=localStorage.getItem(k); return v!==null?JSON.parse(v):fb } catch { return fb } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
}
const getLocalDateStr = () => new Date().toISOString().split('T')[0]
export const useAppStore = create((set, get) => ({
  loggedIn: ls.get('momentum_logged_in', false),
  surveyDone: ls.get('momentum_survey_done', false),
  user: ls.get('momentum_user', { name:'', email:'' }),
  activeTask: ls.get('momentum_active_task', null),
  stepStates: ls.get('momentum_step_states', {}),
  taskStarted: ls.get('momentum_task_started', null),
  xp: ls.get('momentum_xp', 0),
  completed: ls.get('momentum_completed', 0),
  attempts: ls.get('momentum_attempts', 0),
  streak: ls.get('momentum_streak_count', 0),
  streakLastDate: ls.get('momentum_streak_last_date', ''),
  streakFreezes: ls.get('momentum_streak_freezes', 0),
  weightedEarned: ls.get('momentum_weighted_earned', 0),
  weightedPossible: ls.get('momentum_weighted_possible', 0),
  completedList: ls.get('momentum_completed_list', []),
  seenIds: ls.get('momentum_seen_ids', []),
  swipesLeft: ls.get('momentum_swipes_left', 10),
  isPremium: ls.get('momentum_premium', false),
  surveyProfile: ls.get('momentum_survey_data', { name:'',email:'',role:'university',major:'',career:'',strengths:[],goals:[],city:'',state:'' }),
  toast: null, toastTimer: null,
  setLoggedIn: (v) => { ls.set('momentum_logged_in', v); set({ loggedIn: v }) },
  setSurveyDone: (v) => { ls.set('momentum_survey_done', v); set({ surveyDone: v }) },
  setUser: (u) => { ls.set('momentum_user', u); set({ user: u }) },
  setSurveyProfile: (p) => { ls.set('momentum_survey_data', p); set({ surveyProfile: p }) },
  acceptTask: (task) => {
    ls.set('momentum_active_task', task); ls.set('momentum_step_states', {}); ls.set('momentum_task_started', Date.now());
    set({ activeTask: task, stepStates: {}, taskStarted: Date.now() })
  },
  toggleStep: (pi, si) => {
    const { stepStates } = get(); const key = pi+'-'+si;
    const n = { ...stepStates, [key]: !stepStates[key] };
    ls.set('momentum_step_states', n); set({ stepStates: n })
  },
  completeTask: (task) => {
    const { xp, completed, attempts, completedList, weightedEarned, weightedPossible } = get();
    const xpVal = parseInt(String(task.xp||'350').replace(/\D/g,''))||350;
    const w = task.dc==='diff-h'?2:task.dc==='diff-e'?1:1.5;
    const entry = { id:task.id,title:task.title,icon:task.icon||'⚡',cat:task.cat,dc:task.dc,xp:task.xp,
      completedAt:new Date().toLocaleDateString([],{month:'short',day:'numeric',year:'numeric'}) };
    const newList = [entry,...completedList].slice(0,100);
    ls.set('momentum_xp', xp+xpVal); ls.set('momentum_completed', completed+1); ls.set('momentum_attempts', attempts+1);
    ls.set('momentum_weighted_earned', weightedEarned+w); ls.set('momentum_weighted_possible', weightedPossible+w);
    ls.set('momentum_completed_list', newList); ls.set('momentum_active_task', null); ls.set('momentum_step_states', {});
    set({ xp:xp+xpVal,completed:completed+1,attempts:attempts+1,weightedEarned:weightedEarned+w,weightedPossible:weightedPossible+w,completedList:newList,activeTask:null,stepStates:{} })
  },
  abandonTask: () => {
    const { attempts, weightedPossible, activeTask } = get();
    const w = activeTask?.dc==='diff-h'?2:activeTask?.dc==='diff-e'?1:1.5;
    ls.set('momentum_attempts', attempts+1); ls.set('momentum_weighted_possible', weightedPossible+(w*0.5));
    ls.set('momentum_active_task', null); ls.set('momentum_step_states', {});
    set({ attempts:attempts+1,weightedPossible:weightedPossible+(w*0.5),activeTask:null,stepStates:{} })
  },
  claimStreak: () => {
    const { streak, streakLastDate, streakFreezes } = get(); const today = getLocalDateStr();
    if (streakLastDate===today) return;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
    const yStr = yesterday.toISOString().split('T')[0];
    let newStreak = streakLastDate===yStr ? streak+1 : 1;
    ls.set('momentum_streak_count', newStreak); ls.set('momentum_streak_last_date', today);
    set({ streak:newStreak, streakLastDate:today })
  },
  addSeenId: (id) => {
    const { seenIds } = get(); const next=[...new Set([...seenIds,id])];
    ls.set('momentum_seen_ids', next); set({ seenIds:next })
  },
  setPremium: (v) => { ls.set('momentum_premium', v); set({ isPremium:v }) },
  showToast: (msg) => {
    const { toastTimer } = get(); if (toastTimer) clearTimeout(toastTimer);
    const timer = setTimeout(()=>set({toast:null,toastTimer:null}),2500);
    set({ toast:msg, toastTimer:timer })
  },
  signOut: () => { localStorage.clear(); set({ loggedIn:false,surveyDone:false,user:{},activeTask:null,stepStates:{},xp:0,completed:0,streak:0,completedList:[] }) },
  getSuccessRate: () => { const {weightedEarned,weightedPossible}=get(); return weightedPossible?Math.round((weightedEarned/weightedPossible)*100):0 },
  getGlobalRank: () => { const {xp}=get(); if(xp>=10000)return'#12';if(xp>=5000)return'#48';if(xp>=2000)return'#124';if(xp>=500)return'#389';return'#1,204' },
  getLevel: () => {
    const {xp}=get();
    const levels=[{name:'Rookie',min:0},{name:'Motivated',min:100},{name:'Consistent',min:250},{name:'Committed',min:500},{name:'Rising Star',min:900},{name:'Achiever',min:1500},{name:'Builder',min:2400},{name:'Go-Getter',min:3600},{name:'Hustler',min:5200},{name:'Pro',min:7200},{name:'Sharp',min:9700},{name:'Relentless',min:12700},{name:'Clutch',min:16200},{name:'Powerhouse',min:20200},{name:'Legend',min:25200},{name:'Elite',min:31200},{name:'Vanguard',min:38700},{name:'Trailblazer',min:47700},{name:'Icon',min:58700},{name:'Momentum Legend',min:72200}];
    let level=levels[0],idx=0;
    for(let i=levels.length-1;i>=0;i--){if(xp>=levels[i].min){level=levels[i];idx=i;break}}
    const next=levels[idx+1]; const pct=next?Math.round(((xp-level.min)/(next.min-level.min))*100):100;
    return {...level,idx:idx+1,total:levels.length,next:next?.name,nextMin:next?.min,pct}
  },
}))