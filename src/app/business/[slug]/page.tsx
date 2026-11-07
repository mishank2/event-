'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { BUSINESSES } from '@/data/businesses';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { useToastStore } from '@/store/useToastStore';
import { BusinessCard } from '@/components/business/BusinessCard';
import { StickyEnquiryCTA } from '@/components/business/StickyEnquiryCTA';
import {
  Heart,
  Star,
  MapPin,
  Users,
  CheckCircle,
  ShieldCheck,
  Send,
  Calendar,
  Sparkles,
  ArrowLeft,
  Share2,
  Check,
  Info,
  Clock,
  Compass,
  PhoneOff,
  Building,
  Award,
  ChevronRight
} from 'lucide-react';

export default function BusinessDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const business = BUSINESSES.find((b) => b.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isSaved = useWishlistStore((state) => (business ? state.isSaved(business.id) : false));
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!business) {
    return (
      <div className="min-h-[70vh] bg-[#FBF9F5] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-sand-border shadow-soft-sm">
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">
            Business Profile Not Found
          </h2>
          <p className="text-xs text-charcoal-muted mb-6">
            The celebration venue or service you are looking for does not exist or may have been updated.
          </p>
          <Link
            href="/businesses"
            className="px-6 py-2.5 rounded-2xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs"
          >
            Back to Ahmedabad Businesses
          </Link>
        </div>
      </div>
    );
  }

  const handleWishlistClick = () => {
    const saved = toggleWishlist(business.id);
    if (saved) {
      addToast({
        type: 'success',
        title: 'Saved to Wishlist',
        message: `${business.name} added to your celebration shortlist.`,
      });
    } else {
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${business.name} removed from your shortlist.`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Business profile URL copied to clipboard.',
      });
    }
  };

  const similarBusinesses = BUSINESSES.filter(
    (b) => b.id !== business.id && (b.categoryId === business.categoryId || b.area === business.area)
  ).slice(0, 3);

  const galleryImages = [business.heroImage, ...(business.gallery || [])];
  const savedState = mounted ? isSaved : false;

  return (
    <div className="bg-[#FBF9F5] min-h-screen pb-24 lg:pb-16">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-sand-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/businesses"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-muted hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Listings</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl text-charcoal-muted hover:text-charcoal bg-sand-light hover:bg-sand border border-sand-border transition-colors text-xs flex items-center gap-1.5"
              title="Share listing"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={handleWishlistClick}
              className={`px-3 py-1.5 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                savedState
                  ? 'bg-coral-soft text-coral border-coral-border font-bold'
                  : 'bg-sand-light text-charcoal hover:bg-sand border-sand-border'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${savedState ? 'fill-current text-coral' : 'text-coral'}`} />
              <span className="hidden sm:inline">
                {savedState ? 'Saved in Wishlist' : 'Save to Wishlist'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Main Header Info */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sand text-charcoal border border-sand-border">
                {business.category}
              </span>
              {business.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sand text-charcoal border border-sand-border">
                  <CheckCircle className="w-3.5 h-3.5 text-coral" />
                  <span>Verified Partner</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs bg-white text-charcoal-muted border border-sand-border font-medium">
                {business.area}, Ahmedabad
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
              {business.name}
            </h1>
            <p className="text-charcoal-muted text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              {business.tagline}
            </p>
          </div>

          {/* Rating Box in Ochre Gold matching screenshot */}
          <div className="flex items-center md:flex-col items-end gap-1.5 shrink-0 bg-white p-4 rounded-3xl border border-sand-border shadow-soft-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-ochre text-ochre" />
              <span className="text-2xl font-bold text-charcoal">{business.rating.toFixed(1)}</span>
              <span className="text-xs text-charcoal-muted">/ 5.0</span>
            </div>
            <span className="text-xs text-charcoal-muted font-medium">
              Based on {business.reviewCount} customer reviews
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 mb-10">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden bg-sand-light border border-sand-border shadow-soft-sm">
            <Image
              src={galleryImages[activeImageIndex] || business.heroImage}
              alt={business.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-all duration-500 ease-out"
            />
          </div>

          {/* Thumbnails Sidebar */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3.5 h-full">
            {galleryImages.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-24 sm:h-32 lg:h-[152px] rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-coral shadow-sm scale-[0.98]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${business.name} preview ${idx + 1}`}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Details) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Specs Grid matching Dashboard styling */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-sand-border shadow-soft-sm text-center">
              <div className="p-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                  Capacity Range
                </span>
                <span className="font-serif text-xl font-bold text-charcoal mt-1 block">
                  {business.capacityDisplay}
                </span>
              </div>
              <div className="p-2 border-l border-sand-border">
                <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                  Starting Rate
                </span>
                <span className="font-serif text-xl font-bold text-charcoal mt-1 block">
                  {business.priceDisplay}
                </span>
                <span className="text-[10px] text-charcoal-muted block">
                  /{business.priceUnit}
                </span>
              </div>
              <div className="p-2 border-l border-sand-border">
                <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                  Locality
                </span>
                <span className="font-serif text-sm font-bold text-charcoal truncate block mt-1.5">
                  {business.area}
                </span>
              </div>
              <div className="p-2 border-l border-sand-border">
                <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                  Booking Mode
                </span>
                <span className="font-serif text-sm font-bold text-coral block mt-1.5">
                  Gatherly Concierge
                </span>
              </div>
            </div>

            {/* About / Description Section */}
            <div className="bg-white p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                About {business.name}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed">
                {business.description}
              </p>

              {business.aboutHighlights && (
                <div className="pt-4 border-t border-sand-border space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ochre">
                    Venue Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {business.aboutHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-charcoal">
                        <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Section */}
            <div className="bg-white p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Amenities & Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {business.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-sand-light border border-sand-border text-xs font-medium text-charcoal flex items-center gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-coral shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Event Types */}
            <div className="bg-white p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Event Types Supported
              </h2>
              <div className="flex flex-wrap gap-2">
                {business.eventTypes.map((event, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-sand text-charcoal text-xs font-semibold border border-sand-border"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>

            {/* Packages Section */}
            {business.packages && business.packages.length > 0 && (
              <div className="bg-white p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-5">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal">
                    Price Packages & Pricing Options
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Ballpark pricing indicative of standard bookings. Exact quotes confirmed by Gatherly Concierge based on your specific dates.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {business.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                        pkg.isPopular
                          ? 'border-coral bg-coral-soft/40 shadow-soft-xs'
                          : 'border-sand-border bg-sand-light'
                      }`}
                    >
                      <div>
                        {pkg.isPopular && (
                          <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-coral text-white mb-2.5 shadow-xs">
                            Most Selected
                          </span>
                        )}
                        <h3 className="font-serif text-lg font-bold text-charcoal">
                          {pkg.name}
                        </h3>
                        <div className="mt-1 mb-2">
                          <span className="text-2xl font-bold text-charcoal">{pkg.price}</span>
                          <span className="text-xs text-charcoal-muted ml-1.5">{pkg.unit}</span>
                        </div>
                        <p className="text-xs text-charcoal/80 mb-4 leading-relaxed">
                          {pkg.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-sand-border">
                          {pkg.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-charcoal">
                              <Check className="w-3.5 h-3.5 text-coral shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => openEnquiryModal(business)}
                        className="mt-6 w-full py-2.5 rounded-xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3 h-3 text-white" />
                        <span>Enquire for this Package</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map Preview */}
            <div className="bg-white p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal">
                    Location & Surroundings
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-1">{business.fullAddress}</p>
                </div>
                <div className="p-3 rounded-2xl bg-sand text-ochre border border-sand-border">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Map UI Mockup */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-sand-light border border-sand-border flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')",
                  }}
                />
                <div className="relative z-10 p-5 bg-white/95 backdrop-blur-md rounded-3xl shadow-soft-sm text-center max-w-sm border border-sand-border">
                  <div className="w-10 h-10 rounded-2xl bg-coral text-white mx-auto flex items-center justify-center mb-2 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-charcoal">{business.name}</h4>
                  <p className="text-xs text-charcoal/80 mt-1">{business.fullAddress}</p>
                  <p className="text-[11px] text-coral font-bold mt-2">
                    Site visits coordinated through Gatherly Concierge
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal">
                    Customer Experience Reviews
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Verified feedback from celebrations organized through Gatherly
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-ochre-soft rounded-2xl border border-ochre-border">
                  <Star className="w-4 h-4 fill-ochre text-ochre" />
                  <span className="font-bold text-sm text-charcoal">{business.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {business.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-sand-light border border-sand-border space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-charcoal text-sm">{rev.author}</h4>
                        <span className="text-[11px] text-charcoal-muted">
                          {rev.eventType} • {rev.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-ochre text-ochre" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-charcoal/85 leading-relaxed pt-1">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Concierge Info */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sand-border shadow-soft-sm space-y-5">
              <div className="flex items-baseline justify-between pb-4 border-b border-sand-border">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                    Starting From
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal">
                    {business.priceDisplay}
                  </span>
                  <span className="text-xs text-charcoal-muted ml-1">
                    /{business.priceUnit}
                  </span>
                </div>
                <span className="text-xs bg-sand text-charcoal px-3 py-1 rounded-full font-bold border border-sand-border">
                  Verified Partner
                </span>
              </div>

              {/* Intermediary Guarantee Notice */}
              <div className="p-3.5 rounded-2xl bg-sand-light border border-sand-border text-xs text-charcoal space-y-1">
                <div className="flex items-center gap-2 font-bold text-charcoal">
                  <ShieldCheck className="w-4 h-4 text-ochre" />
                  <span>Gatherly Concierge Protection</span>
                </div>
                <p className="text-charcoal-muted text-[11px] leading-relaxed">
                  Your enquiry is routed directly to Gatherly’s internal team. We verify real calendar availability with the business and coordinate your booking.
                </p>
              </div>

              {/* No Direct Vendor Warning */}
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-sand border border-sand-border text-xs text-charcoal-muted">
                <PhoneOff className="w-4 h-4 text-coral shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  Vendor direct contacts are managed privately to protect you from spam calls.
                </span>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5">
                {/* PRIMARY CTA: Send Enquiry to Gatherly */}
                <button
                  onClick={() => openEnquiryModal(business)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Enquiry to Gatherly</span>
                </button>

                {/* SECONDARY CTA: Save to Wishlist */}
                <button
                  onClick={handleWishlistClick}
                  className={`w-full py-3 px-4 rounded-2xl border font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                    savedState
                      ? 'bg-coral-soft text-coral border-coral-border font-bold'
                      : 'bg-sand-light hover:bg-sand text-charcoal border-sand-border'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${savedState ? 'fill-current text-coral' : 'text-coral'}`} />
                  <span>{savedState ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                </button>
              </div>

              {/* Service Commitments */}
              <div className="pt-4 border-t border-sand-border space-y-2 text-xs text-charcoal-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-ochre" />
                  <span>Availability checked within 2-4 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-coral" />
                  <span>Accompanied site visits arranged in Ahmedabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-ochre" />
                  <span>Transparent venue contract negotiation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Businesses Section */}
        {similarBusinesses.length > 0 && (
          <div className="mt-14 pt-10 border-t border-sand-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">
                  Similar Celebration Options
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Other vetted venues and services in {business.area} or {business.category}
                </p>
              </div>
              <Link
                href="/businesses"
                className="text-xs font-semibold text-coral hover:underline"
              >
                Browse All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarBusinesses.map((item) => (
                <BusinessCard key={item.id} business={item} viewMode="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Enquiry Bar for Mobile Devices */}
      <StickyEnquiryCTA business={business} />
    </div>
  );
}
