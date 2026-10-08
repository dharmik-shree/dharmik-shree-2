"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Sparkles,
  Heart,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Star,
  BookOpen,
  Calendar,
  MessageCircle,
} from "lucide-react";

const NAMING_VALUES = [
  {
    title: "1. Janma Nakshatra Pada Syllables",
    description:
      "At the exact second of birth, the Moon occupies one of 108 sacred quarters (Padas) across the 27 Nakshatras. This reveals the child's primal phonetic sound (Nama Akshara), activating inner neurological calm.",
  },
  {
    title: "2. Deep Sanskrit Root & Noble Meaning",
    description:
      "A name is a seed of destiny. Every suggested name is rooted in classical Sanskrit, carrying noble connotations of wisdom (Prajna), courage (Veerya), grace (Kripa), or devotion (Bhakti).",
  },
  {
    title: "3. Modern Global Pronunciation",
    description:
      "While honoring scriptural roots, names are selected to sound contemporary, rare, and effortless to pronounce for children growing up in modern global environments.",
  },
  {
    title: "4. Numerological Harmony (Mulank & Bhagyank)",
    description:
      "The compound numerical value of the chosen name is calculated through Chaldean numerology to harmonize with the child's birth date and life path, avoiding conflicting vibrations.",
  },
];

const FAQS = [
  {
    question: "What is the importance of Namkaran Sanskar in Vedic tradition?",
    answer:
      "Namkaran Sanskar is one of the 16 sacred Vedic Samskaras. A name is not merely a legal label; it is a lifetime sound vibration (Mantra) that influences the child's subconscious mind, personality, and energetic aura every time it is spoken.",
  },
  {
    question: "How do you select the starting letter of the baby's name?",
    answer:
      "We calculate the exact degree of the Moon at the time and place of birth to determine the Janma Nakshatra and its specific Pada (quarter). Each Pada corresponds to a specific Sanskrit syllable (e.g., Chu, Che, Cho, La for Ashwini).",
  },
  {
    question: "Do you also suggest names for babies before birth?",
    answer:
      "Yes. Expectant parents can consultation in advance. We also offer Baby Birth Date & Time Selection (Muhurat) for planned cesarean deliveries to ensure the child is born under the most auspicious planetary alignment.",
  },
  {
    question: "What is included in the Baby Name Suggestion report?",
    answer:
      "You receive 10 carefully researched names (5 boy / 5 girl or all tailored to the baby's gender) complete with exact Sanskrit root meanings, scriptural references, and numerological profiles.",
  },
];

export default function BabyNameSuggestionsClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("baby-booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Vedic Baby Name Suggestions (Namkaran Sanskar)",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Sanskrit-rooted, modern, and meaningful baby name suggestions based on Janma Nakshatra Pada and Numerology by Acharya Dharmikshree.",
        url: "https://www.dharmikshree.org/baby-name-suggestions",
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
              <span>Sacred Namkaran Sanskar</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Vedic Baby Name Suggestions
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              A child&apos;s name carries lifelong vibration, identity, and direction. Discover 10 research-curated names rooted in classical Sanskrit, aligned with birth Nakshatra, and harmonized with Numerology.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Request Baby Name Research <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20would%20like%20to%20consult%20regarding%20Baby%20Name%20Suggestions."
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
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Carefully Curated</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">108 Padas</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Exact Nakshatra Math</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Sanskrit Root</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Noble Meaning</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Global Sound</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Modern & Pronounceable</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE PRINCIPLES */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Sacred Science
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                The 4 Pillars of Vedic Namkaran
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {NAMING_VALUES.map((val, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-sm bg-brand-ivory/20 border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 shadow-sm space-y-3"
                >
                  <h3 className="font-serif text-xl font-normal text-brand-charcoal">
                    {val.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="baby-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Commission Baby Name Research
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Provide your baby&apos;s birth details below. Our sanctuary desk will calculate the exact Janma Nakshatra Pada and deliver your personalized research report.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="baby_naming" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Parent Inquiries
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
