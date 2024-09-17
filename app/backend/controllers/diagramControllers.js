import { getAllDiagramsFromDB, addDiagramToDB } from "../services/diagramServices";
import authMiddleware from "../authMiddleware.js";

export const getDiagrams = async (req, res) => {
    try {
        const diagrams = await getAllDiagramsFromDB();
        res.send(diagrams);
    } catch (error) {
        console.error('error', error)
    }
}

export const addDiagram = [ authMiddleware, async (req, res) => {
    const { userId, name, description, likes = 0, comments = [], sequence = [] } = req.body;

    if (!userId || !name) {
        return res.status(400).send({ error: 'Missing required fields: userId and name' });
    }

    try {
        const diagram = await addDiagramToDB(req.body);
        res.status(200).send(diagram);
    } catch (error) {
        console.error('Error adding diagram:', error);
        res.status(500).send({ error: 'An error occurred while adding the diagram' });
    }
}];
