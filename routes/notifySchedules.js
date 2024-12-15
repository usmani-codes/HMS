import express from 'express'

import { getNotifySchedules, getNotifySchedule, createNotifySchedule, updateNotifySchedule, deleteNotifySchedule, getNotifySchedulesCount, getNotifySchedulesOfShift, getNotifySchedulesOfEmployee } from '../controllers/notifySchedules.js'

export const router = express.Router()

router.get('/', getNotifySchedules)
router.get('/:id', getNotifySchedule)
router.post('/', createNotifySchedule)
router.put('/:id', updateNotifySchedule)
router.delete('/:id', deleteNotifySchedule)
router.get('/get/count', getNotifySchedulesCount)

// @route GET /api/v1/notify-schedules/shift/:id
router.get('/shift/:id', getNotifySchedulesOfShift)
// @route GET /api/v1/notify-schedules/employee/:id
router.get('/employee/:id', getNotifySchedulesOfEmployee)
