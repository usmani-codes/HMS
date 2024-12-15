
import mongoose from "mongoose";
import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import PayPeriod from "../models/payPeriod.js";

// @desc Get all pay periods
// @route GET /api/v1/pay-periods
const getPayPeriods = asyncWrapper(async (req, res, next) => {
    const payPeriods = await PayPeriod.find({}, "-__v -createdAt -updatedAt");

    if (!payPeriods.length) {
        throw new CustomAPIError(404, "No pay periods found.");
    }

    res.status(200).json({ success: true, data: payPeriods });
});

// @desc Get pay period by id
// @route GET /api/v1/pay-periods/:id
const getPayPeriod = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const payPeriod = await PayPeriod.findById(id).select("-__v");

    if (!payPeriod) {
        throw new CustomAPIError(404, "Pay period not found.");
    }

    res.status(200).json({ success: true, data: payPeriod });
});

// @desc Create a new pay period
// @route POST /api/v1/pay-periods
const createPayPeriod = asyncWrapper(async (req, res, next) => {
    const { startDate, endDate, status } = req.body;

    if (!startDate || !endDate || !status) {
        throw new CustomAPIError(400, "All fields are required.");
    }

    const payPeriod = new PayPeriod({ startDate, endDate, status });
    await payPeriod.save();

    res.status(201).json({ success: true, data: payPeriod });
});

// @desc Update a pay period by id
// @route PUT /api/v1/pay-periods/:id
const updatePayPeriod = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate, status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const payPeriod = await PayPeriod.findByIdAndUpdate(id, { startDate, endDate, status }, { new: true });

    if (!payPeriod) {
        throw new CustomAPIError(404, "Pay period not found.");
    }

    res.status(200).json({ success: true, data: payPeriod });
});

// @desc Delete a pay period by id
// @route DELETE /api/v1/pay-periods/:id
const deletePayPeriod = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const payPeriod = await PayPeriod.findByIdAndDelete(id);

    if (!payPeriod) {
        throw new CustomAPIError(404, "Pay period not found.");
    }

    res.status(204).json({ success: true, message: "Pay period deleted." });
});

// @desc Get total pay periods count
// @route GET /api/v1/pay-periods/count
const getPayPeriodsCount = asyncWrapper(async (req, res, next) => {
    const count = await PayPeriod.countDocuments();
    res.status(200).json({ success: true, count });
});

export { getPayPeriods, getPayPeriod, createPayPeriod, updatePayPeriod, deletePayPeriod, getPayPeriodsCount };
