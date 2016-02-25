/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout($location, $scope) {
            $scope.$location = $location;
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();