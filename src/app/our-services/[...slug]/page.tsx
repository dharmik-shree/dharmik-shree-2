import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Flame,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Helper to format slug to human readable words
function formatSlugWord(word: string): string {
  return word
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// Parse slug into Service & City
function parseLocationSlug(slugParts: string[]) {
  const fullSlug = slugParts.join("-").toLowerCase();

  let serviceName = "Vedic Astrology & Puja Services";
  let serviceKey = "divine_consultation";
  let cityName = "Your City";

  if (fullSlug.includes("-in-")) {
    const [servicePart, cityPart] = fullSlug.split("-in-");
    cityName = formatSlugWord(cityPart);

    if (servicePart.includes("puja") || servicePart.includes("ritual")) {
      serviceName = "Vedic Puja & Ritual Services";
      serviceKey = "mahapuja_booking";
    } else if (servicePart.includes("relationship") || servicePart.includes("kundali")) {
      serviceName = "Kundali Milan & Relationship Consulting";
      serviceKey = "kundali_matching";
    } else if (servicePart.includes("vastu")) {
      serviceName = "Vastu Shastra Consultation";
      serviceKey = "vastu_residential";
    } else if (servicePart.includes("consulting") || servicePart.includes("astrologer")) {
      serviceName = "Vedic Astrology & Life Guidance";
      serviceKey = "divine_consultation";
    }
  } else {
    // Fallback if no "-in-"
    cityName = formatSlugWord(slugParts[slugParts.length - 1]);
    serviceName = "Vedic Astrology & Puja Consulting";
  }

  return { serviceName, serviceKey, cityName, fullSlug };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { serviceName, cityName, fullSlug } = parseLocationSlug(slug);

  const title = `${serviceName} in ${cityName} | Acharya Dharmikshree`;
  const description = `Looking for authentic ${serviceName.toLowerCase()} in ${cityName}? Consult 13th-generation Vedic astrologer & spiritual guide Acharya Dharmikshree. In-person & online video consultations.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.dharmikshree.org/our-services/${fullSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.dharmikshree.org/our-services/${fullSlug}`,
      siteName: "Dharmik Shree",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      `${serviceName} in ${cityName}`,
      `Best Astrologer in ${cityName}`,
      `Puja Services ${cityName}`,
      `Pandit in ${cityName}`,
      `Dharmikshree ${cityName}`,
      `Online Puja ${cityName}`,
    ],
  };
}

export default async function LocationServiceCatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const { serviceName, serviceKey, cityName, fullSlug } = parseLocationSlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${serviceName} in ${cityName}`,
        provider: {
          "@type": "Person",
          name: "Acharya Dharmikshree",
          url: "https://www.dharmikshree.org",
          description: "13th-Generation Vedic Astrologer and Spiritual Guide.",
        },
        areaServed: {
          "@type": "City",
          name: cityName,
        },
        url: `https://www.dharmikshree.org/our-services/${fullSlug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Can residents of ${cityName} consult Acharya Dharmikshree online?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes, devotees and clients across ${cityName} consult Acharya Dharmikshree via high-definition Google Meet and Zoom video calls with full screen-share chart analysis.`,
            },
          },
          {
            "@type": "Question",
            name: `How do I book ${serviceName.toLowerCase()} for my family in ${cityName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Simply submit the booking form on this page or message us on WhatsApp at +91 91730 08182. Our sanctuary team will schedule your consultation or ritual promptly.`,
            },
          },
        ],
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-[0.25em] font-medium animate-fade-in">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Sacred Guidance for {cityName}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-ivory leading-tight tracking-wide max-w-4xl mx-auto">
              {serviceName} in {cityName}
            </h1>

            <p className="text-brand-ivory/80 font-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed pt-2">
              Bringing 300 years of unbroken Vedic lineage wisdom, authentic rituals, and compassionate life counsel to devotees and seekers in {cityName}.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#booking-section"
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                Book Consultation in {cityName} <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/919173008182?text=Namaste%20Acharya%20Dharmikshree,%20I%20am%20inquiring%20about%20${encodeURIComponent(
                  serviceName
                )}%20in%20${encodeURIComponent(cityName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-brand-ivory/10 border border-brand-gold/40 text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold" />
                WhatsApp Direct Chat
              </a>
            </div>

            {/* TRUST STRIP */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-gold/20 text-center">
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">13th Gen</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Ancestral Lineage</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">300+ Years</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Vedic Tradition</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">Online & Remote</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Global Access</p>
              </div>
              <div className="p-3">
                <p className="font-serif text-2xl md:text-3xl font-light text-brand-gold">4.9 / 5.0</p>
                <p className="text-xs uppercase tracking-widest text-brand-ivory/60 mt-1">Devotee Trust</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE DETAILS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Authentic Tradition
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal">
                Dedicated Vedic Counsel for {cityName}
              </h2>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <div className="space-y-4 text-brand-charcoal/80 text-base leading-relaxed font-light">
              <p>
                Whether you are seeking clarity on career crossroads, navigating complex family or marital decisions, or wishing to perform sacred Vedic rituals (such as Pitru Shanti, Navagraha Havan, or Rudrabhishek), Acharya Dharmikshree offers personalized, non-superstitious guidance rooted in authentic Parashari and Jaimini astrology.
              </p>
              <p>
                Residents of {cityName} can consult directly via scheduled high-definition video calls or book sacred Vedic Pujas conducted with individual Gotra and Name sankalp along holy tirthas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="p-6 bg-brand-ivory/30 border border-brand-gold/20 rounded-sm space-y-2 text-center">
                <ShieldCheck className="w-8 h-8 text-brand-gold mx-auto" />
                <h3 className="font-serif text-lg font-medium text-brand-charcoal">100% Confidential</h3>
                <p className="text-xs text-brand-charcoal/70 font-light">Private 1-on-1 consultations without third-party exposure.</p>
              </div>
              <div className="p-6 bg-brand-ivory/30 border border-brand-gold/20 rounded-sm space-y-2 text-center">
                <Flame className="w-8 h-8 text-brand-gold mx-auto" />
                <h3 className="font-serif text-lg font-medium text-brand-charcoal">Pure Vedic Rituals</h3>
                <p className="text-xs text-brand-charcoal/70 font-light">Strict scriptural methods, pure cow ghee, and certified mantras.</p>
              </div>
              <div className="p-6 bg-brand-ivory/30 border border-brand-gold/20 rounded-sm space-y-2 text-center">
                <Sparkles className="w-8 h-8 text-brand-gold mx-auto" />
                <h3 className="font-serif text-lg font-medium text-brand-charcoal">Actionable Remedies</h3>
                <p className="text-xs text-brand-charcoal/70 font-light">Sattvic, practical guidance without fear or costly rituals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EMBEDDED CRM LEAD ENGINE */}
        <section id="booking-section" className="py-20 px-6 md:px-12 bg-brand-ivory">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
                Direct Booking
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-charcoal">
                Book Consultation in {cityName}
              </h2>
              <p className="text-brand-charcoal/70 text-sm max-w-xl mx-auto font-light">
                Submit your details below to schedule your session. Our team will contact you via WhatsApp within 24 hours to confirm your appointment time.
              </p>
              <div className="w-12 h-px bg-brand-gold/50 mx-auto" />
            </div>

            <BookingForm defaultService={serviceKey} />
          </div>
        </section>

        {/* LOCATION EXPLORER PILLARS */}
        <section className="py-12 px-6 md:px-12 bg-white border-t border-brand-gold/10 text-xs">
          <div className="max-w-5xl mx-auto space-y-6">
            <h3 className="uppercase tracking-[0.2em] text-brand-gold font-semibold text-center">
              Explore Our Core Sanctuaries & Services
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/astrologer-in-surat"
                className="px-4 py-2 rounded-sm bg-brand-ivory border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Astrologer in Surat
              </a>
              <a
                href="/astrologer-in-mumbai"
                className="px-4 py-2 rounded-sm bg-brand-ivory border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Astrologer in Mumbai
              </a>
              <a
                href="/astrologer-in-bangalore"
                className="px-4 py-2 rounded-sm bg-brand-ivory border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Astrologer in Bangalore
              </a>
              <a
                href="/puja-ritual-services"
                className="px-4 py-2 rounded-sm bg-brand-ivory border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Vedic Puja & Ritual Services
              </a>
              <a
                href="/relationship-consulting"
                className="px-4 py-2 rounded-sm bg-brand-ivory border border-brand-gold/20 text-brand-charcoal/80 hover:border-brand-gold transition-colors"
              >
                Relationship Consulting
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
