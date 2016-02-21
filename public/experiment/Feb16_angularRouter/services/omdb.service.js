/**
 * Created by Tiffanys on 2/18/16.
 */
// This will encapsulate all the services for interacting with OMDB API
// Specifically, the CRUD applications (in this case, we can only read)

// Search by: title, ID

(function(){
    angular
        .module("MovieApp")
        .factory("OmdbService", omdbService);

    function omdbService($http){
        var api ={
            findMoviesByTitle : findMoviesByTitle,
            findMovieByImdbID: findMovieByImdbID
        };

        return api;

        function findMoviesByTitle(title, callback){
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(callback);
        }

        function findMovieByImdbID(imdbID,callback){
            $http.get("http://www.omdbapi.com/?i=" + imdbID)
                .success(callback);
        }
    }
})();