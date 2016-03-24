/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, expenseModel) {
    app.post('/api/project/expense', createExpense);
    app.get('/api/project/expense', findAllExpenses);
    app.get('/api/project/event/:eventId/expense', findExpensesByEventId);
    app.get('/api/project/expense?expenseId=:expenseId', findExpenseById);
    app.put('/api/project/expense/:expenseId', updateExpenseById);
    app.delete('/api/project/expense/:expenseId', deleteEventById);

};