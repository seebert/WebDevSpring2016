/**
 * Created by Tiffanys on 2/16/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController($scope){
        $scope.search = search;

        console.log("Testing1");
        function search(title){
            console.log("Testing");
        }
    }
})();