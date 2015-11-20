/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('companyController', companyController);

    companyController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','ApplicantService','ApplicationService','CompanyService','companyProfitService','DTOptionsBuilder'];

    function companyController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,ApplicantService,ApplicationService,CompanyService,companyProfitService,DTOptionsBuilder) {
        var company = this;
        company.company = {};

        /**
         * Applicant datatables
         * */
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        company.loadProfit = function(){
            companyProfitService.GetAll().then(function(data){
                company.company   = data;
                $scope.company    = data[0];
                $scope.companyAcc = data[1];
                $scope.start_amount = data[0].amount;
            });
        }
        company.loadProfit();



        /**
         * Controlling the applicant registration form
         * */
        $scope.success = false;
        $scope.failure = false;
        $scope.message = "";
        $scope.current = null;
        $scope.edit = false;


        $scope.editStartCapital = function(){
            $scope.edit = true;
        }
        $scope.updateStartCapital = function(value){

            companyProfitService.Update({id:$scope.companyAcc.id,amount:value}).then(function(response){
                if(response=="success"){
                    company.loadProfit();
                    $scope.edit_transaction = false;
                    $scope.add_transaction = true
                }
            },function(){

            });
            $scope.edit = false;
        }




        /**
         * save form values
         * */
    }

})();