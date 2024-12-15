import mongoose from "mongoose";

const shiftSchema = mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

shiftSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

shiftSchema.set('toJSON', {
    virtuals: true
})


const Shift = mongoose.model('Shift', shiftSchema)

export default Shift