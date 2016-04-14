/**
 * Created by Tiffanys on 4/12/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;
        $scope.sort = sort;

        function init() {
            AdminService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            AdminService
                .deleteUser(user._id)
                .then(init(), handleError);
        }

        function update(user)
        {
            AdminService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            AdminService
                .createUser(user)
                .then(init(), handleError);
        }

        function sort(attribute)
        {
            $scope.sortAttribute = attribute;
            $scope.reverse = !$scope.reverse;
            if($scope.reverse){
                $scope.orderGliphy = "glyphicon glyphicon-triangle-top";
            }else{
                $scope.orderGliphy = "glyphicon glyphicon-triangle-bottom";
            }
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();