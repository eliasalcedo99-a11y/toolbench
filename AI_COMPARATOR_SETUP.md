# 🤖 ToolBench AI Comparator Setup

## 50 Most Used AI Tools in the USA (2026)

### General Purpose (5)
1. **ChatGPT** (OpenAI) - Conversational AI, most popular
2. **Claude** (Anthropic) - Advanced reasoning, coding
3. **Gemini** (Google) - Multimodal, integrated with Google
4. **Copilot** (Microsoft) - GPT-4 integration, Office suite
5. **Perplexity** - AI search engine, real-time information

### Code Generation (4)
6. **GitHub Copilot** - IDE-integrated, most used by developers
7. **Codeium** - Free alternative to Copilot
8. **Tabnine** - AI code completion, enterprise
9. **Replit Ghostwriter** - Web-based coding

### Writing & Content (6)
10. **Jasper** - Long-form content, brand voice
11. **Copy.ai** - Short-form, workflows
12. **Writesonic** - All-in-one writing
13. **Anyword** - Data-driven copywriting
14. **Grammarly** - Grammar + AI suggestions
15. **Quillbot** - Paraphrasing, premium features

### Image Generation (5)
16. **Midjourney** - Highest quality, design-focused
17. **DALL-E 3** - Integration with ChatGPT
18. **Stable Diffusion** - Open-source, affordable
19. **Leonardo.ai** - Gaming/fantasy optimized
20. **Adobe Firefly** - Adobe suite integration

### Video Generation (4)
21. **Runway** - Professional video editing with AI
22. **Synthesia** - AI avatar videos
23. **HeyGen** - Talking avatars, localization
24. **Opus Clip** - YouTube video clip generation

### Audio & Voice (5)
25. **ElevenLabs** - Voice cloning, text-to-speech
26. **Google NotebookLM** - Audio notebooks, podcasts
27. **Descript** - Audio/video transcription, editing
28. **Otter.ai** - Real-time transcription
29. **Murf.ai** - Text-to-speech studio

### Search & Research (4)
30. **Kagi** - Premium search with AI
31. **You.com** - Privacy-focused AI search
32. **Consensus** - Research paper search
33. **Scholarcy** - Academic paper summarization

### Music & Audio Creation (3)
34. **Suno** - Full song generation
35. **Udio** - Music generation
36. **AIVA** - Composer, soundtrack generation

### Design & Visual (5)
37. **Figma AI** - Design automation
38. **Canva Magic Design** - Templates with AI
39. **Microsoft Designer** - Image generation from text
40. **Adobe Express** - Design templates + Firefly
41. **Looka** - Logo and brand design

### Business & Analytics (4)
42. **Microsoft Power BI + Copilot** - Data visualization
43. **HubSpot ChatSpot** - Sales/marketing AI
44. **Tableau (Data Explainer)** - Analytics
45. **MindStudio** - No-code AI app builder

### Productivity & Office (5)
46. **Notion AI** - Note-taking + generation
47. **Google Workspace (Duet AI)** - Sheets, Docs, Slides
48. **Microsoft 365 Copilot** - Word, Excel, PowerPoint
49. **Slack AI** - Workflow automation
50. **ChatPDF** - PDF analysis

---

## 📋 PROMPT FOR AI CONTENT GENERATION

Use this prompt with Claude, ChatGPT, or any LLM to generate AI tool profiles:

```
You are an AI tools analyst specializing in 2026 US market adoption.

TASK: Generate comprehensive profiles for AI tools and comparison articles 
for ToolBench, an independent AI tools comparison platform.

REQUIREMENTS:
1. Research-based: Use your knowledge of:
   - Reddit communities (r/ChatGPT, r/PromptEngineering, r/ArtificialIntelligence, r/learnprogramming)
   - Product Hunt discussions and reviews
   - Twitter/X AI community conversations
   - GitHub discussions and stars
   - Real user feedback patterns

2. For each AI TOOL PROFILE, structure as YAML frontmatter + Markdown body:

---
name: "[Tool Name]"
category: "[Text|Code|Image|Video|Audio|Search|Design|Business|Productivity]"
description: "[2-sentence summary of what it does and primary use case]"
website: "[official URL]"
icon: "🤖"  # or relevant emoji
colors:
  primary: "#6366f1"
  accent: "#ec4899"
badge: "[Free|Freemium|Paid|Open-source]"
rating: 4.5  # out of 5, based on community sentiment
pricing:
  - tier: "Free"
    price: "$0"
    description: "[What's included]"
  - tier: "Pro"
    price: "$[X]/mo"
    description: "[What's included, mark best value if applicable]"
    featured: true
  - tier: "Enterprise"
    price: "Custom"
    description: "[What's included]"
verdict: "[1 paragraph about who should use this and why]"
pros:
  - "[Key strength 1]"
  - "[Key strength 2]"
  - "[Key strength 3]"
  - "[Key strength 4]"
  - "[Key strength 5]"
cons:
  - "[Limitation 1]"
  - "[Limitation 2]"
  - "[Limitation 3]"
  - "[Limitation 4]"
keywords:
  - "[keyword1]"
  - "[keyword2]"
  - "[keyword3]"
personas:
  - title: "[User type 1]"
    icon: "👨‍💼"
    description: "[Who this is best for]"
  - title: "[User type 2]"
    icon: "👩‍💻"
    description: "[Who this is best for]"
  - title: "[User type 3]"
    icon: "🎨"
    description: "[Who this is best for]"
relatedComparisons:
  - "tool-slug-1"
  - "tool-slug-2"
scores:
  price: 75        # 0-100: how affordable?
  ease: 82         # 0-100: how easy to learn?
  quality: 88      # 0-100: output quality
  integrations: 70 # 0-100: API/integration support
  support: 68      # 0-100: customer support quality
publishedDate: 2026-05-06
updatedDate: 2026-05-06
---

## Overview
[2-3 paragraphs covering: what the tool is, when it was released, who created it, market position in 2026]

## Use Cases
[2-3 paragraphs with real examples of who uses this and why, backed by Reddit/Product Hunt patterns]

## The Bottom Line
[1 paragraph with final recommendation, pricing breakeven point, and best alternative]

3. For AI COMPARISON ARTICLES, structure as:

---
title: "[Tool A] vs [Tool B]: Which is Better in [Year]?"
description: "[1 sentence: context, key differentiator, who wins]"
toolA: "[tool-a-slug]"
toolB: "[tool-b-slug]"
verdict: "[2 sentences: clear recommendation based on use case]"
features:
  - label: "[Feature name]"
    a: "[Tool A value]"
    b: "[Tool B value]"
    aType: "[yes|no|value]"
    bType: "[yes|no|value]"
  # 10-12 feature rows total
recommendations:
  - for: "[User type 1]"
    pick: "[tool-a|tool-b]"
    reason: "[Why, backed by real usage patterns]"
  - for: "[User type 2]"
    pick: "[tool-a|tool-b]"
    reason: "[Why, backed by real usage patterns]"
  - for: "[User type 3]"
    pick: "[tool-a|tool-b]"
    reason: "[Why, backed by real usage patterns]"
faq:
  - q: "[Common question from users]"
    a: "[Answer based on real feedback]"
  - q: "[Common question from users]"
    a: "[Answer based on real feedback]"
  - q: "[Common question from users]"
    a: "[Answer based on real feedback]"
  - q: "[Common question from users]"
    a: "[Answer based on real feedback]"
publishedDate: 2026-05-06
updatedDate: 2026-05-06
---

### [Tool A]
[2 paragraphs: strengths, target users, key features, pricing strategy]

### [Tool B]
[2 paragraphs: strengths, target users, key features, pricing strategy]

4. Pricing: Research current 2026 pricing or note "as of [date]"
   - Be specific: include word counts, API limits, seat counts
   - Include free tiers and trial periods
   - Note annual discounts

5. Scores (0-100 scale):
   - Price: How affordable compared to alternatives?
   - Ease: Onboarding friction and learning curve?
   - Quality: Output quality for intended use case?
   - Integrations: API access and third-party support?
   - Support: Response time, documentation, community?

6. Community insights:
   - Quote real pain points from Reddit threads (paraphrase, don't attribute)
   - Reference Product Hunt sentiment
   - Note which tools trending on Twitter
   - Mention GitHub activity for open-source projects

7. Output format: 
   - YAML is strict: quote strings containing special characters
   - Markdown body: proper formatting, bold/italic for emphasis
   - Ready to copy-paste into src/content/[collection]/[slug].md
   - No made-up info: if uncertain, acknowledge data cutoff

---

## Use Cases for the Matrix

When generating content, prioritize these use cases for the AI Comparator Matrix:
1. **Code Generation** - Dev tasks
2. **Writing & Content** - Marketing, blogs, copy
3. **Image Generation** - Visual design, marketing
4. **Data Analysis** - Business intelligence, research
5. **Video Creation** - Content production, marketing
6. **Audio/Voice** - Voiceovers, transcription, podcasts
7. **Search** - Research, information retrieval
8. **Design** - UI/UX, branding, logos
9. **Productivity** - Note-taking, automation, workflows
10. **Music** - Composition, background tracks

---

## Next Steps

1. Use this prompt with Claude/ChatGPT to generate AI tool profiles (batch in groups of 5-10)
2. Save outputs to: `src/content/ias/[tool-slug].md`
3. Generate 10-15 comparison articles (focus on popular matchups)
4. Build the interactive matrix component in React/Astro
5. Configure URL rewrites for /ai-comparator/ routes

---

**Generated:** 2026-05-06  
**Status:** Ready for content generation
```

---

Copia el prompt y úsalo con ChatGPT o Claude. Te hago:

1. ¿Empiezo a agregar la estructura de IAs al sitio?
2. ¿Quieres que escriba el componente interactivo de la matriz primero?
3. ¿O genero yo el contenido de las 50 IAs directamente?