import express from 'express';
import {
    getPayRates,
    getPayRate,
    createPayRate,
    updatePayRate,
    deletePayRate,
    getPayRatesCount
} from '../controllers/payRates.js';

export const router = express.Router();

router.get('/pay-rates', getPayRates);
router.get('/pay-rates/:id', getPayRate);
router.post('/pay-rates', createPayRate);
router.put('/pay-rates/:id', updatePayRate);
router.delete('/pay-rates/:id', deletePayRate);
router.get('/pay-rates/count', getPayRatesCount);
