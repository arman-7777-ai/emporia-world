"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth pointer-events-none flex justify-center",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div 
        className={cn(
          "flex items-center justify-between transition-all duration-500 pointer-events-auto",
          isScrolled 
            ? "glass px-8 py-4 rounded-full w-[95%] max-w-5xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
            : "container-luxury w-full"
        )}
      >
        {/* Minimalist Logo */}
        <Link href="/" className="group relative flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-[1.5px] border-[#c9a96e] transform rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-700 ease-dramatic">
              <div className="w-1.5 h-1.5 bg-[#c9a96e]" />
            </div>
            <span className={cn(
              "font-display font-light text-lg md:text-xl tracking-[0.2em] transition-colors duration-500",
              isScrolled ? "text-[#0a0a0a]" : "text-white"
            )}>
              EMPORIA<span className="font-medium text-[#c9a96e]">WORLD</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-300 relative group",
                isScrolled ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
              )}
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#c9a96e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-dramatic" />
            </Link>
          ))}
          <button className={cn(
            "btn-luxury px-6 py-2.5 rounded-full text-xs font-medium tracking-[0.1em] transition-all duration-500 uppercase",
            isScrolled 
              ? "bg-[#0a0a0a] text-white hover:bg-[#c9a96e]" 
              : "border border-white/20 text-white hover:border-[#c9a96e]/50 glass-subtle"
          )}>
            INQUIRE
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden relative text-white transition-colors duration-500",
            isScrolled && !isMobileMenuOpen ? "text-[#0a0a0a]" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-dramatic",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto clip-path-full"
              : "opacity-0 pointer-events-none clip-path-zero"
          )}
          style={{
            clipPath: isMobileMenuOpen ? "circle(150% at right top)" : "circle(0% at right top)",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-3xl font-display font-light tracking-widest text-white hover:text-[#c9a96e] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.5s ease ${i * 0.1 + 0.3}s`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-10 pt-10 border-t border-white/10 text-center">
            <p className="text-[#c9a96e] tracking-widest text-sm mb-4">REACH OUT</p>
            <p className="text-gray-400 font-light">{SITE_CONFIG.contact.phone}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
