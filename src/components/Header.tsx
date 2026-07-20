"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomepage = pathname === "/";

  // Dynamic style bindings
  const isLightText = !isScrolled && isHomepage;

  const headerBgClass = (isScrolled || !isHomepage)
    ? "bg-brand-ivory/90 backdrop-blur-md border-b border-brand-gold/10 py-4 shadow-sm"
    : "bg-transparent py-6";

  const logoColorClass = isLightText
    ? "text-brand-ivory hover:text-brand-gold"
    : "text-brand-charcoal hover:text-brand-gold";

  const navItemColorClass = isLightText
    ? "text-brand-ivory/80 hover:text-brand-gold"
    : "text-brand-charcoal/75 hover:text-brand-gold";

  const buttonClass = isLightText
    ? "border-brand-ivory/40 text-brand-ivory hover:border-brand-gold hover:text-brand-gold bg-transparent"
    : "border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-ivory bg-transparent";

  const toggleColorClass = isLightText
    ? "text-brand-ivory"
    : "text-brand-charcoal";

  const navItems = [
    { name: "About", href: "/#about" },
    { name: "Philosophy", href: "/#philosophy" },
    { name: "Services", href: "/#services" },
    { name: "Wisdom Journal", href: "/#journal" },
    { name: "Tools", href: "/tools" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#"
          className={`font-serif text-xl md:text-2xl tracking-[0.2em] uppercase transition-colors duration-300 ${logoColorClass}`}
        >
          Dharmik Shree
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${navItemColorClass}`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="/#journey"
            className={`text-xs uppercase tracking-[0.2em] px-6 py-2.5 border transition-all duration-300 rounded-sm ${buttonClass}`}
          >
            Book Consultation
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden transition-colors duration-300 ${toggleColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-ivory border-b border-brand-gold/10 py-6 px-8 flex flex-col space-y-4 shadow-lg animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-brand-charcoal py-2 border-b border-brand-charcoal/5"
            >
              {item.name}
            </a>
          ))}
          <a
            href="/#journey"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-center text-sm uppercase tracking-widest px-6 py-3 border border-brand-gold bg-brand-gold text-brand-ivory transition-colors duration-300 rounded-sm mt-4"
          >
            Book Consultation
          </a>
        </div>
      )}
    </header>
  );
}
