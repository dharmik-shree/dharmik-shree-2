"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Users } from "lucide-react";
import { Puja } from "@/types/puja";

interface PujaBannerSliderProps {
  pujas: Puja[];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(endDateStr: string): TimeLeft {
  const difference = new Date(endDateStr).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export default function PujaBannerSlider({ pujas }: PujaBannerSliderProps) {
  const featuredPujas = pujas.filter((p) => p.is_featured && p.is_active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  const activePuja = featuredPujas[currentIndex] || featuredPujas[0];

  useEffect(() => {
    if (!activePuja) return;

    setTimeLeft(calculateTimeLeft(activePuja.enrollment_end_date));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(activePuja.enrollment_end_date));
    }, 1000);

    return () => clearInterval(timer);
  }, [activePuja]);

  // Auto advance slide every 7 seconds
  useEffect(() => {
    if (featuredPujas.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPujas.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredPujas.length]);

  if (!activePuja) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPujas.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPujas.length) % featuredPujas.length);
  };

  return (
    <section className="relative w-full bg-brand-charcoal text-brand-ivory overflow-hidden border-y border-brand-gold/20 py-12 md:py-16">
      {/* Background ambient gold aura */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-burgundy/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles size={14} className="animate-spin-slow" /> Upcoming Live Puja Seva
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-brand-ivory font-light tracking-wide">
              Sacred Rituals & <span className="italic text-brand-gold font-normal">Vedic Sankalp</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/puja"
              className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors flex items-center gap-1.5"
            >
              View All Pujas <ArrowRight size={14} />
            </Link>

            {featuredPujas.length > 1 && (
              <div className="hidden sm:flex items-center gap-2 ml-4">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-ivory/80 hover:text-brand-gold hover:border-brand-gold transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-ivory/80 hover:text-brand-gold hover:border-brand-gold transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Sliding Banner Card */}
        <div className="relative rounded-lg overflow-hidden bg-brand-charcoal/80 border border-brand-gold/30 shadow-2xl backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePuja.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Image with overlay */}
              <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[320px] w-full overflow-hidden">
                <Image
                  src={activePuja.banner_image_url}
                  alt={activePuja.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-brand-charcoal/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-brand-gold/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-wider text-brand-ivory font-medium">Live Streamed</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-brand-ivory/90 font-light flex items-center gap-1.5">
                    <Users size={14} className="text-brand-gold" />
                    <span>Over 5,000+ Devotees joined our Teerth Pujas</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Puja Details & Countdown */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-brand-gold font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {activePuja.location_name}
                    </span>
                    {activePuja.tithi_details && (
                      <>
                        <span>•</span>
                        <span>{activePuja.tithi_details}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-ivory font-normal leading-tight mb-3">
                    {activePuja.title}
                  </h3>

                  <p className="text-brand-ivory/70 text-sm md:text-base font-light line-clamp-3 leading-relaxed mb-6">
                    {activePuja.short_description || activePuja.description}
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-brand-ivory/5 border border-brand-gold/25 rounded-md p-4">
                  <div className="flex items-center justify-between mb-3 text-xs text-brand-ivory/75 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 font-medium text-brand-gold">
                      <Clock size={14} /> Enrollment Closing Soon:
                    </span>
                    <span className="text-brand-ivory/50">Live Pandit Sankalp</span>
                  </div>

                  {timeLeft.isExpired ? (
                    <div className="text-amber-400 font-medium text-sm py-1">
                      Enrollment for this batch has closed. Next batch announcement shortly.
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-brand-charcoal/90 border border-brand-gold/20 rounded py-2">
                        <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                          {String(timeLeft.days).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase text-brand-ivory/60 tracking-wider">Days</span>
                      </div>
                      <div className="bg-brand-charcoal/90 border border-brand-gold/20 rounded py-2">
                        <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase text-brand-ivory/60 tracking-wider">Hours</span>
                      </div>
                      <div className="bg-brand-charcoal/90 border border-brand-gold/20 rounded py-2">
                        <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase text-brand-ivory/60 tracking-wider">Mins</span>
                      </div>
                      <div className="bg-brand-charcoal/90 border border-brand-gold/20 rounded py-2">
                        <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-gold">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase text-brand-ivory/60 tracking-wider">Secs</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-brand-gold/15">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-ivory/60 block">Sankalp Dakshina</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold">
                        ₹{activePuja.starting_price}
                      </span>
                      <span className="text-xs text-brand-ivory/60">onwards</span>
                    </div>
                  </div>

                  <Link
                    href={`/puja/${activePuja.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-gold text-brand-charcoal hover:bg-brand-gold-hover font-semibold text-xs uppercase tracking-[0.2em] transition-all rounded-sm shadow-lg hover:shadow-brand-gold/20 cursor-pointer"
                  >
                    Select Puja Package <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators for Mobile / Dots */}
          {featuredPujas.length > 1 && (
            <div className="flex justify-center gap-2 py-3 bg-brand-charcoal/90 border-t border-brand-gold/10">
              {featuredPujas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === idx ? "w-6 bg-brand-gold" : "w-2 bg-brand-ivory/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
