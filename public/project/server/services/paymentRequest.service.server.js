/**
 * Created by Tiffanys on 3/23/16.
 */

module.exports = function(app, paymentRequestModel) {
    app.post('/api/project/paymentRequest', createPaymentRequest);
    app.get('/api/project/paymentRequest', getPaymentRequests);
    app.get('/api/project/paymentRequest?requestId=:requestId', getPaymentRequestById);
    app.get('/api/project/paymentRequest?payerId=:payerId', getPaymentRequestsByPayerId);
    app.get('/api/project/event/:eventId/expense/:expenseId/paymentRequest', getPaymentRequestsByExpense);
    app.delete('/api/project/paymentRequest?requestId=:requestId', deletePaymentRequestById);


};