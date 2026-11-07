'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BUSINESSES } from '@/data/businesses';
import { BusinessCard } from '@/components/business/BusinessCard';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export const FeaturedVenues: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'party-plots' | 'banquet-halls' | 'services'>('all');

  const filteredBusinesses = BUSINESSES.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'party-plots') return b.categoryId === 'party-plots' || b.categoryId === 'wedding-gardens';
    if (activeTab === 'banquet-halls') return b.categoryId === 'banquet-halls' || b.categoryId === 'marriage-halls';
    if (activeTab === 'services') return b.categoryId === 'catering' || b.categoryId === 'decoration' || b.categoryId === 'photography';
    return true;
  });

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Ahmedabad Prime Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
              Featured Venues & Curated Partners
            </h2>
            <p className="text-charcoal-muted text-sm sm:text-base mt-2.5 max-w-xl leading-relaxed">
              Handpicked celebration spaces and premier services across Sindhu Bhavan Road, Bodakdev, and S.G. Highway.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-ivory rounded-2xl border border-ivory-border">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'party-plots', label: 'Party Plots & Lawns' },
              { id: 'banquet-halls', label: 'Banquet & Halls' },
              { id: 'services', label: 'Catering & Decor' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-forest text-white shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.slice(0, 6).map((business) => (
            <BusinessCard key={business.id} business={business} viewMode="grid" />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-forest hover:bg-forest-light text-white font-semibold text-sm shadow-soft hover:shadow-soft-lg transition-all"
          >
            <span>Explore All Ahmedabad Businesses</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
};
