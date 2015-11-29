/**
 * Created by leo on 11/25/15.
 */

(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('UtilityService', UtilityService);

    UtilityService.$inject = ['$http'];
    function UtilityService($http) {
        var service = {};
        service.DateReformatt = DateReformatt;
        service.DateToTimestamp = DateToTimestamp;
        service.getApplicantName = getApplicantName;
        return service;
        function DateReformatt(date){
            return date.replace(date.substr(-9),"");
        }

        function DateToTimestamp(date){
            var newdate = new Date(date);
            return newdate.getTime();
        }

            function getApplicantName(applicant_id,applicants){
                var applicant = "";
                angular.forEach(applicants,function(value,index){
                    if(value.id==applicant_id){
                        applicant = value.first_name+" "+value.last_name;
                    }
                });
                return applicant;

        }
    }
})();
