/**
 * Created by Tiffanys on 4/16/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a paymentRequest schema
    var PaymentRequestSchema = mongoose.Schema({
        expenseId: mongoose.Schema.Types.ObjectId,
        payerUsername : String,
        amountOwed: {type: Number, default : 0},
        paymentRequested : {type: Boolean, default : 0},
        paymentCompleted : {type: Boolean, default : 0}
    }, {collection: 'paymentRequest'});
    return PaymentRequestSchema;
};
