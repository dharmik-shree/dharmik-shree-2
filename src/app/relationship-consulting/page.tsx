import { Metadata } from "next";
import RelationshipConsultingClient from "./RelationshipConsultingClient";

export const metadata: Metadata = {
  title: "Relationship & Marriage Astrology Consulting | Kundali Milan by Dharmikshree",
  description:
    "Discover authentic Vedic relationship consulting, Kundali matching (Gun Milan), Manglik dosh remedies, and marital harmony guidance by 13th-generation astrologer Acharya Dharmikshree.",
  alternates: {
    canonical: "https://www.dharmikshree.org/relationship-consulting",
  },
  openGraph: {
    title: "Relationship & Marriage Astrology Consulting | Dharmikshree",
    description:
      "Align hearts and destinies through 300-year Vedic wisdom. Complete 36-gun matching, emotional compatibility, and non-superstitious remedies.",
    url: "https://www.dharmikshree.org/relationship-consulting",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relationship & Marriage Astrology | Dharmikshree",
    description: "Authentic Kundali matching & marriage delay guidance by Acharya Dharmikshree.",
  },
  keywords: [
    "Relationship Consulting Astrology",
    "Kundali Milan",
    "Horoscope Matching for Marriage",
    "Manglik Dosh Remedies",
    "Marriage Delay Remedies Astrology",
    "Nadi Dosh Nivaran",
    "Marital Discord Astrology",
    "Best Marriage Astrologer",
  ],
};

export default function RelationshipConsultingPage() {
  return <RelationshipConsultingClient />;
}
