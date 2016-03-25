/**
 * Created by Tiffanys on 3/8/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factory("ExpensesService", ExpensesService);

    function ExpensesService(){
        var api = {
            createExpense: createExpense,
            findAllExpenses: findAllExpenses,
            findExpenseById: findExpenseById,
            findExpensesByEventId :findExpensesByEventId,
            updateExpense: updateExpense,
            deleteExpenseById : deleteExpenseById
        };

        return api;

        function createExpense(expense) {
            return $http.post('/api/project/expense', expense);
        }

        function findAllExpenses(){
            return $http.get('/api/project/expense');
        }

        function findExpensesByEventId(eventId){
            return $http.get('/api/project/event/'+eventId+'/expense');
        }
        function findExpenseById(id){
            return $http.get('/api/project/expense?expenseId='+id);
        }

        function updateExpense(expenseId, expense) {
            return $http.put('/api/project/expense/'+expenseId, expense);
        }

        function deleteExpenseById(expenseId) {
            return $http.delete('/api/project/expense/'+expenseId);
        }

    }
})();

