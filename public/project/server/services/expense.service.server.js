/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, expenseModel) {
    app.post('/api/project/expense', createExpense);
    app.get('/api/project/expense', getExpenses);
    app.get('/api/project/event/:eventId/expense', getExpensesByEventId);
    app.get('/api/project/expense?expenseId=:expenseId', getExpenseById);
    app.put('/api/project/expense/:expenseId', updateExpenseById);
    app.delete('/api/project/expense/:expenseId', deleteExpenseById);

    function createExpense(req, res){
        console.log("Create expense");
        expenseModel.createExpense(req.body);
        res.json(null);
    }

    function getExpenses(req, res){
        if(req.query.expenseId){
            getExpenseById(req,res);
        }else if(req.param.eventId) {
            getExpensesByEventId(req,res);
        }else{
            getAllExpenses(req, res);
        }
    }

    function getExpenseById(req, res){
        var expenseId = req.query.expenseId;
        console.log("Get expense by id:" + expenseId);
        var expense = expenseModel.findExpenseById(expenseId);

        res.json(expense);
    }

    function getExpensesByEventId(req, res){
        var eventId = req.param.eventId;
        console.log("Get expenses by event id:" + eventId);
        var expenses = expenseModel.findExpensesByEventId(eventId);

        res.json(expenses);
    }

    function getAllExpenses(req, res){
        console.log("Get all expenses");
        var expenses = expenseModel.findAllExpenses();

        res.json(expenses);
    }

    function updateExpenseById(req, res){
        expenseModel.updateExpenseById(req.params.expenseId, req.params.expense);
        var expenses = expenseModel.findAllExpenses();

        res.json(expenses);
    }

    function deleteExpenseById(req, res){
        expenseModel.deleteExpenseById(req.params.expenseId);
        var expenses = expenseModel.findAllExpenses();

        res.json(expenses);
    }

};