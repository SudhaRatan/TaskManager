import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  category: null,
  setCategory: (category) => set({ category }),
}));
