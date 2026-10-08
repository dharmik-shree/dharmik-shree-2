"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { CityPillarData } from "@/data/cityPillars";
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Calendar,
  Briefcase,
  HeartHandshake,
  Home,
  Flame,
  TrendingUp,
  Building2,
  Cpu,
  Compass,
  ArrowRight,
} from "lucide-react";

interface Props {
  data: CityPillarData;
}

export default function CityAstrologerPillarPage({ data }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to render dynamic icon
  const renderIcon = (name: string) => {
    switch (name) {
      case "Briefcase":
        return <Briefcase className="w-6 h-6 text-brand-gold" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6 text-brand-gold" />;
      case "Home":
        return <Home className="w-6 h-6 text-brand-gold" />;
      case "Flame":
        return <Flame className="w-6 h-6 text-brand-gold" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-brand-gold" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-brand-gold" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-brand-gold" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-gold" />;
    }
  };

  // Structured Data Schema for Local Business + Person + FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `https://www.dharmikshree.org/${data.slug}#service`,
        name: `Acharya Dharmikshree - Vedic Astrologer in ${data.cityName}`,
        description: data.metaDescription,
        url: `https://www.dharmikshree.org/${data.slug}`,
        telephone: "+919173008182",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: data.cityName,
          addressRegion: data.stateName,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: data.cityName === "Surat" ? "21.1702" : data.cityName === "Mumbai" ? "19.0760" : "12.9716",
          longitude: data.cityName === "Surat" ? "72.8311" : data.cityName === "Mumbai" ? "72.8777" : "77.5946",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "840",
        },
        areaServed: data.localityAreas.map((area) => ({
          "@type": "Place",
          name: `${area}, ${data.cityName}`,
        })),
      },
      {
        "@type": "Person",
        "@id": "https://www.dharmikshree.org/#person",
        name: "Acharya Dharmikshree",
        jobTitle: "13th-Generation Vedic Astrologer & Vastu Consultant",
        url: "https://www.dharmikshree.org",
        description:
          "Carrying forward an unbroken 300+ year ancestral lineage of Vedic astrology, Vastu Shastra, and sacred rituals.",
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
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
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 pt-24">
        {/* HERO SECTION */}
        <section className="relative bg-brand-charcoal text-brand-ivory py-20 md:py-28 px-6 md:px-12 overflow-hidden border-b border-brand-gold/20">
          {/* Subtle decorative radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-[0.25em] font-medium animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.heroBadge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              {data.headline}
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              {data.subheadline}
            </p>

            {/* Quick CTA Actions */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Consultation in {data.cityName}
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20would%20like%20to%20book%20an%20astrology%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold" />
                WhatsApp Direct Chat
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">13th Gen</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Ancestral Lineage</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">300+ Years</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Vedic Wisdom Tradition</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">15,000+</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Souls Guided Globally</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">4.9 / 5.0</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Devotee Trust Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL CONTEXT & LOCALITIES */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Local Presence in {data.cityName}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Rooted in Tradition, Tailored for {data.cityName}
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <p className="text-brand-charcoal/80 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto font-light">
              {data.localContext}
            </p>

            {/* Localities chips */}
            <div className="bg-brand-ivory/60 border border-brand-gold/20 p-6 md:p-8 rounded-sm">
              <div className="flex items-center gap-2 mb-4 text-brand-charcoal">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <h3 className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
                  Prominent Areas Served Across {data.cityName}
                </h3>
              </div>
              <p className="text-xs text-brand-charcoal/60 mb-4 font-light">
                Devotees, entrepreneurs, and families consult Acharya Dharmikshree regularly from across these key neighborhoods:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {data.localityAreas.map((locality) => (
                  <span
                    key={locality}
                    className="px-3.5 py-1.5 bg-white border border-brand-gold/30 text-brand-charcoal text-xs font-light tracking-wide rounded-sm hover:border-brand-gold transition-colors duration-200"
                  >
                    {locality}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 CORE SPECIALTIES */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-brand-ivory/40 border-t border-b border-brand-gold/10">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Cosmic Guidance
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Specialized Vedic Consultations in {data.cityName}
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.specialties.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-sm border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 shadow-sm hover:shadow-md space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-sm bg-brand-gold/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {renderIcon(item.icon)}
                  </div>
                  <h3 className="font-serif text-xl font-normal text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-brand-charcoal/70 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONSULTATION MODES */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Personalized Formats
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Ways to Consult Acharya Dharmikshree
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.consultationTypes.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-sm border border-brand-gold/30 bg-brand-ivory/20 flex flex-col justify-between space-y-4 text-center"
                >
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-brand-gold/15 text-brand-gold text-[10px] uppercase tracking-widest font-semibold rounded-full">
                      {c.badge}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-brand-charcoal">
                      {c.type}
                    </h3>
                    <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToBooking}
                    className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-medium pt-2 transition-colors cursor-pointer"
                  >
                    Select Option &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-charcoal text-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium">
                Purity & Integrity
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-ivory">
                Why Devotees in {data.cityName} Choose Dharmikshree
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="space-y-4">
              {data.whyChooseUs.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-sm bg-brand-ivory/5 border border-brand-gold/20"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-brand-ivory/80 text-sm sm:text-base font-light leading-relaxed">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE / BOOKING FORM */}
        <section id="booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Lead Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Reserve Your Session with Acharya Dharmikshree
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Fill out your details below. Our team in {data.cityName} will review your request and confirm your appointment slot via WhatsApp within 24 hours.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            {/* Seamless BookingForm connected to CRM */}
            <BookingForm defaultService="divine_consultation" />
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-t border-brand-gold/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Common Inquiries
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Frequently Asked Questions ({data.cityName})
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-brand-gold/20 rounded-sm overflow-hidden bg-brand-ivory/20 transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-brand-gold/5 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
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

        {/* INTERNAL PILLAR LINK CLUSTER */}
        <section className="py-12 px-6 md:px-12 bg-brand-ivory/50 border-t border-brand-gold/10 text-xs">
          <div className="max-w-5xl mx-auto space-y-6">
            <h3 className="uppercase tracking-[0.2em] text-brand-gold font-semibold text-center">
              Explore More Sacred Consultations & Rituals
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/astrologer-in-surat"
                className={`px-4 py-2 rounded-sm border transition-colors ${
                  data.cityName === "Surat"
                    ? "bg-brand-gold text-brand-charcoal font-semibold border-brand-gold"
                    : "bg-white border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold"
                }`}
              >
                Astrologer in Surat
              </a>
              <a
                href="/astrologer-in-mumbai"
                className={`px-4 py-2 rounded-sm border transition-colors ${
                  data.cityName === "Mumbai"
                    ? "bg-brand-gold text-brand-charcoal font-semibold border-brand-gold"
                    : "bg-white border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold"
                }`}
              >
                Astrologer in Mumbai
              </a>
              <a
                href="/astrologer-in-bangalore"
                className={`px-4 py-2 rounded-sm border transition-colors ${
                  data.cityName === "Bangalore"
                    ? "bg-brand-gold text-brand-charcoal font-semibold border-brand-gold"
                    : "bg-white border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold"
                }`}
              >
                Astrologer in Bangalore
              </a>
              <a
                href="/puja-ritual-services"
                className="px-4 py-2 rounded-sm bg-white border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Vedic Puja & Ritual Services
              </a>
              <a
                href="/relationship-consulting"
                className="px-4 py-2 rounded-sm bg-white border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Relationship & Marriage Consulting
              </a>
              <a
                href="/puja"
                className="px-4 py-2 rounded-sm bg-white border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Online E-Puja Seva
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
