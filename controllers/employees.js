import mongoose from 'mongoose'
import Employee from '../models/employee.js'

// 

// @desc Get all employee
// @route GET /api/v1/employees
const getEmployees = async (req, res, next) => {
    const employees = await Employee.find({}, "-__v -createdAt -updatedAt").populate('hospital department role', 'name')

    if (!employees.length) {
        return res.status(404).json({ success: false, msg: 'no employees found' })
    }

    return res.status(200).json({ success: true, data: employees })
}

// @desc Get employee by id
// @route GET /api/v1/employees/:id
const getEmployee = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid employee id.." })
    }

    const employee = await Employee.findOne({ _id: id }, "-__v").populate('hospital department role', 'name')

    if (!employee) {
        return res.status(404).json({ success: false, msg: 'no employee found with this id' })
    }

    return res.status(200).json({ success: true, data: employee })
}

// @desc Create a new employee
// @route POST /api/v1/employees
const createEmployee = async (req, res, next) => {
    const { email, phone, password, firstName, lastName, hospital, department, role } = req.body

    if (!mongoose.isValidObjectId(hospital) || !mongoose.isValidObjectId(department) || !mongoose.isValidObjectId(role)) {
        return res.status(400).json({ success: false, msg: "invalid like id.." })
    }

    if (!email || !password || !firstName || !hospital, !department, !role) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const employee = await Employee.findOne({ email })

    if (employee) {
        return res.status(409).json({ success: false, msg: 'Employee existed in db ..' })
    }

    const newEmployee = new Employee({ email, phone, password, firstName, lastName, hospital, department, role })
    await newEmployee.save()

    if (!newEmployee) {
        res.status(404).json({ success: false, msg: 'the employee cannot be created!' })
    }

    res.status(201).json({ success: true, msg: "employee created ..", data: newEmployee })
}


// @desc update a employee by id
// @route PUT /api/v1/employees/:id
const updateEmployee = async (req, res, next) => {
    const { id } = req.params
    const { email, phone, password, firstName, lastName, hospital, department, role } = req.body

    if ((hospital && !mongoose.isValidObjectId(hospital)) || (department && !mongoose.isValidObjectId(department)) || (role && !mongoose.isValidObjectId(role))) {
        return res.status(400).json({ success: false, msg: "invalid like id.." })
    }

    const employee = await Employee.findOneAndUpdate({ _id: id }, { email, phone, password, firstName, lastName, hospital, department, role }, { new: true }).populate('hospital department role', 'name')

    if (!employee) {
        return res.status(404).json({ success: false, msg: 'employee with this id not found' })
    }

    res.status(200).json({ msg: 'employee updated ', data: employee })
}

// @desc delete a Hospital by id
// @route DELETE /api/v1/employees/:id
const deleteEmployee = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }

    const employee = await Employee.findOneAndDelete({ _id: id })

    if (!employee) {
        return res.status(404).json({ success: true, msg: `employee could not found ..` })
    }

    res.status(203).json({ success: true, msg: `employee deleted`, employee })
}

//get all doctors && count

//get all Nurses && count

//get all patients && count

//get all receptionist && count


// @desc get employee total count
// @route GET /api/v1/employees/get/count
const getEmployeesCount = async (req, res, next) => {
    const employees = await Employee.countDocuments()
    res.status(200).json({ success: true, totalemployee: employees })
}

export { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeesCount }