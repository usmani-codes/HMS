import mongoose from 'mongoose'
import Shift from '../models/shift.js'

// @desc Get all shifts
// @route GET /api/v1/shifts
const getShifts = async (req, res, next) => {
    const shifts = await Shift.find({}, "-__v -createdAt -updatedAt").populate("hospital department", "name")

    if (!shifts.length) {
        return res.status(404).json({ success: false, msg: 'no shifts found' })
    }

    return res.status(200).json({ success: true, shifts })
}

// @desc Get shift by id
// @route GET /api/v1/shifts/:id
const getShift = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'not a valid shift id' })
    }

    const shift = await Shift.findOne({ _id: id }, "-__v -createdAt -updatedAt").populate("hospital department", "name")

    if (!shift) {
        return res.status(404).json({ success: false, msg: 'no shift found with this id' })
    }

    return res.status(200).json({ success: true, shift })
}

// @desc create a shift
// @route shift /api/v1/shifts
const createShift = async (req, res, next) => {
    const { hospital, department, startTime, endTime, date, status } = req.body

    if (!mongoose.isValidObjectId(hospital) || !mongoose.isValidObjectId(department)) {
        return res.status(400).json({ success: false, msg: 'not a valid db id..' })
    }

    if (!hospital || !department || !startTime || !endTime || !date || !status) {
        return res.status(400).json({ success: false, msg: 'please provide all required feilds ..' })
    }

    const shift = new Shift({ hospital, department, startTime, endTime, date, status })
    await shift.save()

    if (!shift) {
        return res.status(500).json({ success: false, msg: "something went wrong .." })
    }

    res.status(201).json({ success: true, msg: 'shift created successfully ', data: shift })
}

// @desc update a shift by id
// @route PUT /api/v1/shifts/:id
const updateShift = async (req, res, next) => {
    const { id } = req.params
    const { hospital, department, startTime, endTime, date, status } = req.body

    if (!mongoose.isValidObjectId(id) || (hospital && !mongoose.isValidObjectId(hospital)) || (department && !mongoose.isValidObjectId(department))) {
        return res.status(400).json({ success: false, msg: 'not a valid db id..' })
    }

    const shift = await Shift.findOneAndUpdate({ _id: id }, { hospital, department, startTime, endTime, date, status }, { new: true }).populate("hospital department", "name")

    if (!shift) {
        return res.status(404).json({ success: false, msg: 'shift with this id not found' })
    }

    res.status(200).json({ msg: 'shift updated ', shift })
}

// @desc delete a shift by id
// @route DELETE /api/v1/shifts/:id
const deleteShift = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid shift Id.." })
    }

    const shift = await Shift.findOneAndDelete({ _id: id })

    if (!shift) {
        return res.status(404).json({ success: false, msg: `shift not found ..` })
    }

    res.status(203).json({ success: true, msg: `shift deleted..`, shift })
}

//@desc get shift by hospital
// @route GET /api/v1/shifts/department/:id
const getShiftsOfDepartment = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'not a valid hospital id' })
    }

    const shifts = await Shift.find({ department: id }).populate('hospital', 'name')

    if (!shifts.length) {
        return res.status(404).json({ success: false, msg: 'no shifts found with this id' })
    }

    return res.status(200).json({ success: true, data: shifts })
}

//@desc get a hospital's shift count
// @route GET /api/v1/shifts/department/:id/get/count
const getShiftsCountOfDepartment = async (req, res, next) => {
    const { id } = req.params
    const shifts = await Shift.countDocuments({ department: id })
    res.status(200).json({ success: true, totalShifts: shifts })
}

// @desc get shifts total count
// @route GET /api/v1/shifts/get/count
const getShiftsCount = async (req, res, next) => {
    const shifts = await Shift.countDocuments()
    res.status(200).json({ success: true, totalshifts: shifts })
}

export { getShifts, getShift, createShift, updateShift, deleteShift, getShiftsCount, getShiftsOfDepartment, getShiftsCountOfDepartment }