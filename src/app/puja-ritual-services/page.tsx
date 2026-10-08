import { Metadata } from "next";
import PujaRitualServicesClient from "./PujaRitualServicesClient";

export const metadata: Metadata = {
  title: "Vedic Puja & Ritual Services | Sacred Havan, Anushthan & Holy River Seva",
  description:
    "Experience authentic Vedic puja, havan, and anushthan conducted by 13th-generation purohits. Specialized in Pitru Shanti on River Tapi, Navagraha Havan, Kaal Sarp Dosh, and personalized family rituals.",
  alternates: {
    canonical: "https://www.dharmikshree.org/puja-ritual-services",
  },
  openGraph: {
    title: "Vedic Puja & Ritual Services | Sacred Havan & Anushthan",
    description:
      "Authentic Vedic rituals guided by Acharya Dharmikshree. Sacred holy river sankalp, personalized purohit chanting, and blessed prasadam dispatch.",
    url: "https://www.dharmikshree.org/puja-ritual-services",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Puja & Ritual Services | Dharmikshree",
    description: "Authentic Vedic rituals and holy havan services by 13th-gen Vedic lineage.",
  },
  keywords: [
    "Puja Ritual Services",
    "Vedic Puja Services",
    "Book Pandit for Puja",
    "Pitru Shanti Puja Surat Tapi",
    "Navagraha Havan",
    "Rudrabhishek Mahamrityunjaya",
    "Kaal Sarp Dosh Nivaran",
    "Vastu Shanti Puja",
    "Online Puja Booking India",
  ],
};

export default function PujaRitualServicesPage() {
  return <PujaRitualServicesClient />;
}
