import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import PayRate from "../models/payRate.js";
import mongoose from "mongoose";

// @desc Get all pay rates
// @route GET /api/v1/pay-rates
const getPayRates = asyncWrapper(async (req, res, next) => {
    const payRates = await PayRate.find({}, "-__v -createdAt -updatedAt");
    if (!payRates.length) {
        throw new CustomAPIError(404, "No pay rates found.");
    }
    res.status(200).json({ success: true, data: payRates });
});

// @desc Get pay rate by id
// @route GET /api/v1/pay-rates/:id
const getPayRate = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const payRate = await PayRate.findById(id).select("-__v");
    if (!payRate) {
        throw new CustomAPIError(404, "Pay rate not found.");
    }

    res.status(200).json({ success: true, data: payRate });
});

// @desc Create a new pay rate
// @route POST /api/v1/pay-rates
const createPayRate = asyncWrapper(async (req, res, next) => {
    const { employee, payPeriod, rate, overtimeRate } = req.body;

    if (!employee || !payPeriod || !rate || !overtimeRate) {
        throw new CustomAPIError(400, "All fields are required.");
    }

    const payRate = new PayRate({ employee, payPeriod, rate, overtimeRate });
    await payRate.save();
    res.status(201).json({ success: true, data: payRate });
});

// @desc Update a pay rate by id
// @route PUT /api/v1/pay-rates/:id
const updatePayRate = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { employee, payPeriod, rate, overtimeRate } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const payRate = await PayRate.findByIdAndUpdate(id, { employee, payPeriod, rate, overtimeRate }, { new: true });
    if (!payRate) {
        throw new CustomAPIError(404, "Pay rate not found.");
    }

    res.status(200).json({ success: true, data: payRate });
});

// @desc Delete a pay rate by id
// @route DELETE /api/v1/pay-rates/:id
const deletePayRate = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const payRate = await PayRate.findByIdAndDelete(id);
    if (!payRate) {
        throw new CustomAPIError(404, "Pay rate not found.");
    }

    res.status(204).json({ success: true, message: "Pay rate deleted." });
});

// @desc Get total pay rates count
// @route GET /api/v1/pay-rates/count
const getPayRatesCount = asyncWrapper(async (req, res, next) => {
    const count = await PayRate.countDocuments();
    res.status(200).json({ success: true, count });
});


export { getPayRates, getPayRate, createPayRate, updatePayRate, deletePayRate, getPayRatesCount };
