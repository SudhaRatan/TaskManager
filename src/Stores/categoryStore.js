import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  category: null,
  setCategory: (categor) => set({ category: categor }),
  categoryMenu: false,
  setCategoryMenu: (value) => set({ categoryMenu: value }),
  categories: null,
  setCategories: (value) => set({ categories: value }),
}));
