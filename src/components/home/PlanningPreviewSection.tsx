'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import {
  Calendar,
  DollarSign,
  Users,
  CheckSquare,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cake,
  Building,
  Flame,
  Music,
  MapPin,
  Utensils,
  Palette,
  Tv,
} from 'lucide-react';

interface PlannerPill {
  label: string;
  detail: string;
  status: 'confirmed' | 'in-progress' | 'scheduled';
}

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
  categoryPillars: {
    pillar: string;
    value: string;
    status: 'Confirmed' | 'In Progress' | 'Ready' | 'Scheduled';
  }[];
  timelinePhases: { phase: string; status: 'completed' | 'in-progress' | 'upcoming' }[];
}

const PREVIEW_MODES: Record<string, PreviewMode> = {
  wedding: {
    id: 'wedding',
    name: 'Weddings & Receptions',
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
    categoryPillars: [
      { pillar: 'Guest list', value: '450 Invited (320 Confirmed RSVPs)', status: 'Confirmed' },
      { pillar: 'Budget', value: '₹20,00,000 Total (₹8,00,000 Committed)', status: 'Confirmed' },
      { pillar: 'Venue', value: '70,000 Sq.Ft SBR Lawn Reserved', status: 'Confirmed' },
      { pillar: 'Catering', value: 'Royal Gujarati Feast & Live Chaat', status: 'Ready' },
      { pillar: 'Decorations', value: 'Lotus Mandap & Floral Tunnel', status: 'In Progress' },
    ],
    timelinePhases: [
      { phase: 'Venue & Date Hold', status: 'completed' },
      { phase: 'Catering Tasting', status: 'completed' },
      { phase: 'Mandap & Decor', status: 'in-progress' },
      { phase: 'Invitations Sent', status: 'upcoming' },
      { phase: 'Wedding Day', status: 'upcoming' },
    ],
  },
  birthday: {
    id: 'birthday',
    name: 'Birthday Parties',
    icon: '🎂',
    daysRemaining: 18,
    dateStr: '25/03/2026',
    budgetTotal: '₹85,000',
    budgetSpent: '₹42,000',
    budgetRemaining: '₹43,000',
    budgetPercent: 49,
    guestsTotal: 65,
    guestsConfirmed: 52,
    tasksCompleted: 8,
    tasksTotal: 12,
    nextMilestone: 'Designer Theme Cake Tasting & DJ Playlist',
    categoryPillars: [
      { pillar: 'Theme', value: 'Pastel Carnival & LED Neon Photo Booth', status: 'Ready' },
      { pillar: 'Cake', value: '3-Tier Custom Fondant Theme Cake', status: 'Confirmed' },
      { pillar: 'Entertainment', value: 'Live Magician, Games Anchor & DJ', status: 'Confirmed' },
      { pillar: 'Guest list', value: '65 Invited (52 Confirmed RSVPs)', status: 'In Progress' },
    ],
    timelinePhases: [
      { phase: 'Lounge Reserved', status: 'completed' },
      { phase: 'Theme Selected', status: 'completed' },
      { phase: 'Cake & Menu Ordered', status: 'in-progress' },
      { phase: 'Digital Invites', status: 'upcoming' },
      { phase: 'Party Celebration', status: 'upcoming' },
    ],
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Conferences',
    icon: '🏢',
    daysRemaining: 42,
    dateStr: '18/04/2026',
    budgetTotal: '₹5,50,000',
    budgetSpent: '₹3,10,000',
    budgetRemaining: '₹2,40,000',
    budgetPercent: 56,
    guestsTotal: 180,
    guestsConfirmed: 145,
    tasksCompleted: 12,
    tasksTotal: 18,
    nextMilestone: 'Keynote 4K LED Backdrop & Stage Line-Arrays',
    categoryPillars: [
      { pillar: 'Conference venue', value: 'TGB Royale 5-Star Auditorium', status: 'Confirmed' },
      { pillar: 'Equipment', value: '4K LED Wall, Line Arrays & Podium Mics', status: 'Confirmed' },
      { pillar: 'Catering', value: 'Executive Hi-Tea & Global World Buffet', status: 'Ready' },
      { pillar: 'Schedule', value: '9:00 AM Registration to 5:30 PM Keynote', status: 'In Progress' },
    ],
    timelinePhases: [
      { phase: 'Convention Reserved', status: 'completed' },
      { phase: 'Speakers Confirmed', status: 'completed' },
      { phase: 'AV & Stage Trussing', status: 'in-progress' },
      { phase: 'Delegate Badges', status: 'upcoming' },
      { phase: 'Summit Kickoff', status: 'upcoming' },
    ],
  },
  festival: {
    id: 'festival',
    name: 'Festivals & Garba Grounds',
    icon: '🎪',
    daysRemaining: 60,
    dateStr: '15/10/2026',
    budgetTotal: '₹8,50,000',
    budgetSpent: '₹4,00,000',
    budgetRemaining: '₹4,50,000',
    budgetPercent: 47,
    guestsTotal: 1200,
    guestsConfirmed: 780,
    tasksCompleted: 9,
    tasksTotal: 16,
    nextMilestone: '40ft Revolving Artist Stage & Municipal Clearances',
    categoryPillars: [
      { pillar: 'Venue', value: 'Sindhu Bhavan Mega Exhibition Grounds', status: 'Confirmed' },
      { pillar: 'Stage', value: '40ft Revolving Garba Artist Platform', status: 'In Progress' },
      { pillar: 'Sound', value: 'Concert JBL VTX Line-Array Audio Rig', status: 'Ready' },
      { pillar: 'Decorations', value: 'Traditional Gujarati Torans & Illumination', status: 'In Progress' },
    ],
    timelinePhases: [
      { phase: 'Ground Permit Granted', status: 'completed' },
      { phase: 'Orchestra Booked', status: 'completed' },
      { phase: 'Stage Fabrication', status: 'in-progress' },
      { phase: 'Passes Dispatched', status: 'upcoming' },
      { phase: 'Navratri Opening Night', status: 'upcoming' },
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
            <span>Universal Event Planner</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Universal Event Planner
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 font-normal leading-relaxed">
            Every celebration has distinct milestones. Switch event types below to preview how Gatherly dynamically adapts to your occasion.
          </p>
        </div>

        {/* Dynamic Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {Object.values(PREVIEW_MODES).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === item.id
                  ? 'bg-forest text-white shadow-soft-sm scale-105'
                  : 'bg-ivory text-ink-secondary hover:bg-ivory-dark hover:text-ink border border-ivory-border'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Event Planner Card with 3D Tilt Console */}
        <Tilt3DCard
          maxTilt={4}
          perspective={1600}
          glareColor="rgba(21, 93, 64, 0.08)"
          className="max-w-5xl mx-auto bg-ivory rounded-3xl border border-ivory-border shadow-3d-floating p-6 sm:p-9 relative overflow-hidden"
        >
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-forest via-gold to-forest" />

          {/* Top Row: Event Countdown & Next Action - 3D Plane */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ivory-border translate-z-20">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-white border border-ivory-border shadow-3d flex items-center justify-center text-2xl shrink-0 translate-z-10">
                {mode.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">{mode.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-soft text-forest text-[11px] font-bold">
                    Target: {mode.dateStr}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary mt-1">
                  Active Priority:{' '}
                  <span className="text-ink font-semibold">{mode.nextMilestone}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-forest">
                {mode.daysRemaining}
              </span>
              <span className="text-xs text-ink-muted uppercase tracking-wider block">
                Days to Event
              </span>
            </div>
          </div>

          {/* Dynamic Event Pillars: Specifically customized for each event type */}
          <div className="my-8 translate-z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-secondary flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-forest" />
                <span>Event Pillars ({mode.categoryPillars.length} Core Areas)</span>
              </span>
              <span className="text-xs text-forest font-semibold">
                {mode.tasksCompleted} of {mode.tasksTotal} Items Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mode.categoryPillars.map((pillar) => (
                <div
                  key={pillar.pillar}
                  className="bg-white rounded-2xl p-4 border border-ivory-border shadow-3d hover:shadow-3d-hover transition-all duration-300 flex flex-col justify-between hover:translate-z-20"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink">
                        {pillar.pillar}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          pillar.status === 'Confirmed'
                            ? 'bg-emerald-soft text-forest'
                            : pillar.status === 'Ready'
                            ? 'bg-gold/20 text-forest-deep'
                            : 'bg-ivory-dark text-ink-muted'
                        }`}
                      >
                        {pillar.status}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed">
                      {pillar.value}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-ivory-border/60 flex items-center gap-1 text-[11px] text-forest font-medium">
                    <CheckCircle2 className="w-3 h-3 text-forest" />
                    <span>Tracked in Workspace</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Metrics: Budget, RSVPs, Checklist, Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-ivory-border translate-z-10">
            {/* Budget */}
            <div className="bg-white rounded-2xl p-4 border border-ivory-border shadow-3d">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-ink flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-forest" />
                  Budget Forecast
                </span>
                <span className="font-bold text-forest">{mode.budgetPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-ivory-dark overflow-hidden mb-2">
                <div
                  className="h-full bg-forest rounded-full transition-all duration-500"
                  style={{ width: `${mode.budgetPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-ink-secondary">
                <span>Committed: {mode.budgetSpent}</span>
                <span className="font-bold text-forest">{mode.budgetTotal}</span>
              </div>
            </div>

            {/* Guest list */}
            <div className="bg-white rounded-2xl p-4 border border-ivory-border shadow-3d">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-ink flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-forest" />
                  Attendance / RSVPs
                </span>
                <span className="font-bold text-forest">
                  {Math.round((mode.guestsConfirmed / mode.guestsTotal) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-ivory-dark overflow-hidden mb-2">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500"
                  style={{
                    width: `${(mode.guestsConfirmed / mode.guestsTotal) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-ink-secondary">
                <span>Confirmed: {mode.guestsConfirmed}</span>
                <span className="font-bold text-ink">{mode.guestsTotal} Target</span>
              </div>
            </div>

            {/* Schedule Timeline */}
            <div className="bg-white rounded-2xl p-4 border border-ivory-border shadow-3d">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-ink flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-forest" />
                  Milestone Roadmap
                </span>
                <span className="text-[10px] text-forest font-semibold uppercase">
                  Stage 3 of 5
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-ivory-dark overflow-hidden mb-2">
                <div
                  className="h-full bg-forest rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-ink-secondary">
                <span className="truncate">Active: {mode.timelinePhases[2]?.phase}</span>
                <span className="font-semibold text-forest">On Schedule</span>
              </div>
            </div>
          </div>

          {/* Bottom Callout & Workspace CTA */}
          <div className="mt-8 pt-6 border-t border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-4 translate-z-20">
            <div className="flex items-center gap-2 text-xs text-ink-secondary">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
              <span>
                Personalized checklists, live budgets, and vendor schedules are included free with every booking.
              </span>
            </div>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-xs sm:text-sm shadow-3d transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0 translate-z-30 hover:scale-105"
            >
              <span>Open Event Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Tilt3DCard>
      </div>
    </section>
  );
};
