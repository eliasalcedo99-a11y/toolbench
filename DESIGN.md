# Design

Visual system for ToolBench. Sources of truth: `toolbench-site/src/styles/global.css` (CSS custom properties + component classes), `toolbench-site/src/layouts/BaseLayout.astro` (font loading, theme color).

## Visual Theme

**Editorial-warm dark.** A serif-led, magazine-column aesthetic on a near-black background tinted slightly warm. Deliberate distance from both SaaS-cream landings and AI-hype neon-on-black. The serif display face does most of the brand work; color is held in reserve for accents and verdicts.

Color strategy: **Restrained.** Tinted neutrals (warm-dark) carry the surface; amber acts as the single primary accent (≤10% of any view), with teal reserved for secondary signals (badges, "new").

Theme: **Dark-only by intent.** Scene: a small-business owner skimming reviews on a laptop during a working day. The dark editorial palette is a deliberate brand differentiator against the cream/white listicle category — not a tooling-cool default. Light mode is currently not offered (documented trade-off in PRODUCT.md accessibility section).

## Color

OKLCH-equivalent values (current implementation uses hex/rgba; should migrate to OKLCH long-term for predictable lightness math). All neutrals are warm-tinted toward the amber hue, never pure neutral.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0d0f0e` | Page background. Warm near-black, not `#000`. |
| `--bg-elev` | `#15181a` | Cards, search field, mobile nav drawer. One step up. |
| `--bg-elev-2` | `#1b1f22` | Reserved for further elevation (modals, popovers). |
| `--text` | `#e8e4dc` | Primary text. Warm off-white, not `#fff`. |
| `--muted` | `rgba(232,228,220,0.5)` | Secondary text, captions, meta. **Audit contrast.** |
| `--faint` | `rgba(232,228,220,0.08)` | Tertiary text, decorative hairlines. |
| `--border` | `rgba(232,228,220,0.09)` | Card/section borders. |
| `--row-alt` | `rgba(255,255,255,0.025)` | Zebra striping for tables. |

**Accents:**

| Token | Value | Role |
|---|---|---|
| `--amber` | `#f0c060` | Primary accent. CTAs, active pills, eyebrows, stars, "Top" badge, focus rings. |
| `--amber-soft` | `rgba(240,192,96,0.12)` | Tinted backgrounds for amber surfaces. |
| `--amber-glow` | `rgba(240,192,96,0.35)` | Hover halos, focus shadows. |
| `--teal` | `#1d9e75` | Secondary signal. "New" badge, positive states. |
| `--teal-soft` | `rgba(29,158,117,0.14)` | Teal tinted surfaces. |
| `--teal-bright` | `#4adea8` | Bright teal readout text on dark backgrounds. Matrix `cell-excellent`. |
| `--teal-bright-soft` | `#6ad9b5` | Softer bright teal readout. Matrix `cell-good`. |
| `--danger` | `#e06b5b` | Errors, "skip" verdicts. Used sparingly. |

**Discipline:**
- One accent dominates per view (amber). Teal is for state signals, not decoration.
- Never apply `background-clip: text` over a gradient (banned by impeccable laws). Solid `var(--amber)` only.
- Gradients only as low-opacity background washes (e.g. `.cta-banner`), never on text.

## Typography

**Type pairing:** DM Serif Display (display) + DM Sans (UI / body).

Loaded via Google Fonts with `media=print` swap pattern in `BaseLayout.astro:93-103`. Preconnect + preload in place.

| Element | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `h1` | DM Serif Display | `clamp(2.4rem, 6vw, 4.4rem)` | 400 | 1.15 | `-0.01em` |
| `h2` | DM Serif Display | `clamp(1.8rem, 3.6vw, 2.6rem)` | 400 | 1.15 | `-0.01em` |
| `h3` | DM Serif Display | `clamp(1.25rem, 2vw, 1.5rem)` | 400 | 1.15 | `-0.01em` |
| `h4` | DM Sans | `1.1rem` | 600 | 1.15 | `0.01em` |
| body | DM Sans | `16px` | 400 | 1.6 | 0 |
| eyebrow | DM Sans | `0.78rem` | 500 | — | `0.18em` uppercase |
| meta / muted | DM Sans | `0.84–0.94rem` | 400 | 1.55 | 0 |

Scale ratio between headings is ≥1.25 (clamp ensures responsiveness).

**Measure:** body paragraphs cap around `60ch` (`.hero-sub`) to `65ch`. Editorial-narrow, not full-width.

**Italic accent:** `em.accent` (amber + italic serif) — used inside headlines for emphasis (e.g. "Real *verdicts* on…"). This is a signature device of the brand voice. Don't overuse — one per heading.

## Spacing & Radius

**Spacing scale** (8px base, non-linear at the top end for editorial breathing room):

| Token | Value |
|---|---|
| `--s1` | 8px |
| `--s2` | 16px |
| `--s3` | 24px |
| `--s4` | 32px |
| `--s5` | 48px |
| `--s6` | 64px |
| `--s7` | 96px |

Section vertical rhythm uses `var(--s6) 0` by default. Hero gets `var(--s7) 0 var(--s6)`.

**Radius:**

| Token | Value | Use |
|---|---|---|
| `--r-xs` | 8px | Chips, social icons, kbd, search-result rows |
| `--r-sm` | 6px | Pills inside dense UI (badges, matrix icons) |
| `--r-md` | 10px | Buttons (when not pill), form fields, callouts |
| `--r-lg` | 14px | Cards, banners, primary surfaces |
| `--r-xl` | 18px | Large containers (newsletter, submit form, hero icon tile) |
| `--r-pill` | 999px | CTAs, filter pills, search field |

Migrate any new hardcoded radius to a token. 12px snaps up to `--r-lg`, 16px snaps up to `--r-xl`. Decorative micro radii (1-4px on dots, sliders, kbd) stay literal.

## Components

Implemented in `toolbench-site/src/components/`. Key patterns:

- **Nav** — sticky, blurred translucent background, amber underline for current page, pill CTA on right. Mobile: hamburger drawer.
- **Hero** — eyebrow (uppercase amber) → serif H1 with italic accent → muted subhead → pill search.
- **Pill filters** — outlined idle, amber-filled active. Used for category navigation on home.
- **Tool card** — bg-elev surface, icon + badges row, sans-serif H3 (note: not serif here; cards use UI type for density), 2-line clamped description, footer with star rating + price separated by hairline border. Hover: amber-glow border + lift shadow.
- **Stats** — three-column with serif amber numerals, muted labels. Vertical rules via top/bottom borders.
- **CTA banner** — low-opacity amber linear gradient wash on `bg-elev`. Eyebrow + serif title + primary button.
- **Buttons** — `.btn-primary` (amber on dark), `.btn-secondary` (amber outline). Hover lifts 1px + amber-soft shadow.
- **Tables** — for pricing and comparison. Tabular numerals (`font-variant-numeric: tabular-nums`) on prices.
- **Badges** — `.top` (amber-soft + amber), `.new` (teal-soft + teal), `.free` (faint neutral). Uppercase, tracked, pill-shaped.

**Interactive widgets** (vanilla JS, no framework): ScoreWidget, FAQ, GlobalSearch, CategoryFilter.

## Layout

- **Container:** `max-width: 1200px`, side padding `var(--s3)`.
- **Narrow container:** `max-width: 880px` for long-form articles.
- **Grid:** tools shown 2-up on desktop, 1-up below 760px.
- **Section rhythm:** `padding: var(--s6) 0` default. Vary intentionally — hero, stats, and CTA banner break the rhythm on purpose.

## Motion

- **Duration token:** `--t: 150ms ease`. Used for hover color/border transitions and button transforms.
- **Card hover:** border-color → amber-glow, box-shadow lift. No translate on cards.
- **Button hover:** `translateY(-1px)` + amber-soft glow shadow. Subtle, not bouncy.
- **Card enter:** `.fade-in` keyframe (opacity 0→1, translateY 8px→0) for filtered-in cards (250ms).

**Discipline:**
- No CSS layout-property animations (width/height/top/left). Use transform/opacity.
- No bounce or elastic easing.
- `prefers-reduced-motion` is **not yet honored** — must be added (see audit).

## Icons & Imagery

- Category iconography is emoji (`📊 🤖 🎨` etc.) defined in `src/data/categories.ts`. Editorial / approachable; consistent with the non-corporate voice. Trade-off: emoji rendering varies by OS; document if this becomes a brand issue.
- Tool logos rendered via `.icon` containers (48px / 80px header variant), 60% inner image with `object-fit: contain`.
- OG images generated via `astro-og-canvas` at `/og/<route>.webp`, declared in `BaseLayout.astro:52`.

## Anti-pattern guardrails

Specific to this project, derived from PRODUCT.md anti-references:

- No icon + heading + body card grids that look like SaaS feature lists. The home tool grid is allowed because each card carries a real verdict (rating, price, descriptor) — but new card grids must justify themselves.
- No gradient text. No glassmorphism beyond the nav's restrained backdrop blur.
- No hero-metric template ("57 tools / 1,225 comparisons / 100% independent" as three giant numbers in a hero). Stats live below the hero, in a divided strip, not as the headline.
- No "AI brain" / particle / robot imagery anywhere.
- Side-stripe borders (left/right colored accent) are banned, including on alert/callout components yet to be built.

## Open follow-ups

- Migrate color values to OKLCH for predictable lightness math.
- ~~Audit `--muted` for WCAG AA contrast on body text usage.~~ Done (alpha raised 0.5 → 0.7).
- ~~Add `@media (prefers-reduced-motion: reduce)` overrides.~~ Done (global block in `global.css`).
- Decide whether a light theme is a future requirement or a deliberate non-goal (document in PRODUCT.md if non-goal).
- Touch targets: pills, range thumbs, nav-cta, compare-list-item still fall below the 44×44 WCAG AA target. Pending `/impeccable adapt`.
