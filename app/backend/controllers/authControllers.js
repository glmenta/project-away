import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/index.js";
import { addUserToDB, loginUserToDB, getUsersFromDB, getUserFromDB } from "../services/userServices.js";

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
        return res.status(400).send({ error: 'Username and password are required.' });
    }

    try {
        // Fetch user data from Firestore to get the email based on the username
        const dbUser = await loginUserToDB(username);
        console.log('dbUser', dbUser)
        if (!dbUser) {
            return res.status(404).send({ error: 'User not found in the database.' });
        }

        const email = dbUser.email;

        // Authenticate with Firebase Authentication using the retrieved email
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // User is successfully authenticated
        //console.log('User logged in successfully:', user);

        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        res.status(200).send({ message: 'User logged in successfully', user: user });
    } catch (error) {
        console.error('Login error:', error);

        if (error.code === 'auth/wrong-password') {
            return res.status(401).send({ error: 'Invalid password' });
        }
        if (error.code === 'auth/user-not-found') {
            return res.status(404).send({ error: 'No user found with this email' });
        }

        res.status(500).send({ error: 'An error occurred while logging in.' });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        // Fetch user from Firestore using uid from decoded token
        const user = await getUserFromDB(req.user.uid);
        if (user.error) {
            return res.status(404).send(user);
        }
        res.send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: 'An error occurred while fetching the user' });
    }
};
