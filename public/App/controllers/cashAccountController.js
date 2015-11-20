/**
 * Created by leo on 11/14/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('cashAccountController',cashAccountController);

    cashAccountController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','companyProfitService','CompanyService','FinanceService','DTOptionsBuilder'];
    function cashAccountController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,companyProfitService,CompanyService,FinanceService,DTOptionsBuilder) {
        $scope.cash = [];
        var demo = [{
            id: "3",
            transaction_type: "Expenses",
            expens_id: "1",
            liab_id: null,
            amount: "100",
            created_by: "",
            created_at: "0000-00-00 00:00:00",
            updated_at: "0000-00-00 00:00:00",
            expenses: {
                id: "1",
                name: "Fuel",
                created_by: "0",
                created_at: "0000-00-00 00:00:00",
                updated_at: "0000-00-00 00:00:00"
            },
            liabilities: null
        }];
        $scope.company = null;
        $scope.company = null;
        var initial_date = new Date();
        $scope.start_date = initial_date;
        $scope.end_date = initial_date;
        $scope.totalExpensesByDate = 0;
        $scope.capitalByDate = 0;
        $scope.totalLiabilityByDate = 0;
        $scope.totalLoanIssuedByDate = 0;
        $scope.totalLoanReceiptDate = 0;


        FinanceService.GetAll().then(function(data){
            $scope.cashAccount = data;
        });

        companyProfitService.GetAll().then(function(data){
            $scope.capital = data;
        });

        CompanyService.GetAll().then(function(data){
            $scope.company = data;
        });
        $scope.cashAccountFunction = function(){
            var dates = [$scope.start_date,$scope.end_date];
            var objects = [{name:'Expenses',amount:0},{name:'Liabilities',amount:0},{name:'Cash',amount:0}];
            $scope.$watch("cashAccount",function(newCash,oldCash){
                if(angular.isDefined(newCash)){
                    angular.forEach($scope.cashAccount,function(cashVal,cashInd){

                        var date = new Date(cashVal.created_at.replace(cashVal.created_at.substr(-9),""));
                            if(dates[0]!=""&&dates[1]!=""){

                                var timeOne = new Date(dates[0]);
                                var timeTwo = new Date(dates[1]);

                                if(timeOne.getTime()<=date.getTime()&&date.getTime()<=timeTwo.getTime()){

                                    if(cashVal.transaction_type=="Expenses"){
                                        objects[0].amount+=parseFloat(cashVal.amount);
                                    }

                                    if(cashVal.transaction_type=="Liabilities"){
                                        objects[1].amount+=parseFloat(cashVal.amount);
                                    }

                                }

                            }

                    });

                }
            });

            $scope.$watch("capital",function(newCapital,oldCapital){
                var buffer = [];
                if(angular.isDefined(newCapital)) {
                    angular.forEach($scope.capital, function (capVal, capInd) {
                        var date = new Date(capVal.created_at.replace(capVal.created_at.substr(-9),""));
                        if(dates[0]!=""&&dates[1]!=""){

                            var timeOne = new Date(dates[0]);
                            var timeTwo = new Date(dates[1]);

                            if(timeOne.getTime()<=date.getTime()&&date.getTime()<=timeTwo.getTime()){
                                buffer.push(capVal);
                            }

                        }
                    });
                }
                if(buffer.length>0){
                    var capital = buffer[buffer.length-1];
                    objects[2].amount = parseFloat(capital.amount);

                }
            });
            $scope.cash = objects;
        }


        $scope.cashAccountFunction();
        $scope.totalExpensesByDate  = function(cash){

            angular.forEach(cash,function(value,index){

            });
        }
        $scope.capitalByDate  = function(cash){

            angular.forEach(cash,function(value,index){

            });
        }
        $scope.totalLiabilityByDate  = function(cash){

            angular.forEach(cash,function(value,index){

            });
        }
        $scope.totalLoanIssuedByDate  = function(cash){

            angular.forEach(cash,function(value,index){

            });
        }
        $scope.totalLoanReceiptDate  = function(cash){

            angular.forEach(cash,function(value,index){

            });
        }


    }

})();
