import express from 'express';
import {
    getTrainings,
    getTraining,
    createTraining,
    updateTraining,
    deleteTraining,
    getTrainingsCount
} from '../controllers/trainings.js';

export const router = express.Router();

router.get('/trainings', getTrainings);
router.get('/trainings/:id', getTraining);
router.post('/trainings', createTraining);
router.put('/trainings/:id', updateTraining);
router.delete('/trainings/:id', deleteTraining);
router.get('/trainings/count', getTrainingsCount);
