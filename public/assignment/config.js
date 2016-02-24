/**
 * Created by Tiffanys on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/register", {
                templateUrl:"/views/users/register.view.html",
                controller:""
            })
            .when("/login",{
                templateUrl:"/views/users/login.view.html",
                controller:""
            })
            .when("/profile", {
                templateUrl:"/views/users/profile.view.html",
                controller:""
            })
            .when("/admin", {
                templateUrl:"/views/users/admin.view.html",
                controller:""
            })
            .otherwise({
                redirectTo : "/home"
            })

    }
})();