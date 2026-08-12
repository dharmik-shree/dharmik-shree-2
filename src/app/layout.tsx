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

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
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
