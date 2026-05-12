# ToolBench — SEO Action Plan

**Generado:** 2026-05-12
**SEO Health Score actual:** 63 / 100
**Score objetivo realista a 90 días:** 82 / 100

---

## 🔴 CRITICAL — Arreglar esta semana

### C1. Resolver conflicto canonical ↔ trailing slash en `/compare/*`
**Afecta:** 1.226 URLs (≈ 94 % del sitemap).
**Síntoma:** sitemap lista `/compare/x-vs-y` (sin slash), el server hace 301 a `/compare/x-vs-y/`, pero el HTML servido en la URL con slash declara `canonical = .../x-vs-y` (sin slash). Cada compare consume 2 hits del crawl budget.

**Opciones (elegir UNA):**

- **Opción A (recomendada):** unificar todo en versión sin slash.
  1. Eliminar la regla de Netlify que añade trailing slash a `/compare/*`. Revisar `netlify.toml` o `_redirects`.
  2. Astro: en `astro.config.mjs` configurar `trailingSlash: 'never'` para que los archivos generados sean `/compare/x-vs-y/index.html` pero servidos en URL sin slash, o ajustar el integration de sitemap.
  3. Verificar: `curl -I https://toolbench.netlify.app/compare/chatgpt-vs-claude` → debe devolver 200 (no 301).

- **Opción B:** unificar todo en versión con slash.
  1. Regenerar sitemap con URLs `/compare/x-vs-y/`.
  2. Actualizar `<link rel="canonical">` en el template Astro de compare a la versión con slash.
  3. Verificar: sitemap, canonical y URL final coinciden.

**Cómo verificar:** después del fix, ningún hit a `/compare/*` debería tener `301` en el header. Probar con 5 URLs aleatorias del sitemap.

**Effort:** 1 h. **Impacto:** alto (crawl budget + autoridad consolidada en 1 URL por par).

---

### C2. Decidir y comunicar la postura sobre AI crawlers
**Afecta:** todo el dominio.
**Estado actual:** `robots.txt` bloquea GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended. El comentario dice `# set to your preference`.

**Trade-off explícito:**
| Mantener bloqueo                                                                 | Levantar bloqueo                                                       |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Protege contenido propietario del entrenamiento sin compensación                 | Aparece en AI Overviews / ChatGPT search / Perplexity / Claude          |
| Conserva tráfico a la web (no se "responde" en el chat sin clic)                 | Cede contenido a LLMs sin garantía de clic                              |
| Bueno si el modelo de monetización es AdSense + tráfico                          | Bueno si el modelo es brand/autoridad                                   |

**Recomendación neutra:** decidir explícitamente y, si se mantiene el bloqueo, dejar pasar al menos a:
- `Googlebot` (no es Google-Extended; Googlebot estándar siempre debe entrar para el SERP normal).
- `Applebot` y `Applebot-Extended` (Siri/Apple Intelligence).

**Effort:** decisión de negocio + 10 min editar `robots.txt`.

---

### C3. Eliminar boilerplate de "Quick Verdict" en `/compare/*`
**Afecta:** 1.226 páginas.
**Síntoma:** todas usan literalmente el mismo párrafo: _"X edges ahead on overall quality and integration depth, making it the stronger pick for most users. Y remains competitive on price and is worth considering if budget is the primary constraint."_

**Acciones:**
1. Generar al menos 3–4 variantes de párrafo según el ganador real de cada comparativa (no siempre gana el primero alfabéticamente).
2. Reemplazar el adjetivo genérico ("edges ahead on overall quality") con datos específicos extraídos de los reviews de cada tool (e.g., "ChatGPT leads on integration ecosystem with 3M+ GPTs vs Claude's API-only approach").
3. Considerar marcar como `noindex` los pares que **no comparten use case** (e.g., `adobe-express-vs-chatpdf`) o eliminarlos del sitemap.

**Effort:** 4–8 h si se hace data-driven desde los reviews. **Impacto:** alto (mitiga riesgo de Helpful Content penalty).

---

## 🟠 HIGH — Arreglar en 1 semana

### H1. Arreglar jerarquía de headings en home
1 H1 → 0 H2 → 57 H3. Agrupar los 57 tool cards por categoría con `<h2>` (General AI, Code, Image, Video, ...) y dejar los nombres de tools como `<h3>`. Esto reproduce la estructura natural del sitemap y mejora outline para lectores de pantalla.

**Effort:** 1 h en el componente `ToolGrid.astro` o equivalente.

### H2. Arreglar title + description de `/reviews/*`
- Title actual: `ChatGPT Review — ToolBench` (26 chars).
  Nuevo: `ChatGPT Review 2026: Features, Pricing & Verdict — ToolBench` (60 chars).
- Description actual: 195 chars (se trunca).
  Recortar a ≤ 158 chars manteniendo la frase clave del veredicto.

**Effort:** 30 min en el template `[review].astro`. **Impacto:** alto (57 páginas con CTR potencial mayor).

### H3. Arreglar title + description + schema de `/methodology`
- Title actual: `Methodology - ToolBench — ToolBench` (brand duplicado).
  Nuevo: `How We Test AI Tools — ToolBench Methodology` (45 chars).
- Description actual: 61 chars.
  Nueva: 120–160 chars explicando los 3 stages (Sandbox / Stress / Workflow).
- Añadir JSON-LD `Article` o `AboutPage` con `author: Organization`, `mainEntityOfPage`, `datePublished`.

**Effort:** 45 min.

### H4. Añadir `Organization` JSON-LD global con `sameAs`
En el `<head>` global del layout:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ToolBench",
  "url": "https://toolbench.netlify.app",
  "logo": "https://toolbench.netlify.app/favicon.svg",
  "sameAs": [
    "https://twitter.com/<handle>",
    "https://github.com/<org>"
  ],
  "description": "Independent AI tool reviews and comparisons for US small business owners."
}
```
Sustituir los placeholders con los handles reales (revisar footer del sitio).

**Effort:** 30 min.

### H5. Añadir `FAQPage` schema en `/compare/*`
La sección H2 "Frequently asked" ya existe — falta marcarla. En el template de compare, generar `FAQPage` JSON-LD a partir del array de Q&A.

**Effort:** 1 h. **Impacto:** elegibilidad para rich results en SERP.

### H6. Optimizar LCP en home
1. Identificar la LCP image (probablemente el primer logo o el hero gradient).
2. Quitar `loading="lazy"` de ese elemento.
3. Añadir `fetchpriority="high"`.
4. Si es una imagen de archivo, añadir `<link rel="preload" as="image" href="...">` en `<head>`.

**Effort:** 1 h con DevTools abierto.

---

## 🟡 MEDIUM — Arreglar en 1 mes

### M1. Self-host de Google Fonts o `font-display: swap`
Eliminar el blocking `<link rel="stylesheet" href="fonts.googleapis.com/...">` o cargarlo con `media="print" onload="this.media='all'"`. Alternativa: descargar `DM Sans` y `DM Serif Display` a `/fonts/` y servirlos con `font-display: swap`.

### M2. Añadir `BreadcrumbList` a `/compare/*` y `/blog/*`
Hoy solo está en `/reviews/*`. Replicar el patrón.

### M3. Añadir `ItemList` schema a la home
Marcar los 57 tools como un `ItemList` con `itemListElement` → cada uno con `Product` o `SoftwareApplication`. Elegible para "Carousel" rich result.

### M4. Añadir `AggregateRating` + `Offer` a `Review` schema
Hoy el review trae un `Rating` individual. Si hay puntuaciones de usuarios (community sentiment), añadir `aggregateRating`. Y estructurar el precio actual con `offers` (no solo en texto).

### M5. Crear `/llms.txt`
Independiente de mantener bloqueo en robots.txt, crear un `/llms.txt` mínimo:
```
# ToolBench
> Independent AI tool reviews and comparisons.

## Methodology
- /methodology

## Reviews
- /reviews/chatgpt: ChatGPT review
- /reviews/claude: Claude review
- ...

## Comparisons
- /compare/chatgpt-vs-claude/
- ...

## Blog
- /blog/chatgpt-vs-claude-2026
- ...
```

### M6. Migrar OG images de PNG → WebP
Generación on-build con `sharp` o `@vercel/og` → WebP. Reduce ~50 % de bytes en imágenes OG (~30 MB ahorrados a escala de sitio).

### M7. Añadir hero image a `/blog/*`
Cero `<img>` en el blog post inspeccionado. Una imagen hero relevante mejora engagement, tiempo en página y permite `Article.image` rich result.

### M8. Añadir bloque "Related comparisons" en `/compare/*`
Links cruzados entre compares (e.g., desde `chatgpt-vs-claude` enlazar a `chatgpt-vs-gemini`, `claude-vs-gemini`). Refuerza el cluster topical.

### M9. Convertir URLs de categoría: `?cat=general` → `/category/general/`
El BreadcrumbList del review apunta a `https://toolbench.netlify.app/?cat=general` (query param). Las URLs limpias `/category/general/` ya existen en el sitemap — usarlas en los breadcrumbs.

---

## 🟢 LOW — Backlog

### L1. Considerar migrar de `toolbench.netlify.app` a dominio propio (`toolbench.com` / `.io`)
Subdominio de plataforma compartida limita autoridad. Hacer un 301 a dominio propio y reenviar enlaces.

### L2. Añadir CSP report-only
`Content-Security-Policy-Report-Only` para detectar dependencias inseguras sin romper nada.

### L3. Author pages
Crear `/authors/elias/` con bio, credenciales, sameAs a LinkedIn/Twitter. Mejora E-E-A-T.

### L4. Añadir `twitter:site` meta tag con el handle oficial.

### L5. Verificar que `/ai-comparator` esté priorizado en sitemap (página destacada en nav).

### L6. Considerar AMP / web stories — NO recomendado en 2026 (AMP descontinuado de facto).

---

## Tracking sugerido

Crear un baseline de drift ahora y comparar en 30/60/90 días:

```bash
# Si la skill seo-drift está configurada
python scripts/drift_baseline.py https://toolbench.netlify.app/
python scripts/drift_baseline.py https://toolbench.netlify.app/compare/chatgpt-vs-claude/
python scripts/drift_baseline.py https://toolbench.netlify.app/reviews/chatgpt
```

Métricas a monitorear:
- Indexed pages en GSC (target: > 1.200 de los 1.309 del sitemap).
- Promedio de impresiones por compare page.
- CTR de reviews vs compares.
- Páginas con CWV "Good" en CrUX (target: > 90 %).
- Rich results elegibles (target: Review, FAQ, Breadcrumb, Article).

---

## Roadmap de 90 días

| Semana | Tareas                                                                                              |
|--------|-----------------------------------------------------------------------------------------------------|
| 1      | C1 (canonical/slash) · C2 (decisión bots) · H1 (headings home) · H2 (reviews title/desc) · H3 (methodology) |
| 2      | C3 (boilerplate compare) · H4 (Organization schema) · H5 (FAQ schema) · H6 (LCP)                     |
| 3–4    | M1 (fonts) · M2 (Breadcrumb) · M3 (ItemList) · M4 (AggregateRating)                                  |
| 5–6    | M5 (llms.txt) · M6 (WebP) · M7 (hero blog) · M8 (related compares)                                   |
| 7–8    | M9 (URLs limpias) · Bake-in monitoreo (GSC indexing report, CrUX)                                    |
| 9–12   | L1 (dominio propio) · L3 (author pages) · revisar drift baseline · iterar sobre top 20 compares     |

---

**Próximo paso recomendado:** empezar por **C1** (1 h de trabajo, arregla 1.226 URLs).
