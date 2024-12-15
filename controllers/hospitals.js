import mongoose from 'mongoose'
import Hospital from '../models/hospital.js'

// @desc Get all hospitals
// @route GET /api/v1/hospitals
const getHospitals = async (req, res, next) => {
    const hospitals = await Hospital.find({})

    if (!hospitals.length) {
        return res.status(404).json({ success: false, msg: 'no hospitals found' })
    }

    return res.status(200).json({ success: true, data: hospitals })
}

// @desc Get Hospital by id
// @route GET /api/v1/hospitals/:id
const getHospital = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid hospital id.." })
    }

    const hospital = await Hospital.findOne({ _id: id })

    if (!hospital) {
        return res.status(404).json({ success: false, msg: 'no hospital found with this id' })
    }

    return res.status(200).json({ success: true, data: hospital })
}

// @desc Create a new Hospital
// @route POST /api/v1/hospitals
const createHospital = async (req, res, next) => {
    const { name, address, city, state, phone, email, zip } = req.body

    //required fields (input validation)
    if (!name || !phone || !email || !address || !zip) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const hospital = await Hospital.findOne({ name })

    //hospital name must be unique in the city
    if (hospital && name === hospital.name && city === hospital.city) {
        return res.status(409).json({ success: false, msg: 'hospital with same name in a city cannot be created !' })
    }

    const newHospital = new Hospital({ name, address, city, state, phone, email, zip })
    await newHospital.save()

    if (!newHospital) {
        res.status(500).json({ success: false, msg: 'the Hospital cannot be created!' })
    }

    res.status(200).json({ success: true, data: newHospital })
}


// @desc update a Hospital by id
// @route PUT /api/v1/hospitals/:id
const updateHospital = async (req, res, next) => {
    const { id } = req.params
    const { name, address, city, state, phone, email, zip } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid hospital id.." })
    }

    const hospital = await Hospital.findOneAndUpdate({ _id: id }, { name, address, city, state, phone, email, zip }, { new: true })

    if (!hospital) {
        return res.status(404).json({ success: false, msg: 'hospital with this id not found' })
    }

    res.status(200).json({ msg: 'hospital updated ', data: hospital })
}

// @desc delete a Hospital by id
// @route DELETE /api/v1/hospitals/:id
const deleteHospital = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }

    const hospital = await Hospital.findOneAndDelete({ _id: id })

    if (!hospital) {
        return res.status(404).json({ success: true, msg: `hospital could not found ..` })
    }

    res.status(200).json({ success: true, msg: `hospital deleted`, hospital })
}

// @desc get hospitals total count
// @route GET /api/v1/hospitals/get/count
const getHospitalsCount = async (req, res, next) => {
    const hospitals = await Hospital.countDocuments()
    res.status(200).json({ success: true, totalhospitals: hospitals })
}

export { getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getHospitalsCount }