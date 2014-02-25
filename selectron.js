/*!
* Selectron: Accessible, lightweight <select> replacement
    * @requires jQuery v1.8 or above
    *
    * https://github.com/illfittingshoes/selectron
    *
    * Copyright (c) 2012-2013 Joey Shirley
    * Dual licensed under the MIT and GPL licenses:
    * http://www.opensource.org/licenses/mit-license.php
    * http://www.gnu.org/licenses/gpl.html
    * Version: 0.5.3
    *
    * Uses: 'Highly configurable' mutable plugin boilerplate
    * http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
    * Author: @markdalgleish
    * Further changes, comments: @addyosmani
    * Licensed under the MIT license
    */
/*
* CHANGELOG
    *
    * Version: 0.1.0
    * 2012/02/17
    * - First working version
    *
    * Version: 0.1.1
    * 2012/02/20
    * - Changed div class "selectronInner" to "selectron__listWrapper"
    * - Added empty div before selectron__list
    *   - empty div allows for absolutely positioned "bridge" element between
    *     placeholder and list (useful for placeholders with rounded corners)
    * - Added span wrapper inside each list item for additional style options
    *
    * TODONE: Clean up (dear god...), restructure to jQuery standards
    *
    * Version: 0.2.0
    * - Changed .selectron__selected from <a> to <div>
    * - Removed .hidden class and added .selectron--shown class in order to prevent conflicts
    *   from boilerplate "hidden" behavior (specifically html5boilerplate.com). It
    *   also makes sense because it's hidden by default
    * - Moved .selectron--shown/.selectron--showing/.hiding from .selectron__selected
    *       to .selectron container
    * - Reorganized to "highly configurable mutable plugin" style
    * - Mimic native controls by maxing viewable Selectrons to 1 at a time
    * - Ensured .selectron would never be display:inline, by detecting if
    *   original <select> is display:inline, and setting to inline-block instead
    * - Added "selectron" namespace to events
    * - Abstracted event handlers from behavior, to prepare for keyboard support
    *
    * TODONE: Make each select uniquely customizable
    * TODONE: Add custom animation support
    *
    * Version: 0.2.1
    * - Fixed show/hide inconsistency bugs by cleaning up deselectAll event handler
    * - Implemented custom options
    *
    * Version: 0.2.2
    * 2012/03/02
    * - Renamed to Selectron
    *
    * TODONE: Keyboard/Accessibility
    *
    * Version: 0.3.0
    * 2012/03/07
    * - Added full keyboard support
    * - Changed main .selectron element from <div> to <span>
    *   for IE 7 display:inline-block bug that only applies inline-block
    *   to elements that are natively inline
    * - Changed <select> event handling from binding to delegation
    *   to support dynamically created <select> elements
    * - Intentionally departed from <select> behavior
    *   by NOT hiding the list on mousewheel scrolling
    *
    * TODONE: Documentation
    * TODONE: Performance - leverage $.data() to store <select> and Selectron info
    * TODONE: Add support for easingSpecial property for show/hide
    *
    * Version 0.3.1
    * 2012/03/08 - 2012/03/12 (should've been 0.4.0 at some point)
    * - Removed whitespace conversion to "&nbsp;", handling in CSS
    *   (broke html <option> labels)
    * - Added documentation to Demo page
    * - Fixed CSS vertical align for display:inline-block
    * - Increased responsiveness on keyboard-changed options by
    *   adding 1ms delay before updating selected item
    * - Fixed HTML option labels
    * - Added support for easingSpecial property for show/hide
    *
    * TODONE: Account for selects that are selectron'd
    *   multiple times (for customization?)
    *   (e.g. $(".sel1AndFriendsAreInHere").selectron(); $("#sel1").selectron();)
    *
    * Version 0.5.0
    * 2012/03/14
    * - Added new config option "preShow" - a function that runs before
    *   the "show list" animation
    *   - previously, every animation had to include a width, height, or opacity
    *       property with a "show/hide" keyword as the value, because $.animation()
    *       doesn't automatically add/remove "display:none" like $.slideUp() etc.
    * - Allowed selectrons to be targeted multiple times for config extension
    *   e.g.:   $("body").selectron(); // selectrons all <select> controls
    *           $("select[name=otherSelect]").selectron({
    *               "preShow": function () { console.log("hello preshow"); } });
    * - Updated demo page to include example above
    * - Updated demo page include a default-selected option on the first <select>
    * - Added dates to versions & URL to plugin boilerplate
    *
    * Version 0.5.1
    * 2012/04/11
    *
    * - Now always hides list on Esc keydown,
    *       even if the original <select> wasn't current focus
    * - Now hides list on focusout event
    *
    * Version 0.5.2 (NW)
    * 2012/05/18
    *
    *   - Width improvements:
    *       - Pure CSS by default
    *       - New Option: autoWidth [true | false]
    *           - override all CSS widths
    *           - take as much space as needed by the content
    *       - New Option: inheritWidth [true | false]
    *           - use the width of the original select element
    *   - originally undocumented:
    *       - Wrap selected option in span on selectron build
    *           - Buggy implementation of desired effect, needs to be redone
    *       - Pass in additional "global" variables for linting
    *       - iPad support:
    *           - Check UA
    *           - If iPad, hide original <select> using display:none.
    *               otherwise, left:-9999em
    *           - Half-assed, slightly wrong, only one platform; needs to be redone
    *
    * Version 0.5.3 (NW)
    * 2012/10/31
    *
    *   - Fixed mousedown event handleres to support jQuery 1.8.x
    *       - might now be broken in jQuery 1.7.x, untested
    *
    * Version 0.6.0
    * 2012/12/11 - 2012/12/28
    *
    *   - Converted indenting from tabs to spaces
    *   - Added blank lines for readability,
    *       especially for line comments & code blocks
    *   - Streamlined click events
    *   - reflectStatus:
    *       - removed keydown/keyup events
    *           (redundant to "change" event - explained in code)
    *       - consolidated if/else if statements
    *   - Name changegs:
    *       "reflectChange" to "reflectStatus"
    *           - to indicate that it includesfocus/blur,
    *               not just "change" event
    *       "stopEverything" to "stopEvent"
    *           - to be more descriptive
    *       "changeSelected" to "clickChange"
    *           - to indicate click-only nature
    *
    *   TODONE: Fix HTML option label image flicker in Chrome
    *       (Webkit? Hotlinked-only?)
    *       - no longer reproducible
    *
    *
    *   - Future TODO -
    *   1. Add opt group support
    *   2. Bulletproof devices support
    *   3. Add multi-select support

    - General & Documentation TODO -
    - more examples, as the page goes along, illustrating various options and their implementations
    - define what options can be set in HTML data-sel-options attribute, and what must be JS
    - create css-only option (possibly default)?
    - Solidify current branch for Old IE, then drop IE7 support in
    -   next version (with removal of IE7 bridge element)
    */

// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.
; (function ($, window, undefined) {
    "use strict";

    // our plugin constructor
    var Selectron = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.ua = navigator.userAgent;
        this.isIpad = /iPad/i.test(this.ua) || /iPhone OS 3_1_2/i.test(this.ua) || /iPhone OS 3_2_2/i.test(this.ua);

        // Pull in any inline options from HTML data-sel-options attribute
        // on targeted <select> element(s)
        this.metadata = this.$elem.data("selectron");
    };

    // the plugin prototype
    Selectron.prototype = {
        defaults: {
            "delegate": "html",
            "autoWidth": true,
            "inheritWidth": false,
            "inheritPosition": false,
            "classes": "",
            "style": "",
            "listStyle": "",

            // Animation
            "cssAnimationOnly": false,
            "showAnimation": {
                "height": "show"
            },
            "hideAnimation": {
                "height": "hide"
            },
            "showDuration": 300,
            "showEasing": "swing",
            "showSpecialEasing": null,
            "showStep": null,
            "preShow": null,
            "showCallback": null,
            "hideDuration": 300,
            "hideEasing": "swing",
            "hideSpecialEasing": null,
            "hideStep": null,
            "hideCallback": null
        },

        init: function () {
            // Introduce defaults that can be extended either
            // globally or using an object literal.
            this.config = $.extend({}, this.defaults, this.options,
                this.metadata);
            
            this.$elem.data("selectronConfig", this.config);

            this.buildSelectron(this.elem);
            
            this.addHandlers(this.config);
            
            return this;
        },

        /*
        ********
        *   Setup
        ********
        */

        createNewSelectron: function($select) {
            var optionsMap = $select.children("option").map(function (index) {
                    return {
                        label: $(this).attr("data-label") || $(this).text(),
                        selected: ($(this).prop("selected") ? true : false),
                        optIndex: index
                    };
                }),

                selectName = $select.attr("name"),
                selectedIndex = $select[0].selectedIndex,
                selectedOption = (selectedIndex ? optionsMap[selectedIndex].label : ("<div class=\"selectron__selected__inner\">" + optionsMap[selectedIndex].label + "</div>")),

                // Opening HTML
                selectronHtml = "<div class=\"selectron\" data-select=\"" + selectName + "\">" +
                    "<div class=\"selectron__selected\">" + selectedOption +
                        "<span class=\"selectron__selected__indicator\"></span></div>" +
                    "<div class=\"selectron__listWrapper\">" +
                    "<ul class=\"selectron__list\">";

            $select.data("optionLabels", []);

            // populate list
            $.each(optionsMap, function () {
                var selected = (this.selected ? " selectron__li--selected" : "");
                // Option List Item HTML
                selectronHtml += "<li class=\"selectron__li" + selected + "\" data-index=\"" +
                    this.optIndex + "\"><span class=\"selectron__li__inner\">" + this.label +
                    "</span></li>";
                $select.data("optionLabels")[this.optIndex] = this.label;
            });

            // finish Selectron HTML
            selectronHtml += "</ul>" +
                        "</div>" +
                        "</div>";

            return $(selectronHtml);
        },

        getSelectCss: function($select, selOpts) {
            var selectCss = {};
                
            if(selOpts.inheritPosition) {
                // convert any inline select to inline-block selectron
                selectCss.display = ($select.css("display") === "inline") ? "inline-block" : $select.css("display");
                selectCss.position = $select.css("position");
            }

            return selectCss;
        },

        applyOptions: function($selectron, $select, selOpts, selectCss) {
            function getWidestWidth($selectron, $select) {
                var labelWidth = 0,
                    listWidth = 0,
                    borderLeft = 0,
                    borderRight = 0,
                    listBorderLeft = 0,
                    listBorderRight = 0,
                    $selClone = $selectron.clone().css("visibility", "hidden"),
                    $selCloneList = $selClone.find(".selectron__list");

                $selClone.css("width", "auto");
                $selClone.find(".selectron__list").css("display","block");
                $selClone.find("*").css("width", "auto");

                $select.after($selClone);
                
                listBorderLeft = parseInt($selCloneList.css("border-left-width"), 10);
                listBorderRight = parseInt($selCloneList.css("border-right-width"), 10);
                listWidth = $selCloneList.width() + listBorderLeft + listBorderRight;
                
                $selClone.remove();
                return (labelWidth > listWidth) ? labelWidth : listWidth;
            }

            if(selOpts.classes.length > 0) {
                $selectron.addClass(selOpts.classes);
            }

            if(selOpts.style.length > 0) {
                $selectron.attr("style", $selectron.attr("style") + "; " + selOpts.style);
            }

            if(selOpts.listStyle.length > 0) {
                $selectron.find(".selectron__list").attr("style", $selectron.attr("style") + "; " + selOpts.listStyle);
            }

            $selectron.css(selectCss);

            // inherited trumps auto if both width settings are true
            if(selOpts.inheritWidth) {
                $selectron.width($select.width());
            } else if(selOpts.autoWidth) {
                $selectron.width(getWidestWidth($selectron, $select));
            }
        },

        buildSelectron: function (select) {
            var $select = $(select),
                selectName = $select.attr("name"),

                // load in any existing selectron config
                selOpts = $select.data().selectronConfig,

                // create HTML, store options in select element data
                $newSelectron = this.createNewSelectron($select),

                $newSelectronClone = {},
                $newSelectronCloneList = {},

                // only set display & position CSS if set to "inheritPosition"
                selectCss = this.getSelectCss($select, selOpts);

            this.applyOptions($newSelectron, $select, selOpts, selectCss);
            
            // add Selectron to page
            $select.after($newSelectron);

            // hide original select
            $select.css({ "position": "absolute", "left": "-9999em", "display": (this.isIpad ? "none" : $select.css("display")) });
        },

        /*
        **************
        *   Show & Hide
        **************
        */

        /*
        *   show one selectron dropdown list
        *   @curSelectron = .selectron element
        *
        *   the list passed must not be shown or being shown
        */
        showList: function (curSelectron) {
            var $curSelectron = $(curSelectron),
                $list = $curSelectron.find(".selectron__list"),
                opts = $("select[name=" + $curSelectron.attr("data-select") + "]").data().selectronConfig,
                showOpts = {
                    "duration": opts.showDuration,
                    "easing": opts.showEasing,
                    "complete": function () {
                        $curSelectron.removeClass("selectron--showing");
                        if(opts.showCallback) {
                            opts.showCallback.call(curSelectron);
                        }
                    }
                };

            if (opts.showSpecialEasing) {
                showOpts.specialEasing = opts.showSpecialEasing;
            }

            $curSelectron.stop().removeClass("selectron--hiding");

            if(opts.preShow) {
                opts.preShow.call(curSelectron);
            }

            $curSelectron.addClass("selectron--shown selectron--showing");

            if(opts.cssAnimationOnly) {
                setTimeout(function(){ showOpts.complete(); }, showOpts.duration);
            } else {
                $list.animate(opts.showAnimation, showOpts);
            }
        },

        /*
        *   hide one or all selectron dropdown lists
        *   @curSelectron = .selectron element (optional)
        */
        hideLists: function (curSelectron) {
            var curSelectrons = curSelectron || ".selectron",
                $curSelectrons = $(curSelectrons).filter(".selectron--shown, .selectron--showing");
            $curSelectrons.each(function () {
                var $this = $(this),
                    opts = $("select[name=" + $this.attr("data-select") + "]").data().selectronConfig,
                    hideOpts = {
                        "duration": opts.hideDuration,
                        "easing": opts.hideEasing,
                        "complete": function () {
                            $this.removeClass("selectron--hiding");
                            if(opts.hideCallback) {
                                opts.hideCallback.call(this);
                            }
                        }
                    };

                if (opts.hideSpecialEasing) {
                    hideOpts.specialEasing = opts.hideSpecialEasing;
                }

                $curSelectrons.stop().removeClass("selectron--shown selectron--showing").addClass("selectron--hiding");

                if(opts.cssAnimationOnly) {
                    setTimeout(function(){ hideOpts.complete(); }, hideOpts.duration);
                } else {
                    $curSelectrons.find(".selectron__list").animate(opts.hideAnimation, hideOpts);
                }
            });
        },

        /*
        *   Event Handler Helper Function
        */
        keepFocus: function (origSelect, curSelectron) {

            // wrap in setTimeout to allow any focus events to finish
            setTimeout(function(){
                var $origSelect = {};

                // determine original select
                if (curSelectron && !origSelect) {
                    $origSelect = $("select[name=" + $(curSelectron).attr("data-select") + "]");
                } else if (origSelect) {
                    $origSelect = $(origSelect);
                }

                // only force focus if focus was lost
                if(!$(document.activeElement).is($origSelect)){

                    if ($origSelect) {
                        if($origSelect[0].setActive) {
                            // IE8
                            $origSelect[0].setActive();
                        } else {
                            // standards
                            $origSelect[0].focus();
                        }
                    }
                }
            },0);
        },

        /*
        *   Event handlers
        */

        handle: function (e, action, el) {
            var $parentSelectron, $origSelect, $curSelectron, selectedIndex, keyPressed,
                selectedHtml = "",
                self = this,
                code = e.keyCode || e.which;

            if ((e.type === "mousedown" || e.type === "click") && action !== "deselectAll") {
                e.preventDefault();
            } else {
            }

            switch (action) {

            // Hide all lists if a user clicks away [TODO: or changes focus]
            case "deselectAll":
                if (!$(el).is(".selectron")) {
                    self.hideLists();
                }
                break;

            // Show or hide list when a.selectron__selected is clicked
            case "selectedToggleShown":
                $parentSelectron = $(el).parents(".selectron");
                self.keepFocus(null, $parentSelectron[0]);

                // hide all other selectrons
                $(".selectron").each(function () {
                    var $this = $(this);

                    if (!$this.is($parentSelectron[0]) && $this.is(".selectron--shown, .selectron--showing")) {
                        self.hideLists($this[0]);
                    }
                });

                // toggle targeted list
                if ($parentSelectron.is(".selectron--showing, .selectron--shown")) {
                    self.hideLists($parentSelectron[0]);
                } else {
                    self.showList($parentSelectron[0]);
                }

                break;

            // Change Selected Option
            case "clickChange":
                $parentSelectron = $(el).parents(".selectron");
                $origSelect = $("select[name=" + $parentSelectron.attr("data-select") + "]");

                // change actual selected option
                $origSelect.prop("selectedIndex", $(el).attr("data-index"));
                $origSelect.trigger("change");

                // close Selectron list
                self.hideLists($parentSelectron);

                break;

            case "tabDeselect":
                $curSelectron = $(".selectron[data-select=" + $(el).attr("name") + "]");
                self.hideLists($curSelectron[0]);

                break;

            // Update the Selectron display if the changed <select> has an associated Selectron
            case "reflectStatus":
                $curSelectron = $(".selectron[data-select=" + $(el).attr("name") + "]");
                if ($curSelectron.length > 0) {
                    // Natural event - Focus In
                    if (e.type === "focusin") {
                        $curSelectron.addClass("selectron--focused");

                    // Natural event - Focus Out
                    } else if (e.type === "focusout") {
                        $curSelectron.removeClass("selectron--focused");

                    // Natural Event (Change) - use keyboard for list nav
                    } else if (e.type === "change" || e.type === "keydown") {
                        selectedIndex = $(el).prop("selectedIndex");

                        // use setTimeout to wait till end of current browser loop queue - firefox again
                        setTimeout(function () {
                            var $el = $(el);

                            selectedIndex = $el.prop("selectedIndex");
                            selectedHtml = $el.data("optionLabels")[selectedIndex];
                            $curSelectron.find(".selectron__selected").html(selectedHtml + "<span class=\"selectron__selected__indicator\"></span>");
                            $curSelectron.find("li").removeClass("selectron__li--selected").parent()
                                .find("[data-index=" + selectedIndex + "]")
                                .addClass("selectron__li--selected");

                            // Enter key
                            if (e.type === "keydown" && code === 13) {
                                self.hideLists($curSelectron[0]);
                            }
                        }, 1);
                    }
                }

                break;
            }
        },

        getMouseButton: function(e) {
            var button = "",
                browserHasAttachEvent = (typeof window.attachEvent === "object");

            switch(e.button) {
                case 4:
                    button = "middle";
                    break;
                case 2:
                    button = "right";
                    break;
                case 1:
                    button = (browserHasAttachEvent) ? "left" : "middle";
                    break;
                default:
                    button = "left";
            }

            return button;
        },

        addHandlers: function (opts) {
            var self = this;

            // only attach event handlers once
            if (!$.selectron) {
                $.selectron = {};

                // Whole Document - Escape & Tab Keys
                $("html").on("keydown.selectron", function (e) {
                    var code = e.keyCode || e.which;

                    // Tab away from a selectron
                    if (code === 9) {
                        self.handle(e, "tabDeselect", this);

                    // Escape Key = close all Selectrons
                    } else if (code === 27) {
                        self.hideLists();
                    }
                });

                // Whole Document - Click
                $("html").on("mousedown.selectron", function (e) {
                    var $el = $(e.target);

                    // If no selectron was clicked
                    if(!$el.is(".selectron") && $el.parents(".selectron").length < 1) {
                        // Close all selectrons
                        self.hideLists();
                    } else {
                        e.preventDefault();
                    }
                });

                // show/hide selectron list or change selected option
                $(opts.delegate).on("mousedown.selectron mouseup.selectron", ".selectron", function (e) {
                    var $target = $(e.target),
                        $this = $(this),
                        el = {},
                        button = self.getMouseButton(e);
                    
                    if(button === "left") {
                        // Show or hide list when a .selectron__selected is clicked
                        if(e.type === "mousedown") {
                            if($target.is(".selectron__selected") || $target.parents(".selectron__selected").length > 0) {
                                if(e.type === "mousedown") {
                                    el = $(this).find(".selectron__selected")[0];
                                    self.handle(e, "selectedToggleShown", el);
                                } else {
                                    e.preventDefault();
                                }
                            }
                        } else if (e.type === "mouseup") {
                            if($target.is(".selectron__li") || $target.parents(".selectron__li").length > 0) {

                                // Change Selected Option
                                el = ($target.is(".selectron__li")) ? $target[0] : $target.parents(".selectron__li")[0];
                                self.handle(e, "clickChange", el);
                            }
                        }
                    }

                    // Refocus on original <select> when clicking on selectron, if necessary
                    // Note: focus only unpreventably taken in IE <=8 on mousedown event
                    if(e.type === "mousedown") {
                        self.keepFocus(null, $this);
                    }
                });

                // Reflect Selected Option Change
                $("body").on("focusout.selectron focusin.selectron change.selectron keydown.selectron", "select", function (e) {

                    // keyup/keydown is only necessary in firefox, which
                    // doesn't fire change event till focus is lost (technically to spec)
                    // perhaps write a test to check on selectron init
                    self.handle(e, "reflectStatus", this);
                });
            }
        }
    };

    Selectron.defaults = Selectron.prototype.defaults;

    $.fn.selectron = function (options) {
        function newSelectron(el, options) {
            return new Selectron(el, options).init();
        }

        function extendSelectron(el, options) {
            var selectCss = {},
                $el = $(el),
                $selectron = $("[data-select='" + $el.attr('name') + "']"),
                opts = {};

            opts = $.extend($el.data("selectronConfig"), options);
            selectCss = Selectron.prototype.getSelectCss($(el), $(el).data("selectronConfig"));
            
            Selectron.prototype.applyOptions($selectron, $el, opts, selectCss);
        }

        return this.each(function () {
            var $this = $(this);

            if ($this.is("select")) {
                if (!$this.data("selectronConfig")) {
                    newSelectron(this, options);
                } else {
                    extendSelectron(this, options);
                }
            } else if ($this.find("select").length > 0) {
                $this.find("select").each(function () {
                    if (!$(this).data("selectronConfig")) {
                        newSelectron(this, options);
                    } else {
                        extendSelectron(this, options);
                    }
                });
            }
        });
    };

    $(function(){
        window.selectronStart = Date.now();
        if((typeof selectronNoHtml5 != null)) {
            $("select[data-selectron]").selectron();
        }
    })
    
})(jQuery, window);