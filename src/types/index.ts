export type CategoryId =
  | 'marriage-halls'
  | 'party-plots'
  | 'banquet-halls'
  | 'wedding-gardens'
  | 'catering'
  | 'decoration'
  | 'photography'
  | 'videography'
  | 'dj-sound'
  | 'makeup-artists'
  | 'wedding-services'
  | 'birthday-party-venues'
  | 'corporate-event-venues'
  | 'community-event-venues'
  | 'anniversary-venues'
  | 'baby-celebrations'
  | 'festival-grounds'
  | 'educational-seminar-halls'
  | 'private-party-spaces'
  | 'other-event-services';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  slug: string;
  shortDescription: string;
  iconName: string;
  image: string;
  businessCount: number;
  featured: boolean;
}

export interface PricePackage {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  eventType: string;
  comment: string;
}

export interface Facility {
  title: string;
  description: string;
  icon?: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryId: CategoryId;
  tagline: string;
  description: string;
  aboutHighlights: string[];
  area: string;
  fullAddress: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  priceDisplay: string;
  priceUnit: 'per plate' | 'per day' | 'per event' | 'starting at';
  guestCapacity: {
    min: number;
    max: number;
  };
  capacityDisplay: string;
  featured: boolean;
  popular: boolean;
  verified: boolean;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  eventTypes: string[];
  facilities: Facility[];
  packages: PricePackage[];
  reviews: Review[];
  isDemo: true;
}

export interface EnquiryFormData {
  customerName: string;
  mobileNumber: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  numberOfGuests: number | '';
  preferredBusiness?: string;
  preferredBusinessId?: string;
  estimatedBudget: string;
  requirements: string;
  additionalNotes?: string;
  // Event-specific fields
  organizationName?: string;
  celebrantAge?: string;
  themePreference?: string;
  avRequirements?: string;
}

export interface FilterState {
  searchQuery: string;
  categoryId: string;
  area: string;
  eventType: string; // 'all' or specific event type like 'Weddings', 'Birthdays', etc.
  minCapacity: number;
  maxCapacity: number;
  priceRange: string; // 'all' | 'budget' | 'mid' | 'luxury'
  minRating: number;
  sortBy: 'popular' | 'rating-desc' | 'price-asc' | 'price-desc' | 'capacity-desc';
  viewMode: 'grid' | 'list';
}
