/**
 * Created by ilyavinokurov on 9/22/14.
 */

var dummyData = {
	date: '21/11/2014',
	days: [
		{
			name: 'Sunday',
			events: [
				{ id: '1', title: 'This is number 1', duration: 2, start: 6.5 },
				{ id: '2', title: 'This is number 2', duration: 1.5, start: 7 }
			]
		},
		{
			name: 'Monday',
			events: [
				{ id: '3', title: 'This is number 3', duration: 2, start: 9 },
				{ id: '4', title: 'This is number 4', duration: 1.5, start: 8 }
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
			scope.hours = buildHours(start, end);
			scope.cells = (end - start);
			scope.cellWidth = "width:" + (100 / (scope.cells + 2)) + '%';
			scope.getCount = function (c) {
				return new Array(c);
			};
			scope.buildBlockStyle = function (event) {
				var start =  event.start - scope.start;
				return 'width:' + ((event.duration * 100) + event.duration +2) + '%; right: ' + ((start * 100) + start +1) + '%;';
			};
		}
	};
});