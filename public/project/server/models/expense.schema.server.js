/**
 * Created by Tiffanys on 4/16/16.
 */
module.exports = function (mongoose) {
    var PaymentRequestSchema = require("./paymentRequest.schema.server.js")(mongoose);

    // use mongoose to declare a expense schema
    var ExpenseSchema = mongoose.Schema({
        eventId : String,
        title : String,
        description: String,
        amountOwed: {type: Number, default : 0},
        payeeUsername: String,
        paymentsRequested: {type: Boolean, default : 0},
        paymentRequestId: [mongoose.Schema.Types.ObjectId]
    }, {collection: 'expense'});
    return ExpenseSchema;
};
