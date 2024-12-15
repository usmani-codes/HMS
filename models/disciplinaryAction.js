import { Schema, model } from "mongoose";

// Disciplinary_Actions model
const disciplinaryActionSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    actionDate: {
        type: Date,
        required: true
    },
    actionType: {
        type: String,
        required: true
    },
    actionReason: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

disciplinaryActionSchema.virtual('id').get(function () {
    return this._id.toString(); // Ensure it's a string
});

disciplinaryActionSchema.set('toJSON', {
    virtuals: true
});

const DisciplinaryAction = model('DisciplinaryAction', disciplinaryActionSchema);

export default DisciplinaryAction;
