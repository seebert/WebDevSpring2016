/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("PaymentPageController", PaymentPageController);

    function PaymentPageController($scope, PaymentRequestsService, UserService){
        var currentUser = UserService.getCurrentUser();
        var paymentRequests = [];
        PaymentRequestsService
            .findPaymentRequestByUsername(currentUser.username)
            .then(function(response){
                paymentRequests =  response.data;
                $scope.paymentRequests = response.data;
            });
    }
})();