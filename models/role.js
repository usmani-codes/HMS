import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
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

roleSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

roleSchema.set('toJSON', {
    virtuals: true
})


const Role = mongoose.model('Role', roleSchema)

export default Role