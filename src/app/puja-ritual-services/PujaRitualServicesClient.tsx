"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Flame,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MapPin,
  Calendar,
  Waves,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";

const PUJA_CATEGORIES = [
  {
    title: "Pitru Shanti & Holy Tarpana",
    location: "Sacred Banks of River Tapi, Surat",
    description:
      "Dissolve ancestral debt, Pitru Dosh, and bring generational peace through authenticated Pind Daan and Vedic Tarpana rituals along the divine Suryaputri Tapi river.",
    benefits: ["Peace for departed ancestors", "Removes marital and childbirth obstacles", "Brings family harmony and prosperity"],
    recommendedFor: "Pitru Paksha, Amavasya, Shraddha",
  },
  {
    title: "Navagraha Shanti & Dosh Nivaran Havan",
    location: "Vedic Yagya Mandap",
    description:
      "Pacify malefic planetary influences including Saturn Sade Sati, Rahu Mahadasha, and Manglik Dosh with individualized herbal samagri ahutis and Vedic chanting.",
    benefits: ["Soothes mental anxiety & recurring losses", "Balances karmic planetary vibrations", "Protects against evil eye & negative energies"],
    recommendedFor: "Planetary Transits & Dasha Changes",
  },
  {
    title: "Maha Mrityunjaya & Rudrabhishek",
    location: "Shiva Sthalam",
    description:
      "Powerful Shiva anushthan invoking longevity, supreme health, and divine protection from severe health ailments and sudden calamities through continuous Vedic Rudri chanting.",
    benefits: ["Restores vitality and longevity", "Protection during critical surgeries or chronic illness", "Supreme inner fearlessness and peace"],
    recommendedFor: "Maha Shivratri, Masik Shivratri, Mondays",
  },
  {
    title: "Griha Pravesh & Vastu Shanti Anushthan",
    location: "At Your Residence or Commercial Premise",
    description:
      "Purify living spaces, neutralize directional Vastu blemishes, and establish positive cosmic energy before occupying new homes, corporate offices, or factories.",
    benefits: ["Purifies Bhoomi and directional forces", "Attracts positive Pranic energy and prosperity", "Wards off negative residual impressions"],
    recommendedFor: "New House Warming & Business Inceptions",
  },
];

const FAQS = [
  {
    question: "Can I participate in Vedic Pujas remotely (E-Puja)?",
    answer:
      "Yes. Acharya Dharmikshree facilitates authentic remote E-Pujas where your name, gotra, nakshatra, and sankalp are recited directly by Vedic purohits. You receive uncut video recordings and sanctified prasadam delivered to your doorstep.",
  },
  {
    question: "Why is River Tapi in Surat auspicious for Pitru Shanti?",
    answer:
      "According to the Skanda Purana, River Tapi is the daughter of Surya (Sun God) and sister of Yama (Lord of Dharma and Ancestors). Performing Tarpana and Pitru rituals on Tapi's sacred banks bestows supreme liberation (Moksha) upon ancestors.",
  },
  {
    question: "What samagri (ingredients) are used in your Vedic havans?",
    answer:
      "We strictly utilize 100% pure Desi Cow Ghee (A2), sacred dried medicinal herbs, genuine guggul, samidha woods (Palash, Peepal, Mango), and fresh flowers according to scripture.",
  },
  {
    question: "How do I book a private family puja or corporate anushthan?",
    answer:
      "You can submit the booking form below specifying 'Special Puja & Vedic Anushthan' or chat with our sanctuary coordinator on WhatsApp. We will analyze your birth charts to select the most auspicious Muhurat.",
  },
];

export default function PujaRitualServicesClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("puja-booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Vedic Puja & Ritual Services",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Authentic Vedic puja, havan, and anushthan conducted by 13th-generation purohits with personalized sankalp and sacred holy river rituals.",
        url: "https://www.dharmikshree.org/puja-ritual-services",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-brand-ivory text-brand-charcoal min-h-screen flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 pt-24">
        {/* HERO */}
        <section className="relative bg-brand-charcoal text-brand-ivory py-20 md:py-28 px-6 md:px-12 overflow-hidden border-b border-brand-gold/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-[0.25em] font-medium animate-fade-in">
              <Flame className="w-3.5 h-3.5 text-brand-gold" />
              <span>Sacred Vedic Seva & Anushthan</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Authentic Vedic Puja & Ritual Services
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Conducted by 13th-generation Vedic purohits with strict scriptural fidelity, personalized family sankalp, and sacred holy river rituals on the banks of River Tapi.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Request Custom Puja <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/puja"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Upcoming Community Pujas
              </a>
            </div>

            {/* TRUST BAR */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">100% Vedic</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Scriptural Mantras</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Individual</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Name & Gotra Sankalp</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Holy River</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Tapi & Kashi Tirth</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Prasadam</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Blessed Delivery</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 SACRED PILLARS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Sacred Sanctity
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                How Dharmikshree Pujas Are Conducted
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-brand-ivory/30 border border-brand-gold/20 rounded-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-serif text-lg font-bold">
                  1
                </div>
                <h3 className="font-serif text-xl font-medium text-brand-charcoal">
                  Precise Muhurat Selection
                </h3>
                <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                  Every ritual begins with planetary timing analysis. We pinpoint the exact Tithi, Nakshatra, and Lagna to maximize spiritual potency.
                </p>
              </div>

              <div className="p-6 bg-brand-ivory/30 border border-brand-gold/20 rounded-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-serif text-lg font-bold">
                  2
                </div>
                <h3 className="font-serif text-xl font-medium text-brand-charcoal">
                  Individual Vedic Sankalp
                </h3>
                <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                  Your Gotra, Janma Nakshatra, and specific intentions are individually chanted before the sacred fire, linking cosmic grace to your family.
                </p>
              </div>

              <div className="p-6 bg-brand-ivory/30 border border-brand-gold/20 rounded-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-serif text-lg font-bold">
                  3
                </div>
                <h3 className="font-serif text-xl font-medium text-brand-charcoal">
                  Pure A2 Ghee & Herbal Samagri
                </h3>
                <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                  Zero chemical or commercial shortcuts. Only 100% sacred A2 Cow Ghee, wild Himalayan herbs, and authenticated woods are offered to Agni Dev.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAJOR RITUAL CATEGORIES */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-brand-ivory/40 border-t border-b border-brand-gold/10">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Sacred Offerings
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Key Vedic Pujas & Anushthans
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PUJA_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-sm border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-brand-gold/10 pb-3">
                    <span className="text-xs uppercase tracking-widest text-brand-gold font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {cat.location}
                    </span>
                    <span className="text-[11px] text-brand-charcoal/60 bg-brand-ivory px-2.5 py-0.5 rounded-full">
                      {cat.recommendedFor}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-brand-charcoal">
                    {cat.title}
                  </h3>

                  <p className="text-brand-charcoal/70 text-sm leading-relaxed font-light">
                    {cat.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider">
                      Spiritual Blessings:
                    </p>
                    {cat.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-brand-charcoal/70 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={scrollToBooking}
                      className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Book This Puja <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E-PUJA PROMOTION BANNER */}
        <section className="py-12 px-6 md:px-12 bg-brand-charcoal text-brand-ivory">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">
                Participate from Anywhere Worldwide
              </span>
              <h3 className="font-serif text-2xl font-light text-brand-ivory">
                Explore Active Upcoming Community E-Pujas
              </h3>
              <p className="text-xs text-brand-ivory/70 font-light max-w-xl">
                Join sacred mass anushthans with thousands of devotees. Includes sankalp recitation and sanctified prasadam dispatch to your address.
              </p>
            </div>
            <a
              href="/puja"
              className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shrink-0"
            >
              Browse E-Pujas &rarr;
            </a>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="puja-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Enquire for Personal or Family Puja
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Submit your requirements below. Our Vedic purohit team will reach out via WhatsApp to finalize your Sankalp details and auspicious date.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="mahapuja_booking" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Puja Seva Clarifications
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-brand-gold/20 rounded-sm overflow-hidden bg-brand-ivory/20"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-brand-gold/5 transition-colors cursor-pointer"
                    >
                      <span className="font-serif text-lg font-medium text-brand-charcoal">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-brand-gold shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-brand-charcoal/50 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-sm text-brand-charcoal/80 font-light leading-relaxed border-t border-brand-gold/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
