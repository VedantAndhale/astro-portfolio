import { defineCollection, z } from "astro:content"

const resume = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    card: z.coerce.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    popular: z.boolean().optional().default(false),
    version: z.string().optional().default("1.0.0"),
    lastUpdated: z.coerce.date().optional(),
    ogImage: z.string().optional().default("/open-graph.png"),
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.coerce.string(),
    date: z.coerce.date(),
    pin: z.coerce.string(),
    technology: z.coerce.string(),
    card: z.coerce.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    version: z.string().optional().default("1.0.0"),
    lastUpdated: z.coerce.date().optional(),
    ogImage: z.string().optional().default("/open-graph.png"),
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { resume, blog, projects, legal }
