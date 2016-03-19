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

            UserService
                .findUserByCredentials($scope.user.username, $scope.user.password)
                .then(function(response){
                    if(!response.data){
                        $scope.message = "Incorrect username or password";
                        return;
                    }

                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();