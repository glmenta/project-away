import express from 'express';
import { getDiagrams, addDiagram } from '../controllers/diagramControllers.js';

const router = express.Router();

router.get('/all', getDiagrams);
router.post('/new', addDiagram);

export default router
