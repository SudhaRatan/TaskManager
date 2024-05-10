import { create } from "zustand";

export const useTaskStore = create((set) => ({
  categoryTasks: [],
  setCategoryTasks: (tasks) => set({ categoryTasks: tasks }),
  enhance:null,
  setEnhance:(enhance) => set({enhance})
}));
