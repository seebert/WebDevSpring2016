/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService){
        $scope.login = login;

        function login(){
            if(!$scope.user){
                $scope.message = "Please fill in the required forms";
                return;
            }

            var user = UserService.findUserByCredentials($scope.user.username, $scope.user.password, render);

            if(!user){
                $scope.message = "Incorrect username or password";
                return;
            }

            UserService.setCurrentUser(user);
            $location.url("/profile");
        }

        function render(response){
            return response;
        }
    }
})();