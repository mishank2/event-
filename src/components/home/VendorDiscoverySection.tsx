'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VENDOR_SERVICES } from '@/data/categories';
import {
  Palette,
  Camera,
  Utensils,
  Crown,
  Music,
  Flower2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  Flower2: <Flower2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
};

export const VendorDiscoverySection: React.FC = () => {
  // First 2 as featured editorial cards, next 6 as refined grid cards
  const featuredVendors = VENDOR_SERVICES.slice(0, 2);
  const regularVendors = VENDOR_SERVICES.slice(2);

  return (
    <section className="py-20 sm:py-28 bg-ivory border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Artisans & Specialists</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Meet the People Behind Every Great Event.
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2.5 max-w-xl font-normal leading-relaxed">
              Vetted decorators, authentic caterers, candid photographers, and technical sound engineers ready to bring your vision to life.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-bold text-sm group self-start md:self-auto shrink-0"
          >
            <span>Explore All Specialists</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Modern Editorial Vendor Layout */}
        <div className="space-y-6">
          {/* Top Editorial Duo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/businesses?category=${vendor.slug}`}
                className="group relative rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft-lg hover:border-gold-border transition-all duration-300 min-h-[320px] flex flex-col justify-end p-7 sm:p-8"
              >
                <Image
                  src={vendor.image}
                  alt={vendor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/35 to-black/15 group-hover:from-forest-deep transition-colors" />

                <div className="relative z-10 flex items-center justify-between mb-auto">
                  <div className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-forest flex items-center justify-center shadow-xs">
                    {ICON_MAP[vendor.iconName] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    {vendor.count} Vetted Professionals
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <div className="text-gold-light text-xs font-semibold uppercase tracking-wider mb-1">
                    {vendor.startingPrice}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-light transition-colors">
                    {vendor.name}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-1.5 line-clamp-2 max-w-md font-sans">
                    {vendor.description}
                  </p>

                  <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-white">
                    <span>Browse Ahmedabad Portfolios</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-gold group-hover:text-forest-deep flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Refined Grid of 6 Specialists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularVendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/businesses?category=${vendor.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-forest flex items-center justify-center shadow-xs">
                      {ICON_MAP[vendor.iconName] || <Sparkles className="w-4 h-4" />}
                    </div>

                    <div className="absolute bottom-3 left-3.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                      {vendor.startingPrice}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors">
                      {vendor.name}
                    </h4>
                    <p className="text-xs text-ink-secondary mt-1.5 line-clamp-2 leading-relaxed">
                      {vendor.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-ivory-border flex items-center justify-between text-xs font-semibold text-forest">
                    <span>{vendor.count} Specialists</span>
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
    </section>
  );
};
