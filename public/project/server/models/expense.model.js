/**
 * Created by Tiffanys on 3/23/16.
 */
var mock = require("./expense.mock.json");
module.exports = function(app, db) {
    var api = {
        createExpense: createExpense,
        findAllExpenses: findAllExpenses,
        findExpenseById: findExpenseById,
        updateExpense: updateExpense,
        deleteExpenseById : deleteExpenseById
    };

    return api;

    function createExpense(expense) {
        var expense = {
            title: expense.title,
            description: expense.description,
            payeeId: expense.payeeId,
            paymentRequestIds: expense.paymentRequestIds,
            _id : (new Date).getTime()
        };
        mock.push(expense);
        return expense;
    }

    function findAllExpenses(){
        return mock;
    }

    function findExpenseById(id){
        for (var e in mock) {
            if (mock[e]._id == id) {
                return mock[e];
            }
        }
    }

    function updateExpense(expenseId, expense) {
        for (var e in mock) {
            if (mock[e]._id === expenseId) {
                mock[e].title = expense.title;
                mock[e].description = expense.description;
                mock[e].payeeId = expense.payeeId;
                mock[e].paymentRequestIds = expense.paymentRequestIds;
                return mock[e];
            }
        }
        return null;
    }

    function deleteExpenseById(expenseId) {
        for (var e in mock) {
            if (mock[e]._id === expenseId) {
                mock.splice(e, 1);
            }
        }
        return mock;
    }
};