"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Sparkles,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe2,
  Flame,
  MessageCircle,
  Hash,
} from "lucide-react";

const NAMING_STEPS = [
  {
    step: "01",
    title: "Founder Natal Chart & Acoustic Harmony",
    description:
      "We calculate the founder's Janma Nakshatra and Ascendant (Lagna) to identify the most auspicious acoustic initial sounds (Aksharas) that align the business with the founder's cosmic wealth houses (2nd & 11th).",
  },
  {
    step: "02",
    title: "Panch Tatva (Five Elements) Industry Balance",
    description:
      "Every industry corresponds to a cosmic element: Tech/Energy is Fire (Agni), Real Estate/Jewelry is Earth (Prithvi), Shipping/Liquids is Water (Jala), Media/Travel is Air (Vayu). The name's phonetic structure must energetically nourish its sector.",
  },
  {
    step: "03",
    title: "Chaldean Numerology Compound Analysis",
    description:
      "Letters are converted into vibrations to calculate the master compound name number. We ensure the compound number produces expansion frequencies (e.g., 1, 5, 6, 9 combinations) while avoiding karmic debt vibrations (such as 4, 8, 16, or 26).",
  },
  {
    step: "04",
    title: "Market Positioning & Phonetic Memorability",
    description:
      "Beyond ancient mathematics, the brand must be easy to pronounce globally, rhythmically pleasing, and modern so it effortlessly sticks in the customer's subconscious mind.",
  },
  {
    step: "05",
    title: "Domain & Trademark Viability Check",
    description:
      "We screen candidate names for .com / .in domain registration feasibility and verify class-specific trademark feasibility before final presentation.",
  },
];

const FAQS = [
  {
    question: "Why should a business name be aligned with numerology and astrology?",
    answer:
      "A business name is chanted millions of times by customers, invoices, and bank accounts. Just like a personal name, it radiates an energetic frequency. When this frequency clashes with the founder's planetary chart or industry element, it creates friction in cash flow and brand recall.",
  },
  {
    question: "What information is needed to start a business naming consultation?",
    answer:
      "We require the primary founder's Date, Time, and Place of Birth, a brief description of the industry and products/services, target audience demographics, and any conceptual preferences (e.g., Sanskrit roots, English modern words, or hybrid words).",
  },
  {
    question: "How many business name options do we receive?",
    answer:
      "You receive 10 carefully researched, highly curated name options complete with elemental breakdown, numerology calculation, meaning, and auspicious registration Muhurats.",
  },
  {
    question: "Can an existing business name be corrected without rebranding?",
    answer:
      "Yes. If a full rebrand is impractical, we frequently optimize the brand's 'Operating Name' or logo spelling by adding or altering a single subtle letter to shift the compound numerological frequency from a debt number to a prosperity number.",
  },
];

export default function BusinessNameSuggestionClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("naming-booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Business Name Suggestion & Numerology Alignment",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Vedic brand naming combining founder Kundali, Panch Tatva (Five Elements), and Chaldean Numerology by Acharya Dharmikshree.",
        url: "https://www.dharmikshree.org/business-name-suggestion",
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vedic Brand Identity & Energy</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Premium Business Name Suggestion & Numerology
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Your business name is your enterprise&apos;s energetic heartbeat. We curate high-impact brand names scientifically aligned with founder astrology, Panch Tatva elements, and prosperity numerology.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Request Brand Name Consultation <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20would%20like%20to%20consult%20regarding%20Business%20Name%20Suggestion%20and%20Numerology."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold" />
                WhatsApp Direct Chat
              </a>
            </div>

            {/* TRUST STRIP */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">10 Options</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Curated per Brand</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">5 Elements</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Panch Tatva Balanced</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Chaldean Math</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Zero Debt Numbers</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Domain Verified</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Practical Viability</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5-STEP METHODOLOGY */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Rigorous Methodology
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                How We Engineer Your Brand&apos;s Energetic Identity
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="space-y-6">
              {NAMING_STEPS.map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-sm bg-brand-ivory/25 border border-brand-gold/20 flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                  <span className="font-serif text-3xl md:text-4xl font-light text-brand-gold shrink-0">
                    {s.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-normal text-brand-charcoal">
                      {s.title}
                    </h3>
                    <p className="text-sm text-brand-charcoal/70 font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="naming-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Commission Your Brand Naming Research
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Submit your founder and venture details. Our research team will review your sector and initiate the Vedic & Numerological naming curation.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="business_naming" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Expert Guidance
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
