/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factory("PaymentRequestsService", PaymentRequestsService);

    function PaymentRequestsService($http){
        var api = {
            createPaymentRequest: createPaymentRequest,
            findAllPaymentRequests: findAllPaymentRequests,
            findPaymentRequestById: findPaymentRequestById,
            findPaymentRequestByPayerId: findPaymentRequestByPayerId,
            findPaymentRequestsByExpenseId : findPaymentRequestsByExpenseId,
            findPaymentRequestByUsername: findPaymentRequestByUsername,
            updatePaymentRequest: updatePaymentRequest,
            deletePaymentRequestById : deletePaymentRequestById
        };

        return api;

        function createPaymentRequest(paymentRequest) {
            return $http.post('/api/project/paymentRequest', paymentRequest);
        }

        function findAllPaymentRequests(){
            return $http.get('/api/project/paymentRequest');
        }

        function findPaymentRequestById(id){
            return $http.get('/api/project/paymentRequest?requestId='+id);
        }

        function findPaymentRequestByPayerId(id){
            return $http.get('/api/project/paymentRequest?payerId='+id);
        }

        function findPaymentRequestByUsername(username){
            return $http.get('/api/project/paymentRequest?payerUsername='+username);
        }

        function findPaymentRequestsByExpenseId(eventId, expenseId){
            return $http.get('/api/project/event/'+eventId+'/expense/'+expenseId+'/paymentRequest');
        }

        function updatePaymentRequest(paymentRequestId, paymentRequest){
            console.log(paymentRequest);
            return $http.put('/api/project/paymentRequest/'+paymentRequestId, paymentRequest);
        }

        function deletePaymentRequestById(paymentRequestId) {
            return $http.delete('/api/project/paymentRequest/'+paymentRequestId);
        }

    }
})();
