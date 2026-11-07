'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BUSINESSES } from '@/data/businesses';
import { BusinessCard } from '@/components/business/BusinessCard';
import { FilterBar } from '@/components/filters/FilterBar';
import { MobileFilterDrawer } from '@/components/filters/MobileFilterDrawer';
import { FilterState } from '@/types';
import { Search, Sparkles, MapPin, SearchX, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') || '';
  const area = searchParams.get('area') || 'all';
  const category = searchParams.get('category') || 'all';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: query,
    categoryId: category,
    area: area,
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
    router.push('/search');
  };

  const results = useMemo(() => {
    return BUSINESSES.filter((b) => {
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

      if (filters.categoryId !== 'all' && b.categoryId !== filters.categoryId) {
        return false;
      }

      if (filters.area !== 'all' && !b.area.toLowerCase().includes(filters.area.toLowerCase())) {
        return false;
      }

      if (filters.minCapacity > 0 && b.guestCapacity.max < filters.minCapacity) {
        return false;
      }

      if (filters.minRating > 0 && b.rating < filters.minRating) {
        return false;
      }

      if (filters.priceRange === 'budget' && b.startingPrice > 150000 && b.startingPrice > 1500) {
        return false;
      } else if (filters.priceRange === 'luxury' && b.startingPrice < 150000 && b.startingPrice < 1500) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      if (filters.sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (filters.sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (filters.sortBy === 'capacity-desc') return b.guestCapacity.max - a.guestCapacity.max;
      return (b.reviewCount * b.rating) - (a.reviewCount * a.rating);
    });
  }, [filters]);

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Banner */}
        <div className="mb-8 p-6 sm:p-8 bg-sand rounded-3xl border border-sand-border shadow-soft-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-coral border border-sand-border mb-3 shadow-soft-xs">
              <Search className="w-3.5 h-3.5 text-coral" />
              <span>Search Results</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
              {filters.searchQuery ? `Results for “${filters.searchQuery}”` : 'Search Ahmedabad Businesses'}
            </h1>
            <p className="text-charcoal-muted text-xs sm:text-sm mt-2 leading-relaxed">
              Found {results.length} celebration venues and specialists in Ahmedabad ready for private Gatherly concierge enquiry.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            totalResults={results.length}
            onOpenMobileFilters={() => setMobileDrawerOpen(true)}
          />
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div
            className={
              filters.viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-5'
            }
          >
            {results.map((b) => (
              <BusinessCard key={b.id} business={b} viewMode={filters.viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-sand-border max-w-xl mx-auto shadow-soft-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-sand flex items-center justify-center text-charcoal-muted">
              <SearchX className="w-8 h-8 text-ochre" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
              No results found
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mb-6 leading-relaxed">
              No businesses matched your search query or filters. Check your spelling or browse our popular categories.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-2xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs"
              >
                Reset Search
              </button>
              <Link
                href="/explore"
                className="px-5 py-2.5 rounded-2xl bg-sand hover:bg-sand-dark text-charcoal text-xs font-semibold border border-sand-border"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        )}
      </div>

      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalResults={results.length}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
