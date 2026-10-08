"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Compass,
  Flame,
  MessageCircle,
  Users,
} from "lucide-react";

const RELATIONSHIP_SERVICES = [
  {
    title: "Comprehensive Kundali Milan (Gun Matching)",
    badge: "Pre-Marital",
    description:
      "Deep Ashtakoot (36-gun) evaluation analyzing mental harmony (Maitri), longevity, health, and mutual respect beyond automated software scores.",
    highlights: ["Ashtakoot & Dashakoot analysis", "Bhakoot & Nadi Dosh cancellations", "Emotional chemistry & temperament match"],
  },
  {
    title: "Manglik Dosh & Cancellation Analysis",
    badge: "Remedial",
    description:
      "Dispel fear with authentic Parashara scripture principles. 80% of perceived Manglik doshas possess natural planetary nullifications (Bhanga).",
    highlights: ["Mars position in 1st, 4th, 7th, 8th, 12th houses", "Kumbh Vivaha & scriptural remedies", "Clarity without fear or exploitation"],
  },
  {
    title: "Marriage Delay & Auspicious Timing (Vivaha Yoga)",
    badge: "Life Timing",
    description:
      "Identify hidden planetary blockages in the 7th house or D9 Navamsha chart and activate the most favorable dasha periods for finding a life partner.",
    highlights: ["Jupiter & Venus transit activations", "Navamsha (D9) inner chart diagnostics", "Personalized mantra & fasting sadhana"],
  },
  {
    title: "Marital Conflict Healing & Post-Marriage Harmony",
    badge: "Couple Revival",
    description:
      "Empathetic astrological guidance for couples experiencing sudden friction, in-law misunderstandings, or communication breakdowns.",
    highlights: ["Identifying malefic Rahu or Saturn transits", "Vastu energy alignment of the master bedroom", "Constructive behavioral remedies"],
  },
];

const FAQS = [
  {
    question: "Is having 18+ gunas sufficient for a successful marriage?",
    answer:
      "While classical astrology recommends at least 18 out of 36 gunas, Gun Milan is only 25% of the total evaluation. The strength of the 7th house (partnership), 8th house (marital longevity), and the placement of Jupiter (karaka for females) and Venus (karaka for males) are equally critical.",
  },
  {
    question: "What if there is Nadi Dosh in our Kundali?",
    answer:
      "Nadi Dosh indicates genetic or physiological discordance. However, classical texts state numerous cancellations (e.g., same Rashi with different Nakshatra, or same Nakshatra with different Charana). Acharya Dharmikshree carefully analyzes these nuances before suggesting any remedy.",
  },
  {
    question: "Can astrology help with inter-caste or love marriage acceptance?",
    answer:
      "Yes. By studying the 5th house (romance) and 9th/11th houses (social acceptance and family blessings), we identify the most auspicious planetary windows and peaceful remedies to foster mutual understanding and family consent.",
  },
  {
    question: "What information is needed for a couple's horoscope match?",
    answer:
      "Both partners' Date of Birth, exact Time of Birth, and Place of Birth are required. If one partner does not have exact birth records, Prashna Kundali (Horary Astrology) and Palmistry are utilized.",
  },
];

export default function RelationshipConsultingClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("relationship-booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Relationship & Marriage Astrology Consulting",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Vedic relationship guidance, Kundali matching (Gun Milan), Manglik dosh remedies, and marital harmony counseling by Acharya Dharmikshree.",
        url: "https://www.dharmikshree.org/relationship-consulting",
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
              <HeartHandshake className="w-3.5 h-3.5 text-brand-gold" />
              <span>Sacred Union & Vedic Compatibility</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Relationship & Marriage Astrology Consulting
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Deep Kundali Milan, emotional compatibility, and compassionate guidance to navigate delays, Manglik dosha, and marital misunderstandings through 300-year Vedic wisdom.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Relationship Consultation <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20would%20like%20to%20consult%20regarding%20Kundali%20Milan%20and%20marriage%20guidance."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold" />
                WhatsApp Direct Inquiry
              </a>
            </div>

            {/* TRUST STRIP */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">10,000+</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Horoscopes Matched</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Beyond 36 Guna</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Holistic Navamsha Review</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Zero Fear</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Ethical Vedic Guidance</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">100% Confidential</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Private Sessions</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 SPECIALIZED PILLARS */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Harmonious Unions
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Vedic Solutions for Every Relationship Stage
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {RELATIONSHIP_SERVICES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-sm border border-brand-gold/20 hover:border-brand-gold/50 bg-brand-ivory/20 transition-all duration-300 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-brand-gold/10 pb-3">
                    <span className="px-3 py-1 bg-brand-gold/15 text-brand-gold text-[10px] uppercase tracking-widest font-semibold rounded-full">
                      {item.badge}
                    </span>
                    <HeartHandshake className="w-4 h-4 text-brand-gold" />
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-brand-charcoal">
                    {item.title}
                  </h3>

                  <p className="text-brand-charcoal/70 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-brand-charcoal/75 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={scrollToBooking}
                      className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Schedule Consultation <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY BEYOND 36 GUNAS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-charcoal text-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium">
                Vedic Wisdom Insight
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-ivory">
                Why 36 Guna Software Matching Fails Modern Couples
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="space-y-4 text-brand-ivory/80 text-sm md:text-base leading-relaxed font-light">
              <p>
                Many automated astrology websites calculate only the basic Moon Nakshatra Ashtakoot score. Two horoscopes might score 30 out of 36 gunas, yet end in bitter dispute if the 7th house lord is debilitated or Rahu occupies the Navamsha lagna.
              </p>
              <p>
                Conversely, couples with a modest score of 17 or 18 often enjoy long, blissful lives if their Ascendants and mutual planetary aspects are harmonious. Acharya Dharmikshree evaluates the complete holistic portrait: Longevity (Ayushya), Mental Compatibility (Maitri), Emotional Chemistry (Graha Maitri), and Spiritual Dharma.
              </p>
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="relationship-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Book Kundali Milan & Relationship Session
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Fill in your details below. You can also provide birth details in Tab 2 so Acharya Dharmikshree can examine both charts prior to your consultation.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="kundali_matching" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Common Questions
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
