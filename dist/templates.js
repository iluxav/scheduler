angular.module('templates-main', ['../board/schedulerView.html', '../eventInfo/eventInfoView.html', '../newEvent/newEventView.html']);

angular.module("../board/schedulerView.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../board/schedulerView.html",
    "<div class=\"scheduler-wrapper\">\n" +
    "\n" +
    "\n" +
    "    <div event-info\n" +
    "         selected-event=\"selectedEvent\"\n" +
    "         min-hours=\"{{minHours}}\"\n" +
    "         max-hours=\"{{maxHours}}\">\n" +
    "    </div>\n" +
    "    <div new-event\n" +
    "         create-new-event=\"createNewEvent(event,weeks)\"\n" +
    "         min-hours=\"{{minHours}}\"\n" +
    "         max-hours=\"{{maxHours}}\"\n" +
    "         show-new-dialog=\"showNewDialog\">\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"scheduler-wrapper-menu\">\n" +
    "        <div class=\"scheduler-wrapper-menu-left\">\n" +
    "            <a class=\"btn btn-default displayInline\" ng-click=\"prevWeek()\" ng-disabled=\"cursor==0\">\n" +
    "                <i class=\"glyphicon glyphicon-chevron-right\"></i>\n" +
    "            </a>\n" +
    "            <a class=\"btn btn-success displayInline\"  ng-click=\"showNew()\">\n" +
    "                <i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "                <span>צור אירוע חדש</span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"scheduler-wrapper-menu-mid\">\n" +
    "\n" +
    "            <b>{{data.week}}</b>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"scheduler-wrapper-menu-right\">\n" +
    "            <a class=\"btn btn-default displayInline\" ng-disabled=\"events.length-1==cursor\" ng-click=\"nextWeek()\">\n" +
    "                <i class=\"glyphicon glyphicon-chevron-left\"></i>\n" +
    "            </a>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <table class=\"table\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th style=\"{{cellWidth}}\"></th>\n" +
    "            <th style=\"{{cellWidth}}\" ng-repeat=\"hour in hours\">\n" +
    "                <div class=\"innerFrame hoursLabel\">\n" +
    "                    {{hour}}\n" +
    "                </div>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"day in data.days track by $index\"\n" +
    "            ng-class=\"{'today': dayOfWeek ==day.day && currentWeek==data.week}\">\n" +
    "            <td style=\"{{cellWidth}}\">{{dayNames[day.day]}}</td>\n" +
    "            <td style=\"{{cellWidth}}\">\n" +
    "                <div class=\"blockHolder\" ng-repeat=\"event in day.events track by $index\"\n" +
    "                     style=\"{{buildBlockStyle(event)}}\">\n" +
    "                    <div class=\"block\" ng-click=\"onSelect(event)\">\n" +
    "                        <div ng-show=\"event.isSubscribed\" class=\"scheduler-wrapper-menu-ok scheduler-wrapper-label\">\n" +
    "                            <i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "                        </div>\n" +
    "                        <span class=\"scheduler-wrapper-label-space-left scheduler-wrapper-label\">\n" +
    "                            {{event.maxAttendees}}\n" +
    "                        </span>\n" +
    "\n" +
    "                        <p class=\"scheduler-wrapper-block-content\">\n" +
    "                            <b>{{event.title}}</b><br>\n" +
    "                            <span>{{event.startTime}} - {{event.endTime}}</span><br>\n" +
    "                            <i>{{event.location}}</i>\n" +
    "                        </p>\n" +
    "\n" +
    "                        <p class=\"scheduler-wrapper-relative\">\n" +
    "                            <i class=\"glyphicon glyphicon-chevron-down scheduler-wrapper-label-down\"></i>\n" +
    "                            {{event.about}}\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td ng-repeat=\"h in getCount(hours.length-1) track by $index\" style=\"{{cellWidth}}\"></td>\n" +
    "\n" +
    "        </tr>\n" +
    "\n" +
    "\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("../eventInfo/eventInfoView.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../eventInfo/eventInfoView.html",
    "<div ng-show=\"selectedEvent\" class=\"scheduler-wrapper-overlay\"></div>\n" +
    "<div ng-show=\"selectedEvent\" class=\"modal scheduler-wrapper-popup\">\n" +
    "	<div class=\"modal-dialog\">\n" +
    "		<div class=\"modal-content\">\n" +
    "			<div class=\"modal-header\">\n" +
    "				<button type=\"button\" ng-click=\"close()\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span\n" +
    "						class=\"sr-only\">Close</span></button>\n" +
    "				<h4 class=\"modal-title\">{{selectedEvent.title}}</h4>\n" +
    "			</div>\n" +
    "			<div class=\"modal-body\">\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"col-md-4\">\n" +
    "						<ul>\n" +
    "							<li ng-repeat=\"ev in selectedEvent.moreInfo.events\">{{ev.title}}</li>\n" +
    "						</ul>\n" +
    "					</div>\n" +
    "					<div class=\"col-md-8\">\n" +
    "						<h3>{{selectedEvent.title}}</h3>\n" +
    "						<img ng-src=\"{{selectedEvent.img}}\" alt=\"\"/>\n" +
    "\n" +
    "						<p>\n" +
    "							{{selectedEvent.location}} <br>\n" +
    "						</p>\n" +
    "\n" +
    "						<p>\n" +
    "							{{selectedEvent.about}}\n" +
    "						</p>\n" +
    "\n" +
    "						<div class=\"panel panel-default\">\n" +
    "\n" +
    "							<div class=\"panel-body\">\n" +
    "								<p>\n" +
    "									<b>Admin View</b>\n" +
    "									<select ng-model=\"selectedEvent.startTime\">\n" +
    "										<option ng-repeat=\"h in hoursWithHalfs\" value=\"{{h}}\">{{h}}</option>\n" +
    "									</select>\n" +
    "									<input style=\"width: 40px;\" step=\"15\" type=\"number\"\n" +
    "									       ng-model=\"selectedEvent.duration.m\">\n" +
    "									<input style=\"width: 40px;\" type=\"number\" ng-model=\"selectedEvent.duration.h\">\n" +
    "								</p>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"modal-footer\">\n" +
    "				<button type=\"button\" ng-click=\"close()\" class=\"btn btn-default\">סגור</button>\n" +
    "				<button type=\"button\" ng-show=\"!selectedEvent.isSubscribed\" class=\"btn btn-primary\">הרשם לאירועה\n" +
    "				</button>\n" +
    "				<button type=\"button\" ng-show=\"selectedEvent.isSubscribed\" class=\"btn btn-warning\">בטל אירועה</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<!-- /.modal-content -->\n" +
    "	</div>\n" +
    "	<!-- /.modal-dialog -->\n" +
    "</div><!-- /.modal -->");
}]);

angular.module("../newEvent/newEventView.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../newEvent/newEventView.html",
    "<div ng-show=\"showNewDialog\" class=\"scheduler-wrapper-overlay\"></div>\n" +
    "<div ng-show=\"showNewDialog\" class=\"modal scheduler-wrapper-popup\">\n" +
    "	<div class=\"modal-dialog\">\n" +
    "		<div class=\"modal-content\">\n" +
    "			<form name=\"createNewEventForm\" ng-submit=\"create(createNewEventForm.$valid)\" novalidate>\n" +
    "				<div class=\"modal-header\">\n" +
    "					<button type=\"button\" ng-click=\"close()\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span\n" +
    "							class=\"sr-only\">Close</span></button>\n" +
    "					<h4 class=\"modal-title\">{{event.title}}</h4>\n" +
    "				</div>\n" +
    "				<div class=\"modal-body\">\n" +
    "					<div class=\"panel panel-default\">\n" +
    "						<div class=\"panel-body\">\n" +
    "							<h5>מתחיל</h5>\n" +
    "\n" +
    "							<div class=\"form-group\" ng-class=\"{'has-error': createNewEventForm.date.$invalid || createNewEventForm.startTime.$invalid}\">\n" +
    "								<input class=\"form-control mid\" required type=\"text\" name=\"date\" ng-model=\"date\"\n" +
    "								       id=\"datepicker\"/>\n" +
    "								<select class=\"form-control mid\" required ng-model=\"event.startTime\" name=\"startTime\">\n" +
    "									<option ng-repeat=\"h in hoursWithHalfs\" value=\"{{h}}\">{{h}}</option>\n" +
    "								</select>\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"form-group\" ng-class=\"{'has-error': createNewEventForm.occurrences.$invalid}\">\n" +
    "								<h5>כמות</h5>\n" +
    "								<input type=\"text\" ng-model=\"event.occurrences\" name=\"occurrences\" class=\"form-control small\" value=\"1\"\n" +
    "								       required=\"true\"/>\n" +
    "							</div>\n" +
    "							<div class=\"form-group\" ng-class=\"{'has-error': createNewEventForm.maxAttendees.$invalid}\">\n" +
    "								<h5>משתתפים כמות</h5>\n" +
    "								<input type=\"text\" ng-model=\"event.maxAttendees\" name=\"maxAttendees\" class=\"form-control small\" value=\"1\"\n" +
    "								       required=\"true\"/>\n" +
    "							</div>\n" +
    "							<div class=\"form-group\" ng-class=\"{'has-error': createNewEventForm.minutes.$invalid || createNewEventForm.hours.$invalid}\">\n" +
    "								<h5>כמה זמן?</h5>\n" +
    "								<input class=\"form-control small\" required step=\"15\" type=\"number\"\n" +
    "								       ng-model=\"event.duration.m\" name=\"minutes\">&nbsp;<span>:</span>&nbsp;\n" +
    "								<input class=\"form-control small\" required type=\"number\" name=\"hours\"\n" +
    "								       ng-model=\"event.duration.h\">\n" +
    "							</div>\n" +
    "							<div class=\"form-group\"  ng-class=\"{'has-error': createNewEventForm.title.$invalid}\">\n" +
    "								<textarea required class=\"form-control\" ng-model=\"event.title\" name=\"title\"></textarea>\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"form-group\">\n" +
    "								<textarea class=\"form-control\" rows=\"4\" ng-model=\"event.about\"></textarea>\n" +
    "							</div>\n" +
    "\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"modal-footer\">\n" +
    "					<button type=\"button\" ng-click=\"close()\" class=\"btn btn-default\">סגור</button>\n" +
    "					<button type=\"submit\" ng-click=\"create()\" class=\"btn btn-primary\">צור חדש</button>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "		</div>\n" +
    "		<!-- /.modal-content -->\n" +
    "	</div>\n" +
    "	<!-- /.modal-dialog -->\n" +
    "</div><!-- /.modal -->");
}]);
