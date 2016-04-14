/**
 * Created by Tiffanys on 4/12/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {
        var api = {
            createUser: createUser,
            findAllUsers : findAllUsers,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser : deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        function findUserByUsername(userId){
            return $http.get("/api/assignment/admin/user?userId="+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/assignment/admin/user/"+userId);
        }
    }
})();