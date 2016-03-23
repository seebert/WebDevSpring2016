/**
 * Created by Tiffanys on 3/8/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factory("ExpensesService", ExpensesService);

    function ExpensesService(){
        var expenses = [];
        expenses = [
            { "_id" : 1, "title" : "Groceries", "description" : "Food expenses",
             "payeeId" : 567, "paymentRequestIds" : [1,2] },
            { "_id" : 2, "title" : "Gas", "description" : "Gas",
                "payeeId" : 456, "paymentRequestIds" : [1,2,3] }
        ];

        var model = {
            expenses: expenses,
            createExpense: createExpense,
            findAllExpenses: findAllExpenses,
            findExpenseById: findExpenseById,
            updateExpense: updateExpense,
            deleteExpenseById : deleteExpenseById
        };

        return model;

        function createExpense(expense, callback) {
            var expense = {
                title: expense.title,
                description: expense.description,
                payeeId: expense.payeeId,
                paymentRequestIds: expense.paymentRequestIds,
                _id : (new Date).getTime()
            };
            model.expenses.push(expense);
            return callback(expense);
        }

        function findAllExpenses(callback){
            return callback(model.expenses);
        }

        function findExpenseById(id, callback){
            for (var e in model.expenses) {
                if (model.expenses[e]._id == id) {
                    return callback(model.expenses[e]);
                }
            }
        }

        function updateExpense(expenseId, expense, callback) {
            for (var e in model.expenses) {
                if (model.expenses[e]._id === expenseId) {
                    model.expenses[e].title = expense.title;
                    model.expenses[e].description = expense.description;
                    model.expenses[e].payeeId = expense.payeeId;
                    model.expenses[e].paymentRequestIds = expense.paymentRequestIds;
                    return callback(model.expenses[e]);
                }
            }
            return callback(null);
        }

        function deleteExpenseById(expenseId, callback) {
            for (var e in model.expenses) {
                if (model.expenses[e]._id === expenseId) {
                    model.expenses.splice(e, 1);
                }
            }
            return callback(model.expenses);
        }

    }
})();

