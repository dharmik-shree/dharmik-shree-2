import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Sparkles,
  MapPin,
  Flame,
  HeartHandshake,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vedic Services & Sacred Consultations Directory | Dharmikshree",
  description:
    "Explore authentic Vedic astrology, Kundali matching, Vastu Shastra, and sacred puja services guided by 13th-generation spiritual guide Acharya Dharmikshree.",
  alternates: {
    canonical: "https://www.dharmikshree.org/our-services",
  },
};

export default function OurServicesDirectoryPage() {
  const serviceCards = [
    {
      title: "Vedic Astrology & Life Guidance",
      href: "/astrologer-in-surat",
      description: "In-depth birth chart (Janma Kundali) reading, Vimshottari Dasha analysis, career, and wealth timing.",
      badge: "Core Lineage",
    },
    {
      title: "Vedic Puja & Sacred Rituals",
      href: "/puja-ritual-services",
      description: "Pitru Shanti Tarpana on River Tapi, Navagraha Havan, Rudrabhishek, and authentic Purohit rituals.",
      badge: "Sacred Fire",
    },
    {
      title: "Kundali Milan & Relationship Consulting",
      href: "/relationship-consulting",
      description: "Comprehensive 36-gun matching, Manglik dosha remedies, marriage timing, and couple harmony guidance.",
      badge: "Marital Peace",
    },
    {
      title: "Online E-Puja Seva",
      href: "/puja",
      description: "Participate remotely in high-potency community pujas with your Gotra & Name sankalp and prasadam delivery.",
      badge: "Remote Seva",
    },
  ];

  const cityHubs = [
    { name: "Surat, Gujarat", href: "/astrologer-in-surat", note: "Core Vedic Sanctuary & River Tapi Pujas" },
    { name: "Mumbai, Maharashtra", href: "/astrologer-in-mumbai", note: "Corporate Career, Wealth & High-Rise Vastu" },
    { name: "Bangalore, Karnataka", href: "/astrologer-in-bangalore", note: "Tech Founders, Startups & Modern Relationships" },
    { name: "Tumakuru, Karnataka", href: "/our-services/puja-ritual-in-tumakuru", note: "Vedic Puja & Ritual Services" },
    { name: "Aurangabad, Maharashtra", href: "/our-services/consulting-in-aurangabad", note: "Astrology & Vastu Consulting" },
    { name: "Kolkata, West Bengal", href: "/our-services/consulting-in-kolkata", note: "Vedic Life & Career Consulting" },
  ];

  return (
    <div className="bg-brand-ivory text-brand-charcoal min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24">
        {/* HERO */}
        <section className="relative bg-brand-charcoal text-brand-ivory py-20 px-6 md:px-12 border-b border-brand-gold/20 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
              Lineage of Wisdom
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-brand-ivory">
              Our Vedic Services & Sanctuaries
            </h1>
            <p className="text-brand-ivory/80 font-light text-base max-w-2xl mx-auto">
              Choose from our comprehensive range of Vedic consultations, sacred rituals, and localized spiritual guidance.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-16 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Core Domains
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Explore Vedic Offerings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceCards.map((service, idx) => (
                <a
                  key={idx}
                  href={service.href}
                  className="p-8 rounded-sm border border-brand-gold/20 bg-brand-ivory/20 hover:border-brand-gold/60 transition-all duration-300 shadow-sm group block space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-brand-gold/15 text-brand-gold rounded-full">
                      {service.badge}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-brand-charcoal group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 font-light leading-relaxed">
                    {service.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* REGIONAL SANCTUARIES */}
        <section className="py-16 px-6 md:px-12 bg-brand-ivory/50 border-t border-b border-brand-gold/10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                City Sanctuaries & Regional Pages
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Consult in Your City
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cityHubs.map((city, idx) => (
                <a
                  key={idx}
                  href={city.href}
                  className="p-5 bg-white border border-brand-gold/20 rounded-sm hover:border-brand-gold transition-colors group block space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-brand-gold text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{city.name}</span>
                  </div>
                  <p className="text-xs text-brand-charcoal/70 font-light">
                    {city.note}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD CAPTURE */}
        <section className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Connect Directly
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Schedule a Consultation
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="divine_consultation" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
