/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){
        $scope.message=null;
        $scope.user = UserService.getCurrentUser();

        if(!$scope.user){
            $location.url("/home");
        }

        $scope.update = update;

        function update(){
            $scope.user = UserService.updateUser($scope.user._id, $scope.user);

            if(!$scope.user){
                $scope.error = "Unable to update user information";
            }else{
                $scope.message = "Update successful";
                UserService.setCurrentUser($scope.user);
            }
        }

    }
})();