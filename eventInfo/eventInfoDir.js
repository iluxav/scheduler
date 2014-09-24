/**
 * Created by Ilya Vinokurov on 24/09/2014.
 */


angular.module('comp-scheduler').directive('eventInfo',function(utilsService){



    return {
       restrict: 'A',
       templateUrl: 'eventInfo/eventInfoView.html',
       scope: {
           selectedEvent:'=',
           minHours: '@',
           maxHours: '@'
       },
       link: function (scope, element, attrs, controllers) {


           scope.hoursWithHalfs = utilsService.buildHoursWithHalfs(parseInt(scope.minHours), parseInt(scope.maxHours));
           scope.$watch('selectedEvent', function (n, o) {
              if(!o){
                  console.log('stored');
                  scope.clonedEvent = angular.copy(scope.selectedEvent);
              }
           });
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
           scope.close = function () {
               scope.selectedEvent =null
           };

           scope.undo = function () {
               scope.selectedEvent.duration =  scope.clonedEvent.duration;
               scope.selectedEvent=null;
           };


           function computeProperties() {
               var end = utilsService.timeStringToFloat(scope.selectedEvent.startTime) + utilsService.durationToFloat(scope.selectedEvent.duration);
               scope.selectedEvent.endTime = utilsService.floatToTime(end);
           }

           function validateHours(h) {  return h < 25 && h > 0; }
           function validateMinutes(m) {  return m < 61 && m > -1; }


       }
   };
});

