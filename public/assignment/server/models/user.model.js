/**
 * Created by Tiffanys on 3/15/16.
 */
var q = require("q");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function(db, mongoose){
    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);
    passport.use(new LocalStrategy(findUserByCredentials));

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
        return User.find();
    }

    function findUserById(id) {
        return User.findById(id);
    }
    function findUserByUsername(username) {
        return User.findOne(
                {username: username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne(
            {
                username: username,
                password: password
            }
        );
    }

    function updateUser(userId, user) {
        return User
            .findOneAndUpdate (
                {_id: userId},
                {$set: user});
    }

    function deleteUserById(userId) {
        return User.remove({_id: userId});
    }

};