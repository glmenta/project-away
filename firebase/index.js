import dotenv from 'dotenv';
dotenv.config();
import { initializeApp } from 'firebase/app'; // Correct import
import { getAuth } from 'firebase/auth'; // Auth import
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore import
import admin from 'firebase-admin';

// Destructuring environment variables
const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
} = process.env;

// Firebase configuration object
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app, 'pa-db');

console.log('Firebase initialized with Firestore and Auth');

const testConnection = async () => {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            testField: 'testing again',
            timestamp: new Date(),
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error writing document to Firestore: ', error);
    }
};

testConnection();

auth.onAuthStateChanged(async (user) => {
    if (user) {
        const token = await user.getIdToken();  // Retrieve the JWT token
        // Send token to the backend in request headers
        const response = await fetch('http://localhost:5000/currentUser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('Logged in user:', data);
    } else {
        console.log('No user is logged in');
    }
});

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the Firebase JWT token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach decoded user info to the request object
        next(); // Pass control to the next handler
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(403).send({ error: 'Invalid or expired token.' });
    }
};
