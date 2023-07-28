import { defineCollection, z } from 'astro:content';

const meetups = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    // Transform string to Date object
    time: z.string(),
    location: z.string(),
    locationLink: z.string().optional(),
    organizer: z.string(),
    organizerLink: z.string().optional(),
    meetupLink: z.string(),
  }),
});

export const collections = { meetups };