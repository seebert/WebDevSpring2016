/**
 * Created by Tiffanys on 3/23/16.
 */
module.exports = function(mongoose, expenseModel) {
    var PaymentRequestSchema = require("./paymentRequest.schema.server.js")(mongoose);
    var PaymentRequest = mongoose.model("PaymentRequest", PaymentRequestSchema);

    var Expense = expenseModel.getMongooseModel();
    var api = {
        createPaymentRequest: createPaymentRequest,
        findAllPaymentRequests: findAllPaymentRequests,
        findPaymentRequestById: findPaymentRequestById,
        findPaymentRequestByUsername: findPaymentRequestByUsername,
        findPaymentRequestByExpenseId : findPaymentRequestByExpenseId,
        updatePaymentRequest: updatePaymentRequest,
        deletePaymentRequestById : deletePaymentRequestById
    };

    return api;

    function createPaymentRequest(paymentRequest) {
        return PaymentRequest.create(paymentRequest);
    }

    function findAllPaymentRequests(){
        return PaymentRequest.find();
    }

    function findPaymentRequestById(id){
        return PaymentRequest.findById(id);
    }

    function findPaymentRequestByUsername(username){
        return PaymentRequest.find({payerUsername : username});
    }

    function findPaymentRequestByExpenseId(expenseId){
        return Expense.findById(expenseId)
            .then(function(expense){
                var paymentRequest = [];
                for(var id in expense.paymentRequestId){
                    paymentRequest.push(findPaymentRequestById(id));
                }
                return paymentRequest;
            });
    }

    function updatePaymentRequest(paymentRequestId, paymentRequest) {
        return Expense
            .findOneAndUpdate (
                {_id: paymentRequestId},
                {$set: paymentRequest});
    }

    function deletePaymentRequestById(paymentRequestId) {
        return Expense.remove({_id: paymentRequestId});
    }
};