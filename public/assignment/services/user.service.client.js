/**
 * Created by Tiffanys on 2/25/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var users = [];
        users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var model = {
            users: users,
            createUser: createUser,
            findAllUsers : findAllUsers,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUserById : deleteUserById,
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser
        };
        return model;

        function createUser(user, callback) {
            var user = {
                username: user.username,
                password: user.password,
                _id : (new Date).getTime()
            };
            model.users.push(user);
            return user;
        }

        function findAllUsers(callback){
            return model.users;
        }

        function findUserByCredentials(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    return model.users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].firstName = user.firstName;
                    model.users[u].lastName = user.lastName;
                    model.users[u].password = user.password;
                    return model.users[u];
                }
            }
            return null;
        }

        function deleteUserById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
            return model.users;
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();