import { db } from "../../../firebase/index.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const addConceptToDB = async (concept) => {
    try {
        const docRef = await addDoc(collection(db, "concepts"), concept);
        console.log("Document written with ID:", docRef.id);
        return concept
    } catch (error) {
        console.error("Error adding document to Firestore:", error);
        throw error;
    }
}

export const getConceptsFromDB = async () => {
    try {
        const concepts = []
        const querySnapshot = await getDocs(collection(db, "concepts"));
        querySnapshot.forEach((doc) => {
            concepts.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return concepts
    } catch (error) {
        console.error('error', error)
    }
}
