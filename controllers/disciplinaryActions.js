import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import DisciplinaryAction from "../models/disciplinaryAction.js";
import mongoose from "mongoose";

// @desc Get all disciplinary actions
// @route GET /api/v1/disciplinary-actions
const getDisciplinaryActions = asyncWrapper(async (req, res, next) => {
    const actions = await DisciplinaryAction.find({}, "-__v -createdAt -updatedAt");
    if (!actions.length) {
        throw new CustomAPIError(404, "No disciplinary actions found.");
    }
    res.status(200).json({ success: true, data: actions });
});

// @desc Get disciplinary action by id
// @route GET /api/v1/disciplinary-actions/:id
const getDisciplinaryAction = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const action = await DisciplinaryAction.findById(id).select("-__v");
    if (!action) {
        throw new CustomAPIError(404, "Disciplinary action not found.");
    }

    res.status(200).json({ success: true, data: action });
});

// @desc Create a new disciplinary action
// @route POST /api/v1/disciplinary-actions
const createDisciplinaryAction = asyncWrapper(async (req, res, next) => {
    const { employee, actionDate, actionType, actionReason } = req.body;

    if (!employee || !actionDate || !actionType || !actionReason) {
        throw new CustomAPIError(400, "All fields are required.");
    }

    const action = new DisciplinaryAction({ employee, actionDate, actionType, actionReason });
    await action.save();
    res.status(201).json({ success: true, data: action });
});

// @desc Update a disciplinary action by id
// @route PUT /api/v1/disciplinary-actions/:id
const updateDisciplinaryAction = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { employee, actionDate, actionType, actionReason } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const action = await DisciplinaryAction.findByIdAndUpdate(id, { employee, actionDate, actionType, actionReason }, { new: true });
    if (!action) {
        throw new CustomAPIError(404, "Disciplinary action not found.");
    }

    res.status(200).json({ success: true, data: action });
});

// @desc Delete a disciplinary action by id
// @route DELETE /api/v1/disciplinary-actions/:id
const deleteDisciplinaryAction = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid ID.");
    }

    const action = await DisciplinaryAction.findByIdAndDelete(id);
    if (!action) {
        throw new CustomAPIError(404, "Disciplinary action not found.");
    }

    res.status(204).json({ success: true, message: "Disciplinary action deleted." });
});

// @desc Get total disciplinary actions count
// @route GET /api/v1/disciplinary-actions/count
const getDisciplinaryActionsCount = asyncWrapper(async (req, res, next) => {
    const count = await DisciplinaryAction.countDocuments();
    res.status(200).json({ success: true, count });
});


export { getDisciplinaryActions, getDisciplinaryAction, createDisciplinaryAction, updateDisciplinaryAction, deleteDisciplinaryAction, getDisciplinaryActionsCount }