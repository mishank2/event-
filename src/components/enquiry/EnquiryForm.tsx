'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquiryFormSchema, EnquiryFormValues } from '@/lib/validations';
import { Business } from '@/types';
import { AHMEDABAD_AREAS } from '@/data/categories';
import { useToastStore } from '@/store/useToastStore';
import {
  Calendar,
  Users,
  MapPin,
  Mail,
  Phone,
  User,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';

interface EnquiryFormProps {
  preselectedBusiness?: Business | null;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  preselectedBusiness,
  onSuccess,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<EnquiryFormValues | null>(null);
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      customerName: '',
      mobileNumber: '',
      email: '',
      eventType: 'Wedding & Grand Reception',
      eventDate: '',
      eventLocation: preselectedBusiness ? preselectedBusiness.area : 'Sindhu Bhavan Road (SBR)',
      numberOfGuests: '' as any,
      preferredBusiness: preselectedBusiness ? preselectedBusiness.name : '',
      preferredBusinessId: preselectedBusiness ? preselectedBusiness.id : '',
      estimatedBudget: '₹2,00,000 - ₹5,00,000',
      requirements: preselectedBusiness
        ? `I am interested in checking date availability and official package rates for ${preselectedBusiness.name}.`
        : '',
      additionalNotes: '',
    },
  });

  const selectedGuests = watch('numberOfGuests');

  const onSubmit = async (data: EnquiryFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedData(data);
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Enquiry Received by Gatherly',
      message: 'Our Ahmedabad concierge team is verifying date availability.',
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const guestQuickOptions = [150, 350, 750, 1500, 2500];

  if (submitted && submittedData) {
    return (
      <div className="p-8 sm:p-10 text-center bg-white rounded-3xl border border-sand-border shadow-soft-sm animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-coral-soft flex items-center justify-center text-coral shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-sand text-charcoal border border-sand-border mb-3">
          Concierge Token: #GTH-{Math.floor(100000 + Math.random() * 900000)}
        </span>

        <h3 className="font-serif text-3xl font-bold text-charcoal mb-2">
          Thank you for contacting Gatherly!
        </h3>
        <p className="text-sm font-medium text-charcoal-muted mb-6 max-w-md mx-auto leading-relaxed">
          Our team will check availability with the relevant business and contact you shortly.
        </p>

        <div className="bg-sand-light rounded-2xl p-5 text-left text-xs space-y-2.5 border border-sand-border max-w-md mx-auto mb-6">
          <div className="flex justify-between pb-2 border-b border-sand-border">
            <span className="text-charcoal-muted">Customer Name:</span>
            <span className="font-bold text-charcoal">{submittedData.customerName}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-sand-border">
            <span className="text-charcoal-muted">Target Event:</span>
            <span className="font-bold text-coral">{submittedData.eventType}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-sand-border">
            <span className="text-charcoal-muted">Event Date:</span>
            <span className="font-bold text-charcoal">{submittedData.eventDate}</span>
          </div>
          {submittedData.preferredBusiness && (
            <div className="flex justify-between pb-2 border-b border-sand-border">
              <span className="text-charcoal-muted">Selected Business:</span>
              <span className="font-bold text-charcoal">{submittedData.preferredBusiness}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-charcoal-muted">Guests & Area:</span>
            <span className="font-bold text-charcoal">
              {submittedData.numberOfGuests} Guests • {submittedData.eventLocation}
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-sand rounded-2xl text-xs text-charcoal mb-6 flex items-center justify-center gap-2 max-w-md mx-auto">
          <Clock className="w-4 h-4 text-ochre shrink-0" />
          <span>Expected response: Within 2 to 4 business hours (Ahmedabad IST).</span>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            reset();
          }}
          className="px-7 py-3 rounded-2xl bg-coral hover:bg-coral-hover text-white text-xs font-bold shadow-xs transition-all"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-sand-light border border-sand-border text-xs text-charcoal space-y-1">
        <div className="flex items-center gap-2 font-bold">
          <ShieldCheck className="w-4 h-4 text-ochre" />
          <span>Private Gatherly Concierge Intake</span>
        </div>
        <p className="text-charcoal-muted text-[11px] leading-relaxed">
          Your enquiry is handled directly by Gatherly’s internal event desk. We contact venue management privately to check dates and negotiate packages without vendor spam.
        </p>
      </div>

      {preselectedBusiness && (
        <div className="p-3.5 rounded-2xl bg-sand border border-sand-border flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Enquiring for:</span>
            <span className="font-serif font-bold text-charcoal text-base">{preselectedBusiness.name}</span>
            <span className="text-charcoal-muted ml-2">({preselectedBusiness.area})</span>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white border border-sand-border text-charcoal">
            {preselectedBusiness.category}
          </span>
        </div>
      )}

      {/* Row 1: Name and Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Customer Name <span className="text-coral">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Priyanshu Patel"
              {...register('customerName')}
              className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border bg-sand-light focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.customerName
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-sand-border focus:border-coral focus:ring-coral/10'
              }`}
            />
          </div>
          {errors.customerName && (
            <p className="text-[11px] text-coral mt-1 font-medium">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Mobile Number <span className="text-coral">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="tel"
              placeholder="e.g. 9825012345"
              {...register('mobileNumber')}
              className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border bg-sand-light focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.mobileNumber
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-sand-border focus:border-coral focus:ring-coral/10'
              }`}
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-[11px] text-coral mt-1 font-medium">{errors.mobileNumber.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email and Event Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Email Address <span className="text-coral">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="email"
              placeholder="e.g. priyanshu@example.com"
              {...register('email')}
              className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border bg-sand-light focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-sand-border focus:border-coral focus:ring-coral/10'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-coral mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Event Type <span className="text-coral">*</span>
          </label>
          <select
            {...register('eventType')}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-sand-border bg-sand-light focus:bg-white focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all text-charcoal"
          >
            <option value="Wedding & Grand Reception">Wedding & Grand Reception</option>
            <option value="Sangeet & Garba Night">Sangeet & Garba Night</option>
            <option value="Ring Ceremony / Sagai">Ring Ceremony / Sagai</option>
            <option value="Haldi & Mehendi">Haldi & Mehendi</option>
            <option value="Birthday Celebration">Birthday Celebration</option>
            <option value="Anniversary Party">Anniversary Party</option>
            <option value="Corporate Conclave / Gala">Corporate Conclave / Gala</option>
            <option value="Community Samaj Event">Community Samaj Event</option>
            <option value="Other Celebration">Other Celebration</option>
          </select>
        </div>
      </div>

      {/* Row 3: Event Date, Location, Guest Count */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Target Event Date <span className="text-coral">*</span>
          </label>
          <input
            type="date"
            {...register('eventDate')}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border bg-sand-light focus:bg-white focus:outline-none focus:ring-2 transition-all text-charcoal ${
              errors.eventDate
                ? 'border-red-400 focus:ring-red-200'
                : 'border-sand-border focus:border-coral focus:ring-coral/10'
            }`}
          />
          {errors.eventDate && (
            <p className="text-[11px] text-coral mt-1 font-medium">{errors.eventDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Ahmedabad Area <span className="text-coral">*</span>
          </label>
          <select
            {...register('eventLocation')}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-sand-border bg-sand-light focus:bg-white focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all text-charcoal"
          >
            {AHMEDABAD_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal mb-1">
            Guest Count <span className="text-coral">*</span>
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="number"
              placeholder="e.g. 500"
              {...register('numberOfGuests')}
              className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border bg-sand-light focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.numberOfGuests
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-sand-border focus:border-coral focus:ring-coral/10'
              }`}
            />
          </div>
          {errors.numberOfGuests && (
            <p className="text-[11px] text-coral mt-1 font-medium">{errors.numberOfGuests.message}</p>
          )}
        </div>
      </div>

      {/* Quick Guest Count Pills */}
      <div>
        <span className="text-[11px] text-charcoal-muted block mb-1">Quick Select Guest Count:</span>
        <div className="flex flex-wrap gap-2">
          {guestQuickOptions.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setValue('numberOfGuests', count)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                selectedGuests === count
                  ? 'bg-coral text-white border-coral shadow-xs'
                  : 'bg-sand-light text-charcoal border-sand-border hover:border-coral/50'
              }`}
            >
              ~{count} Guests
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: Budget Range */}
      <div>
        <label className="block text-xs font-bold text-charcoal mb-1">
          Estimated Overall Budget <span className="text-coral">*</span>
        </label>
        <select
          {...register('estimatedBudget')}
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-sand-border bg-sand-light focus:bg-white focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all text-charcoal"
        >
          <option value="Under ₹2,00,000">Under ₹2,00,000</option>
          <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
          <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
          <option value="₹10,00,000 - ₹25,00,000">₹10,00,000 - ₹25,00,000</option>
          <option value="₹25,00,000+ (Ultra Luxury)">₹25,00,000+ (Ultra Luxury)</option>
        </select>
      </div>

      {/* Row 5: Requirements */}
      <div>
        <label className="block text-xs font-bold text-charcoal mb-1">
          Key Requirements & Details <span className="text-coral">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Mention specific dates, timings (day/evening), catering preferences (Jain/Swaminarayan), decorator style, or specific questions..."
          {...register('requirements')}
          className={`w-full p-3.5 text-xs sm:text-sm rounded-2xl border bg-sand-light focus:bg-white focus:outline-none focus:ring-2 transition-all ${
            errors.requirements
              ? 'border-red-400 focus:ring-red-200'
              : 'border-sand-border focus:border-coral focus:ring-coral/10'
          }`}
        />
        {errors.requirements && (
          <p className="text-[11px] text-coral mt-1 font-medium">{errors.requirements.message}</p>
        )}
      </div>

      {/* Row 6: Additional Notes */}
      <div>
        <label className="block text-xs font-bold text-charcoal mb-1">
          Additional Notes (Optional)
        </label>
        <input
          type="text"
          placeholder="Preferred time to receive a call back, alternate contacts, etc."
          {...register('additionalNotes')}
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-sand-border bg-sand-light focus:bg-white focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all text-charcoal"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-2xl bg-coral hover:bg-coral-hover active:bg-coral-dark text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 active:scale-[0.99]"
      >
        <Send className="w-4 h-4 text-white" />
        <span>{isSubmitting ? 'Submitting to Gatherly...' : 'Submit Enquiry to Gatherly'}</span>
      </button>

      <p className="text-[11px] text-center text-charcoal-muted leading-relaxed">
        By submitting, you authorize Gatherly Concierge to coordinate availability with the relevant business and reach out via Phone/WhatsApp.
      </p>
    </form>
  );
};
