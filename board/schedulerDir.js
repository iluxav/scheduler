/**
 * Created by Ilya Vinokurov on 9/22/14.
 */

angular.module('comp-scheduler').directive('schedulerDir', function (utilsService,resourceConst) {
    return {
        restrict: 'A',
        templateUrl: 'board/scheduler.html',
        scope: {
            minHours: '@',
            maxHours: '@',
            events: '='
        },
        link: function (scope, element, attrs, controllers) {
            scope.minHours = parseInt(scope.minHours) || 6;
            scope.maxHours = parseInt(scope.maxHours) || 24;
            scope.cursor = null;
            scope.currentWeek = utilsService.getWeek(new Date());
            scope.dayOfWeek = new Date().getDay();
            scope.selectedEvent = null;
            scope.dayNames = resourceConst.dayNames;
            scope.data = [];
            scope.hours = utilsService.buildHours(scope.minHours, scope.maxHours);
            scope.cells = (scope.maxHours - scope.minHours);
            scope.cellWidth = "width:" + (100 / (scope.cells + 2)) + '%';

            scope.$watch('events.length', function () {
                console.log('events.length changed');
                if (scope.events) {
                    if (!scope.cursor)
                        scope.cursor = utilsService.findCurrentWeek(scope.events,scope.currentWeek);
                    scope.data = scope.events[scope.cursor];
                }
            });
            scope.getCount = function (c) {
                return new Array(c);
            };
            scope.buildBlockStyle = function (event) {
                var start = utilsService.timeStringToFloat(event.startTime) - scope.minHours;
                return 'width:' + (utilsService.durationToFloat(event.duration) * 100) + '%; right: ' + ((start * 100)) + '%;';
            };
            scope.onSelect = function (event) {
                scope.selectedEvent = event;
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