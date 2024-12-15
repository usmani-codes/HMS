import express from 'express'

import { getRoles, getRole, createRole, updateRole, deleteRole, getRolesCount } from '../controllers/roles.js'
export const router = express.Router()

router.get('/', getRoles)

router.get('/:id', getRole)

router.post('/', createRole)

router.put('/:id', updateRole)

router.delete('/:id', deleteRole)

router.get('/get/count', getRolesCount)
