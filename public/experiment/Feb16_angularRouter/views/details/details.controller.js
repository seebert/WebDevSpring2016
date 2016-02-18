/**
 * Created by Tiffanys on 2/18/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    // $routePareams -- has a map of all the parameters declared in the config
    function detailsController($scope, $routeParams, $http){
        // Scope's parameters are what the view can see
        $scope.imdbID = $routeParams.imdbID;

        $http.get("http://www.omdbapi.com/?i="+$scope.imdbID)
            .success(render);

        function render(response){
            $scope.movie = response;
        }
    }
})();