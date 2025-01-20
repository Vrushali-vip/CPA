import RSSParser from 'rss-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  imageUrl: string | null;
}

interface Enclosure {
  url: string;
  type: string;
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  'content:encoded'?: string;
  enclosures?: Enclosure[];
}

interface RSSFeed {
  items: RSSItem[];
}

const RSS_URL = process.env.RSS_URL;

if (!RSS_URL) {
  throw new Error('RSS_URL is not defined in the environment variables');
}

const fetchSubstackPosts = async (): Promise<SubstackPost[]> => {
  const parser = new RSSParser();
  const feed: RSSFeed = await parser.parseURL(`${RSS_URL}?timestamp=${new Date().getTime()}`) as RSSFeed;

  return feed.items.map((item) => {
    const imageUrl = (() => {
      if (item.enclosures && item.enclosures.length > 0) {
        const enclosures: Enclosure[] = item.enclosures;
        const imageEnclosure = enclosures.find((enclosure) =>
          enclosure.type.startsWith('image/')
        );
        if (imageEnclosure) {
          return imageEnclosure.url;
        }
      }

      if (item['content:encoded']) {
        const content = item['content:encoded'];
        const imageMatch = content.match(/<img[^>]+src="([^"]+)"/);
        if (imageMatch && imageMatch[1]) {
          return imageMatch[1];
        }
      }

      return null;
    })();

    return {
      title: item.title || '',  
      link: item.link || '',  
      pubDate: item.pubDate || '',  
      contentSnippet: item.contentSnippet || '',  
      imageUrl,  
    };
  });
};

export default fetchSubstackPosts;
