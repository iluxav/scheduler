/**
 * Created by Ilya Vinokurov on 24/09/2014.
 */


angular.module('comp-scheduler').directive('newEvent', function (utilsService) {


    return {
        restrict: 'A',
        templateUrl: '../newEvent/newEventView.html',
        scope: {
            createNewEvent: '&',
            showNewDialog: '=',
            minHours: '@',
            maxHours: '@'
        },
        controller: function ($scope) {
            $("#datepicker").datepicker();
            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.toggleMin = function () {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };
        },
        link: function (scope, element, attrs, controllers) {
            scope.hoursWithHalfs = utilsService.buildHoursWithHalfs(parseInt(scope.minHours), parseInt(scope.maxHours));
            scope.event = {};

            scope.create = function () {
                var endTimeFloat = utilsService.timeStringToFloat(scope.event.startTime) + utilsService.durationToFloat(scope.event.duration);
                scope.event.endTime = utilsService.floatToTime(endTimeFloat);
                var date = $("#datepicker").data();
                var selectedDate = new Date(date.datepicker.selectedYear, date.datepicker.selectedMonth, date.datepicker.selectedDay);
                scope.event.week = utilsService.getWeek(selectedDate);
                scope.event.weeks = utilsService.getWeeks(selectedDate,scope.event.occurrences);
                scope.createNewEvent({
                    event: {
                        day: selectedDate.getDay() + 1,
                        week: scope.event.week,
                        event: scope.event
                    }});
            }
            scope.close = function () {
                scope.showNewDialog = false;
            }

        }
    };
});

