import mongoose, { mongo } from "mongoose";

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },


}, {
    timestamps: true
})

departmentSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

departmentSchema.set('toJSON', {
    virtuals: true
})

const Department = mongoose.model('Department', departmentSchema)

export default Department