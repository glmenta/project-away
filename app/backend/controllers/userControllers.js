import { getUsersFromDB } from "../services/userServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersFromDB();
        res.send(users);
    } catch (error) {
        console.error('error', error)
    }
}
