
import express from 'express';
import multer from 'multer';

import {
    analyzeResume,
    getHistory,
    getAnalysis
} from '../controllers/analyzeController.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/', upload.single('resume'), analyzeResume);

router.get('/history', getHistory);

router.get('/:id', getAnalysis);

export default router;