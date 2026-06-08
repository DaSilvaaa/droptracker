import { create } from "zustand";
import type { FilterOption } from "./types";

interface UIStore {
  activeFilter: FilterOption;
  setActiveFilter: (filter: FilterOption) => void;
  selectedBrands: string[];
  toggleBrand: (slug: string) => void;
  clearBrands: () => void;
  subscriberEmail: string;
  setSubscriberEmail: (email: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeFilter: "all",
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  selectedBrands: [],
  toggleBrand: (slug) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(slug)
        ? state.selectedBrands.filter((s) => s !== slug)
        : [...state.selectedBrands, slug],
    })),
  clearBrands: () => set({ selectedBrands: [] }),
  subscriberEmail: "",
  setSubscriberEmail: (email) => set({ subscriberEmail: email }),
}));
