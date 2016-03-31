/**
 * Created by Tiffanys on 3/15/16.
 */
var mock = require("./user.mock.json");
var q = require("q");
module.exports = function(db, mongoose){
    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser :updateUser,
        deleteUserById : deleteUserById,
        getMongooseModel: getMongooseModel
    };

    return api;

    function getMongooseModel(){
        return User;
    }

    function createUser(user) {
        var deferred = q.defer();
        User.create(user, function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        return mock;
    }

    function findUserById(id) {
        /*for (var u in mock) {
            if (mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;*/
        return User.findById(id);
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
        var deferred = q.defer();

        User.findOne(
            {username: username,
             password : password},

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else{
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
/*        for (var u in mock) {
            if (mock[u].username === username &&
                mock[u].password === password) {
                return mock[u];
            }
        }
        return null;*/
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