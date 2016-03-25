/**
 * Created by Tiffanys on 3/23/16.
 */

module.exports = function(app, paymentRequestModel) {
    app.post('/api/project/paymentRequest', createPaymentRequest);
    app.get('/api/project/paymentRequest', getPaymentRequests);
    app.get('/api/project/paymentRequest?requestId=:requestId', getPaymentRequestById);
    app.get('/api/project/paymentRequest?payerId=:payerId', getPaymentRequestsByPayerId);
    app.get('/api/project/event/:eventId/expense/:expenseId/paymentRequest', getPaymentRequestsByExpense);
    app.put('/api/project/paymentRequest/:requestId', updatePaymentRequestById);
    app.delete('/api/project/paymentRequest/:requestId', deletePaymentRequestById);

    function createPaymentRequest(req, res){
        console.log("Create payment request");
        var newPayment = paymentRequestModel.createPaymentRequest(req.body);
        res.json(newPayment);
    }

    function getPaymentRequests(req, res){
        if(req.query.requestId){
            getPaymentRequestById(req,res);
        }else if(req.param.payerId) {
            getPaymentRequestsByPayerId(req,res);
        }else{
            getAllPaymentRequests(req, res);
        }
    }

    function getPaymentRequestById(req, res){
        var requestId = req.query.requestId;
        console.log("Get payment request by id:" + requestId);
        var paymentRequest = paymentRequestModel.findPaymentRequestById(requestId);

        res.json(paymentRequest);
    }

    function getPaymentRequestsByExpense(req, res){
        var expenseId = req.param.expenseId;
        console.log("Get payment request by expense id:" + expenseId);
        var paymentRequests = paymentRequestModel.findPaymentRequestByExpenseId(expenseId);

        res.json(paymentRequests);
    }

    function getPaymentRequestsByPayerId(req, res){
        var payerId = req.param.payerId;
        console.log("Get payment request by payer id:" + payerId);
        var paymentRequests = paymentRequestModel.findPaymentRequestByPayerId(payerId);

        res.json(paymentRequests);
    }

    function getAllPaymentRequests(req, res){
        console.log("Get all payment requests");
        var paymentRequests = paymentRequestModel.findAllPaymentRequests();

        res.json(paymentRequests);
    }

    function updatePaymentRequestById(req, res){
        paymentRequestModel.updatePaymentRequestById(req.params.requestId, req.params.paymentRequest);
        var paymentRequests = paymentRequestModel.findAllPaymentRequests();

        res.json(paymentRequests);
    }

    function deletePaymentRequestById(req, res){
        paymentRequestModel.deletePaymentRequestById(req.params.requestId);
        var paymentRequests = paymentRequestModel.findAllPaymentRequests();

        res.json(paymentRequests);
    }
};