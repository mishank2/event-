'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BUSINESSES } from '@/data/businesses';
import { FilterState, Business } from '@/types';
import { BusinessCard } from '@/components/business/BusinessCard';
import { FilterBar } from '@/components/filters/FilterBar';
import { MobileFilterDrawer } from '@/components/filters/MobileFilterDrawer';
import {
  Building2,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  MapPin,
  CalendarCheck,
} from 'lucide-react';

function BusinessesContent() {
  const searchParams = useSearchParams();

  // Read URL params
  const initialCategory = searchParams.get('category') || 'all';
  const initialArea = searchParams.get('area') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialFilter = searchParams.get('filter');

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

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Active filter counter
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.categoryId !== 'all') count++;
    if (filters.area !== 'all') count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.minCapacity > 0) count++;
    return count;
  }, [filters]);

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
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

  // Filter & Sort Logic
  const filteredBusinesses = useMemo(() => {
    return BUSINESSES.filter((b) => {
      // Featured filter
      if (initialFilter === 'featured' && !b.featured) {
        return false;
      }

      // Query search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesArea = b.area.toLowerCase().includes(q);
        const matchesCategory = b.category.toLowerCase().includes(q);
        const matchesTagline = b.tagline.toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesCategory && !matchesTagline) {
          return false;
        }
      }

      // Category filter
      if (filters.categoryId !== 'all' && b.categoryId !== filters.categoryId) {
        return false;
      }

      // Area filter
      if (filters.area !== 'all') {
        const areaLower = filters.area.toLowerCase();
        if (!b.area.toLowerCase().includes(areaLower.split(' ')[0])) {
          return false;
        }
      }

      // Price Range
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'budget' && b.startingPrice > 100000) return false;
        if (
          filters.priceRange === 'mid' &&
          (b.startingPrice <= 100000 || b.startingPrice > 250000)
        )
          return false;
        if (filters.priceRange === 'luxury' && b.startingPrice <= 250000) return false;
      }

      // Rating
      if (filters.minRating > 0 && b.rating < filters.minRating) {
        return false;
      }

      // Capacity
      if (b.guestCapacity.max < filters.minCapacity) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'popular') {
        return b.reviewCount - a.reviewCount;
      }
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
      return 0;
    });
  }, [filters, initialFilter]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-gold-dark" />
            <span>Marketplace Directory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Explore Venues &amp; Event Services
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-2 max-w-2xl font-normal">
            Discover verified party plots, banquet halls, and wedding specialists across Ahmedabad. Filter by corridor, guest capacity, and budget.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          activeFilterCount={activeFilterCount}
          totalResults={filteredBusinesses.length}
          onOpenMobileFilters={() => setIsMobileDrawerOpen(true)}
        />

        {/* Results Grid / List */}
        {filteredBusinesses.length > 0 ? (
          <div
            className={
              filters.viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-5'
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
          <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft-sm max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-emerald-soft flex items-center justify-center text-forest mx-auto mb-4">
              <Building2 className="w-8 h-8 text-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">
              No matching listings found
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
              Try adjusting your corridor filters, category selections, or search terms to discover more Ahmedabad venues.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-gold" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={filteredBusinesses.length}
      />
    </div>
  );
}

export default function BusinessesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm font-semibold text-ink-muted">
          Loading Ahmedabad venues...
        </div>
      }
    >
      <BusinessesContent />
    </Suspense>
  );
}
