var app = angular.module("HelloWorldApp", []);

app.controller("HelloWorldController", HelloWorldController);

function HelloWorldController($scope) {
    $scope.hello = "Hello World from AngularJS";
    var alice = {fn:"Alice", ln:"Wonderland"};
    var frank = {fn:"Frank", ln:"Underwood"};
    $scope.user = alice;
    $scope.users = [alice,{fn:"Charlie", ln:"Brown"}];
    $scope.add=add;
    $scope.plus=plus;
    $scope.addUser=addUser;

    $scope.users.push(frank);


    function plus(){
        $scope.c = $scope.a + $scope.b;
    }

    function add(a, b){
        return a + b;
    }

    function addUser(){
        var newUser = {
            fn : $scope.first,
            ln : $scope.last
        };

        $scope.users.push(newUser);
    }

}/**
 * Created by Tiffanys on 2/9/16.
 */

