import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Overtime from "../models/overtime.js";
import mongoose from "mongoose";

// @desc Get all overtime records
// @route GET /api/v1/overtimes
const getOvertimes = asyncWrapper(async (req, res, next) => {
    const overtimes = await Overtime.find({}, "-__v -createdAt -updatedAt");
    if (!overtimes.length) {
        throw new CustomAPIError(404, "No overtime records found.");
    }
    res.status(200).json({ success: true, data: overtimes });
});

// @desc Get overtime record by id
// @route GET /api/v1/overtimes/:id
const getOvertime = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const overtime = await Overtime.findById(id).select("-__v");
    if (!overtime) {
        throw new CustomAPIError(404, "Overtime record not found.");
    }

    res.status(200).json({ success: true, data: overtime });
});

// @desc Create a new overtime record
// @route POST /api/v1/overtimes
const createOvertime = asyncWrapper(async (req, res, next) => {
    const { employee, shift, hoursWorked, overtimeHours } = req.body;

    if (!employee || !shift || !hoursWorked || !overtimeHours) {
        throw new CustomAPIError(400, "All fields are required.");
    }

    const overtime = new Overtime({ employee, shift, hoursWorked, overtimeHours });
    await overtime.save();
    res.status(201).json({ success: true, data: overtime });
});

// @desc Update an overtime record by id
// @route PUT /api/v1/overtimes/:id
const updateOvertime = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { employee, shift, hoursWorked, overtimeHours } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const overtime = await Overtime.findByIdAndUpdate(id, { employee, shift, hoursWorked, overtimeHours }, { new: true });
    if (!overtime) {
        throw new CustomAPIError(404, "Overtime record not found.");
    }

    res.status(200).json({ success: true, data: overtime });
});

// @desc Delete an overtime record by id
// @route DELETE /api/v1/overtimes/:id
const deleteOvertime = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const overtime = await Overtime.findByIdAndDelete(id);
    if (!overtime) {
        throw new CustomAPIError(404, "Overtime record not found.");
    }

    res.status(204).json({ success: true, message: "Overtime record deleted." });
});

// @desc Get total overtime records count
// @route GET /api/v1/overtimes/count
const getOvertimesCount = asyncWrapper(async (req, res, next) => {
    const count = await Overtime.countDocuments();
    res.status(200).json({ success: true, count });
});


export { getOvertimes, getOvertime, createOvertime, updateOvertime, deleteOvertime, getOvertimesCount }
