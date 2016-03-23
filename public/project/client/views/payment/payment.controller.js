/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("PaymentRequestsController", PaymentRequestsController);

    function PaymentRequestsController($scope, PaymentRequestsService){
        $scope.paymentRequests = PaymentRequestsService.findAllPaymentRequests(render);

        $scope.addPaymentRequest = addPaymentRequest;
        $scope.updatePaymentRequest = updatePaymentRequest;
        $scope.deletePaymentRequest = deletePaymentRequest;
        $scope.selectPaymentRequest = selectPaymentRequest;

        function addPaymentRequest(){
            var newPaymentRequest =
            {   amountOwed : $scope.paymentRequest.amountOwed,
                payerId: $scope.paymentRequest.payerId
            };

            newPaymentRequest = PaymentRequestsService.createPaymentRequest(newPaymentRequest, render);

            if(!newPaymentRequest){
                $scope.error = "PaymentRequest was not created";
            }

            $scope.paymentRequest = PaymentRequestsService.findAllPaymentRequests(render);
        }

        function updatePaymentRequest(){
            var newPaymentRequest = {
                _id: $scope.paymentRequest._id,
                amountOwed: $scope.paymentRequest.amountOwed,
                payerId: $scope.paymentRequest.payerId
            };

            var updatedPaymentRequest = PaymentRequestsService.updatePaymentRequest($scope.paymentRequest._id, newPaymentRequest, render)

            if(!updatedPaymentRequest){
                $scope.error = "PaymentRequest was not updated";
            }else{
                $scope.message = "PaymentRequest was successfully updated";
            }
        }

        function deletePaymentRequest($index){
            var paymentRequest = $scope.paymentRequests[$index];
            PaymentRequestsService.deletePaymentRequestById(paymentRequest._id, render);

            $scope.paymentRequests = PaymentRequestsService.findAllPaymentRequests(render);
        }

        function selectPaymentRequest($index){
            var selectPaymentRequest = $scope.paymentRequests[$index];
            var localPaymentRequest = {
                amountOwed: selectPaymentRequest.amountOwed,
                payerId: selectPaymentRequest.payerId,
                _id : selectPaymentRequest._id
            };
            $scope.paymentRequest = localPaymentRequest;
        }

        function render(response){
            return response;
        }
    }
})();