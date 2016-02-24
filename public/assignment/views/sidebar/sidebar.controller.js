/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormAppBuilder")
        .controller("SidebarController", SidebarController);

    function SidebarController(){
        $scope.$location = $location;
    }
})();