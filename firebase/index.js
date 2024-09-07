import dotenv from 'dotenv';
dotenv.config();
import { initializeApp } from 'firebase/app'; // Correct import
import { getAuth } from 'firebase/auth'; // Auth import
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore import

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
export const db = getFirestore(app);

console.log('Firebase initialized with Firestore and Auth');

// Example Firestore write to check if it's connected properly
const testConnection = async () => {
    try {
        const docRef = await addDoc(collection(db, 'test'), {
            testField: 'This is a test',
            timestamp: new Date(),
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error writing document to Firestore: ', error);
    }
};

// Call the test function to verify Firestore connection
testConnection();
