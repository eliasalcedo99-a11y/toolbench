# ToolBench — Schema Markup Report

**Sitio:** https://toolbench.netlify.app
**Fecha:** 2026-05-12
**Formatos detectados:** JSON-LD únicamente (sin Microdata ni RDFa). ✅ correcto — JSON-LD es la preferencia de Google.

---

## Schema Score: **65 / 100**

| Aspecto                                  | Estado |
|------------------------------------------|--------|
| Formato preferido (JSON-LD)              | ✅     |
| Sintaxis JSON válida                     | ✅     |
| URLs absolutas en `@id`/`url`            | ✅     |
| Schemas correctos para el tipo de página | ⚠️ parcial |
| Schemas inyectados vía JS                | ✅ N/A (todo server-rendered, Astro static) |
| Tipos deprecados                         | ✅ ninguno detectado |
| Tipos restringidos mal aplicados         | ✅ ninguno detectado |
| Cobertura completa (rich result eligibility) | ❌ falta Organization, ItemList, breadcrumbs en compare/blog, AggregateRating, Offer |

---

## Detección por página

| Página              | Tipos JSON-LD encontrados                                                | Bloques |
|---------------------|---------------------------------------------------------------------------|---------|
| `/`                 | `WebSite` (con `SearchAction` + `publisher: Organization` anidada)        | 1       |
| `/category/general` | `CollectionPage`                                                          | 1       |
| `/ai-comparator`    | `CollectionPage`                                                          | 1       |
| `/compare/X-vs-Y/`  | `Article` (`author: Organization`)                                        | 1       |
| `/reviews/X`        | `Review` (con `itemReviewed: SoftwareApplication`) + `BreadcrumbList`     | 2       |
| `/blog/X`           | `Article` (`author: Person`)                                              | 1       |
| `/methodology`      | _(ninguno)_                                                               | 0 ❌    |
| `robots.txt`        | N/A                                                                       | —       |

### Validación detallada

#### `/` — WebSite ✅ válido
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToolBench",
  "url": "https://toolbench.netlify.app",
  "description": "...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://toolbench.netlify.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": { "@type": "Organization", "name": "ToolBench", "slogan": "..." }
}
```
- ✅ `@context`, `@type`, `name`, `url`, `potentialAction` presentes.
- ⚠️ El `publisher: Organization` anidado no tiene `logo` ni `sameAs` — Google prefiere un bloque `Organization` standalone.
- ⚠️ `SearchAction.target` apunta a `/?q=...` — verificar que la página de resultados realmente exista. Hoy `/?q=test` devuelve 200 pero parece servir el mismo HTML que `/` (sin filtrar). Si el search es client-side, esto está OK porque la URL no cambia el HTML, pero Google espera que `{search_term_string}` realmente filtre resultados.

#### `/compare/X-vs-Y/` — Article ⚠️ válido pero incompleto
```json
{
  "@type": "Article",
  "headline": "ChatGPT vs Claude: Which is Better in 2026?",
  "description": "...",
  "author": { "@type": "Organization", "name": "ToolBench" },
  "publisher": { "@type": "Organization", "name": "ToolBench" },
  "datePublished": "2026-05-06",
  "dateModified": "2026-05-06"
}
```
- ✅ Propiedades requeridas presentes (`headline`, `author`, `publisher`, `datePublished`).
- ❌ Falta `image` → **no elegible** para rich result de Article.
- ❌ Falta `mainEntityOfPage`.
- ⚠️ `author: Organization` (no `Person`) — Google acepta ambos pero pierde señal de autor humano (E-E-A-T).
- ⚠️ El tipo de página NO es estrictamente un artículo editorial; es una "comparativa de productos". Considerar enriquecer con `ItemList` de los dos `SoftwareApplication` comparados (no reemplaza, complementa).

#### `/reviews/X` — Review + BreadcrumbList ✅ válidos
```json
{
  "@type": "Review",
  "itemReviewed": { "@type": "SoftwareApplication", "name": "ChatGPT", "applicationCategory": "BusinessApplication", "operatingSystem": "Web" },
  "reviewRating": { "@type": "Rating", "ratingValue": "4.7", "bestRating": "5" },
  "author": { "@type": "Organization", "name": "ToolBench" },
  "datePublished": "2026-05-06",
  "reviewBody": "..."
}
```
- ✅ Estructura correcta para `Review`.
- ✅ `BreadcrumbList` separado, válido.
- ❌ Falta `image` en `itemReviewed`.
- ❌ Falta `offers` con precio estructurado (hoy el precio aparece solo en texto: "Free – $200/mo").
- ❌ Falta `aggregateRating` (rating agregado, no solo el rating del review).
- ⚠️ `author: Organization` (cuando es review editorial de un equipo, usar `Person` con bio).
- ⚠️ El `BreadcrumbList` apunta a `/?cat=general` (query) en vez de `/category/general/` (URL limpia que sí existe).

#### `/blog/X` — Article ✅ mejor que compare
```json
{
  "@type": "Article",
  "headline": "ChatGPT vs Claude in 2026: The Ultimate Technical Comparison",
  "author": { "@type": "Person", "name": "Elias", "affiliation": "ToolBench" },
  "publisher": { "@type": "Organization", "name": "ToolBench" },
  "datePublished": "2026-05-06",
  "dateModified": "2026-05-06"
}
```
- ✅ `author: Person` (mejor para E-E-A-T).
- ❌ Falta `image`, `mainEntityOfPage`.
- ⚠️ Tipo `Article` está bien; alternativa `BlogPosting` es subtipo más específico y elegible para los mismos rich results.

#### `/methodology` — ❌ SIN schema
La página describe los 3 stages de testing (Sandbox / Stress / Workflow), criterios de scoring, datos de fuentes. Es una pillar page de E-E-A-T sin marcado. Recomendado: `AboutPage` (encapsulando un `Article`).

#### `/category/general` y `/ai-comparator` — CollectionPage ✅ válido pero pobre
```json
{ "@type": "CollectionPage", ... }
```
- ✅ Tipo correcto para una landing de listado.
- ❌ Falta `mainEntity: ItemList` con los items de la colección (los tools listados).

---

## Tipos restringidos o deprecados — verificación

| Tipo            | Estado (Feb 2026)                    | ¿Detectado en ToolBench? | Acción |
|-----------------|--------------------------------------|---------------------------|--------|
| `HowTo`         | DEPRECADO (rich results retirados Sept 2023) | No                        | — |
| `FAQPage`       | RESTRINGIDO a sitios gobierno/salud (Aug 2023) | No                        | **No agregar**. Mi recomendación previa en FULL-AUDIT-REPORT y ACTION-PLAN era incorrecta — corrige abajo. |
| `SpecialAnnouncement` | DEPRECADO (Jul 2025)            | No                        | — |
| `CourseInfo`, `EstimatedSalary`, `LearningVideo` | RETIRADOS (Jun 2025) | No | — |
| `ClaimReview`   | RETIRADO de rich results (Jun 2025)  | No                        | — |
| `Dataset`       | RETIRADO de rich results (fines 2025) | No                       | — |

### Corrección a recomendaciones previas
- **FULL-AUDIT-REPORT.md §4 y ACTION-PLAN.md H5** sugirieron añadir `FAQPage` en compare pages. **Corrijo:** Google restringió `FAQPage` rich results a sitios de gobierno y salud desde agosto 2023; un sitio publisher como ToolBench **no obtendrá rich result** para FAQPage. Sigue siendo útil para:
  - LLMs y AI search (Perplexity/Bing Chat aún lo procesan).
  - Estructura de datos interna (machine-readable).
  - Bing/Yandex que no aplican la misma restricción.

  Pero NO debe esperarse el "FAQ rich result" en Google. Si se implementa, hacerlo con esa expectativa.

---

## Schemas faltantes — oportunidades

Por orden de impacto en rich results de Google:

1. **`Organization`** standalone con `logo` + `sameAs` → señal de identidad / Knowledge Graph eligibility.
2. **`BreadcrumbList`** en `/compare/*` y `/blog/*` (hoy solo en review) → breadcrumbs en SERP.
3. **`ItemList`** en home + `/category/*` + `/ai-comparator` → carousel rich result.
4. **`SoftwareApplication.offers` + `aggregateRating`** en `/reviews/*` → snippet con precio + estrellas.
5. **`BlogPosting`** (subtipo de Article) en `/blog/*` → mismo rich result, mejor especificidad.
6. **`AboutPage`** envolviendo Article en `/methodology` → señal de transparencia.

---

## Generated schemas

Snippets listos para copiar/pegar en `generated-schema.json` (ver archivo aparte en este directorio).
