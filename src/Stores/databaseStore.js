import { create } from "zustand";
import schema from "../model/schema";
import migrations from "../model/migrations";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import SqliteAdapter from "../utils/SqliteAdapter";
import { Database } from "@nozbe/watermelondb";
import { Platform } from "react-native";
import Category from "../model/Category";
import Task from "../model/Task";
import SubTask from "../model/SubTask";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";

// const adapter =
//   Platform.OS === "web"
//     ? new LokiJSAdapter({
//         schema,
//         migrations,
//         useWebWorker: false,
//         useIncrementalIndexedDB: true,
//         // dbName: 'myapp', // optional db name

//         // --- Optional, but recommended event handlers:

//         onQuotaExceededError: (error) => {
//           // Browser ran out of disk space -- offer the user to reload the app or log out
//         },
//         onSetUpError: (error) => {
//           // Database failed to load -- offer the user to reload the app or log out
//           console.log(error);
//         },
//         extraIncrementalIDBOptions: {
//           onDidOverwrite: () => {
//             // Called when this adapter is forced to overwrite contents of IndexedDB.
//             // This happens if there's another open tab of the same app that's making changes.
//             // Try to synchronize the app now, and if user is offline, alert them that if they close this
//             // tab, some data may be lost
//           },
//           onversionchange: () => {
//             // database was deleted in another browser tab (user logged out), so we must make sure we delete
//             // it in this tab as well - usually best to just refresh the page
//             if (checkIfUserIsLoggedIn()) {
//               window.location.reload();
//             }
//           },
//         },
//       })
//     : new SqliteAdapter({
//         schema,
//         migrations,
//         // (optional database name or file system path)
//         // dbName: 'myapp',
//         // (recommended option, should work flawlessly out of the box on iOS. On Android,
//         // additional installation steps have to be taken - disable if you run into issues...)
//         // jsi: true /* Platform.OS === 'ios' */,
//         // (optional, but you should implement this method)
//         onSetUpError: (error) => {
//           // Database failed to load -- offer the user to reload the app or log out
//           console.log(error);
//         },
//       });
const firebaseConfig = {
  apiKey: "AIzaSyB5e9fack2km1Nx1zUN2BgQWhECJhdrHoY",
  authDomain: "taskmanager-2a678.firebaseapp.com",
  projectId: "taskmanager-2a678",
  storageBucket: "taskmanager-2a678.appspot.com",
  messagingSenderId: "570152310936",
  appId: "1:570152310936:web:2917ba1233a6e7afa858ed",
  measurementId: "G-KNS61B863G",
};
export const useDatabaseStore = create((set, get) => ({
  provider: new GoogleAuthProvider(),
  database: initializeFirestore(initializeApp(firebaseConfig), {
    localCache: persistentLocalCache({ cacheSizeBytes: CACHE_SIZE_UNLIMITED }),
  }),
  auth: getAuth(),
}));
