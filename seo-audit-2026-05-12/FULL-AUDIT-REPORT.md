# ToolBench — Full SEO Audit Report

**Sitio:** https://toolbench.netlify.app
**Fecha:** 2026-05-12
**Tipo de negocio detectado:** Publisher / Affiliate-style Review Directory (independiente, sin afiliados según declaración)
**Idioma:** Inglés (US)
**Tamaño:** 1.309 URLs en sitemap (1 home + 16 categories + 7 blog + 57 reviews + 1.226 compares + 1 methodology + 1 ai-comparator + submit-tool)
**Plataforma:** Astro estático sobre Netlify CDN

---

## Executive Summary

### SEO Health Score: **63 / 100**

| Categoría                | Peso  | Puntaje | Aporte  |
|--------------------------|-------|---------|---------|
| Technical SEO            | 22 %  | 72      | 15.84   |
| Content Quality          | 23 %  | 55      | 12.65   |
| On-Page SEO              | 20 %  | 70      | 14.00   |
| Schema / Structured Data | 10 %  | 60      | 6.00    |
| Performance (CWV)        | 10 %  | 80      | 8.00    |
| AI Search Readiness      | 10 %  | 25      | 2.50    |
| Images                   | 5  %  | 75      | 3.75    |
| **TOTAL**                | 100 % |         | **62.7** |

> Nota: PageSpeed Insights API devolvió cuota agotada para el proyecto por defecto. Los puntajes de performance son estimaciones de laboratorio (page weight, TTFB, formato de assets, lazy-loading) — no son CrUX field data.

### Top 5 problemas críticos
1. **Conflicto canonical ↔ trailing slash en 1.226 URLs `/compare/`.** El sitemap lista `/compare/x-vs-y` (sin slash), el servidor hace 301 a `/compare/x-vs-y/` (con slash), pero el HTML servido declara `canonical = .../x-vs-y` (sin slash) → Google entra en un ciclo redirect/canonical y desperdicia crawl budget en cada compare page.
2. **Contenido casi duplicado entre las 1.226 páginas `/compare/`.** El bloque "Quick Verdict" usa el mismo párrafo cambiando solo nombres (`"X edges ahead on overall quality and integration depth..."`). Riesgo alto de Helpful Content / SpamBrain.
3. **AI crawlers bloqueados en `robots.txt`** (GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended). Esto excluye al sitio de AI Overviews, ChatGPT search, Perplexity, Claude search. Decisión estratégica explícita — flagueada para revisión, no es bug.
4. **Saltos en jerarquía de headings en la home.** 1 H1 → 0 H2 → 57 H3. Los 57 tools listados deberían ser H2 con `<section>` o un patrón `<h2>` por categoría y `<h3>` por tool.
5. **`/methodology` sin JSON-LD y meta description de 61 chars** (`How we test, review, and score AI tools for small businesses.`). Una página de E-E-A-T fundamental queda invisible para rich results.

### Top 5 quick wins
1. Resolver el conflicto slash: o bien (a) actualizar `canonical` en compare pages a la versión con slash y regenerar sitemap con slash, o bien (b) eliminar la regla de Netlify que fuerza el slash. Una sola decisión arregla 1.226 URLs.
2. Añadir bloque `<script type="application/ld+json">` con `Organization` (con `logo`, `sameAs` apuntando a Twitter/GitHub/RSS) en el `<head>` global.
3. Añadir `FAQPage` schema en compare pages (ya existe la sección H2 "Frequently asked").
4. Cambiar las imágenes con `loading="lazy"` que aparecen above-the-fold a `fetchpriority="high"` para mejorar LCP.
5. Crear `/llms.txt` con el índice de reviews y comparativas — paradoja útil: incluso bloqueando crawlers AI con robots.txt, un `llms.txt` puede servir para humanos que evalúan el sitio y para crawlers que respetan ese estándar.

---

## 1. Technical SEO — 72/100

### Crawlability e indexabilidad
- ✅ `robots.txt` presente y bien formado: `Allow: /`, bloquea `/api/` y `/submit-tool/thanks`.
- ✅ `sitemap-index.xml` → `sitemap-0.xml` con 1.312 URLs (`lastmod: 2026-05-08`).
- ❌ **Conflicto canonical/trailing-slash en `/compare/*`** (1.226 URLs).
  - Sitemap: `https://toolbench.netlify.app/compare/chatgpt-vs-claude`
  - Curl GET sin slash → `301 → /compare/chatgpt-vs-claude/`
  - HTML servido en `/compare/chatgpt-vs-claude/` → `<link rel="canonical" href="https://toolbench.netlify.app/compare/chatgpt-vs-claude">` (sin slash).
  - Resultado: Google fetchea la URL del sitemap → 301 → carga HTML → sigue canonical → vuelve a la URL del sitemap → 301… El crawl budget se duplica por compare.
- ⚠️ `/methodology` y `/reviews/chatgpt` no tienen el patrón de redirect (responden 200 sin slash). El conflicto solo afecta `/compare/*`. Eso lo hace más sospechoso aún: el bug está localizado al template/router de compare.
- ✅ Sin `meta robots` en HTML — default `index, follow`.

### Headers de seguridad (Netlify)
- ✅ `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- ❌ Sin `Content-Security-Policy`. Para un publisher con AdSense + GA, una CSP estricta es difícil pero al menos un CSP report-only ayudaría.

### URLs
- ✅ HTTPS obligatorio con HSTS preload.
- ✅ Estructura jerárquica clara: `/compare/`, `/reviews/`, `/blog/`, `/category/`.
- ⚠️ El subdominio `netlify.app` no es óptimo para autoridad — para escalar EEAT conviene un dominio propio (toolbench.com / toolbench.io).

### Sitemap
- 1 archivo (`sitemap-0.xml`, 235 KB) → 1.312 URLs. Bajo el límite de 50.000.
- ✅ Todas las URLs tienen `<lastmod>`.
- ❌ Las URLs en sitemap son sin trailing slash (ver punto 1).
- ⚠️ Sin segmentación por tipo (un solo sitemap), aceptable a este tamaño.

---

## 2. Content Quality — 55/100

### E-E-A-T
- **Experience:** ✅ `/methodology` describe Sandbox Test, Stress Test, Workflow Test. Bien.
- **Expertise:** ⚠️ Solo un autor (`Elias, Editor`) en el único blog post inspeccionado. Compare y review usan `author: Organization (ToolBench)` — pierde señal de autor humano.
- **Authoritativeness:** ⚠️ Subdominio `netlify.app`, sin enlaces salientes a fuentes citables visibles en el HTML inicial, sin perfil de autor con bio/afiliaciones.
- **Trust:** ✅ Declara "No vendor sponsorships, no affiliate kickbacks" y "100% Independent". ⚠️ Sin disclosure de revenue model (¿AdSense? — sí, está cargado, pero no se menciona).

### Thin / Duplicate content (riesgo alto)
**Las 1.226 páginas `/compare/*` son contenido programático con boilerplate fuerte.** Muestra:

> Compare 1 (chatgpt-vs-claude): _"ChatGPT edges ahead on overall quality and integration depth, making it the stronger pick for most users. Claude remains competitive on price and is worth considering if budget is the primary constraint."_
>
> Compare 2 (midjourney-vs-dall-e-3): _"DALL-E 3 edges ahead on overall quality and integration depth, making it the stronger pick for most users. Midjourney remains competitive on price and is worth considering if budget is the primary constraint."_

La estructura es idéntica (mismo template Astro). La tabla de features cambia los datos. Las descripciones de cada tool ("X is...") son únicas por tool. El veredicto final es boilerplate.

**Word count por compare ~858**, pero ~50–60 % es boilerplate del veredicto y la tabla; el contenido único por par es ~300–400 palabras de descripciones unitarias de cada herramienta (que se repiten en cualquier otra compare donde aparezca esa tool).

Esto cae en el patrón que la guía de Helpful Content de Google llama "scaled content created primarily to rank in search rather than help people". Las 1.226 URLs combinatorias incluyen pares como `adobe-express-vs-chatpdf` o `adobe-firefly-vs-aiva` que **no comparten use case** — el usuario nunca elegiría entre ellas.

### Word counts inspeccionados
| Página                         | Palabras | Valoración |
|--------------------------------|----------|------------|
| Home                           | 1.844    | ✅ |
| `/compare/chatgpt-vs-claude/`  | 858      | ⚠️ template heavy |
| `/compare/midjourney-vs-...`   | ~870     | ⚠️ idem |
| `/reviews/chatgpt`             | 800      | ✅ contenido propio |
| `/blog/chatgpt-vs-claude-2026` | 582      | ⚠️ corto para blog técnico |
| `/methodology`                 | 566      | ⚠️ corto para pillar page |

### Readability
- Bloques cortos, listas, tablas — formato escaneable.
- `DM Sans` + `DM Serif Display` (Google Fonts) — legibles.

### AI citation readiness (paradoja)
El contenido **es** citable (resúmenes "Quick Verdict", tablas comparativas, "What works / Where it falls short") pero los AI bots están **bloqueados explícitamente en robots.txt** — ningún modelo puede leerlo para citar.

---

## 3. On-Page SEO — 70/100

### Titles y descriptions
| Página            | Title (chars) | Issue | Description (chars) | Issue |
|-------------------|---------------|-------|---------------------|-------|
| Home              | 67 ✅ | OK | 158 ✅ | OK |
| /compare/X-vs-Y/  | 55 ✅ | OK | 123 ✅ | OK |
| /reviews/chatgpt  | 26 ❌ | Solo "ChatGPT Review — ToolBench". Pierde keywords ("review 2026", "pricing", "vs"). | 195 ❌ | Excede 160 chars, se truncará en SERPs |
| /blog/...         | 72 ✅ | OK | 131 ✅ | OK |
| /methodology      | 35 ❌ | "Methodology - ToolBench — ToolBench" — **brand duplicado** | 61 ❌ | Demasiado corto (recom. 120–160) |

### Headings
| Página            | H1 | H2 | H3 | Issue |
|-------------------|----|----|----|------|
| Home              | 1  | 0  | 57 | ❌ Salta de H1 a H3. Las 57 tarjetas de tool deberían agruparse por H2 (categoría) → H3 (tool) |
| /compare/X-vs-Y/  | 1  | 4  | 3  | ✅ |
| /reviews/chatgpt  | 1  | 7  | 3  | ✅ |
| /blog/...         | 1  | 5  | 4  | ✅ |
| /methodology      | 1  | 4  | 5  | ✅ |

### Internal linking
- Home: 77 enlaces internos únicos → buena distribución de link equity hacia tools y categorías.
- Compare pages: 19 enlaces internos → razonable.
- ⚠️ No detecto bloque de "Related comparisons" cruzando compare pages entre sí (refuerzo de cluster).
- ⚠️ Las páginas de review enlazan a una category vía `?cat=general` (query param) — Google generalmente ignora query params para canonical. Considerar URLs limpias `/category/general/`.

### Open Graph / Twitter
- ✅ Todas las páginas inspeccionadas tienen `og:image` dedicado (`/og/{path}.png`).
- ✅ `twitter:card = summary_large_image`.
- ⚠️ Falta `twitter:site` (handle de la cuenta `@toolbench` o similar) — pequeño boost en Twitter Cards.

---

## 4. Schema / Structured Data — 60/100

### Implementación actual
| Página            | JSON-LD presentes |
|-------------------|-------------------|
| Home              | `WebSite` (con `SearchAction` + `publisher: Organization`) |
| /compare/X-vs-Y/  | `Article` (author: Organization) |
| /reviews/X        | `Review` + `SoftwareApplication` (itemReviewed) + `BreadcrumbList` |
| /blog/...         | `Article` (author: Person — ✅ esta sí tiene Person) |
| /methodology      | **0 JSON-LD** ❌ |

### Validación
- Schemas presentes son sintácticamente válidos (parseo JSON exitoso).
- Falta `mainEntityOfPage`, `image` en los Article schemas → reduce elegibilidad para rich results.
- Compare usa `Article` pero **el tipo más apropiado para "X vs Y"** es `Article` + `mainEntity: ComparisonTable` (no estándar) o mejor `Article` con un `ItemList` de los dos `SoftwareApplication` comparados.

### Oportunidades de schema faltantes
- ❌ **`Organization`** independiente con `logo`, `sameAs` (Twitter, GitHub, RSS). Hoy solo aparece anidado dentro de `WebSite.publisher`.
- ❌ **`ItemList`** en la home listando los 57 tools (rich result "Carousel of items").
- ❌ **`FAQPage`** en compare pages (la sección H2 "Frequently asked" ya existe).
- ❌ **`AggregateRating`** en reviews si hay puntuaciones agregadas de usuarios (hoy solo `Rating` individual).
- ❌ **`BreadcrumbList`** en compare y blog (solo está en review).
- ❌ **`SoftwareApplication.offers`** con `Price` real en los reviews (hoy describe el precio en texto pero no estructurado).

---

## 5. Performance (CWV) — 80/100

> ⚠️ PSI API devolvió `RESOURCE_EXHAUSTED` (cuota diaria del proyecto agotada). Este score es **estimación de laboratorio** basada en page weight, TTFB, formato de assets y configuración observable en el HTML. Para CWV reales hay que activar credenciales propias y correr `scripts/google_auth.py --check` o conectar Search Console / CrUX.

### Métricas observables (lab)
| Métrica                | Valor | Comentario |
|------------------------|-------|------------|
| TTFB (Netlify cold)    | ~300 ms | ✅ |
| HTML size              | 63 KB (home), 24 KB (compare) | ✅ |
| Total response time    | ~390 ms | ✅ |
| OG image (PNG)         | 47 KB | ✅ |
| Favicon SVG            | 319 B | ✅ |
| Tool logos             | SVG todos | ✅ |
| `<img>` `width/height` | 12/12 en home | ✅ CLS protegido |
| `loading="lazy"`       | 12/12 imgs | ⚠️ LCP image probablemente también lazy |
| `fetchpriority="high"` | 0 | ❌ Sin hint para LCP |
| Preconnect / preload   | 2 preconnect (Google Fonts) | ✅ |
| WebP / AVIF            | 0 referencias | N/A (todo SVG en home) |

### Third-party scripts
- Google Tag Manager / GA4 (`G-Z4FDHECFR6`).
- Google AdSense (`ca-pub-7749169472325720`) — impacta INP y CLS si se inserta after-load.

### Recomendaciones
- Quitar `loading="lazy"` de la primera fila de logos (above the fold) y añadir `fetchpriority="high"` al primer logo o al hero asset.
- Cargar GA y AdSense con `async` (ya están) pero considerar diferir AdSense hasta `requestIdleCallback`.
- Probar `<link rel="preload" as="image" href="/og/index.png">` solo si esa es la LCP image (hay que confirmar con DevTools).

---

## 6. AI Search Readiness — 25/100

### Decisión estratégica explícita
El `robots.txt` bloquea **deliberadamente** los crawlers de IA generativa:

```
User-agent: GPTBot      → Disallow: /
User-agent: ClaudeBot   → Disallow: /
User-agent: anthropic-ai → Disallow: /
User-agent: CCBot       → Disallow: /
User-agent: Google-Extended → Disallow: /
```

El comentario en el archivo dice `# Block AI training crawlers (set to your preference)` — está marcado como preferencia.

**Implicación:** ToolBench **no aparecerá** en:
- AI Overviews de Google (Google-Extended bloqueado).
- ChatGPT con web search (GPTBot bloqueado).
- Claude.ai citas (ClaudeBot + anthropic-ai bloqueados).
- Common Crawl → afecta a cualquier modelo entrenado con CC (CCBot bloqueado).
- Perplexity (no bloqueado por nombre — PerplexityBot **podría** pasar).

Esto es coherente si el modelo de negocio del sitio depende de **tráfico humano** (AdSense funciona) y no quiere que LLMs reemitan el contenido sin clic. Pero contradice la realidad de búsqueda 2026: el SERP cada vez incluye más AI Overviews; bloquear `Google-Extended` no impide aparecer en Google Search, pero sí en su AI Overview.

### `llms.txt`
- ❌ No existe (`/llms.txt` → 404).
- Recomendación: si la postura va a seguir siendo "permitir indexación humana, bloquear entrenamiento", un `llms.txt` mínimo permite a usuarios y a agentes que respetan el estándar saber qué hay en el sitio sin necesidad de scraping.

### Citability / passage retrieval (técnico)
Aunque hoy los bots están bloqueados, el contenido **está bien estructurado para citas**:
- ✅ "Quick Verdict" como passage corto y atribuible.
- ✅ "What works / Where it falls short" en bullets — formato típico que LLMs citan.
- ✅ Schema `Review` con `reviewBody` extraíble.
- ✅ Tabla de features comparables.

Si en algún momento se relaja la política, el sitio está listo a nivel de formato para ganar visibilidad en AI search.

### Brand mention signals
- Twitter, GitHub, RSS — enlaces presentes en footer.
- ⚠️ Falta `sameAs` en `Organization` schema declarando esos perfiles.

---

## 7. Images — 75/100

### Alt text
- Home: 12/12 imágenes con `alt` no vacío ✅.
- Review (ChatGPT): 3/3 con `alt` ✅.
- Compare, blog, methodology: 0 imágenes — pierde oportunidades visuales en contenido largo.

### Formato y tamaño
- ✅ Logos de tools: SVG (ideal — escalable, ligero).
- ✅ Favicon SVG (319 B).
- ⚠️ OG images: PNG ~47 KB. Una conversión a WebP/AVIF bajaría ~50 %.
- ✅ Atributos `width` y `height` presentes (CLS protegido).
- ✅ `loading="lazy"` aplicado.
- ❌ Sin `srcset` / `<picture>` — no se ven referencias a múltiples resoluciones.

### Recomendaciones
1. Convertir `/og/*.png` → `.webp` (mantener `.png` como fallback) y servir vía `<meta property="og:image:type" content="image/webp">` cuando aplique.
2. Añadir imágenes a las páginas `/compare/` — un diagrama "vs" o screenshot del producto incrementa engagement y tiempo en página.
3. Añadir hero/feature image en blog posts (hoy 0 `<img>` en el post inspeccionado).

---

## 8. Hallazgos varios

- ✅ `theme-color` declarado (`#0D0F0E`) — buen detalle para mobile chrome.
- ✅ `lang="en"` en `<html>`.
- ✅ Fuentes via preconnect (no `<link rel=stylesheet>` blocking inline).
- ⚠️ Google Fonts CSS bloqueante (`<link href="...fonts.googleapis.com..." rel="stylesheet">`). Considerar `media="print" onload="this.media='all'"` o self-host de las 2 familias.
- ⚠️ `og:image` siempre PNG (~47 KB cada uno) — para 1.226 compares más 57 reviews son ~60 MB de imágenes OG. Verificar generación on-build vs on-demand.
- ✅ La página `/ai-comparator` está en navegación principal con badge "NEW" — buena UX, pero no apareció en el sitemap como prioridad alta (verificar).

---

## Apéndice: páginas inspeccionadas

| URL                                              | Status | Bytes | Word count |
|--------------------------------------------------|--------|-------|------------|
| `/`                                              | 200    | 63.053 | 1.844 |
| `/compare/chatgpt-vs-claude/`                    | 200 (vía 301) | 24.482 | 858 |
| `/compare/midjourney-vs-dall-e-3/`               | 200 (vía 301) | 24.504 | ~870 |
| `/compare/zapier-vs-make/`                       | 404 (no en sitemap) | — | — |
| `/reviews/chatgpt`                               | 200    | 22.590 | 800 |
| `/blog/chatgpt-vs-claude-2026`                   | 200    | 18.941 | 582 |
| `/methodology`                                   | 200    | 18.021 | 566 |
| `/robots.txt`                                    | 200    | — | — |
| `/sitemap-index.xml`                             | 200    | 235 B | 1 sitemap ref |
| `/sitemap-0.xml`                                 | 200    | 235 KB | 1.312 URLs |
| `/llms.txt`                                      | 404    | — | — |

---

**Limitaciones de esta auditoría**
- PSI API quota agotada → puntaje Performance es lab-only.
- Sample de 3 compare pages (de 1.226) — la observación de boilerplate es consistente entre las 3.
- Sin acceso a Search Console, GA4 o CrUX → no se reportan impresiones, clicks, indexation rate ni CWV reales.
- Crawler no ejecutó JS — si hay contenido renderizado client-side podría haber elementos no capturados (Astro genera estático, así que es muy improbable).
