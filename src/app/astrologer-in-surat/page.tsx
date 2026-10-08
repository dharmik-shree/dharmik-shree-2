import { Metadata } from "next";
import { CITY_PILLARS } from "@/data/cityPillars";
import CityAstrologerPillarPage from "@/components/seo/CityAstrologerPillarPage";

const cityData = CITY_PILLARS.surat;

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
    "Best Astrologer in Surat",
    "Famous Astrologer Surat",
    "Vedic Astrologer in Surat Vesu",
    "Vastu Consultant Surat",
    "Kundali Milan Surat",
    "Tapi River Pitru Shanti Surat",
    "Dharmikshree Surat",
    "Diamond Business Astrology Surat",
    "Textile Business Astrology Surat",
  ],
};

export default function AstrologerInSuratPage() {
  return <CityAstrologerPillarPage data={cityData} />;
}
