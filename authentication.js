// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const name = document.querySelector("#name");
const email = document.querySelector("#email");

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        "An error occurred while signing in!" + errorCode + " " + errorMessage
      );
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have been signed out!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        "An error occurred while signing out!" + errorCode + " " + errorMessage
      );
    });
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("You are authenticated with Google");
    console.log(user);

    localStorage.setItem("accessToken", user.accessToken);
    name.setAttribute("value", user.displayName);
    email.setAttribute("value", user.email);
  }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
