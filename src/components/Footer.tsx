export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-ivory/80 py-16 px-6 md:px-12 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Brand/Quote */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-xl tracking-[0.2em] uppercase text-brand-ivory">
            Dharmik Shree
          </h3>
          <p className="font-serif italic text-sm text-brand-ivory/60 max-w-sm leading-relaxed">
            &ldquo;Within the silence of the self lies the blueprint of your destiny. Guide the mind, and the stars will follow.&rdquo;
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-2">
            Navigation
          </h4>
          <a href="/#about" className="text-sm hover:text-brand-gold transition-colors duration-300">
            About Dharmik Shree
          </a>
          <a href="/#philosophy" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Philosophy
          </a>
          <a href="/#services" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Vedic Services
          </a>
          <a href="/#journal" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Wisdom Journal
          </a>
          <a href="/tools" className="text-sm hover:text-brand-gold transition-colors duration-300 font-medium">
            Vedic Tools
          </a>
        </div>

        {/* Contact/Connect */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-2">
            Connect
          </h4>
          <a
            href="mailto:dharmikshree.connect@gmail.com"
            className="text-sm text-brand-ivory/60 hover:text-brand-gold transition-colors duration-300"
          >
            Enquiries: dharmikshree.connect@gmail.com
          </a>
          <div className="flex space-x-6 pt-2">
            <a
              href="https://www.instagram.com/astrologer_dharmikshree"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider hover:text-brand-gold transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@astrodharmikshreeguruji8646"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider hover:text-brand-gold transition-colors duration-300"
            >
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/in/astrologer-dharmikshree-jani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider hover:text-brand-gold transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-ivory/10 flex flex-col md:flex-row justify-between items-center text-xs text-brand-ivory/40 space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Dharmik Shree. All rights reserved.</p>
      </div>
    </footer>
  );
}
