/**
 * Created by Tiffanys on 3/8/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("ExpensesController", ExpensesController);

    function ExpensesController($scope, ExpensesService){
        $scope.expenses = ExpensesService.findAllExpenses(render);

        $scope.addExpense = addExpense;
        $scope.updateExpense = updateExpense;
        $scope.deleteExpense = deleteExpense;
        $scope.selectExpense = selectExpense;

        function addExpense(){
            var newExpense =
            {   _id: $scope.expense._id,
                title: $scope.expense.title,
                description: $scope.expense.description,
                payeeId: $scope.expense.payeeId,
                paymentRequestIds: parsePayments($scope.expense.paymentRequestIds)
            };

            ExpensesService
                .createExpense(newExpense)
                .then(function(response){
                    if(!response.data){
                        $scope.error = "Expense was not created";
                    }

                    updateScope();
                });
        }

        function updateScope(){
            ExpensesService
                .findAllExpenses()
                .then(function(response){
                    $scope.expense = response.data;
                });
        }

        function updateExpense(){
            var newExpense = {
                _id: $scope.expense._id,
                title: $scope.expense.title,
                description: $scope.expense.description,
                payeeId: $scope.expense.payeeId,
                paymentRequestIds: parsePayments($scope.expense.paymentRequestIds)
            };

            var updatedExpense = ExpensesService.updateExpense($scope.expense._id, newExpense, render)

            if(!updatedExpense){
                $scope.error = "Expense was not updated";
            }else{
                $scope.message = "Expense was successfully updated";
            }
        }

        function deleteExpense($index){
            var expense = $scope.expenses[$index];
            ExpensesService.deleteExpenseById(expense._id, render);

            $scope.expenses = ExpensesService.findAllExpenses(render);
        }

        function selectExpense($index){
            var selectExpense = $scope.expenses[$index];
            var localExpense = {
                title: selectExpense.title,
                description: selectExpense.description,
                payeeId: selectExpense.payeeId,
                paymentRequestIds: selectExpense.paymentRequestIds,
                _id : selectExpense._id
            };
            $scope.expense = localExpense;
        }

        function render(response){
            return response;
        }

        function parsePayments(eArray){
            var payments = eArray.split(",");
            for(e in payments){
                payments[e] = +payments[e];
            }

            return payments;
        }
    }
})();