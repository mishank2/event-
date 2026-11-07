'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface VendorCategoryItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

const DASHBOARD_CATEGORIES: VendorCategoryItem[] = [
  {
    id: 'decorators',
    name: 'Decorators',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    link: '/businesses?category=decoration',
  },
  {
    id: 'makeup',
    name: 'Makeup',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    link: '/businesses?category=makeup-artists',
  },
  {
    id: 'florists',
    name: 'Florists & Mandap',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    link: '/businesses?category=wedding-gardens',
  },
  {
    id: 'dj-music',
    name: 'DJ & Music',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    link: '/businesses?category=dj-sound',
  },
];

export const VendorCategoriesRow: React.FC = () => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
          Vendor Categories
        </h3>
        <Link
          href="/explore"
          className="text-xs font-semibold text-[#E84E59] hover:underline"
        >
          View All Categories &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DASHBOARD_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.link}
            className="group bg-white rounded-3xl overflow-hidden border border-[#E9DEC9] shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-charcoal">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Bar matching screenshot */}
            <div className="p-4 bg-white flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-charcoal group-hover:text-forest transition-colors">
                {cat.name}
              </span>

              {/* Red arrow button in rounded square matching screenshot */}
              <div className="w-7 h-7 rounded-lg border border-[#E84E59] text-[#E84E59] group-hover:bg-[#E84E59] group-hover:text-white flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
