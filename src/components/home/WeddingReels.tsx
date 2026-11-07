'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DISCOVER_REELS,
  DiscoverReel,
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
  Share2,
  CalendarCheck,
  Film,
  ExternalLink,
  Sparkles,
  MapPin,
} from 'lucide-react';

const REEL_FILTERS = [
  'All',
  'Wedding',
  'Birthday',
  'Anniversary',
  'Corporate',
  'Private Party',
  'Festivals',
  'Other Events',
] as const;

type ReelFilter = (typeof REEL_FILTERS)[number];

export const WeddingReels: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<ReelFilter>('All');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [likedReelIds, setLikedReelIds] = useState<Record<string, boolean>>({});
  const [savedReelIds, setSavedReelIds] = useState<Record<string, boolean>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const addToast = useToastStore((state) => state.addToast);

  const filteredReels = DISCOVER_REELS.filter((r) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Other Events') {
      return ['Baby Celebrations', 'Education', 'Community'].includes(r.eventCategory);
    }
    return r.eventCategory === selectedFilter;
  });

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
        message: next ? 'You can review this moment anytime in your shortlist.' : 'Removed from bookmarks.',
      });
      return { ...prev, [id]: next };
    });
  };

  const handleShare = (e: React.MouseEvent, reel: DiscoverReel) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: reel.title,
        text: reel.caption,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Reel link copied to your clipboard.',
      });
    }
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
    <section id="discover" className="py-20 sm:py-28 bg-white border-b border-ivory-border overflow-hidden">
      <div id="wedding-reels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2.5">
              <Film className="w-3.5 h-3.5 text-gold" />
              <span>Gatherly Discover</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Moments That Inspire.
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary mt-2.5 max-w-2xl font-normal leading-relaxed">
              Explore authentic short-form video walkthroughs, decor transformations, and celebrations from real events across Ahmedabad.
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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {REEL_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-ivory text-ink-secondary hover:text-ink hover:bg-ivory-dark border border-ivory-border'
              }`}
            >
              {cat === 'All' ? `All Moments (${DISCOVER_REELS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel (Desktop) / Touch Swipe (Mobile) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {filteredReels.map((reel, index) => {
            const isLiked = likedReelIds[reel.id];
            const isSaved = savedReelIds[reel.id];

            return (
              <div
                key={reel.id}
                onClick={() => {
                  setActiveReelIndex(index);
                  setIsPlaying(true);
                  setIsMuted(true);
                }}
                className="group relative flex-none w-[270px] sm:w-[300px] aspect-[9/16] rounded-3xl overflow-hidden bg-forest-dark border border-ivory-border shadow-soft-sm hover:shadow-soft-lg hover:border-gold-border cursor-pointer transition-all duration-300 snap-start flex flex-col justify-between p-5 hover:-translate-y-1"
              >
                {/* Poster Thumbnail */}
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 270px, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                />

                {/* Subtle Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 group-hover:via-black/30 transition-colors" />

                {/* Top Bar inside Card */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                    {reel.categoryTag}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button Pulse */}
                <div className="relative z-10 my-auto self-center">
                  <div className="w-13 h-13 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-gold group-hover:text-forest-deep transition-all duration-300 shadow-md">
                    <Play className="w-6 h-6 ml-1 fill-current" />
                  </div>
                </div>

                {/* Bottom Info inside Card */}
                <div className="relative z-10 space-y-2">
                  {/* Floating Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pb-1">
                    <button
                      onClick={(e) => toggleLike(e, reel.id)}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                      aria-label="Like"
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>

                    <button
                      onClick={(e) => toggleSave(e, reel.id)}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-gold transition-colors"
                      aria-label="Save"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isSaved ? 'fill-gold text-gold' : ''}`}
                      />
                    </button>

                    <button
                      onClick={(e) => handleShare(e, reel)}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors"
                      aria-label="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Creator */}
                  <div>
                    <h3 className="font-serif text-white font-bold text-base leading-snug line-clamp-2">
                      {reel.title}
                    </h3>
                    <p className="text-[11px] text-white/70 mt-1 truncate">
                      {reel.venueName || reel.creatorName}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-gold-light">
                    <span>Watch Full Walkthrough</span>
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-Screen Video Modal Viewer */}
        {activeReel && activeReelIndex !== null && (
          <div
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveReelIndex(null)}
          >
            <div
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[92vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Actual Video Tag */}
              <video
                ref={modalVideoRef}
                src={activeReel.videoUrl}
                poster={activeReel.thumbnail}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onClick={() => setIsPlaying(!isPlaying)}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

              {/* Top Modal Controls */}
              <div className="relative z-20 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold border border-white/20">
                    {activeReel.eventCategory}
                  </span>
                  <span className="text-xs text-white/80">{activeReel.categoryTag}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                  </button>

                  <button
                    onClick={() => setActiveReelIndex(null)}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                    aria-label="Close viewer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Center Play/Pause indicator */}
              <div
                className="relative z-20 self-center cursor-pointer p-4"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/40">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                )}
              </div>

              {/* Bottom Reel Details & Interaction Sidebar */}
              <div className="relative z-20 p-5 space-y-4">
                {/* Floating Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <button
                      onClick={(e) => toggleLike(e, activeReel.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs border border-white/20"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedReelIds[activeReel.id] ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                      <span>
                        {activeReel.likes + (likedReelIds[activeReel.id] ? 1 : 0)}
                      </span>
                    </button>

                    <button
                      onClick={(e) => toggleSave(e, activeReel.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs border border-white/20"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedReelIds[activeReel.id] ? 'fill-gold text-gold' : ''
                        }`}
                      />
                      <span>Save</span>
                    </button>

                    <button
                      onClick={(e) => handleShare(e, activeReel)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs border border-white/20"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Previous / Next Reel Buttons */}
                  <div className="flex items-center gap-1.5 text-white">
                    <button
                      onClick={handlePrevReel}
                      disabled={activeReelIndex === 0}
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 disabled:opacity-30"
                      aria-label="Previous reel"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextReel}
                      disabled={activeReelIndex === filteredReels.length - 1}
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 disabled:opacity-30"
                      aria-label="Next reel"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Text Description */}
                <div>
                  <h3 className="font-serif text-white font-bold text-lg leading-snug">
                    {activeReel.title}
                  </h3>
                  <p className="text-white/80 text-xs mt-1.5 leading-relaxed line-clamp-3 font-sans">
                    {activeReel.caption}
                  </p>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex items-center gap-2">
                  {activeReel.businessSlug && (
                    <Link
                      href={`/business/${activeReel.businessSlug}`}
                      onClick={() => setActiveReelIndex(null)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold text-center border border-white/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Venue</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setActiveReelIndex(null);
                      openEnquiryModal();
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Plan This Event</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
