/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService, SearchService) {
        $scope.$location = $location;
        $scope.search = search;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        function search(){
            SearchService
                .search($scope.req)
                .then(function(response){
                });
        }
    }
})();