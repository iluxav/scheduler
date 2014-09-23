/**
 * Created by ilyavinokurov on 9/22/14.
 */



angular.module('app').directive('schedulerDir', function factory() {
    function buildHours(start, end) {
        var hours = [];
        for (var i = start; i <= end; i++) {
            hours.push(i + ":00");
        }
        return hours;
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
            scope.dayOfWeek=new Date().getDay();

            angular.forEach(scope.events, function (week, i) {
                if (week.week == scope.currentWeek) {
                    scope.cursor = i;
                }
            });

            scope.data = scope.events[scope.cursor];

            scope.hours = buildHours(scope.minHours, scope.maxHours);
            scope.cells = (scope.maxHours - scope.minHours);
            scope.cellWidth = "width:" + (100 / (scope.cells + 2)) + '%';
            scope.getCount = function (c) {
                return new Array(c);
            };
            scope.buildBlockStyle = function (event) {
                var start = event.start - scope.minHours;
                return 'width:' + ((event.duration * 100) ) + '%; right: ' + ((start * 100)) + '%;';
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