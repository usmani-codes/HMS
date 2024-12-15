import express from 'express';
import {
    getPayPeriods,
    getPayPeriod,
    createPayPeriod,
    updatePayPeriod,
    deletePayPeriod,
    getPayPeriodsCount
} from '../controllers/payPeriods.js';

export const router = express.Router();

router.get('/pay-periods', getPayPeriods);
router.get('/pay-periods/:id', getPayPeriod);
router.post('/pay-periods', createPayPeriod);
router.put('/pay-periods/:id', updatePayPeriod);
router.delete('/pay-periods/:id', deletePayPeriod);
router.get('/pay-periods/count', getPayPeriodsCount);
