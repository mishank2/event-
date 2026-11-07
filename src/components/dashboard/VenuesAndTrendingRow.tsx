'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESSES } from '@/data/businesses';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useToastStore } from '@/store/useToastStore';
import { Star, Heart, ArrowRight } from 'lucide-react';

export const VenuesAndTrendingRow: React.FC = () => {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isSaved = useWishlistStore((state) => state.isSaved);
  const addToast = useToastStore((state) => state.addToast);

  const venues = BUSINESSES.slice(0, 4);

  const trendingLooks = [
    {
      id: 'look-1',
      title: 'Regal Zardozi Bridal Lehenga',
      hashtag: '#royalheritage',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'look-2',
      title: 'Gujarat Heritage Mandap Styling',
      hashtag: '#goldenlehenga',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleHeartClick = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = toggleWishlist(id);
    addToast({
      type: saved ? 'success' : 'info',
      title: saved ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: `${name} ${saved ? 'added to' : 'removed from'} your celebration shortlist.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      {/* Left Column: Select Your Venue (matches screenshot) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            Select Your Venue
          </h3>
          <Link
            href="/businesses"
            className="text-xs font-semibold text-[#E84E59] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {venues.map((venue) => {
            const saved = isSaved(venue.id);
            return (
              <Link
                key={venue.id}
                href={`/business/${venue.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E9DEC9] shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-charcoal">
                  <Image
                    src={venue.heroImage}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                    {venue.area}
                  </div>
                </div>

                {/* Bottom Details matching screenshot */}
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-charcoal group-hover:text-forest transition-colors line-clamp-1">
                      {venue.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-charcoal-muted mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-[#C89B3C] text-[#C89B3C]" />
                      <span className="font-bold text-charcoal">{venue.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-charcoal-muted ml-1 font-medium">
                        ({venue.priceDisplay})
                      </span>
                    </div>
                  </div>

                  {/* Red Heart Button matching screenshot */}
                  <button
                    onClick={(e) => handleHeartClick(e, venue.id, venue.name)}
                    aria-label="Save venue to wishlist"
                    className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-current' : 'text-red-400'}`} />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Column: Trending Today (matches screenshot) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            Trending Today
          </h3>
          <span className="text-xs font-bold text-[#E84E59]">
            #ahmedabadweddings
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {trendingLooks.map((look) => (
            <div
              key={look.id}
              className="group relative rounded-3xl overflow-hidden border border-[#E9DEC9] shadow-soft-sm bg-charcoal h-64 sm:h-72"
            >
              <Image
                src={look.image}
                alt={look.title}
                fill
                sizes="(max-width: 640px) 50vw, 250px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-gold-light text-[10px] font-bold backdrop-blur-xs">
                {look.hashtag}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-serif text-xs font-bold leading-snug line-clamp-2">
                  {look.title}
                </p>
                <Link
                  href="/businesses"
                  className="mt-1 inline-flex items-center gap-1 text-[10px] text-gold hover:underline font-semibold"
                >
                  <span>Explore Venues</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
