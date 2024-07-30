import { create } from "zustand";

export const useTaskStore = create((set) => ({
  categoryTasks: null,
  setCategoryTasks: (tasks) => set({ categoryTasks: tasks }),
  enhance:null,
  setEnhance:(enhance) => set({enhance})
}));
