'use client';

import React from 'react';
import { FilterState } from '@/types';
import { CATEGORIES, AHMEDABAD_AREAS } from '@/data/categories';
import { X, Check, RotateCcw } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
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
    <div className="fixed inset-0 z-[120] flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header matching dashboard */}
        <div className="p-4 bg-sand text-charcoal flex items-center justify-between border-b border-sand-border">
          <div>
            <h3 className="font-serif font-bold text-base text-charcoal">Filter Businesses</h3>
            <p className="text-[11px] text-charcoal-muted">{totalResults} options available in Ahmedabad</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal"
            aria-label="Close filters drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          {/* Area Filter */}
          <div>
            <label className="block font-bold text-charcoal mb-2">Ahmedabad Locality</label>
            <select
              value={filters.area}
              onChange={(e) => onFilterChange({ area: e.target.value })}
              className="w-full p-2.5 rounded-2xl border border-sand-border bg-sand-light focus:bg-white text-xs text-charcoal"
            >
              <option value="all">All Ahmedabad Areas</option>
              {AHMEDABAD_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block font-bold text-charcoal mb-2">Category</label>
            <select
              value={filters.categoryId}
              onChange={(e) => onFilterChange({ categoryId: e.target.value })}
              className="w-full p-2.5 rounded-2xl border border-sand-border bg-sand-light focus:bg-white text-xs text-charcoal"
            >
              <option value="all">All 15 Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.businessCount})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-bold text-charcoal mb-2">Sort Results</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="w-full p-2.5 rounded-2xl border border-sand-border bg-sand-light focus:bg-white text-xs text-charcoal"
            >
              <option value="popular">Most Popular</option>
              <option value="rating-desc">Highest Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="capacity-desc">Highest Capacity</option>
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block font-bold text-charcoal mb-2">Minimum Rating</label>
            <div className="grid grid-cols-3 gap-2">
              {[0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onFilterChange({ minRating: rating })}
                  className={`py-2 px-3 rounded-2xl border text-center font-semibold text-xs ${
                    filters.minRating === rating
                      ? 'bg-coral text-white border-coral shadow-xs'
                      : 'bg-sand-light text-charcoal border-sand-border'
                  }`}
                >
                  {rating === 0 ? 'All' : `★ ${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Capacity */}
          <div>
            <label className="block font-bold text-charcoal mb-2">Guest Capacity</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Any Size', min: 0 },
                { label: '300+ Guests', min: 300 },
                { label: '800+ Guests', min: 800 },
                { label: '1,500+ Guests', min: 1500 },
              ].map((cap) => (
                <button
                  key={cap.label}
                  type="button"
                  onClick={() => onFilterChange({ minCapacity: cap.min })}
                  className={`py-2 px-3 rounded-2xl border text-center font-semibold text-xs ${
                    filters.minCapacity === cap.min
                      ? 'bg-coral text-white border-coral shadow-xs'
                      : 'bg-sand-light text-charcoal border-sand-border'
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-sand-border bg-sand-light flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-2.5 rounded-2xl border border-sand-border bg-white text-charcoal font-semibold text-xs flex items-center justify-center gap-1.5 shadow-soft-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-xs shadow-xs"
          >
            Apply ({totalResults})
          </button>
        </div>
      </div>
    </div>
  );
};
