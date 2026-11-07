'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { EVENT_TYPES, AHMEDABAD_AREAS } from '@/data/categories';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [selectedLocation, setSelectedLocation] = useState('Ahmedabad (All Corridors)');
  const [eventDate, setEventDate] = useState('');
  const [guestCapacity, setGuestCapacity] = useState('any');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedEventType && selectedEventType !== 'All Events') {
      params.set('eventType', selectedEventType);
    }
    if (selectedLocation && !selectedLocation.includes('All Corridors')) {
      params.set('area', selectedLocation);
    }
    if (guestCapacity && guestCapacity !== 'any') {
      params.set('capacity', guestCapacity);
    }
    if (eventDate) {
      params.set('date', eventDate);
    }

    router.push(`/businesses?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[720px] lg:min-h-[800px] bg-forest-dark text-white overflow-hidden flex items-center justify-center pt-24 pb-16">
      {/* Background Photography with Warm Luxury Tone */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=85')",
        }}
      />

      {/* Editorial Gradient & Warm Light */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/95 via-forest/85 to-forest-deep/95" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gold/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center">
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-xs sm:text-sm font-medium text-gold-light mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Every Event, Beautifully Connected</span>
          <span className="text-gold/50">•</span>
          <span className="text-white/80">Ahmedabad Concierge</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto">
          Find the Perfect Place for{' '}
          <span className="gold-gradient-text italic font-normal">
            Every Celebration.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-2xl mx-auto mt-4 font-normal">
          Discover venues, talented professionals, and inspiration for every occasion.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <Link
            href="/businesses"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-sm shadow-md hover:shadow-gold transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>Explore All Venues</span>
            <ArrowRight className="w-4 h-4 text-forest-deep group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-gold/40 backdrop-blur-md shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CalendarCheck className="w-4 h-4 text-gold" />
            <span>Plan an Event</span>
          </button>
        </div>

        {/* Elegant Search Panel */}
        <div className="mt-12 max-w-5xl mx-auto text-left">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-ivory-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 text-ink"
          >
            {/* 1. Event Type Dropdown (Primary search dimension) */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-secondary mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-forest" />
                <span>Event Type</span>
              </label>
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-ink font-medium"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. City / Location (Default: Ahmedabad) */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-secondary mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest" />
                <span>City / Corridor</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-ink font-medium truncate"
              >
                <option value="Ahmedabad (All Corridors)">Ahmedabad (All Corridors)</option>
                {AHMEDABAD_AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Event Date */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-secondary mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-forest" />
                <span>Event Date</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-ink font-medium"
              />
            </div>

            {/* 4. Guest Capacity */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-secondary mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-forest" />
                <span>Guest Capacity</span>
              </label>
              <select
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-ink font-medium"
              >
                <option value="any">Any Capacity</option>
                <option value="50-200">50 - 200 Guests</option>
                <option value="200-500">200 - 500 Guests</option>
                <option value="500-1000">500 - 1,000 Guests</option>
                <option value="1000+">1,000+ Guests</option>
              </select>
            </div>

            {/* 5. Search CTA */}
            <div className="lg:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full h-[42px] px-5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-soft active:scale-95"
              >
                <Search className="w-4 h-4 text-gold" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Popular Corridors Quick Shortcuts */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
            <span className="text-gold font-medium">Top Corridors:</span>
            {['Sindhu Bhavan Road (SBR)', 'SG Highway', 'Bodakdev', 'Prahlad Nagar', 'Bopal'].map(
              (area) => (
                <button
                  key={area}
                  onClick={() => {
                    setSelectedLocation(area);
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

        {/* Concierge Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Private Concierge Desk</p>
              <p className="text-white/70 text-[11px]">No cold calls or vendor spam</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Verified Dates & Rates</p>
              <p className="text-white/70 text-[11px]">Direct audit with venue caretaking</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4.5 h-4.5 text-gold" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Turnkey Coordination</p>
              <p className="text-white/70 text-[11px]">Venues, decor, catering & AV</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
