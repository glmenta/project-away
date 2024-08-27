import { db } from "../../../firebase/index.js";
import { collection, getDocs } from "firebase/firestore";

export const getUsersFromDB = async () => {
    try {
        const users = []
        const querySnapshot = await getDocs(collection(db, "users"));
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
