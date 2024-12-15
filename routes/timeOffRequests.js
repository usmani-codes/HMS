import express from 'express'

import { getTimeOffRequests, getTimeOffRequest, createTimeOffRequest, updateTimeOffRequest, deleteTimeOffRequest, getTimeOffRequestsCount } from '../controllers/timeOffRequests.js'
export const router = express.Router()

router.get('/', getTimeOffRequests)

router.get('/:id', getTimeOffRequest)

router.post('/', createTimeOffRequest)

router.put('/:id', updateTimeOffRequest)

router.delete('/:id', deleteTimeOffRequest)

router.get('/get/count', getTimeOffRequestsCount)
