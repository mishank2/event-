import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { DashboardHeroRow } from '@/components/dashboard/DashboardHeroRow';
import { VendorCategoriesRow } from '@/components/dashboard/VendorCategoriesRow';
import { VenuesAndTrendingRow } from '@/components/dashboard/VenuesAndTrendingRow';
import { FeaturedVenues } from '@/components/home/FeaturedVenues';
import { WeddingReels } from '@/components/home/WeddingReels';
import { HowItWorks } from '@/components/home/HowItWorks';
import { AhmedabadRecommendations } from '@/components/home/AhmedabadRecommendations';
import { WhyChooseGatherly } from '@/components/home/WhyChooseGatherly';
import { Testimonials } from '@/components/home/Testimonials';
import { HomeFAQ } from '@/components/home/HomeFAQ';

export default function HomePage() {
  return (
    <div className="flex flex-col bg-ivory min-h-screen">
      {/* Premium Hero Section */}
      <HeroSection />

      {/* Wedding Planning Dashboard — Quick Access Tools */}
      <section className="py-10 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="section-label">
              <span className="w-4 h-px bg-gold inline-block" />
              Planning Dashboard
            </span>
            <p className="text-xs text-ink-muted mt-1">Your personalised event planning workspace</p>
          </div>
          <DashboardHeroRow />
          <div className="mt-8">
            <VendorCategoriesRow />
          </div>
          <div className="mt-8">
            <VenuesAndTrendingRow />
          </div>
        </div>
      </section>

      {/* Category Exploration */}
      <CategorySection />

      {/* Featured Venues */}
      <FeaturedVenues />

      {/* Wedding Reels — New Feature */}
      <WeddingReels />

      {/* How Gatherly Works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Ahmedabad Area Recommendations */}
      <AhmedabadRecommendations />

      {/* Why Choose Gatherly */}
      <WhyChooseGatherly />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <HomeFAQ />
    </div>
  );
}
