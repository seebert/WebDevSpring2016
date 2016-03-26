/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("EventsController", EventsController)
        .controller("EventListController", EventListController)
        .controller("EventDetailsController", EventDetailsController);

    function EventListController($scope, $location, EventsService, UserService){
        $scope.createEvent = createEvent;
        $scope.go = go;
        var currentUser = UserService.getCurrentUser();
        setScopeEvents();

        function setScopeEvents(){
            EventsService
                .findEventsByAdminId(currentUser._id)
                .then(function(response){
                    $scope.events = response.data;
                });
        }

        function createEvent(newEvent){
            console.log("creating" + newEvent);
            newEvent.adminId = currentUser._id;
            EventsService
                .createEvent(newEvent)
                .then(function(response){
                    console.log("createEvent() > " + JSON.stringify(response.data));
                    $scope.newEvent = null;
                    setScopeEvents()
                });
        }

        function go( path ) {
            console.log( path);
            $location.path( path );
        }

    }

    function EventDetailsController($scope, $routeParams, EventsService, ExpensesService){
        $scope.createExpense = createExpense;
        var eventId = $routeParams.eventId;
        setScopeExpenses();

        function createExpense(newExpense){
            ExpensesService
                .createExpense(eventId, newExpense)
                .then(function(response){
                    console.log("createExpense() > " + JSON.stringify(response.data));
                    $scope.newExpense = null;
                    setScopeExpenses()
                });
        }

        function setScopeExpenses(){
            EventsService
                .findEventsById(eventId)
                .then(function(response){
                    $scope.event = response.data;
                    $scope.expenses = getExpensesById($scope.event.expenses);
                });
        }


        function getExpensesById(expensesId){
            var expenses = [];
            for(e in  expensesId){
                ExpensesService
                    .findExpenseById(expensesId[e])
                    .then(function(response){
                        expenses.push(response.data);
                    });
            }

            return expenses;
        }
    }

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