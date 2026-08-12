"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Mail, Phone, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";
import KundaliGenerator from "@/components/KundaliGenerator";
import BookingForm from "@/components/BookingForm";

interface AutoplayVideoProps {
  src: string;
  title: string;
  placeholderImage: string;
}

function AutoplayVideo({ src, title, placeholderImage }: AutoplayVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (isInView) {
      const videoIdMatch = src.match(/\/embed\/([^/?]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : "";
      const loopParam = videoId ? `&loop=1&playlist=${videoId}` : "";
      // Removed controls=0 to allow user interaction (play/pause/mute)
      setVideoSrc(`${src}?autoplay=1&mute=1&enablejsapi=1&rel=0${loopParam}`);
    } else {
      setVideoSrc("");
    }
  }, [isInView, src]);

  // Convert embed URL back to Shorts URL for external viewing
  const shortsUrl = src.replace("/embed/", "/shorts/");

  return (
    <div ref={ref} className="relative w-full h-full group">
      {!videoSrc && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={placeholderImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-charcoal/30 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-brand-ivory/10 backdrop-blur-md border border-brand-gold/40 flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[14px] border-l-brand-gold ml-1" />
            </div>
          </div>
        </div>
      )}
      {videoSrc && (
        <>
          <iframe
            src={videoSrc}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {/* External Link Overlay */}
          <a
            href={shortsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 bg-brand-charcoal/90 hover:bg-brand-gold text-brand-ivory hover:text-brand-charcoal text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1.5 rounded-sm border border-brand-gold/25 transition-all duration-300 flex items-center gap-1.5 shadow-md z-20"
          >
            Open YouTube <ExternalLink size={10} />
          </a>
        </>
      )}
    </div>
  );
}

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
      title: "Divine Consultation",
      subtitle: "Face Reading, Horoscope & Palmistry",
      description:
        "Dharmikshree (13th Generation Astrologer, Spiritual Guide & Vastu Consultant) के साथ एक divine consultation, जो Seva Contribution के रूप में लिया जाता है।\n\n• Face Reading – बिना कुछ पूछे, सिर्फ आपका face देखकर personality, strengths, challenges और life direction की guidance\n• Horoscope Reading – Career, Business, Marriage, Relationship, Finance, Health और Life-related questions के answers\n• Palmistry Reading – Hand lines के माध्यम से karmic path, opportunities और life patterns को समझना\n\nOnline & Personal Meeting Available. Includes 1-Week Voice Note Follow-Up Support.",
      price: "₹9,900",
      image: "/assets/dharmik_shree_real.jpg",
      videoUrl: "https://www.youtube.com/embed/a3GEqxyy_jc",
    },
    {
      title: "Marriage Compatibility",
      subtitle: "Astrological, Behavioral & Life Alignment",
      description:
        "Discover long-lasting harmony through a holistic compatibility analysis:\n\n• Astrological Factors – Mangal Dosh, Rahu–Ketu, Nadi, Bhukti, Yoni, Tara, and Gan\n• Behavioral Insights – temperament, emotions, loyalty, love patterns, and family dynamics\n• Life Alignment – luck, lifestyle compatibility, money management, and children-related prospects",
      price: "₹7,200",
      image: "/assets/dharmik_shree_real.jpg",
      videoUrl: "https://www.youtube.com/embed/ZixUk7EruIE",
    },
    {
      title: "Vastu and Space Alignment with Astrology",
      subtitle: "Cosmic VastuShastra & Panch Tatva Balancing",
      description:
        "नमस्कार। आपकी स्पेस यानी आपकी जगह, आपकी प्रॉपर्टी, आपका घर या ऑफिस सिर्फ स्ट्रक्चर नहीं होते। यह आपकी वेल्थ और पीस के फ्लो का रिफ्लेक्शन होता है। हमारी परंपरा हमेशा स्पेस को इनर बैलेंस का एक हिस्सा मानती है। इस वास्तु शास्त्र में हम 10 डायरेक्शन और फाइव एलिमेंट और प्लेनेट तथा पर्सनल एनर्जी को एक साथ अलाइन करते हैं। जब आपकी प्लेस अलाइन होती है तो हेल्थ वेल्थ मनी फ्लो बिजनेस और रिलेशनशिप में नेचुरल ग्रोथ होता है। वास्तुहीनम गृहम शून्यम विदाउट वास्तु देयर इज नो एनर्जी अलाइन स्पेस इंसान को ज्यादा शांत फोकस्ड और स्टेबल करता है। अगर आप अपने घर या वर्क प्लेस को एस्ट्रोलॉजी बैक वास्तु से अलाइन करना चाहते हो तो अपॉइंटमेंट बुक कीजिए धार्मिक श्री के।",
      price: "₹72,000",
      image: "/assets/meditation_detail.png",
      videoUrl: "https://www.youtube.com/embed/d66ctm9hYFI",
    },
    {
      title: "Baby Name Suggestion",
      subtitle: "Sanskrit-Rooted, Modern & Meaningful",
      description:
        "A research-driven, personalized naming process, curated with precision and responsibility—because a child’s name carries lifelong identity, vibration, and direction.\n\n• 10 carefully researched name options (5 + 5)\n• Sanskrit-based, modern in sound, and rare in usage\n• Meaning, Vedic reference, and positive life impact explained\n• Names aligned through Numerology, Nakshatra, and family energy resonance",
      price: "₹9,900",
      image: "/assets/meditation_detail.png",
      videoUrl: "https://www.youtube.com/embed/soyE8amD5-0",
    },
    {
      title: "Premium Business Name Consultation",
      subtitle: "Strategic Brand & Energy Alignment",
      description:
        "A business name is your brand’s energetic identity. We don’t suggest random names—we create names that are strategically aligned for long-term success.\n\nIncludes research into Rashi & Astrology, Panch Tatva (Five Elements), Numerology, Business Nature & Market Positioning, Brand Psychology & Sound Impact, and basic Trademark/Domain availability.",
      price: "₹18,000",
      image: "/assets/dharmik_shree_real.jpg",
    },
    {
      title: "Corporate Astrology & Family Mentorship",
      subtitle: "Conscious Leadership & Aligned Success",
      description:
        "We help leaders, families, and decision-makers transform the way they think, feel, and decide. True solutions in business, relationships, or life emerge only when the mind, energy, and space are aligned.\n\nCovers: Business clarity/growth, leadership alignment & team harmony, office Vastu energy optimization, and family balance.\n\nMonthly Access: 2 private sessions per month (1 hour each) and guidance for up to 2 family members.",
      price: "₹45,000 / month",
      image: "/assets/meditation_detail.png",
      videoUrl: "https://www.youtube.com/embed/y_VSsB0htyI",
    },
    {
      title: "Baby Birth Date & Time Selection",
      subtitle: "Shubh Muhurat Selection",
      description:
        "बच्चे का Birth Date & Time केवल जन्म का समय नहीं होता—यही उसके Destiny, Intelligence, Prosperity और जीवन की दिशा की नींव रखता है। हम कोई भी Random Date Suggest नहीं करते।\n\nहमारा Research 15+ Combinations पर आधारित होता है: Nakshatra (नक्षत्र), Rashi & Moon Sign (राशि), Ascendant (Lagna), व ग्रहों की स्थिति व बल।",
      price: "₹7,200",
      image: "/assets/dharmik_shree_real.jpg",
      videoUrl: "https://www.youtube.com/embed/2mZjXyQBoX8",
    },
    {
      title: "Garbh Sanskar Pregnancy Program",
      subtitle: "9-Month Divine & Scientific Guidance",
      description:
        "“9 months of the mother shape the next 90 years of the child.”\n\n• Guided from Month 3 to Month 9 based on Vedic Astrology, Mantras, Meditation & Psychology\n• Monthly planet-based guidance, mantras, and temple-based monthly Jap\n• Diet, activity & emotional alignment support\n• 7th Month Special Sanskar (3.5 hrs) for spiritual & mental strengthening\n\nMonthly: ₹7,200 | 7th Month Puja: ₹18,000 | Total Program: ₹68,400",
      price: "₹7,200 / month",
      image: "/assets/meditation_detail.png",
      videoUrl: "https://www.youtube.com/embed/itonId2pva4",
    },
  ];


  return (
    <>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center bg-brand-charcoal overflow-hidden">
          {/* Background image with luxury shadow overlay and live animation */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1.02, 1.08, 1.02],
                x: [0, 8, 0],
                y: [0, -6, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="/assets/dharmik_shree_real_hd.jpg"
                alt="Dharmik Shree portrait"
                fill
                sizes="100vw"
                className="object-cover opacity-35 object-center"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-brand-charcoal/20 z-10" />
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
              Dharmikshree is a 13th-generation Vedic Astrologer, Vastu Consultant, and Spiritual Guide, carrying forward a family legacy of more than 300 years of ancient wisdom and spiritual practice.
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
                13th Generation Astrologer &bull; Vastu Consultant &bull; Spiritual Guide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal tracking-wide">
                Dharmikshree
              </h2>
              <div className="space-y-6 text-brand-charcoal/80 font-light leading-relaxed text-sm sm:text-base">
                <p className="text-base sm:text-lg font-normal text-brand-charcoal border-l-2 border-brand-gold pl-4">
                  Dharmikshree is a 13th-generation Vedic Astrologer, Vastu Consultant, and Spiritual Guide, carrying forward a family legacy of more than 300 years of ancient wisdom and spiritual practice.
                </p>
                <p>
                  His approach brings together Vedic Astrology, Vastu Shastra, spiritual wisdom, and modern-day practical guidance, helping individuals, families, entrepreneurs, and business leaders gain greater clarity in important areas of life and decision-making.
                </p>
                <p>
                  Through consultations, spiritual mentoring, and public platforms, Dharmikshree works with people across India and internationally, with a vision of making timeless Indian wisdom relevant and practical for today’s generation.
                </p>
                <p>
                  Beyond consultation, he is passionate about social and spiritual initiatives, including education, children’s development, Gau Seva, temple initiatives, and community welfare.
                </p>
                <div className="pt-6 border-t border-brand-gold/15 mt-6">
                  <p className="italic font-serif text-brand-gold text-lg sm:text-xl leading-relaxed">
                    &ldquo;Ancient Wisdom. Modern Relevance. Meaningful Transformation.&rdquo;
                  </p>
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-bronze font-medium block mt-2">
                    &mdash; Dharmikshree
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Premium Photo Space */}
            <motion.div
              {...fadeInUp}
              className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm border border-brand-gold/15 order-1 lg:order-2 shadow-xl"
            >
              <Image
                src="/assets/dharmik_about.jpg"
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
              Ancient Wisdom. Modern Relevance. <br />
              <span className="italic font-normal text-brand-gold">Meaningful Transformation.</span>
            </motion.h2>
            <motion.p
              {...fadeInUp}
              className="text-brand-ivory/70 font-light leading-relaxed max-w-2xl mx-auto text-sm sm:text-base"
            >
              Modern life is saturated with noise. Dharmikshree guides you to filter the chaos,
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
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="font-serif text-brand-gold text-lg italic font-normal">
                      {service.subtitle}
                    </span>
                    {service.price && (
                      <span className="text-[10px] uppercase tracking-wider bg-brand-gold/10 text-brand-gold font-semibold px-3 py-1 rounded-sm border border-brand-gold/20">
                        Dakshina: {service.price}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-brand-charcoal tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-brand-charcoal/70 font-light leading-relaxed text-sm sm:text-base whitespace-pre-line">
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
                  className={`lg:col-span-6 flex justify-center items-center w-full ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  {service.videoUrl ? (
                    <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-md border border-brand-gold/20 shadow-2xl bg-brand-charcoal">
                      <AutoplayVideo
                        src={service.videoUrl}
                        title={service.title}
                        placeholderImage={service.image}
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-brand-gold/10 shadow-lg">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 640px"
                        className="object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Generate Free Kundali Section */}
        <section id="free-kundali" className="py-24 md:py-36 px-6 md:px-12 bg-brand-charcoal text-brand-ivory relative overflow-hidden">
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            <div className="text-center space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
                Vedic Astro Calculator
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
                Generate Free Kundali By Dharmik Shree
              </h2>
              <div className="w-16 h-px bg-brand-gold mx-auto mt-6" />
            </div>
            <KundaliGenerator />
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
              className="pt-6 max-w-2xl mx-auto text-left"
            >
              <BookingForm />
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
            "name": "Dharmikshree",
            "url": "https://www.dharmikshree.org",
            "image": "https://www.dharmikshree.org/assets/dharmik_shree_real.jpg",
            "description": "Dharmikshree is a 13th-generation Vedic Astrologer, Vastu Consultant, and Spiritual Guide, carrying forward a family legacy of more than 300 years of ancient wisdom and spiritual practice.",
            "jobTitle": "13th-generation Vedic Astrologer, Vastu Consultant & Spiritual Guide",
            "knowsAbout": [
              "Vedic Astrology",
              "Vastu Shastra",
              "Spiritual Mentorship",
              "Garbh Sanskar",
              "Kundali Reading",
              "Vedic Wisdom",
              "Ancient Indian Philosophy"
            ]
          })
        }}
      />
      <Footer />
    </>
  );
}
