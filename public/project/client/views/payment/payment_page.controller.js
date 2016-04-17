/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("PaymentPageController", PaymentPageController);

    function PaymentPageController($scope, PaymentRequestsService, UserService){
        var currentUser = UserService.getCurrentUser();

        PaymentRequestsService
            .findPaymentRequestByUsername(currentUser.username)
            .then(function(response){
                $scope.paymentRequests = response.data;
            });
    }
})();