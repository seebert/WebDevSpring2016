/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factory("PaymentRequestsService", PaymentRequestsService);

    function PaymentRequestsService(){
        var paymentRequests = [];
        paymentRequests = [
            { "_id" : 1, "payerId" : 123, "amountOwed" : 40},
            { "_id" : 2, "payerId" : 234, "amountOwed" : 12},
            { "_id" : 3, "payerId" : 567, "amountOwed" : 75}
        ];

        var model = {
            paymentRequests: paymentRequests,
            createPaymentRequest: createPaymentRequest,
            findAllPaymentRequests: findAllPaymentRequests,
            findPaymentRequestById: findPaymentRequestById,
            findPaymentRequestByPayerId: findPaymentRequestByPayerId,
            updatePaymentRequest: updatePaymentRequest,
            deletePaymentRequestById : deletePaymentRequestById
        };

        return model;

        function createPaymentRequest(paymentRequest, callback) {
            var paymentRequest = {
                payerId: paymentRequest.payerId,
                amountOwed: paymentRequest.amountOwed,
                _id : (new Date).getTime()
            };
            model.paymentRequests.push(paymentRequest);
            return callback(paymentRequest);
        }

        function findAllPaymentRequests(callback){
            return callback(model.paymentRequests);
        }

        function findPaymentRequestById(id, callback){
            for (var e in model.paymentRequests) {
                if (model.paymentRequests[e]._id == id) {
                    return callback(model.paymentRequests[e]);
                }
            }
        }

        function findPaymentRequestByPayerId(id, callback){
            var payments = [];
            for (var a in model.paymentRequests) {
                if (model.paymentRequests[a].payerId == id) {
                    payments.push(model.paymentRequests[a]);
                }
            }

            return callback(payments);
        }

        function updatePaymentRequest(paymentRequestId, paymentRequest, callback) {
            for (var e in model.paymentRequests) {
                if (model.paymentRequests[e]._id === paymentRequestId) {
                    model.paymentRequests[e].payerId = paymentRequest.payerId;
                    model.paymentRequests[e].amountOwed = paymentRequest.amountOwed;
                    return callback(model.paymentRequests[e]);
                }
            }
            return callback(null);
        }

        function deletePaymentRequestById(paymentRequestId, callback) {
            for (var e in model.paymentRequests) {
                if (model.paymentRequests[e]._id === paymentRequestId) {
                    model.paymentRequests.splice(e, 1);
                }
            }
            return callback(model.paymentRequests);
        }

    }
})();
