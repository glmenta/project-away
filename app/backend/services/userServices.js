import { db } from "../../../firebase/index.js";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { setLogLevel } from "firebase/firestore";

// Set log level to debug to get more detailed output
//setLogLevel('debug');

export const addUserToDB = async (user) => {
    // console.log('Adding user to Firestore database...');
    // console.log('user: ', user)
    try {
        // Add user to the "users" collection in Firestore
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document to Firestore:", error);
        throw error;  // Re-throw the error so it can be caught in registerUser
    }
}

export const loginUserToDB = async (username) => {
    try {
        // Create a query to find the user by email directly in Firestore
        const userQuery = collection(db, "users");
        const querySnapshot = await getDocs(query(userQuery, where("username", "==", username)));

        if (querySnapshot.empty) {
            return null; // No user found with that email
        }

        const userDoc = querySnapshot.docs[0];
        const user = {
            id: userDoc.id,
            ...userDoc.data(),
        };

        return user;
    } catch (error) {
        console.error('Error fetching user from the database:', error);
        throw new Error('Error fetching user data');
    }
};

export const getUsersFromDB = async () => {
    //console.log('hello from db');
    try {
        const users = []
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log('querySnapshot', querySnapshot)
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return users
    } catch (error) {
        console.error('error', error)
    }
}

export const getUserFromDB = async (id) => {
    try {
        const userDoc = await getDocs(collection(db, "users"), id);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            return {
                error: 'User not found'
            }
        }
    } catch (error) {
        console.error('error', error)
    }
}
