/**
 * Created by leo on 11/14/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('capitalAccountController',capitalAccountController);

    capitalAccountController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','companyProfitService','CompanyService','FinanceService','DTOptionsBuilder'];
    function capitalAccountController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,companyProfitService,CompanyService,FinanceService,DTOptionsBuilder) {
        $scope.capital = [];
        $scope.cash = [];
        var demo = {id: "2",source_id: "",source_type: "Accumulated Capital",amount: "0",created_by: "1",created_at: " ",updated_at: " "};
        $scope.currentC = demo;
        $scope.company = null;
        $scope.company = null;
        $scope.start_date = "";
        $scope.end_date = "";
        $scope.totalExpensesByDate = 0;
        $scope.capitalByDate = 0;
        $scope.totalLiabilityByDate = 0;
        $scope.totalLoanIssuedByDate = 0;
        $scope.totalLoanReceiptDate = 0;

        var capital = this;
        CompanyService.GetAll().then(function(data){
            $scope.company = data;
        });
        FinanceService.GetAll().then(function(data){
            $scope.cash = data;
            console.log(data);
        });

        capital.loadCapital = function(){
            companyProfitService.GetAll().then(function(data){
                $scope.capital = data;
            },function(response){});
        }


        $scope.currentCapital = function(){
            var dates = [$scope.start_date,$scope.end_date];
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
                            }else{

                            }

                        }else{
                            var today = new Date();
                            if(date.getTime()<=today.getTime()){
                                buffer.push(capVal);
                            }

                        }
                    });
                }
                if(buffer.length>0){
                    $scope.currentC = buffer[buffer.length-1];

                }
            });

        }
        capital.loadCapital();

        $scope.currentCapital([$scope.start_date,$scope.end_date]);

        $scope.cashAccount = function(){
            var dates = [$scope.start_date,$scope.end_date];
            $scope.$watch("cash",function(newOne,oldOne){
                if(angular.isDefined(newOne)){
                    var cash = "";
                        angular.forEach($scope.cash,function(cashVal,cashInd){console.log(cashVal);
                            var date = new Date(cashVal.created_at.replace(cashVal.created_at.substr(-9),""));
                            if(dates[0]!=""&&dates[1]!=""){

                                var timeOne = new Date(dates[0]);
                                var timeTwo = new Date(dates[1]);

                                if(timeOne.getTime()<=date.getTime()&&date.getTime()<=timeTwo.getTime()){

                                    if(cashVal.transaction_type=="Expenses"){

                                    }

                                    if(cashVal.transaction_type=="Liabilities"){

                                    }

                                }

                            }




                        //var cash = $filter('filterDate')($scope.cash,date);
                    });

                    if(cash){
                        $scope.cash = cash;
                        $scope.totalExpenses(cash);
                    }else{
                        if(dates[0]!=""||dates[1]!=""){
                            $scope.cash = demo;
                            $scope.totalExpenses(demo);
                        }

                    }

                }
            });

        }
        $scope.cashAccount();
        $scope.totalExpenses  = function(cash){

            angular.forEach(cash,function(value,index){

            });
        }


    }

})();
