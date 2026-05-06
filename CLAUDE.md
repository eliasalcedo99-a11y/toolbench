# 🚀 BETTER BLOG - Project CLAUDE.md

> **The best blog page in the world. Built with Next.js 15, TypeScript, Shadcn/UI, and modern design principles.**

---

## 📋 PROJECT OVERVIEW

**Goal:** Create a production-grade, modern blog platform with world-class design, exceptional UX, and zero compromises on code quality.

**User:** Elias (eliasalcedo99@gmail.com)  
**Status:** In Development (Setup Phase)  
**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + Shadcn/UI  
**Hosting:** Vercel (auto-deploy)

---

## 🏗️ ARCHITECTURE & STANDARDS

### Directory Structure
```
toolbench/
├── blog-template/          # Main app (from tailwind-nextjs-starter-blog)
│   ├── app/                # Next.js App Router (Server Components default)
│   ├── components/         # Shadcn/UI + custom components
│   ├── content/            # MDX blog posts + YAML frontmatter
│   ├── lib/                # Utilities, hooks, helpers
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
├── shadcn-ui-resources/    # Component reference & patterns
├── design-systems-ref/     # Design system inspirations
├── .claude/settings.json   # Claude Code configuration
└── CLAUDE.md              # This file
```

### Technology Decisions

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 + App Router | SSR, SSG, ISR, SEO-first, Server Components |
| **Language** | TypeScript | Type safety, refactoring confidence, maintainability |
| **Styling** | Tailwind CSS | Utility-first, customizable, 2026 color trends |
| **Components** | Shadcn/UI + Radix | Copy-paste, headless, accessible, zero vendor lock-in |
| **Content** | MDX + YAML frontmatter | Markdown + React components, simple metadata |
| **Forms** | React Hook Form | Type-safe, performant, minimal boilerplate |
| **Icons** | Lucide (Shadcn default) | Modern, consistent, 500+ icons |
| **Rendering** | Static Generation + ISR | Fast, cheap, resilient, CDN-friendly |

---

## 🎨 DESIGN SYSTEM & VISUAL REQUIREMENTS

### 2026 Design Trends (MUST IMPLEMENT)
- ✅ **Bright, saturated color palettes** - Y2K nostalgia, vibrant, "dopamine design"
- ✅ **Bold typography** - Custom fonts, oversized headlines, layered styles
- ✅ **Micro-interactions** - Instant feedback, smooth animations, intentional motion
- ✅ **3D/WebGL elements** - Scroll-triggered animations, AR previews (where appropriate)
- ✅ **Accessibility-first** - WCAG 2.2 compliance (not optional)
- ✅ **Dark mode** - Built-in theme switching, respects user preference
- ✅ **Performance-obsessed** - Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

### Color Palette (Draft - Update from Primer/Polaris)
```
Primary:    #6366f1 (Indigo - bold, modern)
Secondary:  #ec4899 (Pink - Y2K, vibrant)
Accent:     #f59e0b (Amber - warmth)
Success:    #10b981 (Emerald)
Danger:     #ef4444 (Red)
Neutral:    #1f2937 → #f9fafb (Gray scale)

Dark Mode: Respects system preference + toggle
```

---

## 🔧 DEVELOPMENT WORKFLOW

### Before ANY code change:
1. Check blog-template/ structure and existing code
2. Verify the change doesn't hallucinate: grep in codebase for references
3. Run TypeScript type-check: `npm run type-check`
4. For UI changes: test in browser (dev server must be running)
5. Commit with clear message (WHY, not WHAT)

### Reducing Hallucinations (MY CONSTRAINTS)
- **No invented files/functions** - Grep before assuming anything exists
- **No fake imports** - Check package.json before using a library
- **Verify paths** - Use relative paths from blog-template/
- **Type-safety first** - Let TypeScript catch errors before runtime
- **Test locally** - Run `npm run dev` and test in browser before claiming done
- **Citation-based** - Every recommendation has a source (GitHub repo, official docs, etc.)

### Code Style Guidelines
- **TypeScript everywhere** - No `any`, strict mode enabled
- **Components are small** - Single responsibility principle
- **Server Components default** - Use "use client" only when necessary (state, events, hooks)
- **Shadcn/ui pattern** - Copy-paste components into `/components`, customize locally
- **No comments for WHAT** - Code should be self-documenting. Comments explain WHY (hidden constraints, workarounds)
- **No over-engineering** - Three similar lines > premature abstraction
- **No half-finished code** - Complete features or don't commit

---

## 📚 REFERENCED REPOSITORIES

These are cloned locally and should be referenced for patterns, components, and inspiration:

### Primary Template
- **[tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)** (`blog-template/`)
  - Production-ready blog boilerplate
  - Uses Contentlayer for MDX processing
  - Includes SEO, RSS, sitemap
  - **COPY FROM THIS** for initial structure

### Component Library Reference
- **[awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)** (`shadcn-ui-resources/`)
  - Curated shadcn/ui components & extensions
  - Use this to discover premium components
  - Copy component code into `blog-template/components/ui/`

### Design System Inspiration
- **[awesome-design-systems](https://github.com/alexpate/awesome-design-systems)** (`design-systems-ref/`)
  - Reference: Primer (GitHub), Polaris (Shopify), Carbon (IBM)
  - Study color palettes, spacing, typography
  - Reference these for accessibility patterns

### Additional Resources (Not Cloned - Reference Only)
- [shadcn/ui official docs](https://ui.shadcn.com/) - Authoritative component source
- [Next.js official docs](https://nextjs.org/docs) - Architecture, rendering strategies
- [Tailwind CSS docs](https://tailwindcss.com/docs) - Utility classes, customization

---

## 🚨 HALLUCINATION PREVENTION CHECKLIST

Before committing changes, verify:

- [ ] All imports exist in `package.json`
- [ ] All file paths exist in blog-template/
- [ ] TypeScript compiles without errors: `npm run type-check`
- [ ] No assumptions about external APIs/libraries
- [ ] Component names match shadcn/ui conventions
- [ ] YAML frontmatter syntax is valid (test in blog-template/data/)
- [ ] URLs/links are relative (not fabricated)
- [ ] Accessibility: ARIA labels, keyboard navigation tested
- [ ] Dark mode: Tested in both light and dark themes

---

## 📋 FEATURE ROADMAP

### Phase 1: Core Blog (CURRENT)
- [ ] Setup Next.js 15 with blog-template
- [ ] Configure Shadcn/UI components
- [ ] Customize colors to 2026 design trends
- [ ] Create custom home page layout
- [ ] MDX post rendering with syntax highlighting
- [ ] Dark mode toggle

### Phase 2: Features
- [ ] Search across posts (client-side index)
- [ ] Tags & categories system
- [ ] Related posts suggestion
- [ ] Comment system (optional: Giscus, Disqus)
- [ ] Newsletter signup (Substack, ConvertKit, Resend)
- [ ] Analytics (Vercel Analytics, Plausible)

### Phase 3: Polish
- [ ] Performance optimization (Lighthouse 90+)
- [ ] SEO enhancements (Open Graph, Twitter cards)
- [ ] RSS feed generation
- [ ] Sitemap + robots.txt
- [ ] Social share buttons
- [ ] Reading time estimates

### Phase 4: Advanced
- [ ] Full-text search (Algolia, Meilisearch)
- [ ] Reader analytics (top posts, scroll depth)
- [ ] Monetization options (sponsors, ads)
- [ ] API for external integrations

---

## 🎯 SUCCESS CRITERIA

A "done" blog meets ALL of these:

1. **Design Excellence**
   - Uses 2026 design trends (colors, typography, animations)
   - Fully responsive (mobile, tablet, desktop, ultrawide)
   - Accessibility: WCAG 2.2 AA compliant
   - Dark mode works perfectly

2. **Performance**
   - Lighthouse score: 90+ across all metrics
   - LCP < 2.5s, FID < 100ms, CLS < 0.1
   - Images optimized (Next.js Image component)
   - CSS/JS minified and code-split

3. **Code Quality**
   - Zero TypeScript errors (`strict: true`)
   - All components tested in browser
   - No console warnings/errors
   - Clean, readable, well-structured

4. **SEO & Metadata**
   - Meta tags (Open Graph, Twitter, canonical)
   - Sitemap.xml + robots.txt
   - RSS feed functional
   - Schema.org structured data

5. **Content**
   - At least 3 sample posts (with varied frontmatter)
   - Working MDX examples (components in posts)
   - Proper syntax highlighting
   - Related posts linking

---

## 🔗 QUICK REFERENCES

### Install Dependencies (blog-template)
```bash
cd blog-template
npm install
# or
yarn install
```

### Development Server
```bash
cd blog-template
npm run dev        # Starts on http://localhost:3000
```

### Type Check
```bash
npm run type-check
```

### Build for Production
```bash
npm run build
npm run start
```

### Verify Tailwind Config
```bash
# Check tailwind.config.js exists and is properly configured
cat blog-template/tailwind.config.js
```

---

## 💡 DESIGN INSPIRATION SOURCES

- **Primer Design System** (GitHub) - Modern, technical
- **Polaris Design System** (Shopify) - Accessible, clean
- **Shadcn/ui components** - Component patterns
- **Tailwind UI** (premium) - Professionally designed patterns

---

## 📝 NOTES FOR FUTURE CLAUDE

1. **This user is passionate about QUALITY.** Deliver excellence, not speed.
2. **Blog is in Spanish context.** Be ready to switch languages if needed.
3. **Hallucinations are a concern.** Always verify before acting.
4. **2026 design trends are IMPORTANT.** Don't use dated designs.
5. **Accessibility isn't optional.** WCAG 2.2 AA minimum.
6. **Test in browser ALWAYS.** Don't assume designs work without visual testing.
7. **Clone repos are local references.** Use them for patterns, not copy-paste entire files.
8. **TypeScript is non-negotiable.** Strict mode, proper types.

---

## 🚀 NEXT IMMEDIATE STEPS

1. Verify `blog-template/` cloned successfully
2. Install dependencies: `cd blog-template && npm install`
3. Start dev server: `npm run dev`
4. Review existing structure and understand Contentlayer setup
5. Create custom color palette in tailwind.config.js
6. Design home page layout (2026 trends)
7. Customize blog post layout with shadcn/ui components

---

**Last Updated:** 2026-05-05  
**Created By:** Claude Haiku 4.5  
**Project Status:** 🟢 Ready to Begin Development
