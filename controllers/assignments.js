import mongoose from "mongoose";
import Assignment from "../models/assignment.js";


// @desc Get all Assignments
// @route GET /api/v1/assignments
const getAssignments = async (req, res, next) => {
    const assignments = await Assignment.find({}, "-__v -createdAt -updatedAt")
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email');
    if (!assignments.length) {
        return res.status(404).json({ success: false, msg: 'no assignments found' })
    }
    res.status(200).json({ success: true, data: assignments })

}

// @desc Get Assignment by id
// @route GET /api/v1/assignments/:id
const getAssignment = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Assignment id.." })
    }
    const assignment = await Assignment.findOne({ _id: id }, "-__v")
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email');
    if (!assignment) {
        throw Error()
    }
    return res.status(200).json({ success: true, data: assignment })
}

// @desc Create a new Assignment
// @route POST /api/v1/assignments
const createAssignment = async (req, res, next) => {
    const { shift, employee, status } = req.body
    if (!mongoose.isValidObjectId(shift) || !mongoose.isValidObjectId(employee)) {
        return res.status(400).json({ success: false, msg: "invalid shift or employee id.." })
    }
    if (!shift || !employee || !status) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }
    const newAssignment = new Assignment({ shift, employee, status })
    await newAssignment.save()
    if (!newAssignment) {
        return res.status(404).json({ success: false, msg: 'the Assignment cannot be created!' })
    }
    res.status(201).json({ success: true, data: newAssignment })
}

// @desc update an Assignment by id
// @route PUT /api/v1/assignments/:id
const updateAssignment = async (req, res, next) => {
    const { id } = req.params
    const { shift, employee, status } = req.body
    if (!mongoose.isValidObjectId(id) || (shift && !mongoose.isValidObjectId(shift)) || (employee && !mongoose.isValidObjectId(employee))) {
        return res.status(400).json({ success: false, msg: "invalid Assignment id.." })
    }
    const assignment = await Assignment.findOneAndUpdate({ _id: id }, { shift, employee, status }, { new: true })
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email');
    if (!assignment) {
        return res.status(404).json({ success: false, msg: 'Assignment with this id not found' })
    }
    res.status(201).json({ msg: 'Assignment updated ', data: assignment })

}

// @desc delete an Assignment by id
// @route DELETE /api/v1/assignments/:id
const deleteAssignment = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }
    const assignment = await Assignment.findOneAndDelete({ _id: id })
    if (!assignment) {
        return res.status(404).json({ success: true, msg: `Assignment type could not deleted ..` })
    }
    res.status(203).json({ success: true, msg: `Assignment deleted`, assignment })

}

// @desc get Assignments count
// @route GET /api/v1/Assignments/get/count
const getAssignmentsCount = async (req, res, next) => {
    const assignments = await Assignment.countDocuments()
    res.status(200).json({ success: true, totalAssignments: assignments })
}

export { getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment, getAssignmentsCount }