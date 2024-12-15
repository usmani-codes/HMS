import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: "38228374"
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },



}, {
    timestamps: true
})

employeeSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

employeeSchema.set('toJSON', {
    virtuals: true
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee