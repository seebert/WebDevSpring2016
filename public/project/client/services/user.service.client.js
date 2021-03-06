/**
 * Created by Tiffanys on 3/3/16.
 */
(function() {
    angular
        .module("PaymentApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
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


        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function findAllUsers(){
            console.log("findAllUsers() > ");
            console.log($http.get("/api/project/user"));
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