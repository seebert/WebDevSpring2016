/**
 * Created by Tiffanys on 3/23/16.
 */
var q = require("q");
module.exports = function(mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var ProjectUser = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        getMongooseModel : getMongooseModel
    };

    return api;

    function getMongooseModel(){
        return ProjectUser;
    }

    function createUser(user) {
        var deferred = q.defer();
        ProjectUser.create(user, function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        return ProjectUser.find();
    }

    function findUserById(id) {
        return ProjectUser.findById(id);
    }

    function findUserByUsername(username) {
        return ProjectUser.findOne(
            {username: username});
    }

    function findUserByCredentials(username, password) {
        return ProjectUser.findOne(
            {
                username: username,
                password: password
            }
        );
    }

    function updateUser(userId, user) {
        return ProjectUser
            .findOneAndUpdate (
                {_id: userId},
                {$set: user});
    }

    function deleteUserById(userId) {
        return ProjectUser.remove({_id: userId});
    }
};