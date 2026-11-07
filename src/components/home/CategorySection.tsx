'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import {
  Trees,
  Building2,
  Sparkles,
  Flower2,
  Utensils,
  Palette,
  Camera,
  Video,
  Music,
  Crown,
  Gem,
  Cake,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Trees: <Trees className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Flower2: <Flower2 className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
  Gem: <Gem className="w-5 h-5" />,
  Cake: <Cake className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
};

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Curated Marketplace</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Discover by Event Category
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2 max-w-xl font-normal">
              Ahmedabad&apos;s complete roster of vetted wedding lawns, banquet halls, and celebration specialists.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-bold text-sm group self-start md:self-auto"
          >
            <span>View All 15 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (Top 8 categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/businesses?category=${cat.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory-dark">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Icon Box */}
                <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-forest flex items-center justify-center shadow-sm">
                  {ICON_MAP[cat.iconName] || <Sparkles className="w-5 h-5 text-gold-dark" />}
                </div>

                {/* Business Count Badge */}
                <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                  {cat.businessCount} Curated Options
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1.5 leading-relaxed line-clamp-2">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs font-bold text-forest">
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
    </section>
  );
};
