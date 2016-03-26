/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("OverviewController", OverviewController);

    function OverviewController($scope, EventsService, AlertsService, UserService){
        $scope.createEvent = createEvent;
        var currentUser = UserService.getCurrentUser();
        setScopeEvents();

        AlertsService
            .findAlertsByPayeeId(currentUser._id)
            .then(function(response){
                $scope.alerts = response.data;
            });


        function setScopeEvents(){
            EventsService
                .findEventsByAdminId(currentUser._id)
                .then(function(response){
                    $scope.events = response.data;
                });
        }

        function createEvent(newEvent){
            newEvent.adminId = currentUser._id;
            EventsService
                .createEvent(newEvent)
                .then(function(response){
                    console.log("createEvent() > " + JSON.stringify(response.data));
                    $scope.newEvent = null;
                    setScopeEvents()
                });
        }
    }
})();