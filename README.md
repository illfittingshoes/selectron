selectron
=========
###Accessible, configurable, (somewhat) lightweight <select> replacement

Uses the select element as the "model", passing along events to mimic native behavior *nearly* perfectly - opted against "close on scroll" because styled items tend to be larger than native ones.

One of the requirements for the select replacement was to keep accessibility as good as native. To that end, Selectron doesn't actually replace the <select>s, just hides them. This way we keep keyboard shortcuts & change events largely native rather than reinventing all the event/interaction wheels.

###Requires
* jQuery v1.8 or above
* "name" attribute on each <select> to replace

###Usage

HTML:

    <select name="someSelect">...</select>

    <select name="someOtherSelect">...</select>

    <select name="someSpecialSelect"  data-sel-options='{ "showAnimation" : {"opacity" : "show" }, "hideAnimation" : {"opacity" : "hide" }, "hideDuration" : 600, "showDuration" : 200 }'>...</select>

JavaScript:

    $(function){
        // all <select>s inside matched elements turn into selectrons
        $("body").selectron()

        // override one selectron with custom options
        var selectronConfig = {
            "inheritWidth": true,
            "showDuration": 100,
            "showEasing": "linear",
            "showCallback": function () {
                console.log("finished showing selectron");
            }
        }
        $("[name='someOtherSelect']").selectron(selectronConfig)
    });

Depending on your CSS, IE9 and earlier users may experience a brief flash of style when they click on the select. This proved unavoidable with the select element bound to the replacement like is needed, due to a horrible event quirk in Old IE

###Documentation

Documentation is in selectron.html, but maybe somewhat unreliable as it hasn't been updated in some time.

Features I'd like to add/see added:

1. Add opt group support
2. Bulletproof devices support 
 * Option to use selectron or native
3. Add multi-select support
4. Lightweight IE10+ version
5. Even lighter-weight few-featured version

###Notes
I meant to share this for a while, but never got around to cleaning it up. Nevertheless here it is, because it's still better than what I found when I last needed one.