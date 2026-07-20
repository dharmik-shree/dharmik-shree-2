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
      title: "Spiritual Mentorship",
      subtitle: "For Leaders & Seekers",
      description:
        "A private sanctuary for leaders, families, and individuals navigating transition. We align modern ambitions with timeless spiritual foundations to cultivate enduring inner stillness.",
      image: "/assets/meditation_detail.png",
    },
    {
      title: "Vedic Guidance & Counsel",
      subtitle: "Wisdom Beyond Prediction",
      description:
        "Decoding the subtle blueprints of path and purpose. Uncovering clarity through authentic Vedic lineage study rather than common commercial astrological predictions.",
      image: "/assets/dharmik_shree_real.jpg",
    },
    {
      title: "Vastu Shastra Consultation",
      subtitle: "Harmonizing Sacred Space",
      description:
        "Realigning residential and commercial spatial layouts to optimize natural energy flows. Experience Aman Resorts-like energetic balance in your personal spaces.",
      image: "/assets/meditation_detail.png",
    },
    {
      title: "Garbh Sanskar Guidance",
      subtitle: "Nurturing Future Generations",
      description:
        "Vedic spiritual practices and mindful alignment for expectant parents, inviting elevated consciousness into the journey of childbirth.",
      image: "/assets/dharmik_shree_real.jpg",
    },
    {
      title: "Vedic Rituals & Pujas",
      subtitle: "Auspicious Energetic Alignments",
      description:
        "Conduction of authentic, heritage rituals designed to purify spaces, ease energetic transitions, and invoke divine blessings for homes and enterprises.",
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
              className="text-xs uppercase tracking-[0.4em] text-brand-gold mb-6 block font-medium"
            >
              Vedic Guide & Spiritual Mentor
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.05em] leading-tight max-w-5xl mb-8"
            >
              Ancient Wisdom For <br />
              <span className="italic font-normal text-brand-gold">Modern Lives</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-sm md:text-base font-light text-brand-ivory/70 max-w-xl mb-12 tracking-wide leading-relaxed"
            >
              Helping visionary individuals, families, and leaders find absolute clarity and alignment through timeless Vedic guidance.
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
                Book Consultation
              </a>
              <a
                href="#about"
                className="inline-block text-xs uppercase tracking-[0.2em] border border-brand-ivory/30 text-brand-ivory hover:border-brand-gold hover:text-brand-gold px-8 py-4 font-semibold transition-all duration-300 rounded-sm"
              >
                Explore Teachings
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
                The Heritage of Wisdom
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal tracking-wide">
                Who is Dharmik Shree?
              </h2>
              <div className="space-y-6 text-brand-charcoal/80 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Dharmik Shree represents a lineage of authentic Vedic practices,
                  carrying forward ancient Indian wisdom customized for the complex
                  realities of modern life.
                </p>
                <p>
                  Rather than functioning as a conventional predictive astrologer,
                  he acts as a Spiritual Guide and Mentor to visionaries, business
                  families, and seekers worldwide. His methodology is rooted in Dharma,
                  offering clarity over simple fortune-telling, and alignment over superstition.
                </p>
                <p className="italic font-serif text-brand-bronze text-base">
                  &ldquo;A path is not predicted; it is aligned through wisdom, intent, and conscious action.&rdquo;
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
        <section id="testimonials" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
              Voices of Seekers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal tracking-wide">
              Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Written Testimonial Quote */}
            <motion.div {...fadeInUp} className="space-y-8">
              <span className="text-brand-gold font-serif text-6xl block select-none">&ldquo;</span>
              <p className="font-serif italic text-lg md:text-xl text-brand-charcoal/90 leading-relaxed">
                Working with Dharmik Shree completely transformed the path of our family enterprise.
                His guidance is grounded in practical truth, offering absolute clarity in moments of complexity.
                He does not sell predictions; he restores alignment.
              </p>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
                  Vikram Malhotra
                </p>
                <p className="text-xs text-brand-charcoal/50 uppercase tracking-widest">
                  Industrialist & Philanthropist
                </p>
              </div>
            </motion.div>

            {/* Video Testimonial / Elegant Cover Image */}
            <motion.div
              {...fadeInUp}
              className="relative aspect-video w-full overflow-hidden border border-brand-gold/15 rounded-sm shadow-xl bg-brand-charcoal group"
            >
              <Image
                src="/assets/meditation_detail.png"
                alt="Testimonial Video Cover"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-16 h-16 rounded-full bg-brand-ivory text-brand-charcoal flex items-center justify-center hover:bg-brand-gold hover:text-brand-ivory transition-colors duration-300 shadow-lg"
                  aria-label="Play video testimonial"
                >
                  <span className="ml-1">&#9658;</span>
                </button>
              </div>
            </motion.div>
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
