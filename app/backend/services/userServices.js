import { db } from "../../../firebase/index.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { setLogLevel } from "firebase/firestore";

// Set log level to debug to get more detailed output
setLogLevel('debug');

export const addUserToDB = async (user) => {
    console.log('Adding user to Firestore database...');
    console.log('user: ', user)
    try {
        // Add user to the "users" collection in Firestore
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document to Firestore:", error);
        throw error;  // Re-throw the error so it can be caught in registerUser
    }
}
export const getUsersFromDB = async () => {
    console.log('hello from db');
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
