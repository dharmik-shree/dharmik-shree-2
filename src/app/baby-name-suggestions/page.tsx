import { Metadata } from "next";
import BabyNameSuggestionsClient from "./BabyNameSuggestionsClient";

export const metadata: Metadata = {
  title: "Vedic Baby Name Suggestions (Namkaran Sanskar) | Acharya Dharmikshree",
  description:
    "Gift your child a sacred lifetime vibration. Personalized Vedic baby name suggestions based on Janma Nakshatra Pada, Sanskrit roots, and Numerology by Acharya Dharmikshree.",
  alternates: {
    canonical: "https://www.dharmikshree.org/baby-name-suggestions",
  },
  openGraph: {
    title: "Vedic Baby Name Suggestions (Namkaran Sanskar) | Dharmikshree",
    description:
      "10 deeply researched baby name options combining exact birth star syllables (Nakshatra Aksharas), modern sound, and Sanskrit meaning.",
    url: "https://www.dharmikshree.org/baby-name-suggestions",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Baby Name Suggestions | Dharmikshree",
    description: "Sanskrit-rooted, modern & meaningful baby names aligned with Nakshatra & Numerology.",
  },
  keywords: [
    "Baby Name Suggestions Astrology",
    "Vedic Baby Names by Nakshatra",
    "Namkaran Sanskar Baby Naming",
    "Baby Name by Date of Birth and Time",
    "Modern Sanskrit Baby Names",
    "Lucky Baby Name Numerology",
    "Dharmikshree Baby Names",
  ],
};

export default function BabyNameSuggestionsPage() {
  return <BabyNameSuggestionsClient />;
}
