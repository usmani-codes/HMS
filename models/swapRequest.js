import mongoose, { mongo } from "mongoose";

const swapRequestSchema = mongoose.Schema({
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
    swapEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'denied', 'approved'],
        default: 'pending'
    }
}, {
    timestamps: true
})

swapRequestSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

swapRequestSchema.set('toJSON', {
    virtuals: true
})

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema)

export default SwapRequest