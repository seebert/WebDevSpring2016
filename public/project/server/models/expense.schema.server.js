/**
 * Created by Tiffanys on 4/16/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a expense schema
    var ExpenseSchema = mongoose.Schema({
        title : String,
        description: String,
        amountOwed: Number,
        payeeId: Number,
        paymentRequest: [PaymentRequestSchema]
    }, {collection: 'expense'});
    return ExpenseSchema;
};
