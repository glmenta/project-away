import express from 'express';
import { getConceptsFromDB, addConceptToDB } from '../services/conceptServices.js';
import { verifyToken } from '../../../firebase/index.js';

const router = express.Router();

router.get('/all', getConceptsFromDB);
router.post('/new', verifyToken, addConceptToDB);

export default router
