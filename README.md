# 🌟 BETTER BLOG - The World's Best Blog Platform

> Building the best blog page in the world using Next.js 15, TypeScript, and modern design principles.

---

## 📦 PROJECT STRUCTURE

```
toolbench/
│
├── 📁 blog-template/              ⭐ MAIN PROJECT
│   ├── app/                        Next.js App Router (Server Components)
│   ├── components/                 React components + Shadcn/UI
│   ├── content/                    MDX blog posts with YAML metadata
│   ├── layouts/                    Blog post layouts
│   ├── css/                        Tailwind CSS config
│   ├── public/                     Static assets (images, etc)
│   ├── package.json                Dependencies
│   ├── tsconfig.json               TypeScript strict mode
│   ├── tailwind.config.js          Tailwind CSS customization
│   └── contentlayer.config.ts      MDX processing config
│
├── 📁 shadcn-ui-resources/         🎨 DESIGN REFERENCE
│   └── [Component patterns & extensions]
│
├── 📁 design-systems-ref/          🏛️ DESIGN SYSTEM INSPIRATION
│   └── [Primer, Polaris, Carbon, etc patterns]
│
├── CLAUDE.md                       ✨ Instructions for Claude (comprehensive)
├── README.md                       This file (quick start)
└── .claude/settings.json           Claude Code configuration
```

---

## 🚀 QUICK START

### 1. Install Dependencies
```bash
cd blog-template
npm install
# or if using yarn:
yarn install
```

### 2. Start Development Server
```bash
npm run dev
# Opens http://localhost:3000
```

### 3. Create First Blog Post
```bash
# Create in: blog-template/content/blog/my-first-post.mdx
# Include YAML frontmatter:
---
title: "My First Post"
date: "2026-05-05"
tags: ["nextjs", "design"]
excerpt: "A quick intro to my blog"
---

# Hello World

Your content here...
```

### 4. Type Check
```bash
npm run type-check
```

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🎨 TECH STACK

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework with App Router | 15+ |
| **React** | UI library | 19+ |
| **TypeScript** | Type safety | Latest |
| **Tailwind CSS** | Utility-first styling | 4+ |
| **Shadcn/UI** | Component library | Latest |
| **MDX** | Markdown + React components | Latest |
| **Contentlayer** | MDX processing | Latest |
| **React Hook Form** | Form management | Latest |
| **Lucide Icons** | Icon set | Latest |

---

## 📚 REFERENCED REPOSITORIES (Cloned Locally)

### [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)
**Location:** `blog-template/`
- Production-ready blog boilerplate
- Contentlayer integration for MDX
- SEO, RSS, Sitemap included
- **Use this as the foundation**

### [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)
**Location:** `shadcn-ui-resources/`
- Curated shadcn/ui components
- Copy component patterns into `blog-template/components/ui/`

### [awesome-design-systems](https://github.com/alexpate/awesome-design-systems)
**Location:** `design-systems-ref/`
- Design system references: Primer, Polaris, Carbon
- Color palettes, typography, spacing guides
- Accessibility patterns

---

## 🎯 DESIGN REQUIREMENTS (2026 STANDARDS)

✅ **Color Palette:** Bright, saturated colors + Y2K nostalgia  
✅ **Typography:** Bold, oversized headlines with custom fonts  
✅ **Interactions:** Micro-interactions with instant feedback  
✅ **Animations:** Smooth scroll-triggered animations  
✅ **Accessibility:** WCAG 2.2 AA compliance (mandatory)  
✅ **Dark Mode:** Built-in theme switching  
✅ **Performance:** Lighthouse 90+ score  
✅ **Mobile-First:** Fully responsive design  

---

## 📋 DEVELOPMENT WORKFLOW

### Before Making Changes
1. Read `CLAUDE.md` (comprehensive instructions)
2. Run `npm run type-check` to verify TypeScript
3. Start dev server: `npm run dev`
4. Test changes in browser

### Making Changes
1. Edit files in `blog-template/`
2. Never assume imports exist - check `package.json`
3. Never fabricate file paths - verify they exist
4. Keep components small and focused
5. Use TypeScript strict mode

### Committing Changes
1. Ensure TypeScript compiles
2. Test UI changes in browser
3. Write clear commit messages (WHY, not WHAT)
4. Reference the issue/feature being implemented

---

## 🛠️ USEFUL COMMANDS

```bash
# Development
npm run dev                # Start dev server
npm run type-check         # TypeScript type checking
npm run lint               # ESLint check

# Production
npm run build              # Build for production
npm run start              # Start production server
npm run export             # Static export

# Content
# Just edit files in blog-template/content/blog/
# MDX will auto-process with Contentlayer
```

---

## 📖 DOCUMENTATION FILES

- **CLAUDE.md** - Comprehensive instructions for AI development (READ THIS FIRST)
- **.claude/settings.json** - Claude Code configuration and allowlist
- **blog-template/README.md** - Original template documentation

---

## ✨ KEY FEATURES TO IMPLEMENT

### Phase 1 (Core)
- [ ] Setup complete with Shadcn/UI
- [ ] Custom 2026 color palette
- [ ] Beautiful home page
- [ ] Blog post pages with MDX
- [ ] Dark mode toggle

### Phase 2 (Features)
- [ ] Search functionality
- [ ] Tags & categories
- [ ] Related posts
- [ ] Comment system
- [ ] Newsletter signup

### Phase 3 (Polish)
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Analytics integration
- [ ] Social sharing

### Phase 4 (Advanced)
- [ ] Full-text search
- [ ] Reader analytics
- [ ] Monetization options

---

## 🔐 ANTI-HALLUCINATION RULES

Claude has been configured to:
- ✅ Verify all imports before using
- ✅ Check file paths exist before referencing
- ✅ Run TypeScript type check before committing
- ✅ Test UI changes in browser before claiming done
- ✅ Cite sources for all recommendations
- ✅ Never fabricate library names or functions

---

## 🌐 DEPLOYMENT

### Vercel (Recommended)
1. Push to GitHub
2. Connect repo to Vercel
3. Auto-deploys on push
4. Automatic SSL, CDN, analytics

```bash
vercel deploy
```

### Self-Hosted
```bash
npm run build
npm run start
# Server runs on port 3000
```

---

## 📞 SUPPORT

- **Claude.md** - Development guidelines (comprehensive)
- **blog-template/README.md** - Original template docs
- **Referenced repos** - Look in local clones for patterns
- **Official docs:**
  - [Next.js Docs](https://nextjs.org/docs)
  - [Shadcn/UI](https://ui.shadcn.com/)
  - [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📄 LICENSE

This project uses the tailwind-nextjs-starter-blog template which is MIT licensed.

---

**Created:** 2026-05-05  
**Status:** 🟢 Ready for Development  
**Next Step:** Follow CLAUDE.md for implementation
