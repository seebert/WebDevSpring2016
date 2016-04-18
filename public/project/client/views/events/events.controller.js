/**
 * Created by Tiffanys on 3/3/16.
 */
(function(){
    angular
        .module("PaymentApp")
        .controller("EventsController", EventsController)
        .controller("EventListController", EventListController)
        .controller("EventDetailsController", EventDetailsController);

    function EventListController($scope, $location, EventsService, UserService){
        $scope.createEvent = createEvent;
        $scope.go = go;
        var currentUser = UserService.getCurrentUser();
        setScopeEvents();

        function setScopeEvents(){
            EventsService
                .findEventsByAdminId(currentUser._id)
                .then(function(response){
                    $scope.events = response.data;
                });
        }

        function createEvent(newEvent){
            newEvent.adminId = currentUser._id;
            EventsService
                .createEvent(newEvent)
                .then(function(response){
                    $scope.newEvent = null;
                    setScopeEvents()
                });
        }

        function go( path ) {
            console.log( path);
            $location.path( path );
        }

    }

    function EventDetailsController($scope, $q, $routeParams, EventsService, ExpensesService, PaymentRequestsService){
        $scope.createExpense = createExpense;
        $scope.createPaymentRequest = createPaymentRequest;
        $scope.updateEvent = updateEvent;
        $scope.selectedEvent = selectedEvent;
        $scope.selectExpense = selectExpense;
        $scope.requestPayments = requestPayments;
        var eventId = $routeParams.eventId;
        setScopeExpenses();

        function createExpense(newExpense){
            newExpense.eventId = eventId;
            ExpensesService
                .createExpense(newExpense)
                .then(function(response){
                    $scope.newExpense = null;
                    setScopeExpenses()
                });
        }

        function selectedEvent(event){
            $scope.selectedEvent = event;
            $scope.updateEvent.title = event.title;
            $scope.updateEvent.description = event.description;
        }

        function selectExpense(expense){
            $scope.selectedExpense = expense;
        }

        function updateEvent(origEvent, updateEvent){
            origEvent.title = updateEvent.title;
            origEvent.description = updateEvent.description;
            EventsService
                .updateEvent(origEvent._id, origEvent)
                .then(function(response){
                    $scope.updateEvent = null;
                    setScopeEvents()
                });
        }

        function createPaymentRequest(newPayment, expenseId){
            newPayment.expenseId = expenseId;
            PaymentRequestsService
                .createPaymentRequest(newPayment)
                .then(function(response){
                    $scope.newPayment = null;
                    setScopeExpenses()
                });
        }

        function requestPayments(expense){
            $scope.selectedExpense = expense;
            var requestAmount = expense.amountOwed / expense.paymentRequestId.length;
            for(i in expense.paymentRequestId){
                PaymentRequestsService
                    .findPaymentRequestById(expense.paymentRequestId[i])
                    .then(function(response){
                        var paymentRequest = response.data;
                        paymentRequest.amountOwed = requestAmount;
                        paymentRequest.paymentRequested = true;
                        PaymentRequestsService
                            .updatePaymentRequest(paymentRequest._id, paymentRequest);
                    })
                    .then(function(){
                        expense.paymentsRequested = true;
                        ExpensesService
                            .updateExpense(expense._id, expense)
                            .then(function(){
                                $scope.selectedExpense.message = "Payment requests sent!";
                            });
                    })
            }
        }


        function setScopeExpenses(){
            EventsService
                .findEventsById(eventId)
                .then(function(response){
                    $scope.event = response.data;
                    $scope.expenses = getExpensesById($scope.event.expenses);
                });
        }


        function getExpensesById(expensesId){
            var expenses = [];
            for(e in  expensesId){
                ExpensesService
                    .findExpenseById(expensesId[e])
                    .then(function(response){
                        var expense = response.data;
                        expense.amountPaid = 0;
                        getPaymentRequestInformation(expense.paymentRequestId)
                            .then(function(response){
                                var paymentRequests = response;
                                expense.paymentRequests = [];
                                for(var request in paymentRequests){
                                    if(paymentRequests[request]){
                                        expense.paymentRequests.push(paymentRequests[request]);
                                        if(paymentRequests[request].paymentCompleted){
                                            expense.amountPaid += paymentRequests[request].amountOwed;
                                        }
                                    }
                                }
                                expenses.push(expense);
                            });
                    });
            }

            return expenses;
        }

        function getPaymentRequestInformation(ids){
            var promises = [];
            var deferred = $q.defer();
            for(var i in ids){
                var promise = PaymentRequestsService
                    .findPaymentRequestById(ids[i])
                    .then(function(response){
                            return response.data;
                    });
                promises.push(promise);
            }

            $q.all(promises)
                .then(function(paymentRequests){
                    deferred.resolve(paymentRequests);
                });

            return deferred.promise;

        }
    }

    function EventsController($scope, EventsService){
        $scope.events = EventsService.findAllEvents(render);

        $scope.addEvent = addEvent;
        $scope.updateEvent = updateEvent;
        $scope.deleteEvent = deleteEvent;
        $scope.selectEvent = selectEvent;
        $scope.selectedEvent = selectedEvent;

        function addEvent(){
            var newEvent =
                {   title: $scope.event.title,
                    description: $scope.event.description,
                    adminId: $scope.event.adminId,
                    expenses: parseExpenses($scope.event.expenses)
                };

            newEvent = EventsService.createEvent(newEvent, render)

            if(!newEvent){
                $scope.error = "Event was not created";
            }

            $scope.event = EventsService.findAllEvents(render);
        }

        function updateEvent(){
            var newEvent = {
                _id: $scope.event._id,
                title: $scope.event.title,
                description: $scope.event.description,
                adminId: $scope.event.adminId,
                expenses: parseExpenses($scope.event.expenses)
            };

            var updatedEvent = EventsService.updateEvent($scope.event._id, newEvent, render)

            if(!updatedEvent){
                $scope.error = "Event was not updated";
            }else{
                $scope.message = "Event was successfully updated";
            }
        }

        function deleteEvent($index){
            var event = $scope.events[$index];
            EventsService.deleteEventById(event._id, render);

            $scope.events = EventsService.findAllEvents(render);
        }

        function selectEvent($index){
            var selectEvent = $scope.events[$index];
            var localEvent = {
                title: selectEvent.title,
                description: selectEvent.description,
                adminId: selectEvent.adminId,
                expenses: selectEvent.expenses,
                _id : selectEvent._id
            };
            $scope.event = localEvent;
        }

        function render(response){
            return response;
        }

        function parseExpenses(eArray){
            var expenses = eArray.split(",");
            for(e in expenses){
                expenses[e] = +expenses[e];
            }

            return expenses;
        }
    }
})();