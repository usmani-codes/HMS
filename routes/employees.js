import express from 'express'

import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeesCount } from '../controllers/employees.js'

export const router = express.Router()

router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/', createEmployee)

router.put('/:id', updateEmployee)

router.delete('/:id', deleteEmployee)

router.get('/get/count', getEmployeesCount)