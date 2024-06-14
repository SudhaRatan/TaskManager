import "expo-firestore-offline-persistence";
import { create } from "zustand";
import {
  GoogleAuthProvider,
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyB5e9fack2km1Nx1zUN2BgQWhECJhdrHoY",
  authDomain: "taskmanager-2a678.firebaseapp.com",
  projectId: "taskmanager-2a678",
  storageBucket: "taskmanager-2a678.appspot.com",
  messagingSenderId: "570152310936",
  appId: "1:570152310936:web:2917ba1233a6e7afa858ed",
  measurementId: "G-KNS61B863G",
};


const app = initializeApp(firebaseConfig);
export const useDatabaseStore = create((set, get) => ({
  provider: new GoogleAuthProvider(),
  database: initializeFirestore(app, {
    localCache: persistentLocalCache({
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    }),
  }),
  auth:
    Platform.OS === "web"
      ? getAuth(app)
      : initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        }),
}));
