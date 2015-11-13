/**
 * This is the main microfinance application controller
 * Created by leo on 11/10/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope','$window','AuthenticationService','DTOptionsBuilder'];

    function mainController($scope,$window,AuthenticationService,DTOptionsBuilder) {
        $scope.isLogedIn = false;

    }

})();