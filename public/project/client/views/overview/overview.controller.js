/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("OverviewController", OverviewController);

    function OverviewController($scope, EventsService, AlertsService, UserService){
        var currentUser = UserService.getCurrentUser();
        EventsService
            .findEventsByAdminId(currentUser._id)
            .then(function(response){
                $scope.events = response.data;
            });

        AlertsService
            .findAlertsByPayeeId(currentUser._id)
            .then(function(response){
                $scope.alerts = response.data;
            });
    }
})();