import { getConceptsFromDB, addConceptToDB } from '../services/conceptServices.js';

export const getConcepts = async (req, res) => {
    try {
        const concepts = await getConceptsFromDB();
        res.status(200).json(concepts)
    } catch (error) {
        console.error('error', error)
    }
}

export const addConcept = async (req, res) => {
    const { userId, name, description, likes = 0, comments = [] } = req.body;
    try {
        const conceptId = await addConceptToDB({ userId, name, description, likes, comments });
        res.status(201).json({
            message: 'Concept created successfully',
            conceptId
        })
    } catch (error) {
        console.error('error', error)
    }
}
