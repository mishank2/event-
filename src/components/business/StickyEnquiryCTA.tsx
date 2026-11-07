'use client';

import React from 'react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { Business } from '@/types';
import { Heart, CalendarCheck, ShieldCheck } from 'lucide-react';

interface StickyEnquiryCTAProps {
  business: Business;
}

export const StickyEnquiryCTA: React.FC<StickyEnquiryCTAProps> = ({ business }) => {
  const { isSaved, toggleWishlist } = useWishlistStore();
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const saved = isSaved(business.id);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-ivory-border p-3.5 shadow-lg">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(business.id)}
          className="w-12 h-12 rounded-2xl border border-ivory-border bg-ivory flex items-center justify-center text-ink-secondary hover:text-rose-500 transition-colors shrink-0 shadow-xs"
          aria-label="Save to wishlist"
        >
          <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Primary Enquiry Button */}
        <button
          onClick={() => openEnquiryModal(business)}
          className="flex-1 h-12 rounded-2xl bg-forest hover:bg-forest-light text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <CalendarCheck className="w-4 h-4 text-gold" />
          <span>Send Enquiry to Gatherly</span>
        </button>
      </div>
    </div>
  );
};
