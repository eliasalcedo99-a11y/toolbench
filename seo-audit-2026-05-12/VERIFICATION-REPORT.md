# ToolBench — Verificación post-mejoras (Gemini)

**Fecha:** 2026-05-12
**Estado:** ⚠️ **Cambios en local pero NO desplegados a producción.**

---

## TL;DR

- **Producción (https://toolbench.netlify.app/) sigue idéntica byte-por-byte** al estado pre-mejoras. Etags coinciden (`690f0d40...`, `b03b8637...`), HTML diff vs captura previa = 0 cambios.
- **El working tree local tiene cambios extensos y de alta calidad** (BaseLayout, plantillas compare/review/blog/methodology/index, robots.txt, astro.config.mjs, netlify.toml, 1.226 archivos compare, llms.txt, author page).
- **Cobertura estimada del fix sobre los 6 issues Critical/High del audit: ~80 %.** Falta solo: deploy, optimización LCP y unas validaciones finales (ver tabla).
- **Próximo paso bloqueante:** `git add` → `git commit` → `git push` → esperar build de Netlify → re-verificar producción.

---

## Estado por issue

### 🔴 CRITICAL

| ID | Issue                                              | Local | Producción | Notas |
|----|----------------------------------------------------|-------|------------|-------|
| C1 | Conflict canonical ↔ trailing-slash en 1.226 `/compare/*` | ⚠️ Parcial | ❌ Sin cambios | `astro.config.mjs` ahora declara `trailingSlash: 'never'` y `build.format: 'file'`. Esto debería eliminar la generación de `/compare/x-vs-y/index.html` y forzar `/compare/x-vs-y.html`. **Hay que verificar post-deploy** porque Netlify a veces sigue forzando slash por su cuenta — si después del deploy `curl -I https://toolbench.netlify.app/compare/chatgpt-vs-claude` no devuelve 200 directo, hay que añadir un `_redirects` con `force = false` o desactivar "Pretty URLs" en Netlify. |
| C2 | AI crawlers bloqueados deliberadamente             | ✅ Clarificado | ❌ Sin cambios | `robots.txt` ahora declara explícitamente `Allow: /` para Googlebot, Applebot, Applebot-Extended. Mantiene bloqueo de GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended (decisión consciente). |
| C3 | Boilerplate "Quick Verdict" en 1.226 compares      | ⚠️ Mitigación parcial | ❌ Sin cambios | (a) Los 1.226 compares ya no usan el viejo "edges ahead on overall quality" — eliminado al 100 %. (b) **1.133 compares cross-category marcados como `noindex: true`** (BaseLayout respeta la prop) → quita del índice las comparaciones irrelevantes. (c) Los 93 compares restantes (mismo use case) usan **una de 4 variantes pseudo-aleatorias rotadas por slug** — reduce duplicate hashing pero **el contenido sigue siendo template** ("X is better overall, Y is cheaper"). |

### 🟠 HIGH

| ID | Issue                                              | Local | Producción | Notas |
|----|----------------------------------------------------|-------|------------|-------|
| H1 | Home: salto H1 → H3 sin H2                         | ✅ Hecho   | ❌ Sin cambios | `index.astro` reagrupa los 57 tools por categoría con `<h2 class="section-title">{cat.icon} {cat.label} AI Tools</h2>` por sección y `<h3>` dentro de cada `ToolCard`. |
| H2 | Reviews: title 26 chars, desc 195 chars            | ✅ Hecho   | ❌ Sin cambios | Title: `"${d.name} Review 2026: Features, Pricing & Verdict"`. Desc: truncamiento limpio a 155 chars con `…`. |
| H3 | Methodology: title brand-duplicado, desc 61 chars, 0 schema | ✅ Hecho   | ❌ Sin cambios | Title: `"How We Test AI Tools — ToolBench Methodology"`. Desc 184 chars (revisar — ligeramente sobre el sweet-spot de 155, pero acceptable). Añadido `AboutPage` JSON-LD. |
| H4 | Falta `Organization` schema con `sameAs`           | ✅ Hecho   | ❌ Sin cambios | `BaseLayout.astro:39-55` inyecta Organization globalmente con `@id`, logo, `sameAs: [twitter, linkedin]`. Inyectado en TODAS las páginas que usen BaseLayout. ⚠️ Confirmar handles reales (placeholder `@toolbench` y `linkedin.com/company/toolbench`). |
| H5 | `FAQPage` en compare                                | ✅ Hecho (override) | ❌ Sin cambios | Implementado en `compare/[slug].astro:52-63`. **Nota:** rich result no aparecerá en Google (restricción a gov/health desde Aug 2023), pero sí útil para Bing y LLMs que procesan FAQPage. Coste de implementación bajo. |
| H6 | LCP: imágenes lazy en above-the-fold, sin `fetchpriority` | ❌ Pendiente | ❌ Sin cambios | No veo `fetchpriority="high"` en hero/LCP element ni cambios en `loading` de imgs above-fold. **Pendiente real.** |

### 🟡 MEDIUM

| ID | Issue                                              | Local | Producción |
|----|----------------------------------------------------|-------|------------|
| M1 | Google Fonts blocking                               | ✅ Hecho — `media="print" onload="this.media='all'"` + `<noscript>` fallback en `BaseLayout.astro:98-114` | ❌ |
| M2 | BreadcrumbList faltante en compare/blog             | ✅ Hecho en ambos | ❌ |
| M3 | ItemList en home                                    | ✅ Hecho — `index.astro` añade `itemListSchema` con los 57 tools | ❌ |
| M4 | offers + aggregateRating en reviews                 | ✅ Hecho — `reviews/[slug].astro:44-77` añade `AggregateOffer` con parsing de `d.pricing[]` y `aggregateRating` | ❌ |
| M5 | `llms.txt`                                         | ✅ Hecho — nuevo `pages/llms.txt.ts` genera índice dinámico de reviews/compares/blog | ❌ (producción aún devuelve 404 en `/llms.txt`) |
| M6 | OG images PNG → WebP                                | ✅ Cambio en BaseLayout — `dynamicOgImage` ahora apunta a `.webp` | ❌ |
| M7 | Hero image en blog posts                            | ✅ Hecho — `blog/[slug].astro:102-106` renderiza `{d.image && <img>}` | ❌ |
| M8 | Related comparisons cruzados                        | ✅ Hecho — `compare/[slug].astro:26-32` filtra y muestra top 3 | ❌ |
| M9 | BreadcrumbList review apunta a `/?cat=` (query)    | ✅ Hecho — cambia a `/category/${cat}/` (URL limpia). Plus: `netlify.toml` añade redirect 301 `/?cat=:cat → /category/:cat` para legacy links | ❌ |

### 🟢 LOW + nuevos extras

| ID | Issue                              | Local | Producción |
|----|------------------------------------|-------|------------|
| L1 | Migrar a dominio propio            | ❌ N/A | — |
| L2 | CSP                                | ⚠️ Report-only — `netlify.toml` añade `Content-Security-Policy-Report-Only` razonable. Falta promover a enforced después de recopilar reports. | ❌ |
| L3 | Author page                        | ✅ Hecho — `/authors/elias.astro` con ProfilePage + Person schema | ❌ |
| L4 | `twitter:site` meta tag            | ✅ Hecho — `BaseLayout.astro:88` → `<meta name="twitter:site" content="@toolbench">`. ⚠️ Confirmar handle real. | ❌ |
| —  | COOP / CORP headers                | ✅ Hecho — `netlify.toml` añade `Cross-Origin-Opener-Policy: same-origin` y `Cross-Origin-Resource-Policy: same-origin` | ❌ |
| —  | Cache-Control para `/assets/*` y `/og/*` | ✅ Hecho — assets `max-age=31536000 immutable`, og `max-age=86400` | ❌ |
| —  | IndexNow                           | ❌ Sin cambios | ❌ |

---

## Mejoras adicionales que no había pedido explícitamente

Detectadas en el diff:

- ✅ `index.astro` agrupa tools por categoría — además del fix de H1, mejora UX y semántica.
- ✅ `compare/[slug].astro` añade sección visible "Related comparisons" — combina M8 schema con UX.
- ✅ `blog/[slug].astro` cambia `@type: Article` → `BlogPosting` (subtipo más específico).
- ✅ Todos los schemas ahora referencian Organization vía `@id` en vez de duplicar el bloque (mejor para Google's entity graph).
- ✅ `reviews/[slug].astro` author cambia de `Organization` a referencia `@id` a Organization — consistencia.

---

## Lo que NO se arregló o quedó incompleto

| # | Item                                                | Severidad | Recomendación |
|---|-----------------------------------------------------|-----------|----------------|
| 1 | **Deploy a producción.** Todo lo anterior solo afectará SEO cuando llegue a Netlify. | 🔴 Bloqueante | `git add -A && git commit && git push` |
| 2 | **H6 — LCP optimization.** Sin `fetchpriority="high"` en hero, ninguna img above-fold quitó `loading="lazy"`. | 🟠 High | En `index.astro` hero, marcar el primer `ToolCard` o logo del hero con `fetchpriority="high"` y `loading="eager"`. |
| 3 | **C3 — Las 93 compares indexables siguen siendo template.** 4 variantes rotadas siguen siendo boilerplate semántico ("X is better, Y is cheaper"). Google's Helpful Content evalúa semántica, no solo strings. | 🟠 High | Para cada par comparable, derivar el verdict de los datos reales: scores de cada tool, gap de precio, gap de features. Generar verdict en build-time como `${winner} wins on ${dimension}, ${loser} on ${other_dimension}`. |
| 4 | **Article schema en compare sigue sin `image` ni `mainEntityOfPage`.** | 🟡 Medium | Añadir en `compare/[slug].astro:33-49` `image: dynamicOgImage` y `mainEntityOfPage`. |
| 5 | **Compare cross-category con `noindex: true` siguen en sitemap.** Sitemap declarará 1.226 URLs aunque 1.133 estén noindex → Google las crawlea, ve noindex, no las indexa, pero gasta budget. | 🟡 Medium | En la integration de Astro sitemap, filtrar `comparisons` con `noindex: true` (o agregar `filter` al sitemap config). |
| 6 | **Handles sociales son placeholders.** `twitter.com/toolbench`, `linkedin.com/company/toolbench`, `@toolbench` y los del author page (`linkedin.com/in/elias`, `twitter.com/elias`) deben ser reales o eliminarse. | 🟡 Medium | Confirmar handles reales o quitar `sameAs` hasta tenerlos. Schemas con placeholders pueden ser flagged. |
| 7 | **`add_noindex.py` y `fix_verdicts.py` son scripts ad-hoc en root del repo.** Útiles pero no idempotentes ni testeados. | 🟢 Low | Moverlos a `toolbench-site/scripts/`, añadir docstring + dry-run flag. O eliminar tras correrlos. |
| 8 | **IndexNow** sigue sin configurar. | 🟢 Low | Tarea para una iteración futura. |

---

## Verificación post-deploy — comandos sugeridos

Cuando despliegues, correr:

```bash
# 1. Confirmar que el conflict de slash se resolvió
curl -sI https://toolbench.netlify.app/compare/chatgpt-vs-claude | head -1
#   esperado: HTTP/1.1 200 OK (no 301)
curl -sSL https://toolbench.netlify.app/compare/chatgpt-vs-claude | grep canonical
#   esperado: canonical sin trailing slash matcheando la URL solicitada

# 2. Confirmar que el robots.txt nuevo está activo
curl -sS https://toolbench.netlify.app/robots.txt | grep -E "Googlebot|Applebot"

# 3. Confirmar que llms.txt existe
curl -sSI https://toolbench.netlify.app/llms.txt | head -1
#   esperado: HTTP/1.1 200 OK

# 4. Confirmar Organization schema en home
curl -sSL https://toolbench.netlify.app/ | python -c "import sys,re,json; html=sys.stdin.read(); blocks=re.findall(r'<script type=\"application/ld\\+json\">(.*?)</script>', html, re.S); print('JSON-LD blocks:', len(blocks)); [print(json.loads(b).get('@type')) for b in blocks]"
#   esperado: 3 bloques mínimo: WebSite, Organization, ItemList

# 5. Confirmar noindex en compare cross-category
curl -sSL https://toolbench.netlify.app/compare/adobe-express-vs-chatpdf | grep "robots"
#   esperado: <meta name="robots" content="noindex, nofollow">

# 6. Confirmar OG image WebP
curl -sSI https://toolbench.netlify.app/og/index.webp | head -1
#   esperado: 200 con content-type: image/webp

# 7. Confirmar review schema con offers
curl -sSL https://toolbench.netlify.app/reviews/chatgpt | grep -oE 'AggregateOffer|aggregateRating'

# 8. Confirmar BreadcrumbList en blog y compare
curl -sSL https://toolbench.netlify.app/blog/chatgpt-vs-claude-2026 | grep -oE 'BreadcrumbList'
curl -sSL https://toolbench.netlify.app/compare/chatgpt-vs-claude | grep -oE 'BreadcrumbList'

# 9. Confirmar CSP report-only
curl -sSI https://toolbench.netlify.app/ | grep -i "content-security-policy"

# 10. Comparar etag (debe cambiar)
curl -sSI https://toolbench.netlify.app/ | grep -i etag
#   debe ser diferente a "690f0d40858c8323c678dc9317c00156-ssl"
```

---

## SEO Health Score: proyección

| Momento                              | Score |
|--------------------------------------|-------|
| Antes (audit 2026-05-12)             | 63 / 100 |
| Hoy (cambios sin desplegar)          | 63 / 100 (producción inalterada) |
| Tras deploy + items 1–6 de pendientes | ~84 / 100 (proyectado) |
| Tras roadmap completo a 90 días       | ~90 / 100 (objetivo) |

---

**Conclusión:** trabajo muy completo en el código. Falta solo desplegarlo. Aproximadamente el 80 % de issues Critical/High están resueltos en local; tras el deploy y los 8 items pendientes listados arriba, el score llega a low-80s.

¿Quieres que arranque (a) el deploy con commit + push, o (b) los 2 items pendientes más altos (H6 LCP + C3 verdicts data-driven)?
