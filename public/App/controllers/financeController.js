/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('financeController', financeController);

    financeController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','ApplicantService','ApplicationService','GrantService','FinanceService','DTOptionsBuilder'];

    function financeController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,ApplicantService,ApplicationService,GrantService,FinanceService,DTOptionsBuilder) {
        var finance = this;
        finance.finances = {};

        /**
         * Applicant datatables
         * */
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        finance.loadTransactions = function(){
            FinanceService.GetAll().then(function(data){
                finance.finances  = data;
                $scope.finances  = data;
            });

        }
        finance.loadTransactions();
        finance.saveTransactions = function(transaction){

            $scope.success = false;
            $scope.failure = false;
            if(transaction){
                $scope.current = transaction;
                FinanceService.Create(transaction).then(function(respense){
                    if(respense=="success"){
                        $scope.transactionOb = null;
                        $scope.success = true;
                        $scope.failure = false;
                        finance.loadTransactions();
                        $timeout(function () {
                            $scope.transactionOb = null;
                            $scope.success = false;
                            $scope.failure = false;
                        }, 1000);
                    }
                },function(respense){
                    $scope.failure = true;
                    $scope.success = false;
                    $timeout(function () {
                        $scope.success = false;
                        $scope.failure = false;
                    }, 1000);
                });
            }
        }

        $scope.edit_transaction = false;
        $scope.add_transaction = true;
        finance.editTransaction = function(id){
            $scope.edit_transaction = true;
            $scope.add_transaction = false;
            $scope.transaction_to_edit = $filter('filterById')($scope.finances,id);
            console.log(id);
        }
        finance.updateTransaction = function(expenses){

            FinanceService.Update(expenses).then(function(response){
                if(response=="success"){
                    finance.loadTransactions();
                    $scope.edit_transaction = false;
                    $scope.add_transaction = true
                }
            },function(){

            });
        }
        finance.deleteTransaction = function(id){
            FinanceService.Delete(id).then(function(response){
                if(response=="success"){
                    finance.loadTransactions();
                    $scope.edit_transaction = false;
                    $scope.add_transaction = true
                }
            },function(){

            });

        }


        finance.info = function(){
            if($routeParams.id){
                $scope.$watch('finances',function(newValue,oldOne){
                    $scope.financeInfo = $filter('filterById')($scope.finances,$routeParams.id);

                });

            }
        }
        finance.info();
    }

})();