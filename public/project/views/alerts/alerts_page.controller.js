/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("AlertsPageController", AlertsPageController);

    function AlertsPageController($scope, AlertsService, UserService){
        var currentUser = UserService.getCurrentUser();
        $scope.alerts = AlertsService.findAlertsByPayeeId(currentUser._id, render);
    }

    function render(response){
        return response;
    }
})();