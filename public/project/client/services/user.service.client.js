/**
 * Created by Tiffanys on 3/3/16.
 */
(function() {
    angular
        .module("PaymentApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            createUser: createUser,
            findAllUsers : findAllUsers,
            loginUser: loginUser,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUserById : deleteUserById,
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function loginUser(username, password) {
            return $http.get('/api/project/user?username='+username+'&password='+password) ;
        }

        function findUserByUsername(username) {
            return $http.get('/api/project/user?username='+username) ;
        }


        function findUserById(id) {
            return $http.get('/api/project/user/'+id);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/'+userId, user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/user/'+userId);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();