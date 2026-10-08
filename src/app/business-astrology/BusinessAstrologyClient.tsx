"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Building2,
  Users2,
  Clock,
  Compass,
  MessageCircle,
} from "lucide-react";

const PILLARS = [
  {
    title: "Founder-Partner Synergy & Co-Founder Matching",
    icon: Users2,
    description:
      "A business partnership is as delicate as a sacred union. We evaluate co-founder natal charts to prevent power struggles, ego clashes, and financial friction before signing partnership deeds.",
  },
  {
    title: "Enterprise Natal Chart & Incorporation Muhurat",
    icon: Clock,
    description:
      "The exact moment of company registration, GST filing, or first commercial transaction becomes the company's birth chart. Selecting a powerful Muhurat protects capital and long-term valuation.",
  },
  {
    title: "Cash Flow & Planetary Timing (Dasha Cycles)",
    icon: TrendingUp,
    description:
      "By analyzing the 2nd (Dhana Bhava) and 11th (Labha Bhava) houses along with Jupiter and Mercury transits, we determine optimal quarters for capital expansion, debt reduction, and inventory holding.",
  },
  {
    title: "Commercial & Industrial Vastu Optimization",
    icon: Building2,
    description:
      "Non-structural energetic alignment of CEO cabins, accounts departments, and manufacturing equipment to foster clarity, eliminate stagnation, and accelerate cash turnover.",
  },
];

const FAQS = [
  {
    question: "What is Business Astrology and how does it help enterprises?",
    answer:
      "Business Astrology (Vyapar Jyotish) is the strategic application of Vedic planetary science to commercial ventures. It analyzes the company's foundation chart, founder horoscopes, and planetary cycles (Dashas) to optimize the timing of mergers, product launches, investments, and organizational leadership.",
  },
  {
    question: "Can astrology predict the best time to raise funding or expand?",
    answer:
      "Yes. Transits of Jupiter (Guru) over the 10th or 11th houses, coupled with supportive dasha rulers of Mercury (Budha) and Venus (Shukra), indicate high-liquidity windows where investor negotiations and expansion efforts yield the highest returns.",
  },
  {
    question: "What details are required for a corporate astrological reading?",
    answer:
      "We examine the birth details (date, time, place) of the primary founders or directors, alongside the exact company incorporation date and time (if the company is already registered).",
  },
  {
    question: "What is included in the Corporate Astrology Mentorship program?",
    answer:
      "The program provides ongoing strategic alignment including 2 private 1-hour sessions per month with Acharya Dharmikshree, priority WhatsApp guidance for urgent commercial decisions, and Vastu review for office spaces.",
  },
];

export default function BusinessAstrologyClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("business-booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Business Astrology & Corporate Mentorship",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Strategic Vedic astrology and commercial Vastu for founders, enterprises, and investors by 13th-generation astrologer Acharya Dharmikshree.",
        url: "https://www.dharmikshree.org/business-astrology",
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
              <Briefcase className="w-3.5 h-3.5" />
              <span>Executive Vedic Advisory</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Business Astrology & Corporate Mentorship
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Align cosmic timing with strategic enterprise execution. Trusted by visionary founders, diamond traders, textile leaders, and investors across India and internationally.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Schedule Corporate Advisory <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20would%20like%20to%20consult%20regarding%20Business%20Astrology%20and%20Corporate%20Advisory."
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
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">13th Gen</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Vedic Lineage</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">500+ Enterprises</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Consulted Globally</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Zero Guesswork</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Planetary Mathematics</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">100% Confidential</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Executive Discretion</p>
              </div>
            </div>
          </div>
        </section>

        {/* DEFINITION & COMPARISON */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Strategic Advantage
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Why Visionary Leaders Integrate Vedic Timing
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <p className="text-brand-charcoal/80 text-base md:text-lg leading-relaxed font-light text-center max-w-4xl mx-auto">
              Market analysis tells you <strong>what</strong> to do; Vedic Astrology reveals <strong>when</strong> to do it. Just as tides follow lunar cycles, market liquidity, consumer sentiment, and commercial negotiations respond to subtle planetary movements. Acharya Dharmikshree merges traditional Parashari business principles with modern commercial realities.
            </p>

            {/* Comparison Matrix Table for AI Ingestion */}
            <div className="overflow-x-auto border border-brand-gold/20 rounded-sm">
              <table className="w-full text-left text-sm font-light">
                <thead className="bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Enterprise Dimension</th>
                    <th className="p-4 text-brand-ivory/60">Conventional Analysis Alone</th>
                    <th className="p-4 text-brand-gold font-semibold">With Dharmikshree Business Astrology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10 bg-brand-ivory/20 text-brand-charcoal">
                  <tr>
                    <td className="p-4 font-medium">New Market Launch</td>
                    <td className="p-4 text-brand-charcoal/70">Based on competitive pressure</td>
                    <td className="p-4 text-brand-charcoal font-medium">Aligned with auspicious Mercury-Jupiter Muhurat windows</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Co-Founder Selection</td>
                    <td className="p-4 text-brand-charcoal/70">Resumes and interview impressions</td>
                    <td className="p-4 text-brand-charcoal font-medium">Deep Kundali synergy preventing partner fallout</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Capital Expansion</td>
                    <td className="p-4 text-brand-charcoal/70">Trailing financial spreadsheets</td>
                    <td className="p-4 text-brand-charcoal font-medium">Vimshottari Dasha cashflow forecast predicting liquidity cycles</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Office & Factory Energy</td>
                    <td className="p-4 text-brand-charcoal/70">Aesthetic interior layout</td>
                    <td className="p-4 text-brand-charcoal font-medium">Non-demolition Panch Tatva Vastu optimizing productivity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4 CORE ADVISORY PILLARS */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-brand-ivory/40 border-t border-b border-brand-gold/10">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Comprehensive Framework
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                The 4 Pillars of Corporate Jyotish
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-sm bg-white border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 shadow-sm space-y-3"
                  >
                    <div className="w-12 h-12 rounded-sm bg-brand-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-normal text-brand-charcoal">
                      {p.title}
                    </h3>
                    <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="business-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Corporate Enquiry
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Schedule a Strategic Business Consultation
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Submit your corporate or venture details below. Acharya Dharmikshree&apos;s executive desk will arrange a confidential briefing via WhatsApp within 24 hours.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="business_astrology" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Clarity & Answers
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
