/**
 * Created by Ilya Vinokurov on 9/22/14.
 */

angular.module('comp-scheduler').directive('schedulerDir', function (utilsService, resourceConst, dataService) {
	return {
		restrict: 'A',
		templateUrl: '../board/schedulerView.html',
		scope: {
			minHours: '@',
			maxHours: '@',
			events: '=',
			loadData: '&',
			onCreated: '&',
			getMoreInfo: '&'
		},
		link: function (scope, element, attrs, controllers) {
			scope.showNewDialog = false;
			scope.minHours = parseInt(scope.minHours) || 6;
			scope.maxHours = parseInt(scope.maxHours) || 24;
			scope.cursor = null;
			scope.currentWeek = utilsService.getWeek(new Date());
			scope.dayOfWeek = new Date().getDay() + 1;
			scope.selectedEvent = null;
			scope.dayNames = resourceConst.dayNames;
			scope.data = [];
			scope.hours = utilsService.buildHours(scope.minHours, scope.maxHours);
			scope.cells = (scope.maxHours - scope.minHours);
			scope.cellWidth = "width:" + (100 / (scope.cells + 2)) + '%';

			scope.$watch('events', function () {
				console.log('events.length changed');
				if (scope.events) {
					scope.cursor = utilsService.findCurrentWeek(scope.events, scope.currentWeek);
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
			scope.showNew = function () {
				scope.showNewDialog = true;
			};
			scope.createNewEvent = function (event, weeks) {
				scope.onCreated({event: event, weeks: weeks});
			};
			scope.onSelect = function (event) {
				scope.selectedEvent = event;
				if (scope.getMoreInfo) {
					scope.getMoreInfo({
						uEventId: event.uEventId,
						callback: function (moreInfo) {
							scope.selectedEvent.moreInfo = moreInfo;
						}
					});
				}
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