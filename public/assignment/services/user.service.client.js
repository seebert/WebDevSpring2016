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
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland", "email" : "",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope", "email" : "",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown", "email" : "",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig", "email" : "",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton", "email" : "",
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
                email: user.email,
                _id : (new Date).getTime()
            };
            model.users.push(user);
            return callback(user);
        }

        function findAllUsers(callback){
            return callback(model.users);
        }

        function findUserByCredentials(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    return callback(model.users[u]);
                }
            }
            return callback(null);
        }

        function updateUser(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].firstName = user.firstName;
                    model.users[u].lastName = user.lastName;
                    model.users[u].password = user.password;
                    model.users[u].email = user.email;
                    return callback(model.users[u]);
                }
            }
            return callback(null);
        }

        function deleteUserById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
            return callback(model.users);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();