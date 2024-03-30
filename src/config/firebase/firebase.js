// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGZYCky49tUrJhL2Y8w8ls_fYEyQsnENk",
  authDomain: "livestream-storaged.firebaseapp.com",
  projectId: "livestream-storaged",
  storageBucket: "livestream-storaged.appspot.com",
  messagingSenderId: "252561388316",
  appId: "1:252561388316:web:9619d74735dde6e44040d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
