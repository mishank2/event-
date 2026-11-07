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
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
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
    <section className="py-20 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
              <span className="w-6 h-[1px] bg-gold" />
              <span>Curated Celebration Categories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
              Explore Event Venues & Specialists
            </h2>
            <p className="text-charcoal-muted text-sm sm:text-base mt-2.5 max-w-xl leading-relaxed">
              From sprawling outdoor party plots along Sindhu Bhavan Road to royal Gujarati catering thals and couture decorators.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-ivory-border hover:border-gold/50 text-xs sm:text-sm font-semibold text-forest hover:text-gold-dark transition-all shadow-soft-sm hover:shadow-soft self-start md:self-auto"
          >
            <span>View All 15 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/businesses?category=${cat.id}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold/50 transition-all duration-300 flex flex-col justify-between card-hover-elevate"
            >
              {/* Image with overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-charcoal">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />

                {/* Category Icon Badge */}
                <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-2xl bg-forest/85 backdrop-blur-md border border-gold/40 text-gold flex items-center justify-center shadow-md">
                  {iconMap[cat.iconName] || <Sparkles className="w-5 h-5" />}
                </div>

                {/* Business Count */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10">
                  {cat.businessCount}+ Listed
                </div>

                {/* Category Title on image bottom */}
                <div className="absolute bottom-3.5 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-light transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-charcoal/80 line-clamp-2 leading-relaxed mb-4">
                  {cat.shortDescription}
                </p>

                <div className="pt-3 border-t border-ivory-border flex items-center justify-between text-xs font-semibold text-forest group-hover:text-gold-dark transition-colors">
                  <span>Explore Listings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
