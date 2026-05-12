# Product

## Register

brand

## Users

US small business owners — non-technical operators evaluating AI tools for their business. They arrive primarily via organic search ("best AI for X", "tool A vs tool B", "alternatives to Y") with a concrete buying or replacement decision in mind. Context of use is mid-research: they have a partial shortlist, limited time, and skepticism toward affiliate-driven listicles. They want a credible verdict, an honest comparison, and a clear picture of price/fit for a small-team workflow — not an exhaustive feature dump.

Secondary readers: solopreneurs and freelancers making the same decisions at a smaller scale.

## Product Purpose

ToolBench is an independent editorial site reviewing and comparing AI tools for SMB use. The pitch is straight: no vendor sponsorships, no affiliate kickbacks, real verdicts. Surface coverage is reviews, head-to-head comparisons, an AI Matrix (use-case × tool), and editorial blog posts.

Success has two reinforcing dimensions:
1. **SEO + monetization** — long-tail organic traffic feeding AdSense (and future independent revenue). Dwell time, scroll depth, and internal click-through on comparisons matter.
2. **Editorial authority** — being the site readers and other publishers cite. The brand of independence compounds the SEO bet over time.

These are not in tension when the design transmits credibility; they fail together when the site looks like the listicles it competes against.

## Brand Personality

Editorial, sobrio, candid. Three-word voice: **independent · plainspoken · opinionated**.

- Writes like a columnist with a strong byline, not a vendor marketing page.
- Uses verdicts ("Skip it", "Worth the price for X workflow") instead of hedged "great for everyone" copy.
- Confident but not snarky. Tone is closer to a serious consumer-review desk than to either a hype blog or a corporate review aggregator.
- Visual identity reinforces this: serif display headlines, restrained warm-dark palette, generous editorial whitespace.

## Anti-references

What ToolBench must NOT resemble:

1. **"Top 10 AI tools" SEO-spam sites.** Listicles full of affiliate links, generic stock copy, gradient hero banners, screenshots scraped from vendor sites. This is the direct competitor and the visual lane to consciously avoid.
2. **Generic SaaS landing pages.** The Linear/Vercel-imitator look: identical icon-heading-text card grids, gradient text headlines, glassmorphism, the hero-metric template, dashboard mockup as hero image.
3. **AI-hype / crypto-tech aesthetic.** Neon violet/cyan on pure black, "next-gen AI" copy, robot/brain iconography, particle backgrounds, anything that signals Web3-adjacent.

Implied but worth keeping in mind: heavy-magazine density (The Verge / Wired-style) with dominant ad slots and aggressive newsletter modals — editorial yes, but not at the cost of reading experience.

## Design Principles

1. **Independence is the product.** Every visual choice should reinforce "this site is not for sale." That means no skinned-vendor aesthetics, no auto-playing CTAs, no design language readers associate with affiliate funnels.
2. **Verdicts over features.** Layouts foreground the conclusion (rating, recommendation, "skip / get it / wait") before the long feature comparison. The page should be readable at three depths: glance, skim, deep-read.
3. **Editorial restraint beats SaaS gloss.** Serif headlines, narrow measure, limited accents, deliberate whitespace. The site looks more like a magazine column than a product page — and that is the moat against the listicle category.
4. **Speed and clarity are part of credibility.** A slow, cluttered, ad-jammed page contradicts the editorial pitch. Performance and density choices are brand decisions, not just technical ones.
5. **Index of trust.** Show the work: methodology link, "no sponsorships" claim near commercial surfaces (AdSense, sponsor slots if any), author attribution, last-updated dates on reviews. Trust signals are first-class UI elements, not footer afterthoughts.

## Accessibility & Inclusion

WCAG 2.2 AA as the floor. Practical requirements:

- All text/background contrast ≥ 4.5:1 (≥ 3:1 for large text and UI components). The current dark-only palette must be audited; muted tints like `rgba(232,228,220,0.5)` need verification.
- Full keyboard navigation with visible focus rings on every interactive element.
- Proper semantic structure (one `<h1>` per page, logical heading order, landmarks, `<button>` vs `<a>` discipline).
- Alt text on every meaningful image; decorative images marked `alt=""`.
- Forms (search, newsletter, submit-tool) with associated labels and accessible error states.
- Respect `prefers-reduced-motion` for any future animations.

Dark-only is a known accessibility trade-off (some users with astigmatism or low vision prefer light themes). Document the choice in DESIGN.md and revisit if user feedback warrants a light toggle.
