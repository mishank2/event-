import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  savedIds: string[];
  toggleWishlist: (id: string) => boolean; // returns true if now saved, false if removed
  isSaved: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      savedIds: ['shantam-party-plot', 'grand-bhagwati-sg-highway'],
      toggleWishlist: (id: string) => {
        const current = get().savedIds;
        const exists = current.includes(id);
        if (exists) {
          set({ savedIds: current.filter((item) => item !== id) });
          return false;
        } else {
          set({ savedIds: [...current, id] });
          return true;
        }
      },
      isSaved: (id: string) => get().savedIds.includes(id),
      clearWishlist: () => set({ savedIds: [] }),
    }),
    {
      name: 'gatherly_customer_wishlist',
    }
  )
);
