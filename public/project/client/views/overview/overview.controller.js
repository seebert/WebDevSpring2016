/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("OverviewController", OverviewController);

    function OverviewController($scope, $location, EventsService, PaymentRequestsService, UserService){
        $scope.createEvent = createEvent;
        $scope.updateEvent = updateEvent;
        $scope.selectedEvent = selectedEvent;
        $scope.go = go;

        var currentUser = UserService.getCurrentUser();
        setScopeEvents();

        PaymentRequestsService
            .findPaymentRequestByUsername(currentUser.username)
            .then(function(response){
                $scope.alerts = response.data;
            });

        function setScopeEvents(){
            EventsService
                .findEventsByAdminId(currentUser._id)
                .then(function(response){
                    var events = response.data;
                    var eventsLive = [];
                    for(var e in events){
                        if(!events[e].completed) {
                            eventsLive.push(events[e]);
                        }
                        $scope.events = eventsLive;
                    }
                });
        }

        function selectedEvent(event){
            $scope.selectedEvent = event;
            $scope.updateEvent.title = event.title;
            $scope.updateEvent.description = event.description;
        }

        function createEvent(newEvent){
            newEvent.adminId = currentUser._id;
            EventsService
                .createEvent(newEvent)
                .then(function(response){
                    $scope.newEvent = null;
                    setScopeEvents()
                });
        }

        function updateEvent(origEvent, updateEvent){
            origEvent.title = updateEvent.title;
            origEvent.description = updateEvent.description;
            console.log(origEvent);
            EventsService
                .updateEvent(origEvent._id, origEvent)
                .then(function(response){
                    $scope.updateEvent = null;
                    setScopeEvents()
                });
        }

        function go( path ) {
            $location.path( path );
        }

    }
})();