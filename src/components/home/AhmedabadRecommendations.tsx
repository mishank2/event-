'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const AhmedabadRecommendations: React.FC = () => {
  const corridors = [
    {
      name: 'Sindhu Bhavan Road (SBR)',
      description: 'Ahmedabad’s premier corridor for high-end party plots, manicured lawn spaces, and celebrity wedding decorators.',
      venueCount: 38,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      badge: 'Luxury Hub',
    },
    {
      name: 'SG Highway Corridor',
      description: 'Home to 5-star hotel banquets, convention centres, and integrated accommodation facilities for destination weddings.',
      venueCount: 44,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      badge: 'Grand Banquets',
    },
    {
      name: 'Bodakdev & Satellite',
      description: 'Centrally located banquet halls, boutique party plots, and traditional marriage halls with convenient guest parking.',
      venueCount: 29,
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
      badge: 'Central Convenience',
    },
    {
      name: 'Prahlad Nagar & Makarba',
      description: 'Urban luxury event venues, rooftop cocktail terraces, and modern wedding suites close to corporate hubs.',
      venueCount: 22,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      badge: 'Contemporary',
    },
    {
      name: 'Thaltej & Science City Road',
      description: 'Scenic garden settings with natural tree canopies, expansive open-air stages, and tranquil celebration spaces.',
      venueCount: 19,
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      badge: 'Botanical Lawns',
    },
    {
      name: 'Bopal & South Bopal',
      description: 'Sprawling agricultural and farmhouse party plots ideal for 2,000+ guest multi-day Gujarati wedding celebrations.',
      venueCount: 26,
      image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
      badge: 'Mega Lawns',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-gold-dark" />
              <span>Ahmedabad Corridors</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Explore by Wedding Corridors
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2 max-w-xl font-normal">
              Compare Ahmedabad&apos;s most sought-after event localities with distinct price profiles, capacities, and aesthetic vibes.
            </p>
          </div>

          <Link
            href="/businesses"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-bold text-sm group self-start md:self-auto"
          >
            <span>View All Ahmedabad Areas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Corridor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corridors.map((c) => (
            <Link
              key={c.name}
              href={`/businesses?area=${encodeURIComponent(c.name.split(' ')[0])}`}
              className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-forest/90 text-white text-[10px] font-bold backdrop-blur-md">
                  {c.badge}
                </div>

                <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                  {c.venueCount} Listings
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-ivory-border flex items-center justify-between text-xs font-bold text-forest">
                  <span>Browse Corridors</span>
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
