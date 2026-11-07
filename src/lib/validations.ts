import { z } from 'zod';

export const enquiryFormSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: 'Please enter your full name (at least 2 characters)' })
    .max(80, { message: 'Name is too long' }),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, {
      message: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)',
    }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  eventType: z
    .string()
    .min(1, { message: 'Please select an event type' }),
  eventDate: z
    .string()
    .min(1, { message: 'Please select your target event date' }),
  eventLocation: z
    .string()
    .min(1, { message: 'Please select your preferred area in Ahmedabad' }),
  numberOfGuests: z
    .coerce
    .number({ invalid_type_error: 'Guest count must be a number' })
    .min(10, { message: 'Minimum 10 guests required' })
    .max(10000, { message: 'Maximum 10,000 guests supported' }),
  preferredBusiness: z.string().optional(),
  preferredBusinessId: z.string().optional(),
  estimatedBudget: z
    .string()
    .min(1, { message: 'Please specify your estimated budget range' }),
  requirements: z
    .string()
    .min(10, { message: 'Please describe your key requirements (at least 10 characters)' })
    .max(1500, { message: 'Requirements must be under 1,500 characters' }),
  additionalNotes: z.string().optional(),
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
