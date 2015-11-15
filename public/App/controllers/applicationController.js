/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('applicationController', applicationController);

    applicationController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','ApplicantService','ApplicationService','GrantService','DTOptionsBuilder'];

    function applicationController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,ApplicantService,ApplicationService,GrantService,DTOptionsBuilder) {
        var application = this;
        application.appllications = {};
        $scope.grantApplication = {};

        /**
         * Applicant datatables
         * */
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);


        ApplicationService.GetAll().then(function(data){
            application.appllications  = data;
            $scope.appllications  = data;
        });

        application.grantLoan = function(grantApplication){
            grantApplication.applicant_id = $routeParams.applicant_id;
            grantApplication.application_id = $routeParams.id;
            console.log(grantApplication);
            GrantService.Create(grantApplication).then(function(resposne){

            },function(resposne){

            });
        }


        application.info = function(){
            if($routeParams.id){
                $scope.$watch('appllications',function(newValue,oldOne){
                    $scope.applicationInfo = $filter('filterById')($scope.appllications,$routeParams.id);

                });

            }
        }
        application.info();
    }

})();