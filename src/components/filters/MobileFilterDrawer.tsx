'use client';

import React from 'react';
import { FilterState } from '@/types';
import { CATEGORIES, AHMEDABAD_AREAS } from '@/data/categories';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  totalResults: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end lg:hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up">
        {/* Drawer Header */}
        <div className="p-5 border-b border-ivory-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-forest" />
            <h3 className="font-serif text-lg font-bold text-ink">Filter Listings</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="text-xs text-rose-600 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-ink-secondary hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Controls */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
              Event Category
            </label>
            <select
              value={filters.categoryId}
              onChange={(e) => onFilterChange('categoryId', e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-ivory-border bg-ivory text-ink"
            >
              <option value="all">All 15 Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.businessCount})
                </option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
              Ahmedabad Corridor
            </label>
            <select
              value={filters.area}
              onChange={(e) => onFilterChange('area', e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-ivory-border bg-ivory text-ink"
            >
              <option value="all">All Ahmedabad Corridors</option>
              {AHMEDABAD_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
              Budget Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['all', 'budget', 'mid', 'luxury'].map((p) => (
                <button
                  key={p}
                  onClick={() => onFilterChange('priceRange', p)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    filters.priceRange === p
                      ? 'bg-forest text-white border-forest'
                      : 'bg-ivory text-ink-secondary border-ivory-border'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0, 4.0, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => onFilterChange('minRating', r)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    filters.minRating === r
                      ? 'bg-gold-dark text-white border-gold-dark'
                      : 'bg-ivory text-ink-secondary border-ivory-border'
                  }`}
                >
                  {r === 0 ? 'Any Rating' : `${r}★ & Above`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
              Sort Results By
            </label>
            <div className="space-y-1.5">
              {[
                { label: 'Popular First', val: 'popular' },
                { label: 'Highest Rated', val: 'rating-desc' },
                { label: 'Price: Low to High', val: 'price-asc' },
                { label: 'Price: High to Low', val: 'price-desc' },
                { label: 'Capacity: Largest First', val: 'capacity-desc' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => onFilterChange('sortBy', s.val as FilterState['sortBy'])}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between border transition-all ${
                    filters.sortBy === s.val
                      ? 'bg-emerald-soft text-forest border-emerald-primary/30'
                      : 'bg-ivory text-ink-secondary border-ivory-border'
                  }`}
                >
                  <span>{s.label}</span>
                  {filters.sortBy === s.val && <Check className="w-4 h-4 text-forest" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply CTA Footer */}
        <div className="p-5 border-t border-ivory-border bg-ivory">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-md transition-colors"
          >
            Show {totalResults} Venues & Vendors
          </button>
        </div>
      </div>
    </div>
  );
};
