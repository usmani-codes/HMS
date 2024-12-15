import express from 'express'

import { getShifts, getShift, createShift, updateShift, deleteShift, getShiftsCount } from '../controllers/shifts.js'

export const router = express.Router()

router.get('/', getShifts)

router.get('/:id', getShift)

router.post('/', createShift)

router.put('/:id', updateShift)

router.delete('/:id', deleteShift)

router.get('/get/count', getShiftsCount)
