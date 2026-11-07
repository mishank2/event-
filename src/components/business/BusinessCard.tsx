'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@/types';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useToastStore } from '@/store/useToastStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Heart,
  Star,
  MapPin,
  Users,
  CheckCircle,
  ChevronRight,
  Send,
  ShieldCheck
} from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  viewMode?: 'grid' | 'list';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  viewMode = 'grid',
}) => {
  const [mounted, setMounted] = useState(false);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isSaved = useWishlistStore((state) => state.isSaved(business.id));
  const addToast = useToastStore((state) => state.addToast);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = toggleWishlist(business.id);
    if (saved) {
      addToast({
        type: 'success',
        title: 'Saved to Wishlist',
        message: `${business.name} added to your celebration shortlist.`,
      });
    } else {
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${business.name} removed from your shortlist.`,
      });
    }
  };

  const handleEnquiryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openEnquiryModal(business);
  };

  const savedState = mounted ? isSaved : false;

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white rounded-3xl border border-sand-border hover:border-coral/40 shadow-soft-sm hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-sand-light">
          <Image
            src={business.heroImage}
            alt={business.name}
            fill
            sizes="(max-width: 768px) 100vw, 340px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-charcoal backdrop-blur-md shadow-xs border border-sand-border">
              {business.category}
            </span>
            {business.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sand text-charcoal border border-sand-border shadow-xs">
                <CheckCircle className="w-3 h-3 text-coral" />
                <span>Verified Partner</span>
              </span>
            )}
          </div>

          {/* Wishlist Button matching screenshot */}
          <button
            onClick={handleWishlistClick}
            aria-label={savedState ? 'Remove from wishlist' : 'Save to wishlist'}
            className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-coral transition-all z-10 shadow-xs"
          >
            <Heart className={`w-4 h-4 ${savedState ? 'fill-current' : 'text-coral'}`} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1 text-xs text-charcoal-muted mb-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-ochre shrink-0" />
                  <span>{business.area}, Ahmedabad</span>
                </div>
                <Link href={`/business/${business.slug}`}>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-coral transition-colors line-clamp-1">
                    {business.name}
                  </h3>
                </Link>
              </div>

              {/* Rating in Ochre Gold matching screenshot */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-ochre-soft border border-ochre-border shrink-0">
                <Star className="w-3.5 h-3.5 fill-ochre text-ochre" />
                <span className="text-xs font-bold text-charcoal">{business.rating.toFixed(1)}</span>
                <span className="text-[10px] text-charcoal-muted">({business.reviewCount})</span>
              </div>
            </div>

            <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
              {business.tagline}
            </p>

            {/* Quick Specs */}
            <div className="flex flex-wrap items-center gap-3.5 mt-3.5 text-xs">
              <div className="flex items-center gap-1.5 bg-sand-light px-3 py-1 rounded-xl border border-sand-border text-charcoal">
                <Users className="w-3.5 h-3.5 text-charcoal-muted" />
                <span className="font-medium">{business.capacityDisplay}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold bg-sand px-3 py-1 rounded-xl border border-sand-border text-charcoal">
                <span className="text-xs text-charcoal-muted font-normal">Pricing:</span>
                <span className="text-sm font-bold text-charcoal">{business.priceDisplay}</span>
                <span className="text-[11px] text-charcoal-muted font-normal">({business.priceUnit})</span>
              </div>
            </div>

            {/* Amenities Preview */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {business.amenities.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg text-[10px] bg-sand-light text-charcoal-muted border border-sand-border"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-sand-border flex items-center justify-between gap-3">
            <span className="text-[11px] text-charcoal-muted flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-ochre" />
              <span>Gatherly Concierge Booking</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEnquiryClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Send className="w-3 h-3 text-white" />
                <span>Enquire</span>
              </button>
              <Link
                href={`/business/${business.slug}`}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-sand-light hover:bg-sand text-charcoal text-xs font-semibold border border-sand-border transition-colors group/btn"
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4 text-coral group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode (matches "Select Your Venue" card styling in screenshot)
  return (
    <div className="group relative bg-white rounded-3xl border border-sand-border hover:border-coral/40 shadow-soft-sm hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top Image */}
      <div className="relative w-full h-48 overflow-hidden bg-sand-light">
        <Image
          src={business.heroImage}
          alt={business.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-charcoal backdrop-blur-md shadow-xs border border-sand-border">
            {business.category}
          </span>
        </div>

        {/* Wishlist Button matching screenshot */}
        <button
          onClick={handleWishlistClick}
          aria-label={savedState ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-coral transition-all z-10 shadow-xs"
        >
          <Heart className={`w-4 h-4 ${savedState ? 'fill-current text-coral' : 'text-coral'}`} />
        </button>

        {/* Locality Tag */}
        <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
          {business.area}
        </div>
      </div>

      {/* Body matching screenshot */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link href={`/business/${business.slug}`} className="flex-1">
              <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-coral transition-colors line-clamp-1">
                {business.name}
              </h3>
            </Link>

            {/* Ochre Star Rating */}
            <div className="flex items-center gap-1 text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-ochre text-ochre" />
              <span className="font-bold text-charcoal">{business.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
            {business.tagline}
          </p>

          <div className="flex items-center gap-2 mt-3 text-xs text-charcoal-muted">
            <Users className="w-3.5 h-3.5" />
            <span>{business.capacityDisplay}</span>
          </div>
        </div>

        {/* Bottom Pricing & Actions */}
        <div className="mt-4 pt-3.5 border-t border-sand-border">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                Starting Rate
              </span>
              <span className="text-base font-bold text-charcoal">
                {business.priceDisplay}
              </span>
              <span className="text-[11px] text-charcoal-muted ml-1">
                /{business.priceUnit}
              </span>
            </div>

            <span className="text-[10px] bg-sand text-charcoal font-semibold px-2 py-0.5 rounded-lg border border-sand-border">
              Concierge
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleEnquiryClick}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Send className="w-3 h-3 text-white" />
              <span>Enquire</span>
            </button>
            <Link
              href={`/business/${business.slug}`}
              className="w-full flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-sand-light hover:bg-sand text-charcoal text-xs font-semibold border border-sand-border transition-colors group/btn"
            >
              <span>Details</span>
              <ChevronRight className="w-3.5 h-3.5 text-coral group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
