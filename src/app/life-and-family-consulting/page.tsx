import { Metadata } from "next";
import LifeAndFamilyConsultingClient from "./LifeAndFamilyConsultingClient";

export const metadata: Metadata = {
  title: "Life & Family Consulting (Mentorship) | Acharya Dharmikshree",
  description:
    "Restore peace, understanding, and generational harmony. Comprehensive Vedic life guidance, family business mentorship, and relationship healing by Acharya Dharmikshree.",
  alternates: {
    canonical: "https://www.dharmikshree.org/life-and-family-consulting",
  },
  openGraph: {
    title: "Life & Family Consulting | Acharya Dharmikshree",
    description:
      "Vedic mentorship for families, multi-generational businesses, and conscious individuals. Resolve planetary friction and build enduring family unity.",
    url: "https://www.dharmikshree.org/life-and-family-consulting",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life & Family Consulting | Dharmikshree",
    description: "Holistic Vedic family guidance, marriage harmony & generational mentorship.",
  },
  keywords: [
    "Family Astrology Consultation",
    "Life and Family Consulting",
    "Generational Family Business Mentorship",
    "Family Harmony Astrology",
    "Parent Child Relationship Astrology",
    "Marital Peace Astrological Guidance",
    "Dharmikshree Family Mentorship",
  ],
};

export default function LifeAndFamilyConsultingPage() {
  return <LifeAndFamilyConsultingClient />;
}
