import rss from '@astrojs/rss';
import { parseDate } from '../utils';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
  const meetups = await getCollection('meetups');
  const rssItems = meetups.map((meetup) => ({
    title: meetup.data.title,
    link: `${import.meta.env.BASE_URL}meetups/${meetup.slug}`,
    pubDate: new Date(parseDate(meetup)),
  }));
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: rssItems,
  });
}
