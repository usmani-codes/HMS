import express from 'express'

import { getSwapRequests, getSwapRequest, createSwapRequest, updateSwapRequest, deleteSwapRequest, getSwapRequestsCount, getSwapRequestsOfEmployee, getSwapRequestsByStatus } from '../controllers/swapRequests.js'

export const router = express.Router()

router.get('/', getSwapRequests)
router.get('/:id', getSwapRequest)
router.post('/', createSwapRequest)
router.put('/:id', updateSwapRequest)
router.delete('/:id', deleteSwapRequest)
router.get('/get/count', getSwapRequestsCount)
router.get('/employee/:id', getSwapRequestsOfEmployee)
router.get('/status/:status', getSwapRequestsByStatus)



