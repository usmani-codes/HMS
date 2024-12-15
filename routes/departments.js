import express from 'express'

import { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment, getDepartmentsCount } from '../controllers/departments.js'

export const router = express.Router()

router.get('/', getDepartments)

router.get('/:id', getDepartment)

router.post('/', createDepartment)

router.put('/:id', updateDepartment)

router.delete('/:id', deleteDepartment)

router.get('/get/count', getDepartmentsCount)