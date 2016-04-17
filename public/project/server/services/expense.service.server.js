/**
 * Created by Tiffanys on 3/24/16.
 */
module.exports = function(app, expenseModel,eventModel) {
    app.post('/api/project/expense', createExpense);
    app.get('/api/project/expense', getExpenses);
    app.get('/api/project/event/:eventId/expense', getExpensesByEventId);
    app.get('/api/project/expense?expenseId=:expenseId', getExpenseById);
    app.put('/api/project/expense/:expenseId', updateExpenseById);
    app.delete('/api/project/expense/:expenseId', deleteExpenseById);

    function createExpense(req, res){
        var newExpense = req.body;
        var createdExpense;
        expenseModel

            // Insert the new expense into the db
            .createExpense(newExpense)
            .then(
                function(expense){
                    // Set the expenses globally
                    createdExpense = expense;
                    res.json(expense);
                    // Return the event this expense corresponds to
                    return eventModel.findEventById(expense.eventId);
                },
                function(err){
                    res.status (400).send(err);
                }
            )

            // Now update corresponding event w/ new expense
            .then(function(event){
                // Add expense id
                event.expenses.push(createdExpense._id);

                // Update event in db
                eventModel
                    .updateEvent(createdExpense.eventId, event)
                    .then(
                        function(doc){
                            // Finally, return the newly created expense
                            res.json(createdExpense);
                        },
                        function(err){
                            res.status (400).send(err);
                        }
                    );
            },
                function(err){
                    console.log(err);
                    res.status (400).send(err);
                });
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
        expenseModel
            .findExpenseById(expenseId)
            .then(
                function(expense){
                    res.json(expense);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

    function getExpensesByEventId(req, res){
        var eventId = req.param.eventId;
        expenseModel
            .findExpensesByEventId(eventId)
            .then(
                function(expenses){
                    res.json(expenses);
                },
                function(err){
                    res.status (400).send(err);
                }
            );

        res.json(expenses);
    }

    function getAllExpenses(req, res){
        expenseModel
            .findAllExpenses()
            .then(
                function(expenses){
                    res.json(expenses);
                },
                function(err){
                    res.status (400).send(err);
                }
            );

    }

    function updateExpenseById(req, res){
        expenseModel
            .updateExpense(req.params.expenseId, req.params.expense)
            .then(
                function(expenses){
                    res.json(expenses);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

    function deleteExpenseById(req, res){
        expenseModel
            .deleteExpenseById(req.params.expenseId)
            .then(
                function(expenses){
                    res.json(expenses);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

};