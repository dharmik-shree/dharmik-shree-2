import { Metadata } from "next";
import BusinessNameSuggestionClient from "./BusinessNameSuggestionClient";

export const metadata: Metadata = {
  title: "Business Name Suggestion & Numerology | Vedic Brand Alignment",
  description:
    "Align your brand with success. Premium business name suggestions using Vedic Astrology, Panch Tatva (Five Elements), and Chaldean Numerology by Acharya Dharmikshree.",
  alternates: {
    canonical: "https://www.dharmikshree.org/business-name-suggestion",
  },
  openGraph: {
    title: "Business Name Suggestion & Numerology | Dharmikshree",
    description:
      "Vedic brand naming methodology. Align founder Nakshatra, industry Panch Tatva, and master numerological compound numbers for enterprise prosperity.",
    url: "https://www.dharmikshree.org/business-name-suggestion",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Name Suggestion & Numerology | Dharmikshree",
    description: "10 researched brand names aligned through Vedic Astrology, Numerology & Panch Tatva.",
  },
  keywords: [
    "Business Name Suggestion",
    "Company Name Numerology",
    "Astrological Business Name Selection",
    "Vedic Brand Naming",
    "Lucky Business Name Calculator",
    "Startup Name Numerology",
    "Dharmikshree Business Name Consultation",
  ],
};

export default function BusinessNameSuggestionPage() {
  return <BusinessNameSuggestionClient />;
}
