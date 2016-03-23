/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("EventSamplePageController", EventSamplePageController);

    function EventSamplePageController($scope, EventsService, ExpensesService){
        $scope.event = EventsService.findEventsById(1, render);
        var expenses = [];
        for(e in  $scope.event.expenses){
            expenses.push(ExpensesService.findExpenseById( $scope.event.expenses[e], render));
        }

        $scope.expenses = expenses;
    }

    function render(response){
        return response;
    }
})();