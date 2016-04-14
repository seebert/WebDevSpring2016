/**
 * Created by Tiffanys on 4/12/16.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function(app, userModel){
    var auth = authenticated;
    app.post('/api/assignment/admin/user',   auth, createUser);
    app.get('/api/assignment/admin/user',    auth, getAllUsers);
    app.get('/api/assignment/admin/user/:id',auth, getUserById);
    app.put('/api/assignment/admin/user/:id',     auth,   updateUser);
    app.delete('/api/assignment/admin/user/:id',  auth,   deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function createUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status (400).send ( err);
                }
            );
    }

    function getAllUsers(req, res){
            userModel
                .findAllUsers()
                .then(
                    function(users){
                        res.json(users);
                    },
                    function (err){
                        res.status(400).send(err);
                    });
    }

    function getUserById(req, res){
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.json(user);
                },
                function (err){
                    res.status(400).send(err);
                });
    }


    function updateUser(req, res){
        var user = req.body;
        var userId =  req.params.id;

        if(typeof user.roles == "string") {
            user.roles = user.roles.split(",");
        }

        userModel
            .updateUser(userId, user)
            .then (
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
            userModel
                .deleteUserById(req.params.id)
                .then(
                    function (user) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
    }

    function authenticated (req, res, next) {
        if (!req.isAuthenticated() || !isAdmin(req.user)) {
            res.send(403);
        } else {
            next();
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
};