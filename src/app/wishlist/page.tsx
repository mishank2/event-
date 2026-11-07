'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BUSINESSES } from '@/data/businesses';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { BusinessCard } from '@/components/business/BusinessCard';
import {
  Heart,
  Send,
  Trash2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const savedIds = useWishlistStore((state) => state.savedIds);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  useEffect(() => {
    setMounted(true);
  }, []);

  const savedBusinesses = BUSINESSES.filter((b) => savedIds.includes(b.id));

  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#FBF9F5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-sand-border">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-coral mb-1.5">
              <Heart className="w-3.5 h-3.5 text-coral fill-current" />
              <span>Saved Shortlist</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
              Your Celebration Wishlist
            </h1>
            <p className="text-charcoal-muted text-xs sm:text-sm mt-1.5">
              {savedBusinesses.length} {savedBusinesses.length === 1 ? 'business' : 'businesses'} saved for your celebration in Ahmedabad.
            </p>
          </div>

          {savedBusinesses.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 rounded-2xl border border-sand-border bg-white text-xs text-charcoal-muted hover:text-coral transition-colors flex items-center gap-1.5 shadow-soft-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>

              <button
                onClick={() => openEnquiryModal()}
                className="px-5 py-2.5 rounded-2xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enquire Shortlisted</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {savedBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBusinesses.map((b) => (
              <BusinessCard key={b.id} business={b} viewMode="grid" />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-sand-border max-w-lg mx-auto shadow-soft-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-coral-soft flex items-center justify-center text-coral">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mb-6 leading-relaxed">
              Explore Ahmedabad party plots, banquet halls, and decorators. Tap the heart icon on any card to save your favorites here.
            </p>
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-xs transition-colors shadow-xs"
            >
              <span>Explore Ahmedabad Businesses</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
