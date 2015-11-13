/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('applicantController', applicantController);

    applicantController.$inject = ['$scope','$cookies','$timeout','$window','AuthenticationService','ApplicantService','DTOptionsBuilder'];

    function applicantController($scope,$cookies,$timeout,$window,AuthenticationService,ApplicantService,DTOptionsBuilder) {
            var applicant = this;
            applicant.appllicants = {};


        /**
         * Applicant datatables
         * */
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDisplayLength(10)
                .withOption('bLengthChange', false);


            ApplicantService.GetAll().then(function(data){
            applicant.appllicants  = data;
        });


        /**
         * Controlling the applicant registration form
         * */
        $scope.success = false;
        $scope.failure = false;
        $scope.message = "";
        $scope.current = null;

        /**
         * save form values
         * */
        applicant.save = function(applicant){
            $scope.applicant = null;
            $scope.success = false;
            $scope.failure = false;
            if(applicant){
                $scope.current = applicant;
                ApplicantService.Create(applicant).then(function(respense){
                    if(respense=="success"){
                        $scope.applicant = null;
                        $scope.success = true;
                        $scope.failure = false;

                        $timeout(function () {
                            $scope.applicant = null;
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
    }

})();