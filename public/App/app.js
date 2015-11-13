/**
 * Instantiating the microfinanceApp module
 * Created by leo on 11/10/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp', ['ngRoute','ngCookies','datatables'])
        .config(applicationConfiguration);
    applicationConfiguration.$inject = ['$routeProvider'];
    function applicationConfiguration ($routeProvider) {


        // Now set up the whens
        $routeProvider
            .when('/home', {
                templateUrl: "public/App/partials/dashboard.html"
            })
            .when('/dashboard', {
                templateUrl: "public/App/partials/dashboard.html"
            })
            .when('/applicants', {
                templateUrl: "public/App/partials/applicants.html",
                controller:"applicantController"
            }).when('/applicants/add', {
                templateUrl: "public/App/partials/applicants/add.html",
                controller:"applicantController"
            }).when('/applicants/manage', {
                templateUrl: "public/App/partials/applicants/index.html",
                controller:"applicantController"
            })
            .when('/applicant/:id', {
                templateUrl: "public/App/partials/applicants/view.html",
                controller:"applicantController"
            })
            .when('/accounts', {

                templateUrl: "public/App/partials/applicants.html"
            }).when('/accounts/balance_sheet', {
                templateUrl: "public/App/partials/add_applicants.html"
            }).when('/settings/expenses', {
                 templateUrl: "public/App/partials/add_manage.html"
            }).when('/settings/loans', {
                templateUrl: "public/App/partials/add_manage.html"
            }).when('/settings/liabilities', {
                templateUrl: "public/App/partials/add_manage.html"
            })
            .when('/settings/assets', {
                templateUrl: "public/App/partials/add_manage.html"
            }).when('/users/add', {
                 templateUrl: "public/App/partials/add_manage.html"
            }).when('/users/manage', {
               templateUrl: "public/App/partials/add_manage.html"
            })
            .otherwise("/dashboard");
    }
})();
