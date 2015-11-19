/**
 * Created by leo on 11/14/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('capitalAccountController',capitalAccountController);

    capitalAccountController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','AssetService','LiabilityService','ExpensesService','FinanceService','CompanyService','DTOptionsBuilder'];

    function capitalAccountController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,AssetService,LiabilityService,ExpensesService,FinanceService,CompanyService,DTOptionsBuilder) {


    }

})();
