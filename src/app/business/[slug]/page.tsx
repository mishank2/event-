'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { BUSINESSES } from '@/data/businesses';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { VideoTourSection } from '@/components/business/VideoTourSection';
import { StickyEnquiryCTA } from '@/components/business/StickyEnquiryCTA';
import {
  Heart,
  Star,
  MapPin,
  Users,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  Share2,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  Check,
  ChevronRight,
} from 'lucide-react';

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const business = BUSINESSES.find((b) => b.slug === slug) || BUSINESSES[0];
  const { isSaved, toggleWishlist } = useWishlistStore();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(business.packages[0]?.id || '');

  const saved = isSaved(business.id);
  const gallery = business.gallery.length > 0 ? business.gallery : [business.heroImage];

  // Similar businesses from same category
  const similarBusinesses = BUSINESSES.filter(
    (b) => b.categoryId === business.categoryId && b.id !== business.id
  ).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/businesses" className="hover:text-forest transition-colors">
            Venues &amp; Vendors
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/businesses?category=${business.categoryId}`}
            className="hover:text-forest transition-colors"
          >
            {business.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink font-semibold truncate max-w-xs">{business.name}</span>
        </nav>

        {/* Media Gallery Section */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-ivory-border shadow-soft-sm mb-8">
          {/* Main Visual */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-ivory-dark mb-4">
            <Image
              src={gallery[activeImageIndex] || business.heroImage}
              alt={business.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Badges on main image */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-forest text-white text-xs font-bold shadow-xs">
                  {business.category}
                </span>
                {business.verified && (
                  <span className="px-3 py-1 rounded-full bg-gold-dark text-white text-xs font-semibold flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-light" />
                    <span>Curated &amp; Audited</span>
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(business.id)}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shadow-xs"
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Rating pill bottom */}
            <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-bold flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span>{business.rating.toFixed(1)}</span>
              <span className="text-white/70 text-xs font-normal">
                ({business.reviewCount} Reviews)
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-forest ring-2 ring-forest/20'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${business.name} thumbnail ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Details (Left 8 cols) + Sticky Concierge Card (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
                    {business.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-ink-muted">
                    <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>{business.fullAddress}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                    Starting Package
                  </span>
                  <span className="font-bold text-forest text-2xl sm:text-3xl">
                    {business.priceDisplay}
                  </span>
                  <span className="text-xs text-ink-muted ml-1">/{business.priceUnit}</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-serif italic text-sm sm:text-base text-forest mt-4 pt-4 border-t border-ivory-border">
                &ldquo;{business.tagline}&rdquo;
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-ivory-border text-xs">
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                    Guest Capacity
                  </span>
                  <span className="font-bold text-ink text-xs sm:text-sm mt-0.5 block">
                    {business.capacityDisplay}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                    Corridor
                  </span>
                  <span className="font-bold text-ink text-xs sm:text-sm mt-0.5 block truncate">
                    {business.area}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                    Audited Rating
                  </span>
                  <span className="font-bold text-ink text-xs sm:text-sm mt-0.5 block flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span>{business.rating.toFixed(1)} / 5.0</span>
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                    Booking Policy
                  </span>
                  <span className="font-bold text-forest text-xs sm:text-sm mt-0.5 block truncate">
                    Via Gatherly Desk
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Highlights */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm space-y-5">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                About {business.name}
              </h2>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-normal">
                {business.description}
              </p>

              {/* Key Highlights */}
              <div className="pt-4 border-t border-ivory-border">
                <h3 className="font-serif font-bold text-sm text-ink mb-3">
                  Property &amp; Operational Highlights:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-secondary">
                  {business.aboutHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video Tours Walkthrough Section */}
            <VideoTourSection
              businessName={business.name}
              businessSlug={business.slug}
            />

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-4">
                Amenities &amp; Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {business.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 rounded-2xl bg-ivory border border-ivory-border flex items-center gap-2.5 text-xs font-semibold text-ink"
                  >
                    <Check className="w-4 h-4 text-forest shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Packages */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    Available Packages
                  </h2>
                  <p className="text-xs text-ink-muted">Transparent starting rates negotiated by Gatherly</p>
                </div>
                <span className="text-[11px] font-semibold text-forest bg-emerald-soft px-3 py-1 rounded-full self-start sm:self-auto">
                  Direct Availability Check
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {business.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      pkg.isPopular
                        ? 'border-forest bg-emerald-soft/30 shadow-xs'
                        : 'border-ivory-border bg-ivory'
                    }`}
                  >
                    <div>
                      {pkg.isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-forest text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                          Most Popular
                        </span>
                      )}
                      <h3 className="font-serif font-bold text-base text-ink">{pkg.name}</h3>
                      <div className="mt-2">
                        <span className="font-serif text-2xl font-bold text-forest">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-ink-muted ml-1">/{pkg.unit}</span>
                      </div>
                      <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                        {pkg.description}
                      </p>

                      <ul className="mt-4 pt-3 border-t border-ivory-border space-y-1.5 text-xs text-ink-secondary">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => openEnquiryModal(business)}
                      className="mt-6 w-full py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Enquire for This Package
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-ivory-border">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    Verified Customer Reviews
                  </h2>
                  <p className="text-xs text-ink-muted">Feedback from past hosts who celebrated at {business.name}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-soft text-forest text-xs font-bold">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span>{business.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {business.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-ivory border border-ivory-border">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-ink">{rev.author}</h4>
                        <span className="text-[11px] text-forest font-medium">{rev.eventType}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gold">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                    <span className="text-[10px] text-ink-muted block mt-2">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-3">
                Location &amp; Accessibility
              </h2>
              <p className="text-xs text-ink-muted mb-4">{business.fullAddress}</p>
              <div className="relative aspect-[16/7] rounded-2xl bg-ivory border border-ivory-border flex flex-col items-center justify-center text-center p-6">
                <MapPin className="w-8 h-8 text-forest mb-2 animate-bounce" />
                <h4 className="font-serif font-bold text-sm text-ink">{business.area}</h4>
                <p className="text-xs text-ink-muted mt-1 max-w-sm">
                  Valet drop-off driveway situated along primary road corridor. Easily reachable via SG Highway and SP Ring Road.
                </p>
                <button
                  onClick={() => openEnquiryModal(business)}
                  className="mt-4 px-4 py-2 rounded-xl bg-forest text-white text-xs font-semibold shadow-xs"
                >
                  Request Route &amp; Visit Details
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Concierge Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-ivory-border shadow-soft">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>Gatherly Concierge Desk</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                Check Date Availability
              </h3>
              <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
                Send your celebration dates and requirements directly to Gatherly. We contact {business.name} management privately to verify slots and lock prices.
              </p>

              {/* Price summary */}
              <div className="mt-5 p-4 rounded-2xl bg-ivory border border-ivory-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Starting rate</span>
                  <span className="font-bold text-forest text-sm">{business.priceDisplay}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-ivory-border/60">
                  <span className="text-ink-muted">Guest Capacity</span>
                  <span className="font-semibold text-ink">{business.capacityDisplay}</span>
                </div>
              </div>

              {/* Primary Enquiry CTA */}
              <button
                onClick={() => openEnquiryModal(business)}
                className="mt-5 w-full py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <CalendarCheck className="w-4 h-4 text-gold" />
                <span>Send Enquiry to Gatherly</span>
              </button>

              {/* Wishlist CTA */}
              <button
                onClick={() => toggleWishlist(business.id)}
                className={`mt-2.5 w-full py-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  saved
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-ivory-border bg-ivory text-ink hover:bg-ivory-dark'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
                <span>{saved ? 'Saved in Your Wishlist' : 'Save to Wishlist'}</span>
              </button>

              {/* Trust Callouts */}
              <div className="mt-6 pt-5 border-t border-ivory-border space-y-2 text-xs text-ink-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Zero direct vendor spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Consolidated quotes within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>100% free booking concierge</span>
                </div>
              </div>
            </div>

            {/* Intermediary Note */}
            <div className="p-4 rounded-2xl bg-ivory border border-ivory-border text-xs text-ink-secondary">
              <div className="flex items-center gap-2 font-bold text-ink mb-1">
                <Info className="w-4 h-4 text-gold-dark" />
                <span>Gatherly Intermediary Service</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Gatherly does not display direct vendor phone numbers to prevent unsolicited marketing calls. All coordination is managed securely by Gatherly team members.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Venues Section */}
        {similarBusinesses.length > 0 && (
          <div className="mt-16 pt-12 border-t border-ivory-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-ink">
                  Similar Venues in Ahmedabad
                </h3>
                <p className="text-xs text-ink-muted">Explore alternative {business.category} in nearby corridors</p>
              </div>
              <Link
                href={`/businesses?category=${business.categoryId}`}
                className="text-xs font-bold text-forest hover:underline"
              >
                View Category &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarBusinesses.map((b) => (
                <Link
                  key={b.id}
                  href={`/business/${b.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-ivory-border shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                    <Image src={b.heroImage} alt={b.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                      {b.rating.toFixed(1)} ★
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif font-bold text-sm text-ink group-hover:text-forest transition-colors truncate">
                      {b.name}
                    </h4>
                    <p className="text-xs text-ink-muted mt-1">{b.area}</p>
                    <div className="mt-2 text-xs font-bold text-forest">{b.priceDisplay}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Enquiry Action */}
      <StickyEnquiryCTA business={business} />
    </div>
  );
}
