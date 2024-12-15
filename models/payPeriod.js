import { Schema, model } from "mongoose";

// PayPeriods model
const payPeriodSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        required: true
    }
}, {
    timestamps: true
});

payPeriodSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

payPeriodSchema.set('toJSON', {
    virtuals: true
});

const PayPeriod = model('PayPeriod', payPeriodSchema);

export default PayPeriod;
