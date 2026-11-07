'use client';

import React, { useState, useEffect } from 'react';
import { Business } from '@/types';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { useToastStore } from '@/store/useToastStore';
import { Send, Heart } from 'lucide-react';

interface StickyEnquiryCTAProps {
  business: Business;
}

export const StickyEnquiryCTA: React.FC<StickyEnquiryCTAProps> = ({ business }) => {
  const [mounted, setMounted] = useState(false);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isSaved = useWishlistStore((state) => state.isSaved(business.id));
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWishlist = () => {
    const saved = toggleWishlist(business.id);
    if (saved) {
      addToast({
        type: 'success',
        title: 'Saved to Wishlist',
        message: `${business.name} added to your shortlist.`,
      });
    } else {
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${business.name} removed from your shortlist.`,
      });
    }
  };

  const savedState = mounted ? isSaved : false;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-border p-3 sm:p-4 shadow-xl lg:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-charcoal-muted">Starting:</span>
            <span className="text-xs font-bold text-charcoal">{business.priceDisplay}</span>
            <span className="text-[10px] text-charcoal-muted">/{business.priceUnit}</span>
          </div>
          <p className="text-[11px] font-bold text-charcoal truncate">{business.name}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleWishlist}
            aria-label="Save to Wishlist"
            className={`p-2.5 rounded-xl border transition-colors ${
              savedState
                ? 'bg-coral-soft text-coral border-coral-border'
                : 'bg-sand-light text-charcoal-muted border-sand-border'
            }`}
          >
            <Heart className={`w-4 h-4 ${savedState ? 'fill-current text-coral' : 'text-coral'}`} />
          </button>

          <button
            onClick={() => openEnquiryModal(business)}
            className="px-4 py-2.5 rounded-xl bg-coral hover:bg-coral-hover text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Enquire via Gatherly</span>
          </button>
        </div>
      </div>
    </div>
  );
};
