/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope){
        console.log($location);
        $scope.$location = $location;
    }
})();