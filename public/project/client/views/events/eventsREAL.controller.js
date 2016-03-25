/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("EventListController", EventListController)
        .controller("EventDetailsController", EventDetailsController);

    function EventListController($scope, EventsService, UserService){
        var currentUser = UserService.getCurrentUser();

        EventsService
            .findEventsByAdminId(currentUser._id)
            .then(function(response){
                $scope.events = response.data;
            });
    }

    function EventDetailsController($scope, $routeParams, EventsService, ExpensesService){
        var eventId = $routeParams.eventId;
        console.log(eventId);
        EventsService
            .findEventsById(eventId)
            .then(function(response){
                $scope.event = response.data;

                console.log($scope.event);
                $scope.expenses = getExpensesById($scope.event.expenses);

            });

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

})();