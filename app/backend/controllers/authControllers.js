import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/index.js";
import { addUserToDB } from "../services/userServices.js";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('user', user);
        const userObj = {
            email: user.email,
            username: req.body.username || 'default'
        }
        await addUserToDB(userObj);
        res.send('user created');
    } catch (error) {
        console.error('error', error)
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
