/**
 * Created by Tiffanys on 3/23/16.
 */

module.exports = function(app, paymentRequestModel, expenseModel, eventModel) {
    app.post('/api/project/paymentRequest', createPaymentRequest);
    app.get('/api/project/paymentRequest', getPaymentRequests);
    app.get('/api/project/paymentRequest?requestId=:requestId', getPaymentRequestById);
    app.get('/api/project/paymentRequest?payerId=:payerId', getPaymentRequestsByPayerId);
    app.get('/api/project/paymentRequest?payerUsername=:username', getPaymentRequestsByPayerUsername);
    app.get('/api/project/event/:eventId/expense/:expenseId/paymentRequest', getPaymentRequestsByExpense);
    app.put('/api/project/paymentRequest/:requestId', updatePaymentRequestById);
    app.delete('/api/project/paymentRequest/:requestId', deletePaymentRequestById);

    function createPaymentRequest(req, res){
        var newPayment = req.body;
        var createdPayment;
        paymentRequestModel
        // Insert the new payment into the db
            .createPaymentRequest(newPayment)
            .then(
                function(payment){
                    // Set the payment globally
                    createdPayment = payment;
                    res.json(payment);
                    // Return the expense this payment corresponds to
                    return expenseModel.findExpenseById(payment.expenseId);
                },
                function(err){
                    res.status (400).send(err);
                }
            )

            // Now update corresponding expense w/ new payment
            .then(function(expense){
                    // Add expense id
                    expense.paymentRequestId.push(createdPayment._id);

                    // Update event in db
                    expenseModel
                        .updateExpense(createdPayment.expenseId, expense)
                        .then(
                            function(doc){
                                // Finally, return the newly created payment
                                res.json(createdPayment);
                            },
                            function(err){
                                res.status (400).send(err);
                            }
                        );
                },
                function(err){
                    res.status (400).send(err);
                });
    }

    function getPaymentRequests(req, res){
        if(req.query.requestId){
            getPaymentRequestById(req,res);
        }else if(req.query.payerId) {
            getPaymentRequestsByPayerId(req,res);
        }else if(req.query.payerUsername) {
            getPaymentRequestsByPayerUsername(req,res);
        }else{
            getAllPaymentRequests(req, res);
        }
    }

    function getPaymentRequestsByPayerUsername(req, res){
        var payerUsername = req.query.payerUsername;
        var localPayment,  localExpense, localEvent;
        var response = [];
        paymentRequestModel
            .findPaymentRequestByUsername(payerUsername)
            .lean()
            .then(function(payments){
                for(var i = 0; i < payments.length; i++){
                    localPayment = payments[i];
                    if(localPayment.paymentRequested && !localPayment.paymentCompleted)
                        return expenseModel.findExpenseById(localPayment.expenseId);
                }
            },
            function(err){
                res.status (400).send(err);
            })

          .then(function(expense){
                localExpense = expense;
                return eventModel.findEventById(localExpense.eventId);
            },
                function(err){
                    res.status (400).send(err);
                })

            .then(function(event) {
                localEvent = event;
                localPayment.payTo = localExpense.payeeUsername;
                localPayment.expenseTitle = localExpense.title;
                localPayment.eventTitle = localEvent.title;
                response.push(localPayment);
                res.json(response);
            },
                function(err){
                    res.status (400).send(err);
                });
    }

    function getPaymentRequestById(req, res){
        var requestId = req.query.requestId;
        paymentRequestModel
            .findPaymentRequestById(requestId)
            .then(
                function(payment){
                    res.json(payment);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

    function getPaymentRequestsByExpense(req, res){
        var expenseId = req.param.expenseId;
        paymentRequestModel
            .findPaymentRequestByExpenseId(expenseId)
            .then(
                function(payments){
                    res.json(payments);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

    function getPaymentRequestsByPayerId(req, res){
        var payerId = req.param.payerId;
        paymentRequestModel
            .findPaymentRequestByPayerId(payerId)
            .then(
                function(payments){
                    res.json(payments);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

    function getAllPaymentRequests(req, res){
        paymentRequestModel
            .findAllPaymentRequests()
            .then(
                function(payments){
                    res.json(payments);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }

    function updatePaymentRequestById(req, res){
        var updatePayment = req.body;
        console.log(updatePayment);
        console.log(req.params.requestId);
        paymentRequestModel
             .updatePaymentRequest(req.params.requestId, updatePayment)
             .then(
                 function(payments){
                     res.json(payments);
                 },
                 function(err){
                     res.status (400).send(err);
                 }
             );
    }

    function deletePaymentRequestById(req, res){
        paymentRequestModel
            .deletePaymentRequestById(req.params.requestId)
            .then(
                function(payments){
                    res.json(payments);
                },
                function(err){
                    res.status (400).send(err);
                }
            );
    }
};