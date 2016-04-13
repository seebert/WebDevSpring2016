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
                .then(handleSuccess, handleError);
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
                .then(handleSuccess, handleError);
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