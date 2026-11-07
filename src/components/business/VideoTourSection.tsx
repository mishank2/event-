'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  CalendarCheck,
  Video,
  Clock,
  Sparkles,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export interface VenueTour {
  id: string;
  title: string;
  description: string;
  areaType: 'Lawn' | 'Banquet' | 'Bridal Suite' | 'Dining' | 'Parking';
  duration: string;
  thumbnail: string;
  isDemo: true;
}

interface VideoTourSectionProps {
  businessName: string;
  businessSlug: string;
  tours?: VenueTour[];
}

export const VideoTourSection: React.FC<VideoTourSectionProps> = ({
  businessName,
  businessSlug,
  tours,
}) => {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const [activeTour, setActiveTour] = useState<VenueTour | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Default curated tours for demo venues
  const defaultTours: VenueTour[] = [
    {
      id: 'tour-1',
      title: 'Grand Celebration Lawn & Mandap Setup',
      description: 'Full walkthrough of the primary green lawn showcasing 3,500-guest layout and illuminated mandap stage.',
      areaType: 'Lawn',
      duration: '0:48',
      thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      isDemo: true,
    },
    {
      id: 'tour-2',
      title: 'Air-Conditioned VIP & Bridal Vanity Suites',
      description: 'Private dressing rooms with full mirrors, attached washrooms, and comfortable lounge seating.',
      areaType: 'Bridal Suite',
      duration: '0:34',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      isDemo: true,
    },
    {
      id: 'tour-3',
      title: 'Covered Multi-Cuisine Catering Kitchen & Dining',
      description: '3,000 sq.ft hygienic catering prep zone with dedicated gas manifolds and water connections.',
      areaType: 'Dining',
      duration: '0:40',
      thumbnail: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      isDemo: true,
    },
    {
      id: 'tour-4',
      title: 'Driveway, Boom Barriers & Valet Parking Lot',
      description: 'Wide approach avenue and illuminated parking spaces accommodating 400+ luxury four-wheelers.',
      areaType: 'Parking',
      duration: '0:28',
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      isDemo: true,
    },
  ];

  const venueTours = tours && tours.length > 0 ? tours : defaultTours;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-ivory-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <Video className="w-3.5 h-3.5 text-gold-dark" />
            <span>Virtual Walkthroughs</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Video Tours & Walkthroughs
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Explore {businessName}&apos;s lawns, bridal suites, and banquet facilities from your phone or desktop.
          </p>
        </div>

        <button
          onClick={() => openEnquiryModal()}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <CalendarCheck className="w-4 h-4 text-gold" />
          <span>Book In-Person Site Visit</span>
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {venueTours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => {
              setActiveTour(tour);
              setIsPlaying(true);
            }}
            className="group relative rounded-2xl overflow-hidden border border-ivory-border bg-ivory cursor-pointer hover:shadow-md transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={tour.thumbnail}
                alt={tour.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Duration Badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold" />
                <span>{tour.duration}</span>
              </div>

              {/* Area Tag */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-forest/90 text-white text-[10px] font-semibold">
                {tour.areaType}
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white text-ink transition-all">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Tour Info */}
            <div className="p-3.5">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-ink line-clamp-1 group-hover:text-forest transition-colors">
                {tour.title}
              </h4>
              <p className="text-[11px] text-ink-muted line-clamp-2 mt-1 leading-relaxed">
                {tour.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Concierge Assurance Footer */}
      <div className="mt-6 p-4 rounded-2xl bg-ivory border border-ivory-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-secondary">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
          <span>
            Gatherly inspects and audits all listed party plots, halls, and caterers across Ahmedabad.
          </span>
        </div>
        <button
          onClick={() => openEnquiryModal()}
          className="text-forest hover:underline font-bold text-xs shrink-0"
        >
          Request Custom Video Tour &rarr;
        </button>
      </div>

      {/* Video Player Modal */}
      {activeTour && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Top Bar */}
            <div className="p-4 px-6 bg-black/60 flex items-center justify-between border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-forest text-[11px] font-bold">
                  {activeTour.areaType}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold truncate">
                  {activeTour.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTour(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close video tour"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <Image
                src={activeTour.thumbnail}
                alt={activeTour.title}
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/30" />

              {/* Play Overlay */}
              <div className="relative z-10 flex flex-col items-center gap-3 text-white text-center px-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-forest/90 border-2 border-gold text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 fill-white ml-1" />
                  )}
                </button>
                <p className="text-xs text-white/80 max-w-md">
                  {activeTour.description}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-[11px] text-gold-light border border-gold/30">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Curated Walkthrough by Gatherly Production Desk</span>
                </div>
              </div>

              {/* Bottom Controls Bar */}
              <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 sm:p-5 bg-black/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-white border-t border-white/10">
              <div className="text-xs text-white/70">
                <span>Want to see {businessName} in person? Gatherly coordinates exclusive site visits.</span>
              </div>
              <button
                onClick={() => {
                  setActiveTour(null);
                  openEnquiryModal();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <CalendarCheck className="w-4 h-4 text-gold" />
                <span>Enquire Date with Gatherly</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
