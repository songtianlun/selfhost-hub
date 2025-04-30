import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.object({
      category: z.string(),
      items: z.array(z.string())
    })),
    features: z.array(z.string()),
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    license: z.string().optional()
  })
});

export const collections = {
  'services': servicesCollection
}; 