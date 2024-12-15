import mongoose from 'mongoose'
import Department from '../models/department.js'

// @desc Get all department
// @route GET /api/v1/departments
const getDepartments = async (req, res, next) => {
    const departments = await Department.find({}, "-__v").populate('hospital', "name city")

    if (!departments.length) {
        return res.status(404).json({ success: false, msg: 'no departments found' })
    }

    return res.status(200).json({ success: true, data: departments })
}

// @desc Get department by id
// @route GET /api/v1/departments/:id
const getDepartment = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid department id.." })
    }

    const department = await Department.findOne({ _id: id }, "-__v").populate('hospital', "name city")

    if (!department) {
        return res.status(404).json({ success: false, msg: 'no department found with this id' })
    }

    return res.status(200).json({ success: true, data: department })
}

// @desc Create a new department
// @route POST /api/v1/departments
const createDepartment = async (req, res, next) => {
    const { name, description, hospital } = req.body

    if (!mongoose.isValidObjectId(hospital)) {
        return res.status(401).json({ success: false, msg: 'not a vlid db id ..' })
    }

    if (!name || !description) {
        return res.status(404).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const department = await Department.findOne({ name }, "name")

    if (department) {
        return res.status(409).json({ success: false, msg: 'department already exists !!' })
    }

    const newDepartment = new Department({ name, description, hospital })
    await newDepartment.save()

    if (!newDepartment) {
        res.status(404).json({ success: false, msg: 'the department cannot be created!' })
    }

    res.status(201).json({ success: true, data: newDepartment })
}


// @desc update a department by id
// @route PUT /api/v1/departments/:id
const updateDepartment = async (req, res, next) => {
    const { id } = req.params
    const { name, description, hospital } = req.body

    if (!mongoose.isValidObjectId(id) || (hospital && !mongoose.isValidObjectId(hospital))) {
        return res.status(400).json({ success: false, msg: "invalid department id.." })
    }

    const department = await Department.findOneAndUpdate({ _id: id }, { name, description, hospital }, { new: true })

    if (!department) {
        return res.status(404).json({ success: false, msg: 'department with this id not found' })
    }

    res.status(201).json({ msg: 'department updated ', data: department })
}

// @desc delete a Hospital by id
// @route DELETE /api/v1/departments/:id
const deleteDepartment = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const department = await Department.findOneAndDelete({ _id: id })

    if (!department) {
        return res.status(404).json({ success: true, msg: `department could not found ..` })
    }

    res.status(203).json({ success: true, msg: `department deleted`, department })
}

// @desc get department total count
// @route GET /api/v1/departments/get/count
const getDepartmentsCount = async (req, res, next) => {
    const departments = await Department.countDocuments()
    res.status(200).json({ success: true, totaldepartment: departments })
}

export { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment, getDepartmentsCount }