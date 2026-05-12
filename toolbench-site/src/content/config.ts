import { defineCollection, z } from 'astro:content';

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['general', 'code', 'writing', 'image', 'video', 'audio', 'search', 'music', 'design', 'business', 'productivity', 'marketing', 'finance', 'support', 'hr', 'analytics']),
    icon: z.string(),
    iconBg: z.string(),
    iconColor: z.string(),
    badge: z.enum(['top', 'new', 'free']).optional(),
    rating: z.number().min(0).max(5),
    priceLabel: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
    verdict: z.string(),
    pros: z.array(z.string()).min(1),
    cons: z.array(z.string()).min(1),
    pricing: z
      .array(
        z.object({
          name: z.string(),
          price: z.string(),
          summary: z.string(),
          featured: z.boolean().default(false),
          features: z.array(z.string()).default([]),
          notIncluded: z.array(z.string()).default([]),
        })
      )
      .min(1),
    personas: z
      .array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
        })
      )
      .default([]),
    relatedComparisons: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string(),
        })
      )
      .default([]),
    websiteUrl: z.string().optional(),
    scores: z.object({
      price: z.number().min(0).max(100),
      ease: z.number().min(0).max(100),
      quality: z.number().min(0).max(100),
      integrations: z.number().min(0).max(100),
      support: z.number().min(0).max(100),
    }),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
  }),
});

const comparisons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    toolA: z.string(),
    toolB: z.string(),
    noindex: z.boolean().optional(),
    verdict: z.string(),
    features: z
      .array(
        z.object({
          label: z.string(),
          a: z.string(),
          b: z.string(),
          aType: z.enum(['yes', 'no', 'value']).default('value'),
          bType: z.enum(['yes', 'no', 'value']).default('value'),
        })
      )
      .min(1),
    recommendations: z
      .array(
        z.object({
          for: z.string(),
          pick: z.string(),
          reason: z.string(),
        })
      )
      .default([]),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      initials: z.string(),
    }),
    readTime: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { tools, comparisons, blog };
