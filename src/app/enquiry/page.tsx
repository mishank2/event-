'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquiryFormSchema, EnquiryFormValues } from '@/lib/validations';
import { useToastStore } from '@/store/useToastStore';
import { AHMEDABAD_AREAS } from '@/data/categories';
import {
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  RotateCcw,
  Building,
  Cake,
  Heart,
  Gem,
  Flame,
} from 'lucide-react';

export default function EnquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      customerName: '',
      mobileNumber: '',
      email: '',
      eventType: 'Wedding & Grand Reception',
      eventDate: '',
      eventLocation: 'Sindhu Bhavan Road (SBR)',
      numberOfGuests: 350,
      estimatedBudget: '₹10,00,000 - ₹25,00,000',
      requirements: '',
      additionalNotes: '',
    },
  });

  const selectedEventType = watch('eventType');

  const getRequirementsPlaceholder = () => {
    if (selectedEventType.includes('Corporate')) {
      return 'Mention conference hall format (Theatre / U-Shape / Clusters), LED video wall, projector requirements, executive lunch buffet, delegate badges...';
    }
    if (selectedEventType.includes('Birthday')) {
      return 'Mention birthday theme, cake cutting time, balloon arch, magician / live game host, DJ, kids play zone...';
    }
    if (selectedEventType.includes('Anniversary')) {
      return 'Mention intimate dinner format, anniversary milestone, acoustic live music, memory slide projection, floral entrance...';
    }
    if (selectedEventType.includes('Baby')) {
      return 'Mention traditional cradle / swing decor, floral backdrop, family lunch thal requirements, photography...';
    }
    if (selectedEventType.includes('Community') || selectedEventType.includes('Festival')) {
      return 'Mention expected footfall, sound permissions, security guards, stage requirements, food stall areas...';
    }
    return 'Mention lawn vs banquet preference, AC bridal green rooms, mandap styling, catering cuisine (Kathiyawadi / Marwadi / Continental), valet parking...';
  };

  const onSubmit = async (data: EnquiryFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const generatedRef = 'GTH-' + Math.floor(10000 + Math.random() * 90000);
    setRefId(generatedRef);
    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Enquiry Received',
      message: 'Gatherly Concierge has received your celebration details.',
    });
  };

  return (
    <div className="py-8 sm:py-16 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-gold-dark" />
            <span>Dedicated Concierge Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Submit Event Enquiry
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-2 font-normal leading-relaxed">
            All customer enquiries are routed exclusively to Gatherly’s internal team. We privately check venue availability and provide consolidated rates for any celebration.
          </p>
        </div>

        {/* Confirmation Card if Submitted */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-ivory-border shadow-soft animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-soft text-forest flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-ivory text-xs font-semibold text-ink-muted mb-2">
              Reference: <strong className="text-forest">{refId}</strong>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-3">
              Thank you for contacting Gatherly.
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-md mx-auto mb-8">
              Our team will check availability with the relevant venue administrations and contact you within 24 hours.
            </p>

            <div className="p-4 rounded-2xl bg-ivory border border-ivory-border max-w-md mx-auto text-left space-y-2 text-xs mb-8">
              <div className="flex items-center gap-2 font-bold text-forest">
                <ShieldCheck className="w-4 h-4 text-gold-dark" />
                <span>Intermediary Privacy Protection Active</span>
              </div>
              <p className="text-ink-secondary text-[11px] leading-relaxed">
                Your mobile number will never be sold or shared with multiple competing vendors. Gatherly remains your single point of contact.
              </p>
            </div>

            <button
              onClick={() => {
                reset();
                setIsSubmitted(false);
              }}
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-gold" />
              <span>Submit Another Enquiry</span>
            </button>
          </div>
        ) : (
          /* Main Form Card */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-border shadow-soft">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Event Type & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Event Type *
                  </label>
                  <select
                    {...register('eventType')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all font-semibold"
                  >
                    <option value="Wedding & Grand Reception">Wedding &amp; Grand Reception</option>
                    <option value="Sangeet & Garba Night">Sangeet Sandhya / Garba</option>
                    <option value="Ring Ceremony / Engagement">Ring Ceremony / Engagement</option>
                    <option value="Milestone Birthday Party">Milestone Birthday / Theme Party</option>
                    <option value="Anniversary Celebration">Anniversary &amp; Intimate Celebration</option>
                    <option value="Corporate Summit / Conference">Corporate Summit / Annual Meet</option>
                    <option value="Baby Shower / Srimant">Baby Shower / Srimant / Cradle Ceremony</option>
                    <option value="Private Farmhouse Party">Private Farmhouse / Poolside Party</option>
                    <option value="Festival / Community Gathering">Festival / Cultural / Community Gathering</option>
                    <option value="Other Special Occasion">Other Special Occasion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Target Event Date *
                  </label>
                  <input
                    type="date"
                    {...register('eventDate')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  />
                  {errors.eventDate && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.eventDate.message}</p>
                  )}
                </div>
              </div>

              {/* Location & Guest Capacity Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Preferred Corridor in Ahmedabad *
                  </label>
                  <select
                    {...register('eventLocation')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  >
                    {AHMEDABAD_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Expected Number of Guests *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    {...register('numberOfGuests', { valueAsNumber: true })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  />
                  {errors.numberOfGuests && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.numberOfGuests.message}</p>
                  )}
                </div>
              </div>

              {/* Budget & Preferred Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Estimated Budget *
                  </label>
                  <select
                    {...register('estimatedBudget')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  >
                    <option value="Under ₹2,00,000">Under ₹2,00,000 (Intimate)</option>
                    <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                    <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                    <option value="₹10,00,000 - ₹25,00,000">₹10,00,000 - ₹25,00,000</option>
                    <option value="₹25,00,000 - ₹50,00,000">₹25,00,000 - ₹50,00,000</option>
                    <option value="Above ₹50,00,000">Above ₹50,00,000 (Grand Scale)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Preferred Venue / Business (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shantam Party Plot, SBR or TGB Palace"
                    {...register('preferredBusiness')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-ivory-border space-y-4">
                <h3 className="font-serif font-bold text-sm text-ink">
                  Contact Information (For Gatherly Admin Only)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyanshu Patel"
                      {...register('customerName')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register('mobileNumber')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                    {errors.mobileNumber && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.mobileNumber.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priyanshu@example.com"
                      {...register('email')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Adaptive Requirements & Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                  Event Requirements &amp; Special Arrangements *
                </label>
                <textarea
                  rows={3}
                  placeholder={getRequirementsPlaceholder()}
                  {...register('requirements')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all leading-relaxed"
                />
                {errors.requirements && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.requirements.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
                  <span>Enquiry is directed exclusively to Gatherly Admin Desk</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
                >
                  <CalendarCheck className="w-4 h-4 text-gold" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry to Gatherly'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
