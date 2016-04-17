/**
 * Created by Tiffanys on 3/23/16.
 */
var q = require("q");
module.exports = function(mongoose, eventModel) {
    var ExpenseSchema = require("./expense.schema.server.js")(mongoose);
    var Expense = mongoose.model("Expense", ExpenseSchema);

    var Event = eventModel.getMongooseModel();
    var api = {
        createExpense: createExpense,
        findAllExpenses: findAllExpenses,
        findExpenseById: findExpenseById,
        findExpensesByEventId : findExpensesByEventId,
        updateExpense: updateExpense,
        deleteExpenseById : deleteExpenseById
    };

    return api;

    function createExpense(expense) {
        return Expense.create(expense);
    }

    function findAllExpenses(){
        return Expense.find();
    }

    function findExpenseById(id){
        return Expense.findById(id);
    }

    function findExpensesByEventId(eventId){
        return Event.findById(eventId)
            .then(function(event){
                var expenses = [];
                for(var id in event.expenses){
                    expenses.push(findExpenseById(id));
                }
                return expenses;
            });
    }


    function updateExpense(expenseId, expenseObj) {
        return Expense
            .findOneAndUpdate (
                {_id: expenseId},
                {$set: expenseObj});

        return Expense
            .findById(expenseId)
            .then(function(expense){

                if(expenseObj.title)
                    expense.title = expenseObj.title;

                if(expenseObj.description)
                    expense.description = expenseObj.description;

                if(expenseObj.amountOwed)
                    expense.amountOwed = expenseObj.amountOwed;

                if(expenseObj.eventId)
                    expense.eventId = expenseObj.eventId;

                if(expenseObj.payeeUsername)
                    expense.payeeUsername = expenseObj.payeeUsername;

                if(expenseObj.paymentRequestId)
                    expense.paymentRequestId = expenseObj.paymentRequestId;

                return form.save();
            });

    }

    function deleteExpenseById(expenseId) {
        return Expense.remove({_id: expenseId});
    }
};