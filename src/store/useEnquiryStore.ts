import { create } from 'zustand';
import { Business } from '@/types';

interface EnquiryStore {
  isOpen: boolean;
  selectedBusiness: Business | null;
  openEnquiryModal: (business?: Business | null) => void;
  closeEnquiryModal: () => void;
}

export const useEnquiryStore = create<EnquiryStore>((set) => ({
  isOpen: false,
  selectedBusiness: null,
  openEnquiryModal: (business = null) =>
    set({
      isOpen: true,
      selectedBusiness: business,
    }),
  closeEnquiryModal: () =>
    set({
      isOpen: false,
      selectedBusiness: null,
    }),
}));
