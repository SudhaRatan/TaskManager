import { create } from "zustand";

export const useTaskStore = create((set) => ({
  categoryTasks: [],
  setCategoryTasks: (tasks) => set({ categoryTasks: tasks }),
}));
