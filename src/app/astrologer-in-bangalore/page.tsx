import { Metadata } from "next";
import { CITY_PILLARS } from "@/data/cityPillars";
import CityAstrologerPillarPage from "@/components/seo/CityAstrologerPillarPage";

const cityData = CITY_PILLARS.bangalore;

export const metadata: Metadata = {
  title: cityData.pageTitle,
  description: cityData.metaDescription,
  alternates: {
    canonical: `https://www.dharmikshree.org/${cityData.slug}`,
  },
  openGraph: {
    title: cityData.pageTitle,
    description: cityData.metaDescription,
    url: `https://www.dharmikshree.org/${cityData.slug}`,
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: cityData.pageTitle,
    description: cityData.metaDescription,
  },
  keywords: [
    "Best Vedic Astrologer in Bangalore",
    "Famous Astrologer Bangalore Koramangala",
    "Startup Astrologer Bengaluru",
    "Tech Career Astrology Bangalore",
    "Kundali Milan Bangalore",
    "Vastu Consultant Bangalore",
    "Dharmikshree Bangalore",
  ],
};

export default function AstrologerInBangalorePage() {
  return <CityAstrologerPillarPage data={cityData} />;
}
