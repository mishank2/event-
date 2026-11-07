import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Building, Sparkles, ChevronRight } from 'lucide-react';

interface AreaSpotlight {
  name: string;
  tagline: string;
  count: number;
  image: string;
  popularFor: string;
}

const SPOTLIGHT_AREAS: AreaSpotlight[] = [
  {
    name: 'Sindhu Bhavan Road (SBR)',
    tagline: 'Ahmedabad’s most prestigious luxury corridor with expansive royal party plots.',
    count: 14,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    popularFor: 'Grand Weddings & High-Profile Receptions',
  },
  {
    name: 'SG Highway Corridor',
    tagline: '5-star hotel banquets, convention centres, and resort destination lawns.',
    count: 22,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    popularFor: 'Corporate Summits & Royal Vegetarian Banquets',
  },
  {
    name: 'Bodakdev & Judges Bungalow',
    tagline: 'Upscale venues and top bridal fashion & candid photographer studios.',
    count: 18,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    popularFor: 'Intimate Engagements, Bridal Studios & Photo Shoots',
  },
  {
    name: 'Bopal & South Bopal',
    tagline: 'Lush farmhouse party plots, heritage haveli halls, and serene garden lawns.',
    count: 12,
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    popularFor: 'Traditional Lagan Ceremonies & Mango Grove Pheras',
  },
];

export const AhmedabadRecommendations: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-2">
            <MapPin className="w-3.5 h-3.5 text-coral" />
            <span>Local Market Geography</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            Trending Celebration Hubs in Ahmedabad
          </h2>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2 leading-relaxed">
            Explore venues grouped by Ahmedabad’s most desirable celebration corridors and neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPOTLIGHT_AREAS.map((area) => (
            <Link
              key={area.name}
              href={`/businesses?area=${encodeURIComponent(area.name.split(' ')[0])}`}
              className="group bg-white rounded-3xl overflow-hidden border border-sand-border shadow-soft-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-sand-light">
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                  {area.count}+ Venues
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-light transition-colors">
                    {area.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-ochre block mb-1">
                    Signature Celebrations
                  </span>
                  <p className="text-xs font-bold text-charcoal mb-1.5">
                    {area.popularFor}
                  </p>
                  <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                    {area.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-border flex items-center justify-between text-xs font-bold text-coral group-hover:text-coral-hover transition-colors">
                  <span>Explore Corridor</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
