import mongoose, { mongo } from "mongoose";

const assignmentSchema = mongoose.Schema({
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'declined', 'accepted'],
        default: 'pending'
    },


}, {
    timestamps: true
})

assignmentSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

assignmentSchema.set('toJSON', {
    virtuals: true
})

const Assignment = mongoose.model('Assignment', assignmentSchema)

export default Assignment