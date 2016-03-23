/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("EventPageController", EventPageController);

    function EventPageController($scope, EventsService, UserService){
        var currentUser = UserService.getCurrentUser();
        $scope.events = EventsService.findEventsByAdminId(currentUser._id, render);
    }

    function render(response){
        return response;
    }
})();