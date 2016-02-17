/**
 * Created by Tiffanys on 2/16/16.
 */
(function(){
    angular
        .module("MovieApp", ["ngRoute"])
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController"
            })
            .otherwise({
                redirectTo : "/home"
            })
    }
})();