(function (window, $, undefined) {
	"use strict";
	var oldkeeper1 = 0,
		oldkeeper2 = 0;

	var selectronLog = function (message, debugWindow) {
		var $dBug = (debugWindow ? $("#" + debugWindow) : $("#debug")),
			isDebug2 = (debugWindow ? true : false),
			curKeeper = new Date().getTime();


		if ($dBug.length < 1) {
			$("body").append("<div id=\"" + debugWindow + "\"></div>");
		}

		if(isDebug2) {
			if(curKeeper - oldkeeper2 > 200) {
				$dBug.empty();
				oldkeeper2 = curKeeper;
			}
		} else {
			if(curKeeper - oldkeeper1 > 200) {
				$dBug.empty();
				oldkeeper1 = curKeeper;
			}
		}

		$dBug.prepend("<p>" + message + "</p>");
	};

	// on DOM ready
	$(function () {
		var $selects = {};

		// for demo purposes
		$("#holder").append($("select"));
		$selects = $("select");
		$($selects).css("left", "0");
		$($selects[1]).css("top", "50px");
		//$("#holder").append($("select").css("opacity", "0.01"));

		// test events
		$("body").on("mousedown.selectron click.selectron.selectron focus.selectron blur.selectron change.selectron change.selectron", "select, a, option, .selectron, .selectronSelected, .selectron span", function (e) {
			selectronLog(e.type + "-ed: " + $(this)[0].tagName + " " + ($(this).attr("name") ? $(this).attr("name") : ""));
		});

		$("body").on("mousedown click focus blur change change", "select, a, option, .selectron, .selectronSelected, .selectron span", function (e) {
			selectronLog(e.type + "-ed: " + $(this)[0].tagName + " " + ($(this).attr("name") ? $(this).attr("name") : ""), "debug2");
		});
	});
}(window, jQuery));