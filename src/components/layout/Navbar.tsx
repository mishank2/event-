'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  MapPin,
  Heart,
  CalendarCheck,
  Menu,
  X,
  Search,
  Sparkles,
  ChevronDown,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const savedIds = useWishlistStore((state) => state.savedIds);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Categories', href: '/explore' },
    { name: 'Browse Businesses', href: '/businesses' },
    { name: 'How It Works', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Concierge Desk', href: '/contact' },
  ];

  const wishlistCount = mounted ? savedIds.length : 0;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest/98 backdrop-blur-md shadow-soft-lg border-b border-gold/30 py-3'
          : 'bg-forest text-white py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & City Badge */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Royal Emblem Monogram */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark p-[1.5px] shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-forest-dark rounded-[10px] flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold gold-gradient-text">
                    G
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold-light transition-colors">
                    Gatherly
                  </span>
                  <span className="text-gold text-2xl font-serif leading-none">.</span>
                </div>
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold-soft/85 font-semibold -mt-0.5">
                  Ahmedabad Concierge
                </span>
              </div>
            </Link>

            {/* City Selector Pill with Live Pulse Dot */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark/80 border border-gold/30 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="font-medium text-white/90">Ahmedabad & SBR</span>
              <span className="text-[10px] bg-gold/15 text-gold-light px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Live Desk
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.slice(0, 5).map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all relative py-1 hover:text-gold-light ${
                    active ? 'text-gold font-semibold' : 'text-white/85'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl text-white/90 hover:text-gold hover:bg-forest-light/60 transition-colors border border-white/10"
              title="Saved Venues & Services"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-forest font-bold text-[10px] flex items-center justify-center shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Submit Enquiry CTA */}
            <button
              onClick={() => openEnquiryModal()}
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold-dark text-forest font-bold text-xs md:text-sm shadow-md hover:shadow-gold-glow transition-all active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-forest" />
              <span>Submit Event Enquiry</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-forest-light/60 border border-white/15 text-white hover:text-gold transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bg-forest-deep/98 backdrop-blur-xl border-b border-gold/30 px-6 py-6 shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 text-xs text-gold-soft">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <span>Serving Ahmedabad, SG Highway, SBR & Gandhinagar</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-medium transition-colors ${
                  pathname === link.href ? 'text-gold font-bold' : 'text-white/90 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-base font-medium text-white/90 hover:text-gold"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold" /> Saved Shortlist
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-bold">
                {wishlistCount}
              </span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-forest font-bold text-sm shadow-md"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Submit Event Enquiry to Gatherly</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
