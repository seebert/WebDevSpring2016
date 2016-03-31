/**
 * Created by Tiffanys on 3/17/16.
 */
module.exports = function(app, userModel){
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', getUser);
    app.get('/api/assignment/user?username=:username', getUserByUsername);
    app.get('/api/assignment/user?username=:username&password=:password', getUserByCredentials);
    app.get('/api/assignment/user/:id', getUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

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
        userModel
            .deleteUserById(req.params.id)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};