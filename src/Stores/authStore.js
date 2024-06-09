import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (val) => set({ user: val }),
}));
