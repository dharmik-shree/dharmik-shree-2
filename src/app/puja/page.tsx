import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Calendar, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Flame, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPujas } from "@/lib/pujaData";

export const metadata: Metadata = {
  title: "Vedic Puja Seva & Online Sankalp | Dharmik Shree",
  description:
    "Book authentic Vedic pujas and rituals performed at India's holiest pilgrimage shrines. Qualified purohits recite your Name and Gotra with complete live stream and video proof.",
};

export default async function PujaCatalogPage() {
  const pujas = await getAllPujas();

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal">
      <Header />

      <main className="flex-grow pt-28 md:pt-36 pb-20">
        {/* Page Hero Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-widest font-semibold">
              <Sparkles size={14} /> Divine Teerth Seva
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-charcoal tracking-wide">
              Online Vedic <span className="italic text-brand-gold font-normal">Puja Seva</span>
            </h1>
            <p className="text-brand-charcoal/70 font-light text-sm sm:text-base leading-relaxed">
              Sacred rituals performed on your behalf by authenticated Purohits at consecrated Teerth Kshetras.
              Devotees receive individualized Sankalp with Name & Gotra chanting, uncut WhatsApp video recordings, and consecrated Prasad delivered to their doorstep.
            </p>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto pt-6 border-t border-brand-gold/20 text-xs text-brand-charcoal/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
              <span>Personalized Gotra & Name Sankalp</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
              <span>Full Video Proof on WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
              <span>Live Streaming on Puja Day</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
              <span>Doorstep Consecrated Prasad</span>
            </div>
          </div>
        </section>

        {/* Puja List Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-gold/15">
            <h2 className="font-serif text-2xl font-light text-brand-charcoal flex items-center gap-2">
              <Flame size={20} className="text-brand-gold" /> Available Online Pujas
            </h2>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">
              {pujas.length} Sacred Events Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pujas.map((puja) => {
              const eventDate = new Date(puja.event_date);
              const formattedDate = eventDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={puja.id}
                  className="group bg-white rounded-md border border-brand-gold/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Banner Image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={puja.banner_image_url}
                        alt={puja.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 bg-brand-charcoal/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-brand-gold/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-wider text-brand-ivory font-medium">
                          Live Stream
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-brand-ivory">
                        <span className="text-xs font-medium flex items-center gap-1 text-brand-gold">
                          <MapPin size={12} /> {puja.location_name}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      {puja.tithi_details && (
                        <div className="text-[11px] font-medium uppercase tracking-wider text-brand-bronze bg-brand-gold/10 px-2.5 py-1 rounded inline-block">
                          {puja.tithi_details}
                        </div>
                      )}

                      <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium group-hover:text-brand-gold transition-colors leading-snug">
                        {puja.title}
                      </h3>

                      <p className="text-brand-charcoal/70 text-xs sm:text-sm font-light line-clamp-2 leading-relaxed">
                        {puja.short_description || puja.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-brand-charcoal/5 text-xs text-brand-charcoal/80">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-brand-gold" />
                          <span>Event Date: <strong className="font-medium text-brand-charcoal">{formattedDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={13} className="text-brand-gold" />
                          <span>Packages: Single, Couple & Family Groups</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-brand-charcoal/60 tracking-wider block">
                          Dakshina
                        </span>
                        <span className="font-serif text-xl font-bold text-brand-gold">
                          ₹{puja.starting_price} <span className="text-xs font-normal text-brand-charcoal/60">onwards</span>
                        </span>
                      </div>

                      <Link
                        href={`/puja/${puja.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-charcoal hover:bg-brand-gold text-brand-ivory hover:text-brand-charcoal text-xs uppercase tracking-widest font-semibold transition-all rounded-sm cursor-pointer shadow-sm"
                      >
                        Participate <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
