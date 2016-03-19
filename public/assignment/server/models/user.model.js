/**
 * Created by Tiffanys on 3/15/16.
 */
var mock = require("./user.mock.json");
module.exports = function(app, db){

    var api = {
        createUser: createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser :updateUser,
        deleteUserById : deleteUserById
    };

    return api;

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findAllUsers(){
        return mock;
    }

    function findUserById(id) {
        for (var u in mock) {
            if (mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;
    }
    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {

        for (var u in mock) {
            if (mock[u].username === username &&
                mock[u].password === password) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].password = user.password;
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(u, 1);
            }
        }
        return mock;
    }

};