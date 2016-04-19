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
            .when("/events", {
                templateUrl:"views/events/events_list_live.view.html",
                controller:"EventListController"
            })
            .when("/events/:eventId", {
                templateUrl:'views/events/events_edit.view.html',
                controller:"EventDetailsController"
            })
            .when("/eventsPast", {
                templateUrl:"views/events/events_list_past.view.html",
                controller:"EventListController"
            })
            .when("/eventsPast/:eventId", {
                templateUrl:"views/events/events_view.view.html",
                controller:"EventDetailsController"
            })
            .when("/alerts", {
                templateUrl:"views/alerts/alerts_page.view.html",
                controller:"AlertsPageController"
            })
            .when("/payments", {
                templateUrl:"views/payment/payment_page.view.html",
                controller:"PaymentPageController"
            })
            .otherwise({
                redirectTo : "/home"
            })

    }
})();