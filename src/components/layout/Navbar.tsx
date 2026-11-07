'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Menu, X, Search, Heart, ChevronDown, MapPin, Sparkles, ArrowRight
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  {
    name: 'Explore Venues',
    href: '/businesses?category=party-plots',
    children: [
      { name: 'Party Plots & Lawns', href: '/businesses?category=party-plots' },
      { name: 'Marriage Halls', href: '/businesses?category=marriage-halls' },
      { name: 'Banquet Halls', href: '/businesses?category=banquet-halls' },
      { name: 'Corporate & Conference Venues', href: '/businesses?category=corporate-event-venues' },
      { name: 'Birthday & Theme Venues', href: '/businesses?category=birthday-party-venues' },
      { name: 'Farmhouses & Private Lounges', href: '/businesses?category=private-party-spaces' },
      { name: 'Festival & Exhibition Grounds', href: '/businesses?category=festival-grounds' },
    ],
  },
  {
    name: 'Discover Vendors',
    href: '/explore',
    children: [
      { name: 'Catering Businesses', href: '/businesses?category=catering' },
      { name: 'Event Decorators', href: '/businesses?category=decoration' },
      { name: 'Photographers', href: '/businesses?category=photography' },
      { name: 'DJ & Sound Production', href: '/businesses?category=dj-sound' },
      { name: 'Makeup & Grooming', href: '/businesses?category=makeup-artists' },
      { name: 'Videography & Live Streaming', href: '/businesses?category=videography' },
    ],
  },
  { name: 'Gatherly Discover', href: '/#wedding-reels' },
  { name: 'How It Works', href: '/#how-it-works' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const savedIds = useWishlistStore((state) => state.savedIds);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/businesses?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-lg border-b border-ivory-border shadow-soft-sm'
            : 'bg-white/90 backdrop-blur-md'
        }`}
        style={{ height: '72px' }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-gradient flex items-center justify-center shadow-soft-sm group-hover:shadow-soft transition-shadow">
              <span className="font-serif text-lg font-bold text-gold-light leading-none">G</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif font-bold text-[1.2rem] text-ink leading-none tracking-tight">
                Gatherly
              </span>
              <span className="text-[9px] text-ink-muted tracking-widest uppercase font-medium leading-none mt-0.5">
                Every Event, Beautifully Connected
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.children && handleDropdownEnter(link.name)}
                onMouseLeave={link.children ? handleDropdownLeave : undefined}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-forest bg-emerald-soft'
                      : 'text-ink-secondary hover:text-ink hover:bg-ivory-dark'
                  }`}
                >
                  {link.name}
                  {link.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && openDropdown === link.name && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-soft-lg border border-ivory-border py-2 animate-scale-in"
                    onMouseEnter={() => handleDropdownEnter(link.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="flex items-center px-4 py-2.5 text-sm text-ink-secondary hover:text-forest hover:bg-emerald-soft transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                    <div className="mx-4 my-2 pt-2 border-t border-ivory-border">
                      <Link
                        href="/explore"
                        className="flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline"
                      >
                        <Sparkles className="w-3 h-3" />
                        View all categories
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Location Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-soft border border-forest/15 text-xs text-forest font-medium">
              <MapPin className="w-3 h-3 text-gold shrink-0" />
              <span>Ahmedabad</span>
            </div>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-secondary hover:text-forest hover:bg-ivory-dark transition-colors"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-ink-secondary hover:text-forest hover:bg-ivory-dark transition-colors"
              aria-label={`Wishlist (${savedIds.length} saved)`}
            >
              <Heart className="w-4.5 h-4.5" />
              {savedIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-forest text-white text-[9px] font-bold flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Plan Your Event CTA */}
            <button
              onClick={() => openEnquiryModal()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest hover:bg-forest-dark text-white text-sm font-semibold transition-all hover:shadow-soft-sm active:scale-95"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-ink-secondary hover:text-forest hover:bg-ivory-dark transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-soft-lg border border-ivory-border overflow-hidden animate-scale-in">
            <form onSubmit={handleSearch} className="flex items-center gap-3 p-4">
              <Search className="w-5 h-5 text-ink-muted shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search venues, caterers, photographers..."
                className="flex-1 text-base text-ink placeholder:text-ink-muted outline-none bg-transparent"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="text-ink-muted hover:text-ink">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-forest text-white text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Search
              </button>
            </form>
            <div className="border-t border-ivory-border px-4 py-3 flex flex-wrap gap-2">
              {['Party Plots', 'Banquet Halls', 'Wedding Gardens', 'Photographers', 'Catering'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setSearchQuery(s); router.push(`/businesses?q=${encodeURIComponent(s)}`); setSearchOpen(false); }}
                  className="px-3 py-1 rounded-full text-xs bg-ivory-dark text-ink-secondary hover:bg-emerald-soft hover:text-forest border border-ivory-border transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55] flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative ml-auto w-80 max-w-full h-full bg-white shadow-soft-lg flex flex-col animate-slide-up overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-ivory-border">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center">
                  <span className="font-serif font-bold text-gold-light text-sm">G</span>
                </div>
                <span className="font-serif font-bold text-ink text-lg">Gatherly</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-ivory-dark"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-5 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-emerald-soft text-forest'
                        : 'text-ink-secondary hover:text-ink hover:bg-ivory-dark'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="mt-1 ml-3 space-y-0.5 border-l border-ivory-border pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-xs text-ink-muted hover:text-forest transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-ivory-border space-y-3">
              <button
                onClick={() => { openEnquiryModal(); setMobileOpen(false); }}
                className="w-full py-3 rounded-xl bg-forest text-white font-semibold text-sm hover:bg-forest-dark transition-colors flex items-center justify-center gap-2"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-xl border border-ivory-border text-ink-secondary font-medium text-sm hover:bg-ivory-dark transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                <span>Saved ({savedIds.length})</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
