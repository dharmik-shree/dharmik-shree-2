export interface CityPillarData {
  slug: string;
  cityName: string;
  stateName: string;
  pageTitle: string;
  metaDescription: string;
  heroBadge: string;
  headline: string;
  subheadline: string;
  localityAreas: string[];
  specialties: {
    title: string;
    description: string;
    icon: string;
  }[];
  whyChooseUs: string[];
  localContext: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  consultationTypes: {
    type: string;
    badge: string;
    description: string;
  }[];
}

export const CITY_PILLARS: Record<string, CityPillarData> = {
  surat: {
    slug: "astrologer-in-surat",
    cityName: "Surat",
    stateName: "Gujarat",
    pageTitle: "Best Astrologer in Surat | 13th-Gen Vedic Astrologer Dharmikshree",
    metaDescription:
      "Looking for the best astrologer in Surat? Consult Acharya Dharmikshree, 13th-generation Vedic astrologer & Vastu consultant with 300+ yrs family lineage. In-person & online consultations.",
    heroBadge: "Surat's Most Trusted Vedic Sanctuary",
    headline: "Best Vedic Astrologer & Vastu Consultant in Surat",
    subheadline:
      "Bringing authentic 300-year-old Vedic lineage wisdom to individuals, families, and business leaders across Surat on the sacred banks of River Tapi.",
    localityAreas: [
      "Vesu",
      "Athwa Lines",
      "Piplod",
      "Adajan",
      "City Light",
      "Pal",
      "Varachha",
      "Katargam",
      "Ghod Dod Road",
      "Althan",
      "Rander",
    ],
    specialties: [
      {
        title: "Textile & Diamond Business Astrology",
        description:
          "Strategic planetary timing for inventory expansion, trade partnerships, cash flow stability, and investment muhurats tailored for Surat's entrepreneurs.",
        icon: "Briefcase",
      },
      {
        title: "Kundali Milan & Relationship Harmony",
        description:
          "Comprehensive horoscope matching, Manglik dosh analysis, and guidance for marital understanding based on ancient Vedic scriptures.",
        icon: "HeartHandshake",
      },
      {
        title: "Vastu Shastra for Homes & Commercial Spaces",
        description:
          "Scientific Vastu energy audit for bungalows, luxury apartments, textile markets, and diamond offices without structural demolition.",
        icon: "Home",
      },
      {
        title: "Pitru Shanti & Holy Tapi River Pujas",
        description:
          "Sacred Pitru Tarpana, Pind Daan, and Navagraha Havan conducted along the holy banks of Tapi river by authenticated Purohits.",
        icon: "Flame",
      },
    ],
    whyChooseUs: [
      "13th-generation lineage carrying over 300 years of unbroken spiritual heritage",
      "Over 15,000+ consultations across Gujarat, India, and 24+ countries worldwide",
      "Pure Vedic approach emphasizing ethical choices, clarity, and non-fear-based remedies",
      "Direct in-person sanctuary sessions in Surat as well as high-definition video calls",
      "Transparent guidance with no unnecessary fear-mongering or commercial rituals",
    ],
    localContext:
      "Surat, renowned as the commercial gem of Gujarat and blessed by the divine waters of Surya-putri River Tapi, is home to Acharya Dharmikshree's core sanctuary. Devotees and business families from Vesu to Athwa Lines consult Dharmikshree for practical, ethical Vedic solutions that align modern aspirations with cosmic dharma.",
    faqs: [
      {
        question: "How can I book an in-person astrology consultation in Surat?",
        answer:
          "You can fill out the booking form on this page or message us directly via WhatsApp at +91 91730 08182. Our sanctuary team will schedule your private 1-on-1 session with Acharya Dharmikshree.",
      },
      {
        question: "Do you offer Vastu visits for factories and homes in Surat?",
        answer:
          "Yes. Acharya Dharmikshree conducts on-site Vastu inspections for luxury residences, diamond units, textile offices, and plots across Surat, Vesu, Hazira, and surrounding areas.",
      },
      {
        question: "What information is needed for a birth chart reading?",
        answer:
          "Your exact Date of Birth, Time of Birth, and Place of Birth are required. If exact birth time is uncertain, Prashna Kundali (Horary Astrology) can also be utilized.",
      },
      {
        question: "Are online video consultations as effective as in-person visits?",
        answer:
          "Absolutely. Online video consultations are conducted with equal depth, providing uncut screen-share analysis, personal planetary remedy recommendations, and digital Kundali reports.",
      },
    ],
    consultationTypes: [
      {
        type: "Private Sanctuary Session (Surat)",
        badge: "In-Person",
        description: "Intimate 45-minute 1-on-1 consultation at our Surat spiritual center.",
      },
      {
        type: "HD Video Call (Google Meet / Zoom)",
        badge: "Online Global",
        description: "Convenient face-to-face video consultation from the comfort of your home.",
      },
      {
        type: "Vastu Energy Site Audit (Surat)",
        badge: "On-Site Visit",
        description: "Comprehensive directional, energy, and elemental analysis of your property.",
      },
    ],
  },

  mumbai: {
    slug: "astrologer-in-mumbai",
    cityName: "Mumbai",
    stateName: "Maharashtra",
    pageTitle: "Best Astrologer in Mumbai | Consult Acharya Dharmikshree",
    metaDescription:
      "Consult Acharya Dharmikshree, top Vedic astrologer & Vastu guide in Mumbai. Trusted for career, corporate leadership, marriage Kundali matching & apartment Vastu.",
    heroBadge: "Authentic Vedic Wisdom for Mumbai",
    headline: "Renowned Vedic Astrologer & Vastu Consultant in Mumbai",
    subheadline:
      "Guiding high-paced professionals, entrepreneurs, and families across Mumbai with deep planetary clarity, ethical remedies, and life direction.",
    localityAreas: [
      "South Mumbai",
      "Bandra",
      "Juhu",
      "Andheri",
      "Worli",
      "Powai",
      "Thane",
      "Navi Mumbai",
      "Borivali",
      "Malabar Hill",
      "BKC",
    ],
    specialties: [
      {
        title: "Career Transitions & Financial Astrology",
        description:
          "Clarity on promotion cycles, overseas relocation, equity investments, and business pivots in competitive corporate landscapes.",
        icon: "TrendingUp",
      },
      {
        title: "High-Rise Apartment Vastu Shastra",
        description:
          "Practical non-demolition remedies for modern Mumbai high-rises, balancing entrances, master bedrooms, and home temples.",
        icon: "Building2",
      },
      {
        title: "Relationship & Marital Compatibility",
        description:
          "In-depth Ashtakoot matching and Bhakoot/Nadi dosh analysis for couples balancing modern lifestyles with traditional values.",
        icon: "HeartHandshake",
      },
      {
        title: "Stress & Planetary Remedies (Navagraha)",
        description:
          "Sattvic remedies, personalized mantra sadhana, and gemstone recommendations to soothe Saturn Sade Sati, Rahu Mahadasha, and mental anxiety.",
        icon: "Sparkles",
      },
    ],
    whyChooseUs: [
      "300+ year family lineage of Vedic scholars providing genuine, non-superstitious counsel",
      "Trusted by corporate CXOs, creatives, and families across Bandra, BKC, and South Mumbai",
      "Deep understanding of modern urban challenges: work-life balance, delays in marriage, and career pivots",
      "Private, confidential, and judgment-free consultation environment",
    ],
    localContext:
      "Mumbai's relentless energy demands psychological resilience and spiritual clarity. Acharya Dharmikshree regularly consults clients across Mumbai, helping leaders navigate planetary cycles of Saturn and Rahu with conscious decision-making rather than fatalistic fear.",
    faqs: [
      {
        question: "How do Mumbai clients consult Acharya Dharmikshree?",
        answer:
          "Most Mumbai clients schedule 1-on-1 private video consultations via Google Meet. In-person sanctuary appointments in Gujarat are also available by advance reservation.",
      },
      {
        question: "Can Vastu remedies be applied to a Mumbai rental flat?",
        answer:
          "Yes. Our Vastu guidance focuses on elemental balance (color therapy, metal strips, salt purifications, and furniture alignment) requiring zero structural changes.",
      },
      {
        question: "How does Vedic astrology help with corporate career decisions?",
        answer:
          "By analyzing the 10th house (Karma Bhava), planetary dasha rulers, and transit periods, we identify auspicious windows for job changes, startup launches, or negotiations.",
      },
    ],
    consultationTypes: [
      {
        type: "Private Video Consultation",
        badge: "High-Definition Online",
        description: "Detailed 45-minute session with full Kundali walkthrough and recording notes.",
      },
      {
        type: "Executive Career & Wealth Reading",
        badge: "Specialized",
        description: "Focused analysis of business partnerships, investments, and professional milestones.",
      },
      {
        type: "Mumbai Flat Vastu Blueprint Review",
        badge: "Remote Audit",
        description: "Submit your architectural floor plan for complete directional and energetic evaluation.",
      },
    ],
  },

  bangalore: {
    slug: "astrologer-in-bangalore",
    cityName: "Bangalore",
    stateName: "Karnataka",
    pageTitle: "Best Vedic Astrologer in Bangalore | Career & Kundali Guidance",
    metaDescription:
      "Consult Acharya Dharmikshree, trusted Vedic astrologer for Bangalore tech leaders, startup founders & young couples. Career, marriage, and Vastu consultations.",
    heroBadge: "Vedic Science Meets Modern Clarity",
    headline: "Leading Vedic Astrologer & Life Guide in Bangalore",
    subheadline:
      "Empowering tech visionaries, startup founders, and modern families across Bengaluru with time-tested Vedic astrological insights.",
    localityAreas: [
      "Indiranagar",
      "Koramangala",
      "Whitefield",
      "HSR Layout",
      "Jayanagar",
      "JP Nagar",
      "Electronic City",
      "Malleshwaram",
      "Bellandur",
      "Hebbal",
    ],
    specialties: [
      {
        title: "Tech Career & Startup Astrology",
        description:
          "Planetary timings for funding rounds, career pivots to AI/tech leadership, overseas L1/H1B prospects, and workplace politics remedies.",
        icon: "Cpu",
      },
      {
        title: "Modern Relationship & Kundali Milan",
        description:
          "Compassionate pre-marital compatibility analysis honoring emotional temperament, intellectual chemistry, and life goals.",
        icon: "HeartHandshake",
      },
      {
        title: "Rahu-Ketu & Sade Sati Alleviation",
        description:
          "Practical spiritual practices to navigate intense transformation cycles, burnout, and career restlessness.",
        icon: "Compass",
      },
      {
        title: "Vastu for Tech Workspaces & Homes",
        description:
          "Harmonizing residential villas and modern office layouts in Bangalore to optimize focus, restful sleep, and positive cashflow.",
        icon: "Home",
      },
    ],
    whyChooseUs: [
      "Rational, intellectual approach to Vedic Astrology appreciated by engineers and analytical minds",
      "13 generations of heritage translated into actionable, modern life guidance",
      "Direct guidance from Acharya Dharmikshree without junior assistants or generic software reports",
      "High confidentiality and seamless online booking",
    ],
    localContext:
      "Bangalore's dynamic innovation ecosystem attracts ambitious individuals seeking conscious direction. Acharya Dharmikshree provides tech leaders and professionals with structured astrological analysis that clarifies options rather than creating dependency.",
    faqs: [
      {
        question: "Can astrology predict the right time to launch a startup in Bangalore?",
        answer:
          "Yes. By reviewing the 3rd, 9th, and 11th houses along with Jupiter and Mercury transits, we pinpoint favorable muhurats to incorporate companies or seek investor capital.",
      },
      {
        question: "Do you offer consultations in English and Hindi?",
        answer:
          "Yes, consultations are conducted fluently in English, Hindi, and Gujarati based on your preference.",
      },
      {
        question: "How soon can I schedule an appointment?",
        answer:
          "Sessions can typically be scheduled within 24 to 48 hours. Priority slots are available for time-sensitive career or marriage decisions.",
      },
    ],
    consultationTypes: [
      {
        type: "Comprehensive Life & Career Reading",
        badge: "Online Video",
        description: "Full horoscope deep-dive covering career, wealth, health, and spiritual evolution.",
      },
      {
        type: "Kundali Milan for Couples",
        badge: "Marriage Special",
        description: "Detailed dual-chart examination with practical harmony and planetary guidance.",
      },
      {
        type: "Startup Muhurat & Founder Compatibility",
        badge: "Business",
        description: "Selecting optimal registration dates and co-founder astrological alignment.",
      },
    ],
  },
};
