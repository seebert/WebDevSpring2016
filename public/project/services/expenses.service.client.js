/**
 * Created by Tiffanys on 3/8/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .factor("ExpensesService", ExpensesService);

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
            updateEvent: updateEvent,
            deleteEventById : deleteEventById
        };

        return model;
    }
})();

