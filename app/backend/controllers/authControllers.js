import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/index.js";
import { addUserToDB } from "../services/userServices.js";

export const registerUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        // Create the user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user);

        // Create user object to save in Firestore
        const userObj = {
            email: user.email,
            username: username || 'default'
        }

        // Add user to Firestore
        await addUserToDB(userObj);

        // Send success response
        res.status(201).send('User created successfully and added to Firestore.');
    } catch (error) {
        console.error('Error creating user or adding to DB:', error);

        // Send error response
        res.status(500).send('Error creating user or adding to Firestore.');
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('user', user);
        res.send('user logged in');
    } catch (error) {
        console.error('error', error)
    }
}
