/**
 * Created by Tiffanys on 2/18/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    // $routePareams -- has a map of all the parameters declared in the config
    function detailsController($scope, $routeParams, OmdbService){
        // Scope's parameters are what the view can see
        $scope.imdbID = $routeParams.imdbID;

        // This is bad practice:
        //$http.get("http://www.omdbapi.com/?i="+$scope.imdbID)
        //    .success(render);
        OmdbService.findMovieByImdbID($scope.imdbID, render);

        function render(response){
            $scope.movie = response;
        }
    }
})();