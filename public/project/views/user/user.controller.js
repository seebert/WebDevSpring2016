/**
 * Created by Tiffanys on 3/4/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService){
        $scope.users = UserService.findAllUsers(render);

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function addUser(){
            resetMessages();

            var newUser =
            {   username: $scope.user.username,
                password: $scope.user.password,
                email: $scope.user.email,
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName
            };

            newUser = UserService.createUser(newUser, render)

            if(!newUser){
                $scope.error = "User was not created";
            }

            $scope.users = UserService.findAllUsers(render);
        }

        function updateUser(){
            resetMessages();

            if(!validEmail($scope.user.email)){
                $scope.error = "Please enter a valid email";
                return;
            }

            var newUser = {
                username: $scope.user.username,
                password: $scope.user.password,
                email: $scope.user.email,
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName
            };

            var updatedUser = UserService.updateUser($scope.user._id, newUser, render)

            if(!updatedUser){
                $scope.error = "User was not updated";
            }else{
                $scope.message = "User was successfully updated";
            }
        }

        function deleteUser($index){
            resetMessages();

            var user = $scope.users[$index];
            UserService.deleteUserById(user._id, render);

            $scope.users = UserService.findAllUsers(render);
        }

        function selectUser($index){
            resetMessages();

            var selectUser = $scope.users[$index];
            var localUser = {
                username: selectUser.username,
                password: selectUser.password,
                email: selectUser.email,
                firstName: selectUser.firstName,
                lastName: selectUser.lastName,
                _id : selectUser._id
            };
            $scope.user = localUser;
        }

        function render(response){
            return response;
        }

        function validEmail(email){
            var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            return email_regex.test(email);
        }

        function resetMessages(){
            $scope.error = null;
            $scope.message = null;
        }
    }
})();