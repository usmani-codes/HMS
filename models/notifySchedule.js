import mongoose, { mongo } from "mongoose";

const notifyScheduleSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
        required: true
    },
    notificationTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

notifyScheduleSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

notifyScheduleSchema.set('toJSON', {
    virtuals: true
})

const NotifySchedule = mongoose.model('NotifySchedule', notifyScheduleSchema)

export default NotifySchedule