import { defineCollection, z } from 'astro:content';

const meetups = defineCollection({
  type: 'content',
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
    image: z.string().optional(),
  }),
});

export const collections = { meetups };

export const getMeetupsCollectionName = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use a production collection name in production
    return 'meetups';
  } else return 'testmeetups';
}
