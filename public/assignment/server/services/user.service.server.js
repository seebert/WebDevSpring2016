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

    function deleteUser(req, res){
        userModel.deleteUserById(req.params.userId);
        var users = userModel.findAllUsers();
        res.json(users);
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
        var user = userModel.findUserByUsername(username);

        res.json(user);
    }

    function getUserByCredentials(req,res){
        console.log("Get user by credentials");
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
        console.log("Get all users");
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function getUserById(req, res){
        console.log("Get user by id");
        var userId = req.params.userId;
        var user = userModel.findUserById(userId)

        res.json(user);
    }


    function updateUser(req, res){
        userModel.updateUser(req.params.userId, req.params.user);
        var users = userModel.findAllUsers();

        res.json(users);
    }
}