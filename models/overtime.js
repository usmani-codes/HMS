import { Schema, model } from "mongoose";

// Overtime model
const overtimeSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    shift: {
        type: Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    },
    hoursWorked: {
        type: Number,
        required: true
    },
    overtimeHours: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

overtimeSchema.virtual('id').get(function () {
    return this._id.toString(); // Ensure it's a string
});

overtimeSchema.set('toJSON', {
    virtuals: true
});

const Overtime = model('Overtime', overtimeSchema);

export default Overtime;
