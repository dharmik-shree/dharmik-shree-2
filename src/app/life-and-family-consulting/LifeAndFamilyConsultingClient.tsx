"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Users,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Home,
  MessageCircle,
} from "lucide-react";

const FAMILY_PILLARS = [
  {
    title: "Generational Harmony & Succession Clarity",
    description:
      "When business families or traditional households transition leadership to the next generation, conflicting planetary dashas can create silent mistrust. We bridge generation gaps by identifying the cosmic temperament of each family member.",
  },
  {
    title: "Parent-Child Communication & Guidance",
    description:
      "Every child carries unique planetary inclinations (Lagna, Mercury, and 5th house). Rather than forcing societal expectations, we help parents understand their child's natural learning mode, emotional triggers, and ideal career dharma.",
  },
  {
    title: "Overcoming Chronic Domestic Anxiety & Discord",
    description:
      "Unexplained stress, recurring medical costs, and daily arguments frequently stem from disturbed 4th house (Sukha Bhava) energies or severe North-East Vastu defects. We offer non-fear-based sattvic remedies to restore tranquility.",
  },
  {
    title: "Vedic Living Spaces Alignment (Home Vastu)",
    description:
      "A home should be a charging station, not a source of exhaustion. We harmonize dining areas, family gathering spaces, and temple directions to foster warmth, respect, and mutual affection.",
  },
];

const FAQS = [
  {
    question: "How does family astrology consulting work for multiple family members?",
    answer:
      "Rather than analyzing charts in isolation, Acharya Dharmikshree studies the 'Interlocking Charts' of the key family members. This reveals why certain individuals trigger friction, where mutual karmic support lies, and how each person's planetary periods (Dashas) impact collective household peace.",
  },
  {
    question: "Can family disputes and legal inheritance tensions be resolved peacefully?",
    answer:
      "Yes. By reviewing the 3rd, 4th, and 9th houses across siblings and parents, we identify favorable transit periods for calm mediation and recommend peaceful, ethical settlement windows that preserve family honor.",
  },
  {
    question: "Is this consultation confidential from extended relatives?",
    answer:
      "100%. All discussions, family charts, and personal deliberations remain strictly private within Acharya Dharmikshree's sanctuary.",
  },
];

export default function LifeAndFamilyConsultingClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("family-booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Life & Family Consulting (Mentorship)",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Vedic family guidance, generational business mentorship, and marital harmony counseling by 13th-generation astrologer Acharya Dharmikshree.",
        url: "https://www.dharmikshree.org/life-and-family-consulting",
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
              <Users className="w-3.5 h-3.5" />
              <span>Generational Peace & Mentorship</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Life & Family Consulting
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Transform recurring friction into profound understanding. Grounded Vedic counsel for multi-generational families, conscious couples, and family business leaders.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Schedule Family Mentorship <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20would%20like%20to%20consult%20regarding%20Life%20and%20Family%20Mentorship."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold" />
                WhatsApp Confidential Chat
              </a>
            </div>

            {/* TRUST STRIP */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">13th Gen</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Ancestral Lineage</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Whole Family</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Holistic Interlocking</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Zero Blame</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Compassionate Counsel</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">100% Private</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Complete Discretion</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE PILLARS */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Enduring Harmony
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Core Domains of Family Guidance
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FAMILY_PILLARS.map((p, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-sm bg-brand-ivory/20 border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 shadow-sm space-y-3"
                >
                  <h3 className="font-serif text-xl font-normal text-brand-charcoal">
                    {p.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="family-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Book a Family Mentorship Session
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Submit your details below. Our sanctuary coordinator will reach out confidentially via WhatsApp to schedule your session.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="family_consulting" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Common Inquiries
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
