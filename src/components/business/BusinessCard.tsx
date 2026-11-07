'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@/types';
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

interface BusinessCardProps {
  business: Business;
  viewMode?: 'grid' | 'list';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  viewMode = 'grid',
}) => {
  const { isSaved, toggleWishlist } = useWishlistStore();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const saved = isSaved(business.id);

  // List View Mode
  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col md:flex-row hover:-translate-y-0.5">
        {/* Media Container (1/3 on desktop) */}
        <div className="relative md:w-80 aspect-[16/10] md:aspect-auto overflow-hidden bg-ivory-dark shrink-0">
          <Image
            src={business.heroImage}
            alt={business.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none md:hidden" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-full bg-forest text-white text-[10px] font-bold backdrop-blur-md">
              {business.category}
            </span>
            {business.verified && (
              <span className="px-2 py-0.5 rounded-full bg-gold-dark text-white text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-light" />
                <span>Audited</span>
              </span>
            )}
          </div>

          {/* Heart button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(business.id);
            }}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shadow-xs z-10"
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Rating */}
          <div className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>{business.rating.toFixed(1)}</span>
            <span className="text-white/60 text-[10px] font-normal">({business.reviewCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="font-serif text-xl font-bold text-ink group-hover:text-forest transition-colors">
                  {business.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-ink-muted">
                  <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                  <span>{business.area}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-ink-muted uppercase tracking-wider block">Starts at</span>
                <span className="font-bold text-forest text-lg">{business.priceDisplay}</span>
                <span className="text-[10px] text-ink-muted ml-1">/{business.priceUnit}</span>
              </div>
            </div>

            <p className="text-xs text-ink-secondary mt-3 line-clamp-2 leading-relaxed">
              {business.description}
            </p>

            {/* Amenities Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {business.amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="px-2.5 py-1 rounded-full bg-ivory text-ink-secondary text-[11px] font-medium border border-ivory-border"
                >
                  {amenity}
                </span>
              ))}
              {business.amenities.length > 4 && (
                <span className="px-2 py-1 rounded-full bg-ivory text-ink-muted text-[10px]">
                  +{business.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-5 pt-4 border-t border-ivory-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-ink-secondary">
              <Users className="w-4 h-4 text-forest shrink-0" />
              <span>{business.capacityDisplay}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href={`/business/${business.slug}`}
                className="flex-1 sm:flex-initial py-2 px-4 rounded-xl border border-ivory-border hover:bg-ivory text-xs font-semibold text-center text-ink transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={() => openEnquiryModal(business)}
                className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-gold" />
                <span>Check Availability</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode (Default)
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Media Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
          <Image
            src={business.heroImage}
            alt={business.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-forest text-white text-[10px] font-bold backdrop-blur-md">
                {business.category}
              </span>
              {business.verified && (
                <span className="px-2 py-0.5 rounded-full bg-gold-dark text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md">
                  <ShieldCheck className="w-3 h-3 text-gold-light" />
                  <span>Audited</span>
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(business.id);
              }}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shadow-xs"
              aria-label="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Rating Pill Bottom Left */}
          <div className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>{business.rating.toFixed(1)}</span>
            <span className="text-white/60 text-[10px] font-normal">({business.reviewCount})</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors line-clamp-1">
            {business.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-ink-muted">
            <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span className="truncate">{business.area}</span>
          </div>

          <p className="text-xs text-ink-secondary mt-2.5 line-clamp-2 leading-relaxed">
            {business.tagline}
          </p>

          {/* Capacity & Price Row */}
          <div className="mt-4 pt-3 border-t border-ivory-border grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-ink-secondary">
              <Users className="w-3.5 h-3.5 text-forest shrink-0" />
              <span className="truncate">{business.capacityDisplay}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-ink-muted uppercase tracking-wider block">Starts at</span>
              <span className="font-bold text-forest text-sm">{business.priceDisplay}</span>
              <span className="text-[10px] text-ink-muted ml-0.5">/{business.priceUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0">
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-ivory-border">
          <Link
            href={`/business/${business.slug}`}
            className="py-2.5 px-2 rounded-xl border border-ivory-border hover:bg-ivory text-xs font-semibold text-center text-ink transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => openEnquiryModal(business)}
            className="py-2.5 px-2 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-gold" />
            <span>Enquire Date</span>
          </button>
        </div>
      </div>
    </div>
  );
};
