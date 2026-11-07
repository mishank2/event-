'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export const VendorCategoriesRow: React.FC = () => {
  const vendorCategories = [
    {
      title: 'Event Decorators',
      slug: 'decoration',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      count: '27 Verified Teams',
    },
    {
      title: 'Bridal Makeup',
      slug: 'makeup-artists',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      count: '21 Specialists',
    },
    {
      title: 'Florists & Mandap',
      slug: 'wedding-gardens',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      count: '34 Designers',
    },
    {
      title: 'DJ & Sound Stages',
      slug: 'dj-sound',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      count: '16 Audio Teams',
    },
  ];

  return (
    <div className="mb-8">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
            Celebration Specialists
          </h3>
          <p className="text-xs text-ink-muted">Top booked vendor categories across western Ahmedabad</p>
        </div>
        <Link
          href="/explore"
          className="text-xs font-bold text-forest hover:text-forest-dark flex items-center gap-1 group"
        >
          <span>View All Vendors</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {vendorCategories.map((cat) => (
          <Link
            key={cat.title}
            href={`/businesses?category=${cat.slug}`}
            className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col hover:-translate-y-1"
          >
            {/* Visual Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white/90">
                {cat.count}
              </div>
            </div>

            {/* Bottom Label Bar */}
            <div className="p-3.5 sm:p-4 flex items-center justify-between">
              <span className="font-serif font-bold text-xs sm:text-sm text-ink group-hover:text-forest transition-colors">
                {cat.title}
              </span>
              <div className="w-7 h-7 rounded-xl bg-emerald-soft text-forest group-hover:bg-forest group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
