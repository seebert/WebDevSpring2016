/**
 * Created by Tiffanys on 3/23/16.
 */
/**
 * Created by Tiffanys on 3/17/16.
 */
module.exports = function(app, userModel){
    app.post('/api/project/user', createUser);
    app.get('/api/project/user', getUser);
    app.get('/api/project/user?username=:username', getUserByUsername);
    app.get('/api/project/user?username=:username&password=:password', getUserByCredentials);
    app.get('/api/project/user/:id', getUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    function createUser(req, res){
        console.log("createUser() > Create user " + JSON.stringify(req.body));
        var newUser = userModel.createUser(req.body);
        res.json(newUser);
    }

    function getUser(req, res){
        console.log("getUser() entered");
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
        var user = userModel.findUserByCredentials(username, password);

        res.json(user);
    }

    function getAllUsers(req, res){
        console.log("Get all users");
        var users = userModel.findAllUsers();
        console.log("getAllUsers() > All users:" + users.toString());
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

    function deleteUser(req, res){
        userModel.deleteUserById(req.params.userId);
        var users = userModel.findAllUsers();
        res.json(users);
    }

}