'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DISCOVER_REELS,
  DISCOVER_EVENT_FILTERS,
  DiscoverReel,
  DiscoverEventCategory,
} from '@/data/reels';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { useToastStore } from '@/store/useToastStore';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
  CalendarCheck,
  Film,
  ExternalLink,
  Sparkles,
  MapPin,
} from 'lucide-react';

export const WeddingReels: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<DiscoverEventCategory>('All');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [likedReelIds, setLikedReelIds] = useState<Record<string, boolean>>({});
  const [savedReelIds, setSavedReelIds] = useState<Record<string, boolean>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const addToast = useToastStore((state) => state.addToast);

  const filteredReels =
    selectedFilter === 'All'
      ? DISCOVER_REELS
      : DISCOVER_REELS.filter((r) => r.eventCategory === selectedFilter);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedReelIds((prev) => {
      const next = !prev[id];
      if (next) {
        addToast({
          type: 'success',
          title: 'Moment Liked',
          message: 'Saved to your celebration inspiration feed.',
        });
      }
      return { ...prev, [id]: next };
    });
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedReelIds((prev) => {
      const next = !prev[id];
      addToast({
        type: 'info',
        title: next ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
        message: next ? 'You can view this reel anytime in your shortlist.' : 'Removed from saved moments.',
      });
      return { ...prev, [id]: next };
    });
  };

  const activeReel = activeReelIndex !== null ? filteredReels[activeReelIndex] : null;

  const handleNextReel = () => {
    if (activeReelIndex !== null && activeReelIndex < filteredReels.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
      setIsPlaying(true);
    }
  };

  const handlePrevReel = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
      setIsPlaying(true);
    }
  };

  // Video play/pause in modal
  useEffect(() => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.play().catch(() => {});
      } else {
        modalVideoRef.current.pause();
      }
    }
  }, [isPlaying, activeReelIndex]);

  return (
    <section id="wedding-reels" className="py-16 sm:py-24 bg-white border-y border-ivory-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Gatherly Discover */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
              <Film className="w-3.5 h-3.5 text-gold-dark" />
              <span>Gatherly Discover</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Moments Across Every Celebration
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2 max-w-2xl font-normal leading-relaxed">
              Explore genuine short-form video moments of grand weddings, birthday theme setups, corporate conventions, milestone jubilees, and festival gatherings across Ahmedabad.
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-11 h-11 rounded-full border border-ivory-border bg-ivory hover:bg-emerald-soft hover:text-forest text-ink-secondary flex items-center justify-center transition-colors shadow-xs"
              aria-label="Previous moments"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-11 h-11 rounded-full border border-ivory-border bg-ivory hover:bg-emerald-soft hover:text-forest text-ink-secondary flex items-center justify-center transition-colors shadow-xs"
              aria-label="Next moments"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Event Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {DISCOVER_EVENT_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-ivory text-ink-secondary hover:text-ink hover:bg-ivory-dark border border-ivory-border'
              }`}
            >
              {cat === 'All' ? `All Events (${DISCOVER_REELS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Reels Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {filteredReels.map((reel, index) => {
            const isLiked = !!likedReelIds[reel.id];
            const isSaved = !!savedReelIds[reel.id];

            return (
              <div
                key={reel.id}
                onClick={() => {
                  setActiveReelIndex(index);
                  setIsPlaying(true);
                }}
                className="group relative shrink-0 w-[240px] sm:w-[270px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-lg transition-all duration-300 snap-start bg-neutral-900 border border-ivory-border hover:-translate-y-1"
              >
                {/* Poster / Video Element */}
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 768px) 240px, 270px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Ambient Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />

                {/* Top Bar: Event Badge, Duration & Actions */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between text-white z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-forest text-[10px] font-bold tracking-wider uppercase">
                    {reel.eventCategory}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => toggleSave(e, reel.id)}
                      className={`w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-colors ${
                        isSaved ? 'text-gold fill-gold' : 'text-white/80 hover:text-white'
                      }`}
                      aria-label="Bookmark reel"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-gold' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => toggleLike(e, reel.id)}
                      className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-rose-400 transition-colors"
                      aria-label="Like reel"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Play Button Indicator in Center */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white z-10">
                  <span className="inline-block px-2 py-0.5 rounded bg-gold-dark/90 text-[10px] font-bold uppercase tracking-wider text-white mb-1.5">
                    {reel.categoryTag}
                  </span>
                  <h3 className="font-serif font-bold text-sm leading-snug line-clamp-2 drop-shadow-sm">
                    {reel.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-white/80">
                    <MapPin className="w-3 h-3 text-gold shrink-0" />
                    <span className="truncate">{reel.venueName || reel.creatorName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Notice */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-muted pt-4 border-t border-ivory-border">
          <p>
            * Curated demonstration short-form video moments from Ahmedabad celebration spaces. Partner verified walkthroughs loaded on individual venue pages.
          </p>
          <button
            onClick={() => openEnquiryModal()}
            className="text-forest hover:text-forest-dark font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Request In-Person Venue Walkthrough</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full-Screen Video Viewer Modal with Genuine Video Playback */}
      {activeReel && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setActiveReelIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-30"
            aria-label="Close video viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {activeReelIndex !== null && activeReelIndex > 0 && (
            <button
              onClick={handlePrevReel}
              className="hidden md:flex absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors z-30"
              aria-label="Previous reel"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {activeReelIndex !== null && activeReelIndex < filteredReels.length - 1 && (
            <button
              onClick={handleNextReel}
              className="hidden md:flex absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors z-30"
              aria-label="Next reel"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* 9:16 Video Player Container */}
          <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10">
            {/* Genuine HTML5 Video Element */}
            <video
              ref={modalVideoRef}
              src={activeReel.videoUrl}
              poster={activeReel.thumbnail}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
              onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* Ambient Shadow Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/35 pointer-events-none" />

            {/* Video Controls (Top Right) */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            {/* Top Left Event Pill */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-forest/90 text-white text-xs font-bold shadow-xs">
                {activeReel.eventCategory}
              </span>
            </div>

            {/* Floating Action Column: Like & Save */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center gap-3 z-20">
              <button
                onClick={(e) => toggleLike(e, activeReel.id)}
                className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-rose-400 transition-colors shadow-md"
              >
                <Heart
                  className={`w-5 h-5 ${likedReelIds[activeReel.id] ? 'fill-rose-500 text-rose-500' : ''}`}
                />
              </button>
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                {activeReel.likes + (likedReelIds[activeReel.id] ? 1 : 0)}
              </span>

              <button
                onClick={(e) => toggleSave(e, activeReel.id)}
                className={`w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-colors shadow-md ${
                  savedReelIds[activeReel.id] ? 'text-gold fill-gold' : 'text-white hover:text-gold'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${savedReelIds[activeReel.id] ? 'fill-gold' : ''}`} />
              </button>
            </div>

            {/* Reel Details & Action */}
            <div className="absolute bottom-0 inset-x-0 p-5 text-white z-20">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-dark/90 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-gold-light" />
                <span>{activeReel.categoryTag}</span>
              </div>

              <h3 className="font-serif text-xl font-bold leading-tight drop-shadow-sm mb-1.5">
                {activeReel.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-3">
                {activeReel.caption}
              </p>

              <div className="flex items-center gap-2 text-xs text-white/90 mb-4 pb-3 border-b border-white/15">
                <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-gold text-[10px] font-bold">
                  G
                </div>
                <div>
                  <p className="font-semibold leading-none">{activeReel.creatorName}</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{activeReel.creatorRole}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {activeReel.businessSlug ? (
                  <Link
                    href={`/business/${activeReel.businessSlug}`}
                    onClick={() => setActiveReelIndex(null)}
                    className="py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold text-center backdrop-blur-md transition-colors"
                  >
                    View Venue Profile
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setActiveReelIndex(null);
                      openEnquiryModal();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold text-center backdrop-blur-md transition-colors"
                  >
                    Check Venue Details
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveReelIndex(null);
                    openEnquiryModal();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Enquire Date</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
