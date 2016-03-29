/**
 * Created by Tiffanys on 2/15/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, FieldService, $routeParams) {
        $scope.addField = addField;
        $scope.editField = editField;
        $scope.editComplete = editComplete;
        $scope.removeField = removeField;
        $scope.updateField = updateField;

        var formId   = $routeParams.formId;
        updateFieldsView(formId);

        var newFields = [
            {   type : "Single Line Text Field",
                field: {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}},
            {   type : "Multi Line Text Field",
                field: {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}},
            {   type : "Date Field",
                field: {"_id": null, "label": "New Date Field", "type": "DATE"}},
            {   type : "Dropdown Field",
                field: {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]}},
            {   type : "Checkboxes Field",
                field:{"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}]} },
            {   type :"Radio Buttons Field",
                field:{"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}]} }];

        function updateFieldsView(formId){
            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    $scope.fields = response.data;
                });

            $scope.field = null;
        }

        function updateField(field, updateField){
            FieldService
                .updateField(formId, field._id, updateField)
                .then(function(response){
                    $scope.fields = updateFieldsView(formId);
                });

            $scope.field = null;
        }


        function editField(field){
            $scope.field = field;
        }

        function editComplete(){
            $scope.field = null;
        }
        function addField(fieldType){
            var newField;
            for(var f in newFields){
                if(fieldType == newFields[f].type){
                    newField = newFields[f].field;
                }
            }

            if(newField){
                FieldService
                    .createFieldForForm(formId, newField)
                    .then(function(response){
                        newField = response.data;

                        if(!newField){
                            $scope.error = "Field was not created";
                        }

                        updateFieldsView(formId);
                    });

            }
        }

        function removeField(field){
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(response){
                    updateFieldsView(formId);
                });
        }
    }
})();