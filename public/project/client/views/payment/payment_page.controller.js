/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("PaymentPageController", PaymentPageController);

    function PaymentPageController($scope, PaymentRequestsService, UserService){
        $scope.completePayments = completePayments;
        var currentUser = UserService.getCurrentUser();
        var paymentRequests = [];

        PaymentRequestsService
            .findPaymentRequestByUsername(currentUser.username)
            .then(function(response){
                paymentRequests =  response.data;
                $scope.paymentRequests = response.data;
            });

        function completePayments(payment){
            payment.paymentCompleted = true;
            PaymentRequestsService
                    .updatePaymentRequest(payment._id, payment)
                    .then(function(){
                       // $scope.selectedRequest.message = "Payment requests sent!";
                    });
        }
    }
})();