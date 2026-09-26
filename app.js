(()=>{"use strict";

const DATA=window.WWY_V3;
if(!DATA){document.getElementById("app").innerHTML="<p>Game data could not load. Please refresh.</p>";return}

const app=document.getElementById("app");
const KEY="tubuo_wwyd_v3";
const LEGACY_KEY="tubuo_wwyd_v2";

const freshPath=()=>({unlocked:1,stage:1,index:0,answers:{},completed:{},badges:{},bestStreak:0});
const fresh=()=>({selectedPath:null,profiles:{},pathStates:{},settings:{reducedMotion:false}});

function load(){
  try{
    const parsed=JSON.parse(localStorage.getItem(KEY)||"{}");
    const s=Object.assign(fresh(),parsed);
    if(!s.profiles)s.profiles={};
    if(parsed.profile&&parsed.profile.displayName){
      s.profiles[parsed.selectedPath||"adult-f"]=parsed.profile;
      delete s.profile;
    }
    const legacy=JSON.parse(localStorage.getItem(LEGACY_KEY)||"{}");
    if(!s.profiles["adult-f"]&&legacy&&legacy.profile&&legacy.profile.first){
      s.profiles["adult-f"]={displayName:legacy.profile.first,email:legacy.profile.email||"",emailConsent:!!legacy.profile.emailConsent};
    }
    return s;
  }catch(e){return fresh()}
}
let state=load();
if(!state.settings)state.settings={};
if(!Number.isInteger(state.settings.textScale))state.settings.textScale=0;
if(typeof state.settings.sound!=="boolean")state.settings.sound=true;
if(typeof state.settings.motion!=="boolean")state.settings.motion=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(typeof state.settings.haptics!=="boolean")state.settings.haptics=true;

function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function ps(id=state.selectedPath){if(!id)return null;if(!state.pathStates[id])state.pathStates[id]=freshPath();return state.pathStates[id]}
function currentProfile(id=state.selectedPath){return id&&state.profiles?state.profiles[id]||null:null}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function game(){return state.selectedPath?DATA.GAMES[state.selectedPath]:null}
function stage(n){const g=game();return g?g.stages.find(s=>s.id===n):null}
function answerKey(q){return q.id}
function answeredCount(s){const p=ps();return s?s.questions.filter(q=>p.answers[answerKey(q)]).length:0}
function correctCount(s){const p=ps();return s?s.questions.filter(q=>p.answers[answerKey(q)]?.correct).length:0}
function streakAt(s,index){
  const p=ps();let streak=0;
  for(let i=0;i<index;i++){const r=p.answers[s.questions[i].id];if(r?.correct)streak++;else if(r)streak=0}
  return streak;
}
function skillSummary(){
  const g=game(),p=ps(),map={};
  if(!g||!p)return[];
  g.stages.forEach(s=>s.questions.forEach(q=>{
    const r=p.answers[q.id];
    if(!r)return;
    if(!map[q.skill])map[q.skill]={right:0,total:0};
    map[q.skill].total++; if(r.correct)map[q.skill].right++;
  }));
  return Object.entries(map).map(([name,v])=>({name,...v,pct:Math.round(v.right/v.total*100)})).sort((a,b)=>b.pct-a.pct||b.total-a.total);
}
function totalProgress(id){
  const g=DATA.GAMES[id],p=ps(id);let answered=0;
  g.stages.forEach(s=>answered+=s.questions.filter(q=>p.answers[q.id]).length);
  return Math.round(answered/200*100);
}

let audioCtx=null;
const SOUND_PROFILES={
 "adult-f":{root:392,wave:"sine"},"adult-m":{root:330,wave:"triangle"},
 "teen-f":{root:494,wave:"sine"},"teen-m":{root:440,wave:"triangle"},
 "child-f":{root:587,wave:"sine"},"child-m":{root:523,wave:"sine"},
 neutral:{root:392,wave:"sine"}
};
function soundProfile(){return SOUND_PROFILES[state.selectedPath]||SOUND_PROFILES.neutral}
function ensureAudio(){
 if(!state.settings.sound)return null;
 const AC=window.AudioContext||window.webkitAudioContext;
 if(!AC)return null;
 if(!audioCtx)audioCtx=new AC();
 if(audioCtx.state==="suspended")audioCtx.resume().catch(()=>{});
 return audioCtx;
}
function tone(freq,dur=0.09,delay=0,gain=0.035,type){
 const ctx=ensureAudio();if(!ctx)return;
 const o=ctx.createOscillator(),g=ctx.createGain(),now=ctx.currentTime+delay;
 o.type=type||soundProfile().wave;o.frequency.setValueAtTime(freq,now);
 g.gain.setValueAtTime(0.0001,now);g.gain.exponentialRampToValueAtTime(gain,now+0.012);g.gain.exponentialRampToValueAtTime(0.0001,now+dur);
 o.connect(g);g.connect(ctx.destination);o.start(now);o.stop(now+dur+0.02);
}
function playCue(name){
 if(!state.settings.sound)return;
 const p=soundProfile(),r=p.root;
 const seq={
  select:[[r,0.055,0,.018]],
  strong:[[r,0.07,0,.025],[r*1.25,0.08,.07,.028],[r*1.5,0.11,.15,.03]],
  learn:[[r*.9,0.08,0,.018],[r,0.1,.09,.02]],
  next:[[r*1.12,0.06,0,.018]],
  pass:[[r,0.08,0,.025],[r*1.25,0.09,.08,.028],[r*1.5,0.11,.17,.03],[r*2,0.16,.28,.035]],
  retry:[[r,0.08,0,.018],[r*.84,0.11,.09,.018]],
  badge:[[r*1.25,0.09,0,.025],[r*1.5,0.11,.09,.03],[r*2,0.16,.2,.035]],
  season:[[r,0.1,0,.025],[r*1.25,0.1,.1,.03],[r*1.5,0.11,.2,.032],[r*2,0.18,.32,.04],[r*2.5,0.22,.48,.035]]
 }[name]||[];
 seq.forEach(([f,d,del,g])=>tone(f,d,del,g,p.wave));
}
function haptic(kind="tap"){
 if(!state.settings.haptics||!("vibrate" in navigator))return;
 const map={tap:12,strong:[18,28,18],learn:18,pass:[25,35,25],badge:[20,25,20,25,35],season:[30,35,30,35,60]};
 try{navigator.vibrate(map[kind]||12)}catch(e){}
}
function toggleSound(){state.settings.sound=!state.settings.sound;save();refreshControls();if(state.settings.sound)playCue("select")}
function toggleMotion(){state.settings.motion=!state.settings.motion;save();applyMotion();refreshControls()}
function toggleHaptics(){state.settings.haptics=!state.settings.haptics;save();refreshControls();if(state.settings.haptics)haptic("tap")}
function applyMotion(){document.documentElement.dataset.motion=state.settings.motion?"on":"off"}
function refreshControls(){
 const s=document.getElementById("soundBtn");if(s){s.textContent=state.settings.sound?"🔊":"🔇";s.setAttribute("aria-label",state.settings.sound?"Mute game sounds":"Turn game sounds on");s.setAttribute("aria-pressed",String(state.settings.sound))}
 const m=document.getElementById("motionBtn");if(m){m.textContent=state.settings.motion?"✦":"—";m.setAttribute("aria-label",state.settings.motion?"Reduce game motion":"Turn game motion on");m.setAttribute("aria-pressed",String(state.settings.motion))}
 const h=document.getElementById("hapticBtn");if(h){h.textContent=state.settings.haptics?"〰":"·";h.setAttribute("aria-label",state.settings.haptics?"Turn haptic taps off":"Turn haptic taps on");h.setAttribute("aria-pressed",String(state.settings.haptics))}
}
function celebrate(kind="pass"){
 if(!state.settings.motion)return;
 const g=game(),count=kind==="season"?28:kind==="badge"?18:12;
 const layer=document.createElement("div");layer.className="celebration-layer";layer.setAttribute("aria-hidden","true");
 const symbols=g&&g.level==="child"?["●","★","◆","✦"]:g&&g.level==="teen"?["✦","◆","●"]:["✦","·","◆"];
 for(let i=0;i<count;i++){
  const n=document.createElement("span");n.className="celebration-piece";n.textContent=symbols[i%symbols.length];
  n.style.setProperty("--x",((i*37)%100)+"%");n.style.setProperty("--delay",(i%7)*.035+"s");n.style.setProperty("--drift",((i%5)-2)*26+"px");
  layer.appendChild(n);
 }
 document.body.appendChild(layer);setTimeout(()=>layer.remove(),1700);
}
function checkpointText(s,index){
 const done=index+1,total=s.questions.length,p=Math.round(done/total*100),g=game();
 let label="";
 if(done===Math.ceil(total*.25))label="¼ CHECKPOINT";
 else if(done===Math.ceil(total*.5))label="HALFWAY";
 else if(done===Math.ceil(total*.75))label="¾ CHECKPOINT";
 if(!label)return "";
 const lines=g.level==="child"?["Nice work. Keep noticing the clues.","Halfway there. Safe choices can be simple.","You are close. Keep thinking about safe help."]:g.level==="teen"?["Good pace. Keep thinking, not rushing.","Halfway. The situations get more complex from here.","Strong progress. Keep privacy, respect and safety together."]:["Good progress. Keep reading the context, not just the headline.","Halfway. Later decisions will ask you to balance more than one principle.","You are close. Stay careful with safety, agency and evidence."];
 const idx=label==="¼ CHECKPOINT"?0:label==="HALFWAY"?1:2;
 return '<div class="checkpoint"><b>'+label+'</b><span>'+esc(lines[idx])+'</span></div>';
}
function streakMessage(n){
 const g=game();if(n<3)return "";
 if(g.level==="child")return n>=7?"🌟 "+n+" thoughtful choices in a row":"✨ "+n+" strong choices in a row";
 if(g.level==="teen")return n>=7?"🔥 "+n+" strong choices — keep the focus":"⚡ "+n+" strong choices in a row";
 return n>=7?"✦ "+n+" careful decisions in a row":"✓ "+n+" strong choices in a row";
}

function applyTextScale(){
  document.documentElement.dataset.textScale=String(state.settings.textScale||0);
}
function cycleTextScale(){
  state.settings.textScale=((state.settings.textScale||0)+1)%3;
  save();applyTextScale();
  const b=document.getElementById("textSizeBtn");
  if(b)b.textContent=state.settings.textScale===0?"A":state.settings.textScale===1?"A+":"A++";
}
function speak(text){
  if(!("speechSynthesis" in window)){alert("Read aloud is not available in this browser.");return}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.rate=0.95;
  window.speechSynthesis.speak(utterance);
}
function skillBars(skills){
  if(!skills.length)return "";
  return `<div class="skill-profile">${skills.map(s=>`<div class="skill-row"><div class="skill-label"><span>${esc(s.name)}</span><b>${s.pct}%</b></div><div class="skill-track"><span style="width:${s.pct}%"></span></div></div>`).join("")}</div>`;
}
function topbar(extra=""){
  return `<header class="topbar"><button class="brand-link" id="brandHome" aria-label="Game home"><span class="brand-mark">T</span><span><b>TUBUO WRITES</b><small>WHAT WOULD YOU DO?</small></span></button><div class="top-actions">${extra}<button class="mini-btn icon-control" id="soundBtn" aria-label="Mute game sounds" aria-pressed="${state.settings.sound}">${state.settings.sound?"🔊":"🔇"}</button><button class="mini-btn icon-control" id="motionBtn" aria-label="Reduce game motion" aria-pressed="${state.settings.motion}">${state.settings.motion?"✦":"—"}</button><button class="mini-btn icon-control haptic-control" id="hapticBtn" aria-label="Turn haptic taps off" aria-pressed="${state.settings.haptics}">${state.settings.haptics?"〰":"·"}</button><button class="mini-btn" id="glossaryBtn">GLOSSARY</button><button class="mini-btn" id="textSizeBtn" aria-label="Change text size">${state.settings.textScale===0?"A":state.settings.textScale===1?"A+":"A++"}</button><button class="mini-btn" id="helpBtn">NEED HELP?</button></div></header>`;
}
function bindTop(){
  const b=document.getElementById("brandHome"); if(b)b.onclick=()=>state.selectedPath?home():welcome();
  const h=document.getElementById("helpBtn"); if(h)h.onclick=help;
  const g=document.getElementById("glossaryBtn"); if(g)g.onclick=glossary;
  const t=document.getElementById("textSizeBtn"); if(t)t.onclick=cycleTextScale;
  const s=document.getElementById("soundBtn");if(s)s.onclick=toggleSound;
  const m=document.getElementById("motionBtn");if(m)m.onclick=toggleMotion;
  const hp=document.getElementById("hapticBtn");if(hp)hp.onclick=toggleHaptics;
}
function applyGameTheme(){
  const id=document.documentElement.dataset.forceNeutral==="1"?"neutral":(state.selectedPath||"neutral");
  document.documentElement.dataset.game=id;
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta){
    const p=getComputedStyle(document.documentElement).getPropertyValue("--navy").trim();
    if(p)meta.setAttribute("content",p);
  }
}
function shell(html,extra=""){applyTextScale();applyMotion();applyGameTheme();app.innerHTML=topbar(extra)+html;bindTop();refreshControls();window.scrollTo({top:0,behavior:"auto"})}

function welcome(){
  shell(`<section class="hero hero-main">
    <div class="eyebrow">TUBUO WRITES ORIGINAL · SEASON 1</div>
    <h1>WHAT WOULD<br>YOU DO?</h1>
    <p class="tagline">Every choice changes the story.</p>
    <p class="lede">Six different games. The same standard: dignity, consent, safety, evidence, respect and responsibility.</p>
    <button class="btn btn-primary btn-large" id="chooseAge">CHOOSE YOUR GAME →</button>
    <div class="trust-row"><span>1,200 decisions</span><span>6 Season 1 paths</span><span>5 stages each</span></div>
  </section>
  <section class="why-grid">
    <article><b>Different ages. Different realities.</b><p>An 8-year-old should not be given an adult relationship scenario. A 15-year-old needs school, peer and online realities. Adults face different pressures again.</p></article>
    <article><b>Different perspective. Same rights.</b><p>The male and female paths change the situations and learning emphasis. They do not change anyone’s right to safety, consent, dignity or fair treatment.</p></article>
    <article><b>No survivor blame.</b><p>The game teaches safer decisions without making people responsible for violence committed against them.</p></article>
  </section>
  <div class="center-actions"><button class="text-btn" id="methodBtn">HOW THIS GAME WAS BUILT</button></div>`);
  document.getElementById("chooseAge").onclick=chooseAge;
  document.getElementById("methodBtn").onclick=methodology;
}

function chooseAge(){
  document.documentElement.dataset.forceNeutral="1";
  shell(`<section class="card intro-card">
    <div class="eyebrow">STEP 1 OF 2</div>
    <h2>Which age group should this game be written for?</h2>
    <p>Choose the game, not your identity record. We do not ask for a date of birth.</p>
    <div class="choice-grid age-grid">
      <button class="choice-card" data-age="8–12"><span class="choice-num">8–12</span><b>Children</b><small>Boundaries, unsafe secrets, online safety, trusted adults and helping safely.</small></button>
      <button class="choice-card" data-age="13–17"><span class="choice-num">13–17</span><b>Teenagers</b><small>Relationships, peer pressure, consent, social media, school and safe help-seeking.</small></button>
      <button class="choice-card" data-age="18+"><span class="choice-num">18+</span><b>Adults</b><small>Relationships, work, family, digital life, evidence, bystander choices and accountability.</small></button>
    </div>
    <button class="text-btn" id="backWelcome">← BACK</button>
  </section>`);
  document.querySelectorAll("[data-age]").forEach(b=>b.onclick=()=>chooseSex(b.dataset.age));
  document.getElementById("backWelcome").onclick=welcome;
}

function chooseSex(age){
  const pairs=Object.values(DATA.PATHS).filter(p=>p.age===age);
  shell(`<section class="card intro-card">
    <div class="eyebrow">STEP 2 OF 2 · ${esc(age)}</div>
    <h2>Which game would you like to play?</h2>
    <p>The selection changes the story world and learning emphasis. It is not a judgement about what every male or female person experiences.</p>
    <div class="choice-grid">
      ${pairs.map(p=>`<button class="choice-card path-choice" data-path="${p.id}">
        <span class="path-icon" aria-hidden="true">${p.sex==="male"?"♂":"♀"}</span>
        <b>${p.sex==="male"?"MALE":"FEMALE"}</b>
        <small>${esc(p.description)}</small>
      </button>`).join("")}
    </div>
    <button class="text-btn" id="backAge">← CHANGE AGE GROUP</button>
  </section>`);
  document.querySelectorAll("[data-path]").forEach(b=>b.onclick=()=>selectPath(b.dataset.path));
  document.getElementById("backAge").onclick=chooseAge;
}

function selectPath(id){
  delete document.documentElement.dataset.forceNeutral;
  state.selectedPath=id;ps(id);save();
  if(!currentProfile()) profile(); else home();
}

function profile(){
  const p=DATA.PATHS[state.selectedPath];
  const minor=p.level!=="adult";
  shell(`<section class="card intro-card">
    <div class="eyebrow">${esc(p.label)} · SEASON 1</div>
    <h2>${minor?"What name should appear on your badges?":"What should we call you?"}</h2>
    <p>${minor?"Use a first name or nickname. It stays on this device. Do not enter your full name, school or address.":"Your first name is used on badges and stays on this device."}</p>
    <form id="profileForm" class="form-stack">
      <label><b>${minor?"Badge name or nickname":"First name"}</b><input class="text-input" id="displayName" maxlength="30" autocomplete="${minor?"off":"given-name"}" required placeholder="${minor?"e.g. Mimi":"e.g. Amina"}"></label>
      ${minor?"":`<label><b>Email <small>(optional)</small></b><input class="text-input" id="email" type="email" maxlength="120" autocomplete="email" placeholder="you@example.com"><small class="field-note">Saved only on this device for future badge delivery. You can leave it blank.</small></label><label class="check-row"><input id="emailConsent" type="checkbox"><span>If I enter an email, I agree it may be used only to send badges I earn in this game.</span></label>`}
      <button class="btn btn-primary" type="submit">ENTER SEASON 1 →</button>
    </form>
  </section>`);
  document.getElementById("profileForm").onsubmit=e=>{
    e.preventDefault();
    const name=document.getElementById("displayName").value.trim();
    if(!name)return;
    let email="",consent=false;
    if(!minor){
      email=document.getElementById("email").value.trim();
      consent=document.getElementById("emailConsent").checked;
      if(email&&!consent){alert("Tick the consent box if you want to save an email, or leave the email field blank.");return}
    }
    state.profiles[state.selectedPath]={displayName:name,email:email||"",emailConsent:!!(email&&consent)};
    save();home();
  };
}

function home(){
  const g=game(),p=ps();
  if(!g){welcome();return}
  if(!currentProfile()){profile();return}
  const current=stage(p.stage)||g.stages[0];
  const name=esc(currentProfile().displayName);
  shell(`<section class="hero path-hero level-${g.level}">
    <div class="eyebrow">${esc(g.label)} · SEASON 1</div>
    <h1 class="path-title">${esc(g.entryTitle)}</h1>
    <p class="tagline">${esc(g.entrySub)}</p>
    <p>Welcome, <strong>${name}</strong>. Your progress in this path is saved separately on this device.</p>
    <div class="hero-actions">
      <button class="btn btn-primary btn-large" id="startBtn">${answeredCount(current)?"CONTINUE STAGE "+current.id+" →":"START STAGE "+current.id+" →"}</button>
      <button class="btn btn-ghost" id="changeGame">CHANGE GAME</button>
    </div>
    <div class="season-progress"><span><b>${totalProgress(g.id)}%</b> of Season 1 explored</span><span>200 decisions</span></div>
  </section>
  <section class="stage-map">
    <div class="section-heading"><div><div class="eyebrow">YOUR JOURNEY</div><h2>Five stages</h2></div><span class="season-pill">70% to pass</span></div>
    ${g.stages.map(s=>{
      const locked=s.id>p.unlocked,done=p.completed[s.id]?.passed,badge=p.badges[s.id],ans=answeredCount(s);
      return `<button class="stage-card ${locked?"locked":""} ${done?"done":""}" data-stage="${s.id}" ${locked?"disabled":""}>
        <span class="stage-number">${locked?"🔒":done?"✓":s.id}</span>
        <span class="stage-copy"><b>Stage ${s.id} · ${esc(s.title)}</b><small>${s.questions.length} decisions · ${ans}/${s.questions.length} answered${badge?" · "+esc(badge.name):""}</small></span>
        <span class="stage-arrow">${locked?"":"→"}</span>
      </button>`
    }).join("")}
  </section>
  <section class="info-strip"><b>Why this version is different</b><p>${esc(g.description)}</p></section>
  <div class="center-actions"><button class="text-btn" id="methodBtn">METHODOLOGY & SOURCES</button><button class="text-btn" id="resetBtn">RESET THIS GAME</button></div>`);
  document.getElementById("startBtn").onclick=()=>showQuestion(current.id,p.index||0);
  document.getElementById("changeGame").onclick=chooseAge;
  document.getElementById("methodBtn").onclick=methodology;
  document.querySelectorAll("[data-stage]").forEach(b=>b.onclick=()=>{const id=Number(b.dataset.stage);p.stage=id;p.index=firstUnanswered(stage(id));save();showQuestion(id,p.index)});
  document.getElementById("resetBtn").onclick=()=>{if(confirm("Reset progress for this game only? Other game paths will be kept.")){state.pathStates[g.id]=freshPath();save();home()}};
}

function firstUnanswered(s){
  const p=ps();for(let i=0;i<s.questions.length;i++)if(!p.answers[s.questions[i].id])return i;return s.questions.length;
}

function showQuestion(stageId,index){
  const s=stage(stageId),p=ps(),g=game();
  if(!s){home();return}
  if(index>=s.questions.length){results(s);return}
  p.stage=stageId;p.index=index;save();
  const q=s.questions[index],record=p.answers[q.id],pct=Math.round(((index+1)/s.questions.length)*100),streak=streakAt(s,index);
  const feedbackBlock=record?renderFeedback(q,record):"";
  shell(`<div class="question-shell">
    <div class="question-meta">
      <button class="text-btn compact" id="stageMap">← STAGE MAP</button>
      <span class="season-pill">Stage ${s.id} · ${index+1}/${s.questions.length}</span>
    </div>
    <div class="stats">
      <div class="stat"><b>${correctCount(s)}</b><span>Strong choices</span></div>
      <div class="stat"><b>${streak}</b><span>Current streak</span></div>
      <div class="stat"><b>${esc(q.skill)}</b><span>Skill</span></div>
    </div>
    <div class="progress-wrap"><div class="progress-meta"><span>${esc(s.title)}</span><span>${pct}%</span></div><div class="progress"><span style="width:${pct}%"></span></div></div>${checkpointText(s,index)}${streakMessage(streak)?`<div class="streak-banner">${esc(streakMessage(streak))}</div>`:""}
    <section class="card question-card">
      <div class="format">${esc(q.format)}${q.boss?" · STAGE BOSS":""}</div>
      <h2>Decision ${index+1}</h2>
      <div class="scenario">${esc(q.scenario)}</div>
      <form id="answers" class="answers">
        ${q.answers.map((a,i)=>`<div class="answer"><input type="radio" name="answer" id="a${i}" value="${i}" ${record?.choice===i?"checked":""} ${record?"disabled":""}><label for="a${i}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${esc(a)}</span></label></div>`).join("")}
      </form>
      <div class="actions"><button class="btn btn-ghost" id="readBtn" type="button">🔊 READ SCENARIO</button><button class="btn btn-primary" id="checkBtn" ${record?"disabled":""}>MAKE THIS CHOICE</button></div>
      <div id="feedback">${feedbackBlock}</div>
    </section>
  </div>`,`<button class="mini-btn" id="switchBtn">${esc(g.label)}</button>`);
  document.getElementById("stageMap").onclick=home;
  document.querySelectorAll('input[name="answer"]').forEach(radio=>radio.addEventListener("change",()=>{playCue("select");haptic("tap");const label=radio.nextElementSibling;if(label){label.classList.remove("answer-pulse");void label.offsetWidth;label.classList.add("answer-pulse")}}));
  const readBtn=document.getElementById("readBtn");if(readBtn)readBtn.onclick=()=>speak(q.scenario);
  const sw=document.getElementById("switchBtn");if(sw)sw.onclick=chooseAge;
  document.getElementById("checkBtn").onclick=()=>{
    const chosen=document.querySelector('input[name="answer"]:checked');
    if(!chosen){alert("Choose one response first.");return}
    const choice=Number(chosen.value),correct=choice===q.correct;
    p.answers[q.id]={choice,correct,answeredAt:new Date().toISOString()};
    const newStreak=correct?streak+1:0;p.bestStreak=Math.max(p.bestStreak,newStreak);
    playCue(correct?"strong":"learn");haptic(correct?"strong":"learn");
    save();showQuestion(stageId,index);
  };
  const next=document.getElementById("nextBtn");if(next)next.onclick=()=>{playCue("next");haptic("tap");showQuestion(stageId,index+1)};
}

function renderFeedback(q,r){
  return `<div class="feedback ${r.correct?"correct":"learn"}">
    <div class="feedback-title">${r.correct?"✓ STRONG CHOICE":"↻ LEARNING MOMENT"}</div>
    <div class="feedback-grid">
      <div><span>YOUR CHOICE</span><p>${esc(q.answers[r.choice])}</p></div>
      <div><span>WHAT HAPPENS</span><p>${esc(q.consequence)}</p></div>
      <div><span>WHY IT MATTERS</span><p>${esc(q.why)}</p></div>
      <div><span>WHAT TO REMEMBER</span><p><strong>${esc(q.remember)}</strong></p></div>
    </div>
    <div class="feedback-actions"><a class="btn btn-ghost" href="${esc(q.learn)}" target="_blank" rel="noopener">LEARN MORE · ${esc(q.sourceName)}</a><button class="btn btn-primary" id="nextBtn">NEXT DECISION →</button></div>
  </div>`;
}

function results(s){
  const p=ps(),g=game(),right=correctCount(s),total=s.questions.length,pct=Math.round(right/total*100),passed=right>=s.pass;
  const previous=p.completed[s.id];
  p.completed[s.id]={right,total,pct,passed,bestPct:Math.max(previous?.bestPct||0,pct)};
  if(passed){
    p.badges[s.id]=p.badges[s.id]||{name:g.badges[s.id-1],pct,earned:new Date().toISOString()};
    if(pct>(p.badges[s.id].pct||0))p.badges[s.id].pct=pct;
    if(s.id<5)p.unlocked=Math.max(p.unlocked,s.id+1);
  }
  save();
  const skills=skillSummary(),strengths=skills.slice(0,3),growth=skills.slice().sort((a,b)=>a.pct-b.pct).slice(0,2);
  shell(`<section class="card result-card ${passed?"stage-success":"stage-retry"}">
    <div class="eyebrow">STAGE ${s.id} COMPLETE</div>
    <div class="score-ring" style="--score:${pct}%"><b>${pct}%</b><span>${right}/${total}</span></div>
    <h1 class="result-title">${passed?"STAGE PASSED":"NOT QUITE YET"}</h1>
    <p>${passed?"You reached the 70% mark. The next stage is ready.":"You need "+s.pass+" strong choices out of "+total+" to pass. Review what the decisions taught and try again — there is no penalty."}</p>
    ${passed?badgeCard(s.id,pct):""}
    <div class="decision-profile-block"><div class="eyebrow">YOUR DECISION PROFILE SO FAR</div>${skillBars(skills)}</div>
    <div class="result-insights">
      <div><b>Strong areas</b><p>${strengths.length?strengths.map(x=>esc(x.name)+" "+x.pct+"%").join(" · "):"Keep playing"}</p></div>
      <div><b>Worth another look</b><p>${growth.length?growth.map(x=>esc(x.name)+" "+x.pct+"%").join(" · "):"Keep playing"}</p></div>
    </div>
    ${passed&&s.id===5?`<div class="season-complete"><div class="trophy">🏆</div><b>SEASON 1 COMPLETE</b><p>${esc(currentProfile().displayName)}, you completed all 200 decisions in ${esc(g.label)}.</p><button class="btn btn-ghost season-award-btn" id="downloadSeason">DOWNLOAD SEASON 1 AWARD</button></div>`:""}
    <div class="actions center">
      ${passed&&s.id<5?`<button class="btn btn-primary" id="continueBtn">OPEN STAGE ${s.id+1} →</button>`:""}
      ${!passed?`<button class="btn btn-primary" id="retryBtn">TRY STAGE AGAIN</button>`:""}
      <button class="btn btn-ghost" id="menuBtn">STAGE MAP</button>
      ${passed&&s.id===5?`<button class="btn btn-ghost" id="exploreBtn">EXPLORE ANOTHER PERSPECTIVE</button>`:""}
    </div>
  </section>`);
  if(passed){
    playCue(s.id===5?"season":"pass");haptic(s.id===5?"season":"pass");celebrate(s.id===5?"season":"badge");
  }else{playCue("retry");haptic("learn")}
  document.getElementById("menuBtn").onclick=()=>{playCue("select");home()};
  const c=document.getElementById("continueBtn");if(c)c.onclick=()=>{playCue("next");p.stage=s.id+1;p.index=0;save();showQuestion(p.stage,0)};
  const r=document.getElementById("retryBtn");if(r)r.onclick=()=>{playCue("retry");s.questions.forEach(q=>delete p.answers[q.id]);delete p.completed[s.id];p.index=0;save();showQuestion(s.id,0)};
  const d=document.getElementById("downloadBadge");if(d)d.onclick=()=>{playCue("badge");celebrate("badge");downloadBadge(g.badges[s.id-1],s.id,pct)};
  const season=document.getElementById("downloadSeason");if(season)season.onclick=()=>downloadSeason();
  const explore=document.getElementById("exploreBtn");if(explore)explore.onclick=chooseAge;
}

function badgeCard(id,pct){
  const g=game(),name=esc(currentProfile().displayName),badge=esc(g.badges[id-1]);
  return `<div class="badge-card">
    <div class="badge-medal">🏅</div><div class="eyebrow">TUBUO WRITES · WHAT WOULD YOU DO?</div>
    <h2>${badge}</h2><p>Awarded to</p><h3>${name}</h3>
    <p>for completing <strong>Stage ${id}</strong> of <strong>${esc(g.label)}</strong> with a score of <strong>${pct}%</strong>.</p>
    <small>SEASON 1 · Every choice changes the story.</small>
    <button class="btn btn-ghost" id="downloadBadge">DOWNLOAD BADGE</button>
  </div>`;
}

function downloadSeason(){
  const g=game(),name=currentProfile().displayName;
  const canvas=document.createElement("canvas");canvas.width=1600;canvas.height=1100;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#f7f6f1";ctx.fillRect(0,0,1600,1100);
  ctx.fillStyle="#002b6a";ctx.fillRect(60,60,1480,980);
  ctx.fillStyle="#ffffff";ctx.fillRect(90,90,1420,920);
  ctx.textAlign="center";
  ctx.fillStyle="#002b6a";ctx.font="700 38px Arial";ctx.fillText("TUBUO WRITES · WHAT WOULD YOU DO?",800,180);
  ctx.fillStyle="#ffb800";ctx.font="700 110px Arial";ctx.fillText("★",800,330);
  ctx.fillStyle="#002b6a";ctx.font="900 70px Arial";ctx.fillText("SEASON 1 COMPLETE",800,450);
  ctx.fillStyle="#5a6673";ctx.font="34px Arial";ctx.fillText("AWARDED TO",800,540);
  ctx.fillStyle="#007fe6";ctx.font="900 72px Arial";wrap(ctx,name,800,640,1200,78);
  ctx.fillStyle="#11181f";ctx.font="38px Arial";ctx.fillText("Completed 200 decisions · "+g.label,800,780);
  ctx.fillStyle="#5a6673";ctx.font="30px Arial";ctx.fillText("Awareness · Empathy · Safety · Rights · Evidence · Judgement · Courage",800,860);
  ctx.font="28px Arial";ctx.fillText("Every choice changes the story.",800,940);
  const a=document.createElement("a");a.download=("TUBUO-WWY-Season-1-"+g.label+"-"+name+".png").replace(/[^a-z0-9._-]+/gi,"-");a.href=canvas.toDataURL("image/png");a.click();
}

function downloadBadge(badge,stageId,pct){
  const g=game(),name=currentProfile().displayName;
  const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=1200;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#f7f6f1";ctx.fillRect(0,0,1200,1200);
  ctx.fillStyle="#002b6a";ctx.fillRect(70,70,1060,1060);
  ctx.fillStyle="#ffffff";ctx.fillRect(95,95,1010,1010);
  ctx.textAlign="center";
  ctx.fillStyle="#002b6a";ctx.font="700 34px Arial";ctx.fillText("TUBUO WRITES · WHAT WOULD YOU DO?",600,180);
  ctx.fillStyle="#ffb800";ctx.font="700 120px Arial";ctx.fillText("★",600,340);
  ctx.fillStyle="#002b6a";ctx.font="900 62px Arial";wrap(ctx,badge,600,450,900,70);
  ctx.fillStyle="#5a6673";ctx.font="32px Arial";ctx.fillText("AWARDED TO",600,650);
  ctx.fillStyle="#007fe6";ctx.font="900 64px Arial";wrap(ctx,name,600,735,900,72);
  ctx.fillStyle="#11181f";ctx.font="36px Arial";ctx.fillText("Stage "+stageId+" · "+g.label+" · "+pct+"%",600,890);
  ctx.fillStyle="#5a6673";ctx.font="28px Arial";ctx.fillText("SEASON 1 · Every choice changes the story.",600,995);
  const a=document.createElement("a");a.download=("TUBUO-WWY-"+badge+"-"+name+".png").replace(/[^a-z0-9._-]+/gi,"-");a.href=canvas.toDataURL("image/png");a.click();
}
function wrap(ctx,text,x,y,max,line){
  const words=String(text).split(" ");let row="",yy=y;
  for(const w of words){const test=row?row+" "+w:w;if(ctx.measureText(test).width>max&&row){ctx.fillText(row,x,yy);row=w;yy+=line}else row=test}
  if(row)ctx.fillText(row,x,yy);
}

function glossary(){
  const g=game(),child=g&&g.level==="child";
  const terms=child?[
    ["Boundary","A limit that helps keep your body, space or information safe."],
    ["Consent","Agreeing freely. Children also have a right to protection, and adults have special duties to keep them safe."],
    ["Safe adult","An adult you trust who listens, helps and does not ask you to keep unsafe secrets."],
    ["Unsafe secret","A secret that makes you scared, trapped or worried, or hides harm."],
    ["Pressure","When someone keeps pushing, threatening, bribing or making you feel you cannot say no."],
    ["Evidence","Information that can help adults understand what happened, such as a message or what someone saw."]
  ]:[
    ["Consent","A freely given, current and specific agreement. Past consent or relationship status does not create automatic future consent."],
    ["Coercion","Pressure, threats, manipulation or abuse of power that makes a person’s choice less free."],
    ["Coercive control","A repeated pattern used to dominate another person through monitoring, isolation, intimidation, money, threats or other controls."],
    ["GBV","Gender-based violence: harmful acts directed at someone because of gender, or violence that affects a gender disproportionately."],
    ["Bystander","Someone who witnesses or becomes aware of harmful behaviour and has choices about whether and how to respond."],
    ["Safeguarding","Steps taken to protect children and other people at risk from harm and to respond safely when concerns arise."],
    ["Evidence","Information used to assess what happened. Evidence can support, contradict or leave uncertainty; it should not be stretched beyond what it shows."],
    ["Survivor-centred support","Support that prioritizes dignity, safety, privacy and the affected person’s choices rather than taking over."]
  ];
  shell(`<section class="card method-card"><div class="eyebrow">PLAIN-LANGUAGE GLOSSARY</div><h1 class="page-title">Words the game uses</h1><p>These definitions are written for learning, not as legal definitions for every country.</p><div class="glossary-list">${terms.map(([a,b])=>`<div class="glossary-item"><b>${esc(a)}</b><p>${esc(b)}</p></div>`).join("")}</div><button class="btn btn-primary" id="glossaryReturn">RETURN</button></section>`);
  document.getElementById("glossaryReturn").onclick=()=>state.selectedPath?home():welcome();
}
function help(){
  const g=game(),minor=g&&g.level!=="adult";
  shell(`<section class="card help-card">
    <div class="eyebrow">NEED HELP?</div><h1 class="page-title">The game is educational. Real situations need real support.</h1>
    ${minor?`<p>If a situation in this game feels familiar or makes you worried, tell a safe adult you trust. That might be a parent, caregiver, teacher, school counsellor, health worker or another adult whose job is to help children.</p><div class="callout"><b>If the first adult does not listen, tell another safe adult.</b><p>You are not causing trouble by asking for help.</p></div><p><a href="https://childhelplineinternational.org/helplines/" target="_blank" rel="noopener">Find a child helpline in your country →</a></p>`:`<p>If a scenario feels personal, consider a trusted local health, social, legal or specialist GBV service appropriate to your country and circumstances. Support should respect safety, privacy and the choices of the person affected.</p><p><a href="https://www.unfpa.org/where-we-work" target="_blank" rel="noopener">Find UNFPA country information →</a></p>`}
    <p class="note">WHAT WOULD YOU DO? is not an emergency service and does not know your location. Emergency and safeguarding services differ by country.</p>
    <button class="btn btn-primary" id="returnBtn">RETURN TO GAME</button>
  </section>`);
  document.getElementById("returnBtn").onclick=()=>state.selectedPath?home():welcome();
}

function methodology(){
  shell(`<section class="card method-card">
    <div class="eyebrow">METHODOLOGY</div><h1 class="page-title">Six games. One rights standard.</h1>
    <p>Season 1 contains <strong>1,200 playable decisions</strong>: 200 in each of six paths. Every path has five stages of 20, 30, 40, 50 and 60 decisions, with 70% required to unlock the next stage.</p>
    <h2>Why the paths are different</h2>
    <p>Children are not miniature adults. Teenagers face school, peer and digital pressures that are different again. Adult male and female paths use different perspectives without treating every man as a perpetrator or every woman as a victim. Men and boys also appear as survivors, supporters and bystanders; women and girls appear as decision-makers, friends, workers and community members.</p>
    <h2>How younger players are protected</h2>
    <p>The 8–12 games avoid graphic detail, adult relationship disputes and instructions to confront dangerous people. They repeatedly teach body boundaries, unsafe secrets, online caution, safe adults and the right to keep telling adults until somebody listens. Teen games do not ask minors to investigate abuse or manage dangerous adults.</p>
    <h2>What gets scored</h2>
    <p>Awareness, Empathy, Safety, Rights, Evidence, Judgement and Courage. Scores describe decisions in the game; they do not rate the player as a person.</p>
    <h2>Evidence base</h2>
    <div class="source-list">${Object.values(DATA.SOURCES).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener"><b>${esc(s.name)}</b><span>Open source ↗</span></a>`).join("")}</div>
    <div class="callout"><b>Editorial rule</b><p>The game distinguishes allegations from established facts, avoids survivor blame, does not assume police are safe everywhere, and does not treat one country’s law as universal.</p></div>
    <h2>Accessibility and privacy</h2><p>Use the A/A+/A++ control to enlarge text. Scenario pages also include read-aloud where the browser supports it. Progress stays in this browser unless you clear it.</p><div class="actions"><button class="btn btn-primary" id="methodReturn">RETURN</button><button class="btn btn-ghost" id="clearAllBtn">CLEAR ALL GAME DATA ON THIS DEVICE</button></div>
  </section>`);
  document.getElementById("methodReturn").onclick=()=>state.selectedPath?home():welcome();
  const clear=document.getElementById("clearAllBtn");if(clear)clear.onclick=()=>{if(confirm("Clear all six game paths, badge names and progress from this browser? This cannot be undone.")){localStorage.removeItem(KEY);state=fresh();state.settings={textScale:0};save();welcome()}};
}

if(state.selectedPath&&currentProfile())home();else welcome();
})();