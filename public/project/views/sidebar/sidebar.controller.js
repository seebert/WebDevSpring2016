/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope){
        $scope.$location = $location;
    }
})();