'use client';

import React, { useState } from 'react';
import { Info, X, ShieldCheck } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Demo platform notice" className="bg-sand text-charcoal text-xs border-b border-sand-border py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-coral text-white shrink-0 shadow-xs">
            DEMO PREVIEW
          </span>
          <p className="truncate sm:whitespace-normal text-charcoal/85 text-[11px]">
            <span className="font-bold text-charcoal">Gatherly Intermediary Model:</span> All venue & vendor profiles represent sample demo businesses in Ahmedabad. Gatherly acts as your private concierge intermediary. Direct vendor contacts are confidential; all enquiries are handled by Gatherly.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-charcoal-muted hover:text-charcoal p-1 rounded-lg transition-colors"
          title="Dismiss notification"
          aria-label="Dismiss demo notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
