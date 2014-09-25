/**
 * Created by Ilya Vinokurov on 24/09/2014.
 */
angular.module('comp-scheduler').factory('dataService', function ($http) {
    var cachedData = null;
    var addEvent = function (data, dayEvent) {
        var added = false;
        var weekExists = false;
        angular.forEach(data.events, function (value, i) {
            if (value.week == dayEvent.week) {
                weekExists = true;
                angular.forEach(value.days, function (day, dayIndex) {
                    if (day.day == dayEvent.day) {
                        added = true;
                        day.events.push(dayEvent.event);
                    }
                });
                if (!added) {
                    value.days.push({
                        day: dayEvent.day,
                        events: [dayEvent.event]
                    });
                }
            }
        });
        if (!weekExists) {
            data.events.push({
                week: dayEvent.week,
                days: [
                    {
                        day: dayEvent.day,
                        events: [dayEvent.event]
                    }
                ]
            });
        }
    };
    var get = function (callback) {
        if(cachedData){
            callback(cachedData);
            return;
        }
        $http.get('mock/data.json').success(function (data) {
            cachedData=data;
            callback(data);
        });
    };
    var create = function (dayEvent, callback) {
        $http.get('mock/data.json').success(function (data) {
            angular.forEach(dayEvent.event.weeks, function (week, key) {
                dayEvent.week = week;
                addEvent(data, dayEvent);
            });
            cachedData=data;
            callback(data);
        });
    };
    return {
        get: get,
        create: create
    };
});
