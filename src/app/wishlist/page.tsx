'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { BUSINESSES } from '@/data/businesses';
import { BusinessCard } from '@/components/business/BusinessCard';
import {
  Heart,
  Trash2,
  CalendarCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function WishlistPage() {
  const { savedIds, clearWishlist } = useWishlistStore();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const savedBusinesses = BUSINESSES.filter((b) => savedIds.includes(b.id));

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-ivory-border">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Personal Shortlist</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Your Saved Venues &amp; Services
            </h1>
            <p className="text-sm text-ink-secondary mt-1">
              You have shortlisted {savedBusinesses.length} celebration options in Ahmedabad.
            </p>
          </div>

          {savedBusinesses.length > 0 && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                onClick={() => openEnquiryModal()}
                className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <CalendarCheck className="w-4 h-4 text-gold" />
                <span>Enquire for All Shortlisted</span>
              </button>
              <button
                onClick={clearWishlist}
                className="p-2.5 rounded-xl border border-ivory-border bg-white hover:bg-rose-50 text-ink-muted hover:text-rose-600 transition-colors"
                title="Clear wishlist"
              >
                <Trash2 className="w-4 h-4" />
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
          <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft-sm max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">
              Your wishlist is currently empty
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
              Browse Ahmedabad party plots, banquet halls, and decorators and tap the heart icon to save your favorites for easy comparison.
            </p>
            <Link
              href="/businesses"
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-gold" />
              <span>Explore Businesses Now</span>
            </Link>
          </div>
        )}

        {/* Concierge Reminder */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-soft text-forest flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-ink">Need assistance comparing shortlisted venues?</h4>
              <p className="text-xs text-ink-muted">Our concierge desk will review your shortlist and verify which venues have open dates.</p>
            </div>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="px-5 py-2.5 rounded-xl border border-forest text-forest hover:bg-emerald-soft font-bold text-xs shrink-0 transition-colors"
          >
            Ask Concierge
          </button>
        </div>
      </div>
    </div>
  );
}
