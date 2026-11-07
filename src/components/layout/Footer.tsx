import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, ShieldCheck, HeartHandshake, Sparkles, Heart } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sand border-t border-sand-border pt-16 pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sand-border">
          {/* Brand & Intermediary Role */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-gold shadow-sm font-serif text-xl font-bold">
                G
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
                Gatherly<span className="text-coral">.</span>
              </span>
            </Link>
            <p className="text-charcoal-muted text-xs sm:text-sm leading-relaxed max-w-sm">
              Ahmedabad’s premier celebration concierge. We connect families, brides, and corporate planners with vetted party plots, marriage halls, caterers, and decorators.
            </p>
            <div className="p-4 rounded-2xl bg-white border border-sand-border text-xs space-y-1.5 shadow-soft-xs">
              <div className="flex items-center gap-2 font-bold text-charcoal">
                <ShieldCheck className="w-4 h-4 text-ochre" />
                <span>Intermediary Booking Guarantee</span>
              </div>
              <p className="text-charcoal-muted text-[11px] leading-relaxed">
                Gatherly acts as your single point of contact. Our team verifies real-time date availability, coordinates competitive pricing, and secures your date with the venue.
              </p>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-charcoal">Event Services</h4>
            <ul className="space-y-2 text-xs text-charcoal-muted">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/businesses?category=${cat.id}`}
                    className="hover:text-coral transition-colors inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/explore" className="text-coral hover:underline text-xs font-bold inline-flex items-center gap-1">
                  View All 15 Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Ahmedabad Localities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-charcoal">Top Corridors</h4>
            <ul className="space-y-2 text-xs text-charcoal-muted">
              {[
                'Sindhu Bhavan Road (SBR)',
                'SG Highway Corridor',
                'Bodakdev & Satellite',
                'Prahlad Nagar',
                'Thaltej & Science City',
                'Bopal & South Bopal',
              ].map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/businesses?area=${encodeURIComponent(loc.split(' ')[0])}`}
                    className="hover:text-coral transition-colors inline-block"
                  >
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Gatherly Concierge Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-charcoal">Gatherly Desk</h4>
            <ul className="space-y-2 text-xs text-charcoal-muted">
              <li>
                <Link href="/about" className="hover:text-coral transition-colors">
                  About Gatherly
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-coral transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="hover:text-coral transition-colors">
                  Submit Event Enquiry
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-coral transition-colors">
                  Saved Shortlist
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coral transition-colors">
                  Contact Concierge Team
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-xs text-charcoal-muted space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-ochre shrink-0" />
                <span>Sindhu Bhavan Road, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-ochre shrink-0" />
                <span>concierge@gatherly.in (Admin Only)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>
            &copy; {new Date().getFullYear()} Gatherly. Operating exclusively in Ahmedabad, Gujarat, India.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-charcoal">Independent Intermediary Discovery Service</span>
            <span>•</span>
            <span>Demo Marketplace Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
