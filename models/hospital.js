import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,

    },
    state: {
        type: String,
    },
    zip: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

hospitalSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

hospitalSchema.set('toJSON', {
    virtuals: true
})

const Hospital = mongoose.model('Hospital', hospitalSchema)

export default Hospital