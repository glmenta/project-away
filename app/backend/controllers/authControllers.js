import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/index.js";
import { addUserToDB, loginUserToDB } from "../services/userServices.js";

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
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    try {
        // Authenticate with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;

        // Fetch user data from Firestore after successful authentication
        const dbUser = await loginUserToDB(username);

        if (!dbUser) {
            return res.status(404).send({ error: 'User not found in the database' });
        }

        // Optional: Use bcrypt to check if the password matches (if password is hashed in Firestore)
        // Assuming the password stored in the database is hashed
        const passwordMatch = await bcrypt.compare(password, dbUser.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        // User is successfully authenticated and found in Firestore
        console.log('User logged in successfully:', user);

        res.status(200).send({ message: 'User logged in successfully', user: dbUser });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'An error occurred while logging in' });
    }
};
