/**
 * Created by Tiffanys on 2/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, UserService){
        var currentUser = UserService.getCurrentUser();
        $scope.forms = FormService.findAllFormsForUser(currentUser._id, render);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(){
            var newForm = {title: $scope.form.title};
            newForm = FormService.createFormForUser(currentUser._id, newForm, render)

            if(!newForm){
                $scope.error = "Form was not created";
            }

            $scope.forms = FormService.findAllFormsForUser(currentUser._id, render);
        }

        function updateForm(){
            var newForm = {
                title : $scope.form.title
            }

            var updatedForm = FormService.updateFormById($scope.form._id, newForm, render)

            if(!updatedForm){
                $scope.error = "Form was not updated";
            }else{
                $scope.message = "Form was successfully updated";
            }
        }

        function deleteForm($index){
            var form = $scope.forms[$index];
            FormService.deleteFormById(form._id, render);

            $scope.forms = FormService.findAllFormsForUser(currentUser._id, render);
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

        function render(response){
            return response;
        }
    }
})();