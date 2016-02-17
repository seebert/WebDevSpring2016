/**
 * Created by Tiffanys on 2/11/16.
 */
var app = angular.module("MovieAdminApp", []);
app.controller("MovieListController", MovieListController);
function MovieListController($scope){
    $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", director: "James Cameron"},
            {id: 345, title: "Titanic", director: "James Cameron"}
    ];

    // Event handler declarations
    $scope.addMovie = addMovie;
    $scope.deleteMovie = deleteMovie;
    $scope.selectMovie = selectMovie;
    $scope.updateMovie = updateMovie;

    // Event handler implementation
    function addMovie(movie) {
        var newMovie = {
            id: movie.id,
            title: movie.title,
            director: movie.director
        };

        $scope.movies.push(newMovie);
    }

    function deleteMovie(movie){
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }

    var selectedMovieIndex = -1;
    function selectMovie(movie){
        selectedMovieIndex = $scope.movies.indexOf(movie);
        $scope.movie = {
            id: movie.id,
            title: movie.title,
            director: movie.director
        };
    }

    function updateMovie(movie){
        // Confirm that some movie has been selected
        if(selectedMovieIndex >= 0){
            $scope.movies[selectedMovieIndex] = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            }
        }
    }

}