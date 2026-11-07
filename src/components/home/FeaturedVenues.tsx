'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESSES } from '@/data/businesses';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Heart,
  Star,
  MapPin,
  Users,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const FeaturedVenues: React.FC = () => {
  const { isSaved, toggleWishlist } = useWishlistStore();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  // Take top 4 premier venues for asymmetric layout
  const venues = BUSINESSES.filter((b) => b.featured).slice(0, 4);
  const spotlightVenue = venues[0];
  const sideVenues = venues.slice(1, 4);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Curated Spaces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Spaces Worth Celebrating In
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2.5 max-w-xl font-normal leading-relaxed">
              Ahmedabad’s most distinguished party plots, luxury banquets, and convention auditoriums with verified date holds.
            </p>
          </div>

          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-bold text-sm group self-start md:self-auto shrink-0"
          >
            <span>Browse All Venues</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Visually Rich Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spotlight Venue Card (Left / 7 cols) */}
          {spotlightVenue && (
            <div className="lg:col-span-7 bg-ivory rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft-lg hover:border-gold-border transition-all duration-300 flex flex-col group">
              {/* Large Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-ivory-dark">
                <Image
                  src={spotlightVenue.heroImage}
                  alt={spotlightVenue.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-forest text-white text-xs font-bold shadow-xs">
                      {spotlightVenue.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-forest text-[11px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>Premier Spotlight</span>
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(spotlightVenue.id);
                    }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shadow-xs"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 ${
                        isSaved(spotlightVenue.id) ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Left Specs in Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md font-medium">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="font-bold">{spotlightVenue.rating.toFixed(1)}</span>
                    <span className="text-white/70">({spotlightVenue.reviewCount} reviews)</span>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md font-medium">
                    {spotlightVenue.area}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink group-hover:text-forest transition-colors">
                        {spotlightVenue.name}
                      </h3>
                      <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                        {spotlightVenue.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Supported Event Types */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {spotlightVenue.eventTypes.slice(0, 4).map((et) => (
                      <span
                        key={et}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-ivory-border text-ink-secondary text-[11px] font-medium"
                      >
                        {et}
                      </span>
                    ))}
                  </div>

                  {/* Highlights Bar */}
                  <div className="mt-6 pt-5 border-t border-ivory-border grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[11px] text-ink-muted uppercase tracking-wider block">
                        Guest Capacity
                      </span>
                      <span className="font-bold text-ink mt-0.5 block">
                        {spotlightVenue.capacityDisplay}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-ink-muted uppercase tracking-wider block">
                        Pricing Basis
                      </span>
                      <span className="font-bold text-forest text-base mt-0.5 block">
                        {spotlightVenue.priceDisplay}
                        <span className="text-xs text-ink-muted font-normal ml-1">
                          /{spotlightVenue.priceUnit}
                        </span>
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-ink-muted uppercase tracking-wider block">
                        Corridor
                      </span>
                      <span className="font-medium text-ink mt-0.5 block truncate">
                        {spotlightVenue.area.split('(')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-7 pt-5 border-t border-ivory-border flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/business/${spotlightVenue.slug}`}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-ivory-border hover:bg-white text-xs sm:text-sm font-semibold text-center text-ink transition-colors shadow-2xs"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => openEnquiryModal(spotlightVenue)}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-95"
                  >
                    <CalendarCheck className="w-4 h-4 text-gold" />
                    <span>Enquire Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Side Stack (Right / 5 cols - 3 venues) */}
          <div className="lg:col-span-5 space-y-5">
            {sideVenues.map((venue) => {
              const saved = isSaved(venue.id);
              return (
                <div
                  key={venue.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col sm:flex-row"
                >
                  {/* Thumbnail */}
                  <div className="relative sm:w-44 aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden bg-ivory-dark">
                    <Image
                      src={venue.heroImage}
                      alt={venue.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-forest text-white text-[10px] font-bold">
                      {venue.category}
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(venue.id);
                      }}
                      className="absolute top-3 right-3 sm:hidden w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500"
                    >
                      <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-ink-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gold-dark" />
                          <span className="truncate">{venue.area.split('(')[0]}</span>
                        </span>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(venue.id);
                          }}
                          className="hidden sm:flex w-7 h-7 rounded-full hover:bg-ivory text-ink-secondary hover:text-rose-500 items-center justify-center transition-colors"
                          aria-label="Save to wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      <h4 className="font-serif text-base font-bold text-ink mt-1 group-hover:text-forest transition-colors line-clamp-1">
                        {venue.name}
                      </h4>

                      <div className="flex items-center gap-1 text-[11px] text-ink-muted mt-1">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span className="font-bold text-ink">{venue.rating.toFixed(1)}</span>
                        <span>({venue.reviewCount})</span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between text-xs">
                        <span className="text-ink-secondary flex items-center gap-1 text-[11px]">
                          <Users className="w-3 h-3 text-forest" />
                          <span>{venue.capacityDisplay}</span>
                        </span>
                        <span className="font-bold text-forest text-xs">
                          {venue.priceDisplay}
                          <span className="text-[10px] text-ink-muted font-normal ml-0.5">
                            /{venue.priceUnit}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between gap-2">
                      <Link
                        href={`/business/${venue.slug}`}
                        className="text-xs font-semibold text-ink hover:text-forest transition-colors"
                      >
                        View Details →
                      </Link>

                      <button
                        onClick={() => openEnquiryModal(venue)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-soft hover:bg-forest hover:text-white text-forest text-xs font-bold transition-all"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
