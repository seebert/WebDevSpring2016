/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("EventsController", EventsController);

    function EventsController($scope, EventsService){
        $scope.events = EventsService.findAllEvents(render);

        $scope.addEvent = addEvent;
        $scope.updateEvent = updateEvent;
        $scope.deleteEvent = deleteEvent;
        $scope.selectEvent = selectEvent;

        function addEvent(){
            var newEvent =
                {   title: $scope.event.title,
                    description: $scope.event.description,
                    adminId: $scope.event.adminId,
                    expenses: parseExpenses($scope.event.expenses)
                };

            newEvent = EventsService.createEvent(newEvent, render)

            if(!newEvent){
                $scope.error = "Event was not created";
            }

            $scope.event = EventsService.findAllEvents(render);
        }

        function updateEvent(){
            var newEvent = {
                _id: $scope.event._id,
                title: $scope.event.title,
                description: $scope.event.description,
                adminId: $scope.event.adminId,
                expenses: parseExpenses($scope.event.expenses)
            };

            var updatedEvent = EventsService.updateEvent($scope.event._id, newEvent, render)

            if(!updatedEvent){
                $scope.error = "Event was not updated";
            }else{
                $scope.message = "Event was successfully updated";
            }
        }

        function deleteEvent($index){
            var event = $scope.events[$index];
            EventsService.deleteEventById(event._id, render);

            $scope.events = EventsService.findAllEvents(render);
        }

        function selectEvent($index){
            var selectEvent = $scope.events[$index];
            var localEvent = {
                title: selectEvent.title,
                description: selectEvent.description,
                adminId: selectEvent.adminId,
                expenses: selectEvent.expenses,
                _id : selectEvent._id
            };
            $scope.event = localEvent;
        }

        function render(response){
            return response;
        }

        function parseExpenses(eArray){
            var expenses = eArray.split(",");
            for(e in expenses){
                expenses[e] = +expenses[e];
            }

            return expenses;
        }
    }
})();