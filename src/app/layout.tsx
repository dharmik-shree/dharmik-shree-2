import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dharmikshree | Astrologer, Vastu Consultant & Spiritual Guide",
    template: "%s | Dharmikshree",
  },
  description:
    "Dharmikshree is a 13th-generation Vedic Astrologer, Vastu Consultant, and Spiritual Guide, carrying forward a family legacy of more than 300 years of ancient wisdom and spiritual practice.",
  keywords: [
    "Astrologer",
    "Spiritual Guide",
    "Vastu Consultant",
    "Vedic Astrology",
    "Vastu Shastra",
    "Astrology Consultation",
    "Dharmikshree",
    "Dharmik Shree",
  ],
  authors: [{ name: "Dharmikshree" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Dharmikshree | Astrologer, Vastu Consultant & Spiritual Guide",
    description:
      "Dharmikshree is a 13th-generation Vedic Astrologer, Vastu Consultant, and Spiritual Guide, carrying forward a family legacy of more than 300 years of ancient wisdom.",
    url: "https://www.dharmikshree.org",
    siteName: "Dharmik Shree",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharmikshree | Astrologer, Vastu Consultant & Spiritual Guide",
    description: "13th-generation Vedic Astrologer, Vastu Consultant, and Spiritual Guide.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "facebook-domain-verification": "e9rlhqwqnrkmi8ztvy450e326ctrgp",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-HQ6T5KPYNV";

  const globalEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.dharmikshree.org/#organization",
        name: "Dharmik Shree",
        url: "https://www.dharmikshree.org",
        logo: "https://www.dharmikshree.org/icon-512.png",
        founder: {
          "@type": "Person",
          "@id": "https://www.dharmikshree.org/#person",
        },
        sameAs: [
          "https://www.instagram.com/astrologer_dharmikshree",
          "https://www.youtube.com/@astrodharmikshreeguruji8646",
          "https://www.linkedin.com/in/astrologer-dharmikshree-jani",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+919173008182",
          contactType: "customer service",
          areaServed: ["IN", "US", "GB", "AE", "CA", "AU"],
          availableLanguage: ["en", "hi", "gu"],
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.dharmikshree.org/#person",
        name: "Acharya Dharmikshree",
        alternateName: ["Dharmik Shree", "Dharmikshree Jani"],
        jobTitle: "13th-Generation Vedic Astrologer & Vastu Consultant",
        description:
          "Carrying forward an unbroken 300+ year family lineage of Vedic astrology, business astrology, Vastu Shastra, and sacred rituals.",
        url: "https://www.dharmikshree.org",
        knowsAbout: [
          "Vedic Astrology",
          "Business Astrology",
          "Business Name Suggestion and Numerology",
          "Baby Name Suggestions (Vedic Namkaran Sanskar)",
          "Baby Birth Date and Time Selection (Shubh Muhurat)",
          "Vastu Shastra and Space Energy Alignment",
          "Life and Family Consulting",
          "Virtual Puja and E-Puja (River Tapi Surat, Kashi, Trimbakeshwar)",
          "Kundali Milan and Gun Matching",
          "Pitru Shanti Tarpana and Pind Daan",
        ],
        sameAs: [
          "https://www.instagram.com/astrologer_dharmikshree",
          "https://www.youtube.com/@astrodharmikshreeguruji8646",
          "https://www.linkedin.com/in/astrologer-dharmikshree-jani",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalEntitySchema) }}
        />
      </head>
      <body
        className="bg-brand-ivory text-brand-charcoal font-sans antialiased min-h-screen flex flex-col selection:bg-brand-gold/20"
        suppressHydrationWarning
      >
        {children}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
