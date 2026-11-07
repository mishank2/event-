'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  LayoutDashboard,
  Building2,
  Compass,
  Heart,
  CalendarCheck,
  Calculator,
  HelpCircle,
  Headphones,
  Info,
  Sparkles,
  MapPin,
  Flame,
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const savedIds = useWishlistStore((state) => state.savedIds);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const mainNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Browse Venues & Services', href: '/businesses', icon: Building2 },
    { name: 'Vendor Categories', href: '/explore', icon: Compass },
    { name: 'Saved Wishlist', href: '/wishlist', icon: Heart, badge: savedIds.length },
    { name: 'Submit Event Enquiry', href: '/enquiry', icon: CalendarCheck },
    { name: 'About Gatherly', href: '/about', icon: Info },
    { name: 'Concierge Desk', href: '/contact', icon: Headphones },
    { name: 'FAQ & Help', href: '/faq', icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:flex flex-col items-center w-18 py-6 bg-white border-r border-ivory-border shadow-xs fixed left-0 top-0 bottom-0 z-40">
      {/* Brand Monogram */}
      <Link
        href="/"
        className="w-11 h-11 rounded-2xl bg-gradient-to-br from-forest-light via-forest to-forest-deep flex items-center justify-center text-gold shadow-md hover:scale-105 transition-transform mb-8"
        title="Gatherly Concierge"
      >
        <span className="font-serif text-xl font-bold gold-gradient-text">G</span>
      </Link>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col items-center gap-3 w-full px-2">
        {mainNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative group w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-forest text-gold shadow-soft'
                  : 'text-charcoal-muted hover:text-forest hover:bg-ivory'
              }`}
              title={item.name}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

              {/* Badge for Wishlist */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}

              {/* Tooltip on Hover */}
              <div className="absolute left-14 px-3 py-1.5 rounded-xl bg-forest-deep text-white text-xs font-medium whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Concierge Protection Shield */}
      <button
        onClick={() => openEnquiryModal()}
        className="w-11 h-11 rounded-2xl bg-gold-soft border border-gold/40 text-forest flex items-center justify-center hover:bg-gold/30 transition-colors shadow-xs group relative"
        title="Quick Concierge Enquiry"
      >
        <ShieldCheck className="w-5 h-5 text-gold-dark group-hover:scale-110 transition-transform" />
        <div className="absolute left-14 px-3 py-1.5 rounded-xl bg-forest-deep text-white text-xs font-medium whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          Gatherly Private Concierge
        </div>
      </button>
    </aside>
  );
};
