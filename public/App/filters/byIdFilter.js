/**
 * Created by leo on 11/14/15.
 */
(function () {
    'use strict';

    angular
        .module('microfinanceApp')
.filter("filterById", function () {
    return function (input, id) {
        var newArry=null;
        if(angular.isDefined(input)){
            angular.forEach(input,function(value,index){
                if(value.id==id){
                    newArry = value;
                }
            });
        }

        return newArry;
    };
})
.filter("filterByType", function () {
    return function (input, type) {console.log(input);
        var newArry=[];
        if(angular.isDefined(input)){
            angular.forEach(input,function(value,index){
                //console.log(type);

                if(value.transaction_type==type){
                    newArry.push(value);
                }
            });
        }

        return newArry;
    };
})
.filter("latestReturn", function () {
    return function (input, id) {
        var objectArry=[];
        var datesArry=null;
        if(angular.isDefined(input)){
            angular.forEach(input,function(value,index){
                //if(value.date.length){
                //    datesArry.push(value.date);
                //    objectArry = value;
                //}
            });
        }

        return datesArry;
    };
})
.filter("filterApplicant", function () {
            return function (input,column_value) {
                var objectArry=[];
                if(angular.isDefined(input)){
                    angular.forEach(input,function(value,index){
                        if(value.applications.length>0){
                            var keepLoop = true;
                            angular.forEach(value.applications,function(innerValue,innerIndex){
                                if(innerValue.status==column_value&&keepLoop){
                                    objectArry.push(value);keepLoop=false;
                                }
                            });

                        }
                    });
                }

                return objectArry;
            };
        })
.filter("pendingApplication", function () {
            return function (input) {
                var objectArry=null;
                if(angular.isDefined(input)&&input!=null){
                    var done = false;
                    if(!done&&input.applications){
                        if(input.applications.length>0){
                            angular.forEach(input.applications,function(value,index){console.log(value)
                                if(value.status=="pending"){
                                    objectArry = index;done=true;console.log(input.applications);
                                }
                            });
                        }else{
                            objectArry = "no application";
                        }

                    }
                }

                return objectArry;
            };
        })
.filter("filterApplicantWithLoan", function () {
            return function (input) {
                var objectArry=[];
                if(angular.isDefined(input)){
                    angular.forEach(input,function(value,index){
                        if(value.grantedloans.length>0){
                            var keepLoop = true;
                                    objectArry.push(value);keepLoop=false;

                        }
                    });
                }

                return objectArry;
            };
        })
.filter("filterApplicantFinishedPayingLoan", function () {
            return function (input) {
                var objectArry=[];
                if(angular.isDefined(input)){
                    angular.forEach(input,function(value,index){
                        //if(value.grantedloans.length>0){
                        //    var keepLoop = true;
                        //    objectArry.push(value);keepLoop=false;
                        //
                        //}
                    });
                }

                return objectArry;
            };
        })
.filter("filterApplicationStatus", function () {
            return function (input,status) {
                var objectArry=[];
                if(angular.isDefined(input)){
                    angular.forEach(input,function(value,index){
                        if(value.status==status){
                            objectArry.push(value);

                        }
                    });
                }

                return objectArry;
            };
        });

})();