'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { CATEGORIES, AHMEDABAD_AREAS } from '@/data/categories';
import {
  Search,
  MapPin,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Building,
  Utensils,
  Camera,
  Trees
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const [query, setQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedArea !== 'all') params.set('area', selectedArea);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    router.push(`/businesses?${params.toString()}`);
  };

  const quickCategoryShortcuts = [
    { label: 'Party Plots', id: 'party-plots', icon: <Trees className="w-3.5 h-3.5" /> },
    { label: 'Banquet Halls', id: 'banquet-halls', icon: <Building className="w-3.5 h-3.5" /> },
    { label: 'Catering', id: 'catering', icon: <Utensils className="w-3.5 h-3.5" /> },
    { label: 'Photographers', id: 'photography', icon: <Camera className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="relative min-h-[660px] lg:min-h-[740px] bg-forest-deep text-white overflow-hidden flex items-center justify-center">
      {/* Background with luxury celebration visual & overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105 transform animate-pulse duration-[12000ms]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=85')",
        }}
      />
      
      {/* Subtle radial luxury gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/95 via-forest/90 to-forest-deep" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-xs sm:text-sm font-medium text-gold-light shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Ahmedabad’s Curated Celebration Concierge</span>
            <span className="hidden sm:inline text-gold/60">•</span>
            <span className="hidden sm:inline text-gold-soft/85">Intermediary Booking Service</span>
          </div>

          {/* Hero Heading with Luxury Italic Accent */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Find the Perfect Place for Your{' '}
            <span className="gold-gradient-text italic font-normal">
              Celebration
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            Discover Ahmedabad’s best event venues and professionals for weddings, parties and unforgettable celebrations.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/businesses"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold text-forest font-bold text-sm shadow-md hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Explore Businesses</span>
              <ArrowRight className="w-4 h-4 text-forest group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => openEnquiryModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-gold/40 backdrop-blur-md shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-gold" />
              <span>Submit Event Enquiry</span>
            </button>
          </div>
        </div>

        {/* Hero Search Box */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
          {/* Quick Category Shortcut Pills above Search Box */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {quickCategoryShortcuts.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  router.push(`/businesses?category=${cat.id}`);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gold text-forest font-bold shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSearch}
            className="p-3 sm:p-4 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-gold/40 grid grid-cols-1 sm:grid-cols-12 gap-3 text-charcoal"
          >
            {/* Search Keyword */}
            <div className="sm:col-span-5 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Search Venues or Services
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Shantam, Grand Bhagwati, Mandap..."
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all"
                />
              </div>
            </div>

            {/* Area Dropdown */}
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Ahmedabad Locality
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gold-dark absolute left-3 top-3 pointer-events-none" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest transition-all truncate"
                >
                  <option value="all">All Ahmedabad Areas</option>
                  {AHMEDABAD_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest transition-all"
              >
                <option value="all">All Types</option>
                {CATEGORIES.slice(0, 10).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-forest hover:bg-forest-light active:bg-forest-dark text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 h-[42px]"
              >
                <Search className="w-4 h-4 text-gold" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Trending Locality Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
            <span className="text-gold font-medium">Trending Hubs:</span>
            {['Sindhu Bhavan Road', 'SG Highway', 'Bodakdev', 'Prahlad Nagar', 'Thaltej', 'South Bopal'].map(
              (area) => (
                <button
                  key={area}
                  onClick={() => {
                    setSelectedArea(area);
                    router.push(`/businesses?area=${encodeURIComponent(area)}`);
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-gold/30 hover:text-white transition-colors text-[11px] border border-white/10"
                >
                  {area}
                </button>
              )
            )}
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-xs">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Intermediary Concierge</p>
              <p className="text-white/70 text-[11px]">Enquiries routed strictly through Gatherly</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Verified Availability</p>
              <p className="text-white/70 text-[11px]">We check real-time calendar holds for you</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Zero Vendor Spam</p>
              <p className="text-white/70 text-[11px]">No unsolicited calls or third-party sharing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
