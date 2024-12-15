import { Schema,model } from "mongoose";

// PayRates model
const payRateSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    payPeriod: {
        type: Schema.Types.ObjectId,
        ref: 'PayPeriod',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    overtimeRate: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

payRateSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

payRateSchema.set('toJSON', {
    virtuals: true
});

const PayRate = model('PayRate', payRateSchema);

export default PayRate;    