import mongoose from "mongoose";
import TimeOffRequest from "../models/timeOffRequest.js";


// @desc Get all Time Off Requests
// @route GET /api/v1/time-off-requests
const getTimeOffRequests = async (req, res, next) => {
    const timeOffRequests = await TimeOffRequest.find({}, "-__v -createdAt -updatedAt").populate('employee', 'firstName lastName email');

    if (!timeOffRequests.length) {
        return res.status(404).json({ success: false, msg: 'no time off requests found' })
    }

    return res.status(200).json({ success: true, data: timeOffRequests })
}

// @desc Get Time Off Request by id
// @route GET /api/v1/time-off-requests/:id
const getTimeOffRequest = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Time Off Request id.." })
    }
    const timeOffRequest = await TimeOffRequest.findOne({ _id: id }, "-__v").populate('employee', 'firstName lastName email')
    if (!timeOffRequest) {
        return res.status(404).json({ success: false, msg: 'no time off request found with this id' })
    }
    return res.status(200).json({ success: true, data: timeOffRequest })
}

// @desc Create a new Time Off Request
// @route POST /api/v1/time-off-requests
const createTimeOffRequest = async (req, res, next) => {
    const { employee, startDate, endDate, reason, status } = req.body
    if (!mongoose.isValidObjectId(employee)) {
        return res.status(400).json({ success: false, msg: "invalid employee id.." })
    }
    if (!employee || !startDate || !endDate || !reason) {
        return res.status(404).json({ success: false, msg: 'please fill all required fields ..' })
    }
    const newTimeOffRequest = new TimeOffRequest({ employee, startDate, endDate, reason, status })
    await newTimeOffRequest.save()
    if (!newTimeOffRequest) {
        res.status(404).json({ success: false, msg: 'the Time Off Request cannot be created!' })
    }
    res.status(201).json({ success: true, data: newTimeOffRequest })
}

// @desc update a Time Off Request by id
// @route PUT /api/v1/time-off-requests/:id
const updateTimeOffRequest = async (req, res, next) => {
    const { id } = req.params
    const { employee, startDate, endDate, reason, status } = req.body
    if (!mongoose.isValidObjectId(id) || (employee && !mongoose.isValidObjectId(employee))) {
        return res.status(400).json({ success: false, msg: "invalid Time Off Request id.." })
    }
    const timeOffRequest = await TimeOffRequest.findOneAndUpdate({ _id: id }, { employee, startDate, endDate, reason, status }, { new: true }).populate('employee', 'firstName lastName email');
    if (!timeOffRequest) {
        return res.status(404).json({ success: false, msg: 'Time Off Request not found' })
    }
    res.status(201).json({ msg: 'Time Off Request updated ', data: timeOffRequest })
}

// @desc delete a Time Off Request by id
// @route DELETE /api/v1/time-off-requests/:id
const deleteTimeOffRequest = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }
    const timeOffRequest = await TimeOffRequest.findOneAndDelete({ _id: id })
    if (!timeOffRequest) {
        return res.status(404).json({ success: true, msg: `Time Off Request not found ..` })
    }
    res.status(203).json({ success: true, msg: `Time Off Request deleted`, timeOffRequest })
}

// @desc get time Off Request count
// @route GET /api/v1/time-off-requests/get/count
const getTimeOffRequestsCount = async (req, res, next) => {
    const timeOffRequest = await TimeOffRequest.countDocuments()
    res.status(200).json({ success: true, totalTimeOffRequest: timeOffRequest })
}

export { getTimeOffRequests, getTimeOffRequest, createTimeOffRequest, updateTimeOffRequest, deleteTimeOffRequest, getTimeOffRequestsCount }