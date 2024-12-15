import mongoose from "mongoose";
import NotifySchedule from "../models/notifySchedule.js";

// @desc Get all Notify Schedules
// @route GET /api/v1/notify-schedules
const getNotifySchedules = async (req, res, next) => {
    const notifySchedules = await NotifySchedule.find({}, "-__v -createdAt -updatedAt").populate('employee', 'firstName lastName email').populate('shift', 'startTime endTime date');

    if (!notifySchedules.length) {
        return res.status(404).json({ success: false, msg: 'no notify schedules found' })
    }
    return res.status(200).json({ success: true, data: notifySchedules })

}

// @desc Get Notify Schedule by id
// @route GET /api/v1/notify-schedules/:id
const getNotifySchedule = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Notify Schedule id.." })
    }
    const notifySchedule = await NotifySchedule.findOne({ _id: id }, "-__v")
        .populate('employee', 'firstName lastName email')
        .populate('shift', 'startTime endTime date')

    if (!notifySchedule) {
        return res.status(404).json({ success: false, msg: 'no notify schedule found with this id' })
    }
    return res.status(200).json({ success: true, data: notifySchedule })

}

// @desc Create a new Notify Schedule
// @route POST /api/v1/notify-schedules
const createNotifySchedule = async (req, res, next) => {
    const { employee, shift, notificationTime } = req.body

    if (!mongoose.isValidObjectId(employee) || !mongoose.isValidObjectId(shift)) {
        return res.status(400).json({ success: false, msg: "invalid employee or shift id.." })
    }
    if (!employee || !shift || !notificationTime) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }
    const newNotifySchedule = new NotifySchedule({ employee, shift, notificationTime })
    await newNotifySchedule.save()
    if (!newNotifySchedule) {
        return res.status(500).json({ success: false, msg: 'the Notify Schedule cannot be created!' })
    }
    res.status(200).json({ success: true, data: newNotifySchedule })

}

// @desc update a Notify Schedule by id
// @route PUT /api/v1/notify-schedules/:id
const updateNotifySchedule = async (req, res, next) => {
    const { id } = req.params
    const { employee, shift, notificationTime } = req.body

    if (!mongoose.isValidObjectId(id) || (employee && !mongoose.isValidObjectId(employee)) || (shift && !mongoose.isValidObjectId(shift))) {
        return res.status(400).json({ success: false, msg: "invalid Notify Schedule id.." })
    }

    const notifySchedule = await NotifySchedule.findOneAndUpdate({ _id: id }, { employee, shift, notificationTime }, { new: true })
        .populate('employee', 'firstName lastName email')
        .populate('shift', 'startTime endTime date');

    if (!notifySchedule) {
        return res.status(404).json({ success: false, msg: 'Notify Schedule with this id not found' })
    }
    res.status(200).json({ msg: 'Notify Schedule updated ', data: notifySchedule })
}


// @desc delete a notify schedules by id
// @route DELETE /api/v1/notify-schedules/:id
const deleteNotifySchedule = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }
    const notifySchedule = await NotifySchedule.findOneAndDelete({ _id: id })
    if (!notifySchedule) {
        return res.status(404).json({ success: true, msg: `notify schedule could not found..` })
    }
    res.status(203).json({ success: true, msg: `notify schedule deleted`, notifySchedule })
}


// @desc Get Notify Schedules by employee id
// @route GET /api/v1/notify-schedules/employee/:id
const getNotifySchedulesOfEmployee = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'not a valid employee id' })
    }
    const notifySchedules = await NotifySchedule.find({ employee: id })
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email');
    if (!notifySchedules.length) {
        return res.status(404).json({ success: false, msg: 'no notify schedules found with this employee id' })
    }
    return res.status(200).json({ success: true, data: notifySchedules })
}

// @desc Get Notify Schedules by shift id
// @route GET /api/v1/notify-schedules/shift/:id
const getNotifySchedulesOfShift = async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'not a valid shift id' })
    }
    const notifySchedules = await NotifySchedule.find({ shift: id })
        .populate('shift', 'startTime endTime date')
        .populate('employee', 'firstName lastName email');
    if (!notifySchedules.length) {
        return res.status(404).json({ success: false, msg: 'no notify schedules found with this shift id' })
    }
    return res.status(200).json({ success: true, data: notifySchedules })

}

// @desc Get Notify Schedules count
// @route GET /api/v1/notify-schedules/get/count
const getNotifySchedulesCount = async (req, res, next) => {
    const count = await NotifySchedule.countDocuments();
    res.status(200).json({ success: true, totalNotifySchedules: count })

}

export { getNotifySchedules, getNotifySchedule, createNotifySchedule, updateNotifySchedule, deleteNotifySchedule, getNotifySchedulesCount, getNotifySchedulesOfShift, getNotifySchedulesOfEmployee }