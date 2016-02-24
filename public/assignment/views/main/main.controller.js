/**
 * Created by Tiffanys on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $scope){
        $scope.$location = $location;
    }
})();