import express from 'express'

import { getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment, getAssignmentsCount } from '../controllers/assignments.js'
export const router = express.Router()

router.get('/', getAssignments)

router.get('/:id', getAssignment)

router.post('/', createAssignment)

router.put('/:id', updateAssignment)

router.delete('/:id', deleteAssignment)

router.get('/get/count', getAssignmentsCount)
