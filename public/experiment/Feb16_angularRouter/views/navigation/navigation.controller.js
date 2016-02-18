/**
 * Created by Tiffanys on 2/18/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("NavController", navController)

    // This location will be used to highlight the appropriate tab
    function navController($location, $scope){
        $scope.$location = $location;
    }
})();