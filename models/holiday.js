import mongoose from "mongoose";

const holidaySchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

}, {
    timestamps: true
})

holidaySchema.virtual('id').get(function () {
    return this._id.toHexString()
})

holidaySchema.set('toJSON', {
    virtuals: true
})


const Holiday = mongoose.model('Holiday', holidaySchema)

export default Holiday