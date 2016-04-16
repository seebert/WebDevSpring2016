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
                .login($scope.user)
                .then(function(response){
                    var user = response.data;
                    UserService.setCurrentUser(user);
                    $location.url("/overview");
                }, function(err) {
                    $scope.message = "Incorrect username or password";
                });
        }
    }
})();