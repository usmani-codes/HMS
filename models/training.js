import { Schema, model } from "mongoose";

// Training model
const trainingSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    trainingName: {
        type: String,
        required: true
    },
    trainingDate: {
        type: Date,
        required: true
    },
    trainingHours: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

trainingSchema.virtual('id').get(function () {
    return this._id.toString(); // Ensure it's a string
});

trainingSchema.set('toJSON', {
    virtuals: true
});

const Training = model('Training', trainingSchema);

export default Training;
