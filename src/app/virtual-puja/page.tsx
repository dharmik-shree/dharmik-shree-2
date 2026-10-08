import { Metadata } from "next";
import VirtualPujaClient from "./VirtualPujaClient";

export const metadata: Metadata = {
  title: "Virtual Puja & E-Puja Seva | Authentic Remote Vedic Rituals by Dharmikshree",
  description:
    "Participate in authentic Vedic E-Pujas and virtual rituals from anywhere in the world. Individual Gotra & Name Sankalp on sacred River Tapi, live streaming, uncut video recordings, and consecrated prasadam delivery.",
  alternates: {
    canonical: "https://www.dharmikshree.org/virtual-puja",
  },
  openGraph: {
    title: "Virtual Puja & E-Puja Seva | Remote Vedic Havans by Dharmikshree",
    description:
      "Scripturally authentic remote pujas conducted by 13th-generation purohits. Individual name chanting, River Tapi sacred waters, and global prasadam delivery.",
    url: "https://www.dharmikshree.org/virtual-puja",
    siteName: "Dharmik Shree",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Puja & E-Puja Seva | Dharmikshree",
    description: "Authentic online E-Puja booking with individual Gotra sankalp and consecrated prasadam dispatch.",
  },
  keywords: [
    "Virtual Puja",
    "E-Puja Online Booking",
    "Online Puja Services India",
    "River Tapi E-Puja Surat",
    "Pitru Shanti Virtual Puja",
    "Remote Vedic Havan",
    "Dharmikshree E-Puja",
    "Online Pandit for Puja",
  ],
};

export default function VirtualPujaPage() {
  return <VirtualPujaClient />;
}
