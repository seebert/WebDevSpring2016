/**
 * Created by Tiffanys on 2/11/16.
 */
var app = angular.module("MovieAdminApp", []);
app.controller("MovieListController", MovieListController);
function MovieListController($scope){
        // Declaring an array of movie objects within this scope
        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", directory: "James Cameron"},
            {id: 345, title: "Titanic", directory: "James Cameron"}
        ];
}