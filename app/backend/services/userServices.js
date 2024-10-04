import { db } from "../../../firebase/index.js";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { setLogLevel } from "firebase/firestore";

export const addUserToDB = async (user) => {
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
    console.log('hit loginUserToDB', username)
    try {
        // Query Firestore for a user with the provided username
        const userQuery = collection(db, 'users');
        //console.log('userQuery', userQuery)
        const q = query(userQuery, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null; // No user found with that username
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
        const userDocRef = doc(db, "users", id); // Create a reference to the user document by UID
        const userDoc = await getDoc(userDocRef); // Fetch the document
        if (userDoc.exists()) {
            return userDoc.data(); // Return user data if document exists
        } else {
            return { error: 'User not found' }; // Return error if no document is found
        }
    } catch (error) {
        console.error('Error fetching user from Firestore:', error);
        throw new Error('Error fetching user from database');
    }
};
