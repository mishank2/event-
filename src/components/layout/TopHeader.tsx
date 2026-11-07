'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Menu,
  Search,
  MessageSquare,
  AtSign,
  ClipboardList,
  Moon,
  Maximize2,
  Bell,
  Settings,
  CalendarCheck,
  MapPin,
  Heart,
  X,
  Sparkles
} from 'lucide-react';

export const TopHeader: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const savedIds = useWishlistStore((state) => state.savedIds);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/businesses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Explore Categories', href: '/explore' },
    { name: 'Browse Businesses', href: '/businesses' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Enquiry Desk', href: '/enquiry' },
    { name: 'About Gatherly', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Concierge', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-ivory-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          {/* Left: Mobile Toggle & Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-ivory hover:bg-ivory-dark text-charcoal border border-ivory-border transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo on Mobile/Tablet */}
            <Link href="/" className="lg:hidden flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-forest flex items-center justify-center text-gold shadow-sm font-serif font-bold text-lg">
                G
              </div>
              <span className="font-serif font-bold text-forest text-lg hidden sm:inline">
                Gatherly<span className="text-gold">.</span>
              </span>
            </Link>

            {/* Search Input Bar (matching screenshot) */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search party plots, banquets, catering, photographers..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-ivory-border bg-ivory/80 focus:bg-white text-xs sm:text-sm text-charcoal focus:border-forest focus:ring-2 focus:ring-forest/10 transition-all placeholder:text-charcoal-muted"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 text-charcoal-muted hover:text-forest transition-colors"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Action Pills (matching screenshot: chat, at, clipboard) */}
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              <Link
                href="/enquiry"
                className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 flex items-center justify-center transition-colors border border-purple-100"
                title="Concierge Chat / Enquiry"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors border border-rose-100"
                title="Direct Concierge Mention"
              >
                <AtSign className="w-4 h-4" />
              </Link>
              <Link
                href="/wishlist"
                className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors border border-emerald-100"
                title="Shortlisted Tasks & Venues"
              >
                <ClipboardList className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Actions, Notifications, Avatar (matching screenshot) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Ahmedabad Location Tag */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-subtle border border-forest/15 text-xs text-forest">
              <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span className="font-semibold">Ahmedabad, GJ</span>
            </div>

            {/* Theme Toggle Moon (matching screenshot) */}
            <button
              className="hidden sm:flex w-9 h-9 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-ivory items-center justify-center transition-colors"
              title="Night Celebration Mode"
              onClick={() => {}}
            >
              <Moon className="w-4 h-4 text-amber-500" />
            </button>

            {/* Fullscreen icon (matching screenshot) */}
            <button
              className="hidden sm:flex w-9 h-9 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-ivory items-center justify-center transition-colors"
              title="Full View"
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
            >
              <Maximize2 className="w-4 h-4 text-amber-500" />
            </button>

            {/* Notification Bell (matching screenshot with red indicator) */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative w-9 h-9 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-ivory flex items-center justify-center transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-blue-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-ivory-border p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-ivory-border mb-2">
                    <span className="text-xs font-bold text-forest">Gatherly Concierge Updates</span>
                    <span className="text-[10px] text-gold-dark font-semibold">Live Desk</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-forest-subtle border border-forest/15">
                      <p className="font-semibold text-forest text-[11px]">Date Availability Checked</p>
                      <p className="text-charcoal/80 text-[10px] mt-0.5">
                        Shantam Party Plot confirmed prime wedding date availability for Dec 2026.
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-ivory">
                      <p className="font-semibold text-charcoal text-[11px]">New Caterer Onboarded</p>
                      <p className="text-charcoal-muted text-[10px] mt-0.5">
                        Gordhan Thal Royal Gujarati Menus now available for instant enquiry.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar with photo (matching screenshot) */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-ivory-border">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold/40 shadow-xs shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Customer Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-charcoal leading-none">Priyanshu P.</span>
                <span className="text-[10px] text-charcoal-muted mt-0.5">Event Host</span>
              </div>
            </div>

            {/* Settings Gear icon (matching screenshot) */}
            <button
              onClick={() => openEnquiryModal()}
              className="w-9 h-9 rounded-xl text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors"
              title="Concierge Settings & Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Primary Submit Enquiry CTA */}
            <button
              onClick={() => openEnquiryModal()}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold shadow-sm transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-gold" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-ivory-border px-6 py-5 shadow-xl animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-semibold text-charcoal hover:text-forest transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="mt-3 w-full py-3 rounded-xl bg-forest text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-gold" />
              <span>Submit Event Enquiry to Gatherly</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
