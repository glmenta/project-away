//require('dotenv').config();

const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDxxdMUwEbNAuE3ANeaQ-0uK4xwKxw3kLA",
    authDomain: "project-away-32a6f.firebaseapp.com",
    projectId: "project-away-32a6f",
    storageBucket: "project-away-32a6f.appspot.com",
    messagingSenderId: "920785747193",
    appId: "1:920785747193:web:12345c64796cefc58bf628",
    measurementId: "G-VXYYLQZ74J"
};
console.log('firebaseConfig', firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { db, auth };
