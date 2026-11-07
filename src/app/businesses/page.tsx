'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BUSINESSES } from '@/data/businesses';
import { AHMEDABAD_AREAS } from '@/data/categories';
import { BusinessCard } from '@/components/business/BusinessCard';
import { FilterBar } from '@/components/filters/FilterBar';
import { MobileFilterDrawer } from '@/components/filters/MobileFilterDrawer';
import { FilterState } from '@/types';
import { Sparkles, MapPin, SearchX, SlidersHorizontal } from 'lucide-react';

function BusinessesContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialArea = searchParams.get('area') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    categoryId: initialCategory,
    area: initialArea,
    minCapacity: 0,
    maxCapacity: 10000,
    priceRange: 'all',
    minRating: 0,
    sortBy: 'popular',
    viewMode: 'grid',
  });

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      categoryId: 'all',
      area: 'all',
      minCapacity: 0,
      maxCapacity: 10000,
      priceRange: 'all',
      minRating: 0,
      sortBy: 'popular',
      viewMode: filters.viewMode,
    });
  };

  // Filter and sort computation
  const filteredBusinesses = useMemo(() => {
    return BUSINESSES.filter((b) => {
      // Keyword search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesTagline = b.tagline.toLowerCase().includes(q);
        const matchesArea = b.area.toLowerCase().includes(q);
        const matchesCategory = b.category.toLowerCase().includes(q);
        const matchesAmenities = b.amenities.some((a) => a.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesArea && !matchesCategory && !matchesAmenities) {
          return false;
        }
      }

      // Category filter
      if (filters.categoryId !== 'all') {
        if (b.categoryId !== filters.categoryId) return false;
      }

      // Area filter
      if (filters.area !== 'all') {
        if (!b.area.toLowerCase().includes(filters.area.toLowerCase())) return false;
      }

      // Guest Capacity
      if (filters.minCapacity > 0) {
        if (b.guestCapacity.max < filters.minCapacity) return false;
      }

      // Rating
      if (filters.minRating > 0) {
        if (b.rating < filters.minRating) return false;
      }

      // Price Range filter
      if (filters.priceRange === 'budget') {
        if (b.startingPrice > 150000 && b.startingPrice > 1500) return false;
      } else if (filters.priceRange === 'luxury') {
        if (b.startingPrice < 150000 && b.startingPrice < 1500) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'price-asc') {
        return a.startingPrice - b.startingPrice;
      }
      if (filters.sortBy === 'price-desc') {
        return b.startingPrice - a.startingPrice;
      }
      if (filters.sortBy === 'capacity-desc') {
        return b.guestCapacity.max - a.guestCapacity.max;
      }
      return (b.reviewCount * b.rating) - (a.reviewCount * a.rating);
    });
  }, [filters]);

  const topAhmedabadHubs = [
    'all',
    'Sindhu Bhavan Road (SBR)',
    'SG Highway',
    'Bodakdev',
    'Prahlad Nagar',
    'Thaltej',
    'Bopal & South Bopal',
  ];

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-2">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>Ahmedabad Marketplace Directory</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
              Event Venues & Professional Services
            </h1>
            <p className="text-charcoal-muted text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Compare party plots, marriage halls, caterers, and decorators. Inquire privately through Gatherly Concierge to verify dates and rates.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-sand border border-sand-border text-xs text-charcoal self-start md:self-auto font-medium shadow-soft-xs">
            Showing <strong className="text-charcoal font-bold">{filteredBusinesses.length}</strong> vetted businesses
          </div>
        </div>

        {/* Locality Quick Filter Ribbon */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-charcoal-muted font-semibold flex items-center gap-1 shrink-0 mr-1">
            <MapPin className="w-3.5 h-3.5 text-ochre" />
            <span>Locality:</span>
          </span>
          {topAhmedabadHubs.map((hub) => (
            <button
              key={hub}
              onClick={() => handleFilterChange({ area: hub })}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all text-xs font-semibold border ${
                filters.area === hub
                  ? 'bg-coral text-white border-coral shadow-xs'
                  : 'bg-white text-charcoal border-sand-border hover:border-coral/50'
              }`}
            >
              {hub === 'all' ? 'All Ahmedabad' : hub}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            totalResults={filteredBusinesses.length}
            onOpenMobileFilters={() => setMobileDrawerOpen(true)}
          />
        </div>

        {/* Listings Display */}
        {filteredBusinesses.length > 0 ? (
          <div
            className={
              filters.viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-5'
            }
          >
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                viewMode={filters.viewMode}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-sand-border max-w-xl mx-auto shadow-soft-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-sand flex items-center justify-center text-charcoal-muted">
              <SearchX className="w-8 h-8 text-ochre" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
              No matching businesses found
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mb-6 leading-relaxed">
              We couldn’t find any businesses matching your selected filters. Try widening your capacity, budget, or resetting the search query.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-xs transition-colors shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalResults={filteredBusinesses.length}
      />
    </div>
  );
}

export default function BusinessesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-serif text-charcoal font-semibold">
              Loading Ahmedabad Listings...
            </p>
          </div>
        </div>
      }
    >
      <BusinessesContent />
    </Suspense>
  );
}
