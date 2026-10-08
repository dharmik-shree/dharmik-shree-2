import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicitly allow and prioritize AI search engines and LLM crawlers
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'PerplexityBot',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.dharmikshree.org/sitemap.xml',
  };
}
