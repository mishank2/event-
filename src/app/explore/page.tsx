'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import {
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-gold-dark" />
            <span>Category Directory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Explore All {CATEGORIES.length} Event Categories
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-2 font-normal leading-relaxed">
            Discover Ahmedabad&apos;s complete celebration and event ecosystem — from open party plots and conference auditoriums to birthday party lounges, decorators, and catering specialists.
          </p>
        </div>

        {/* 15 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/businesses?category=${cat.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-forest text-white text-[11px] font-bold shadow-xs">
                    {cat.name}
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                    {cat.businessCount} Curated Businesses
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    {cat.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-ivory-border flex items-center justify-between text-xs font-bold text-forest">
                  <span>Explore Listings</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-soft flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
