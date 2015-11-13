/**
 * Instantiating the microfinanceApp module
 * Created by leo on 11/10/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp', ['ui.router'])
        .config(applicationConfiguration);

    function applicationConfiguration ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/dashboard");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "public/App/partials/dashboard.html"
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "public/App/partials/dashboard.html"
            })
    }
})();
