/**
 * Created by Tiffanys on 2/15/16.
 */
/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, $scope){
        $scope.$location = $location;
    }
})();