# ToolBench — Technical SEO Report

**Sitio:** https://toolbench.netlify.app
**Fecha:** 2026-05-12
**Plataforma:** Astro static + Netlify CDN
**Tamaño:** 1.312 URLs en sitemap

---

## Technical Score: **71 / 100**

| Categoría             | Status | Score   |
|-----------------------|--------|---------|
| Crawlability          | ⚠️ warn | 75/100  |
| Indexability          | ❌ fail | 55/100  |
| Security              | ✅ pass | 88/100  |
| URL Structure         | ⚠️ warn | 60/100  |
| Mobile                | ✅ pass | 90/100  |
| Core Web Vitals       | ⚠️ warn | 78/100  |
| Structured Data       | ⚠️ warn | 65/100  |
| JS Rendering          | ✅ pass | 95/100  |
| IndexNow              | ⚠️ warn | 0/100   |

> El score de CWV es lab-only — PSI API quota agotada (cuota diaria del proyecto por defecto). Recomendado: configurar credenciales propias y correr `scripts/pagespeed_check.py`.

---

## 1. Crawlability — 75/100 ⚠️

### robots.txt
- ✅ Existe en `/robots.txt`, válido sintácticamente.
- ✅ Contiene `Sitemap: https://toolbench.netlify.app/sitemap-index.xml`.
- ✅ `Disallow: /api/` y `Disallow: /submit-tool/thanks` — buenas decisiones.
- ⚠️ **Bloqueo agresivo de AI crawlers** (revisar tabla más abajo).

### Sitemap
- ✅ `/sitemap-index.xml` → 1 sitemap (`sitemap-0.xml`, 235 KB, 1.312 URLs).
- ✅ `<lastmod>` presente en todas las URLs.
- ❌ **URLs en sitemap sin trailing slash** mientras el server fuerza con slash en `/compare/*` → conflicto (ver Indexability).

### AI Crawler Management — ⚠️ bloqueo agresivo

| Crawler            | Empresa     | Estado actual | Recomendación                                  |
|--------------------|-------------|---------------|-----------------------------------------------|
| `GPTBot`           | OpenAI      | ❌ Disallow / | Decisión estratégica (entrenamiento de modelo) |
| `ChatGPT-User`     | OpenAI      | ⚠️ No declarado → cae en `User-agent: *` (Allow) | OK si quieres aparecer en citaciones live de ChatGPT |
| `ClaudeBot`        | Anthropic   | ❌ Disallow / | Decisión estratégica                            |
| `anthropic-ai`     | Anthropic   | ❌ Disallow / | Idem — token alternativo                        |
| `PerplexityBot`    | Perplexity  | ⚠️ No declarado → Allow | OK si quieres aparecer en Perplexity            |
| `Google-Extended`  | Google      | ❌ Disallow / | **Solo bloquea entrenamiento de Gemini**, no AI Overviews del SERP — confusión común |
| `CCBot`            | Common Crawl| ❌ Disallow / | Afecta entrenamiento de muchos modelos          |
| `Bytespider`       | ByteDance   | ⚠️ No declarado → Allow | Considerar bloqueo si no apuntas a mercado CN  |
| `Googlebot`        | Google      | ✅ Allow      | OK — sin afectar al search normal                |

**Aclaración crítica:** bloquear `Google-Extended` **NO** impide aparecer en Google Search ni en AI Overviews del SERP (esos usan `Googlebot`). Solo impide que tu contenido entrene futuros modelos Gemini. Esta distinción está marcada explícitamente en la documentación de Google. La decisión que tomó ToolBench es coherente con una postura "no entrenes con mi contenido, pero indexa".

### Crawl depth
- Pages a 1 clic de home: 6 (Reviews, AI Matrix, Compare, Methodology, Blog, Submit a Tool).
- ✅ Categorías y reviews accesibles directamente desde nav.
- ⚠️ 1.226 compare URLs no son alcanzables todas dentro de 3 clicks desde home — dependen del sitemap. Riesgo de orphan pages: las compare entre tools obscuros pueden no tener inlinks naturales.

### JavaScript rendering
- ✅ HTML pre-renderizado (Astro static). Title, description, canonical, JSON-LD, headings, contenido principal — todo presente en el HTML inicial sin necesidad de JS. **0 riesgo** de problemas de indexación por JS.

---

## 2. Indexability — 55/100 ❌

### Canonicals
- ✅ Cada página inspeccionada tiene `<link rel="canonical">`.
- ✅ `/index.html` → canonical apunta a `/`.
- ✅ `/?q=test` → canonical apunta a `/` (queries no generan duplicates).
- ❌ **Conflicto canonical/redirect en 1.226 URLs `/compare/*`:**
  - Sitemap: `/compare/x-vs-y` (sin slash)
  - GET sin slash → `301 → /compare/x-vs-y/`
  - HTML servido → `canonical = .../x-vs-y` (sin slash)
  - **Loop:** Google sigue la URL del sitemap → 301 → renderiza → ve canonical apuntando a la URL del sitemap → vuelve a fetchearla → 301…

### Duplicates / variantes URL
| Variante                                  | Comportamiento  | Riesgo      |
|-------------------------------------------|-----------------|-------------|
| `/index.html` vs `/`                      | 200 + canonical → `/` | ✅ Resuelto |
| `/?q=test` (search query)                 | 200 + canonical → `/` | ✅ Resuelto |
| `/COMPARE/chatgpt-vs-claude/` (uppercase) | **200** mismo HTML | ⚠️ Case-insensitive — depende del canonical para consolidar |
| `/compare/x-vs-y` (sin slash) vs `/compare/x-vs-y/` | 301 + canonical conflicto | ❌ Crítico |
| `/reviews/X` vs `/reviews/X/`             | Ambos 200 sin redirect | ⚠️ Posible duplicate (verificar canonical en ambas) |

### Trailing slash inconsistencia
- `/compare/*` → fuerza slash (301).
- `/reviews/*`, `/blog/*`, `/methodology` → no fuerza slash (200 en ambas variantes).
- ⚠️ **Política inconsistente.** Decidir UNA convención y aplicarla globalmente (recomendado: sin slash, ya que es lo que está en el sitemap).

### Thin content
- ✅ Home: 1.844 palabras.
- ⚠️ `/compare/*`: 858 palabras, pero ~50 % es boilerplate template ("Quick Verdict" idéntico en las 1.226 páginas). Riesgo Helpful Content.
- ⚠️ `/blog/*` muestra: 582 palabras — borderline para blog técnico.
- ⚠️ `/methodology`: 566 palabras — corto para una pillar page de EEAT.

### Pagination
- No detectada en home (no hay `rel="next"/"prev"`).
- ⚠️ Si hay paginación en categorías (`/category/*?page=2`?), verificar manejo.

### Hreflang
- Sitio en inglés (US). Sin hreflang — correcto (sin necesidad multi-idioma).

### Index bloat
- 1.226 compare pages combinatorias. Si muchas son entre tools que no comparten use case (`adobe-express-vs-chatpdf`), eso es bloat puro.
- Recomendación: implementar criterio de "comparabilidad" (misma categoría, overlap de use case) y noindex el resto.

---

## 3. Security — 88/100 ✅

### HTTPS
- ✅ HTTP → HTTPS con 1 hop (301).
- ✅ Certificado válido (Netlify Edge).
- ✅ Sin mixed content detectado en HTML inicial.

### Headers de seguridad (verificados en respuesta)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

| Header                       | Estado | Comentario                         |
|------------------------------|--------|------------------------------------|
| HSTS                         | ✅     | 1 año + includeSubDomains + preload (listo para HSTS preload list) |
| HSTS preload list inclusion  | ⚠️     | El header está listo, pero el dominio `netlify.app` debe estar en la preload list global (no aplica a subdominios individuales). Para dominio propio, registrar en https://hstspreload.org/ |
| X-Content-Type-Options       | ✅     | nosniff                             |
| X-Frame-Options              | ✅     | DENY                                |
| Referrer-Policy              | ✅     | strict-origin-when-cross-origin     |
| Permissions-Policy           | ✅     | geolocation/mic/camera deshabilitados |
| Content-Security-Policy      | ❌     | **Ausente**                         |
| Cross-Origin-Resource-Policy | ⚠️     | No declarado                        |
| Cross-Origin-Opener-Policy   | ⚠️     | No declarado                        |

### CSP — falta
Recomendado para un publisher con GA + AdSense + Google Fonts. Empezar con `Content-Security-Policy-Report-Only` para no romper nada:
```
Content-Security-Policy-Report-Only:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://www.google-analytics.com;
  frame-src https://googleads.g.doubleclick.net;
  report-uri /csp-report-endpoint;
```

---

## 4. URL Structure — 60/100 ⚠️

### Estructura jerárquica
- ✅ Lógica clara: `/compare/`, `/reviews/`, `/blog/`, `/category/`.
- ✅ Slugs descriptivos y hyphenated (`chatgpt-vs-claude`, `top-10-ai-productivity-tools-2026`).
- ✅ Sin parámetros de tracking en canonicales.

### Inconsistencias detectadas
| Issue                                         | Detalle | Severidad |
|-----------------------------------------------|---------|-----------|
| Trailing slash inconsistente entre `/compare/` (con slash) y `/reviews/`, `/blog/`, `/methodology` (sin slash forzado) | Política mixta dentro del mismo dominio | Alta |
| `/COMPARE/...` (uppercase) sirve el mismo contenido | Depende de canonical para no generar duplicate | Media |
| Categoría como query: BreadcrumbList del review apunta a `/?cat=general` en vez de `/category/general/` | Las URLs limpias existen en sitemap — usarlas | Media |

### Redirects
- ✅ HTTP → HTTPS: 1 hop.
- ❌ `/compare/x-vs-y` (sitemap) → 301 → `/compare/x-vs-y/`: 1 hop en 1.226 URLs.
- ✅ Sin chains (max 1 hop observado).

### URL length
- Compares promedio: ~50 caracteres ✅.
- Algunos casos largos: `/compare/google-workspace-ai-vs-microsoft-365-copilot` (52). Aceptable.

---

## 5. Mobile — 90/100 ✅

### Viewport
- ✅ `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- ✅ `<meta name="theme-color" content="#0D0F0E">` (chrome mobile).
- ⚠️ Sin `apple-mobile-web-app-*` meta tags (no crítico).

### Responsive
- ✅ Sitio responsive (Astro + Tailwind, presumiblemente).
- ⚠️ No se hizo prueba visual mobile en este audit — recomendado correr `seo-visual` con Playwright para confirmar touch targets ≥ 48 px y ausencia de scroll horizontal.

### Mobile-first indexing
- Mobile-first indexing completado por Google desde 2024-07-05 → el mobile Googlebot es el único crawler de indexación. Verificado en HTML inicial: mismo contenido que desktop (Astro static = un solo HTML para ambos).

---

## 6. Core Web Vitals — 78/100 ⚠️ (lab-only)

### Estado de datos
- ❌ **PSI API quota = 0** ("RESOURCE_EXHAUSTED"). Sin field data CrUX en esta corrida.
- ⚠️ Sitio relativamente nuevo → es probable que no haya umbral de CrUX (necesita tráfico).

### Métricas observables (lab)
| Métrica            | Valor estimado | Threshold | Status |
|--------------------|---------------|-----------|--------|
| TTFB               | ~300 ms       | < 800 ms  | ✅     |
| FCP                | desconocido (sin PSI) | < 1.8 s | ⚠️ |
| LCP                | desconocido — no se identificó el elemento LCP exacto | < 2.5 s | ⚠️ |
| INP                | desconocido (necesita field data) | < 200 ms | ⚠️ |
| CLS                | bajo riesgo: `<img width/height>` presente | < 0.1 | ✅ estimado |
| Page weight (home) | 63 KB HTML + ~50 KB OG image + SVGs | razonable | ✅ |

### Observaciones para optimizar LCP
- 12/12 imágenes con `loading="lazy"` — incluyendo posibles candidatas a LCP.
- 0 elementos con `fetchpriority="high"`.
- Google Fonts cargado vía `<link rel="stylesheet">` (blocking).

### Próximo paso
Configurar credenciales propias de PSI/CrUX y correr:
```bash
python scripts/pagespeed_check.py https://toolbench.netlify.app/ --json
python scripts/crux_history.py https://toolbench.netlify.app/ --json
```

---

## 7. Structured Data — 65/100 ⚠️

Detección — JSON-LD presente:

| Página            | Tipos detectados                                    |
|-------------------|-----------------------------------------------------|
| `/`               | `WebSite` (con `SearchAction` y `publisher: Organization` anidada) |
| `/compare/*`      | `Article` (`author: Organization`)                  |
| `/reviews/*`      | `Review` + `SoftwareApplication` + `BreadcrumbList` |
| `/blog/*`         | `Article` (`author: Person`)                        |
| `/methodology`    | **0 schemas**                                       |

### Validación
- ✅ JSON parseable en todos los casos detectados.
- ⚠️ Falta `mainEntityOfPage` e `image` en Article schemas → reduce elegibilidad para rich results.

### Faltantes prioritarios
- ❌ `Organization` standalone con `sameAs` (Twitter, GitHub, RSS).
- ❌ `ItemList` en home (57 tools listados).
- ❌ `FAQPage` en compare pages (la sección existe en HTML).
- ❌ `BreadcrumbList` en compare y blog.
- ❌ `SoftwareApplication.offers` con `Price` real en reviews.

> Detalle completo en `FULL-AUDIT-REPORT.md §4`. Recomendación: spawn `seo-schema` skill para generar el JSON-LD limpio para cada tipo.

---

## 8. JavaScript Rendering — 95/100 ✅

- ✅ Astro static site generation: todo el HTML crítico (title, meta, canonical, JSON-LD, headings, contenido principal) está en el HTML inicial.
- ✅ Sin riesgo de "canonical vs JS-injected canonical" (todo en raw HTML).
- ✅ Sin SPA shell. Sin contenido client-side rendered.
- ⚠️ AdSense y GA inyectan scripts after-load — esto NO afecta indexabilidad pero sí INP. Considerar `requestIdleCallback` para AdSense.

### Verificación rápida
```
curl -sSL https://toolbench.netlify.app/ | grep -E 'canonical|title|description'
```
Resultado: meta tags + canonical presentes en respuesta plain HTML. ✅

---

## 9. IndexNow — 0/100 ⚠️

- ❌ Sin archivo de key (`/{key}.txt`) detectado.
- ❌ Sin `/.well-known/indexnow`.
- ❌ Sin header `x-indexnow` en respuesta.

**Recomendación:** activar IndexNow para acelerar la indexación en Bing/Yandex/Naver (Google no lo soporta pero también no lo penaliza).

Pasos:
1. Generar una key (UUID v4 sin guiones, e.g., `8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d`).
2. Subir `https://toolbench.netlify.app/8a7b...key.txt` con el contenido siendo la propia key.
3. En el script de deploy/build, llamar:
   ```
   POST https://api.indexnow.org/IndexNow
   { "host": "toolbench.netlify.app", "key": "8a7b...", "urlList": [...nuevas URLs...] }
   ```

Útil sobre todo porque ToolBench actualiza el contenido (sitemap `lastmod: 2026-05-08`) y los reviews nuevos podrían indexarse antes en Bing.

---

## Critical Issues (fix immediately)

1. **C1 — Conflicto canonical/trailing-slash en 1.226 URLs `/compare/*`.**
   El sitemap declara sin slash, el server hace 301 a con slash, pero el canonical apunta otra vez a sin slash. Ver `ACTION-PLAN.md §C1` con los dos caminos posibles (Opción A: forzar sin slash globalmente; Opción B: actualizar canonical y sitemap a con-slash).

2. **C2 — Política de trailing slash inconsistente.**
   `/compare/*` fuerza slash; `/reviews/`, `/blog/`, `/methodology` no lo fuerzan. Unificar criterio en `astro.config.mjs` (`trailingSlash: 'never'` o `'always'`) y verificar Netlify redirects.

---

## High Priority (fix within 1 week)

1. **Decidir explícitamente postura sobre AI crawlers.** El bloqueo actual a `Google-Extended` solo afecta entrenamiento de Gemini, no Search ni AI Overviews — confirmar que esa es la intención. Considerar declarar `ChatGPT-User` y `PerplexityBot` (hoy implícitamente permitidos).

2. **Crear `Organization` schema standalone con `sameAs`** en el layout global. Hoy solo aparece anidada dentro de `WebSite.publisher` sin `logo` ni `sameAs`.

3. **Añadir `FAQPage` schema** en compare pages — la sección H2 "Frequently asked" ya existe en el HTML.

4. **Añadir JSON-LD a `/methodology`** (Article o AboutPage) — pillar page de E-E-A-T sin marcado estructurado.

5. **Optimizar LCP en home:** quitar `loading="lazy"` del primer logo/hero y añadir `fetchpriority="high"`.

---

## Medium Priority (fix within 1 month)

1. **CSP report-only.** Empezar con report-only para no romper AdSense/GA, identificar dependencias, luego enforcement.
2. **Activar IndexNow** para Bing/Yandex.
3. **`ItemList` schema en home** con los 57 tools.
4. **Limpiar BreadcrumbList del review:** usar `/category/general/` en vez de `/?cat=general`.
5. **Eliminar compares entre tools no relacionados** o aplicar `noindex` a las que no tengan sentido (e.g., `adobe-express-vs-chatpdf`). Reduce index bloat.
6. **Self-host Google Fonts o `font-display: swap`** — reduce blocking en LCP.
7. **CrUX/PSI con credenciales propias** — sustituir lab-only por field data real.

---

## Low Priority (backlog)

1. **Migrar a dominio propio** (`toolbench.com` / `.io`) — el subdominio `netlify.app` limita autoridad y excluye de la lista HSTS preload propia.
2. **Cross-Origin headers** (COOP, CORP) — para isolation moderna.
3. **CSP enforced** una vez recopilados los reports.
4. **HTTP/3 verification** — Netlify lo sirve por defecto, pero confirmar con `curl --http3` u herramienta externa.

---

## Apéndice: comandos de verificación

```bash
# Verificar fix de canonical/slash
curl -sI https://toolbench.netlify.app/compare/chatgpt-vs-claude   # expect 200 (no 301)
curl -sSL https://toolbench.netlify.app/compare/chatgpt-vs-claude/ | grep canonical

# Verificar headers de seguridad
curl -sI https://toolbench.netlify.app/ | grep -iE "(strict-transport|x-frame|x-content|content-security|referrer|permissions)"

# Verificar sitemap
curl -s https://toolbench.netlify.app/sitemap-index.xml
curl -s https://toolbench.netlify.app/sitemap-0.xml | grep -c "<loc>"

# Verificar 404 real (no soft)
curl -sI https://toolbench.netlify.app/this-does-not-exist | head -1
```
