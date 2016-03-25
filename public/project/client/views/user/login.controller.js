/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService){
        $scope.login = login;

        function login(){
            if(!$scope.user){
                $scope.message = "Please fill in the required forms";
                return;
            }

            UserService
                .loginUser($scope.user.username, $scope.user.password)
                .then(function(response){
                    var user = response.data;

                    console.log("login() > " + JSON.stringify(user));
                    if(!user){
                        $scope.message = "Incorrect username or password";
                        return;
                    }

                    UserService.setCurrentUser(user);
                    $location.url("/overview");
                });
        }
    }
})();