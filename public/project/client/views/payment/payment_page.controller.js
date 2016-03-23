/**
 * Created by Tiffanys on 3/11/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("PaymentPageController", PaymentPageController);

    function PaymentPageController($scope, PaymentRequestsService, UserService){
        var currentUser = UserService.getCurrentUser();
        $scope.paymentRequests = PaymentRequestsService.findPaymentRequestByPayerId(currentUser._id, render);
    }

    function render(response){
        return response;
    }
})();