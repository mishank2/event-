'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { BUSINESSES } from '@/data/businesses';
import { Star, Heart, MapPin, ArrowRight, Sparkles, CalendarCheck } from 'lucide-react';

export const VenuesAndTrendingRow: React.FC = () => {
  const { isSaved, toggleWishlist } = useWishlistStore();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const venue1 = BUSINESSES[0]; // Shantam Party Plot
  const venue2 = BUSINESSES[1]; // The Grand Bhagwati Royale

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 7 Columns: Select Your Venue */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-ivory-border shadow-soft-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
              Select Your Venue
            </h3>
            <p className="text-xs text-ink-muted">High-capacity lawn & banquet destinations</p>
          </div>
          <Link
            href="/businesses"
            className="text-xs font-bold text-forest hover:text-forest-dark flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2 Featured Venue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[venue1, venue2].map((venue) => {
            if (!venue) return null;
            const saved = isSaved(venue.id);
            return (
              <div
                key={venue.id}
                className="group rounded-2xl overflow-hidden border border-ivory-border bg-ivory/50 hover:bg-white hover:border-gold-border hover:shadow-soft-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                    <Image
                      src={venue.heroImage}
                      alt={venue.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Top heart */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(venue.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shadow-xs"
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      <span>{venue.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-serif font-bold text-sm text-ink group-hover:text-forest transition-colors truncate">
                      {venue.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-ink-muted">
                      <MapPin className="w-3 h-3 text-gold-dark shrink-0" />
                      <span className="truncate">{venue.area}</span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-forest">
                      {venue.priceDisplay}
                      <span className="text-[10px] text-ink-muted font-normal ml-1">/{venue.priceUnit}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-2">
                  <Link
                    href={`/business/${venue.slug}`}
                    className="py-1.5 px-2 rounded-lg border border-ivory-border hover:bg-ivory text-[11px] font-semibold text-center text-ink transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => openEnquiryModal(venue)}
                    className="py-1.5 px-2 rounded-lg bg-forest hover:bg-forest-light text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <CalendarCheck className="w-3 h-3 text-gold" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 5 Columns: Trending Today */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
              Trending Today
            </h3>
            <p className="text-xs text-ink-muted">Royal bridal couture & bespoke mandap themes</p>
          </div>
          <span className="text-xs font-bold text-gold-dark">#ahmedabadweddings</span>
        </div>

        {/* 2 Portrait Cards */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <Link
            href="/#wedding-reels"
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-ivory-border hover:shadow-soft transition-all duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
              alt="Bridal Couture"
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-white">
              <span className="text-[10px] uppercase font-bold text-gold-light tracking-wider block">
                Bridal Look
              </span>
              <p className="font-serif text-xs font-bold leading-snug">
                Raw Silk & Heritage Zari
              </p>
            </div>
          </Link>

          <Link
            href="/#wedding-reels"
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-ivory-border hover:shadow-soft transition-all duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80"
              alt="Floral Mandap"
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-white">
              <span className="text-[10px] uppercase font-bold text-gold-light tracking-wider block">
                Thematic Decor
              </span>
              <p className="font-serif text-xs font-bold leading-snug">
                Royal Marigold & Lotus Canopies
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs text-ink-muted">
          <span>Updated daily by Gatherly Editorial Desk</span>
          <Link href="/#wedding-reels" className="text-forest hover:underline font-bold text-[11px]">
            Watch Moments &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
