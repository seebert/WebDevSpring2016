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
                templateUrl:"views/user/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl:"views/user/login.view.html",
                controller:"LoginController"
            })
            .when("/profile", {
                templateUrl:"views/user/profile.view.html",
                controller:"ProfileController"
            })
            .when("/user_events", {
                templateUrl:"views/events/events_page.view.html",
                controller:"EventPageController"
            })
            .when("/alerts", {
                templateUrl:"views/alerts/alerts.view.html",
                controller:"AlertsController"
            })
            .when("/testing_events", {
                templateUrl:"views/events/events.view.html",
                controller:"EventsController"
            })
            .when("/testing_users", {
                templateUrl:"views/user/user.view.html",
                controller:"UserController"
            })
            .otherwise({
                redirectTo : "/home"
            })

    }
})();