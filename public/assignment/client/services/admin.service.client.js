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
            deleteUserById : deleteUserById
        };
        return api;

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }F

        function findAllUsers(){
            console.log("inside admin service");
            return $http.get("/api/assignment/admin/user");
        }

        function findUserByUsername(userId){
            return $http.get("/api/assignment/admin/user?userId="+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/"+userId);
        }
    }
})();