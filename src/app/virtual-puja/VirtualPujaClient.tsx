"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Flame,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Video,
  Package,
  Waves,
  MessageCircle,
} from "lucide-react";

const VIRTUAL_PILLARS = [
  {
    icon: Flame,
    title: "1. Authentic Vedic Sankalp",
    description:
      "Your full name, family members, Gotra, Janma Nakshatra, and specific prayer intentions are chanted aloud by Gurukul-trained Purohits at the commencement of the sacred ritual.",
  },
  {
    icon: Waves,
    title: "2. Divine Tirth Sthapana",
    description:
      "Rituals are conducted at spiritually charged tirth locations, notably on the sacred banks of Suryaputri River Tapi in Surat (sister of Lord Yama), Trimbakeshwar Jyotirlinga, and Kashi.",
  },
  {
    icon: Video,
    title: "3. HD Video Recording & Live Access",
    description:
      "You receive personalized video recordings showing your exact Sankalp recitation and key ahutis, providing complete transparency and devotional connection.",
  },
  {
    icon: Package,
    title: "4. Sanctified Prasadam Delivery",
    description:
      "Holy Bhasma (vibhuti), energized raksha sutra, and blessed dry prasadam are carefully packaged and couriered directly to your residential address worldwide.",
  },
];

const FAQS = [
  {
    question: "Is remote Virtual Puja / E-Puja valid according to Vedic scriptures?",
    answer:
      "Yes. Classical Dharmashastras and the Brihadaranyaka Upanishad describe 'Vachika Sankalp' and 'Durastha Sankalp'. Since mantras exist in the realm of consciousness and Akasha (space), the intentional invocation of your Gotra and Name connects your energy to the ritual regardless of geographical distance.",
  },
  {
    question: "How do I know my name was actually included in the ritual?",
    answer:
      "We provide uncut HD video footage explicitly showing the head purohit reciting your individual name, gotra, and sankalp before the sacred fire or holy river waters.",
  },
  {
    question: "Can devotees residing outside India (USA, UK, Canada, UAE) participate?",
    answer:
      "Yes. Over 40% of our virtual puja devotees reside across 24+ countries worldwide. Timezone-aligned video recordings are shared promptly, and prasadam is shipped via international air courier.",
  },
  {
    question: "What is the difference between Community E-Pujas and Private Pujas?",
    answer:
      "In Community E-Pujas (available at /puja), multiple devotees participate together with individual sankalps. In a Private Virtual Puja, the entire ritual and havana are conducted exclusively for your family on your chosen auspicious Muhurat.",
  },
];

export default function VirtualPujaClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("virtual-booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Virtual Puja & E-Puja Seva",
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
        },
        description:
          "Authentic remote Vedic rituals, River Tapi Surat sankalp, HD video recordings, and worldwide prasadam delivery by Acharya Dharmikshree.",
        url: "https://www.dharmikshree.org/virtual-puja",
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
              <Flame className="w-3.5 h-3.5" />
              <span>Sacred Remote Vedic Seva</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              Virtual Puja & E-Puja Seva
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Experience the divine grace of authentic Vedic rituals from anywhere in the world. Personal Name & Gotra Sankalp, sacred holy river tirthas, and blessed prasadam delivered to your doorstep.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Enquire for Virtual Puja <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/puja"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Upcoming Community Pujas
              </a>
            </div>

            {/* TRUST STRIP */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">100% Vedic</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Scriptural Mantras</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">River Tapi</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Surat Holy Waters</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">HD Video</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Sankalp Proof</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Global</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Prasadam Courier</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 SACRED GUARANTEES */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Authentic Purity
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                The 4 Pillars of Our Virtual Puja Seva
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VIRTUAL_PILLARS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-sm bg-brand-ivory/20 border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 shadow-sm space-y-3"
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
        <section id="virtual-booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Enquire for a Virtual Puja / E-Puja
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Submit your prayer requirements. Our Vedic purohit team will reach out via WhatsApp to finalize your Gotra details and auspicious ritual date.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService="virtual_puja" />
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Devotee Inquiries
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
