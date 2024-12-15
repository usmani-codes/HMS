import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import BenefitTime from "../models/benifitTime.js";
import mongoose from "mongoose";

// @desc Get all benefit times
// @route GET /api/v1/benefit-times
const getBenefitTimes = asyncWrapper(async (req, res, next) => {
    const benefitTimes = await BenefitTime.find({}, "-__v -createdAt -updatedAt");
    if (!benefitTimes.length) {
        throw new CustomAPIError(404, "No benefit times found.");
    }
    res.status(200).json({ success: true, data: benefitTimes });
});

// @desc Get benefit time by id
// @route GET /api/v1/benefit-times/:id
const getBenefitTime = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const benefitTime = await BenefitTime.findById(id).select("-__v");
    if (!benefitTime) {
        throw new CustomAPIError(404, "Benefit time not found.");
    }

    res.status(200).json({ success: true, data: benefitTime });
});

// @desc Create a new benefit time
// @route POST /api/v1/benefit-times
const createBenefitTime = asyncWrapper(async (req, res, next) => {
    const { employee, benefitType, hoursAvailable, hoursUsed } = req.body;

    if (!employee || !benefitType || !hoursAvailable || !hoursUsed) {
        throw new CustomAPIError(400, "All fields are required.");
    }

    const benefitTime = new BenefitTime({ employee, benefitType, hoursAvailable, hoursUsed });
    await benefitTime.save();
    res.status(201).json({ success: true, data: benefitTime });
});

// @desc Update a benefit time by id
// @route PUT /api/v1/benefit-times/:id
const updateBenefitTime = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { employee, benefitType, hoursAvailable, hoursUsed } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const benefitTime = await BenefitTime.findByIdAndUpdate(id, { employee, benefitType, hoursAvailable, hoursUsed }, { new: true });
    if (!benefitTime) {
        throw new CustomAPIError(404, "Benefit time not found.");
    }

    res.status(200).json({ success: true, data: benefitTime });
});

// @desc Delete a benefit time by id
// @route DELETE /api/v1/benefit-times/:id
const deleteBenefitTime = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const benefitTime = await BenefitTime.findByIdAndDelete(id);
    if (!benefitTime) {
        throw new CustomAPIError(404, "Benefit time not found.");
    }

    res.status(204).json({ success: true, message: "Benefit time deleted." });
});


// @desc Get total benefit times count
// @route GET /api/v1/benefit-times/count
const getBenefitTimesCount = asyncWrapper(async (req, res, next) => {
    const count = await BenefitTime.countDocuments();
    res.status(200).json({ success: true, count });
});

export { getBenefitTimes, getBenefitTime, createBenefitTime, updateBenefitTime, deleteBenefitTime, getBenefitTimesCount };
