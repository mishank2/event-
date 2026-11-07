'use client';

import React from 'react';
import Link from 'next/link';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  MapPin,
  Mail,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Heart,
  CalendarCheck,
  ArrowRight,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export const Footer: React.FC = () => {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  return (
    <footer className="bg-forest-dark border-t border-forest-deep text-white pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Pre-Footer Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold text-gold-light uppercase tracking-wider block mb-1">
              Private Intermediary Service
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Planning a celebration in Ahmedabad?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
              Let Gatherly check date availability, negotiate package pricing, and coordinate with venue management on your behalf.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => openEnquiryModal()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-forest-deep" />
              <span>Submit Event Enquiry</span>
            </button>
            <Link
              href="/businesses"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Explore All Venues</span>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Intermediary Role */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-gold/40 flex items-center justify-center text-gold shadow-sm font-serif text-xl font-bold">
                G
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Gatherly<span className="text-gold">.</span>
                </span>
                <span className="text-[9px] text-gold-light tracking-widest uppercase font-semibold">
                  Every Event, Beautifully Connected
                </span>
              </div>
            </Link>

            <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Ahmedabad’s premier event discovery and planning marketplace. We connect families, corporate teams, and celebration hosts with vetted party plots, convention centers, banquet halls, caterers, and decorators.
            </p>

            {/* Intermediary Guarantee Callout */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5 backdrop-blur-xs">
              <div className="flex items-center gap-2 font-bold text-gold-light">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Intermediary Booking Guarantee</span>
              </div>
              <p className="text-white/70 text-[11px] leading-relaxed">
                Gatherly acts as your single point of contact. All enquiries are handled internally. Your personal contact details are never distributed directly to vendors or third parties.
              </p>
            </div>
          </div>

          {/* Event Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gold-light">Event Services</h4>
            <ul className="space-y-2 text-xs text-white/75">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/businesses?category=${cat.id}`}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/explore" className="text-gold hover:underline text-xs font-bold inline-flex items-center gap-1 mt-1">
                  View All {CATEGORIES.length} Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Ahmedabad Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gold-light">Top Corridors</h4>
            <ul className="space-y-2 text-xs text-white/75">
              {[
                'Sindhu Bhavan Road (SBR)',
                'SG Highway Corridor',
                'Bodakdev & Satellite',
                'Prahlad Nagar & Makarba',
                'Thaltej & Science City',
                'Bopal & South Bopal',
              ].map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/businesses?area=${encodeURIComponent(loc.split(' ')[0])}`}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gatherly Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gold-light">Gatherly Desk</h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Gatherly
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="hover:text-gold transition-colors">
                  Submit Event Enquiry
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-gold transition-colors">
                  Saved Shortlist
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact Concierge Team
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-xs text-white/70 space-y-1.5 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Sindhu Bhavan Road, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>concierge@gatherly.in (Admin Only)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Desk Hours: Mon - Sun, 9AM - 8PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; {new Date().getFullYear()} Gatherly Technologies. Operating exclusively in Ahmedabad, Gujarat, India.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="font-semibold text-white/80">Independent Intermediary Discovery Service</span>
            <span>•</span>
            <span>Zero Vendor Spam Guarantee</span>
            <span>•</span>
            <span>Demo Marketplace Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
