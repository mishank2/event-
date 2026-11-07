import React from 'react';
import {
  ShieldCheck,
  Headset,
  Calendar,
  Sparkles,
  Users2,
  DollarSign
} from 'lucide-react';

export const WhyChooseGatherly: React.FC = () => {
  const benefits = [
    {
      title: 'Zero Vendor Harassment',
      description:
        'Your contact number is never given away to hundreds of vendors. Gatherly’s internal concierge acts as your sole private representative.',
      icon: <ShieldCheck className="w-5 h-5 text-coral" />,
    },
    {
      title: 'Dedicated Ahmedabad Concierge',
      description:
        'Our local event specialists personally negotiate dates, schedule guided site visits, and coordinate venue inclusions.',
      icon: <Headset className="w-5 h-5 text-ochre" />,
    },
    {
      title: 'Fast Availability Pre-Checks',
      description:
        'Skip endless phone tag. We verify prime auspicious wedding dates across multiple party plots and banquets in one go.',
      icon: <Calendar className="w-5 h-5 text-coral" />,
    },
    {
      title: 'Deep Local Insight',
      description:
        'In-depth knowledge of Ahmedabad sound restrictions, Jain catering standards, parking capacity, and lawn layouts.',
      icon: <Sparkles className="w-5 h-5 text-ochre" />,
    },
    {
      title: 'Transparent Budgeting',
      description:
        'Accurate ballpark pricing per plate or per lawn day helps you plan without uncomfortable surprises down the road.',
      icon: <DollarSign className="w-5 h-5 text-coral" />,
    },
    {
      title: 'All-in-One Marketplace',
      description:
        'From 3,000-guest party plots on SBR to bridal makeup artists and live Dhol players, discover your complete vendor team.',
      icon: <Users2 className="w-5 h-5 text-ochre" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-2">
            <span>The Gatherly Advantage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            Why Choose Gatherly
          </h2>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2">
            A dignified, modern way to plan your weddings and celebrations in Ahmedabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs hover:shadow-soft transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-2xl bg-sand-light border border-sand-border flex items-center justify-center mb-4 shadow-xs">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
