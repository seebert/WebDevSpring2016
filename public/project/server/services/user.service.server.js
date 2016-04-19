/**
 * Created by Tiffanys on 3/23/16.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function(app, userModel){
        var auth = authenticated;
        app.post('/api/project/login',   passport.authenticate('local'), login);
        app.post('/api/project/user',        auth,   createUser);
        app.post('/api/project/logout',              logout);
        app.post('/api/project/register',            register);
        app.get('/api/project/loggedIn',             loggedin);
        app.get('/api/project/user',         auth,   getAllUsers);
        app.put('/api/project/user/:id',     auth,   updateUser);
        app.delete('/api/project/user/:id',  auth,   deleteUser);

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
            req.session.user = req.user;
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

            console.log(newUser);
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
                        console.log("error 1: " + err);
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(user){
                        if(user){
                            req.login(user, function(err) {
                                if(err) {
                                    console.log("error 2: " + err);
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            });
                        }
                    },
                    function(err){
                        console.log("error 3: " + err);
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
            delete user.roles;
        }

        if(typeof user.roles == "string") {
            user.roles = user.roles.split(",");
        }

        userModel
            .updateUser(userId, user)
            .then (
                function (user) {
                    res.json(user);
                },
                function (err) {
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

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

}