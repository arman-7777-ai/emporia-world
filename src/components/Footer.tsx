"use client";

import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#fafaf9] pt-32 pb-10 border-t border-black/5 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[200px] bg-[#c9a96e]/10 blur-[120px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border border-[#c9a96e] transform rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#c9a96e]" />
                </div>
                <span className="font-display font-light text-lg tracking-[0.2em] text-[#0a0a0a]">
                  EMPORIA<span className="font-medium text-[#c9a96e]">WORLD</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-600 font-light text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#0a0a0a] text-sm tracking-[0.2em] uppercase font-medium mb-8">Navigation</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-[#c9a96e] transition-colors text-sm font-light tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#0a0a0a] text-sm tracking-[0.2em] uppercase font-medium mb-8">Contact</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-light leading-relaxed">
              <li>{SITE_CONFIG.contact.address}</li>
              <li>
                <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`} className="hover:text-black transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-black transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#0a0a0a] text-sm tracking-[0.2em] uppercase font-medium mb-8">Newsletter</h4>
            <p className="text-gray-600 text-sm font-light mb-6">
              Subscribe to receive exclusive access to our newest private listings.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-0 bottom-3 text-[#c9a96e] hover:text-black text-sm tracking-widest uppercase transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
              <a 
                key={platform}
                href={url}
                className="text-gray-500 hover:text-black text-xs tracking-widest uppercase transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
