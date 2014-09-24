/**
 * Created by Ilya Vinokurov on 9/22/14.
 */



angular.module('app').directive('schedulerDir', function factory() {
    function buildHours(start, end) {
        var hours = [];
        for (var i = start; i <= end; i++) {
            hours.push((i < 10 ? "0" + i : i) + ":00");
        }
        return hours;
    }

    function buildHoursWithHalfs(start, end) {
        var hours = [];
        for (var i = start; i <= end; i++) {
            hours.push((i < 10 ? "0" + i : i) + ":00");
            hours.push((i < 10 ? "0" + i : i) + ":30");
        }
        return hours;
    }

    function floatToTime(val) {
        val = parseFloat(val);
        var mm = Math.floor((val % 1) * 60);
        var hh = Math.floor(val);
        mm = mm < 10 ? '0' + mm : mm;
        hh = hh < 10 ? '0' + hh : hh;
        return hh.toString() + ':' + mm.toString();
    }

    function timeStringToFloat(time) {
        var spl = time.split(':');
        var h = parseInt(spl[0]);
        var m = parseInt(spl[1]) / 60;
        return (h + m);
    }

    function durationToFloat(duration) {
        var durationFloat = parseInt(duration.h) + parseFloat(duration.m / 60);
        return durationFloat;
    }

    function getWeek(d) {
        d = new Date(d);
        var day = d.getDay();
        var diff = d.getDate() - day + (day == 0 ? -7 : 0); // adjust when day is sunday
        var newStartDate = d.setDate(diff);

        var start = new Date(newStartDate);
        var newEndDate = start.getDate() + 6;
        var newEndDate = new Date().setDate(newEndDate);
        var end = new Date(newEndDate);
        var res = start.getDate().toString() + '/' + (start.getMonth() + 1).toString() + '/' + start.getFullYear().toString() + "-" +
            end.getDate().toString() + '/' + (end.getMonth() + 1).toString() + '/' + end.getFullYear().toString();
        console.log(res);
        return res;
    }


    return {
        restrict: 'A',
        templateUrl: 'scheduler.html',
        scope: {
            minHours: '=',
            maxHours: '=',
            events: '='
        },
        link: function (scope, element, attrs, controllers) {
            scope.minHours = scope.minHours || 6;
            scope.maxHours = scope.maxHours || 24;
            scope.cursor = 0;
            scope.currentWeek = getWeek(new Date());
            scope.dayOfWeek = new Date().getDay();
            scope.selectedEvent = null;
            scope.dayNames=window.staticResources.localization.dayNames;
            scope.$watch('selectedEvent.duration.h', function (n, o) {
                if (!scope.selectedEvent)
                    return;
                if (validateHours(n)) {
                    computeProperties();
                } else {
                    scope.selectedEvent.duration.h = o;
                }
            });
            scope.$watch('selectedEvent.duration.m', function (n, o) {
                if (!scope.selectedEvent)
                    return;
                if (validateMinutes(n)) {
                    computeProperties();
                } else {
                    scope.selectedEvent.duration.m = o;
                }
            });


            function computeProperties() {
                var end = timeStringToFloat(scope.selectedEvent.startTime) + durationToFloat(scope.selectedEvent.duration);
                scope.selectedEvent.endTime = floatToTime(end);
            }

            function validateHours(h) {  return h < 25 && h > 0; }
            function validateMinutes(m) {  return m < 61 && m > -1; }

            angular.forEach(scope.events, function (week, i) {
                if (week.week == scope.currentWeek) {
                    scope.cursor = i;
                }
            });

            scope.data = scope.events[scope.cursor];

            scope.hours = buildHours(scope.minHours, scope.maxHours);
            scope.hoursWithHalfs = buildHoursWithHalfs(scope.minHours, scope.maxHours);
            scope.cells = (scope.maxHours - scope.minHours);
            scope.cellWidth = "width:" + (100 / (scope.cells + 2)) + '%';
            scope.getCount = function (c) {
                return new Array(c);
            };
            scope.buildBlockStyle = function (event) {
                var start = timeStringToFloat(event.startTime) - scope.minHours;
                return 'width:' + (durationToFloat(event.duration) * 100) + '%; right: ' + ((start * 100)) + '%;';
            };
            scope.onSelect = function (event) {
                scope.selectedEvent = event;
            };
            scope.deSelect = function () {
                scope.selectedEvent = null;
            };
            scope.nextWeek = function () {
                scope.cursor++;
                scope.data = scope.events[scope.cursor];
            }
            scope.prevWeek = function () {
                scope.cursor--;
                scope.data = scope.events[scope.cursor];
            }
        }
    };
});