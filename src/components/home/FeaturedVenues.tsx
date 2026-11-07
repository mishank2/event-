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

  const featuredVenues = BUSINESSES.filter((b) => b.featured).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>Handpicked Destinations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Featured Venues in Ahmedabad
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2 max-w-xl font-normal">
              Award-winning party plots, heritage marriage halls, and luxury banquet spaces with verified capacity and date holding.
            </p>
          </div>

          <Link
            href="/businesses?filter=featured"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-bold text-sm group self-start md:self-auto"
          >
            <span>Browse All Venues</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map((venue) => {
            const saved = isSaved(venue.id);
            return (
              <div
                key={venue.id}
                className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                  <Image
                    src={venue.heroImage}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-forest/90 text-white text-[11px] font-bold backdrop-blur-md">
                        {venue.category}
                      </span>
                      {venue.verified && (
                        <span className="px-2.5 py-1 rounded-full bg-gold-dark text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
                          <ShieldCheck className="w-3 h-3 text-gold-light" />
                          <span>Curated</span>
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(venue.id);
                      }}
                      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shadow-xs"
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Rating Pill Bottom Left */}
                  <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span>{venue.rating.toFixed(1)}</span>
                    <span className="text-white/60 text-[10px] font-normal">
                      ({venue.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-ink group-hover:text-forest transition-colors line-clamp-1">
                      {venue.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-ink-muted">
                      <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span className="truncate">{venue.area}</span>
                    </div>

                    <p className="text-xs text-ink-secondary mt-2.5 leading-relaxed line-clamp-2">
                      {venue.tagline}
                    </p>

                    {/* Meta Specs */}
                    <div className="mt-4 pt-3 border-t border-ivory-border grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-ink-secondary">
                        <Users className="w-4 h-4 text-forest shrink-0" />
                        <span className="truncate">{venue.capacityDisplay}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                          Starts at
                        </span>
                        <span className="font-bold text-forest text-sm">
                          {venue.priceDisplay}
                        </span>
                        <span className="text-[10px] text-ink-muted ml-0.5">/{venue.priceUnit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-ivory-border grid grid-cols-2 gap-2">
                    <Link
                      href={`/business/${venue.slug}`}
                      className="py-2.5 px-3 rounded-xl border border-ivory-border hover:bg-ivory text-xs font-semibold text-center text-ink transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => openEnquiryModal(venue)}
                      className="py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-gold" />
                      <span>Check Date</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
