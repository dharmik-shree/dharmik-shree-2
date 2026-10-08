import { Metadata } from "next";
import BusinessAstrologyClient from "./BusinessAstrologyClient";

export const metadata: Metadata = {
  title: "Business Astrology & Corporate Mentorship | Acharya Dharmikshree",
  description:
    "Empower your enterprise with 300-year Vedic Business Astrology. Planetary timing for expansion, funding, founder compatibility, and commercial Vastu by Acharya Dharmikshree.",
  alternates: {
    canonical: "https://www.dharmikshree.org/business-astrology",
  },
  openGraph: {
    title: "Business Astrology & Corporate Decision Timing | Dharmikshree",
    description:
      "Strategic Vedic astrology for enterprises, founders, and investors. Optimize cash flow, expansion muhurats, and partner synergy.",
    url: "https://www.dharmikshree.org/business-astrology",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Astrology & Corporate Mentorship | Dharmikshree",
    description: "Enterprise natal chart analysis, partnership compatibility & market expansion timing.",
  },
  keywords: [
    "Business Astrology",
    "Corporate Astrologer India",
    "Astrology for Entrepreneurs",
    "Company Incorporation Muhurat",
    "Business Partner Kundali Matching",
    "Financial Astrology Surat Mumbai",
    "Dharmikshree Business Astrology",
    "Commercial Vastu Alignment",
  ],
};

export default function BusinessAstrologyPage() {
  return <BusinessAstrologyClient />;
}
