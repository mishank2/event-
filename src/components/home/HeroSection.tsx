'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { EVENT_TYPES, AHMEDABAD_AREAS } from '@/data/categories';
import { ThreeCelebrationCanvas } from '@/components/home/ThreeCelebrationCanvas';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
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
  Play,
} from 'lucide-react';

const HERO_EVENT_PILLS = [
  { label: 'Weddings & Receptions', value: 'Weddings', icon: '💍' },
  { label: 'Birthday Parties', value: 'Birthdays', icon: '🎂' },
  { label: 'Corporate & Summits', value: 'Corporate Events', icon: '🏢' },
  { label: 'Festivals & Garba', value: 'Festivals & Concerts', icon: '🎪' },
  { label: 'Anniversaries & Rings', value: 'Anniversaries', icon: '🥂' },
  { label: 'Concerts & Shows', value: 'Festivals & Concerts', icon: '🎸' },
  { label: 'Baby Showers', value: 'Baby Celebrations', icon: '👶' },
  { label: 'Private Parties', value: 'Private Parties', icon: '🏡' },
];

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

  const handlePillClick = (val: string) => {
    setSelectedEventType(val);
    router.push(`/businesses?eventType=${encodeURIComponent(val)}`);
  };

  return (
    <section className="relative min-h-[760px] lg:min-h-[840px] text-white overflow-hidden flex items-center justify-center pt-28 pb-16">
      {/* Background Cinematic Event Video with Autoplay, Muted, Loop */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=85"
          className="w-full h-full object-cover scale-105 filter brightness-[0.7] contrast-[1.05]"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Elegant Editorial Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-forest-deep/75 to-forest-deep/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />
      </div>

      {/* 3D WebGL Celebration Particles & Floating Rings */}
      <ThreeCelebrationCanvas />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full text-center">
        {/* Editorial Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-xs sm:text-sm font-medium text-gold-light mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Every Event, Beautifully Connected</span>
          <span className="text-gold/50">•</span>
          <span className="text-white/80">Ahmedabad Concierge</span>
        </div>

        {/* Required Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          Every Celebration{' '}
          <span className="gold-gradient-text italic font-normal">
            Begins Here.
          </span>
        </h1>

        {/* Required Subtitle */}
        <p className="text-base sm:text-xl text-white/90 font-sans leading-relaxed max-w-3xl mx-auto mt-5 font-normal">
          Discover extraordinary venues, creative vendors, and unforgettable experiences for every occasion.
        </p>

        {/* CTAs: Explore Events & Plan Your Event */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/businesses"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-sm shadow-md hover:shadow-gold transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4 text-forest-deep group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-gold/40 backdrop-blur-md shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CalendarCheck className="w-4 h-4 text-gold" />
            <span>Plan Your Event</span>
          </button>
        </div>

        {/* Stylish Event Category Selector Tabs */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {HERO_EVENT_PILLS.map((pill) => (
              <button
                key={pill.label}
                onClick={() => handlePillClick(pill.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  selectedEventType === pill.value
                    ? 'bg-gold text-forest-deep shadow-sm scale-105'
                    : 'bg-black/40 hover:bg-white/20 text-white/90 border border-white/15'
                }`}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Elegant 3D Search Panel */}
        <div className="mt-6 max-w-5xl mx-auto text-left perspective-1500">
          <Tilt3DCard maxTilt={5} perspective={1400} className="rounded-3xl shadow-3d-floating overflow-hidden">
            <form
              onSubmit={handleSearch}
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-gold/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 text-ink preserve-3d"
            >
              {/* 1. Event Type Dropdown */}
              <div className="lg:col-span-3 translate-z-10">
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

              {/* 2. City / Corridor (Default: Ahmedabad) */}
              <div className="lg:col-span-3 translate-z-10">
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
              <div className="lg:col-span-2 translate-z-10">
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
              <div className="lg:col-span-2 translate-z-10">
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

              {/* 5. Search Button */}
              <div className="lg:col-span-2 flex items-end translate-z-30">
                <button
                  type="submit"
                  className="w-full h-[42px] px-5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-soft active:scale-95"
                >
                  <Search className="w-4 h-4 text-gold" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </Tilt3DCard>
        </div>

        {/* 3D Floating Concierge Guarantee Pills */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15 text-left">
          <Tilt3DCard maxTilt={8} className="rounded-2xl">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-3d hover:border-gold/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs">Private Concierge Desk</p>
                <p className="text-white/80 text-[11px]">No cold calls or third-party spam</p>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard maxTilt={8} className="rounded-2xl">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-3d hover:border-gold/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4.5 h-4.5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs">Verified Venue Availability</p>
                <p className="text-white/80 text-[11px]">Direct dates audit with caretaking staff</p>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard maxTilt={8} className="rounded-2xl">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-3d hover:border-gold/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-forest-light/60 border border-gold/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs">Turnkey Coordination</p>
                <p className="text-white/80 text-[11px]">Venues, catering, decor & production</p>
              </div>
            </div>
          </Tilt3DCard>
        </div>
      </div>
    </section>
  );
};
