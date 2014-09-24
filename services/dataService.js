/**
 * Created by Ilya Vinokurov on 24/09/2014.
 */
angular.module('comp-scheduler').factory('dataService', function ($http) {
    var get = function () {
          return $http.get('mock/data.json');
    };

    return {
        get: get
    };
});
