/**
 * Created by leo on 11/14/15.
 */
(function () {
    'use strict';

    angular
        .module('microfinanceApp')
    .directive("info", function () {
        return {
            link: function (scope, element, attrs) {

                    scope.$watch('applicant',function(newValue,oldOne){
                        scope.applicant = newValue;
                    });
            },
            restrict: "E",
            scope: {
                applicant:'='
            },
            templateUrl:"public/App/directives/templates/info.html"
        }
    })
})();