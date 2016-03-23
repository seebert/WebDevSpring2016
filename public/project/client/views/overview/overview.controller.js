/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("OverviewController", OverviewController);

    function OverviewController($scope, EventsService, AlertsService, UserService){
        var currentUser = UserService.getCurrentUser();
        $scope.events = EventsService.findEventsByAdminId(currentUser._id, render);
        $scope.alerts = AlertsService.findAlertsByPayeeId(currentUser._id, render);
    }

    function render(response){
        return response;
    }
})();