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
                .login($scope.user)
                .then(function(response){
                    var user = response.data;
                    UserService.setCurrentUser(user);
                    $location.url("/profile/"+user.username);
                },
                    function(err) {
                        $scope.message = "Incorrect username or password";
                    });
        }
    }
})();