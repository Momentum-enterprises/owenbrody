export const TASKS = [
  {id:'linkedin',icon:'💼',title:'Build a LinkedIn Profile That Gets Noticed',cat:'Professional',diff:'Easy',dc:'diff-e',time:'3 days',xp:'200 XP',invest:'~$0',desc:'Create a complete, professional LinkedIn profile that attracts recruiters and opportunities in your target field.'},
  {id:'excel',icon:'📊',title:'Get Excel Certified',cat:'Certification',diff:'Medium',dc:'diff-m',time:'2 weeks',xp:'350 XP',invest:'~$15',desc:'Complete the Microsoft Office Specialist Excel certification. A credential that shows up on every finance and ops job posting.'},
  {id:'cold-email',icon:'📧',title:'Land $500 Through Cold Email',cat:'Business',diff:'Medium',dc:'diff-m',time:'2 weeks',xp:'350 XP',invest:'~$0',desc:'Write and send 50 cold emails, land at least one paying client, and collect your first $500.'},
  {id:'interviews',icon:'🤝',title:'Complete 3 Informational Interviews',cat:'Professional',diff:'Easy',dc:'diff-e',time:'1 week',xp:'250 XP',invest:'~$0',desc:'Reach out and have real conversations with 3 professionals in your target field.'},
  {id:'side-hustle',icon:'💵',title:'Earn $1K From a Side Hustle',cat:'Business',diff:'Hard',dc:'diff-h',time:'6 weeks',xp:'500 XP',invest:'~$50',desc:'Start and generate $1,000 in revenue from a side hustle before the deadline.'},
  {id:'python',icon:'🐍',title:'Build and Deploy a Python Script',cat:'Tech',diff:'Medium',dc:'diff-m',time:'2 weeks',xp:'350 XP',invest:'~$0',desc:'Write a useful Python script, push it to GitHub, and deploy it somewhere publicly accessible.'},
  {id:'youtube',icon:'📱',title:'Launch a YouTube Channel',cat:'Content',diff:'Hard',dc:'diff-h',time:'4 weeks',xp:'450 XP',invest:'~$0',desc:'Create, upload, and grow a YouTube channel to 100 subscribers with consistent content.'},
  {id:'5k',icon:'🏃',title:'Run Your First 5K',cat:'Fitness',diff:'Medium',dc:'diff-m',time:'4 weeks',xp:'300 XP',invest:'~$0',desc:'Train and complete a 5K run, tracked and verified with Strava or GPS data.'},
  {id:'portfolio',icon:'🎨',title:'Build a Portfolio Website',cat:'Tech',diff:'Medium',dc:'diff-m',time:'1 week',xp:'300 XP',invest:'~$0',desc:'Design and publish a personal portfolio site showcasing your work and skills.'},
  {id:'networking',icon:'🌐',title:'Attend 3 Networking Events',cat:'Professional',diff:'Easy',dc:'diff-e',time:'1 month',xp:'200 XP',invest:'~$0',desc:'Show up to 3 real networking events and collect at least 5 business contacts from each.'},
  {id:'investing',icon:'📈',title:'Open and Fund an Investment Account',cat:'Finance',diff:'Easy',dc:'diff-e',time:'1 week',xp:'200 XP',invest:'~$100',desc:'Open a brokerage account, fund it, and make your first index fund investment.'},
]
const GENERIC={phases:[
  {title:'Research & Planning',steps:[{t:'Define your goal and success metric',d:'Write down exactly what success looks like. One measurable outcome. Use a Google Doc to track throughout.'},{t:'Study 3 people already doing this',d:'Search YouTube, Reddit, and Google. Write down the 3 most common steps they took.'},{t:'List every resource and tool you need',d:'Identify free tools, skills to learn, and costs. Bookmark 5 tutorials.'}]},
  {title:'Setup & Foundation',steps:[{t:'Create all accounts and tools',d:'Set up every platform using a professional email. Consistency across platforms matters.'},{t:'Complete one beginner tutorial fully',d:"Find the highest-rated free tutorial. Watch it fully, pausing to take notes. Don't skip ahead."},{t:'Build your first rough version',d:"Create your first piece of work. Done and imperfect beats perfect and never started."}]},
  {title:'Execute & Grow',steps:[{t:'Publish or launch publicly',d:'Post the video, list the service, submit the application. Real-world feedback beats planning.'},{t:'5 days in a row without skipping',d:'Spend 30+ minutes every day for 5 straight days. Missing one day doubles the chance you quit.'},{t:'Analyse results and adjust',d:'After 5 days, review what is working. Double down on what works, cut what got zero.'}]},
  {title:'Complete & Verify',steps:[{t:'Hit your first real milestone',d:'Push until you reach your success metric. Document it for your Proof of Work submission.'},{t:'Submit Proof of Work',d:"Gather evidence and submit through Momentum's Proof of Work feature. Badge awarded within 48 hours."}]},
]}
const ROADMAPS={
  linkedin:{phases:[
    {title:'Profile photo & headline',steps:[{t:'Take a professional profile photo',d:'Stand near a window facing light, plain wall behind. Have someone take it — selfies distort your face. Both eyes sharp, natural smile, face filling 60% of frame.'},{t:"Delete LinkedIn's auto-filled headline",d:"LinkedIn defaults to your job title. This is wasted space. Nobody searches 'Student at University of Texas.'"},{t:'Write a headline using the formula',d:'"[What you are] | [What you offer] | [What you want]." Example: "Finance student | Excel & modelling | Targeting investment banking." Under 200 characters.'}]},
    {title:'Fill every section completely',steps:[{t:'Write your About section (150-200 words)',d:"Three paragraphs: who you are + what drives you, your single most impressive achievement with a number, and what you're looking for."},{t:'Add every job, club, and project',d:'Every bullet starts with a past-tense action verb and includes a number. "Assisted with marketing" → "Designed 4 weekly emails sent to 300 subscribers."'},{t:'Add 10 skills using exact job posting keywords',d:'Open 3 job postings for your target role. Underline every skill keyword. Add those exact phrases to your profile.'}]},
    {title:'Connect and get endorsements',steps:[{t:'Send 20 connection requests with personalised notes',d:'Connect with classmates, professors, alumni, and professionals. One sentence personalising the note doubles acceptance rate.'},{t:'Ask 3 people for a LinkedIn recommendation',d:'Message a professor, manager, or teammate. Give them bullet points about what you worked on together.'}]},
  ]},
  excel:{phases:[
    {title:'Set up your study environment',steps:[{t:"Download Excel and GCFGlobal's free course",d:"Go to gcfglobal.org/en/excel — 100% free, no login. Complete the first 5 lessons before anything else."},{t:'Learn the 20 most common functions',d:'SUM, AVERAGE, IF, VLOOKUP, XLOOKUP, INDEX/MATCH, COUNTIF, SUMIF, LEFT, RIGHT, MID, TRIM, TODAY, ROUND, MIN, MAX, AND, OR. Google each one.'},{t:'Practice on a real dataset',d:'Download a free dataset from Kaggle.com. Build a pivot table, add 3 formulas, create one chart. Teaches more than 5 hours of tutorials.'}]},
    {title:'Prepare for the MOS exam',steps:[{t:'Buy the official MOS Excel practice exam ($35)',d:'Go to certiport.com → Practice Tests. Complete it twice before booking the real exam.'},{t:'Book your exam at a Certiport testing centre',d:'Go to certiport.com → Locate a testing centre. Exam costs $70-100. Book 1 week out — deadline forces preparation.'}]},
    {title:'Pass and document',steps:[{t:'Pass the MOS Excel exam',d:"You need 700/1000 to pass. If you've done the practice exam twice, you will pass."},{t:'Add the certification to LinkedIn and your resume',d:'LinkedIn → Licences & Certifications → Add. "Microsoft Office Specialist: Excel Associate" with exact date.'}]},
  ]},
}
export function getRoadmap(task) {
  if (task?.aiGenerated && task?._roadmap?.phases?.length) return task._roadmap
  return ROADMAPS[task?.id] || GENERIC
}
export function buildLocalTask(userInput) {
  const inp=userInput.toLowerCase()
  const catMap=[
    {cat:'Content',icon:'📱',keys:['youtube','tiktok','instagram','channel','video','podcast','social','content','stream','blog','vlog']},
    {cat:'Business',icon:'🚀',keys:['business','startup','brand','sell','ecommerce','shop','client','customer','freelance','service','agency']},
    {cat:'Finance',icon:'📈',keys:['invest','stock','crypto','money','income','budget','saving','wealth','trading','financial']},
    {cat:'Tech',icon:'💻',keys:['code','app','website','software','programming','python','javascript','developer','data','ai']},
    {cat:'Fitness',icon:'💪',keys:['workout','gym','run','fitness','weight','muscle','marathon','sport','health','diet']},
    {cat:'Certification',icon:'📜',keys:['certif','license','exam','course','learn','study','degree','skill']},
    {cat:'Professional',icon:'💼',keys:['job','career','interview','resume','linkedin','networking','internship','promotion']},
    {cat:'Creative',icon:'🎨',keys:['design','art','music','photo','film','draw','write','creative','paint','edit']},
    {cat:'Academic',icon:'📚',keys:['school','college','university','gpa','essay','research','grade']},
    {cat:'Mindset',icon:'🧠',keys:['habit','routine','mindset','confidence','anxiety','meditation','focus','discipline','productivity']},
  ]
  let cat='Life Skills',icon='⚡'
  for(const c of catMap){if(c.keys.some(k=>inp.includes(k))){cat=c.cat;icon=c.icon;break}}
  const isHard=/business|startup|launch|build|master|fluent|degree|invest|certification|app|software/.test(inp)
  const isEasy=/start|try|begin|first|basic|simple|intro/.test(inp)&&!isHard
  const diff=isHard?'Hard':isEasy?'Easy':'Medium'
  const dc=diff==='Hard'?'diff-h':diff==='Easy'?'diff-e':'diff-m'
  const time=diff==='Hard'?'4-6 weeks':diff==='Easy'?'3-5 days':'1-2 weeks'
  const xp=diff==='Hard'?500:diff==='Easy'?200:350
  const cleanInput=userInput.replace(/^(help me |i want to |i need to |how to |make |create |start |build |learn )/i,'').trim()
  const title=cleanInput.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ').slice(0,45)
  return {
    id:'ai-'+Date.now(),title,cat,diff,dc,time,xp:xp+' XP',icon,invest:'~$0',aiGenerated:true,
    desc:'A structured roadmap to help you '+userInput.toLowerCase()+'. Follow each phase in order.',
    _roadmap:{phases:[
      {title:'Research & Planning',steps:[{t:'Define your goal and success metric',d:'Write down what success looks like for "'+userInput+'" in 30 days. Set 1 measurable outcome. Track it in a Google Doc.'},{t:'Study 3 people already doing this',d:'Search YouTube, Reddit, and Google. Write down the 3 most common steps they all took. Saves weeks of trial and error.'},{t:'List tools and resources needed',d:'Identify free tools, skills to learn, and costs. Keep startup costs under $50 if possible. Bookmark 5 tutorials.'}]},
      {title:'Setup & Foundation',steps:[{t:'Create all accounts and tools',d:'Set up every platform using a professional email. Consistency across platforms matters.'},{t:'Complete one beginner tutorial fully',d:"Find the highest-rated free tutorial on YouTube or Coursera. Watch start to finish, pausing to take notes. Don't skip ahead."},{t:'Build your first rough version',d:"Create your first piece of work. Done and imperfect beats perfect and never started."}]},
      {title:'Execute & Grow',steps:[{t:'Publish or launch publicly',d:'Post the video, list the service, submit the application. Real-world feedback beats planning.'},{t:'5 days in a row without skipping',d:'Spend 30+ minutes every day for 5 straight days. Missing one day doubles the chance you quit.'},{t:'Analyse results and adjust',d:'After 5 days, review what is working. Double down on what works, cut what got zero.'}]},
      {title:'Complete & Verify',steps:[{t:'Hit your first real milestone',d:'Push until you reach your success metric. Document it for your Proof of Work submission.'},{t:'Submit Proof of Work',d:"Gather evidence and submit through Momentum's Proof of Work. Badge awarded within 48 hours."}]},
    ]}
  }
}