import { Metadata } from "next";
import { CITY_PILLARS } from "@/data/cityPillars";
import CityAstrologerPillarPage from "@/components/seo/CityAstrologerPillarPage";

const cityData = CITY_PILLARS.mumbai;

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
    "Best Astrologer in Mumbai",
    "Famous Astrologer Mumbai",
    "Top Vedic Astrologer Mumbai Bandra",
    "Vastu Consultant Mumbai High Rise",
    "Kundali Matching Mumbai",
    "Career Astrologer Mumbai",
    "Dharmikshree Mumbai",
  ],
};

export default function AstrologerInMumbaiPage() {
  return <CityAstrologerPillarPage data={cityData} />;
}
