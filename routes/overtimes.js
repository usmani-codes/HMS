import express from 'express';
import {
    getOvertimes,
    getOvertime,
    createOvertime,
    updateOvertime,
    deleteOvertime,
    getOvertimesCount
} from '../controllers/overtimes.js';

export const router = express.Router();

router.get('/overtimes', getOvertimes);
router.get('/overtimes/:id', getOvertime);
router.post('/overtimes', createOvertime);
router.put('/overtimes/:id', updateOvertime);
router.delete('/overtimes/:id', deleteOvertime);
router.get('/overtimes/count', getOvertimesCount);
