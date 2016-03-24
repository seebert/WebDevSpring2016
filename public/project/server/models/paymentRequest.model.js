/**
 * Created by Tiffanys on 3/23/16.
 */
var mock = require("./paymentRequest.mock.json");
module.exports = function(app, db) {
    var api = {
        createPaymentRequest: createPaymentRequest,
        findAllPaymentRequests: findAllPaymentRequests,
        findPaymentRequestById: findPaymentRequestById,
        findPaymentRequestByPayerId: findPaymentRequestByPayerId,
        updatePaymentRequest: updatePaymentRequest,
        deletePaymentRequestById : deletePaymentRequestById
    };

    return api;

    function createPaymentRequest(paymentRequest) {
        var paymentRequest = {
            payerId: paymentRequest.payerId,
            amountOwed: paymentRequest.amountOwed,
            _id : (new Date).getTime()
        };
        mock.push(paymentRequest);
        return paymentRequest;
    }

    function findAllPaymentRequests(){
        return mock;
    }

    function findPaymentRequestById(id){
        for (var e in mock) {
            if (mock[e]._id == id) {
                return mock[e];
            }
        }
    }

    function findPaymentRequestByPayerId(id){
        var payments = [];
        for (var a in mock) {
            if (mock[a].payerId == id) {
                payments.push(mock[a]);
            }
        }

        return payments;
    }

    function updatePaymentRequest(paymentRequestId, paymentRequest) {
        for (var e in mock) {
            if (mock[e]._id === paymentRequestId) {
                mock[e].payerId = paymentRequest.payerId;
                mock[e].amountOwed = paymentRequest.amountOwed;
                return mock[e];
            }
        }
        return null;
    }

    function deletePaymentRequestById(paymentRequestId) {
        for (var e in mock) {
            if (mock[e]._id === paymentRequestId) {
                mock.splice(e, 1);
            }
        }
        return mock;
    }
};