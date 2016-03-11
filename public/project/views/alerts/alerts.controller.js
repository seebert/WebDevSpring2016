/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("AlertsController", AlertsController);

    function AlertsController($scope, AlertsService){
        $scope.alerts = AlertsService.findAllAlerts(render);

        $scope.addAlert = addAlert;
        $scope.updateAlert = updateAlert;
        $scope.deleteAlert = deleteAlert;
        $scope.selectAlert = selectAlert;

        function addAlert(){
            var newAlert =
            {   eventId: $scope.alert.eventId,
                expenseId: $scope.alert.expenseId,
                payeeId : $scope.alert.payeeId,
                payerId: $scope.alert.payerId
            };

            newAlert = AlertsService.createAlert(newAlert, render);

            if(!newAlert){
                $scope.error = "Alert was not created";
            }

            $scope.alert = AlertsService.findAllAlerts(render);
        }

        function updateAlert(){
            var newAlert = {
                _id: $scope.alert._id,
                eventId: $scope.alert.eventId,
                expenseId: $scope.alert.expenseId,
                payeeId: $scope.alert.payeeId,
                payerId: $scope.alert.payerId
            };

            var updatedAlert = AlertsService.updateAlert($scope.alert._id, newAlert, render)

            if(!updatedAlert){
                $scope.error = "Alert was not updated";
            }else{
                $scope.message = "Alert was successfully updated";
            }
        }

        function deleteAlert($index){
            var alert = $scope.alerts[$index];
            AlertsService.deleteAlertById(alert._id, render);

            $scope.alerts = AlertsService.findAllAlerts(render);
        }

        function selectAlert($index){
            var selectAlert = $scope.alerts[$index];
            var localAlert = {
                eventId: selectAlert.eventId,
                expenseId: selectAlert.expenseId,
                payeeId: selectAlert.payeeId,
                payerId: selectAlert.payerId,
                _id : selectAlert._id
            };
            $scope.alert = localAlert;
        }

        function render(response){
            return response;
        }
    }
})();