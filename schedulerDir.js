/**
 * Created by ilyavinokurov on 9/22/14.
 */

var dummyData = [
    {
        week: '14/9/2014-20/9/2014',
        days: [
            {
                name: 'יום שלישי',
                events: [
                    { id: '1',isSubscribed:true, title: 'This is number 1', duration: 2, start: 6.5, startTime: '06:30', endTime: '08:30' },
                ]
            }
        ]
    },
    {
        week: '21/9/2014-27/9/2014',
        days: [
            {
                name: 'יום ראשון',
                events: [
                    { id: '1',isSubscribed:false, title: 'This is number 1', duration: 13.5, start: 9, startTime: '09:00', endTime: '22:30' },
                    { id: '2',isSubscribed:false, title: 'This is number 2', duration: 1.5, start: 19.5, startTime: '19:30', endTime: '21:00' }
                ]
            },
            {
                name: 'יום שני',
                events: [
                    { id: '3',isSubscribed:false, title: 'This is number 3', duration: 2, start: 9, startTime: '09:00', endTime: '10:00'  },
                    { id: '4',isSubscribed:false, title: 'This is number 4', duration: 1.5, start: 8, startTime: '08:00', endTime: '09:30'}
                ]
            },
            {
                name: 'יום שלישי',
                events: [
                    { id: '1',isSubscribed:false, title: 'This is number 1', duration: 2, start: 6.5, startTime: '06:30', endTime: '08:30' },
                    { id: '2',isSubscribed:true, title: 'This is number 2', duration: 1.5, start: 7, startTime: '07:00', endTime: '08:30' },
                    { id: '2',isSubscribed:false, title: 'This is number 2', duration: 1.5, start: 19.5, startTime: '19:30', endTime: '21:00' }
                ]
            }
        ]
    },
    {
        week: '28/9/2014-4/10/2014',
        days: [
            {
                name: 'יום ראשון',
                events: [
                    { id: '1', title: 'This is number 1', duration: 2, start: 6.5, startTime: '06:30', endTime: '08:30' }
                ]
            },
            {
                name: 'יום שני',
                events: [
                    { id: '3', title: 'This is number 3', duration: 2, start: 9, startTime: '09:00', endTime: '10:00'  }
                ]
            },
            {
                name: 'יום שלישי',
                events: [
                    { id: '1', title: 'This is number 1', duration: 2, start: 6.5, startTime: '06:30', endTime: '08:30' },
                ]
            }
        ]
    }
];

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
        var res = start.getDate().toString() + '/' + (start.getMonth() + 1).toString()  + '/' + start.getFullYear().toString() + "-" +
            end.getDate().toString()  + '/' + (end.getMonth() + 1).toString()  + '/' + end.getFullYear().toString();
        console.log(res);
        return res;
    }

    return {
        restrict: 'A',
        templateUrl: 'scheduler.html',
        link: function (scope, element, attrs, controllers) {
            scope.start = 6;
            scope.end = 24;
            scope.cursor = 0;

            angular.forEach(dummyData, function (week, i) {
                if (week.week == getWeek(new Date())) {
                    scope.cursor = i;
                }
            });
            scope.allEvents=dummyData;
            scope.data = dummyData[scope.cursor];

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

            scope.nextWeek = function () {
                scope.cursor++;
                scope.data = dummyData[scope.cursor];
            }
            scope.prevWeek = function () {
                scope.cursor--;
                scope.data = dummyData[scope.cursor];
            }
        }
    };
});