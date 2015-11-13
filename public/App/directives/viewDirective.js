/**
 * Created by leo on 11/14/15.
 */
(function () {
    'use strict';

    angular
        .module('microfinanceApp')
    .directive("viewMore", function () {
        return {
            link: function (scope, element, attrs) {

            },
            restrict: "E",
            scope: true,
            templateUrl:"public/App/directives/templates/viewmore.html",
            transclude: true
        }
    })
})();