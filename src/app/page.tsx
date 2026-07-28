"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const services = [
    {
      title: "Vedic Astrology Consultation",
      subtitle: "Personalized Kundali & Horary Reading",
      description:
        "Comprehensive life alignment through detailed Kundali analysis, planetary transit readings, and accurate Dasha timing. Uncover answers regarding career, health, finances, and destiny.",
      image: "/assets/dharmik_shree_real.jpg",
    },
    {
      title: "Face Reading & Samudrik Shastra",
      subtitle: "Facial Feature & Intuitive Analysis",
      description:
        "Ancient wisdom of face reading to evaluate hidden personality traits, subconscious patterns, emotional health, and future life tendencies without needing birth details.",
      image: "/assets/meditation_detail.png",
    },
    {
      title: "Relationship & Marriage Counselling",
      subtitle: "Kundali Matching & Emotional Harmony",
      description:
        "Expert astrological matching (Gun Milan, Mangal Dosha check) and compassionate relationship counselling to resolve marital friction, foster deep understanding, and restore family peace.",
      image: "/assets/dharmik_shree_real.jpg",
    },
    {
      title: "Spiritual Mentorship & Guidance",
      subtitle: "For Leaders, Families & Seekers",
      description:
        "Acharya Dharmikshree is a renowned astrologer and spiritual guru from a family that has been practising these arts for generations, offering private spiritual counsel and inner alignment.",
      image: "/assets/meditation_detail.png",
    },
    {
      title: "Vastu Shastra Consultation",
      subtitle: "Harmonizing Residential & Commercial Space",
      description:
        "Realigning residential, corporate, and commercial spatial layouts to optimize natural energy flows and unlock prosperity, peace, and vibrant health.",
      image: "/assets/meditation_detail.png",
    },
    {
      title: "Garbh Sanskar & Family Guidance",
      subtitle: "Nurturing Future Generations",
      description:
        "Vedic spiritual practices and mindful astrological alignment for expectant parents, inviting elevated consciousness into the journey of pregnancy and child development.",
      image: "/assets/dharmik_shree_real.jpg",
    },
    {
      title: "Vedic Rituals & Pujas",
      subtitle: "Auspicious Energetic Alignments",
      description:
        "Conduction of authentic heritage pujas and mantras designed to neutralize planetary afflictions, purify commercial/home spaces, and invoke divine blessings.",
      image: "/assets/meditation_detail.png",
    },
  ];


  return (
    <>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center bg-brand-charcoal overflow-hidden">
          {/* Background image with luxury shadow overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/dharmik_shree_real.jpg"
              alt="Dharmik Shree portrait"
              fill
              sizes="100vw"
              className="object-cover opacity-35 object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
            <div className="absolute inset-0 bg-brand-charcoal/20" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center text-brand-ivory flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-xs uppercase tracking-[0.4em] text-brand-gold mb-6 block font-semibold"
            >
              Astrologer & Spiritual Guide
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.05em] leading-tight max-w-5xl mb-8"
            >
              Vedic Astrology & <br />
              <span className="italic font-normal text-brand-gold">Spiritual Guidance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-sm md:text-base font-light text-brand-ivory/70 max-w-xl mb-12 tracking-wide leading-relaxed"
            >
              Acharya Dharmikshree is a renowned astrologer from a family that has been practising these arts for generations. He is also a spiritual guru offering astrology consultations, Kundali readings, face reading, and relationship counselling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full"
            >
              <a
                href="#journey"
                className="inline-block text-xs uppercase tracking-[0.2em] bg-brand-gold text-brand-charcoal hover:bg-brand-gold-hover hover:text-brand-charcoal px-8 py-4 font-semibold transition-all duration-300 rounded-sm shadow-md"
              >
                Book Astrology Consultation
              </a>
              <a
                href="#services"
                className="inline-block text-xs uppercase tracking-[0.2em] border border-brand-ivory/30 text-brand-ivory hover:border-brand-gold hover:text-brand-gold px-8 py-4 font-semibold transition-all duration-300 rounded-sm"
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ivory/40">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-brand-gold/60"
            >
              <ArrowDown size={14} />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Split Narrative */}
            <motion.div {...fadeInUp} className="space-y-8 order-2 lg:order-1">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
                Astrologer and Spiritual Guide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal tracking-wide">
                Acharya Dharmikshree
              </h2>
              <div className="space-y-6 text-brand-charcoal/80 font-light leading-relaxed text-sm sm:text-base">
                <p className="text-base sm:text-lg font-normal text-brand-charcoal border-l-2 border-brand-gold pl-4">
                  Acharya Dharmikshree is a renowned astrologer from a family that has been practising these arts for generations. He is also a spiritual guru offering guidance to seekers worldwide.
                </p>
                <p>
                  Specializing in authentic Vedic astrology, Kundali analysis, face reading (Samudrik Shastra), spiritual mentorship, Vastu consultation, and relationship counselling, he offers practical solutions and deep karmic clarity.
                </p>
                <p className="italic font-serif text-brand-bronze text-base">
                  &ldquo;A path is aligned through ancient astrological wisdom, spiritual intent, and conscious action.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Premium Photo Space */}
            <motion.div
              {...fadeInUp}
              className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm border border-brand-gold/15 order-1 lg:order-2 shadow-xl"
            >
              <Image
                src="/assets/dharmik_shree_real.jpg"
                alt="Dharmik Shree Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
              />
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section
          id="philosophy"
          className="bg-brand-charcoal text-brand-ivory py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
        >
          {/* Subtle design element */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <motion.span
              {...fadeInUp}
              className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium block"
            >
              Our Core Philosophy
            </motion.span>
            <motion.h2
              {...fadeInUp}
              className="font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight"
            >
              Wisdom Beyond Prediction
            </motion.h2>
            <motion.p
              {...fadeInUp}
              className="text-brand-ivory/70 font-light leading-relaxed max-w-2xl mx-auto text-sm sm:text-base"
            >
              Modern life is saturated with noise. Dharmik Shree guides you to filter the chaos,
              understand the spiritual architecture of your environment (Vastu), align your life principles (Dharma),
              and build structural balance that sustains success.
            </motion.p>

            <motion.div
              {...fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-brand-ivory/10 mt-12"
            >
              <div className="space-y-2">
                <span className="font-serif text-brand-gold text-2xl">Dharma</span>
                <p className="text-xs text-brand-ivory/50 font-light uppercase tracking-wider">
                  Inner Alignment
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-serif text-brand-gold text-2xl">Vastu</span>
                <p className="text-xs text-brand-ivory/50 font-light uppercase tracking-wider">
                  Spatial Harmony
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-serif text-brand-gold text-2xl">Sadhana</span>
                <p className="text-xs text-brand-ivory/50 font-light uppercase tracking-wider">
                  Disciplined Clarity
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-24">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
              Areas of Practice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal tracking-wide">
              Vedic Services
            </h2>
            <div className="w-16 h-px bg-brand-gold mx-auto mt-6" />
          </div>

          <div className="space-y-24 md:space-y-36">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                {...fadeInUp}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    index % 2 === 1 ? "lg:order-2 lg:pl-12" : "lg:pr-12"
                  }`}
                >
                  <span className="font-serif text-brand-gold text-lg italic font-normal">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-brand-charcoal tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-brand-charcoal/70 font-light leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                  <a
                    href="#journey"
                    className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold font-medium hover:text-brand-charcoal transition-colors duration-300 gap-2 border-b border-brand-gold/40 pb-1"
                  >
                    Request Session <ExternalLink size={12} />
                  </a>
                </div>

                <div
                  className={`lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-brand-gold/10 shadow-lg ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Wisdom Journal Section */}
        <section id="journal" className="py-24 md:py-36 bg-brand-charcoal/5 border-t border-b border-brand-gold/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
                  Sacred Knowledge
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal tracking-wide">
                  The Wisdom Journal
                </h2>
              </div>
              <a
                href="/blog"
                className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-brand-gold pb-1 hover:text-brand-charcoal transition-colors duration-300"
              >
                View All Archives &rarr;
              </a>
            </div>
          </div>

          {/* Horizontal Scrolling Marquee Ticker */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="animate-marquee flex gap-8">
              {/* Loop articles multiple times to create a seamless scrolling loop */}
              {[...blogPosts, ...blogPosts, ...blogPosts, ...blogPosts].map((blog, idx) => (
                <article
                  key={`${blog.slug}-${idx}`}
                  className="w-[380px] shrink-0 bg-brand-ivory border border-brand-gold/15 p-8 flex flex-col justify-between h-[320px] shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm"
                >
                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-brand-gold font-medium mb-6">
                      <span>{blog.category}</span>
                      <span className="text-brand-charcoal/40">{blog.readTime}</span>
                    </div>
                    <h3 className="font-serif text-xl text-brand-charcoal font-light leading-snug mb-4 hover:text-brand-gold transition-colors duration-300">
                      <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 font-light leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  <a
                    href={`/blog/${blog.slug}`}
                    className="text-[10px] uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors duration-300 font-semibold pt-4 border-t border-brand-charcoal/5"
                  >
                    Read Article &rarr;
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 md:py-36 bg-brand-charcoal/5 border-t border-b border-brand-gold/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/25 py-1.5 px-4 rounded-full text-xs text-brand-gold font-semibold uppercase tracking-widest">
              <span>★ 4.9 / 5 Rating</span>
              <span className="text-brand-charcoal/30">•</span>
              <span>270+ Verified Google Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal tracking-wide">
              Google Client Testimonials
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal/60 max-w-xl mx-auto font-light leading-relaxed">
              Real experiences from individuals, business owners, and families guided by Acharya Dharmikshree.
            </p>
            <div className="w-16 h-px bg-brand-gold mx-auto mt-4" />
          </div>

          {/* Horizontal Auto-Scrolling Marquee */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="animate-marquee flex gap-8">
              {[
                {
                  quote: "Acharya Dharmikshree guides in such a down-to-earth and perfect way. He answers each and every question with immense patience and provides practical, effective solutions.",
                  name: "Rajesh Patel",
                  location: "Surat, Gujarat",
                  badge: "Google Verified Review"
                },
                {
                  quote: "Very accurate Kundali reading and genuine spiritual guidance. His insights into our family business transition helped us make crucial decisions with absolute confidence.",
                  name: "Vikram Mehta & Family",
                  location: "Business Consultation",
                  badge: "Google Verified Review"
                },
                {
                  quote: "Outstanding Vastu Shastra & Face Reading session! He gives deep karmic clarity rather than fear. Highly recommended for anyone seeking true spiritual guidance.",
                  name: "Ananya Sharma",
                  location: "Mumbai, Maharashtra",
                  badge: "Google Verified Review"
                },
                {
                  quote: "He is a gem of a person. His astrological remedies and Garbh Sanskar guidance during my sister's pregnancy brought immense peace and positive vibes to our home.",
                  name: "Pooja & Jignesh Shah",
                  location: "Surat, Gujarat",
                  badge: "Google Verified Review"
                },
                {
                  quote: "Extremely knowledgeable and polite. Acharya ji analyzed my horoscope so deeply and gave simple daily mantras that brought positive shifts in my career within months.",
                  name: "Hardik Joshi",
                  location: "Ahmedabad, Gujarat",
                  badge: "Google Verified Review"
                },
                {
                  quote: "Authentic Vedic astrology consultation. No unnecessary rituals or fear-mongering; just pure wisdom, scientific Vastu insights, and compassionate life coaching.",
                  name: "Sanjay Singhania",
                  location: "Delhi NCR",
                  badge: "Google Verified Review"
                },
                {
                  quote: "His deep lineage knowledge of Lal Kitab & Vimshottari Dasha helped us navigate our family property matters peacefully. Grateful for his genuine guidance.",
                  name: "Kavita & Nitin Parikh",
                  location: "Vadodara, Gujarat",
                  badge: "Google Verified Review"
                },
                {
                  quote: "Wonderful experience consulting Acharya Dharmikshree. He gives exact remedies that are easy to follow in daily life. My career stress has significantly reduced.",
                  name: "Bhavin Desai",
                  location: "Surat, Gujarat",
                  badge: "Google Verified Review"
                }
              ].map((rev, idx) => (
                <div
                  key={`${rev.name}-${idx}`}
                  className="w-[380px] shrink-0 bg-brand-charcoal text-brand-ivory border border-brand-gold/20 p-8 rounded-sm shadow-xl flex flex-col justify-between h-[280px]"
                >
                  <div className="space-y-4">
                    <div className="flex text-brand-gold text-xs gap-1 font-mono">★★★★★</div>
                    <p className="font-serif italic text-sm text-brand-ivory/90 leading-relaxed font-light line-clamp-4">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-brand-ivory/10 pt-4 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-brand-gold">{rev.name}</p>
                      <p className="text-[10px] text-brand-ivory/50">{rev.location}</p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-brand-gold/15 text-brand-gold rounded border border-brand-gold/30">
                      {rev.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section
          id="journey"
          className="relative py-32 md:py-48 bg-brand-charcoal text-brand-ivory overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/meditation_detail.png"
              alt="Incense trails and sandstone"
              fill
              sizes="100vw"
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-brand-charcoal/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
            <motion.span
              {...fadeInUp}
              className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium block"
            >
              Sanctuary of Clarity
            </motion.span>
            <motion.h2
              {...fadeInUp}
              className="font-serif text-4xl sm:text-6xl font-light tracking-wide"
            >
              Begin Your Journey
            </motion.h2>
            <motion.p
              {...fadeInUp}
              className="text-brand-ivory/60 font-light max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
            >
              Step away from prediction models and towards real guidance. Connect directly to schedule a private Vedic session.
            </motion.p>

            <motion.div
              {...fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-lg mx-auto"
            >
              <a
                href="mailto:dharmikshree.connect@gmail.com?subject=Consultation%20Request"
                className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest bg-brand-gold text-brand-charcoal hover:bg-brand-gold-hover hover:text-brand-charcoal px-6 py-4 font-semibold transition-all duration-300 rounded-sm shadow-md cursor-pointer"
              >
                <Mail size={16} /> Book Session
              </a>
              <a
                href="https://wa.me/919979729764"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest border border-brand-ivory/30 text-brand-ivory hover:border-brand-gold hover:text-brand-gold px-6 py-4 font-semibold transition-all duration-300 rounded-sm cursor-pointer"
              >
                WhatsApp
              </a>
              <a
                href="tel:+919979729764"
                className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest border border-brand-ivory/30 text-brand-ivory hover:border-brand-gold hover:text-brand-gold px-6 py-4 font-semibold transition-all duration-300 rounded-sm cursor-pointer"
              >
                Call Directly
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dharmik Shree",
            "url": "https://www.dharmikshree.org",
            "image": "https://www.dharmikshree.org/assets/dharmik_shree_real.jpg",
            "description": "Revered Spiritual Mentor, Vedic Guide, and Teacher for leaders, entrepreneurs, and families.",
            "jobTitle": "Spiritual Mentor & Vedic Guide",
            "knowsAbout": [
              "Vedic Wisdom",
              "Spiritual Mentorship",
              "Vastu Shastra Guidance",
              "Garbh Sanskar",
              "Astrology Consultation",
              "Ancient Indian Philosophy"
            ]
          })
        }}
      />
      <Footer />
    </>
  );
}
