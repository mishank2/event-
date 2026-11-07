'use client';

import React from 'react';
import { FilterState } from '@/types';
import { CATEGORIES, AHMEDABAD_AREAS } from '@/data/categories';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  Users,
  RotateCcw
} from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
  onOpenMobileFilters?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  onOpenMobileFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-sand-border p-5 shadow-soft-sm space-y-4">
      {/* Search & Top Action Row */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search venue name, service, or locality (e.g. Shantam, SBR, Catering)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-sand-border bg-sand-light focus:bg-white focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all text-charcoal"
          />
        </div>

        {/* Desktop Quick Dropdowns */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Area Selector */}
          <div className="relative min-w-[170px]">
            <MapPin className="w-3.5 h-3.5 text-ochre absolute left-3 top-3.5 pointer-events-none" />
            <select
              value={filters.area}
              onChange={(e) => onFilterChange({ area: e.target.value })}
              className="w-full pl-8 pr-3 py-2.5 text-xs rounded-2xl border border-sand-border bg-sand-light text-charcoal focus:outline-none focus:border-coral"
            >
              <option value="all">All Ahmedabad Areas</option>
              {AHMEDABAD_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <select
            value={filters.categoryId}
            onChange={(e) => onFilterChange({ categoryId: e.target.value })}
            className="px-3.5 py-2.5 text-xs rounded-2xl border border-sand-border bg-sand-light text-charcoal focus:outline-none focus:border-coral min-w-[160px]"
          >
            <option value="all">All 15 Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.businessCount})
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="px-3.5 py-2.5 text-xs rounded-2xl border border-sand-border bg-sand-light text-charcoal focus:outline-none focus:border-coral min-w-[150px]"
          >
            <option value="popular">Most Popular</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="capacity-desc">Highest Capacity</option>
          </select>

          {/* Grid / List Toggle */}
          <div className="flex items-center bg-sand-light rounded-2xl border border-sand-border p-1">
            <button
              onClick={() => onFilterChange({ viewMode: 'grid' })}
              className={`p-2 rounded-xl transition-colors ${
                filters.viewMode === 'grid'
                  ? 'bg-coral text-white shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFilterChange({ viewMode: 'list' })}
              className={`p-2 rounded-xl transition-colors ${
                filters.viewMode === 'list'
                  ? 'bg-coral text-white shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
              title="List view"
              aria-label="List view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex md:hidden items-center justify-between gap-2">
          <button
            onClick={onOpenMobileFilters}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-sand text-charcoal text-xs font-semibold border border-sand-border"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-coral" />
            <span>Filters & Sort</span>
          </button>

          <div className="flex items-center bg-sand-light rounded-2xl border border-sand-border p-1">
            <button
              onClick={() => onFilterChange({ viewMode: 'grid' })}
              className={`p-2 rounded-xl ${
                filters.viewMode === 'grid' ? 'bg-coral text-white' : 'text-charcoal-muted'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFilterChange({ viewMode: 'list' })}
              className={`p-2 rounded-xl ${
                filters.viewMode === 'list' ? 'bg-coral text-white' : 'text-charcoal-muted'
              }`}
              aria-label="List view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Filters: Rating, Capacity, Price */}
      <div className="hidden lg:flex items-center justify-between pt-3.5 border-t border-sand-border text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-charcoal">Quick Filters:</span>

          {/* Rating Pills */}
          <div className="flex items-center gap-1">
            {[0, 4.5, 4.8].map((rating) => (
              <button
                key={rating}
                onClick={() => onFilterChange({ minRating: rating })}
                className={`px-3 py-1 rounded-xl border transition-colors font-medium ${
                  filters.minRating === rating
                    ? 'bg-coral text-white border-coral shadow-xs'
                    : 'bg-sand-light text-charcoal border-sand-border hover:border-coral/50'
                }`}
              >
                {rating === 0 ? 'All Ratings' : `★ ${rating}+`}
              </button>
            ))}
          </div>

          {/* Capacity Quick Filter */}
          <div className="flex items-center gap-1 ml-2">
            {[
              { label: 'All Sizes', min: 0 },
              { label: '500+ Guests', min: 500 },
              { label: '1,500+ Guests', min: 1500 },
            ].map((cap) => (
              <button
                key={cap.label}
                onClick={() => onFilterChange({ minCapacity: cap.min })}
                className={`px-3 py-1 rounded-xl border transition-colors font-medium ${
                  filters.minCapacity === cap.min
                    ? 'bg-coral text-white border-coral shadow-xs'
                    : 'bg-sand-light text-charcoal border-sand-border hover:border-coral/50'
                }`}
              >
                {cap.label}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-1 ml-2">
            {[
              { id: 'all', label: 'All Budgets' },
              { id: 'budget', label: 'Under ₹1.5L / ₹1,500' },
              { id: 'luxury', label: 'Luxury & Grande' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onFilterChange({ priceRange: p.id })}
                className={`px-3 py-1 rounded-xl border transition-colors font-medium ${
                  filters.priceRange === p.id
                    ? 'bg-coral text-white border-coral shadow-xs'
                    : 'bg-sand-light text-charcoal border-sand-border hover:border-coral/50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-charcoal-muted font-medium">
            <strong className="text-charcoal font-bold">{totalResults}</strong> options in Ahmedabad
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-charcoal-muted hover:text-coral transition-colors font-semibold"
            title="Reset filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
