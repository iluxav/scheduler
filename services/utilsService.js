/**
 * Created by Ilya Vinokurov on 24/09/2014.
 */


angular.module('comp-scheduler').factory('utilsService', function () {
    function buildHoursWithHalfs(start, end) {
        var hours = [];
        for (var i = start; i <= end; i++) {
            hours.push((i < 10 ? "0" + i : i) + ":00");
            hours.push((i < 10 ? "0" + i : i) + ":30");
        }
        return hours;
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

    function floatToTime(val) {
        val = parseFloat(val);
        var mm = Math.floor((val % 1) * 60);
        var hh = Math.floor(val);
        mm = mm < 10 ? '0' + mm : mm;
        hh = hh < 10 ? '0' + hh : hh;
        return hh.toString() + ':' + mm.toString();
    }

    function buildHours(start, end) {
        var hours = [];
        for (var i = start; i <= end; i++) {
            hours.push((i < 10 ? "0" + i : i) + ":00");
        }
        return hours;
    }

    function getWeek(d) {
        d = new Date(d);
        var day = d.getDay();
        var diff = d.getDate() - day; // adjust when day is sunday
        var newStartDate = d.setDate(diff);

        var start = new Date(newStartDate);
        var newEndDate = new Date(newStartDate);
        var newEnd = start.getDate() + 6;
        newEndDate.setDate(newEnd);
        var end = new Date(newEndDate);
        var res = start.getDate().toString() + '/' + (start.getMonth() + 1).toString() + '/' + start.getFullYear().toString() + "-" +
            end.getDate().toString() + '/' + (end.getMonth() + 1).toString() + '/' + end.getFullYear().toString();
        console.log(res);
        return res;
    }

    function getFirstDayOfWeekDate(d) {
        d = new Date(d);
        var day = d.getDay();
        var diff = d.getDate() - day; // adjust when day is sunday
        var newStartDate = d.setDate(diff);

        return new Date(newStartDate);
    }

    function getWeeks(date, numberOfOccurences) {
        var weeks = [];
        for (var i = 0; i < numberOfOccurences; i++) {
            date.setDate(date.getDate() + (i == 0 ? 0 : 7));
            weeks.push(getWeek(date));
        }
        return weeks;
    }

    function findCurrentWeek(events, currentWeek) {
        for (var i = 0; i <= events.length; i++) {
            var week = events[i];
            if (week.week == currentWeek) {
                return i;
            }
        }
        return 0;
    }

    return {
        buildHoursWithHalfs: buildHoursWithHalfs,
        timeStringToFloat: timeStringToFloat,
        durationToFloat: durationToFloat,
        floatToTime: floatToTime,
        buildHours: buildHours,
        getWeek: getWeek,
        getWeeks: getWeeks,
        findCurrentWeek: findCurrentWeek,
        getFirstDayOfWeekDate: getFirstDayOfWeekDate
    };
});
