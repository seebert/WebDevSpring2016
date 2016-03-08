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
            var updatedUser = UserService.updateUser($scope.user._id, $scope.user, render);

            if(!updatedUser){
                $scope.error = "Unable to update user information";
            }else{
                $scope.message = "Update successful";
                UserService.setCurrentUser(updatedUser);
            }
        }

        function render(response){
            return response;
        }

    }
})();