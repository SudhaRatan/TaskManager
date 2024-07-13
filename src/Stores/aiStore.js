import { create } from "zustand";

export const aiStore = create((set, get) => ({
  connection: null,
  setConnection: (val) => set({ connection: val }),
}));
