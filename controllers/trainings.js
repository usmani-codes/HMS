import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Training from "../models/training.js";
import mongoose from "mongoose";

// @desc Get all training records
// @route GET /api/v1/trainings
const getTrainings = asyncWrapper(async (req, res, next) => {
    const trainings = await Training.find({}, "-__v -createdAt -updatedAt");
    if (!trainings.length) {
        throw new CustomAPIError(404, "No training records found.");
    }
    res.status(200).json({ success: true, data: trainings });
});

// @desc Get training record by id
// @route GET /api/v1/trainings/:id
const getTraining = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const training = await Training.findById(id).select("-__v");
    if (!training) {
        throw new CustomAPIError(404, "Training record not found.");
    }

    res.status(200).json({ success: true, data: training });
});

// @desc Create a new training record
// @route POST /api/v1/trainings
const createTraining = asyncWrapper(async (req, res, next) => {
    const { employee, trainingName, trainingDate, trainingHours } = req.body;

    if (!employee || !trainingName || !trainingDate || !trainingHours) {
        throw new CustomAPIError(400, "All fields are required.");
    }

    const training = new Training({ employee, trainingName, trainingDate, trainingHours });
    await training.save();
    res.status(201).json({ success: true, data: training });
});

// @desc Update a training record by id
// @route PUT /api/v1/trainings/:id
const updateTraining = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { employee, trainingName, trainingDate, trainingHours } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const training = await Training.findByIdAndUpdate(id, { employee, trainingName, trainingDate, trainingHours }, { new: true });
    if (!training) {
        throw new CustomAPIError(404, "Training record not found.");
    }

    res.status(200).json({ success: true, data: training });
});

// @desc Delete a training record by id
// @route DELETE /api/v1/trainings/:id
const deleteTraining = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const training = await Training.findByIdAndDelete(id);
    if (!training) {
        throw new CustomAPIError(404, "Training record not found.");
    }

    res.status(204).json({ success: true, message: "Training record deleted." });
});

// @desc Get total training records count
// @route GET /api/v1/trainings/count
const getTrainingsCount = asyncWrapper(async (req, res, next) => {
    const count = await Training.countDocuments();
    res.status(200).json({ success: true, count });
});


export { getTrainings, getTraining, createTraining, updateTraining, deleteTraining, getTrainingsCount };
