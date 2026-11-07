'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OCCASIONS, OccasionInfo } from '@/data/categories';
import {
  Crown,
  Briefcase,
  Cake,
  HeartHandshake,
  Compass,
  Gem,
  Flame,
  GraduationCap,
  Users,
  Sparkles,
  ArrowRight,
  Music,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Cake: <Cake className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Gem: <Gem className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export const OccasionSection: React.FC = () => {
  const featuredOccasions = OCCASIONS.filter((o) => o.featured);
  const remainingOccasions = OCCASIONS.filter((o) => !o.featured);

  return (
    <section className="py-20 sm:py-28 bg-ivory border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Tailored Discovery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Explore by Occasion
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2.5 max-w-xl font-normal leading-relaxed">
              Curated venues, bespoke settings, and dedicated specialists aligned specifically to your celebration.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-bold text-sm group self-start md:self-auto shrink-0"
          >
            <span>View All 20 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Occasions Layout */}
        <div className="space-y-6">
          {/* Top Featured Row (2 Grand Showcase Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOccasions.map((occ) => (
              <Link
                key={occ.id}
                href={`/businesses?eventType=${encodeURIComponent(occ.eventType)}`}
                className="group relative rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft-lg hover:border-gold-border transition-all duration-500 min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-7 sm:p-9"
              >
                {/* Background Image */}
                <Image
                  src={occ.image}
                  alt={occ.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
                />
                {/* Dark Editorial Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/40 to-black/10 group-hover:from-forest-deep transition-colors" />

                {/* Floating Badge */}
                <div className="relative z-10 flex items-center justify-between gap-3 mb-auto">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-forest text-xs font-bold shadow-xs">
                    {occ.badge || 'Featured'}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-forest flex items-center justify-center shadow-xs">
                    {ICON_MAP[occ.iconName] || <Sparkles className="w-5 h-5" />}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-6">
                  <div className="text-gold-light text-xs font-medium tracking-wide mb-1 uppercase">
                    {occ.tagline}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-gold-light transition-colors">
                    {occ.name}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm font-sans line-clamp-2 max-w-md leading-relaxed">
                    {occ.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white">
                    <span>{occ.venueCount} Curated Spaces in Ahmedabad</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-gold group-hover:text-forest-deep flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary Grid (8 Balanced Occasion Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {remainingOccasions.map((occ) => (
              <Link
                key={occ.id}
                href={`/businesses?eventType=${encodeURIComponent(occ.eventType)}`}
                className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-ivory-dark">
                    <Image
                      src={occ.image}
                      alt={occ.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Icon Box */}
                    <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-forest flex items-center justify-center shadow-xs">
                      {ICON_MAP[occ.iconName] || <Sparkles className="w-4 h-4" />}
                    </div>

                    {/* Venue count badge */}
                    <div className="absolute bottom-3 left-3.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                      {occ.venueCount} Listings
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors">
                      {occ.name}
                    </h4>
                    <p className="text-xs text-ink-secondary mt-1.5 line-clamp-2 leading-relaxed">
                      {occ.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-ivory-border flex items-center justify-between text-xs font-semibold text-forest">
                    <span>Discover Spaces</span>
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
