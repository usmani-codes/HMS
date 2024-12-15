import Joi from "joi";
import mongoose from "mongoose";
import CustomAPIError from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

import Holiday from "../models/holiday.js";


const holidaySchema = Joi.object({
    date: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().optional(),
});





// @desc Get all holidays
// @route GET /api/v1/holidays
const getHolidays = asyncWrapper(async (req, res, next) => {
    // const holidays = await Holiday.find({}, "-__v -createdAt -updatedAt")
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const holidays = await Holiday.find({}, "-__v -createdAt -updatedAt").limit(limit).skip((page - 1) * limit);

    if (!holidays.length) {
        throw new CustomAPIError(404, "holidays not found ..")
    }

    res.status(200).json({ success: true, data: holidays })

})

// @desc Get holiday by id
// @route GET /api/v1/holidays/:id
const getHoliday = asyncWrapper(async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid db Id ..")
    }

    const holiday = await Holiday.findOne({ _id: id }, "-__v")

    if (!holiday) {
        throw new CustomAPIError(404, 'holiday with this id not found ..')
    }

    res.status(200).json({ success: true, data: holiday })
})

// @desc Create a new holiday
// @route POST /api/v1/holidays
const createHoliday = asyncWrapper(async (req, res, next) => {
    const { date, name, description } = req.body
    // if (!date || !name || !description) {
    //     throw new CustomAPIError(400, 'please fill all required fields ..')
    // }

    const { error } = holidaySchema.validate(req.body);
    if (error) throw new CustomAPIError(400, error.details[0].message);
    const holiday = await Holiday.findOne({ name }, 'name date')

    if (holiday && (holiday.date === date && holiday.name === name)) {
        throw new CustomAPIError(409, 'holiday already exists!!')
    }

    const newHoliday = new Holiday({ date, name, description })
    await newHoliday.save()

    if (!newHoliday) {
        throw new CustomAPIError(500, "something went worng ..")
    }

    res.status(201).json({ success: true, data: newHoliday })

})

// @desc update a holiday by id
// @route PUT /api/v1/holidays/:id
const updateHoliday = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    const { date, name, description } = req.body

    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid db Id ..")
    }
    const holiday = await Holiday.findOneAndUpdate({ _id: id }, { date, name, description }, { new: true })

    if (!holiday) {
        throw new CustomAPIError(404, "holiday not found ..")
    }

    res.status(200).json({ success: true, message: "Holiday updated", data: holiday });
})

// @desc delete a holiday by id
// @route DELETE /api/v1/holidays/:id
const deleteHoliday = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        throw new CustomAPIError(400, "Invalid db Id ..")
    }
    const holiday = await Holiday.findOneAndDelete({ _id: id })

    if (!holiday) {
        throw new CustomAPIError(404, "holiday not found ..")
    }

    res.status(200).json({ success: true, message: "Holiday deleted", data: holiday });
})

// @desc get holydays count
// @route GET /api/v1/holydays/get/count
const getHolidaysCount = async (req, res, next) => {
    const holidays = await Holiday.countDocuments()
    res.status(200).json({ success: true, totalHolidays: holidays })
}


export { getHolidays, getHoliday, createHoliday, updateHoliday, deleteHoliday, getHolidaysCount }