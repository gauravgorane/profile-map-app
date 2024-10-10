import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const appSettings = {
  databaseURL: "https://profile-map-app-92ae1-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
export const database = getDatabase(app);
