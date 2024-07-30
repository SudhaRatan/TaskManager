import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (val) => set({ user: val }),
    }),
    { name: "authStorage", storage: createJSONStorage(() => Platform.OS === "web" ? localStorage : AsyncStorage) }
  )
);
