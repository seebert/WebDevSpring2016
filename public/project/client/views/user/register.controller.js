/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService){
        $scope.register = register;

        function register(){
            $scope.message = null;

            if ($scope.user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            if(!$scope.user.username){
                $scope.message = "Please provide a username";
                return;
            }

            if(!$scope.user.password || !$scope.user.passwordVerify){
                $scope.message = "Please provide a password";
                return;
            }

           UserService
               .createUser($scope.user)
               .then(function(response){
                   var newUser = response.data;
                   console.log("register() > Registering user " + JSON.stringify(newUser));
                   UserService.setCurrentUser(newUser);
                   $location.url("/profile");
               });
        }
    }
})();