import { db } from "../../../firebase/index.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const getAllDiagramsFromDB = async () => {
    try {
        const diagrams = []
        const querySnapshot = await getDocs(collection(db, "diagrams"));
        querySnapshot.forEach((doc) => {
            diagrams.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return diagrams
    } catch (error) {
        console.error('error', error)
    }
}

export const addDiagramToDB = async (diagram) => {
    try {
        const docRef = await addDoc(collection(db, "diagrams"), diagram);
        console.log("Document written with ID:", docRef.id);
        return diagram
    } catch (error) {
        console.error("Error adding document to Firestore:", error);
        throw error;  // Re-throw the error so it can be caught in registerUser
    }
}
