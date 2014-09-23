/**
 * Created by ilyavinokurov on 9/22/14.
 */

var dummyData = {
    date: '21/11/2014',
    days: [
        {
            name: 'יום ראשון',
            events: [
                { id: '1', title: 'This is number 1', duration: 2, start: 6.5, startTime: '06:30', endTime: '08:30' },
                { id: '2', title: 'This is number 2', duration: 1.5, start: 19.5, startTime: '19:30', endTime: '21:00' }
            ]
        },
        {
            name: 'יום שני',
            events: [
                { id: '3', title: 'This is number 3', duration: 2, start: 9, startTime: '09:00', endTime: '10:00'  },
                { id: '4', title: 'This is number 4', duration: 1.5, start: 8 , startTime: '08:00', endTime: '09:30'}
            ]
        },
        {
            name: 'יום שלישי',
            events: [
                { id: '1', title: 'This is number 1', duration: 2, start: 6.5, startTime: '06:30', endTime: '08:30' },
                { id: '2', title: 'This is number 2', duration: 1.5, start: 7, startTime: '07:00', endTime: '08:30' },
                { id: '2', title: 'This is number 2', duration: 1.5, start: 19.5, startTime: '19:30', endTime: '21:00' }
            ]
        }
    ]
};

angular.module('app').directive('schedulerDir', function factory() {
    function buildHours(start, end) {
        var hours = [];
        for (var i = start; i <= end; i++) {
            hours.push(i + ":00");
        }
        return hours;
    }


    return {
        restrict: 'A',
        templateUrl: 'scheduler.html',
        link: function (scope, element, attrs, controllers) {
            scope.start = 6;
            scope.end = 24;
            scope.data = dummyData;
            scope.hours = buildHours(scope.start, scope.end);
            scope.cells = (scope.end - scope.start);
            scope.cellWidth = "width:" + (100 / (scope.cells + 2)) + '%';
            scope.getCount = function (c) {
                return new Array(c);
            };
            scope.buildBlockStyle = function (event) {
                var start = event.start - scope.start;
                return 'width:' + ((event.duration * 100) ) + '%; right: ' + ((start * 100)) + '%;';
            };
        }
    };
});