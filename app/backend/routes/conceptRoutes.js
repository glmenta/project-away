import express from 'express';
import { getConceptsFromDB, addConceptToDB } from '../services/conceptServices.js';

const router = express.Router();

router.get('/all-concepts', getConceptsFromDB);
router.post('/new-concept', addConceptToDB);
export default router
