import type { NextConfig } from "next";

import { resolve } from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // Common navigation & anchor redirects
      {
        source: '/services',
        destination: '/#services',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/journey',
        destination: '/#journey',
        permanent: true,
      },
      {
        source: '/philosophy',
        destination: '/#philosophy',
        permanent: true,
      },
      {
        source: '/journal',
        destination: '/#journal',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#journey',
        permanent: true,
      },
      {
        source: '/consultation',
        destination: '/#journey',
        permanent: true,
      },
      {
        source: '/booking',
        destination: '/#journey',
        permanent: true,
      },
      {
        source: '/book',
        destination: '/#journey',
        permanent: true,
      },
      // Puja module aliases & plurals
      {
        source: '/pujas',
        destination: '/puja',
        permanent: true,
      },
      {
        source: '/pujas/:slug',
        destination: '/puja/:slug',
        permanent: true,
      },
      {
        source: '/epuja',
        destination: '/puja',
        permanent: true,
      },
      {
        source: '/e-puja',
        destination: '/puja',
        permanent: true,
      },
      {
        source: '/epujas',
        destination: '/puja',
        permanent: true,
      },
      {
        source: '/e-pujas',
        destination: '/puja',
        permanent: true,
      },
      {
        source: '/puja/sarva-pitru-shanti-puja-gaya',
        destination: '/puja/sarva-pitru-shanti-puja-surat',
        permanent: true,
      },
      {
        source: '/puja/sarva-pitru-shanti-puja-surat-2yt7',
        destination: '/puja/sarva-pitru-shanti-puja-surat',
        permanent: true,
      },
      // Virtual Puja & E-Puja aliases
      {
        source: '/vertual-puja',
        destination: '/virtual-puja',
        permanent: true,
      },
      {
        source: '/virtual-pujas',
        destination: '/virtual-puja',
        permanent: true,
      },
      // Business Name & Baby Name aliases
      {
        source: '/business-name',
        destination: '/business-name-suggestion',
        permanent: true,
      },
      {
        source: '/business-naming',
        destination: '/business-name-suggestion',
        permanent: true,
      },
      {
        source: '/baby-name',
        destination: '/baby-name-suggestions',
        permanent: true,
      },
      {
        source: '/baby-names',
        destination: '/baby-name-suggestions',
        permanent: true,
      },
      {
        source: '/baby-name-suggestion',
        destination: '/baby-name-suggestions',
        permanent: true,
      },
      // Family Consulting aliases
      {
        source: '/family-consulting',
        destination: '/life-and-family-consulting',
        permanent: true,
      },
      {
        source: '/life-family-consulting',
        destination: '/life-and-family-consulting',
        permanent: true,
      },
      // Kundali & Tools aliases
      {
        source: '/kundali',
        destination: '/tools/kundali',
        permanent: true,
      },
      {
        source: '/free-kundali',
        destination: '/tools/kundali',
        permanent: true,
      },
      {
        source: '/kundali-matching',
        destination: '/tools',
        permanent: true,
      },
      // Blog aliases
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // WordPress legacy dated archive redirects (e.g. /2025/07/31)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
