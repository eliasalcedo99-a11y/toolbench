// Code Generation tools (6-9)
export const codeTools = [
{
slug:'github-copilot',name:'GitHub Copilot',category:'code',icon:'🤖',iconBg:'rgba(36,41,46,0.15)',iconColor:'#24292E',badge:'top',rating:4.6,priceLabel:'Free – $39/user/mo',
description:'The industry-standard AI code completion tool integrated into VS Code, JetBrains, and Neovim, powered by OpenAI Codex and GPT-4.',
keywords:['code completion','github','vscode','developer','copilot'],
verdict:'Default AI coding tool in 2026. Free for students. $10/mo Individual is table stakes for professional devs.',
pros:['Deepest IDE integration across VS Code, JetBrains, Neovim, and 10+ editors','Copilot Chat provides inline explanation, refactoring, and test generation','Trained on largest code corpus — strongest at popular languages','Free for students, teachers, and OSS maintainers'],
cons:['Struggles with niche languages and frameworks','Can introduce subtle runtime bugs','Privacy concerns for enterprise','$19/user/mo Business vs free Codeium'],
pricing:[{name:'Free',price:'$0',summary:'Students and OSS.',featured:false,features:['Code completions','Copilot Chat','VS Code + JetBrains'],notIncluded:['Org management','Policy controls']},{name:'Individual',price:'$10/mo',summary:'Professional developers.',featured:true,features:['Unlimited completions','Copilot Chat','Multi-editor','CLI'],notIncluded:['Org management']},{name:'Business',price:'$19/user/mo',summary:'Dev teams.',featured:false,features:['Everything Individual','Org management','Policy controls','IP indemnity'],notIncluded:['Custom models']},{name:'Enterprise',price:'$39/user/mo',summary:'Large orgs.',featured:false,features:['Fine-tuned models','Knowledge bases','SAML SSO'],notIncluded:[]}],
personas:[{icon:'👩‍💻',title:'Professional developers',description:'Engineers wanting AI completion and chat in their IDE.'},{icon:'🎓',title:'CS students',description:'Students benefiting from free-tier suggestions.'},{icon:'🏗️',title:'Engineering teams',description:'Teams needing policy controls and audit.'}],
websiteUrl:'https://github.com/features/copilot',scores:{price:75,ease:88,quality:90,integrations:92,support:80},
_engine:'OpenAI Codex + GPT-4',_api:'Via GitHub API',_mobile:'No',_team:'Yes',_support:'GitHub support',_privacy:'SOC 2',_integrations:'VS Code, JetBrains, Neovim, CLI',_offline:'No',_customTrain:'Enterprise fine-tuning',
body:`## Overview\n\nGitHub Copilot redefined developer productivity since 2022. By 2026 it serves 1.8M+ paid subscribers. Built on OpenAI Codex/GPT-4, it provides real-time suggestions, chat, and test generation inside IDEs. Its moat: integration depth and training from 200M+ repositories.\n\n## Use Cases\n\nOn r/webdev, Copilot is the most recommended AI coding tool with 30-55% productivity gains. GitHub data shows it writes 46% of code in enabled files. Primary uses: autocomplete, test writing, code explanation, and language translation.\n\n## The Bottom Line\n\nThe default AI coding tool. $10/mo Individual is high-ROI. Consider Codeium if cost matters, Claude for conversational coding.`
},
{
slug:'codeium',name:'Codeium',category:'code',icon:'⚡',iconBg:'rgba(9,171,59,0.15)',iconColor:'#09AB3B',rating:4.3,priceLabel:'Free – $12/user/mo',
description:'Free AI code completion alternative to GitHub Copilot supporting 70+ languages and all major IDEs with proprietary in-house models.',
keywords:['code completion','free','vscode','alternative','autocomplete'],
verdict:'Best free AI code completion. 85-90% of Copilot quality at $0. Teams at $12/user/mo undercuts Copilot by 37%.',
pros:['Individual plan completely free — no catches','70+ languages and 40+ IDE extensions','In-house models — no OpenAI dependency','Windsurf AI-native IDE experience'],
cons:['Quality trails Copilot by 10-15% on complex tasks','Weaker on niche frameworks','Enterprise features lag behind','Lower brand recognition'],
pricing:[{name:'Individual',price:'$0',summary:'Solo devs — free.',featured:true,features:['Unlimited completions','Chat','40+ IDEs','70+ languages'],notIncluded:['Team management']},{name:'Teams',price:'$12/user/mo',summary:'Dev teams.',featured:false,features:['Everything Individual','Team management','Analytics'],notIncluded:['SSO']},{name:'Enterprise',price:'Custom',summary:'Large orgs.',featured:false,features:['On-premise','SSO','Fine-tuning'],notIncluded:[]}],
personas:[{icon:'💰',title:'Budget-conscious developers',description:'Devs wanting free AI completion.'},{icon:'🌐',title:'Polyglot programmers',description:'Devs across many languages.'},{icon:'🏢',title:'Cost-sensitive teams',description:'Teams needing affordable AI.'}],
websiteUrl:'https://codeium.com',scores:{price:95,ease:85,quality:82,integrations:80,support:68},
_engine:'Proprietary',_api:'Limited',_mobile:'No',_team:'Yes',_support:'Discord + email',_privacy:'Standard',_integrations:'VS Code, JetBrains, 40+ IDEs',_offline:'No',_customTrain:'Enterprise only',
body:`## Overview\n\nCodeium grew to 600K+ developers by 2026 as the free Copilot alternative. Proprietary models enable genuinely free individual use. The Windsurf IDE extends its AI-native vision.\n\n## Use Cases\n\nReddit's r/vscode recommends trying Codeium first. Use cases mirror Copilot: autocomplete, boilerplate, tests. Popular with polyglot developers across less common languages.\n\n## The Bottom Line\n\nObvious first step for AI coding. Free tier has no restrictions. Teams at $12/user/mo saves 37% vs Copilot Business.`
},
{
slug:'tabnine',name:'Tabnine',category:'code',icon:'🔵',iconBg:'rgba(100,100,255,0.15)',iconColor:'#6464FF',rating:4.0,priceLabel:'Free – $39/user/mo',
description:'Enterprise-focused AI code completion with on-premise deployment and private model training for strict data privacy requirements.',
keywords:['code completion','enterprise','on-premise','private','security'],
verdict:'Choose only if your org requires on-premise AI. Otherwise Copilot or Codeium deliver better quality at lower cost.',
pros:['On-premise — zero data leaves your network','Private model training on your codebase','SOC 2 Type II and GDPR compliant','30+ languages across major IDEs'],
cons:['Quality below Copilot and Codeium','$39/user/mo Enterprise is 2x Copilot Business','Free tier heavily restricted','Slower update cadence'],
pricing:[{name:'Free',price:'$0',summary:'Evaluation.',featured:false,features:['Short completions','Limited languages'],notIncluded:['Full-line','Chat']},{name:'Dev',price:'$12/mo',summary:'Individual devs.',featured:true,features:['Full completions','Chat','All IDEs'],notIncluded:['On-premise']},{name:'Enterprise',price:'$39/user/mo',summary:'Privacy-first orgs.',featured:false,features:['On-premise','Private training','SSO'],notIncluded:[]}],
personas:[{icon:'🔒',title:'Security-first orgs',description:'Regulated industries that can\'t use cloud AI.'},{icon:'🏛️',title:'Government contractors',description:'FedRAMP and classified environments.'},{icon:'🏗️',title:'Large codebases',description:'Teams with proprietary frameworks.'}],
websiteUrl:'https://www.tabnine.com',scores:{price:55,ease:78,quality:72,integrations:70,support:75},
_engine:'Proprietary + custom',_api:'Enterprise',_mobile:'No',_team:'Yes',_support:'Email + CSM',_privacy:'On-premise, SOC 2',_integrations:'VS Code, JetBrains',_offline:'Yes',_customTrain:'Yes',
body:`## Overview\n\nTabnine (founded 2018 as Codota) repositioned as enterprise-focused by 2026, differentiating on privacy and on-premise deployment rather than suggestion quality.\n\n## Use Cases\n\nEnterprise IT leaders cite it as the only option when policies prohibit cloud AI. Used in finance, healthcare, and government for compliant code completion.\n\n## The Bottom Line\n\nNot the best AI coding tool — the best *compliant* one. If cloud tools are allowed, use Copilot or Codeium instead.`
},
{
slug:'replit-ghostwriter',name:'Replit Ghostwriter',category:'code',icon:'🟠',iconBg:'rgba(248,149,32,0.15)',iconColor:'#F89520',rating:4.1,priceLabel:'Free – $25/mo',
description:'AI coding assistant in Replit\'s browser IDE enabling code generation, debugging, and deployment without local setup.',
keywords:['online ide','browser coding','beginner','deployment','replit'],
verdict:'Best for beginners and rapid prototyping. All-in-one browser IDE + AI + deployment. Not for professional teams with local workflows.',
pros:['Zero setup — code, run, deploy from browser','Idea to live URL in minutes','AI understands full project context','Multiplayer coding for education'],
cons:['Browser IDE can\'t match local VS Code','AI quality trails Copilot','$25/mo expensive vs free Codeium','Vendor lock-in'],
pricing:[{name:'Free',price:'$0',summary:'Learning.',featured:false,features:['Basic Ghostwriter','Limited compute','Public repos'],notIncluded:['Private repos','Always-on']},{name:'Hacker',price:'$25/mo',summary:'Serious hobbyists.',featured:true,features:['Full Ghostwriter','Boosted compute','Private repos','Custom domains'],notIncluded:['Team features']},{name:'Teams',price:'$40/user/mo',summary:'Education.',featured:false,features:['Everything Hacker','Team management','Shared projects'],notIncluded:[]}],
personas:[{icon:'🎓',title:'Coding students',description:'Beginners learning without local setup.'},{icon:'🚀',title:'Rapid prototypers',description:'Idea to deployed prototype in hours.'},{icon:'👩‍🏫',title:'Educators',description:'CS teachers running classes.'}],
websiteUrl:'https://replit.com',scores:{price:65,ease:95,quality:76,integrations:55,support:70},
_engine:'Proprietary + GPT-4',_api:'Extensions',_mobile:'Web',_team:'Yes',_support:'Community',_privacy:'Standard',_integrations:'Git, domains',_offline:'No',_customTrain:'No',
body:`## Overview\n\nReplit Ghostwriter serves 25M+ developers in a browser IDE. Unlike Copilot, it's an all-in-one environment — editor, runtime, database, and deployment.\n\n## Use Cases\n\nMost recommended platform for beginners on r/learnprogramming. Used for education, hackathons, quick scripts, and portfolio deployment.\n\n## The Bottom Line\n\nBest for beginners and prototypers. Professionals should use Copilot or Codeium. Free tier for learning; $25/mo for private repos.`
},
];
