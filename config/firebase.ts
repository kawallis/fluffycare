import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApprB9uk_NFhSqPnKisgoy_zE7cqtZTo8",
  authDomain: "fluffycare-develop.firebaseapp.com",
  projectId: "fluffycare-develop",
  storageBucket: "fluffycare-develop.appspot.com",
  messagingSenderId: "496081685104",
  appId: "1:496081685104:web:45c3be524425d3194ec2b5",
  measurementId: "G-XS6EPGK5YZ",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(getApp());

export default firebaseConfig;
