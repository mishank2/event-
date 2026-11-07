'use client';

import React, { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BUSINESSES } from '@/data/businesses';
import { BusinessCard } from '@/components/business/BusinessCard';
import { Search, Building2, RotateCcw, ArrowRight } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return BUSINESSES.slice(0, 9);
    const q = query.toLowerCase();
    return BUSINESSES.filter((b) => {
      return (
        b.name.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <Search className="w-3.5 h-3.5 text-gold-dark" />
            <span>Search Results</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            {query ? (
              <>
                Results for &ldquo;<span className="text-forest">{query}</span>&rdquo;
              </>
            ) : (
              'Browse Ahmedabad Venues & Services'
            )}
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Found <strong className="text-forest">{results.length}</strong> matching listings in Ahmedabad.
          </p>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((b) => (
              <BusinessCard key={b.id} business={b} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft-sm max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-emerald-soft text-forest flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">
              No results found for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
              Try searching by general terms like &quot;Party Plot&quot;, &quot;Banquet&quot;, &quot;Catering&quot;, or corridors like &quot;Sindhu Bhavan Road&quot;.
            </p>
            <Link
              href="/businesses"
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-gold" />
              <span>Browse All Listings</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm font-semibold text-ink-muted">
          Searching Ahmedabad venues...
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
