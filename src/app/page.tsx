import React from 'react';
import { DashboardHeroRow } from '@/components/dashboard/DashboardHeroRow';
import { VendorCategoriesRow } from '@/components/dashboard/VendorCategoriesRow';
import { VenuesAndTrendingRow } from '@/components/dashboard/VenuesAndTrendingRow';
import { HowItWorks } from '@/components/home/HowItWorks';
import { AhmedabadRecommendations } from '@/components/home/AhmedabadRecommendations';
import { WhyChooseGatherly } from '@/components/home/WhyChooseGatherly';
import { Testimonials } from '@/components/home/Testimonials';
import { HomeFAQ } from '@/components/home/HomeFAQ';

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#FBF9F5]">
      {/* Main Wedding Planning Dashboard Container (matching screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 w-full">
        {/* Row 1: Top Dashboard Cards (Hello Profile, 150 Days Countdown, Budget 40%, Guest List) */}
        <DashboardHeroRow />

        {/* Row 2: Vendor Categories (Decorators, Makeup, Florists, DJ & Music) */}
        <VendorCategoriesRow />

        {/* Row 3: Select Your Venue + Trending Today */}
        <VenuesAndTrendingRow />
      </div>

      {/* Intermediary Concierge Model & Marketplace Sections */}
      <div className="border-t border-ivory-border">
        <HowItWorks />
        <AhmedabadRecommendations />
        <WhyChooseGatherly />
        <Testimonials />
        <HomeFAQ />
      </div>
    </div>
  );
}
