import express from 'express';
import { getConceptsFromDB, addConceptToDB } from '../services/conceptServices.js';

const router = express.Router();

router.get('/all', getConceptsFromDB);
router.post('/new', addConceptToDB);
export default router
