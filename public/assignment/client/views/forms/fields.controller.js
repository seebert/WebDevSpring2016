/**
 * Created by Tiffanys on 2/15/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, FieldService, $routeParams) {
        $scope.addField = addField;
        $scope.removeField = removeField;

        var fieldTypes = [
            { "Single Line Text Field" :
                 {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}},
            { "Multi Line Text Field" :
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}},
            { "Date Field" :
                {"_id": null, "label": "New Date Field", "type": "DATE"}},
            { "Dropdown Field" :
                {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]}},
            { "Checkboxes Field" :
                {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}]} },
            { "Radio Buttons Field" :
                {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}]} }];

        var formId   = $routeParams.formId;
        var fields = [];

        FieldService
            .getFieldsForForm(formId)
            .then(function(response){
                fields = response.data;
                $scope.fields = fields;
                console.log(fields);
            });

        function addField(fieldType){
            /**7.	Implement event handler addField(fieldType)
             a.	Uses FieldService to add a new field to a form
             b.	Updates the view with the list of fields
            **/
        }

        function removeField(field){
            /**
             * 8.	Implement event handler deleteField(field)
             a.	Uses the FieldService to remove the field from a form
             b.	Updates the view with the list of fields

             */
        }
    }
})();