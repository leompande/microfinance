/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('applicantController', applicantController);

    applicantController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','ApplicantService','ApplicationService','DTOptionsBuilder'];

    function applicantController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,ApplicantService,ApplicationService,DTOptionsBuilder) {
            var applicant = this;
            applicant.appllicants = {};
            $scope.hideFormToken = false;

        /**
         * Applicant datatables
         * */
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDisplayLength(10)
                .withOption('bLengthChange', true);

            applicant.loadApplicants = function(){
                ApplicantService.GetAll().then(function(data){
                    applicant.appllicants  = data;
                    $scope.applicants  = data;
                });
            }
            applicant.loadApplicants();


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

        applicant.saveLoanApplication = function(newApplication){
            $scope.applicant = null;
            $scope.success = false;
            $scope.failure = false;
            if(newApplication){
                newApplication.applicant_id = $routeParams.id;
                $scope.current = newApplication;
                ApplicationService.Create(newApplication).then(function(respense){
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

        applicant.updateLoanApplicant = function(updatedUpplicant){

            $scope.applicant = null;
            $scope.success = false;
            $scope.failure = false;
            if(updatedUpplicant){

                ApplicantService.Update(updatedUpplicant).then(function(respense){
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

        applicant.deleteLoanApplicant = function(application_id){
            ApplicantService.Delete(application_id).then(function(status){
                applicant.loadApplicants();
            },function(status){

            });
        }

        applicant.info = function(){
            if($routeParams.id){
                $scope.$watch('applicants',function(newValue,oldOne){
                    $scope.applicantInfo = $filter('filterById')($scope.applicants,$routeParams.id);

                        $scope.pendingApplication = $filter('pendingApplication')($scope.applicantInfo);

                    if($scope.pendingApplication=="no application"||$scope.pendingApplication){
                            $scope.hideFormToken = true;
                        }

                });

            }

        }
        applicant.info();
    }

})();