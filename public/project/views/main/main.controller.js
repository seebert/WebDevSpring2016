/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("MainController", MainController);

    function MainController($location, $scope){
        $scope.$location = $location;
    }
})();