/**
 * Created by Tiffanys on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html",
                controller:""
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller:""
            })
            .when("/register", {
                templateUrl:"views/users/register.view.html",
                controller:""
            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:""
            })
            .when("/profile", {
                templateUrl:"views/users/profile.view.html",
                controller:""
            })
            .when("/admin", {
                templateUrl:"views/admin/admin.view.html",
                controller:""
            })
            .otherwise({
                redirectTo : "/home"
            })

    }
})();