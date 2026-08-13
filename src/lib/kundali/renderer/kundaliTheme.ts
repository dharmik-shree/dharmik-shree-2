// Dharmik Shree Design Tokens & Theme Configuration for PDF Reports

export interface KundaliThemeConfig {
  brandName: string;
  brandTagline: string;
  brandWebsite: string;
  brandContact: string;
  logoUrl: string;
  colors: {
    primaryGold: string;
    primaryCrimson: string;
    deepMaroon: string;
    charcoal: string;
    ivoryBg: string;
    cardBg: string;
    borderColor: string;
    textColor: string;
    subtextColor: string;
    badgeBg: string;
  };
  fonts: {
    heading: string;
    body: string;
    hindi: string;
  };
}

export const kundaliTheme: KundaliThemeConfig = {
  brandName: "धार्मिकश्री (Dharmik Shree)",
  brandTagline: "13th Generation Astrologer, Vastu Consultant & Spiritual Guide",
  brandWebsite: "https://www.dharmikshree.com",
  brandContact: "+91 99999 99999 | support@dharmikshree.com",
  logoUrl: "/icon.png",
  colors: {
    primaryGold: "#D4AF37",
    primaryCrimson: "#8B1E0F",
    deepMaroon: "#581109",
    charcoal: "#111827",
    ivoryBg: "#FFFDF6",
    cardBg: "#FFFFFF",
    borderColor: "#E5D5B5",
    textColor: "#1F2937",
    subtextColor: "#4B5563",
    badgeBg: "#FDF6E2",
  },
  fonts: {
    heading: "'Cinzel', 'Times New Roman', serif",
    body: "'Inter', 'Helvetica Neue', sans-serif",
    hindi: "'Hind', 'Noto Sans Devanagari', sans-serif",
  },
};
