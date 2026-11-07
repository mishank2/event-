import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { OccasionSection } from '@/components/home/OccasionSection';
import { FeaturedVenues } from '@/components/home/FeaturedVenues';
import { WeddingReels } from '@/components/home/WeddingReels';
import { VendorDiscoverySection } from '@/components/home/VendorDiscoverySection';
import { PlanningPreviewSection } from '@/components/home/PlanningPreviewSection';
import { ConciergeCTASection } from '@/components/home/ConciergeCTASection';
import { AhmedabadRecommendations } from '@/components/home/AhmedabadRecommendations';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { HomeFAQ } from '@/components/home/HomeFAQ';

export default function HomePage() {
  return (
    <div className="flex flex-col bg-ivory min-h-screen">
      {/* 1. Visually Impressive Editorial Hero */}
      <HeroSection />

      {/* 2. Distinctive Asymmetric Category Exploration */}
      <OccasionSection />

      {/* 3. Spaces Worth Celebrating In — Asymmetric Spotlight */}
      <FeaturedVenues />

      {/* 4. Moments That Inspire — Gatherly Discover 9:16 Video Carousel */}
      <WeddingReels />

      {/* 5. Meet the People Behind Every Great Event — Editorial Vendor Layout */}
      <VendorDiscoverySection />

      {/* 6. Your Event, Perfectly Organized — Compact Promotional Preview */}
      <PlanningPreviewSection />

      {/* 7. Planning Something Special? — Editorial Concierge Banner */}
      <ConciergeCTASection />

      {/* 8. Ahmedabad Event Corridors */}
      <AhmedabadRecommendations />

      {/* 9. How Gatherly Works — Intermediary Privacy Concierge */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* 10. Customer Stories & Verified Feedback */}
      <Testimonials />

      {/* 11. Frequently Asked Questions */}
      <HomeFAQ />
    </div>
  );
}
