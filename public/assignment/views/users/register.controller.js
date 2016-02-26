/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
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

            var newUser= UserService.createUser($scope.user, render);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
        }

        function render(response){
            return response;
        }
    }
})();