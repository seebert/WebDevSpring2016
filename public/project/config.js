/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html"
            })
            .when("/overview",{
                templateUrl:"views/overview/overview.view.html",
                controller:"OverviewController"
            })
            .when("/register", {
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:"LoginController"
            })
            .when("/profile", {
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController"
            })
            .when("/events", {
                templateUrl:"views/events/events.view.html",
                controller:"EventsController"
            })
            .otherwise({
                redirectTo : "/home"
            })

    }
})();