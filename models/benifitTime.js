import { Schema, model } from "mongoose";

// Benefit_Time model
const benefitTimeSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    benefitType: {
        type: String,
        required: true
    },
    hoursAvailable: {
        type: Number,
        required: true
    },
    hoursUsed: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

benefitTimeSchema.virtual('id').get(function () {
    return this._id.toString(); // Ensure it's a string
});

benefitTimeSchema.set('toJSON', {
    virtuals: true
});

const BenefitTime = model('BenefitTime', benefitTimeSchema);

export default BenefitTime;
