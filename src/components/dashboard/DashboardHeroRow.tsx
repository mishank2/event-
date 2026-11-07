'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Calendar,
  CreditCard,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  PieChart,
  ListTodo,
  TrendingUp,
  Cake,
  Building,
  Heart,
  Gem,
  Flame,
} from 'lucide-react';

type PlannerEventType = 'wedding' | 'birthday' | 'corporate' | 'anniversary' | 'baby' | 'festival';

interface EventConfig {
  id: PlannerEventType;
  label: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  image: string;
  targetDate: string;
  daysLeft: number;
  seasonBadge: string;
  totalBudgetDisplay: string;
  spentBudgetDisplay: string;
  remainingBudgetDisplay: string;
  percentage: number;
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  guestLabel: string;
  tasksCompleted: number;
  totalTasks: number;
  ctaText: string;
}

const EVENT_CONFIGS: Record<PlannerEventType, EventConfig> = {
  wedding: {
    id: 'wedding',
    label: 'Wedding',
    icon: <Sparkles className="w-3.5 h-3.5 text-gold-dark" />,
    tag: 'Wedding Concierge',
    title: 'Your Wedding Planner',
    description: 'Ahmedabad wedding roadmap. 58% tasks completed across grand lawns, catering & bridal vanity suites.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    targetDate: '12 Dec 2026',
    daysLeft: 150,
    seasonBadge: 'Winter Season',
    totalBudgetDisplay: '₹25.0 Lakhs',
    spentBudgetDisplay: '₹10.5 Lakhs',
    remainingBudgetDisplay: '₹14.5 Lakhs',
    percentage: 42,
    totalGuests: 850,
    confirmedGuests: 520,
    pendingGuests: 330,
    guestLabel: 'VVIP, VIP, Family & Friends',
    tasksCompleted: 7,
    totalTasks: 12,
    ctaText: 'Submit Wedding Enquiry',
  },
  birthday: {
    id: 'birthday',
    label: 'Birthday Bash',
    icon: <Cake className="w-3.5 h-3.5 text-rose-500" />,
    tag: 'Birthday Planner',
    title: 'Milestone Birthday Hub',
    description: 'Theme party roadmap. 67% tasks completed across balloon styling, customized cake & magician entertainment.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    targetDate: '28 Nov 2026',
    daysLeft: 21,
    seasonBadge: 'Weekend Slot',
    totalBudgetDisplay: '₹3.0 Lakhs',
    spentBudgetDisplay: '₹1.65 Lakhs',
    remainingBudgetDisplay: '₹1.35 Lakhs',
    percentage: 55,
    totalGuests: 120,
    confirmedGuests: 85,
    pendingGuests: 35,
    guestLabel: 'Kids, Family & Classmates',
    tasksCompleted: 6,
    totalTasks: 9,
    ctaText: 'Submit Birthday Enquiry',
  },
  corporate: {
    id: 'corporate',
    label: 'Corporate Summit',
    icon: <Building className="w-3.5 h-3.5 text-blue-600" />,
    tag: 'Executive Desk',
    title: 'Annual Corporate Summit',
    description: 'Conference roadmap. 75% tasks completed across auditorium AV, delegate badges & executive buffet lunch.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    targetDate: '15 Dec 2026',
    daysLeft: 38,
    seasonBadge: 'Q4 Annual Meet',
    totalBudgetDisplay: '₹12.0 Lakhs',
    spentBudgetDisplay: '₹7.8 Lakhs',
    remainingBudgetDisplay: '₹4.2 Lakhs',
    percentage: 65,
    totalGuests: 300,
    confirmedGuests: 235,
    pendingGuests: 65,
    guestLabel: 'Delegates, Speakers & Leadership',
    tasksCompleted: 9,
    totalTasks: 12,
    ctaText: 'Submit Corporate Enquiry',
  },
  anniversary: {
    id: 'anniversary',
    label: 'Anniversary',
    icon: <Heart className="w-3.5 h-3.5 text-rose-500" />,
    tag: 'Jubilee Concierge',
    title: 'Silver Jubilee Celebration',
    description: 'Milestone anniversary roadmap. 50% tasks completed across poolside venue, acoustic violinist & banquet dinner.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    targetDate: '05 Jan 2027',
    daysLeft: 59,
    seasonBadge: 'Evening Gala',
    totalBudgetDisplay: '₹6.0 Lakhs',
    spentBudgetDisplay: '₹2.9 Lakhs',
    remainingBudgetDisplay: '₹3.1 Lakhs',
    percentage: 48,
    totalGuests: 160,
    confirmedGuests: 115,
    pendingGuests: 45,
    guestLabel: 'Close Family & Dear Friends',
    tasksCompleted: 5,
    totalTasks: 10,
    ctaText: 'Submit Anniversary Enquiry',
  },
  baby: {
    id: 'baby',
    label: 'Baby Shower / Srimant',
    icon: <Gem className="w-3.5 h-3.5 text-amber-500" />,
    tag: 'Family Blessing Desk',
    title: 'Srimant & Cradle Ceremony',
    description: 'Traditional blessing roadmap. 60% tasks completed across marigold swing decor & authentic Gujarati thal.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    targetDate: '18 Nov 2026',
    daysLeft: 11,
    seasonBadge: 'Auspicious Muhurat',
    totalBudgetDisplay: '₹3.5 Lakhs',
    spentBudgetDisplay: '₹1.75 Lakhs',
    remainingBudgetDisplay: '₹1.75 Lakhs',
    percentage: 50,
    totalGuests: 90,
    confirmedGuests: 70,
    pendingGuests: 20,
    guestLabel: 'Family Elders & Blessings',
    tasksCompleted: 6,
    totalTasks: 10,
    ctaText: 'Submit Srimant Enquiry',
  },
  festival: {
    id: 'festival',
    label: 'Festival / Community',
    icon: <Flame className="w-3.5 h-3.5 text-orange-500" />,
    tag: 'Community Ground Desk',
    title: 'Festival Ground & Garba',
    description: 'Public celebration roadmap. 40% tasks completed across open ground booking, sound licenses & security valet.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
    targetDate: '10 Oct 2026',
    daysLeft: 84,
    seasonBadge: 'Navratri Season',
    totalBudgetDisplay: '₹18.0 Lakhs',
    spentBudgetDisplay: '₹6.3 Lakhs',
    remainingBudgetDisplay: '₹11.7 Lakhs',
    percentage: 35,
    totalGuests: 1800,
    confirmedGuests: 1200,
    pendingGuests: 600,
    guestLabel: 'Community Members & Attendees',
    tasksCompleted: 4,
    totalTasks: 10,
    ctaText: 'Submit Festival Enquiry',
  },
};

export const DashboardHeroRow: React.FC = () => {
  const [selectedEventType, setSelectedEventType] = useState<PlannerEventType>('wedding');
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const current = EVENT_CONFIGS[selectedEventType];

  return (
    <div className="space-y-4 mb-8">
      {/* Event Type Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mr-1 shrink-0">
          Event Mode:
        </span>
        {(Object.keys(EVENT_CONFIGS) as PlannerEventType[]).map((key) => {
          const cfg = EVENT_CONFIGS[key];
          const isActive = selectedEventType === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedEventType(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-white text-ink-secondary hover:text-ink hover:bg-ivory border border-ivory-border'
              }`}
            >
              {cfg.icon}
              <span>{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* 1. Dynamic Welcome Card (5 cols) */}
        <div className="lg:col-span-5 relative bg-emerald-soft rounded-3xl p-6 sm:p-7 overflow-hidden border border-emerald-primary/15 shadow-soft-sm flex items-center justify-between min-h-[190px]">
          <div className="z-10 max-w-[64%]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest text-white text-[10px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>{current.tag}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {current.title}
            </h2>
            <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
              {current.description}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => openEnquiryModal()}
                className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-bold shadow-xs transition-transform active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </button>
              <Link
                href="/businesses"
                className="px-3.5 py-2 rounded-xl border border-forest/20 hover:bg-white/60 text-forest text-xs font-semibold transition-colors"
              >
                Find Venues
              </Link>
            </div>
          </div>

          {/* Right Visual Graphic */}
          <div className="absolute right-0 bottom-0 top-0 w-36 sm:w-44 overflow-hidden pointer-events-none flex items-end justify-center">
            <Image
              src={current.image}
              alt={current.title}
              width={220}
              height={260}
              className="object-cover object-top h-full w-full rounded-r-3xl opacity-95 transition-all duration-500"
            />
          </div>
        </div>

        {/* 2. Dynamic Countdown Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
                Countdown
              </span>
              <Calendar className="w-4 h-4 text-gold-dark" />
            </div>
            <h3 className="font-serif text-sm font-bold text-ink mt-0.5 truncate">
              {current.label} Date
            </h3>
            <div className="mt-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-dark">
                {current.daysLeft}
              </span>
              <span className="text-xs text-ink-secondary font-medium ml-1">Days Left</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs text-ink-secondary">
            <span className="font-semibold text-[11px]">{current.targetDate}</span>
            <span className="text-[10px] text-forest font-bold px-1.5 py-0.5 rounded bg-emerald-soft">
              {current.seasonBadge}
            </span>
          </div>
        </div>

        {/* 3. Dynamic Budget Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
                Budget Used
              </span>
              <CreditCard className="w-4 h-4 text-forest" />
            </div>
            <div className="mt-2.5">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                {current.percentage}<span className="text-xl">%</span>
              </span>
              <span className="text-xs text-ink-secondary font-medium ml-1">Allocated</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-ivory-dark h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-forest h-full rounded-full transition-all duration-500"
                style={{ width: `${current.percentage}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs text-ink-secondary">
            <div>
              <span className="text-[10px] text-ink-muted block leading-none">Remaining</span>
              <span className="font-bold text-ink text-xs">{current.remainingBudgetDisplay}</span>
            </div>
            <span className="text-[10px] text-ink-muted font-medium">{current.totalBudgetDisplay}</span>
          </div>
        </div>

        {/* 4. Dynamic Guest & Task Summary Card (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
                Guest RSVPs
              </span>
              <Link
                href="/enquiry"
                className="text-[11px] text-forest hover:underline font-bold"
              >
                Update Details
              </Link>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="font-serif text-2xl font-bold text-ink">
                {current.confirmedGuests}
              </h3>
              <span className="text-xs text-ink-secondary">of {current.totalGuests} Confirmed</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-[10px]">
              <span className="px-2 py-0.5 rounded-full bg-emerald-soft text-forest font-semibold">
                {current.confirmedGuests} Confirmed
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">
                {current.pendingGuests} Pending
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-ink-secondary">
              <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
              <span className="text-[11px]">{current.tasksCompleted} of {current.totalTasks} Tasks Done</span>
            </div>
            <button
              onClick={() => openEnquiryModal()}
              className="text-forest hover:text-forest-dark text-[11px] font-bold"
            >
              Check Slots &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
