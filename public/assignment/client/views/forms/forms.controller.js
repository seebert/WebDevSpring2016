/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, UserService){
        var currentUser = UserService.getCurrentUser();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        FormService
            .findAllFormsForUser(currentUser._id)
            .then(function(response){
                console.log(response.data);
                $scope.forms = response.data;
            });

        function addForm(){
            var newForm = {title: $scope.form.title};

            FormService
                .createFormForUser(currentUser._id, newForm)
                .then(function(response){
                    newForm = response.data;

                    if(!newForm){
                        $scope.error = "Form was not created";
                    }

                    FormService
                        .findAllFormsForUser(currentUser._id)
                        .then(function(response){
                            $scope.forms = response.data;
                        });
                });
        }

        function updateForm(){
            var newForm = {
                title : $scope.form.title
            };

            FormService
                .updateFormById($scope.form._id, newForm)
                .then(function(response){
                   var updatedForm = response.data;

                    if(!updatedForm){
                        $scope.error = "Form was not updated";
                    }else{
                        $scope.message = "Form was successfully updated";
                    }
                });
        }

        function deleteForm($index){
            var form = $scope.forms[$index];

            FormService
                .deleteFormById(form._id, render)
                .then(function(){
                    FormService
                        .findAllFormsForUser(currentUser._id)
                        .then(function(response){
                            $scope.forms = response.data;
                        })
                });
        }

        function selectForm($index){
            var selectedForm = $scope.forms[$index];
            var localForm = {
                title: selectedForm.title,
                userId : selectedForm.userId,
                _id : selectedForm._id
            };
            $scope.form = localForm;
        }
    }
})();