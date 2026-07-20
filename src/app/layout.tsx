import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
    default: "Dharmik Shree | Spiritual Mentor & Vedic Guide",
    template: "%s | Dharmik Shree",
  },
  description:
    "Enter the digital sanctuary of Dharmik Shree. A revered Spiritual Mentor, Vedic Guide, and Teacher offering timeless wisdom, Vastu guidance, and astrological clarity for leaders, families, and entrepreneurs.",
  keywords: [
    "Spiritual Mentor",
    "Vedic Guidance",
    "Astrology Consultation",
    "Vastu Expert",
    "Spiritual Teacher",
    "Ancient Indian Wisdom",
    "Life Guidance",
    "Vedic Mentor",
    "Dharmik Shree",
  ],
  authors: [{ name: "Dharmik Shree" }],
  openGraph: {
    title: "Dharmik Shree | Spiritual Mentor & Vedic Guide",
    description:
      "Timeless Vedic wisdom and spiritual guidance for modern lives. Explore consultations, mentorship, and sacred teachings.",
    url: "https://www.dharmikshree.org",
    siteName: "Dharmik Shree",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharmik Shree | Spiritual Mentor & Vedic Guide",
    description: "Timeless Vedic wisdom and spiritual mentorship.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    </html>
  );
}
