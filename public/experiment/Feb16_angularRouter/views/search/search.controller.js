/**
 * Created by Tiffanys on 2/16/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    // Scope object is responsible for interacting with the dom
    // The http service is used for HTTP requests
    // THe location service is used for manipulating the URL
    function SearchController($scope, $http, $location, $routeParams){
        $scope.search = search;
        var title = $routeParams.title;
        if(title) {
            search(title);
        }

        function search(title){
            $location.url("/search/"+title);
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(render);
        }

        function render(response){
            $scope.data = response;
        }
    }


})();