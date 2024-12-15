import express from 'express';
import {
    getBenefitTimes,
    getBenefitTime,
    createBenefitTime,
    updateBenefitTime,
    deleteBenefitTime,
    getBenefitTimesCount
} from '../controllers/benifitTimes.js';

export const router = express.Router();

router.get('/benefit-times', getBenefitTimes);
router.get('/benefit-times/:id', getBenefitTime);
router.post('/benefit-times', createBenefitTime);
router.put('/benefit-times/:id', updateBenefitTime);
router.delete('/benefit-times/:id', deleteBenefitTime);
router.get('/benefit-times/count', getBenefitTimesCount);
