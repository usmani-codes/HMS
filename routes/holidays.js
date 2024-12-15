import express from 'express'

import { getHolidays, getHoliday, createHoliday, updateHoliday, deleteHoliday, getHolidaysCount } from '../controllers/holidays.js'
export const router = express.Router()

router.get('/', getHolidays)

router.get('/:id', getHoliday)

router.post('/', createHoliday)

router.put('/:id', updateHoliday)

router.delete('/:id', deleteHoliday)

router.get('/get/count', getHolidaysCount)
