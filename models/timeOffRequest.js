import mongoose, { mongo } from "mongoose";

const timeOffRequestSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true

    },
    reason: {
        type: String,
        required: true

    },
    status: {
        type: String,
        enum: ['pending', 'denied', 'approved'],
        default: 'pending'
    },

}, {
    timestamps: true
})

timeOffRequestSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

timeOffRequestSchema.set('toJSON', {
    virtuals: true
})

const TimeOffRequest = mongoose.model('TimeOffRequest', timeOffRequestSchema)

export default TimeOffRequest