import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, AHMEDABAD_AREAS } from '@/data/categories';
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
  ChevronRight,
  Compass,
  MapPin
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Trees: <Trees className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Flower2: <Flower2 className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Camera: <Camera className="w-4 h-4" />,
  Video: <Video className="w-4 h-4" />,
  Music: <Music className="w-4 h-4" />,
  Crown: <Crown className="w-4 h-4" />,
  Gem: <Gem className="w-4 h-4" />,
  Cake: <Cake className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
};

export default function ExplorePage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-ochre mb-2">
            <Compass className="w-3.5 h-3.5 text-ochre" />
            <span>Marketplace Directory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
            Explore All Event Categories
          </h1>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2.5 leading-relaxed">
            Discover verified celebration spaces and professionals across Ahmedabad. Choose any category to browse detailed profiles and submit booking enquiries to Gatherly Concierge.
          </p>
        </div>

        {/* 15 Categories Grid matching dashboard card styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/businesses?category=${cat.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-sand-border hover:border-coral/40 shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Image */}
              <div className="relative h-44 w-full overflow-hidden bg-sand-light">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Top Pill with count */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                  {cat.businessCount}+ Options
                </div>
              </div>

              {/* Bottom Footer matching screenshot with red/coral arrow in rounded square */}
              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-base text-charcoal group-hover:text-coral transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-[11px] text-charcoal-muted line-clamp-1 mt-0.5">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl border border-coral text-coral group-hover:bg-coral group-hover:text-white flex items-center justify-center transition-colors shrink-0 ml-3">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ahmedabad Localities Quick Grid */}
        <div className="mt-14 pt-10 border-t border-sand-border">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-ochre" />
            <h3 className="font-serif text-xl font-bold text-charcoal">
              Explore by Ahmedabad Corridor
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {AHMEDABAD_AREAS.map((area) => (
              <Link
                key={area}
                href={`/businesses?area=${encodeURIComponent(area)}`}
                className="px-4 py-2 rounded-2xl bg-white hover:bg-sand text-xs font-semibold text-charcoal border border-sand-border transition-all shadow-soft-xs"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
