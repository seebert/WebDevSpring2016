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
            .findPaymentRequestByPayerId(currentUser._id)
            .then(function(response){
                $scope.paymentRequests = response.data;
            });
    }
})();