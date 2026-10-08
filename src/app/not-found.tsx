"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Flame, Compass, Sparkles, BookOpen, ArrowLeft, Home, Calendar } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setCurrentPath(path);

      // Log exact broken URL event to Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag("event", "page_not_found", {
          broken_url: window.location.href,
          page_path: path,
          referrer: document.referrer || "direct",
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal justify-between selection:bg-brand-gold/20">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
        {/* Sacred Sanskrit Accent */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium block">
            मार्ग दर्शनम् • Sacred Guidance
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-brand-charcoal tracking-wide">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-brand-charcoal/70 max-w-lg mx-auto font-light leading-relaxed">
            The path you are seeking may have moved, completed its sacred cycle, or been updated.
            {currentPath && (
              <span className="block mt-1 font-mono text-xs text-brand-charcoal/50">
                Requested: {currentPath}
              </span>
            )}
          </p>
        </div>

        {/* Quick Recovery Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left pt-4">
          <Link
            href="/puja"
            className="p-5 rounded-xl border border-brand-gold/20 bg-white/70 hover:bg-white hover:border-brand-gold hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-base font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors">
                Puja Seva & Rituals
              </div>
              <p className="text-xs text-brand-charcoal/60 mt-1 leading-relaxed">
                Participate in sacred upcoming pujas on holy rivers & jyotirlingas.
              </p>
            </div>
          </Link>

          <Link
            href="/tools/kundali"
            className="p-5 rounded-xl border border-brand-gold/20 bg-white/70 hover:bg-white hover:border-brand-gold hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-base font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors">
                Free Vedic Kundali
              </div>
              <p className="text-xs text-brand-charcoal/60 mt-1 leading-relaxed">
                Generate and download your complete Vedic birth chart & insights.
              </p>
            </div>
          </Link>

          <Link
            href="/#services"
            className="p-5 rounded-xl border border-brand-gold/20 bg-white/70 hover:bg-white hover:border-brand-gold hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-base font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors">
                Astrology & Vastu Services
              </div>
              <p className="text-xs text-brand-charcoal/60 mt-1 leading-relaxed">
                Explore personalized Vedic astrology, Vastu Shastra & life guidance.
              </p>
            </div>
          </Link>

          <Link
            href="/#journey"
            className="p-5 rounded-xl border border-brand-gold/20 bg-white/70 hover:bg-white hover:border-brand-gold hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-base font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors">
                Book Consultation
              </div>
              <p className="text-xs text-brand-charcoal/60 mt-1 leading-relaxed">
                Schedule a 1-on-1 private consultation with Dharmikshree.
              </p>
            </div>
          </Link>
        </div>

        {/* Home Button */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-brand-charcoal hover:bg-brand-gold text-brand-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-md flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3.5 border border-brand-charcoal/20 hover:border-brand-gold text-brand-charcoal hover:text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Wisdom Journal</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
