
/**
 * This is the  microfinance application dashboard controller
 * Created by leo on 11/10/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('dashboardController', dashboardController);

    mainController.$inject = ['$scope','ApplicantService'];

    function dashboardController($scope,ApplicantService) {
        var date = new Date();
        $scope.currentYear  = date.getFullYear();

        $scope.totalApplicatnts = 0;
        $scope.grantedApplicatnts = 0;
        $scope.finisheddApplicatnts = 0;
        $scope.deniedddApplicatnts = 0;
        // get all applicant this year
        ApplicantService.GetApplicantYearly(2015).then(function(data){
            console.log(data);
            $scope.totalApplicatnts = getTotalApplicants(data);
            $scope.grantedApplicatnts = getGrantedApplicatnts(data);
            $scope.deniedddApplicatnts = getDeniedApplicatnts(data);
            var pieseries =  [{
                type: 'pie',
                colorByPoint: true,
                name:"Distribution",data:[{name:"Applied",y:$scope.totalApplicatnts},{name:"Granted",y:$scope.grantedApplicatnts},{name:"Finished",y:$scope.finisheddApplicatnts},{name:"denied",y:$scope.deniedddApplicatnts}]
            }]

            var lineseries = prepareLineSeries(data);
            var categories =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            drawPie(pieseries);
            drawline(lineseries,categories);

        });

        function getTotalApplicants(data){
            return data.length;
        }

        function prepareLineSeries(data){
            var months = "";
            angular.forEach(data,function(value,index){
                console.log(value.created_at);
            });
           var series =  [{
                name: 'Applied',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Granted',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Paid',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'Denied',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }];


            return series;
        }

        function getDeniedApplicatnts(data){
            var countDenied = 0;
            angular.forEach(data,function(value,index){
                if(value.status=="denied"){
                    countDenied++;
                }

            });
            return countDenied;
        }
        function getGrantedApplicatnts(data){
            var countGranted = 0;
            angular.forEach(data,function(value,index){
                if(value.status=="granted"){
                    countGranted++;
                }

            });
            return countGranted;
        }
        function drawPie(series){


        $scope.chartConfigPie = {

        options: {
            chart: {
                type: 'pie'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            },pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series:series,
        title: {
            text: ''
        },
        loading: false,
        xAxis: {
            currentMin: 0,
            currentMax: 20,
            title: {text: 'values'}
        },
        useHighStocks: false,
        size: {
            width: 400,
            height: 300
        },
        func: function (chart) {
        }
    };
        }
        function drawline(lineseries,categories){


        $scope.chartConfigLine = {
            title: {
                text: '',
                x: -20 //center
            },
            //subtitle: {
            //    text: 'Source: WorldClimate.com',
            //    x: -20
            //},
            xAxis: {
                categories:categories
            },
            yAxis: {
                title: {
                    text: 'Number Of Applicants'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: lineseries
        };
        }

    }

})();
