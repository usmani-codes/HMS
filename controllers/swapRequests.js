import mongoose from "mongoose";
import SwapRequest from "../models/swapRequest.js";


// @desc Get all Swap Requests
// @route GET /api/v1/swap-requests
const getSwapRequests = async (req, res, next) => {
    const swapRequests = await SwapRequest.find({}, "-__v -createdAt -updatedAt")
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email')
        .populate('swapEmployee', 'firstName lastName email');

    if (!swapRequests.length) {
        return res.status(404).json({ success: false, msg: 'no swap requests found' })
    }
    return res.status(200).json({ success: true, data: swapRequests })
}

// @desc Get Swap Request by id
// @route GET /api/v1/swap-requests/:id
const getSwapRequest = async (req, res, next) => {

    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Swap Request id.." })
    }
    const swapRequest = await SwapRequest.findOne({ _id: id }, "-__v")
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email')
        .populate('swapEmployee', 'firstName lastName email');
    if (!swapRequest) {
        return res.status(404).json({ success: false, msg: 'no swap request found with this id' })
    }
    return res.status(200).json({ success: true, data: swapRequest })

}


// @desc Create a new Swap Request
// @route POST /api/v1/swap-requests
const createSwapRequest = async (req, res, next) => {
    const { shift, employee, swapEmployee, status } = req.body
    if (!mongoose.isValidObjectId(shift) || !mongoose.isValidObjectId(employee) || !mongoose.isValidObjectId(swapEmployee)) {
        return res.status(400).json({ success: false, msg: "invalid shift or employee id.." })
    }

    if (!shift || !employee || !swapEmployee || !status) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const requestByUser = await SwapRequest.findOne({ employee })

    if (requestByUser && (String(requestByUser.swapEmployee) === swapEmployee && String(requestByUser.shift) === shift)) {
        return res.status(409).json({ success: false, msg: 'Please wait your Swap Request is in Progress ..!' })
    }
    const newSwapRequest = new SwapRequest({ shift, employee, swapEmployee, status })
    await newSwapRequest.save()
    if (!newSwapRequest) {
        return res.status(404).json({ success: false, msg: 'the Swap Request cannot be created!' })
    }
    res.status(201).json({ success: true, data: newSwapRequest })

}

// @desc update a Swap Request by id
// @route PUT /api/v1/swap-requests/:id
const updateSwapRequest = async (req, res, next) => {

    const { id } = req.params
    const { shift, employee, swapEmployee, status } = req.body
    if (!mongoose.isValidObjectId(id) || (shift && !mongoose.isValidObjectId(shift)) || (employee && !mongoose.isValidObjectId(employee)) || (swapEmployee && !mongoose.isValidObjectId(swapEmployee))) {
        return res.status(400).json({ success: false, msg: "invalid Swap Request id.." })
    }
    const swapRequest = await SwapRequest.findOneAndUpdate({ _id: id }, { shift, employee, swapEmployee, status }, { new: true })
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email')
        .populate('swapEmployee', 'firstName lastName email');
    if (!swapRequest) {
        return res.status(404).json({ success: false, msg: 'Swap Request with this id not found' })
    }
    res.status(200).json({ msg: 'Swap Request updated ', data: swapRequest })

}

// @desc delete a Swap Request by id
// @route DELETE /api/v1/swap-requests/:id
const deleteSwapRequest = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }
    const swapRequest = await SwapRequest.findOneAndDelete({ _id: id })
    if (!swapRequest) {
        return res.status(404).json({ success: true, msg: `Swap Request with this id not found ..` })
    }
    res.status(203).json({ success: true, msg: `Swap Request deleted`, swapRequest })

}

// @desc Get Swap Requests by employee id
// @route GET /api/v1/swap-requests/employee/:id
const getSwapRequestsOfEmployee = async (req, res, next) => {

    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'not a valid employee id' })
    }
    const swapRequests = await SwapRequest.find({ employee: id })
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email')
        .populate('swapEmployee', 'firstName lastName email');

    if (!swapRequests.length) {
        return res.status(404).json({ success: false, msg: 'no swap requests found with this employee id' })
    }
    return res.status(200).json({ success: true, data: swapRequests })

}
// @desc Get Swap Requests by status 
// @route GET /api/v1/swap-requests/status/:status
const getSwapRequestsByStatus = async (req, res, next) => {
    const { status } = req.params
    if (!(['pending', 'denied', 'approved'].includes(status))) {
        return res.status(404).json({ success: false, msg: 'You can only find requests with pending, approved and denied status' })
    }
    const swapRequests = await SwapRequest.find({ status })
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email')
        .populate('swapEmployee', 'firstName lastName email');

    if (!swapRequests.length) {
        return res.status(404).json({ success: false, msg: 'no swap requests found with this employee id' })
    }
    return res.status(200).json({ success: true, data: swapRequests })

}

// @desc Get Swap Requests count
// @route GET /api/v1/swap-requests/get/count
const getSwapRequestsCount = async (req, res, next) => {
    const count = await SwapRequest.countDocuments();
    res.status(200).json({ success: true, totalSwapRequests: count })
}


export { getSwapRequests, getSwapRequest, createSwapRequest, updateSwapRequest, deleteSwapRequest, getSwapRequestsCount, getSwapRequestsOfEmployee, getSwapRequestsByStatus }