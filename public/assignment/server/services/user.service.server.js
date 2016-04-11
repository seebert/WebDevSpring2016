/**
 * Created by Tiffanys on 3/17/16.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function(app, userModel){
    var auth = authorized;
    app.post('/api/assignment/login',   passport.authenticate('local'), login);
    app.post('/api/assignment/user',        auth,   createUser);
    app.post('/api/assignment/logout',              logout);
    app.post('/api/assignment/register',            register);
    app.get('/api/assignment/loggedIn',             loggedin);
    app.get('/api/assignment/user',         auth,   getUser);
    app.put('/api/assignment/user/:id',     auth,   updateUser);
    app.delete('/api/assignment/user/:id',  auth,   deleteUser);


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

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
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

    function getUser(req, res){
        if(req.query.username){
            if(req.query.password){
                getUserByCredentials(req,res);
            }else{
                getUserByUsername(req, res);
            }
        }else{
            getAllUsers(req, res);
        }
    }

    function getUserByUsername(req,res){
        console.log("Get user by username");
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                },
                function (err){
                    res.status(400).send(err);
                });
    }

    function getUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username,password)
            .then(
                function(user){
                    delete user.password;
                    res.json(user);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res){
        if(isAdmin(req.user)){
            userModel
                .findAllUsers()
                .then(
                    function(users){
                        res.json(users);
                    },
                    function (err){
                        res.status(400).send(err);
                    });
        }else{
            res.status(403);
        }
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

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
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

        if(isAdmin(req.user)) {
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
        }else {
            res.status(403);
        }
    }

    function authenticated (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


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