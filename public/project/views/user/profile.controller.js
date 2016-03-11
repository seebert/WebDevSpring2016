/**
 * Created by Tiffanys on 3/3/16.
 */
/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){
        $scope.message=null;
        $scope.user = UserService.getCurrentUser();

        if(!$scope.user){
            $location.url("/overview");
        }

        $scope.update = update;

        function update(){
            if(!validEmail($scope.user.email)){
                $scope.error = "Please enter a valid email";
            }

            var updatedUser = UserService.updateUser($scope.user._id, $scope.user, render);

            if(!updatedUser){
                    $scope.error = "Unable to update user information";
            }else{
                    $scope.message = "Update successful";
                    UserService.setCurrentUser(updatedUser);
            }


            function validEmail(email){
                var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                return email_regex.test(email);
            }

        }

        function render(response){
            return response;
        }

    }
})();