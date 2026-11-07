'use client';

import React from 'react';
import { FilterState } from '@/types';
import { CATEGORIES, AHMEDABAD_AREAS, EVENT_TYPES } from '@/data/categories';
import {
  Search,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  RotateCcw,
  Calendar,
} from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  activeFilterCount: number;
  totalResults: number;
  onOpenMobileFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  activeFilterCount,
  totalResults,
  onOpenMobileFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm mb-8 space-y-4">
      {/* Top Filter Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Search Input (3 cols) */}
        <div className="lg:col-span-3 relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Search venue or vendor..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest text-ink placeholder:text-ink-muted transition-all"
          />
        </div>

        {/* Event Type Filter (3 cols) - NEW ALL-EVENT COMPATIBILITY */}
        <div className="lg:col-span-3">
          <div className="relative">
            <Calendar className="w-4 h-4 text-forest absolute left-3 top-3 pointer-events-none" />
            <select
              value={filters.eventType}
              onChange={(e) => onFilterChange('eventType', e.target.value)}
              className="w-full pl-8 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest text-ink transition-all font-medium"
            >
              {EVENT_TYPES.map((evt) => (
                <option key={evt} value={evt}>
                  {evt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Dropdown (2 cols) */}
        <div className="lg:col-span-2">
          <select
            value={filters.categoryId}
            onChange={(e) => onFilterChange('categoryId', e.target.value)}
            className="w-full px-2.5 py-2.5 text-xs rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest text-ink transition-all truncate"
          >
            <option value="all">All Categories ({CATEGORIES.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.businessCount})
              </option>
            ))}
          </select>
        </div>

        {/* Area Dropdown (2 cols) */}
        <div className="lg:col-span-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-gold-dark absolute left-2.5 top-3 pointer-events-none" />
            <select
              value={filters.area}
              onChange={(e) => onFilterChange('area', e.target.value)}
              className="w-full pl-7 pr-2.5 py-2.5 text-xs rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:outline-none focus:border-forest text-ink transition-all truncate"
            >
              <option value="all">All Corridors</option>
              {AHMEDABAD_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort & Mobile Drawer Trigger (2 cols) */}
        <div className="lg:col-span-2 flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
            className="w-full px-2.5 py-2.5 text-xs rounded-xl border border-ivory-border bg-ivory focus:bg-white text-ink transition-all"
          >
            <option value="popular">Popular First</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="capacity-desc">Capacity: Large First</option>
          </select>

          {/* Mobile Filter Drawer Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden p-2.5 rounded-xl border border-ivory-border bg-ivory hover:bg-ivory-dark text-ink relative shrink-0"
            aria-label="Open filter options"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-forest text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Quick-Pick Filters & Controls (Desktop) */}
      <div className="hidden lg:flex items-center justify-between pt-3 border-t border-ivory-border text-xs">
        {/* Capacity & Price Toggles */}
        <div className="flex items-center gap-4">
          {/* Price Range */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-ink-muted">Budget:</span>
            {['all', 'budget', 'mid', 'luxury'].map((p) => (
              <button
                key={p}
                onClick={() => onFilterChange('priceRange', p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filters.priceRange === p
                    ? 'bg-forest text-white shadow-2xs'
                    : 'bg-ivory text-ink-secondary hover:bg-ivory-dark border border-ivory-border'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pl-4 border-l border-ivory-border">
            <span className="text-[11px] font-semibold text-ink-muted">Min Rating:</span>
            {[0, 4.0, 4.5].map((r) => (
              <button
                key={r}
                onClick={() => onFilterChange('minRating', r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filters.minRating === r
                    ? 'bg-gold-dark text-white shadow-2xs'
                    : 'bg-ivory text-ink-secondary hover:bg-ivory-dark border border-ivory-border'
                }`}
              >
                {r === 0 ? 'All' : `${r}★+`}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode & Counter */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-ink-secondary">
            Showing <strong className="text-forest font-bold">{totalResults}</strong> listings
          </span>

          {/* Grid / List Toggles */}
          <div className="flex items-center p-0.5 rounded-xl bg-ivory border border-ivory-border">
            <button
              onClick={() => onFilterChange('viewMode', 'grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-forest shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onFilterChange('viewMode', 'list')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.viewMode === 'list'
                  ? 'bg-white text-forest shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-rose-600 hover:underline font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ivory-border text-xs">
          <span className="text-[11px] font-semibold text-ink-muted">Active Filters:</span>

          {filters.eventType !== 'All Events' && (
            <span className="px-2.5 py-1 rounded-full bg-forest text-white font-semibold flex items-center gap-1 shadow-2xs">
              Event: {filters.eventType}
              <button onClick={() => onFilterChange('eventType', 'All Events')}>
                <X className="w-3 h-3 hover:text-white/80" />
              </button>
            </span>
          )}

          {filters.searchQuery && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-soft text-forest font-semibold flex items-center gap-1">
              &quot;{filters.searchQuery}&quot;
              <button onClick={() => onFilterChange('searchQuery', '')}>
                <X className="w-3 h-3 hover:text-forest-dark" />
              </button>
            </span>
          )}

          {filters.categoryId !== 'all' && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-soft text-forest font-semibold flex items-center gap-1">
              Category: {filters.categoryId}
              <button onClick={() => onFilterChange('categoryId', 'all')}>
                <X className="w-3 h-3 hover:text-forest-dark" />
              </button>
            </span>
          )}

          {filters.area !== 'all' && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-soft text-forest font-semibold flex items-center gap-1">
              Area: {filters.area}
              <button onClick={() => onFilterChange('area', 'all')}>
                <X className="w-3 h-3 hover:text-forest-dark" />
              </button>
            </span>
          )}

          {filters.priceRange !== 'all' && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-soft text-forest font-semibold flex items-center gap-1 capitalize">
              Budget: {filters.priceRange}
              <button onClick={() => onFilterChange('priceRange', 'all')}>
                <X className="w-3 h-3 hover:text-forest-dark" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-soft text-forest font-semibold flex items-center gap-1">
              {filters.minRating}★+
              <button onClick={() => onFilterChange('minRating', 0)}>
                <X className="w-3 h-3 hover:text-forest-dark" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
