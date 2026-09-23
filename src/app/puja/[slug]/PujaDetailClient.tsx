"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Flame,
  HelpCircle,
  BookOpen,
  Award,
} from "lucide-react";
import { Puja, PujaPackage } from "@/types/puja";
import PujaPackageSelector from "@/components/pujas/PujaPackageSelector";
import PujaEnrollmentModal from "@/components/pujas/PujaEnrollmentModal";

interface PujaDetailClientProps {
  puja: Puja;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(endDateStr: string): TimeLeft {
  const diff = new Date(endDateStr).getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  };
}

export default function PujaDetailClient({ puja }: PujaDetailClientProps) {
  const FALLBACK_IMAGE = "/assets/dharmik_about.jpg";
  const [activeTab, setActiveTab] = useState<"about" | "benefits" | "process" | "packages" | "faqs">("about");
  const [activeImage, setActiveImage] = useState(puja.banner_image_url || FALLBACK_IMAGE);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(puja.enrollment_end_date));

  // Modal States
  const [isPackageSelectorOpen, setIsPackageSelectorOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PujaPackage | null>(null);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  useEffect(() => {
    setActiveImage(puja.banner_image_url || FALLBACK_IMAGE);
  }, [puja.banner_image_url]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(puja.enrollment_end_date));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(puja.enrollment_end_date));
    }, 1000);
    return () => clearInterval(timer);
  }, [puja.enrollment_end_date]);

  const rawImages = [puja.banner_image_url, ...(puja.gallery_images || [])].filter(Boolean);
  const allImages = Array.from(new Set(rawImages));
  const packages = puja.packages || [];

  const handleSelectPackageFromModal = (pkg: PujaPackage) => {
    setSelectedPackage(pkg);
    setIsPackageSelectorOpen(false);
    setIsEnrollmentOpen(true);
  };

  const handleDirectSelectPackage = (pkg: PujaPackage) => {
    setSelectedPackage(pkg);
    setIsEnrollmentOpen(true);
  };

  const formattedEventDate = new Date(puja.event_date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-brand-charcoal/60 uppercase tracking-wider overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-brand-gold transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/puja" className="hover:text-brand-gold transition-colors">
          Puja Seva
        </Link>
        <ChevronRight size={12} />
        <span className="text-brand-gold font-medium truncate max-w-xs">{puja.title}</span>
      </nav>

      {/* 2. Top Hero Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-brand-gold/30 shadow-xl bg-brand-charcoal">
            <Image
              src={failedImages[activeImage] ? FALLBACK_IMAGE : activeImage}
              alt={puja.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-500"
              priority
              unoptimized
              onError={() => setFailedImages((prev) => ({ ...prev, [activeImage]: true }))}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent pointer-events-none" />

            {/* Live streaming indicator badge */}
            <div className="absolute top-4 left-4 bg-brand-charcoal/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-brand-gold/40 flex items-center gap-2 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-brand-ivory font-medium">
                Live Broadcast Included
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-brand-ivory/90">
              <span className="flex items-center gap-1.5 font-light">
                <ShieldCheck size={16} className="text-brand-gold" /> Authenticated Sanatan Purohits
              </span>
              <span className="flex items-center gap-1 font-semibold text-brand-gold">
                ★ 4.9 (5K+ Devotees)
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 pt-1">
              {allImages.map((img, idx) => {
                const isSelected = activeImage === img;
                const src = failedImages[img] ? FALLBACK_IMAGE : img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-md overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#E56910] ring-2 ring-[#E56910]/40 scale-105 shadow-md"
                        : "border-gray-200 opacity-75 hover:opacity-100 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                      onError={() => setFailedImages((prev) => ({ ...prev, [img]: true }))}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Trust Guarantees Panel */}
          <div className="bg-white border border-brand-gold/20 rounded-lg p-4 grid grid-cols-2 gap-3 text-xs text-brand-charcoal/80 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Gotra & Name Chanting</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>WhatsApp Video Proof</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Doorstep Prasad Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Guided Mantras From Home</span>
            </div>
          </div>
        </div>

        {/* Right Column: Puja Highlights & Selection */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Header Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-brand-gold/15 border border-brand-gold/30 text-brand-bronze text-xs uppercase tracking-wider font-semibold rounded-full">
                {puja.tithi_details || "Vedic Sankalp"}
              </span>
              <span className="text-xs text-brand-charcoal/70 flex items-center gap-1 font-medium">
                <MapPin size={14} className="text-brand-gold" /> {puja.location_name}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal font-normal leading-tight">
              {puja.title}
            </h1>

            {puja.subtitle && (
              <p className="text-brand-charcoal/80 text-sm sm:text-base font-light italic leading-relaxed">
                {puja.subtitle}
              </p>
            )}
          </div>

          {/* Event Details Ribbon */}
          <div className="bg-brand-charcoal text-brand-ivory rounded-lg p-4 space-y-3 shadow-lg border border-brand-gold/30">
            <div className="flex items-center gap-2.5 text-xs text-brand-ivory/80 pb-3 border-b border-white/10">
              <Calendar size={16} className="text-brand-gold shrink-0" />
              <span>
                Event Date: <strong className="text-brand-gold font-medium">{formattedEventDate}</strong>
              </span>
            </div>

            {/* Countdown Box */}
            <div>
              <div className="flex items-center justify-between text-xs text-brand-ivory/70 mb-2">
                <span className="flex items-center gap-1.5 text-brand-gold font-medium">
                  <Clock size={14} /> Booking Will Close In:
                </span>
                <span className="text-[11px] text-brand-ivory/50">Limited Sankalp Slots</span>
              </div>

              {timeLeft.isExpired ? (
                <div className="text-amber-400 font-semibold text-xs py-1">
                  Enrollment closed for this muhurat. Contact support for private Sankalp.
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white/10 rounded py-2 border border-brand-gold/20">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-brand-ivory/70">Days</span>
                  </div>
                  <div className="bg-white/10 rounded py-2 border border-brand-gold/20">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-brand-ivory/70">Hours</span>
                  </div>
                  <div className="bg-white/10 rounded py-2 border border-brand-gold/20">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-brand-ivory/70">Mins</span>
                  </div>
                  <div className="bg-white/10 rounded py-2 border border-brand-gold/20">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-brand-ivory/70">Secs</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 text-xs text-brand-charcoal/70 bg-amber-50/50 border border-amber-200/50 p-3 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#E56910] flex items-center justify-center font-bold text-sm">
              🙏
            </div>
            <div>
              <strong>1,00,000+ Devotees</strong> have participated in Vedic Seva with Dharmikshree.
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-brand-charcoal/60 uppercase tracking-wider block">
                Starting Dakshina
              </span>
              <span className="font-serif text-3xl font-bold text-brand-gold">
                ₹{puja.starting_price} <span className="text-xs font-normal text-brand-charcoal/60">onwards</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPackageSelectorOpen(true)}
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Select Puja Package</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-brand-gold/20 sticky top-16 md:top-20 bg-brand-ivory/95 backdrop-blur-md z-30 pt-4">
        <div className="flex gap-4 md:gap-8 overflow-x-auto whitespace-nowrap text-xs md:text-sm font-medium">
          {[
            { key: "about", label: "About Puja" },
            { key: "benefits", label: "Benefits" },
            { key: "process", label: "Vedic Process" },
            { key: "packages", label: "Packages & Dakshina" },
            { key: "faqs", label: "FAQs" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-1.5 text-sm md:text-base font-serif transition-all cursor-pointer rounded-sm ${
                activeTab === tab.key
                  ? "border border-[#E56910] text-[#E56910] font-bold shadow-xs bg-white/70"
                  : "border border-transparent text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Tab Contents */}
      <div className="text-left space-y-10">
        {/* ABOUT PUJA TAB */}
        {activeTab === "about" && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-semibold">
              Significance of {puja.title}
            </h2>
            <div className="text-sm md:text-base text-brand-charcoal/80 font-light leading-relaxed space-y-4">
              <p>{puja.description}</p>
            </div>

            {/* Temple location box */}
            <div className="bg-white border border-brand-gold/20 rounded-lg p-5 space-y-2 mt-6">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal flex items-center gap-2">
                <MapPin size={18} className="text-brand-gold" /> Consecrated Pilgrimage Venue
              </h3>
              <p className="text-sm text-brand-charcoal/75">
                {puja.location_name}
              </p>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                Rituals performed at this holy Kshetra carry multiplied karmic merit (Punya Phal) as established in the Skanda and Padma Puranas.
              </p>
            </div>
          </div>
        )}

        {/* BENEFITS TAB */}
        {activeTab === "benefits" && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-semibold">
              Spiritual & Astrological Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(puja.benefits && puja.benefits.length > 0
                ? puja.benefits
                : [
                    { title: "Karmic Purification", description: "Dissolves afflictions affecting peace and lineage harmony." },
                    { title: "Generational Protection", description: "Bestows protection, good health, and family prosperity." },
                  ]
              ).map((b, idx) => (
                <div key={idx} className="bg-white border border-brand-gold/20 rounded-lg p-5 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-[#E56910] font-semibold text-sm">
                    <Sparkles size={16} />
                    <h4>{b.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-charcoal/75 font-light leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROCESS TAB */}
        {activeTab === "process" && (
          <div className="space-y-6 max-w-4xl text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E1E] font-normal tracking-tight">
              How the Puja is Performed Step-by-Step
            </h2>

            <div className="space-y-4 pt-1">
              {(puja.process_steps && puja.process_steps.length > 0
                ? puja.process_steps
                : [
                    {
                      step: 1,
                      title: "Devotee Sankalp",
                      description: "Purohit recites your Name, Gotra, and wish before the sacred Falgu river altar.",
                    },
                    {
                      step: 2,
                      title: "Pind Daan & Til Tarpana",
                      description: "Authentic Vedic offerings of Barley, Til, Honey, and Milk honoring your lineage.",
                    },
                    {
                      step: 3,
                      title: "Maha Havan & Pitru Gayatri",
                      description: "Purifying sacred fire ceremony reciting 1008 Pitru Gayatri Mantras.",
                    },
                    {
                      step: 4,
                      title: "WhatsApp Video & Prasad Dispatch",
                      description: "Full HD video recording shared on your WhatsApp and consecrated Prasad dispatched.",
                    },
                  ]
              ).map((stepItem, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBE7DF] flex items-start gap-5 sm:gap-6 transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B38E46] text-[#241B0E] font-bold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-xs mt-0.5 font-serif">
                    {stepItem.step || idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1E1E1E] leading-snug">
                      {stepItem.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#524D47] font-light leading-relaxed mt-1.5">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PACKAGES TAB (In-page Package Cards) */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-semibold">
                  Choose Your Puja Package
                </h2>
                <p className="text-xs text-brand-charcoal/60 mt-1">
                  Individual, Partner, and Family packages available.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPackageSelectorOpen(true)}
                className="px-6 py-2.5 bg-brand-charcoal text-brand-gold border border-brand-gold/40 text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-gold hover:text-brand-charcoal transition-colors cursor-pointer"
              >
                Compare Packages Modal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg border border-brand-gold/25 p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-[#E56910] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                        {pkg.max_persons === 1 ? "1 Person" : pkg.max_persons === 2 ? "2 Persons" : `${pkg.max_persons}+ Persons`}
                      </span>
                      {pkg.badge_text && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                          {pkg.badge_text}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug">
                      {pkg.name}
                    </h3>

                    {pkg.description && (
                      <p className="text-xs text-gray-600 font-light line-clamp-3">
                        {pkg.description}
                      </p>
                    )}

                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <ul className="text-xs text-gray-700 space-y-1.5 pt-2 border-t border-gray-100">
                        {pkg.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#E56910]">
                        ₹{pkg.price}
                      </span>
                      {pkg.original_price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{pkg.original_price}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDirectSelectPackage(pkg)}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                    >
                      Book Sankalp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQS TAB */}
        {activeTab === "faqs" && (
          <div className="space-y-6 max-w-4xl text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E1E] font-normal tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 pt-1">
              {(puja.faqs && puja.faqs.length > 0
                ? puja.faqs
                : [
                    {
                      question: "Do I need to be physically present at Gaya?",
                      answer: "No. The Puja is performed on your behalf by authenticated Purohits using your Gotra and Name. You can watch live or view the complete uncut video recording sent to your WhatsApp.",
                    },
                    {
                      question: "What if I do not know my Gotra?",
                      answer: "In Sanatan Dharma traditions, if you do not know your Gotra, Panditji will take the universal Kashyap Gotra Sankalp on your behalf, which is fully valid and auspicious.",
                    },
                    {
                      question: "When and how will I receive the meeting link?",
                      answer: "On the morning of the Puja day, our team will send the personalized joining link to your registered WhatsApp number and Email.",
                    },
                  ]
              ).map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBE7DF] space-y-2.5 transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full border-[1.5px] border-[#B88E4B] text-[#B88E4B] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ?
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#1E1E1E] leading-snug">
                      {faq.question}
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base text-[#524D47] font-light leading-relaxed pl-7 sm:pl-7.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Sticky Bottom Bar on Mobile/Tablet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-gold/25 p-3 sm:p-4 z-40 lg:hidden shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">From</span>
            <span className="font-serif text-xl font-bold text-[#E56910]">
              ₹{puja.starting_price}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsPackageSelectorOpen(true)}
            className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Select Puja Package</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 6. Package Selector Modal (Screenshot 1) */}
      <PujaPackageSelector
        packages={packages}
        isOpen={isPackageSelectorOpen}
        onClose={() => setIsPackageSelectorOpen(false)}
        onSelectPackage={handleSelectPackageFromModal}
        initialSelectedPackageId={selectedPackage?.id}
      />

      {/* 7. Devotee Enrollment Modal (Screenshot 2) */}
      {selectedPackage && (
        <PujaEnrollmentModal
          puja={puja}
          selectedPackage={selectedPackage}
          isOpen={isEnrollmentOpen}
          onClose={() => setIsEnrollmentOpen(false)}
          onBackToPackages={() => {
            setIsEnrollmentOpen(false);
            setIsPackageSelectorOpen(true);
          }}
        />
      )}
    </div>
  );
}
