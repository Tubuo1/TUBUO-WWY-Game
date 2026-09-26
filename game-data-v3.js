(()=>{"use strict";

const SOURCES={
  whoVaw:{name:"WHO — Violence against women",url:"https://www.who.int/news-room/fact-sheets/detail/violence-against-women"},
  whoVac:{name:"WHO — Violence against children",url:"https://www.who.int/news-room/fact-sheets/detail/violence-against-children"},
  inspire:{name:"WHO — INSPIRE: seven strategies for ending violence against children",url:"https://www.who.int/publications/i/item/9789241565356"},
  unwPrevent:{name:"UN Women — Preventing violence against women",url:"https://www.unwomen.org/en/what-we-do/ending-violence-against-women/prevention"},
  unwOnline:{name:"UN Women — Online safety and technology-facilitated violence",url:"https://www.unwomen.org/en/articles/explainer/online-safety-101-what-every-woman-and-girl-should-know"},
  unwMen:{name:"UN Women — Engaging boys and young men in gender equality",url:"https://www.unwomen.org/en/what-we-do/youth/engaging-boys-and-young-men-in-gender-equality"},
  unfpa:{name:"UNFPA — Gender-based violence",url:"https://www.unfpa.org/gender-based-violence"},
  unicefVac:{name:"UNICEF — Violence against children",url:"https://www.unicef.org/protection/violence-against-children"},
  unicefOnline:{name:"UNICEF — Keeping children safe online",url:"https://www.unicef.org/protection/keeping-children-safe-online"},
  crc:{name:"UNICEF — Convention on the Rights of the Child, child-friendly version",url:"https://www.unicef.org/reports/convention-rights-child-children-version"}
};

const COUNTS=[20,30,40,50,60];
const PASS=[14,21,28,35,42];
const SKILLS=["Awareness","Empathy","Safety","Rights","Evidence","Judgement","Courage"];
const SKILLS_BY_STAGE=[["Awareness","Rights","Judgement"],["Safety","Rights","Judgement","Courage"],["Empathy","Safety","Courage","Rights"],["Evidence","Judgement","Rights","Safety"],SKILLS];

const PATHS={
 "adult-f":{id:"adult-f",age:"18+",sex:"female",level:"adult",label:"Women 18+",entryTitle:"WHAT WOULD YOU DO?",entrySub:"Relationships, safety & choice",description:"Adult situations seen through women’s everyday realities — relationships, work, family, digital life, public space and support.",stages:["See the Signs","Pressure & Control","Safety & Support","Evidence & Institutions","Complex Cases"],badges:["RED FLAG SPOTTER","SAFETY THINKER","RIGHTS DETECTIVE","EVIDENCE CHECKER","COMMUNITY ALLY"]},
 "adult-m":{id:"adult-m",age:"18+",sex:"male",level:"adult",label:"Men 18+",entryTitle:"WHAT WOULD YOU DO?",entrySub:"Respect, responsibility & action",description:"Adult situations written for men as partners, friends, fathers, colleagues, bystanders, survivors and people responsible for their own choices.",stages:["Respect & Responsibility","Pressure & Masculinity","Relationships & Consent","Bystander & Accountability","Complex Cases"],badges:["RESPECT BUILDER","PRESSURE BREAKER","CONSENT KEEPER","RESPONSIBLE BYSTANDER","ACCOUNTABLE ALLY"]},
 "teen-f":{id:"teen-f",age:"13–17",sex:"female",level:"teen",label:"Girls 13–17",entryTitle:"RELATIONSHIPS, PRESSURE & CHOICES",entrySub:"Know the signs. Keep your voice.",description:"School, friendships, first relationships, social media, rumours, boundaries, trusted adults and safe help-seeking.",stages:["Notice the Pressure","Boundaries & Consent","Online & Peer World","Helping Safely","Hard Choices"],badges:["BOUNDARY FINDER","DIGITAL SHIELD","VOICE KEEPER","SAFE FRIEND","STRONG DECISION MAKER"]},
 "teen-m":{id:"teen-m",age:"13–17",sex:"male",level:"teen",label:"Boys 13–17",entryTitle:"RELATIONSHIPS, PRESSURE & CHOICES",entrySub:"Respect is a choice.",description:"School, friendships, dating, group chats, pressure from other boys, digital behaviour, boundaries and safe bystander choices.",stages:["Respect Starts Here","Pressure & Boundaries","Digital Respect","Be the Upstander","Hard Choices"],badges:["RESPECT STARTER","PRESSURE BREAKER","DIGITAL RESPECT","UPSTANDER","RESPONSIBLE TEAMMATE"]},
 "child-f":{id:"child-f",age:"8–12",sex:"female",level:"child",label:"Girls 8–12",entryTitle:"LEARN YOUR BOUNDARIES",entrySub:"Your body. Your voice. Safe adults.",description:"Simple, age-appropriate stories about boundaries, unsafe secrets, bullying, online safety, trusted adults and helping friends.",stages:["My Space & Feelings","Secrets & Pressure","Friends & Safe Adults","Online & Real-World Safety","Strong Choices"],badges:["MY SPACE STAR","SECRET SPOTTER","SAFE ONLINE EXPLORER","TRUSTED ADULT FINDER","BRAVE HELPER"]},
 "child-m":{id:"child-m",age:"8–12",sex:"male",level:"child",label:"Boys 8–12",entryTitle:"LEARN YOUR BOUNDARIES",entrySub:"Respect your space and other people’s.",description:"Simple, age-appropriate stories about body boundaries, unsafe secrets, bullying, online safety, feelings, respect and trusted adults.",stages:["Respect My Space","Secrets & Pressure","Friends & Safe Adults","Online & Real-World Safety","Kind Choices"],badges:["RESPECT STAR","PRESSURE SPOTTER","SAFE ONLINE EXPLORER","TRUSTED ADULT FINDER","KIND UPSTANDER"]}
};

const SETTINGS={
 "adult-f":[
  {name:"Amina",place:"Yaoundé, Cameroon",setting:"finishing a late day at work",channel:"a family WhatsApp group"},
  {name:"Ada",place:"Lagos, Nigeria",setting:"spending a weekend with old university friends",channel:"Instagram and private messages"},
  {name:"Efua",place:"Accra, Ghana",setting:"preparing for a community event",channel:"a neighbourhood WhatsApp group"},
  {name:"Wanjiku",place:"Nairobi, Kenya",setting:"moving through her usual commute and workweek",channel:"phone location sharing"},
  {name:"Naledi",place:"Johannesburg, South Africa",setting:"balancing work and family responsibilities",channel:"private messages and calls"}
 ],
 "adult-m":[
  {name:"Daniel",place:"Douala, Cameroon",setting:"spending time with friends after work",channel:"a football-group WhatsApp chat"},
  {name:"Chinedu",place:"Abuja, Nigeria",setting:"spending a weekend with family",channel:"Instagram and direct messages"},
  {name:"Kato",place:"Kampala, Uganda",setting:"heading home after an evening with colleagues",channel:"a work chat and phone calls"},
  {name:"Mwila",place:"Lusaka, Zambia",setting:"managing a busy week at home",channel:"a friends’ group chat"},
  {name:"Tawanda",place:"Harare, Zimbabwe",setting:"planning a community event",channel:"WhatsApp and social media"}
 ],
 "teen-f":[
  {name:"Nayah",place:"Buea, Cameroon",setting:"moving between school, home and a youth group",channel:"WhatsApp"},
  {name:"Abena",place:"Kumasi, Ghana",setting:"juggling exam season and after-school activities",channel:"Snapchat and class chat"},
  {name:"Wanjiru",place:"Nairobi, Kenya",setting:"moving through school and the daily commute",channel:"Instagram and messaging"},
  {name:"Selma",place:"Windhoek, Namibia",setting:"moving between school and sports practice",channel:"a class group chat"},
  {name:"Awa",place:"Dakar, Senegal",setting:"juggling school and family activities",channel:"TikTok and private messages"}
 ],
 "teen-m":[
  {name:"Kiven",place:"Bamenda, Cameroon",setting:"moving between school and football practice",channel:"a boys’ WhatsApp group"},
  {name:"Tobi",place:"Lagos, Nigeria",setting:"moving between school and weekend hangouts",channel:"Instagram and class chat"},
  {name:"Joel",place:"Kampala, Uganda",setting:"moving between school and gaming with friends",channel:"a gaming server and WhatsApp"},
  {name:"Chanda",place:"Lusaka, Zambia",setting:"moving between sports practice and school",channel:"a team group chat"},
  {name:"Youssef",place:"Casablanca, Morocco",setting:"moving between school, home and friends",channel:"private messages and social media"}
 ],
 "child-f":[
  {name:"Mimi",place:"Yaoundé, Cameroon",setting:"moving between primary school and home",channel:"a family tablet"},
  {name:"Ama",place:"Accra, Ghana",setting:"moving between school and playtime",channel:"a children’s game chat"},
  {name:"Zuri",place:"Nairobi, Kenya",setting:"moving between school and an after-school club",channel:"a shared phone"},
  {name:"Lena",place:"Windhoek, Namibia",setting:"moving between sports and family visits",channel:"a gaming app"},
  {name:"Aïcha",place:"Dakar, Senegal",setting:"moving between home, school and time with cousins",channel:"a family device"}
 ],
 "child-m":[
  {name:"Kema",place:"Buea, Cameroon",setting:"moving between primary school and home",channel:"a family tablet"},
  {name:"Sami",place:"Abuja, Nigeria",setting:"moving between school and playtime",channel:"a children’s game chat"},
  {name:"Musa",place:"Kampala, Uganda",setting:"moving between school and an after-school club",channel:"a shared phone"},
  {name:"Tino",place:"Harare, Zimbabwe",setting:"moving between sports and family visits",channel:"a gaming app"},
  {name:"Adam",place:"Rabat, Morocco",setting:"moving between home, school and time with cousins",channel:"a family device"}
 ]
};

const THEMES={
"adult-f":[
 {id:"control",skill:"Awareness",scene:"{name} is {setting} in {place}. Her partner demands her live location, calls repeatedly when she does not answer and says privacy means she must be hiding something.",signal:"The pattern of monitoring, pressure and anger is the warning sign, not simply the use of a phone.",action:"Treat the monitoring as a real concern, keep her choices and safety central, and avoid forcing a confrontation.",check:"Look at the pattern and reliable evidence rather than one isolated message or someone’s reputation.",integrate:"Balance safety, privacy, agency and accountability; do not normalize surveillance as love.",why:"Repeated monitoring, isolation and intimidation can be forms of coercive control. A request is not automatically abuse; the pattern, pressure and consequences matter.",remember:"Care is not the same as control.",source:"whoVaw",effect:"It names the pattern without taking control away from the person experiencing it."},
 {id:"consent",skill:"Rights",scene:"In {place}, {name} says her partner keeps pushing for sex after she says no and argues that being married or in a long relationship means she should agree.",signal:"A relationship does not create permanent consent; pressure after a clear no is the central concern.",action:"Respect the refusal, stop the pressure and support her right to decide what happens to her body.",check:"Do not let relationship status, family opinion or past consent replace the question of present, freely given consent.",integrate:"Keep bodily autonomy, safety and freely given consent at the centre, even when family or social pressure is strong.",why:"Consent must be present for the current sexual activity. Past consent, marriage or affection does not create automatic consent for the future.",remember:"Consent is current, specific and freely given.",source:"whoVaw",effect:"It keeps the focus on bodily autonomy rather than entitlement."},
 {id:"economic",skill:"Awareness",scene:"{name} is {setting}. Her partner blocks her from working, controls the bank card and demands receipts for small purchases while freely spending money himself.",signal:"Preventing work and tightly controlling money can be economic abuse and a way of creating dependence.",action:"Recognize the control, ask what support would increase safety and options, and avoid making sudden decisions for her.",check:"Separate ordinary budgeting from a one-sided pattern that removes another adult’s access, choice or independence.",integrate:"Address the money control alongside safety, practical options and her own priorities rather than treating finances as a separate issue.",why:"Economic restriction can be used to create dependence and reduce a person’s ability to make choices or leave unsafe situations.",remember:"Money can be used as a tool of control.",source:"unfpa",effect:"It makes an often-hidden form of abuse visible."},
 {id:"digital",skill:"Safety",scene:"Using {channel}, an ex-partner threatens to share intimate images of {name} unless she sends money, meets him and gives him access to her accounts.",signal:"The threats combine sexualized blackmail, digital abuse and coercion.",action:"Do not bargain with the threat on his terms; preserve useful evidence safely, protect accounts and seek locally appropriate support without spreading the images.",check:"Verify what was sent and preserve only what is needed; do not redistribute intimate material in the name of ‘evidence’.",integrate:"Protect privacy and safety, preserve evidence carefully and support her choices while avoiding further circulation of the material.",why:"Technology can be used to threaten, stalk, blackmail or control. Online abuse can have serious offline consequences.",remember:"Do not spread harm while trying to prove it.",source:"unwOnline",effect:"It reduces further exposure while keeping options open."},
 {id:"stalking",skill:"Safety",scene:"In {place}, after ending a relationship, {name} notices her former partner waiting near her workplace, contacting her from new numbers and asking friends where she is.",signal:"Repeated unwanted contact and appearing at places she uses can be a serious safety concern.",action:"Take the pattern seriously, document what is safe to document, and help her think through support and safety options without arranging a surprise confrontation.",check:"Look for repeated behaviour, timing and corroboration; do not dismiss the pattern because each incident seems small by itself.",integrate:"Prioritize safety and agency, limit location exposure and use appropriate local support while evidence is assessed.",why:"Stalking and repeated unwanted contact can escalate. Forced confrontation may increase danger.",remember:"Patterns matter more than isolated excuses.",source:"unwOnline",effect:"It treats the behaviour seriously without creating a new confrontation."},
 {id:"work",skill:"Courage",scene:"At work in {place}, a supervisor tells {name} that better shifts or a promotion could be easier if she goes out with him, then makes sexual comments when she declines.",signal:"The supervisor is using workplace power and sexual pressure, not simply ‘flirting badly’.",action:"Support safe documentation and reporting choices, check what she wants, and consider retaliation risk instead of publicly exposing her story without consent.",check:"Distinguish what was witnessed, what was reported and what can be corroborated; power imbalance is relevant context.",integrate:"Combine support, fair process, privacy and protection against retaliation; neither silence nor public accusation should replace careful action.",why:"Sexual harassment can be intensified by workplace power, dependence and fear of retaliation.",remember:"Power changes the meaning of pressure.",source:"unwPrevent",effect:"It supports accountability without taking over the affected person’s choices."},
 {id:"family",skill:"Rights",scene:"During a family discussion in {place}, relatives tell {name} that bride-price or marriage payments mean she belongs to her husband and must return to him even if she feels unsafe.",signal:"Using a cultural or financial practice to claim ownership or excuse coercion is the warning sign.",action:"Reject the ownership claim, take her safety seriously and help her consider options she chooses.",check:"Do not treat ‘tradition’ as proof that coercion is acceptable; separate cultural practice from claims that erase a person’s rights.",integrate:"Respect culture without using it to justify ownership, violence or forced return to danger.",why:"Cultural or financial practices do not turn one adult into another adult’s property or remove bodily autonomy and dignity.",remember:"Culture does not cancel consent or safety.",source:"unfpa",effect:"It respects culture while drawing a clear line against coercion."},
 {id:"support",skill:"Empathy",scene:"A friend tells {name} quietly that her partner scares her but asks her not to tell the whole family yet.",signal:"The disclosure deserves to be taken seriously without immediately taking control away from the person speaking.",action:"Listen without blame, ask what support she wants, consider safety with her and explain any limits if there is an immediate risk to a child or another person.",check:"Avoid treating silence, delay or returning to a relationship as proof that the disclosure is false.",integrate:"Support her agency and safety while staying alert to serious risk; help should not become another form of control.",why:"Supportive responses listen, avoid blame and respect agency while taking safety seriously.",remember:"Helping is not the same as taking over.",source:"unfpa",effect:"It makes it more likely that the person feels heard rather than controlled."},
 {id:"evidence",skill:"Evidence",scene:"A post shared through {channel} names a man in {place} and accuses him of serious sexual violence. The screenshot is cropped, the original source is unclear and thousands of people are reposting it.",signal:"The allegation may be serious, but virality does not turn an unverified claim into an established fact.",action:"Avoid republishing private details, seek reliable verification where appropriate and distinguish allegations from confirmed findings.",check:"Check provenance, corroboration and what is actually known before making stronger public claims.",integrate:"Take possible harm seriously while protecting privacy, evidence quality and fair process; support and verification can happen at the same time.",why:"Evidence-minded handling does not mean dismissing reports. It means being precise about what is reported, corroborated or established.",remember:"Serious claims deserve serious verification.",source:"unfpa",effect:"It reduces misinformation without treating the report as unimportant."},
 {id:"disability",skill:"Safety",scene:"In {place}, {name} learns that a woman with a disability has a caregiver who hides her mobility aid when angry and decides when she may leave the house.",signal:"Withholding an essential aid to control movement can be abuse and can create immediate safety risks.",action:"Take the report seriously, consider accessible support and communication, and avoid assuming the caregiver should speak for her.",check:"Centre the woman’s own account and accessibility needs instead of treating dependence on care as consent to control.",integrate:"Combine safety, autonomy, accessibility and accountability; support must not reproduce the same loss of control.",why:"People who depend on others for care can face specific forms of control. Assistance does not give a caregiver ownership over another adult.",remember:"Support should increase autonomy, not remove it.",source:"unfpa",effect:"It recognizes both the abuse and the accessibility needs around responding."},
 {id:"migration",skill:"Judgement",scene:"A woman working in {place} tells {name} that her supervisor threatens to report her immigration status or keep her documents if she refuses sexual demands.",signal:"The immigration and employment threat increases the power imbalance and can make the sexual pressure more coercive.",action:"Consider confidential, locally appropriate support that accounts for retaliation risk, documents and employment dependence.",check:"Do not assume her legal or work status makes the sexual pressure acceptable; verify facts without exposing her unnecessarily.",integrate:"Address coercion, immigration risk, documents, livelihood and safety together rather than pushing one dramatic response.",why:"Migration and employment dependence can intensify vulnerability and fear of retaliation.",remember:"A person’s status does not erase their right to safety and dignity.",source:"unfpa",effect:"It takes the power imbalance seriously and avoids creating avoidable retaliation."},
 {id:"bystander",skill:"Courage",scene:"On public transport in {place}, {name} sees a passenger repeatedly touch a woman after she moves away and tells him to stop.",signal:"The repeated unwanted touching after a clear attempt to move away is the issue.",action:"If safe, create space, check what support she wants and seek appropriate help without starting a fight that could increase danger.",check:"Focus on what was observed and the woman’s wishes; avoid filming her face or turning the incident into public content.",integrate:"Use proportionate bystander action that protects the person targeted, respects her choices and avoids needless escalation.",why:"Bystander action should reduce harm. Public exposure or physical confrontation can create additional risks.",remember:"Intervene for safety, not for spectacle.",source:"unwPrevent",effect:"It helps without turning the situation into another loss of control."}
],
"adult-m":[
 {id:"consent",skill:"Rights",scene:"{name} is {setting} in {place}. His partner says she does not want sex tonight. A friend tells him, ‘Keep asking — she’ll give in eventually.’",signal:"The problem is the pressure after a clear refusal; persistence does not create consent.",action:"Stop asking, respect the no and do not treat disappointment as permission to pressure.",check:"Judge the situation by present, freely given consent rather than past sex, relationship status or what friends say men are entitled to.",integrate:"Choose respect even when pride, peer pressure or frustration is present; consent is not something to wear down.",why:"Consent must be freely given for the current activity. Pressure, entitlement or repeated asking after a refusal can undermine genuine choice.",remember:"A no is not a negotiation strategy.",source:"whoVaw",effect:"It removes pressure and respects the other person’s bodily autonomy."},
 {id:"jealousy",skill:"Awareness",scene:"In {place}, {name} feels jealous and starts asking for passwords, live location and screenshots of conversations, telling himself that a faithful partner should prove she has nothing to hide.",signal:"Jealousy does not justify surveillance; demanding proof and access can become coercive control.",action:"Manage the jealousy without monitoring her, talk respectfully about concerns and accept her right to privacy.",check:"Look at your own behaviour and the pattern of demands rather than using suspicion as proof of wrongdoing.",integrate:"Take responsibility for insecurity without turning it into surveillance, threats or punishment.",why:"Trust is not built by stripping another adult of privacy. Controlling behaviour can be framed as protection or love.",remember:"Feeling jealous does not give you extra rights over another person.",source:"unwMen",effect:"It shifts responsibility back to the person choosing the monitoring."},
 {id:"peers",skill:"Courage",scene:"In {channel}, friends of {name} share jokes saying women who reject men deserve to be humiliated. Everyone laughs and tags a woman from their community.",signal:"The group is normalizing humiliation and hostility toward women, not just making a harmless joke.",action:"Do not join in; challenge the idea if safe, stop forwarding it and avoid targeting the woman further.",check:"Separate humour from conduct that degrades, threatens or directs a crowd at a real person.",integrate:"Use your influence with other men to interrupt the norm without turning the woman into a public lesson or spectacle.",why:"Peer groups can reinforce harmful gender norms. Men and boys can also interrupt those norms through ordinary choices.",remember:"Silence can help a bad group norm feel normal.",source:"unwMen",effect:"It removes your participation from the harm and can change what the group treats as acceptable."},
 {id:"friend-abuse",skill:"Courage",scene:"A close male friend tells {name} that he checks his girlfriend’s phone, decides who she can see and sometimes blocks the door when she tries to leave an argument.",signal:"The behaviour involves control and intimidation; friendship does not make it less serious.",action:"Do not cover for him. Challenge the behaviour clearly, encourage him to stop and seek help changing it, while considering the woman’s safety.",check:"Do not rely on ‘he is a good guy’ as evidence that the behaviour is harmless.",integrate:"Hold your friend accountable without arranging vigilantism or exposing the woman’s private information.",why:"Accountability between men can matter. Loyalty should not mean helping a friend hide or excuse coercive behaviour.",remember:"A good friend does not help you avoid responsibility.",source:"unwMen",effect:"It challenges the behaviour instead of protecting it."},
 {id:"images",skill:"Judgement",scene:"{name} receives an intimate image of a woman in {channel}. A friend says she sent it privately to someone else, so forwarding it in the group is ‘not a big deal.’",signal:"Private consent to one recipient is not consent for the image to be redistributed.",action:"Do not forward or save it unnecessarily; tell the group to stop sharing and avoid contacting or exposing the woman for entertainment.",check:"Do not treat the number of shares as proof that the material is public or consensual.",integrate:"Protect privacy, stop further spread and support responsible reporting if needed without circulating the image again.",why:"Image-based abuse can cause serious harm. Consent to create or send an image in one context does not automatically authorize wider distribution.",remember:"Private does not become public because someone betrayed trust.",source:"unwOnline",effect:"It stops you from becoming another link in the chain of harm."},
 {id:"anger",skill:"Judgement",scene:"During an argument at home in {place}, {name} punches a wall, blocks the doorway and later says, ‘I never touched her, so I did nothing wrong.’",signal:"Threatening behaviour and blocking someone’s movement can be intimidating even without a punch landing on a person.",action:"Move away from intimidation, give space, take responsibility and seek ways to manage conflict without threats, property damage or confinement.",check:"Assess the behaviour itself rather than using the absence of visible injury as the only test of harm.",integrate:"Take responsibility for intimidation, repair what can be repaired and change the behaviour rather than blaming anger or the other person.",why:"Violence and abuse are not limited to visible injuries. Threats, intimidation and controlling movement can create fear and danger.",remember:"Anger is a feeling; intimidation is a choice.",source:"whoVaw",effect:"It reduces immediate threat and focuses on responsibility."},
 {id:"fatherhood",skill:"Empathy",scene:"In {place}, {name} realizes his child has started hiding when adults argue because the child has seen repeated shouting, threats and objects being thrown at home.",signal:"Children can be harmed by frightening violence and intimidation even when they are not the direct target.",action:"Stop exposing the child to threatening behaviour, prioritize safety and seek appropriate support for the adults and child.",check:"Do not assume a child is unaffected simply because adults say the conflict is ‘between us.’",integrate:"Protect the child, take responsibility for adult behaviour and avoid making the child carry messages or choose sides.",why:"Children can be deeply affected by violence in the home. They are not responsible for managing adult conflict.",remember:"Children notice more than adults sometimes admit.",source:"unicefVac",effect:"It removes responsibility from the child and puts it back on adults."},
 {id:"work",skill:"Rights",scene:"At work in {place}, {name} supervises a junior employee. Colleagues tell him he should use his position to ‘get a date’ and laugh when he comments on her body.",signal:"A power imbalance makes sexual pressure and repeated comments more serious, not less.",action:"Stop the comments, keep professional boundaries and do not use schedules, evaluations or opportunities to obtain personal or sexual attention.",check:"Ask what conduct occurred and what workplace process applies; popularity or seniority is not proof of innocence.",integrate:"Respect boundaries, support fair process and protect against retaliation without turning the case into gossip.",why:"Workplace authority can make sexual pressure coercive because the other person may fear consequences for refusing.",remember:"Power creates responsibility, not entitlement.",source:"unwPrevent",effect:"It removes sexual pressure from a relationship where one person controls work opportunities."},
 {id:"male-survivor",skill:"Empathy",scene:"A male friend in {place} tells {name} that an older partner forced sexual activity and he feels ashamed because people say men are always supposed to want sex.",signal:"Stereotypes about masculinity do not make coercion impossible or make his disclosure less serious.",action:"Take him seriously, avoid jokes or disbelief and ask what support he wants without forcing confrontation.",check:"Do not use gender stereotypes as a lie detector; assess the report with the same care given to any serious allegation.",integrate:"Support him without turning male victimization into a reason to dismiss the disproportionate violence women face.",why:"Men and boys can experience sexual violence. Shame and stereotypes can make help-seeking harder.",remember:"Being male does not cancel the right to consent.",source:"unfpa",effect:"It makes space for help without reinforcing harmful stereotypes."},
 {id:"disclosure",skill:"Empathy",scene:"{name}’s sister says her partner scares her and asks him not to confront the man at his home.",signal:"Her fear and request about confrontation should be taken seriously.",action:"Listen, ask what support she wants and avoid turning support into a showdown that could increase danger.",check:"Do not treat returning to the relationship or changing her mind as proof that nothing happened.",integrate:"Be supportive and protective without taking away her choices or escalating the situation for your own sense of action.",why:"Survivor-centred support respects agency and safety. Dramatic confrontation can create additional risk.",remember:"Protection is not the same as control.",source:"unfpa",effect:"It keeps support focused on her safety rather than the helper’s anger."},
 {id:"evidence",skill:"Evidence",scene:"A colleague of {name} is accused online of sexual harassment. One group says ‘believe everything immediately’; another says ‘women lie.’ The original complaint is not public.",signal:"Both automatic dismissal and automatic conversion of an allegation into proven fact skip the need for careful support and fair process.",action:"Take the complaint seriously, support appropriate reporting and protection, and avoid declaring unverified details as established fact.",check:"Separate allegation, corroboration, evidence and findings. Fair process is compatible with taking possible harm seriously.",integrate:"Protect people from retaliation, support the complainant and preserve fair fact-finding without turning social media into a courtroom.",why:"Evidence-minded handling is not hostility to survivors. It is careful about what is known while still taking reports seriously.",remember:"Support and fair process are not enemies.",source:"unfpa",effect:"It avoids both dismissal and reckless certainty."},
 {id:"culture",skill:"Judgement",scene:"At a family gathering in {place}, older men tell {name} that paying bride-price means a husband has the right to control his wife and ‘discipline’ her if she disobeys.",signal:"The problem is the claim of ownership and permission to use coercion, not the existence of a cultural marriage practice itself.",action:"Reject the idea that payment creates ownership or a right to violence, and refuse to repeat it as normal.",check:"Distinguish cultural practice from claims that erase consent, dignity or safety.",integrate:"Respect culture while clearly refusing interpretations that justify control or violence.",why:"Culture can shape relationships, but it should not be used to justify ownership, coercion or violence.",remember:"Tradition does not make harm harmless.",source:"unwMen",effect:"It challenges the harmful claim without insulting an entire culture."}
],
"teen-f":[
 {id:"dating-control",skill:"Awareness",scene:"{name} is {setting} in {place}. A boyfriend asks for her passwords, wants screenshots of every chat and gets angry if she does not share her live location.",signal:"The repeated demands for access and anger about privacy are signs of control, not proof of love.",action:"Keep her passwords private, tell a trusted person if she feels pressured or unsafe and avoid meeting pressure with more secrecy and fear.",check:"Look at the pattern of demands and consequences rather than accepting ‘I care about you’ as an explanation for surveillance.",integrate:"Protect privacy, ask for trusted support and do not let relationship pressure decide who she may talk to.",why:"Digital monitoring can be part of controlling behaviour. Healthy relationships allow privacy and choice.",remember:"Trust does not require passwords.",source:"unwOnline",effect:"It protects digital privacy and makes the pressure easier to name."},
 {id:"consent",skill:"Rights",scene:"In {place}, someone {name} is dating keeps asking for sexual touching after she says she is not ready and says, ‘If you loved me, you would.’",signal:"Using love, guilt or fear of losing the relationship to get sexual agreement is pressure, not respectful consent.",action:"Her no or not-yet should be respected. She can leave the situation and tell a trusted adult if she feels pressured or unsafe.",check:"Past kissing, dating status or friends’ opinions do not decide consent for what is happening now.",integrate:"Keep consent, safety and trusted support central; she does not owe sexual activity to keep a relationship.",why:"Consent should be freely given. Emotional pressure can make it harder to choose freely.",remember:"Love is not a debt.",source:"unfpa",effect:"It takes pressure out of the decision and puts choice back with her."},
 {id:"images",skill:"Safety",scene:"Through {channel}, a classmate threatens to share an intimate image of {name} unless she sends another one and agrees to meet him.",signal:"The threat is coercion and image-based abuse; sending more does not make the threat safe.",action:"Do not send more to satisfy the threat. Save only what is useful without redistributing it, block or secure accounts where safe and tell a trusted adult.",check:"Do not forward the image to friends ‘for proof’; preserve evidence in a way that does not spread it.",integrate:"Get trusted help, protect accounts and privacy, keep useful evidence and avoid handling the threat alone.",why:"Children and teens can be targeted through image-based abuse and extortion. The person making the threat is responsible for the threat.",remember:"A threat is not your fault, and you do not have to solve it alone.",source:"unicefOnline",effect:"It stops the pressure from forcing another risky action and brings in safer support."},
 {id:"rumours",skill:"Empathy",scene:"At school in {place}, students use {channel} to spread sexual rumours about {name} after she rejects someone. People begin laughing when she walks past.",signal:"The rumours and group humiliation are harassment; rejection does not justify punishment.",action:"Do not share the rumour, save useful evidence if safe, talk to a trusted adult and stay close to friends who do not join the harassment.",check:"Popularity and repeated reposting do not make the rumour true.",integrate:"Protect privacy and safety, challenge the harassment safely and separate evidence from gossip.",why:"Online and school-based harassment can cause real harm. Sexualized rumours are not harmless entertainment.",remember:"A rumour repeated many times is still a rumour.",source:"unwOnline",effect:"It reduces the audience for the harassment and brings in support."},
 {id:"adult-boundary",skill:"Safety",scene:"An older coach or teacher in {place} starts sending {name} private late-night messages, calls her ‘mature for her age’ and asks her to keep their conversations secret.",signal:"An adult creating secrecy and a special private relationship with a teen is a boundary warning sign.",action:"She should not carry the secret alone; keep the messages if safe and tell a trusted adult who can help.",check:"Do not treat the adult’s job title or reputation as proof that the messages are appropriate.",integrate:"Bring in safe adults, protect the teen’s privacy and let responsible adults handle investigation rather than asking her to confront the adult.",why:"Adults have responsibility for maintaining appropriate boundaries with minors. Secrecy and manipulation can be warning signs.",remember:"A trustworthy adult does not need a child to hide a relationship from safe adults.",source:"unicefVac",effect:"It moves responsibility to adults who can protect rather than onto the teen."},
 {id:"school-harassment",skill:"Courage",scene:"On the way home in {place}, boys repeatedly make sexual comments at {name}, block her path and laugh when she asks them to stop.",signal:"Blocking her path and continuing after she asks them to stop is harassment, not harmless teasing.",action:"Move toward safety, seek help from trusted adults or others nearby and document/report when safe; she does not need to argue with a group.",check:"Do not blame her clothes, route or response for the boys’ behaviour.",integrate:"Focus on stopping the harassment, protecting her access to school and holding those responsible accountable without making her change her whole life.",why:"Responsibility for harassment belongs to the people doing it. Safety advice should not turn into blame.",remember:"Safety choices are not admissions of fault.",source:"unwPrevent",effect:"It keeps responsibility with the people causing the harm."},
 {id:"friend",skill:"Empathy",scene:"A close friend tells {name} that her boyfriend scares her but says she is not ready to tell everyone.",signal:"The disclosure should be taken seriously without forcing her into a public story.",action:"Listen, avoid blame, ask what she wants and encourage support from a trusted adult if there is fear or danger.",check:"Do not decide she is lying because she later talks to the boyfriend again.",integrate:"Stay supportive, involve a safe adult when needed and do not turn the disclosure into school gossip.",why:"Teens may need trusted adults to help with safety. Friends can support without becoming investigators or rescuers.",remember:"Be a friend, not a detective.",source:"unicefVac",effect:"It preserves trust and brings in adults when the situation is bigger than friends can safely manage."},
 {id:"party",skill:"Safety",scene:"At a gathering in {place}, {name} notices a friend is being pressured to leave with someone while she looks uncomfortable and keeps trying to stay near the group.",signal:"Her discomfort and attempts to stay near friends are reasons to check in, not to assume she wants to leave.",action:"Check privately what she wants, help her stay or leave safely if she asks, and get a trusted adult or safe transport support where needed.",check:"Do not post videos or announce her private situation to the whole group.",integrate:"Keep her wishes and immediate safety central without turning the situation into a fight.",why:"Bystander support can be simple: notice, check in, create options and avoid escalation.",remember:"Ask before acting for someone.",source:"unwPrevent",effect:"It gives the friend more safe choices."},
 {id:"grooming",skill:"Awareness",scene:"Someone {name} met through {channel} says he is a teen, sends gifts in a game and then asks for private photos and the name of her school.",signal:"Gifts, secrecy and requests for personal information or photos can be part of online grooming or exploitation.",action:"Do not send the information or images; block/report where possible and tell a trusted adult.",check:"Do not assume an online profile proves a person’s real age or identity.",integrate:"Protect personal information, keep evidence if safe and involve a trusted adult instead of meeting the person alone.",why:"Online perpetrators may build trust before asking children for sexual images, private information or meetings.",remember:"You never owe someone personal information because they were nice or gave you something.",source:"unicefOnline",effect:"It reduces access to personal information and brings in adult support."},
 {id:"home",skill:"Safety",scene:"At home in {place}, {name} hears repeated threats and sees one adult push another. She worries that telling someone will ‘break the family.’",signal:"Violence at home is an adult responsibility; she is not responsible for keeping it secret to protect the family image.",action:"Move to a safer place if possible and tell a trusted adult who can help; she should not step between violent adults.",check:"Do not ask her to prove the whole story before an adult takes her fear seriously.",integrate:"Keep her safe, involve responsible adults and do not make her carry messages or solve the adults’ conflict.",why:"Children and teens can be harmed by witnessing violence. They are not responsible for stopping adult violence.",remember:"Your job is to get help, not to become the referee.",source:"unicefVac",effect:"It shifts responsibility from the teen to safe adults."},
 {id:"evidence",skill:"Evidence",scene:"A cropped screenshot in {channel} accuses a student at {name}’s school of sexual assault. People demand that everyone repost it immediately.",signal:"The allegation is serious, but a cropped viral screenshot is not the same as a verified finding.",action:"Do not spread private details; encourage safe reporting to trusted adults or appropriate channels and avoid online pile-ons.",check:"Ask what is known, what is alleged and whether the source is reliable before adding new claims.",integrate:"Take possible harm seriously while protecting privacy and allowing responsible adults or institutions to examine the facts.",why:"Careful evidence handling protects both people reporting harm and people who may be wrongly identified.",remember:"You can take a report seriously without pretending you know facts you do not know.",source:"unicefVac",effect:"It stops the group chat from becoming the investigation."},
 {id:"isolation",skill:"Judgement",scene:"Someone {name} is dating in {place} says her best friends are ‘bad influences’ and gets angry whenever she spends time with them without him.",signal:"Trying to cut someone off from friends and punishing independent time can be a control warning sign.",action:"Keep supportive friendships, notice the pattern and tell a trusted adult if the pressure or fear grows.",check:"Do not accept jealousy as proof that friends are unsafe or that isolation is necessary.",integrate:"Protect her connections and choices while taking any threats seriously; healthy relationships do not require shrinking your whole world.",why:"Isolation can make a person more dependent and easier to control.",remember:"A healthy relationship leaves room for other safe relationships.",source:"unwPrevent",effect:"It protects the social support that controlling behaviour often tries to weaken."}
],
"teen-m":[
 {id:"consent",skill:"Rights",scene:"{name} is {setting} in {place}. Friends tell him that if a girl agrees to a date or kissing, he should keep pushing for more because ‘that’s what guys do.’",signal:"A date or one kind of affection is not consent to everything else.",action:"Pay attention to the other person’s words and comfort, stop when she says no or seems unwilling, and do not use peer pressure as a rule for intimacy.",check:"Past consent and friends’ expectations do not decide what another person wants now.",integrate:"Choose respect over peer approval; consent has to be present, specific and freely given.",why:"Healthy relationships require respect for boundaries. Masculinity does not require sexual pressure.",remember:"Respect is stronger than proving something to friends.",source:"unwMen",effect:"It keeps another person’s choice intact and gives the player ownership of his own behaviour."},
 {id:"images",skill:"Judgement",scene:"In {channel}, someone posts an intimate image of a girl from {name}’s school. Friends say, ‘Everyone already has it, so forwarding it changes nothing.’",signal:"Every new forward spreads the harm; private material does not become fair game because others violated privacy first.",action:"Do not forward it, tell friends to stop and use a safe reporting route without contacting or shaming the girl.",check:"Do not save or resend the image as casual ‘proof.’",integrate:"Stop the spread, preserve only what is necessary for reporting and protect the person pictured from further exposure.",why:"Non-consensual image sharing can be a form of sexual abuse or exploitation and can cause serious harm.",remember:"Do not become the next person who spreads it.",source:"unicefOnline",effect:"It breaks the chain of sharing."},
 {id:"peer-misogyny",skill:"Courage",scene:"At school in {place}, boys in {name}’s group make sexual jokes about girls, rate their bodies and mock any boy who says it is disrespectful.",signal:"The group is using humiliation to make disrespect feel normal and to pressure boys into joining.",action:"Do not participate; challenge or redirect it if safe and refuse to target real girls for entertainment.",check:"Ask who is being harmed and whether the joke depends on degrading someone who did not agree to be part of it.",integrate:"Use your place in the group to help change the norm without making yourself the hero or exposing the girls further.",why:"Peer norms can shape behaviour. Boys and young men can help interrupt ideas that normalize harassment.",remember:"You do not need a crowd’s permission to be respectful.",source:"unwMen",effect:"It weakens the social reward for disrespect."},
 {id:"dating-control",skill:"Awareness",scene:"{name} gets jealous and asks the girl he is dating for passwords and location screenshots. He tells himself he is only doing it because he cares.",signal:"Jealousy does not make surveillance respectful; repeated demands for access can be controlling.",action:"Stop asking for private access, talk about insecurity without monitoring her and accept that she can have friends and privacy.",check:"Do not use suspicion as evidence or demand proof of innocence through phone access.",integrate:"Manage jealousy without turning it into rules, threats or surveillance.",why:"Controlling behaviour can be framed as love or protection. Respectful relationships leave room for privacy and independence.",remember:"A feeling is not a permission slip.",source:"unwMen",effect:"It makes the player responsible for how he handles jealousy."},
 {id:"bystander",skill:"Courage",scene:"On the way home in {place}, {name} sees a friend repeatedly block a girl’s path and make sexual comments after she tells him to stop.",signal:"Continuing after she says stop is harassment; friendship with the boy does not make it harmless.",action:"If safe, interrupt or get help, support the girl’s space and later challenge the friend’s behaviour rather than laughing along.",check:"Focus on what happened, not whether the friend is ‘usually a good guy.’",integrate:"Use safe bystander action, support the person targeted and hold the friend accountable without starting a dangerous fight.",why:"Bystanders can reduce harm by interrupting, getting help and refusing to normalize harassment.",remember:"Backing a friend does not mean backing every choice he makes.",source:"unwPrevent",effect:"It changes the immediate situation and the peer norm around it."},
 {id:"anger",skill:"Judgement",scene:"During an argument in {place}, {name} punches a locker and stands in front of the doorway. He says he did not hit anyone, so nobody should be scared.",signal:"Damaging things and blocking movement can be intimidating even without hitting a person.",action:"Step away, give space, take responsibility and use non-threatening ways to handle anger.",check:"Do not use ‘nobody was hit’ as the only test of whether behaviour created fear.",integrate:"Repair harm, change the behaviour and seek help with anger if needed instead of blaming the other person.",why:"Anger is normal; intimidation and threatening behaviour are choices that can frighten or control others.",remember:"Strong feelings do not excuse threatening actions.",source:"whoVac",effect:"It separates the emotion from the harmful behaviour."},
 {id:"male-survivor",skill:"Empathy",scene:"A boy tells {name} that an older person pressured him into sexual activity. He worries friends will say a boy should have wanted it.",signal:"Being male does not remove the right to consent or make coercion impossible.",action:"Take him seriously, avoid jokes, and encourage him to tell a trusted adult who can help.",check:"Do not use stereotypes about boys as proof that the report cannot be true.",integrate:"Support him and involve safe adults without forcing him to confront the person alone.",why:"Boys can experience sexual violence and may face extra shame because of stereotypes about masculinity.",remember:"Boys also have boundaries.",source:"unicefVac",effect:"It makes help-seeking safer and reduces shame."},
 {id:"grooming",skill:"Safety",scene:"Someone {name} meets in a gaming server says he can send expensive game credits, then asks for a private photo and says they should keep the chat secret from adults.",signal:"Gifts, secrecy and requests for private images are warning signs of manipulation or exploitation.",action:"Do not send the image or personal information; block/report where possible and tell a trusted adult.",check:"Do not assume a profile picture or claimed age proves who the person is.",integrate:"Protect personal information, keep useful evidence if safe and get adult help rather than arranging a meeting.",why:"Online exploiters may build trust with children before requesting images, information or secrecy.",remember:"A gift does not buy access to you.",source:"unicefOnline",effect:"It cuts off the pressure and brings in safer support."},
 {id:"adult-boundary",skill:"Safety",scene:"A coach in {place} begins messaging {name} privately late at night, shares sexual jokes and says mature players can handle conversations their parents would not understand.",signal:"An adult asking a teen to keep inappropriate private conversations secret is a boundary warning sign.",action:"Save the messages if safe and tell a trusted adult; the teen should not be expected to manage the adult alone.",check:"The coach’s popularity or status is not proof the messages are appropriate.",integrate:"Bring in responsible adults, protect privacy and use proper safeguarding processes rather than peer confrontation.",why:"Adults have responsibility for maintaining appropriate boundaries with minors.",remember:"A safe adult does not need secret sexual conversations with a child.",source:"unicefVac",effect:"It puts responsibility on adults who can intervene."},
 {id:"friend-disclosure",skill:"Empathy",scene:"A girl who is friends with {name} says her boyfriend scares her and asks him not to confront the boyfriend.",signal:"Her fear and request should be heard; helping is not a licence to take over.",action:"Listen, ask what support she wants and encourage a trusted adult if there is danger rather than arranging a showdown.",check:"Do not treat her choices after disclosure as proof that she lied.",integrate:"Be supportive, protect privacy and involve safe adults where necessary without making the situation about your anger.",why:"Friends can support someone experiencing abuse, but teens should not be expected to manage dangerous situations alone.",remember:"Listen before you act.",source:"unicefVac",effect:"It keeps support focused on her needs rather than the helper’s ego."},
 {id:"evidence",skill:"Evidence",scene:"A screenshot in {channel} accuses a student in {place} of sexual assault. The image is cropped and nobody can find the original post.",signal:"The allegation is serious, but the screenshot does not prove every claim being added to it.",action:"Do not spread names and private details; encourage safe reporting to adults or appropriate channels and avoid turning the chat into a trial.",check:"Separate what is alleged from what is verified and preserve relevant information without inventing missing facts.",integrate:"Take possible harm seriously while protecting privacy and fair fact-finding.",why:"Responsible evidence handling means neither dismissing reports nor pretending uncertain details are proven.",remember:"Share support, not rumours.",source:"unicefVac",effect:"It keeps peer pressure from replacing a proper response."},
 {id:"home",skill:"Safety",scene:"At home in {place}, {name} sees one adult threaten and shove another. He thinks he should step between them because ‘a real man protects the family.’",signal:"A child or teen should not be expected to physically stop violent adults.",action:"Move toward safety, take younger children with him if safe, and tell a trusted adult or seek appropriate help rather than entering the fight.",check:"Do not shame him for feeling afraid or say he failed because he did not physically intervene.",integrate:"Get safe, get help and leave adult violence to responsible adults or services; bravery does not require dangerous confrontation.",why:"Children and teens can be harmed by witnessing or entering adult violence. They are not responsible for controlling adults.",remember:"Getting help can be brave.",source:"unicefVac",effect:"It reduces the risk of the teen becoming another person harmed."}
],
"child-f":[
 {id:"body",skill:"Rights",scene:"{name} is {setting} in {place}. A relative keeps tickling and hugging her after she says, ‘Please stop. I don’t like it.’",signal:"Her ‘stop’ matters. Children are allowed to have body boundaries even with people they love.",action:"Move away if she can and tell a safe adult. A safe adult should help the touching stop.",check:"Being family does not mean a child has to accept unwanted touching or affection.",integrate:"Respect the child’s no, help her get space and involve a safe adult without blaming her.",why:"Children can learn that their body belongs to them and that adults should respect reasonable boundaries.",remember:"You can say no to touch that makes you uncomfortable.",source:"crc",effect:"It shows that her words about her body matter."},
 {id:"secret",skill:"Safety",scene:"An older person tells {name}, ‘This is our special secret. If you tell any adult, everyone will be angry with you.’ The secret makes her stomach feel worried.",signal:"A secret that makes a child scared, trapped or worried should be told to a safe adult.",action:"Tell a safe adult she trusts. If the person says not to tell, she can still tell.",check:"An older person does not get to make an unsafe secret safe just by calling it ‘special’.",integrate:"Keep telling safe adults until someone listens and helps.",why:"Children should not be made responsible for hiding behaviour that frightens or harms them.",remember:"Surprises end. Unsafe secrets should be told.",source:"unicefVac",effect:"It breaks the secrecy that can keep a child isolated."},
 {id:"tell-again",skill:"Courage",scene:"{name} tells one adult that something is making her feel unsafe. The adult is busy and says, ‘You’re probably imagining it.’",signal:"One adult not listening does not mean she should stop asking for help.",action:"Tell another safe adult and keep telling until someone takes her seriously and helps.",check:"Children should not have to prove everything perfectly before an adult listens to a safety concern.",integrate:"Keep asking safe adults for help; she is not being troublesome by trying again.",why:"A child may need to tell more than one trusted adult before getting help.",remember:"If one safe adult does not help, tell another.",source:"crc",effect:"It gives the child another route to safety instead of ending the help-seeking."},
 {id:"online",skill:"Awareness",scene:"Someone {name} meets through {channel} asks what school she goes to, where she lives and whether she can keep their chat secret.",signal:"Requests for private information and secrecy from someone online are warning signs.",action:"Do not share the information. Stop the chat, block/report if possible and tell a safe adult.",check:"A profile picture does not prove that an online person is really a child.",integrate:"Keep personal information private and bring in a safe adult before any meeting or private exchange.",why:"People online may pretend to be someone they are not and may try to gain a child’s trust.",remember:"Keep your school, address and private details private.",source:"unicefOnline",effect:"It makes it harder for the unknown person to reach the child offline."},
 {id:"photo",skill:"Safety",scene:"A person in {channel} tells {name} she will get game coins if she sends a private picture in her underwear.",signal:"An offer of gifts for a private body picture is not a safe request.",action:"Do not send the picture; tell a safe adult and block/report the person where possible.",check:"Getting a gift or game coins does not mean the person is trustworthy.",integrate:"Get adult help, protect the account and do not meet the person.",why:"Adults and older children can use gifts or rewards to manipulate children into sharing sexual images.",remember:"Nobody gets to buy a private picture of your body.",source:"unicefOnline",effect:"It stops the exchange and brings in adult protection."},
 {id:"bullying",skill:"Empathy",scene:"At school in {place}, classmates call {name} ‘ugly’ and ‘not girly enough’ every day and post jokes about her in a class chat.",signal:"Repeated humiliation and online teasing can be bullying, not just a joke.",action:"Save or show useful messages to a safe adult, stay near supportive friends and avoid replying with threats.",check:"Lots of laughing emojis do not make bullying harmless.",integrate:"Get adult help, support the child being targeted and work on stopping the behaviour rather than changing her to please bullies.",why:"Bullying involves repeated unwanted aggression and often a power imbalance. It can happen at school and online.",remember:"A joke is not kind if the same person keeps getting hurt.",source:"whoVac",effect:"It brings the bullying out of the group chat and into adult support."},
 {id:"gift",skill:"Awareness",scene:"An adult in {place} gives {name} special gifts, asks to be alone with her and says she must not tell her parents because they ‘wouldn’t understand.’",signal:"Gifts plus secrecy and trying to isolate a child are warning signs.",action:"Tell a safe adult and avoid being alone with the person if she can.",check:"An adult being generous does not mean every request is safe.",integrate:"Bring in safe adults and do not make the child confront the adult alone.",why:"People who harm children may first build trust, offer gifts or create secrecy.",remember:"A gift never buys the right to break your boundaries.",source:"unicefVac",effect:"It reduces isolation and brings in adults who can protect."},
 {id:"friend-touch",skill:"Empathy",scene:"A friend tells {name} that an older child touched her private parts and told her she would get in trouble if she told.",signal:"The friend needs safe adult help; the threat to keep quiet should not be obeyed.",action:"Believe that the friend is worried, do not ask for lots of details and tell a safe adult who can help.",check:"Children should not try to investigate or confront the older child themselves.",integrate:"Stay kind, protect privacy and get a safe adult involved.",why:"Children should not be responsible for investigating sexual abuse. Safe adults and professionals should handle it.",remember:"A good friend helps you find a safe adult.",source:"unicefVac",effect:"It connects the friend with help without turning children into investigators."},
 {id:"home",skill:"Safety",scene:"At home in {place}, {name} hears adults screaming and sees one adult hit another. She wants to stand between them so they stop.",signal:"It is not a child’s job to physically stop violent adults.",action:"Move to a safer place if she can and tell a safe adult or seek appropriate help.",check:"Feeling scared does not mean she is weak or responsible for what the adults do.",integrate:"Get safe, get help and do not make the child carry messages between violent adults.",why:"Children can be harmed when adults are violent at home. Adults are responsible for adult violence.",remember:"Your job is to get safe and get help.",source:"unicefVac",effect:"It lowers the chance that the child is hurt while trying to intervene."},
 {id:"relative",skill:"Rights",scene:"At a family visit in {place}, an older relative says {name} is rude if she does not sit on his lap and kiss him. She feels uncomfortable.",signal:"Respecting elders does not mean a child must accept unwanted physical affection.",action:"She can say no, move away and ask a safe adult to support her boundary.",check:"Family status does not cancel a child’s right to feel safe about touch.",integrate:"Adults should support the child’s boundary without shaming her for being ‘disrespectful’.",why:"Teaching children that their boundaries matter can help them speak up when touch feels uncomfortable.",remember:"You can be polite and still say no to touch.",source:"crc",effect:"It shows the child that respect works both ways."},
 {id:"school-adult",skill:"Safety",scene:"A school adult asks {name} to stay alone in a locked room after everyone leaves and says there is no need to tell anyone about their private talks.",signal:"A child should not be asked to keep secret private meetings with an adult that make her uncomfortable.",action:"Leave if she can and tell another safe adult what happened.",check:"A job title does not mean every adult request must be obeyed without question.",integrate:"Use school safeguarding procedures and safe adults; do not make the child confront the adult alone.",why:"Adults in authority have a duty to keep appropriate, safe boundaries with children.",remember:"Safe adults do not need unsafe secrecy.",source:"unicefVac",effect:"It brings another responsible adult into the situation."},
 {id:"friend-bully",skill:"Courage",scene:"At school in {place}, {name} sees older pupils corner a smaller girl, call her names and take her bag.",signal:"The smaller child may need help, but {name} does not have to fight older children to prove she is brave.",action:"Get a teacher or another safe adult, stay nearby if safe and do not join the bullying.",check:"Do not film and post the child being bullied.",integrate:"Get adult help and support the child without creating another fight.",why:"Children can be helpful by getting safe adult support rather than taking dangerous situations into their own hands.",remember:"Getting help is a real way to help.",source:"inspire",effect:"It brings in someone with more power to stop the bullying."}
],
"child-m":[
 {id:"body",skill:"Rights",scene:"{name} is {setting} in {place}. A friend says ‘stop’ during rough play, but other children tell {name} that boys should keep going and not be ‘soft.’",signal:"When someone says stop, respectful play stops. Being a boy does not change that.",action:"Stop, check that the friend is okay and choose a game everyone wants to keep playing.",check:"Do not use ‘boys are rough’ as a reason to ignore someone’s boundary.",integrate:"Respect other people’s boundaries and expect your own boundaries to be respected too.",why:"Children can learn consent and boundaries in ordinary play. Respecting ‘stop’ is part of keeping play safe.",remember:"Stop means stop in play too.",source:"crc",effect:"It keeps the game fun and safe for everyone."},
 {id:"secret",skill:"Safety",scene:"An older person tells {name}, ‘This is our secret. If you tell your parents, you’ll get me in trouble.’ The secret makes him worried.",signal:"A secret that makes a child scared, trapped or worried should be told to a safe adult.",action:"Tell a safe adult he trusts even if the older person said not to.",check:"Protecting an older person from consequences is not a child’s job.",integrate:"Keep telling safe adults until someone listens and helps.",why:"Children should not be forced to carry unsafe secrets for adults or older children.",remember:"Unsafe secrets should be told.",source:"unicefVac",effect:"It breaks the secrecy and brings in protection."},
 {id:"tell-again",skill:"Courage",scene:"{name} tells one adult that someone is making him uncomfortable. The adult laughs and says, ‘Boys can handle themselves.’",signal:"The adult’s reaction is wrong; boys also deserve protection and help.",action:"Tell another safe adult and keep telling until someone listens.",check:"Being a boy does not make a safety concern less real.",integrate:"Keep asking for help; needing help does not make him weak.",why:"Gender stereotypes can stop boys from seeking help. Children of every sex have the right to protection from violence.",remember:"Asking for help is not weakness.",source:"crc",effect:"It gives the child another chance to be heard."},
 {id:"online",skill:"Awareness",scene:"Someone {name} meets through {channel} asks what school he attends, where he lives and whether they can keep the chat secret.",signal:"Requests for private information and secrecy from someone online are warning signs.",action:"Do not share the information. Stop the chat, block/report if possible and tell a safe adult.",check:"A username, profile picture or game skill does not prove who someone really is.",integrate:"Keep personal information private and bring in a safe adult before any meeting.",why:"People online may pretend to be someone they are not and may try to gain a child’s trust.",remember:"Keep private details private.",source:"unicefOnline",effect:"It makes it harder for the unknown person to reach the child offline."},
 {id:"photo",skill:"Safety",scene:"A person in {channel} promises {name} rare game items if he sends a private picture of his body.",signal:"Offering rewards for a private body picture is not a safe request.",action:"Do not send the picture; tell a safe adult and block/report the person where possible.",check:"A reward does not make the request safe or normal.",integrate:"Get adult help, protect the account and do not meet the person.",why:"Children can be manipulated online with gifts or rewards. Boys can be targeted too.",remember:"Nobody gets to buy a private picture of your body.",source:"unicefOnline",effect:"It stops the exchange and brings in adult help."},
 {id:"bullying",skill:"Empathy",scene:"At school in {place}, classmates call a boy ‘weak’ because he cried after being hurt and keep posting jokes about him in a group chat.",signal:"Repeated humiliation is bullying; boys are allowed to have feelings.",action:"Do not join in, support the boy and tell a safe adult if the bullying continues.",check:"Lots of people laughing does not make the behaviour kind or harmless.",integrate:"Help stop the bullying without demanding that the boy become tougher to earn respect.",why:"Bullying can be physical, social or online. Gender stereotypes can make boys hide hurt or avoid asking for help.",remember:"Feelings are not a failure.",source:"whoVac",effect:"It makes the group less rewarding for bullies and gives the child support."},
 {id:"gift",skill:"Awareness",scene:"An adult in {place} gives {name} special gifts, wants to be alone with him and says mature boys do not tell their parents everything.",signal:"Gifts plus secrecy and isolation are warning signs, no matter whether the child is a boy or girl.",action:"Tell a safe adult and avoid being alone with the person if he can.",check:"An adult being friendly or generous does not make every request safe.",integrate:"Bring in safe adults and do not make the child confront the adult alone.",why:"People who harm children may first build trust, offer gifts or create secrecy.",remember:"A gift never buys access to you.",source:"unicefVac",effect:"It reduces isolation and brings in adults who can help."},
 {id:"friend-touch",skill:"Empathy",scene:"A friend tells {name} that an older person touched him in a way that made him uncomfortable and said nobody would believe a boy.",signal:"The friend needs safe adult help; being a boy does not make the report impossible.",action:"Take him seriously, do not tease or demand details and tell a safe adult who can help.",check:"Children should not investigate or confront the older person themselves.",integrate:"Stay kind, protect privacy and get a safe adult involved.",why:"Boys can experience sexual abuse and may be silenced by stereotypes. Children need adults to handle investigations and protection.",remember:"Believe that your friend is worried and get adult help.",source:"unicefVac",effect:"It connects the friend with help instead of shame."},
 {id:"home",skill:"Safety",scene:"At home in {place}, {name} sees one adult threaten and hit another. He thinks he should jump in because boys are supposed to protect everyone.",signal:"It is not a child’s job to physically stop violent adults.",action:"Move to a safer place if he can and tell a safe adult or seek appropriate help.",check:"Not fighting an adult does not make him a coward.",integrate:"Get safe, get help and do not make the child carry messages or choose sides.",why:"Children can be hurt when they enter adult violence. Adults are responsible for adult behaviour.",remember:"Getting help can be brave.",source:"unicefVac",effect:"It lowers the chance that the child becomes another person harmed."},
 {id:"own-boundary",skill:"Rights",scene:"At a family visit in {place}, an older relative keeps touching {name} in a way he dislikes and tells him boys should not complain about touch.",signal:"Boys also have body boundaries and can say when touch makes them uncomfortable.",action:"Move away if he can and tell a safe adult.",check:"Being male or being related to the person does not cancel his right to feel safe.",integrate:"Adults should support his boundary without teasing or shaming him.",why:"Children of every sex have the right to protection from abuse and to speak about uncomfortable touch.",remember:"Boys have boundaries too.",source:"crc",effect:"It makes it easier for the child to ask for help without shame."},
 {id:"fighting",skill:"Judgement",scene:"At school in {place}, friends tell {name} that boys should settle every disagreement by fighting and that walking away is cowardly.",signal:"Peer pressure is trying to make violence the test of masculinity.",action:"Walk away, get help if there is danger and use words or adult support to solve the conflict.",check:"Winning a fight does not prove who was right.",integrate:"Choose a safer response even if friends tease him for it.",why:"Violence is not a requirement of masculinity. Children can learn non-violent conflict skills.",remember:"Walking away from a bad fight can be a strong choice.",source:"inspire",effect:"It lowers the chance of injury and refuses the peer rule that boys must fight."},
 {id:"help-friend",skill:"Courage",scene:"At school in {place}, {name} sees boys follow a girl, make sexual comments and laugh when she asks them to stop.",signal:"The girl’s discomfort and request to stop matter; joining the boys would add to the harassment.",action:"Do not join in. If safe, get a teacher or other adult, help create space and support the girl without speaking for her.",check:"Do not film her or turn her into content for another group chat.",integrate:"Help safely and hold friends accountable without starting a fight or demanding praise.",why:"Boys can be important bystanders when peers harass girls. Safe action can interrupt harm and change group norms.",remember:"Being on someone’s side can mean helping them get space and support.",source:"unwMen",effect:"It interrupts the group behaviour and makes respect visible."}
]};

const DISTRACTORS={
 adult:[
  [
   "Treat it as only a personal preference unless the person affected uses the word ‘abuse’.",
   "Focus on the single incident and avoid considering whether there is a repeated pattern.",
   "Wait for physical injury before treating the behaviour as a serious warning sign.",
   "Assume jealousy or protectiveness makes the behaviour less concerning.",
   "Treat the person’s good reputation as evidence that the behaviour cannot be harmful.",
   "Decide the issue is only a private disagreement because it happens in a relationship or family.",
   "Assume the behaviour is harmless if the person causing it says they meant well.",
   "Look mainly at whether other people think the behaviour is normal."
  ],
  [
   "Push for an immediate public confrontation so the other person knows the behaviour has been noticed.",
   "Make the decision for the person affected because urgency matters more than their preferences.",
   "Advise doing nothing until every fact is certain, even if there is an immediate safety concern.",
   "Tell the person affected exactly what they must do and treat disagreement as refusing help.",
   "Share the situation with a wide group so more people can pressure a solution.",
   "Focus first on getting an apology rather than on safety and choice.",
   "Use the most dramatic available response because strong action is always safer.",
   "Wait for the situation to become more serious before discussing support."
  ],
  [
   "Ask for a complete account first so you can decide whether the person deserves support.",
   "Contact family or authorities immediately without discussing privacy, wishes or possible retaliation.",
   "Give one firm instruction and withdraw support if the person chooses a different path.",
   "Promise secrecy in every circumstance, even if a child or someone else is in immediate danger.",
   "Make the person repeat painful details to several people so everyone hears the same story.",
   "Take over all decisions because someone who is frightened cannot make useful choices.",
   "Treat returning to a relationship or changing a plan as proof the earlier disclosure was unreliable.",
   "Focus on why the person did not act sooner instead of what support is useful now."
  ],
  [
   "Repeat the claim with the word ‘allegedly’ even though the source and context have not been checked.",
   "Treat a widely shared screenshot or clip as enough to establish the full story.",
   "Refuse to consider any evidence until a court or authority has made a final finding.",
   "Choose the version told by the person with the strongest reputation or largest audience.",
   "Assume one inconsistency proves the whole account false.",
   "Assume one convincing detail proves every surrounding claim true.",
   "Publish names and private information so strangers can help investigate.",
   "Ignore uncertainty and fill the missing parts with what seems most likely."
  ],
  [
   "Choose safety alone even if the response unnecessarily removes all choice from the person affected.",
   "Choose public accountability first even if it exposes private information and raises immediate risk.",
   "Choose procedural fairness alone even if urgent safety needs are being ignored.",
   "Treat privacy as the only concern even when there is a serious and immediate safety risk.",
   "Choose the fastest solution even if it depends on assumptions that have not been checked.",
   "Let family or community reputation decide what should happen.",
   "Treat support and evidence as competing goals, so only one of them can be taken seriously.",
   "Assume the same response is appropriate in every country, relationship and support system."
  ]
 ],
 teen:[
  [
   "Treat it as normal relationship or friendship drama unless an adult has already called it abuse.",
   "Focus on one message or joke and ignore whether the same pressure keeps happening.",
   "Wait until someone is physically injured before asking for help.",
   "Assume jealousy means the person cares deeply.",
   "Decide that behaviour is harmless if lots of students laugh about it.",
   "Treat popularity as evidence that someone could not be causing harm.",
   "Assume pressure is normal because the people involved are dating.",
   "Ignore an uncomfortable feeling because teenagers sometimes overreact."
  ],
  [
   "Handle the problem alone first so friends or adults do not think you cannot cope.",
   "Create a public confrontation so everyone can see who is right.",
   "Give in for now to stop the pressure, then try to fix the problem later.",
   "Tell the entire class or friend group so they can vote on what should happen.",
   "Confront an older or more powerful person alone to prove you are not scared.",
   "Wait until the situation becomes worse before telling a trusted adult.",
   "Delete every message immediately, including anything that might later help explain what happened.",
   "Make a friend follow your plan even if they say it could make them less safe."
  ],
  [
   "Ask for every detail before deciding whether to support your friend.",
   "Tell the whole friend group immediately so nobody can say you hid anything.",
   "Give one piece of advice and stop helping if your friend does not follow it.",
   "Promise to keep everything secret from adults no matter how unsafe the situation becomes.",
   "Try to investigate the person yourself before telling a trusted adult.",
   "Make the friend explain why they did not speak up sooner.",
   "Turn the disclosure into a confrontation between groups of friends.",
   "Assume you must solve the whole problem because your friend chose you to tell."
  ],
  [
   "Repost the screenshot with a warning label because many people have already seen it.",
   "Choose the account given by the most popular or confident person.",
   "Ignore the report completely until adults prove every detail.",
   "Treat a cropped screenshot as the full conversation.",
   "Assume repeated rumours become more reliable when enough people share them.",
   "Add missing details based on what usually happens in similar stories.",
   "Send private material to more classmates so they can help decide what is true.",
   "Treat one contradiction as proof that nothing harmful happened."
  ],
  [
   "Protect the friendship group first so nobody gets embarrassed.",
   "Focus only on proving who is right, even if that makes someone less safe.",
   "Take over the decision because the person affected may be too upset to choose.",
   "Choose the response that will get the most attention online.",
   "Keep adults out of the situation even when it is too serious for teenagers to manage safely.",
   "Put privacy above everything, even when someone may be in immediate danger.",
   "Put punishment above safety, support and accurate information.",
   "Use the same response for every situation because clear rules are always better than context."
  ]
 ],
 child:[
  [
   "Keep watching for a while because maybe the uncomfortable feeling will go away.",
   "Tell only another child first and wait to see what they think.",
   "Say nothing unless someone gets badly hurt.",
   "Assume an older person is right because they are older.",
   "Decide it is safe if the person says they are only joking.",
   "Ignore the feeling because being brave means not complaining.",
   "Assume family members or teachers can never cross a boundary.",
   "Think a gift means the person must be kind and trustworthy."
  ],
  [
   "Try to solve the problem alone before bothering an adult.",
   "Do what the person asks this time so they do not get upset, then avoid them later.",
   "Tell lots of people your age so everyone can decide what should happen.",
   "Confront a bigger child or adult alone to show you are brave.",
   "Wait several days before telling anyone, even if you feel unsafe now.",
   "Delete everything and pretend it did not happen.",
   "Keep the secret because you promised, even though it makes you scared.",
   "Ask the person who is worrying you to decide which adult you may tell."
  ],
  [
   "Ask your friend to explain every detail before you get an adult.",
   "Promise to keep it only between children because your friend trusted you.",
   "Try to fix the whole problem yourself so your friend does not get in trouble.",
   "Tell everyone at school so your friend has lots of helpers.",
   "Ask your friend to confront the person while you watch.",
   "Stop helping if your friend becomes quiet or changes their mind.",
   "Decide whether the story is true before you tell a safe adult.",
   "Keep asking questions even if your friend says they do not want to talk more."
  ],
  [
   "Share the message or picture with a friend as proof before showing an adult.",
   "Believe the person who sounds most confident because they probably know more.",
   "Ignore the information because children should never have to think about evidence.",
   "Assume a profile picture proves who an online person really is.",
   "Fill in missing parts of a story with what you think probably happened.",
   "Keep a worrying message secret because it might embarrass someone.",
   "Send the message to several children so they can compare opinions.",
   "Decide that a rumour is true because many children repeat it."
  ],
  [
   "Keep the school or family from being embarrassed, even if someone still feels unsafe.",
   "Be brave by confronting a bigger child or adult yourself.",
   "Give up if the first safe adult does not understand or help.",
   "Try to keep everyone happy even if that means ignoring your own boundary.",
   "Choose the answer that keeps the secret rather than the one that gets safe help.",
   "Take responsibility for stopping adults from behaving violently.",
   "Help a friend by promising you will never tell any adult.",
   "Wait until you are completely sure what happened before asking a safe adult for help."
  ]
 ]
};
const FORMAT_BY_STAGE=[
 ["SPOT THE RED FLAG","WHAT MATTERS MOST?","MYTH OR REALITY","QUICK READ"],
 ["WHAT WOULD YOU DO?","BUILD A RESPONSE","BOUNDARY CHECK","PRESSURE TEST"],
 ["THREE DAYS LATER…","SAFE SUPPORT","FRIEND CHECK","WHAT HAPPENS NEXT?"],
 ["WAIT. NEW INFORMATION JUST ARRIVED.","EVIDENCE DESK","WHAT’S MISSING?","CONTEXT FLIP"],
 ["TWO MONTHS LATER…","BOSS CASE","PUT IT TOGETHER","HARD CHOICE"]
];

function fill(s,x){return s.replaceAll("{name}",x.name).replaceAll("{place}",x.place).replaceAll("{setting}",x.setting).replaceAll("{channel}",x.channel)}
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function shuffled(arr,seed){const a=arr.slice();let s=seed>>>0;for(let i=a.length-1;i>0;i--){s=(Math.imul(s,1664525)+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function rotateAnswers(correct,distractors,key){const wrong=shuffled(distractors,hash(key+"-wrong")).slice(0,3);const all=[correct,...wrong];const r=hash(key)%4;const answers=all.slice(r).concat(all.slice(0,r));return{answers,correct:answers.indexOf(correct)}}

const SCENE_CUES={
 adult:{
  control:[
   "{name}'s partner starts asking for a photo every time she arrives somewhere, then questions the background if anything looks unfamiliar.",
   "At dinner in {place}, {name}'s phone buzzes again. Her partner wants to know who liked her post and why she has not replied to him yet.",
   "{name} notices that plans with friends keep turning into arguments because her partner insists on approving where she goes and who is there.",
   "After {name} changes her phone passcode, her partner says couples should have 'nothing to hide' and demands the new code."
  ],
  consent:[
   "After a good evening together in {place}, {name}'s partner wants sex. One person changes their mind, and the other keeps trying to persuade them.",
   "A couple in {place} have been intimate before. Tonight one partner says, 'Not tonight,' and the other says past agreement should still count.",
   "{name} hears a friend say that once two people are married, refusing sex is unfair to the other spouse.",
   "During an intimate moment, one person becomes uncomfortable and asks to stop. Their partner says, 'But we already started.'"
  ],
  economic:[
   "{name} learns that a woman in {place} has to ask her partner for bus fare even though her salary is paid into an account he controls.",
   "A partner cancels {name}'s bank card after an argument and says she can get access again when she 'learns to listen.'",
   "{name}'s friend is offered a job, but her partner threatens to stop paying household bills if she accepts it.",
   "At home in {place}, every small purchase must be explained, while one partner freely uses the family money without discussion."
  ],
  digital:[
   "An ex sends {name} a message saying he still has private photos and will post them if she blocks him.",
   "{name} receives a fake account request using her photo and realizes someone is impersonating her to contact people she knows.",
   "A former partner keeps resetting {name}'s passwords because he still has access to an old email account.",
   "A message arrives through {channel}: pay money or a private image will be sent to family members."
  ],
  stalking:[
   "{name} notices the same car near her workplace three evenings in a row after she ended a relationship.",
   "After blocking an ex, {name} begins receiving messages from new numbers that mention places she visited that day.",
   "Friends tell {name} that her former partner has been asking them for her schedule and new address.",
   "A delivery arrives that {name} did not order, with a note from an ex who was never given her current location."
  ],
  work:[
   "A manager in {place} keeps inviting {name} to private dinners and hints that being 'friendly' could help with the next promotion.",
   "{name}'s supervisor starts commenting on her body during shifts and laughs when she asks him to stop.",
   "After {name} refuses a date with a senior colleague, her preferred shifts suddenly disappear from the schedule.",
   "A supervisor sends late-night messages to {name} that mix work instructions with sexual comments."
  ],
  family:[
   "At a family meeting in {place}, relatives tell {name} she should return to a husband she fears because too much money was spent on the marriage.",
   "An aunt tells {name} that speaking publicly about violence would embarrass the whole family more than the violence itself.",
   "Relatives insist that a marriage payment means a wife should obey her husband even when she feels unsafe.",
   "A family elder says the couple's problems should stay private and asks everyone to stop helping {name} leave for a few nights."
  ],
  support:[
   "A friend tells {name}, 'I'm scared of going home tonight,' then immediately says she does not want anyone making decisions for her.",
   "{name}'s friend reveals that her partner has been frightening her, then asks, 'Can you just listen first?'",
   "A woman tells {name} about repeated threats but says she is not ready to report them and worries friends will judge her.",
   "A friend asks {name} for a place to sit quietly after an argument at home and says she needs time before deciding what to do."
  ],
  evidence:[
   "A cropped screenshot in {channel} names someone in {place} and accuses him of sexual violence, but nobody can find the original post.",
   "A short video clip is spreading online with a serious accusation, but it begins after the argument has already started.",
   "{name} receives two voice notes describing the same incident differently, and both senders insist their version is complete.",
   "A post gives a person's full name and workplace before any verified report can be found."
  ],
  disability:[
   "{name} meets a woman whose caregiver keeps her wheelchair charger locked away after arguments.",
   "A woman in {place} says the person who assists her with daily tasks also reads her messages and decides who may visit.",
   "{name} hears that a caregiver threatens to withhold medication unless a woman follows his personal rules.",
   "A woman who needs communication support says people keep speaking to her caregiver instead of asking her what she wants."
  ],
  migration:[
   "A worker tells {name} her supervisor keeps her passport 'for safekeeping' and threatens to cancel shifts if she refuses his advances.",
   "In {place}, a newcomer says someone is using her uncertain immigration status to pressure her into a relationship.",
   "{name} hears that an employer threatened to report a worker to immigration after she complained about sexual comments.",
   "A woman says she wants help but fears losing housing tied to the same employer who has been harassing her."
  ],
  bystander:[
   "On a crowded bus in {place}, {name} sees a passenger keep touching a woman who has already moved away twice.",
   "At a community event, {name} notices a man blocking a woman's path while she repeatedly says she wants to leave.",
   "In a queue, {name} hears sexual comments directed at a woman who is trying to ignore them and move away.",
   "At a party, {name} sees a friend becoming uncomfortable while someone keeps pulling her back into a conversation."
  ],
  jealousy:[
   "{name} feels jealous after seeing his partner laugh at a message and asks to inspect her phone to prove nothing is happening.",
   "In {place}, {name} starts checking when his partner was last online and questions every gap in her replies.",
   "Friends tell {name} that a serious boyfriend should know his partner's passwords and location at all times.",
   "{name} considers asking his partner to stop seeing a male friend because the friendship makes him insecure."
  ],
  peers:[
   "In {channel}, {name}'s friends start ranking women they know and mocking anyone who refuses to join in.",
   "A group of men share a woman's private photo and tell {name} not to be 'boring' when he objects.",
   "Friends laugh about getting women drunk enough to 'stop saying no' and wait to see whether {name} laughs too.",
   "A football-group chat turns a woman's rejection of one member into jokes and insults aimed at her."
  ],
  "friend-abuse":[
   "A close friend tells {name} he hid his girlfriend's keys during an argument so she could not leave.",
   "{name}'s friend boasts that he checks his partner's phone while she sleeps because 'trust has to be verified.'",
   "A friend asks {name} to lie about where he was after an argument in which his girlfriend says she felt threatened.",
   "A male friend says he decides which friends his girlfriend can keep because some of them 'put ideas in her head.'"
  ],
  images:[
   "{name} receives a private intimate image in a group chat and realizes the woman pictured never agreed for the group to see it.",
   "A friend offers to AirDrop {name} a sexual image of a classmate's older sister and says 'everyone already has it.'",
   "{name} sees an intimate video being replayed at a party while people argue that it is public now anyway.",
   "Someone asks {name} to save a private image before it gets deleted so the group can keep sharing it."
  ],
  anger:[
   "During an argument, {name} slams a chair into the wall and then says it does not count because he never touched his partner.",
   "{name} blocks a doorway while arguing and tells himself he is only trying to finish the conversation.",
   "After getting angry, {name} throws a phone across the room and says his partner is overreacting for feeling afraid.",
   "In {place}, {name} notices that his arguments increasingly include shouting inches from his partner's face."
  ],
  fatherhood:[
   "{name}'s child starts turning up the television whenever adults begin shouting at home.",
   "A child asks {name} whether it is their fault that adults keep fighting.",
   "{name} realizes his child has begun hiding toys and younger siblings when arguments start.",
   "After another loud argument, {name}'s child says they do not want friends visiting the house anymore."
  ],
  "male-survivor":[
   "A male friend tells {name} an older partner forced sexual activity and says he is afraid other men will laugh at him.",
   "{name}'s friend says he froze during unwanted sexual contact and now worries that means he agreed.",
   "A man tells {name} his partner threatens to expose private details whenever he tries to leave the relationship.",
   "A friend admits he is scared of his partner's violence but says nobody will believe a man asking for help."
  ],
  disclosure:[
   "{name}'s sister says her partner frightens her and asks him not to go to the man's house looking for a fight.",
   "A cousin tells {name} about threats at home but asks him to keep the conversation private while she thinks.",
   "A friend tells {name} she may need somewhere safe tonight but does not want him confronting her partner.",
   "{name} hears a disclosure of abuse and immediately feels angry enough to want to take matters into his own hands."
  ],
  culture:[
   "At a family gathering, older men tell {name} that bride-price gives a husband the final say over his wife's movements.",
   "Someone tells {name} that a wife who leaves an abusive marriage shames both families because marriage payments were exchanged.",
   "A relative says 'discipline' inside marriage is a private cultural matter outsiders should not question.",
   "During a discussion in {place}, {name} hears tradition used as the reason a woman should tolerate threats from her husband."
  ]
 },
 teen:{
  "dating-control":[
   "{name}'s boyfriend asks for her phone password and says refusing proves she has something to hide.",
   "Someone {name} is dating gets angry whenever she spends lunch with friends without checking in first.",
   "A partner asks {name} to keep location sharing on all day so he can see where she is after school.",
   "{name} notices that every disagreement now ends with demands to unfollow another friend."
  ],
  consent:[
   "After kissing, one teen says they do not want to go further. The other says stopping now is unfair.",
   "Someone {name} is dating says, 'If you really loved me, you would be ready by now.'",
   "A friend tells {name} that agreeing to a date means agreeing to physical affection at the end.",
   "During a private moment, one teen changes their mind and asks to stop."
  ],
  images:[
   "A classmate threatens to share a private image of {name} unless she sends another one.",
   "A private picture begins circulating in {channel}, and people tell {name} everyone has seen it already.",
   "Someone asks {name} for an intimate photo and promises it will disappear after one view.",
   "A friend says forwarding a private image is harmless because the person sent it to somebody once before."
  ],
  rumours:[
   "After {name} rejects someone, a sexual rumour about her starts moving through the class chat.",
   "Students edit a photo of {name} into a sexual joke and begin reposting it.",
   "A rumour about {name}'s dating life reaches people who were not even at the event being discussed.",
   "Someone posts an anonymous message about {name}, and classmates begin treating it as confirmed."
  ],
  "adult-boundary":[
   "A coach starts messaging {name} late at night and says their chats should stay between them.",
   "A teacher tells {name} she is 'mature for her age' and invites her to meet alone off school grounds.",
   "An older youth leader gives {name} special attention, gifts and private rides home, then asks her not to tell family.",
   "A school adult begins sharing personal sexual jokes with {name} and says other adults would not understand."
  ],
  "school-harassment":[
   "On the walk home, boys keep making sexual comments at {name} after she asks them to stop.",
   "Students block {name}'s way in a corridor and demand she rate which boy she would date.",
   "A group repeatedly comments on {name}'s body during lunch while teachers are across the room.",
   "Someone keeps snapping photos of {name} at school and adding sexual captions."
  ],
  friend:[
   "A close friend tells {name} her boyfriend scares her, then asks her not to turn it into school gossip.",
   "{name}'s friend says she feels pressured in her relationship but is afraid adults will ban her from dating if she tells them.",
   "A friend asks {name} for help after receiving threatening messages from someone she is dating.",
   "Someone {name} trusts says, 'I need help, but please do not confront him yourself.'"
  ],
  party:[
   "At a gathering in {place}, {name} notices a friend keeps trying to stay with the group while someone pressures her to leave.",
   "A friend looks uncomfortable when an older teen keeps offering her drinks and trying to separate her from everyone else.",
   "At a school event, {name} sees someone repeatedly ignore a girl's attempts to move away.",
   "During a party, a friend quietly asks {name} not to leave her alone with someone."
  ],
  grooming:[
   "Someone {name} meets online claims to be a teen, sends game gifts and asks for the name of her school.",
   "An online contact tells {name} she seems more mature than other girls and asks for a private photo.",
   "A person in {channel} offers {name} money for a secret video call and says adults do not need to know.",
   "Someone online slowly moves the conversation from games to personal questions about {name}'s body and home."
  ],
  home:[
   "At home, {name} hears one adult threaten another and wonders if telling someone will break up the family.",
   "{name} sees an adult shove another during an argument and feels responsible for making everyone calm down.",
   "A younger sibling asks {name} to make the adults stop shouting tonight.",
   "After repeated frightening arguments at home, {name} starts avoiding bringing friends over."
  ],
  evidence:[
   "A cropped screenshot accuses a student of sexual assault, but nobody can find the full conversation.",
   "A short clip from school is posted without the moments before it, and people demand everyone choose a side.",
   "Two students give different accounts of the same incident in {channel}.",
   "An anonymous post names a student and adds details that no one can verify."
  ],
  isolation:[
   "Someone {name} is dating says her best friend is a bad influence and demands she stop speaking to her.",
   "A partner gets angry whenever {name} attends an activity without him.",
   "{name} notices she has stopped seeing friends because every outing causes an argument with the person she is dating.",
   "Someone tells {name}, 'If we are serious, you should not need anyone else this much.'"
  ],
  "peer-misogyny":[
   "Boys in {name}'s group start rating girls' bodies and mock anyone who refuses to join.",
   "A group chat turns a girl's rejection of one boy into insults about all girls.",
   "Friends pressure {name} to laugh at a sexual joke about a real classmate.",
   "Someone posts a humiliating photo of a girl, and the boys wait to see whether {name} will share it."
  ],
  bystander:[
   "{name} sees a friend block a girl's path after she says she wants to leave.",
   "On the way home, {name} notices boys following a girl and making sexual comments.",
   "At a school event, {name} hears a friend keep pressuring someone for a kiss after she says no.",
   "A teammate makes a sexual joke directly at a girl who looks uncomfortable and asks him to stop."
  ],
  anger:[
   "During an argument, {name} punches a locker and says nobody should be scared because he did not hit a person.",
   "{name} stands in a doorway during an argument and refuses to move until the other person answers him.",
   "After getting angry, {name} throws a phone and later says the other person made him do it.",
   "{name} notices he has started using threats to stop arguments from ending before he is ready."
  ],
  "male-survivor":[
   "A boy tells {name} an older person pressured him into sexual activity and he is ashamed to tell an adult.",
   "A male friend says he froze during unwanted touching and worries that people will say boys always want sex.",
   "Someone {name} knows says an older partner threatens him whenever he tries to leave the relationship.",
   "A boy tells {name} he is scared of being mocked if he reports sexual harassment."
  ],
  "friend-disclosure":[
   "A girl tells {name} her boyfriend scares her and asks him not to start a fight with the boy.",
   "A friend says she is receiving threatening messages and asks {name} to sit with her while she tells a trusted adult.",
   "Someone tells {name} about pressure in a relationship but says she does not want the whole friend group involved.",
   "A friend shares a frightening experience and {name}'s first instinct is to confront the person immediately."
  ]
 },
 child:{
  body:[
   "During play, a friend says 'stop,' but other children tell {name} to keep going because stopping is weak.",
   "A relative keeps tickling {name} after {name} says it is not fun anymore.",
   "A game gets too rough and one child says they want to stop, but the others laugh.",
   "Someone keeps hugging {name} even after {name} moves away and says no."
  ],
  secret:[
   "An older person tells {name}, 'This is our special secret. Do not tell any grown-up.' The secret feels scary.",
   "Someone gives {name} a gift and says it must stay secret from parents.",
   "An older child says {name} will get in trouble if a certain conversation is repeated to adults.",
   "A person asks {name} to hide something that makes {name} feel worried and confused."
  ],
  "tell-again":[
   "{name} tells one adult about feeling unsafe, but the adult is distracted and says it is probably nothing.",
   "A grown-up laughs when {name} asks for help and says children worry too much.",
   "{name} tries to explain a problem, but the first adult does not really listen.",
   "After speaking up once, {name} still feels unsafe because nothing changed."
  ],
  online:[
   "Someone in a game chat asks {name} for the name of the school and where {name} lives.",
   "An online player asks {name} to move into a private chat and keep the conversation secret.",
   "A new online friend asks for a home address so they can send a surprise gift.",
   "Someone in {channel} says they are the same age as {name} but refuses to video-call and keeps asking personal questions."
  ],
  photo:[
   "Someone promises {name} game coins in exchange for a private picture in underwear.",
   "An online person tells {name} a body photo is needed to prove they are really friends.",
   "A person offers a gift card if {name} sends a picture that should stay private.",
   "Someone asks {name} for a private photo and says it will disappear after one view."
  ],
  bullying:[
   "Classmates keep calling a child names every day and then say everyone is only joking.",
   "A group removes {name} from a game, adds {name} back just to insult them, and repeats it the next day.",
   "Children keep hiding another child's belongings and laughing when the child gets upset.",
   "A class chat turns one child's mistake into a joke that gets reposted for days."
  ],
  gift:[
   "An adult gives {name} special gifts and then asks to spend time alone without telling family.",
   "Someone older keeps buying snacks for {name} and says the friendship should stay secret.",
   "An adult offers {name} something expensive and then asks for a private favour.",
   "A person tells {name}, 'After everything I give you, you should do this for me.'"
  ],
  "friend-touch":[
   "A friend tells {name} that an older child touched them in a private area and said not to tell.",
   "Someone's friend says a person touched them in a way that felt wrong and now they are scared.",
   "A child tells {name} they were asked to keep unwanted touching secret.",
   "A friend says, 'Something happened that made me uncomfortable, but I do not know how to tell an adult.'"
  ],
  home:[
   "At home, {name} hears adults screaming and sees one adult hit another.",
   "A younger child asks {name} to step between adults who are fighting.",
   "During a frightening argument at home, {name} thinks being brave means making the adults stop.",
   "{name} hears threats at home and wonders whether asking another adult for help would betray the family."
  ],
  relative:[
   "A relative says {name} is rude for refusing to sit on their lap.",
   "At a family visit, someone insists {name} must give hugs and kisses because they are family.",
   "A relative keeps touching {name}'s hair and body after {name} asks them to stop.",
   "An adult family member says children should never say no to affection from elders."
  ],
  "school-adult":[
   "A school adult asks {name} to stay alone in a locked room after everyone leaves.",
   "An adult at school starts giving {name} secret gifts and says other teachers do not need to know.",
   "A school worker asks {name} to keep private meetings secret from caregivers.",
   "An adult at school sends {name} messages outside school and says the friendship is special."
  ],
  "friend-bully":[
   "{name} sees older pupils corner a smaller child and take the child's bag.",
   "A friend is being bullied by several children who are bigger than {name}.",
   "{name} sees children filming another child who is crying after being teased.",
   "A smaller child asks {name} for help because a group keeps waiting for them after school."
  ],
  "own-boundary":[
   "An older relative tells {name} boys should not complain about touch, even when {name} feels uncomfortable.",
   "Someone keeps roughhousing with {name} after {name} says stop and calls him weak for objecting.",
   "A family member says boys should accept hugs and touching without making a fuss.",
   "{name} feels uncomfortable with someone's touch but worries people will laugh because he is a boy."
  ],
  fighting:[
   "Friends tell {name} that boys should settle a disagreement by fighting after school.",
   "A classmate dares {name} to hit another boy to prove he is not scared.",
   "During football practice, teammates say walking away from a fight would make {name} look weak.",
   "A disagreement in a group chat turns into pressure for {name} to meet someone and fight in person."
  ],
  "help-friend":[
   "{name} sees boys follow a girl and make comments after she asks them to stop.",
   "A friend looks uncomfortable while another child keeps blocking her way.",
   "{name} hears classmates teasing a girl about her body and sees that she wants it to stop.",
   "At school, a girl asks {name} to get a teacher because a group will not leave her alone."
  ]
 }
};

function cueFor(p,t,s,variant){
 const list=SCENE_CUES[p.level][t.id];
 const template=list&&list.length?list[variant%list.length]:t.scene;
 return fill(template,s);
}

const MOMENTS={
 adult:[
  "A friend nearby says, “Maybe you are reading too much into it.”",
  "The person affected asks for help but says she does not want a public confrontation.",
  "A voice note gives only part of what happened, and people are already forming opinions.",
  "A relative says the family’s reputation should come first.",
  "A colleague witnessed one part of the incident but not what happened before it.",
  "Someone suggests putting the whole story on social media tonight.",
  "The person causing the harm apologizes and says it will never happen again.",
  "A practical issue — money, transport or housing — makes an immediate decision harder.",
  "Two friends agree something is wrong but disagree about the safest response.",
  "The person affected says, “Please do not decide for me. Help me think.”",
  "A bystander wants to help but is worried that a confrontation could make things worse.",
  "A new message arrives that changes one detail but does not answer every question."
 ],
 teen:[
  "A friend says, “Ignore it. People will forget by tomorrow.”",
  "The class group chat has started taking sides.",
  "Someone shares a screenshot that shows only part of the conversation.",
  "A close friend wants to help but is afraid of becoming the next target.",
  "There is school the next morning, so avoiding everyone is not realistic.",
  "A popular student says the behaviour is normal and everyone should relax.",
  "An older student offers to ‘sort it out’ by confronting someone after school.",
  "A trusted adult is available, but the teen is worried about being judged.",
  "A friend says, “Promise you will not tell anyone, no matter what happens.”",
  "A private message appears just as rumours start spreading.",
  "The person affected wants support but does not want the whole school to know.",
  "Two friends suggest opposite responses, and both sound reasonable at first."
 ],
 child:[
  "Another child says, “Maybe we should keep it secret so nobody gets in trouble.”",
  "A friend offers to help but wants to handle it without any adults.",
  "The first grown-up nearby looks busy and does not notice what is happening.",
  "Someone says, “It was only a joke,” even though the child still feels uncomfortable.",
  "A message appears in a game chat while the child is at home.",
  "A cousin says older people should always be obeyed.",
  "The child worries that telling will make everyone angry.",
  "A friend says, “If we tell, they might say we are lying.”",
  "The first adult the child tells does not listen carefully.",
  "The child has to decide whether to stay quiet or ask another safe adult.",
  "A friend wants to post about it online so other children can help.",
  "The situation happens again, and this time the child recognizes the uncomfortable feeling."
 ]
};

const OPENERS={
 adult:[
  "It starts as an ordinary day.",
  "Nothing about the moment looks dramatic at first.",
  "A small detail changes the mood.",
  "The conversation takes an uncomfortable turn.",
  "What looked private begins affecting everyday life.",
  "A normal routine suddenly feels less normal.",
  "Someone close notices a pattern that is getting harder to ignore.",
  "The situation becomes complicated because people care about one another.",
  "There is no perfect response waiting in the room.",
  "The difficult part is deciding what matters first."
 ],
 teen:[
  "It begins like a normal school day.",
  "The first sign appears in a message.",
  "At first, friends treat it like ordinary drama.",
  "The situation changes during a conversation between friends.",
  "What happens online follows everyone back to school.",
  "A joke stops feeling funny.",
  "A private issue starts becoming public.",
  "Someone has to decide whether fitting in matters more than doing the right thing.",
  "The pressure grows because friends are watching.",
  "Nobody wants to make the situation bigger — but ignoring it also has a cost."
 ],
 child:[
  "It happens during an ordinary day.",
  "At first, it seems like a small moment.",
  "Something makes the child’s stomach feel uncomfortable.",
  "A game or visit stops feeling fun.",
  "The child remembers that safe adults are there to help.",
  "A friend needs help with a tricky situation.",
  "The important clue is how the child feels and what the other person is asking.",
  "The child has a choice about what to do next.",
  "A grown-up is nearby, but speaking up can still feel hard.",
  "The moment calls for a safe, simple decision."
 ]
};

const STAGE_STEMS={
 adult:[
  ["What deserves the most attention here?","What is the clearest warning sign?","What should not be brushed aside?","Which detail changes how you read the situation?"],
  ["What is the strongest next move?","What response protects choice without ignoring risk?","What would you do next?","Which response is firm without taking over?"],
  ["Someone now asks for help. What should guide your response?","How can you support without becoming another person making decisions for them?","What kind of help is most useful now?","Which response keeps dignity and safety together?"],
  ["New information appears. What should you do with it?","Which response handles the evidence most responsibly?","What should be verified before stronger claims are made?","How do you avoid turning uncertainty into a fact?"],
  ["The stakes are higher now. Which response holds up best?","Which choice balances safety, agency, evidence and accountability?","What would a careful, responsible response look like now?","Which option avoids the tempting shortcut?"]
 ],
 teen:[
  ["What should stand out first?","Which detail is the real warning sign?","What is easy to dismiss but important to notice?","What makes this more than ordinary drama?"],
  ["What would you do next?","Which response is safest and most respectful?","What choice avoids making things worse?","Which next step makes the most sense?"],
  ["A friend needs support now. What should you do?","How can you help without taking over?","Which response is supportive without becoming gossip?","What is the strongest way to be a good friend here?"],
  ["New messages are circulating. What matters most before reacting?","How should the new information be handled?","What should you check before adding your voice?","Which response keeps privacy and fairness in view?"],
  ["This is now a hard choice. What holds up best?","Which option protects safety, respect and fairness together?","What response would you still stand by tomorrow?","Which choice is strongest even if it is not the most dramatic?"]
 ],
 child:[
  ["What is the important thing to notice?","Which part tells you this is not okay?","What should the child pay attention to?","Which clue matters most?"],
  ["What is the safest next choice?","What should the child do next?","Which choice gets the child closer to safe help?","What is the best next step?"],
  ["A friend needs help. What should happen now?","How can the child be a good friend without solving everything alone?","Which choice brings in safe help?","What should the child do instead of becoming the investigator?"],
  ["There is new information. What should the child do with it?","Which choice protects privacy and gets adult help?","What is the safest way to handle the message or story?","What should happen before children start sharing it around?"],
  ["This is a harder case. Which choice is safest?","Which answer keeps boundaries and safe help together?","What is the strongest choice when the situation feels confusing?","Which option remembers that children do not have to solve dangerous problems alone?"]
 ]
};

function sceneFor(p,t,s,stage,variant,key,boss){
  const opener=OPENERS[p.level][hash(key+"-opener")%OPENERS[p.level].length];
  const moment=MOMENTS[p.level][variant%MOMENTS[p.level].length];
  const stemPool=STAGE_STEMS[p.level][stage-1];
  const stem=stemPool[hash(key+"-stem")%stemPool.length];
  const base=cueFor(p,t,s,variant);
  const bridge=stage===1?"":stage===2?" A little later, another decision has to be made.":stage===3?" Later, somebody asks for help.":stage===4?" Then new information starts circulating.":" By the end of the week, more people are involved and the consequences are harder to ignore.";
  const bossLine=boss?" FINAL CASE OF THIS STAGE: More than one option may sound reasonable at first.":"";
  return opener+" "+base+" "+moment+bridge+bossLine+" "+stem;
}

function contextualAnswer(text,p,s,stage,variant){
  const tails={
   adult:[" Start with the person’s safety and choices."," Keep the response proportionate to what is actually known."," Do not turn support into control."," Protect privacy while keeping options open."," Avoid creating a new confrontation just to feel decisive."," Keep evidence and dignity in the same frame."],
   teen:[" Bring in a trusted adult when the situation is too big for friends to manage safely."," Do not turn the situation into group-chat entertainment."," Respect the other person’s choice and privacy."," Choose the response that reduces pressure instead of adding more."," Keep the focus on safety, not popularity."," Avoid a public showdown if a quieter safe option works better."],
   child:[" Tell a safe adult and do not handle a dangerous situation alone."," A child can keep asking safe adults until someone listens."," Do not share private pictures or messages with other children."," Getting help is stronger than keeping an unsafe secret."," The child does not have to confront a bigger person."," A safe choice should make the child less alone, not more."]
  };
  const tail=tails[p.level][hash(s.name+"-"+stage+"-"+variant+"-"+text)%tails[p.level].length];
  return text+tail;
}

function uniqueTakeaway(t,p,s,stage,variant){
  const suffixes={
   adult:[" Notice patterns, not excuses."," Safety and agency belong together."," Serious claims deserve careful handling."," Help should expand choices, not shrink them."," Privacy matters even when emotions run high."," Being decisive is not the same as being reckless."],
   teen:[" Respect is still respect when friends are watching."," A group chat is not a courtroom."," Asking for help is not making drama."," Pressure does not become okay because it is common."," Privacy is part of respect."," A safe friend does not turn someone’s story into content."],
   child:[" Safe adults are there to help."," You can tell another safe adult."," Your body and boundaries matter."," Unsafe secrets should not stay secret."," Getting help can be brave."," Children do not have to solve adult problems."]
  };
  return t.remember+suffixes[p.level][hash(s.place+"-"+stage+"-"+variant+"-"+t.id)%suffixes[p.level].length];
}

function stageLead(level,stage){
 const adult=[
  "What is the most important thing to notice first?",
  "What is the strongest next response?",
  "What should guide the support now?",
  "What should guide how the new information is handled?",
  "Which response best brings safety, choice, evidence and accountability together?"
 ];
 const teen=[
  "What should stand out first?",
  "What is the strongest next choice?",
  "What should guide the support now?",
  "What should guide the response to the new information?",
  "Which choice best protects safety, respect and fairness?"
 ];
 const child=[
  "What is the important thing to notice?",
  "What is the safest next choice?",
  "What should guide the help now?",
  "What should guide the decision when there is new information?",
  "Which choice best brings together safety, boundaries and getting help?"
 ];
 return (level==="adult"?adult:level==="teen"?teen:child)[stage-1];
}

function correctFor(t,stage){return stage===1?t.signal:stage===2?t.action:stage===3?(t.support||t.action):stage===4?t.check:t.integrate}
function consequenceFor(t,stage,level){
 if(level==="child") return stage<3?t.effect:"It keeps the child from carrying the problem alone and brings in safer help.";
 if(stage===4) return "It slows down rumours, protects privacy and keeps the response tied to what can actually be supported.";
 if(stage===5) return "It avoids the tempting shortcut and keeps safety, choice and accountability in the same decision.";
 return t.effect;
}

function buildPath(pathId){
 const p=PATHS[pathId],themes=THEMES[pathId],settings=SETTINGS[pathId];
 let arcs=[];
 const variants=8;
 for(const s of settings){
  for(const t of themes){
   for(let variant=0;variant<variants;variant++){
    arcs.push({t,s,variant,storyId:pathId+"-"+t.id+"-"+s.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-v"+variant});
   }
  }
 }
 arcs=shuffled(arcs,hash(pathId+"-season1-unique"));
 let cursor=0;
 const stages=COUNTS.map((count,i)=>{
   const stage=i+1;
   const selected=arcs.slice(cursor,cursor+count);
   cursor+=count;
   const questions=selected.map((arc,idx)=>{
     const t=arc.t,s=arc.s,variant=arc.variant,key=arc.storyId+"-s"+stage+"-q"+idx;
     const boss=idx===count-1;
     const correctText=contextualAnswer(correctFor(t,stage),p,s,stage,variant);
     const choice=rotateAnswers(correctText,DISTRACTORS[p.level][stage-1],key);
     const format=boss?"BOSS CASE":FORMAT_BY_STAGE[stage-1][hash(key+"format")%FORMAT_BY_STAGE[stage-1].length];
     const scenario=sceneFor(p,t,s,stage,variant,key,boss);
     return{
       id:pathId+"-s"+stage+"q"+(idx+1),path:pathId,stage,number:idx+1,storyId:arc.storyId,
       topic:t.id,format,skill:SKILLS_BY_STAGE[stage-1][hash(key+"skill")%SKILLS_BY_STAGE[stage-1].length],scenario,answers:choice.answers,correct:choice.correct,
       consequence:consequenceFor(t,stage,p.level)+" "+MOMENTS[p.level][(variant+stage)%MOMENTS[p.level].length],
       why:t.why+" In this situation, the extra context matters because the safest response should fit what is actually happening, not a stereotype or shortcut.",
       remember:uniqueTakeaway(t,p,s,stage,variant),learn:SOURCES[t.source].url,sourceName:SOURCES[t.source].name,
       boss
     };
   });
   return{id:stage,title:p.stages[i],pass:PASS[i],questions};
 });
 return{...p,stages};
}

const GAMES={};
for(const id of Object.keys(PATHS))GAMES[id]=buildPath(id);

function validate(){
 const report={paths:{},total:0,issues:[]};
 for(const [id,g] of Object.entries(GAMES)){
  let total=0,seen=new Set();
  g.stages.forEach((s,i)=>{
   total+=s.questions.length;
   if(s.questions.length!==COUNTS[i])report.issues.push(id+" stage "+(i+1)+" count");
   if(s.pass!==PASS[i])report.issues.push(id+" stage "+(i+1)+" pass");
   s.questions.forEach(q=>{if(seen.has(q.scenario))report.issues.push(id+" duplicate scenario");seen.add(q.scenario);if(q.answers.length!==4||q.correct<0||q.correct>3)report.issues.push(q.id+" choices")});
  });
  report.paths[id]=total;report.total+=total;
  if(total!==200)report.issues.push(id+" total");
 }
 return report;
}
const validation=validate();
if(validation.total!==1200||validation.issues.length)console.warn("WWY validation",validation);

window.WWY_V3={SOURCES,PATHS,GAMES,COUNTS,PASS,SKILLS,validation};
})();