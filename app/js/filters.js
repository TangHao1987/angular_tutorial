/**
 * Created by tang.hao on 11/6/2015.
 */
angular.module('phonecatFilters', []).filter('checkmark', function(){
    return function(input){
        return input? '\u2713' : '\u2718';
    };
});
