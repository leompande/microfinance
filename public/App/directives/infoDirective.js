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
                        if(scope.applicant){
                            var dates = [];
                            var ddt = [];
                                 angular.forEach(scope.applicant.loan_returns,function(value,index){
                                     var d = new Date(value.date);
                                     ddt.push(d+"");
                                     dates.push(d);
                                 });

                            var maxDate=new Date(Math.max.apply(null,dates));console.log(maxDate);
                            var large_date_index = ddt.indexOf(maxDate+"");
                            if(large_date_index<=-1){



                            }else{
                                scope.last_payment = scope.applicant.loan_returns[large_date_index];

                                var return_per_time = (parseInt(scope.applicant.grantedloans[0].loaned_amount)/parseInt(scope.applicant.grantedloans[0].return_interval)).toFixed(0);
                                var profit_per_return = parseInt(parseInt(scope.applicant.grantedloans[0].loaned_amount)*parseInt(scope.applicant.grantedloans[0].profit_percent)/100);
                                var amount_to_pay = parseInt(profit_per_return)+parseInt(return_per_time);
                                scope.amount_to_return = amount_to_pay;///parseInt(scope.applicant.grantedloans[0].return_interval)).toFixed(0)+parseInt(parseInt(scope.applicant.grantedloans[0].loaned_amount)*parseInt(scope.applicant.grantedloans[0].profit_percent)/100);

                            }

                        }

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