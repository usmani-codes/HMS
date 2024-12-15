import mongoose from 'mongoose'
import Role from '../models/role.js'

// @desc Get all roles
// @route GET /api/v1/roles
const getRoles = async (req, res, next) => {
    const roles = await Role.find({}, "-__v -createdAt -updatedAt")

    if (!roles.length) {
        return res.status(404).json({ success: false, msg: 'no roles found' })
    }

    return res.status(200).json({ success: true, data: roles })
}

// @desc Get role by id
// @route GET /api/v1/roles/:id
const getRole = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid role id.." })
    }

    const role = await Role.findOne({ _id: id }, "-__v")

    if (!role) {
        return res.status(404).json({ success: false, msg: 'no role found with this id' })
    }

    return res.status(200).json({ success: true, data: role })
}

// @desc Create a new role
// @route POST /api/v1/roles
const createRole = async (req, res, next) => {
    const { name, description } = req.body

    if (!name) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const role = new Role({ name, description })
    await role.save()

    if (!role) {
        res.status(500).json({ success: false, msg: 'the role cannot be created!' })
    }

    res.status(201).json({ success: true, data: role })
}


// @desc update a role by id
// @route PUT /api/v1/roles/:id
const updateRole = async (req, res, next) => {
    const { id } = req.params
    const { name, description } = req.body

    const role = await Role.findOneAndUpdate({ _id: id }, { name, description }, { new: true })

    if (!role) {
        return res.status(404).json({ success: false, msg: 'role with this id not found' })
    }

    res.status(200).json({ msg: 'role updated ', data: role })
}

// @desc delete a Hospital by id
// @route DELETE /api/v1/roles/:id
const deleteRole = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }

    const role = await Role.findOneAndDelete({ _id: id })

    if (!role) {
        return res.status(404).json({ success: true, msg: `role type could not found ..` })
    }

    res.status(203).json({ success: true, msg: `role deleted`, role })
}

// @desc get role total count
// @route GET /api/v1/roles/get/count
const getRolesCount = async (req, res, next) => {
    const roles = await Role.countDocuments()
    res.status(200).json({ success: true, totalRoles: roles })
}

export { getRoles, getRole, createRole, updateRole, deleteRole, getRolesCount }