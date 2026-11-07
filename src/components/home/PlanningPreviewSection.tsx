'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  DollarSign,
  Users,
  CheckSquare,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface PreviewMode {
  id: string;
  name: string;
  icon: string;
  daysRemaining: number;
  dateStr: string;
  budgetTotal: string;
  budgetSpent: string;
  budgetRemaining: string;
  budgetPercent: number;
  guestsTotal: number;
  guestsConfirmed: number;
  tasksCompleted: number;
  tasksTotal: number;
  nextMilestone: string;
  timelinePhases: { phase: string; status: 'completed' | 'in-progress' | 'upcoming' }[];
}

const PREVIEW_MODES: Record<string, PreviewMode> = {
  wedding: {
    id: 'wedding',
    name: 'Wedding & Sangeet',
    icon: '💍',
    daysRemaining: 150,
    dateStr: '06/12/2026',
    budgetTotal: '₹20,00,000',
    budgetSpent: '₹8,00,000',
    budgetRemaining: '₹12,00,000',
    budgetPercent: 40,
    guestsTotal: 450,
    guestsConfirmed: 320,
    tasksCompleted: 14,
    tasksTotal: 28,
    nextMilestone: 'Mandap Floral Finalization with Shantam Lawns',
    timelinePhases: [
      { phase: 'Venue & Dates', status: 'completed' },
      { phase: 'Catering Menu', status: 'completed' },
      { phase: 'Decor & Mandap', status: 'in-progress' },
      { phase: 'Invitations', status: 'upcoming' },
      { phase: 'Wedding Day', status: 'upcoming' },
    ],
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Summit',
    icon: '🏢',
    daysRemaining: 42,
    dateStr: '18/04/2026',
    budgetTotal: '₹5,00,000',
    budgetSpent: '₹2,75,000',
    budgetRemaining: '₹2,25,000',
    budgetPercent: 55,
    guestsTotal: 180,
    guestsConfirmed: 140,
    tasksCompleted: 12,
    tasksTotal: 18,
    nextMilestone: 'Keynote AV Projection & LED Wall Setup',
    timelinePhases: [
      { phase: 'Hall Booking', status: 'completed' },
      { phase: 'Speaker Lineup', status: 'completed' },
      { phase: 'AV & Stage Truss', status: 'in-progress' },
      { phase: 'Delegate Kits', status: 'upcoming' },
      { phase: 'Conference Day', status: 'upcoming' },
    ],
  },
  birthday: {
    id: 'birthday',
    name: 'Milestone Birthday',
    icon: '🎂',
    daysRemaining: 18,
    dateStr: '25/03/2026',
    budgetTotal: '₹75,000',
    budgetSpent: '₹35,000',
    budgetRemaining: '₹40,000',
    budgetPercent: 46,
    guestsTotal: 65,
    guestsConfirmed: 52,
    tasksCompleted: 8,
    tasksTotal: 12,
    nextMilestone: 'Theme Cake Tasting & Rooftop Sound Booking',
    timelinePhases: [
      { phase: 'Lounge Reserved', status: 'completed' },
      { phase: 'Theme & Decor', status: 'in-progress' },
      { phase: 'Custom Cake', status: 'in-progress' },
      { phase: 'Digital Invites', status: 'upcoming' },
      { phase: 'Party Night', status: 'upcoming' },
    ],
  },
  anniversary: {
    id: 'anniversary',
    name: 'Silver Jubilee',
    icon: '🥂',
    daysRemaining: 30,
    dateStr: '07/04/2026',
    budgetTotal: '₹2,50,000',
    budgetSpent: '₹1,25,000',
    budgetRemaining: '₹1,25,000',
    budgetPercent: 50,
    guestsTotal: 90,
    guestsConfirmed: 78,
    tasksCompleted: 9,
    tasksTotal: 14,
    nextMilestone: 'Poolside Fairy Lighting & Live Violinist',
    timelinePhases: [
      { phase: 'Garden Booked', status: 'completed' },
      { phase: 'Menu Curated', status: 'completed' },
      { phase: 'Live Music', status: 'in-progress' },
      { phase: 'Family Slideshow', status: 'upcoming' },
      { phase: 'Jubilee Gala', status: 'upcoming' },
    ],
  },
};

export const PlanningPreviewSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('wedding');
  const mode = PREVIEW_MODES[activeTab] || PREVIEW_MODES.wedding;

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Smart Concierge Tools</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Your Event, Perfectly Organized.
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 font-normal leading-relaxed">
            Every Gatherly booking unlocks an adaptive planning workspace tailored to your milestone celebration.
          </p>
        </div>

        {/* Event Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {Object.values(PREVIEW_MODES).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === item.id
                  ? 'bg-forest text-white shadow-soft-sm'
                  : 'bg-ivory text-ink-secondary hover:bg-ivory-dark hover:text-ink border border-ivory-border'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Compact Promotional Preview Card */}
        <div className="max-w-5xl mx-auto bg-ivory rounded-3xl border border-ivory-border shadow-soft p-6 sm:p-9 relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-forest via-gold to-forest" />

          {/* Top Row: Event Countdown & Next Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ivory-border">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white border border-ivory-border shadow-2xs flex items-center justify-center text-xl shrink-0">
                {mode.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-ink">{mode.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-soft text-forest text-[11px] font-bold">
                    Target: {mode.dateStr}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Next Priority:{' '}
                  <span className="text-ink font-semibold">{mode.nextMilestone}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl font-serif font-bold text-forest">
                {mode.daysRemaining}
              </span>
              <span className="text-xs text-ink-muted uppercase tracking-wider block">
                Days to Event
              </span>
            </div>
          </div>

          {/* 4 Core Dimensions: Budget, Guests, Tasks, Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
            {/* 1. Budget Tracker */}
            <div className="bg-white rounded-2xl p-5 border border-ivory-border shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <DollarSign className="w-3.5 h-3.5 text-forest" />
                    Budget Allocation
                  </span>
                  <span className="font-bold text-forest">{mode.budgetPercent}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-ivory-dark overflow-hidden mb-3">
                  <div
                    className="h-full bg-forest rounded-full transition-all duration-500"
                    style={{ width: `${mode.budgetPercent}%` }}
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-ink-secondary">
                    <span>Spent:</span>
                    <span className="font-semibold text-ink">{mode.budgetSpent}</span>
                  </div>
                  <div className="flex justify-between text-ink-secondary">
                    <span>Total Plan:</span>
                    <span className="font-semibold text-ink">{mode.budgetTotal}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-ivory-border text-[11px] text-ink-muted flex items-center justify-between">
                <span>Remaining:</span>
                <span className="font-bold text-forest">{mode.budgetRemaining}</span>
              </div>
            </div>

            {/* 2. Guest List */}
            <div className="bg-white rounded-2xl p-5 border border-ivory-border shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <Users className="w-3.5 h-3.5 text-forest" />
                    Guest RSVP Status
                  </span>
                  <span className="font-bold text-forest">
                    {Math.round((mode.guestsConfirmed / mode.guestsTotal) * 100)}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-ivory-dark overflow-hidden mb-3">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-500"
                    style={{
                      width: `${(mode.guestsConfirmed / mode.guestsTotal) * 100}%`,
                    }}
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-ink-secondary">
                    <span>Confirmed RSVPs:</span>
                    <span className="font-semibold text-forest">
                      {mode.guestsConfirmed} guests
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-secondary">
                    <span>Awaiting Reply:</span>
                    <span className="font-semibold text-ink-muted">
                      {mode.guestsTotal - mode.guestsConfirmed} guests
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-ivory-border text-[11px] text-ink-muted flex items-center justify-between">
                <span>Total Invited:</span>
                <span className="font-bold text-ink">{mode.guestsTotal} guests</span>
              </div>
            </div>

            {/* 3. Planning Checklist */}
            <div className="bg-white rounded-2xl p-5 border border-ivory-border shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <CheckSquare className="w-3.5 h-3.5 text-forest" />
                    Task Checklist
                  </span>
                  <span className="font-bold text-forest">
                    {mode.tasksCompleted}/{mode.tasksTotal}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-ivory-dark overflow-hidden mb-3">
                  <div
                    className="h-full bg-forest rounded-full transition-all duration-500"
                    style={{
                      width: `${(mode.tasksCompleted / mode.tasksTotal) * 100}%`,
                    }}
                  />
                </div>

                <div className="space-y-1.5 text-xs text-ink-secondary">
                  <div className="flex items-center gap-1.5 text-forest font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    <span>Venue hold confirmed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    <span>Catering quote approved</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ink-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="line-clamp-1">{mode.nextMilestone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-ivory-border text-[11px] text-ink-muted flex items-center justify-between">
                <span>Pending Tasks:</span>
                <span className="font-bold text-ink">
                  {mode.tasksTotal - mode.tasksCompleted} items
                </span>
              </div>
            </div>

            {/* 4. Event Timeline Phases */}
            <div className="bg-white rounded-2xl p-5 border border-ivory-border shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-3">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <Clock className="w-3.5 h-3.5 text-forest" />
                    Planning Phases
                  </span>
                  <span className="text-[10px] text-forest font-semibold uppercase">
                    Stage 3 of 5
                  </span>
                </div>

                <div className="space-y-2">
                  {mode.timelinePhases.map((phase) => (
                    <div
                      key={phase.phase}
                      className="flex items-center justify-between text-xs"
                    >
                      <span
                        className={
                          phase.status === 'completed'
                            ? 'text-ink line-through opacity-70'
                            : phase.status === 'in-progress'
                            ? 'text-forest font-bold'
                            : 'text-ink-muted'
                        }
                      >
                        {phase.phase}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          phase.status === 'completed'
                            ? 'bg-emerald-soft text-forest'
                            : phase.status === 'in-progress'
                            ? 'bg-gold/20 text-forest-deep'
                            : 'bg-ivory-dark text-ink-muted'
                        }`}
                      >
                        {phase.status === 'completed'
                          ? 'Done'
                          : phase.status === 'in-progress'
                          ? 'Active'
                          : 'Next'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-ivory-border text-[11px] text-ink-muted flex items-center justify-between">
                <span>Timeline Status:</span>
                <span className="font-semibold text-forest">On Schedule</span>
              </div>
            </div>
          </div>

          {/* Bottom Callout & Workspace CTA */}
          <div className="pt-6 border-t border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-ink-secondary">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
              <span>
                Personalized planning dashboards are included free with every Gatherly event booking.
              </span>
            </div>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
            >
              <span>Open Planning Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
