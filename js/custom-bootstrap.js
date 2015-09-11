/* Begin: javascript/custom-bootstrap/bootstrap3-typeahead.js */
!function(a,b){"use strict";"undefined"!=typeof module&&module.exports?module.exports=b(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):b(a.jQuery)}(this,function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.select=this.options.select||this.select,this.autoSelect="boolean"==typeof this.options.autoSelect?this.options.autoSelect:!0,this.highlighter=this.options.highlighter||this.highlighter,this.render=this.options.render||this.render,this.updater=this.options.updater||this.updater,this.displayText=this.options.displayText||this.displayText,this.source=this.options.source,this.delay=this.options.delay,this.$menu=a(this.options.menu),this.$appendTo=this.options.appendTo?a(this.options.appendTo):null,this.shown=!1,this.listen(),this.showHintOnFocus="boolean"==typeof this.options.showHintOnFocus?this.options.showHintOnFocus:!1,this.afterSelect=this.options.afterSelect,this.addItem=!1};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").data("value");if(this.$element.data("active",a),this.autoSelect||a){var b=this.updater(a);this.$element.val(this.displayText(b)||b).change(),this.afterSelect(b)}return this.hide()},updater:function(a){return a},setSource:function(a){this.source=a},show:function(){var b,c=a.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return b="function"==typeof this.options.scrollHeight?this.options.scrollHeight.call():this.options.scrollHeight,(this.$appendTo?this.$menu.appendTo(this.$appendTo):this.$menu.insertAfter(this.$element)).css({top:c.top+c.height+b,left:c.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){if(this.query="undefined"!=typeof b&&null!==b?b:this.$element.val()||"",this.query.length<this.options.minLength)return this.shown?this.hide():this;var c=a.proxy(function(){a.isFunction(this.source)?this.source(this.query,a.proxy(this.process,this)):this.source&&this.process(this.source)},this);clearTimeout(this.lookupWorker),this.lookupWorker=setTimeout(c,this.delay)},process:function(b){var c=this;return b=a.grep(b,function(a){return c.matcher(a)}),b=this.sorter(b),b.length||this.options.addItem?(b.length>0?this.$element.data("active",b[0]):this.$element.data("active",null),this.options.addItem&&b.push(this.options.addItem),"all"==this.options.items?this.render(b).show():this.render(b.slice(0,this.options.items)).show()):this.shown?this.hide():this},matcher:function(a){var b=this.displayText(a);return~b.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){for(var b,c=[],d=[],e=[];b=a.shift();){var f=this.displayText(b);f.toLowerCase().indexOf(this.query.toLowerCase())?~f.indexOf(this.query)?d.push(b):e.push(b):c.push(b)}return c.concat(d,e)},highlighter:function(b){var c,d,e,f,g,h=a("<div></div>"),i=this.query,j=b.toLowerCase().indexOf(i.toLowerCase());if(c=i.length,0===c)return h.text(b).html();for(;j>-1;)d=b.substr(0,j),e=b.substr(j,c),f=b.substr(j+c),g=a("<strong></strong>").text(e),h.append(document.createTextNode(d)).append(g),b=f,j=b.toLowerCase().indexOf(i.toLowerCase());return h.append(document.createTextNode(b)).html()},render:function(b){var c=this,d=this,e=!1;return b=a(b).map(function(b,f){var g=d.displayText(f);return b=a(c.options.item).data("value",f),b.find("a").html(c.highlighter(g)),g==d.$element.val()&&(b.addClass("active"),d.$element.data("active",f),e=!0),b[0]}),this.autoSelect&&!e&&(b.first().addClass("active"),this.$element.data("active",b.first().data("value"))),this.$menu.html(b),this},displayText:function(a){return a.name||a},next:function(){var b=this.$menu.find(".active").removeClass("active"),c=b.next();c.length||(c=a(this.$menu.find("li")[0])),c.addClass("active")},prev:function(){var a=this.$menu.find(".active").removeClass("active"),b=a.prev();b.length||(b=this.$menu.find("li").last()),b.addClass("active")},listen:function(){this.$element.on("focus",a.proxy(this.focus,this)).on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",a.proxy(this.keydown,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this)).on("mouseleave","li",a.proxy(this.mouseleave,this))},destroy:function(){this.$element.data("typeahead",null),this.$element.data("active",null),this.$element.off("focus").off("blur").off("keypress").off("keyup"),this.eventSupported("keydown")&&this.$element.off("keydown"),this.$menu.remove()},eventSupported:function(a){var b=a in this.$element;return b||(this.$element.setAttribute(a,"return;"),b="function"==typeof this.$element[a]),b},move:function(a){if(this.shown){switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:if(a.shiftKey)return;a.preventDefault(),this.prev();break;case 40:if(a.shiftKey)return;a.preventDefault(),this.next()}a.stopPropagation()}},keydown:function(b){this.suppressKeyPressRepeat=~a.inArray(b.keyCode,[40,38,9,13,27]),this.shown||40!=b.keyCode?this.move(b):this.lookup()},keypress:function(a){this.suppressKeyPressRepeat||this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},focus:function(){this.focused||(this.focused=!0,this.options.showHintOnFocus&&this.lookup(""))},blur:function(){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(a){a.stopPropagation(),a.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(b){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")},mouseleave:function(){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var c=a.fn.typeahead;a.fn.typeahead=function(c){var d=arguments;return"string"==typeof c&&"getActive"==c?this.data("active"):this.each(function(){var e=a(this),f=e.data("typeahead"),g="object"==typeof c&&c;f||e.data("typeahead",f=new b(this,g)),"string"==typeof c&&(d.length>1?f[c].apply(f,Array.prototype.slice.call(d,1)):f[c]())})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu" role="listbox"></ul>',item:'<li><a href="#" role="option"></a></li>',minLength:1,scrollHeight:0,autoSelect:!0,afterSelect:a.noop,delay:0,addItem:!1},a.fn.typeahead.Constructor=b,a.fn.typeahead.noConflict=function(){return a.fn.typeahead=c,this},a(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(){var b=a(this);b.data("typeahead")||b.typeahead(b.data())})});/* End: javascript/custom-bootstrap/bootstrap3-typeahead.js */
/* Begin: javascript/custom-bootstrap/vendor/jquery.joyride.js */
/*
 * jQuery Foundation Joyride Plugin 2.1
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
    'use strict';

    var defaults = {
            'version'              : '2.1',
            'tipLocation'          : 'top',  // 'top' or 'bottom' in relation to parent
            'nubPosition'          : 'auto',    // override on a per tooltip bases
            'scroll'               : true,      // whether to scroll to tips
            'scrollSpeed'          : 300,       // Page scrolling speed in milliseconds
            'timer'                : 0,         // 0 = no timer , all other numbers = timer in milliseconds
            'autoStart'            : false,     // true or false - false tour starts when restart called
            'startTimerOnClick'    : true,      // true or false - true requires clicking the first button start the timer
            'startOffset'          : 0,         // the index of the tooltip you want to start on (index of the li)
            'nextButton'           : true,      // true or false to control whether a next button is used
            'tipAnimation'         : 'fade',    // 'pop' or 'fade' in each tip
            'pauseAfter'           : [],        // array of indexes where to pause the tour after
            'tipAnimationFadeSpeed': 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
            'cookieMonster'        : false,     // true or false to control whether cookies are used
            'cookieName'           : 'joyride', // Name the cookie you'll use
            'cookieDomain'         : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
            'cookiePath'           : false,     // Set to '/' if you want the cookie for the whole website
            'localStorage'         : false,     // true or false to control whether localstorage is used
            'localStorageKey'      : 'joyride', // Keyname in localstorage
            'tipContainer'         : 'body',    // Where will the tip be attached
            'modal'                : false,     // Whether to cover page with modal during the tour
            'expose'               : false,     // Whether to expose the elements at each step in the tour (requires modal:true)
            'postExposeCallback'   : $.noop,    // A method to call after an element has been exposed
            'preRideCallback'      : $.noop,    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
            'postRideCallback'     : $.noop,    // A method to call once the tour closes (canceled or complete)
            'preStepCallback'      : $.noop,    // A method to call before each step
            'postStepCallback'     : $.noop,    // A method to call after each step
            'template' : { // HTML segments for tip layout
                'link'    : '<a href="#close" class="joyride-close-tip">&times;</a>',
                'timer'   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                'tip'     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                'wrapper' : '<div class="joyride-content-wrapper" role="dialog"></div>',
                'button'  : '<a href="#" class="joyride-next-tip btn btn-primary"></a>',
                'modal'   : '<div class="joyride-modal-bg"></div>',
                'expose'  : '<div class="joyride-expose-wrapper"></div>',
                'exposeCover': '<div class="joyride-expose-cover"></div>'
            }
        },

        Modernizr = Modernizr || false,

        settings = {},

        methods = {

            init : function (opts) {
                return this.each(function () {

                    if ($.isEmptyObject(settings)) {
                        settings = $.extend(true, defaults, opts);

                        // non configurable settings
                        settings.document = window.document;
                        settings.$document = $(settings.document);
                        settings.$window = $(window);
                        settings.$content_el = $(this);
                        settings.$body = $(settings.tipContainer);
                        settings.body_offset = $(settings.tipContainer).position();
                        settings.$tip_content = $('> li', settings.$content_el);
                        settings.paused = false;
                        settings.attempts = 0;

                        settings.tipLocationPatterns = {
                            top: ['bottom'],
                            bottom: [], // bottom should not need to be repositioned
                            left: ['right', 'top', 'bottom'],
                            right: ['left', 'top', 'bottom']
                        };

                        // are we using jQuery 1.7+
                        methods.jquery_check();

                        // can we create cookies?
                        if (!$.isFunction($.cookie)) {
                            settings.cookieMonster = false;
                        }

                        // generate the tips and insert into dom.
                        if ( (!settings.cookieMonster || !$.cookie(settings.cookieName) ) &&
                            (!settings.localStorage || !methods.support_localstorage() || !localStorage.getItem(settings.localStorageKey) ) ) {

                            settings.$tip_content.each(function (index) {
                                methods.create({$li : $(this), index : index});
                            });

                            // show first tip
                            if(settings.autoStart)
                            {
                                if (!settings.startTimerOnClick && settings.timer > 0) {
                                    methods.show('init');
                                    methods.startTimer();
                                } else {
                                    methods.show('init');
                                }
                            }

                        }

                        settings.$document.on('click.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
                            e.preventDefault();

                            if (settings.$li.next().length < 1) {
                                methods.end();
                            } else if (settings.timer > 0) {
                                clearTimeout(settings.automate);
                                methods.hide();
                                methods.show();
                                methods.startTimer();
                            } else {
                                methods.hide();
                                methods.show();
                            }

                        });

                        settings.$document.on('click.joyride', '.joyride-close-tip', function (e) {
                            e.preventDefault();
                            methods.end(true /* isAborted */);
                        });

                        settings.$window.bind('resize.joyride', function (e) {
                            if(settings.$li){
                                if(settings.exposed && settings.exposed.length>0){
                                    var $els = $(settings.exposed);
                                    $els.each(function(){
                                        var $this = $(this);
                                        methods.un_expose($this);
                                        methods.expose($this);
                                    });
                                }
                                if (methods.is_phone()) {
                                    methods.pos_phone();
                                } else {
                                    methods.pos_default();
                                }
                            }
                        });
                    } else {
                        methods.restart();
                    }

                });
            },

            // call this method when you want to resume the tour
            resume : function () {
                methods.set_li();
                methods.show();
            },

            nextTip: function(){
                if (settings.$li.next().length < 1) {
                    methods.end();
                } else if (settings.timer > 0) {
                    clearTimeout(settings.automate);
                    methods.hide();
                    methods.show();
                    methods.startTimer();
                } else {
                    methods.hide();
                    methods.show();
                }
            },

            tip_template : function (opts) {
                var $blank, content, $wrapper;

                opts.tip_class = opts.tip_class || '';

                $blank = $(settings.template.tip).addClass(opts.tip_class);
                content = $.trim($(opts.li).html()) +
                methods.button_text(opts.button_text) +
                settings.template.link +
                methods.timer_instance(opts.index);

                $wrapper = $(settings.template.wrapper);
                if (opts.li.attr('data-aria-labelledby')) {
                    $wrapper.attr('aria-labelledby', opts.li.attr('data-aria-labelledby'))
                }
                if (opts.li.attr('data-aria-describedby')) {
                    $wrapper.attr('aria-describedby', opts.li.attr('data-aria-describedby'))
                }
                $blank.append($wrapper);
                $blank.first().attr('data-index', opts.index);
                $('.joyride-content-wrapper', $blank).append(content);

                return $blank[0];
            },

            timer_instance : function (index) {
                var txt;

                if ((index === 0 && settings.startTimerOnClick && settings.timer > 0) || settings.timer === 0) {
                    txt = '';
                } else {
                    txt = methods.outerHTML($(settings.template.timer)[0]);
                }
                return txt;
            },

            button_text : function (txt) {
                if (settings.nextButton) {
                    txt = $.trim(txt) || 'Next';
                    txt = methods.outerHTML($(settings.template.button).append(txt)[0]);
                } else {
                    txt = '';
                }
                return txt;
            },

            create : function (opts) {
                // backwards compatibility with data-text attribute
                var buttonText = opts.$li.attr('data-button') || opts.$li.attr('data-text'),
                    tipClass = opts.$li.attr('class'),
                    $tip_content = $(methods.tip_template({
                        tip_class : tipClass,
                        index : opts.index,
                        button_text : buttonText,
                        li : opts.$li
                    }));

                $(settings.tipContainer).append($tip_content);
            },

            show : function (init) {
                var opts = {}, ii, opts_arr = [], opts_len = 0, p,
                    $timer = null;

                // are we paused?
                if (settings.$li === undefined || ($.inArray(settings.$li.index(), settings.pauseAfter) === -1)) {

                    // don't go to the next li if the tour was paused
                    if (settings.paused) {
                        settings.paused = false;
                    } else {
                        methods.set_li(init);
                    }

                    settings.attempts = 0;

                    if (settings.$li.length && settings.$target.length > 0) {
                        if(init){ //run when we first start
                            settings.preRideCallback(settings.$li.index(), settings.$next_tip );
                            if(settings.modal){
                                methods.show_modal();
                            }
                        }
                        settings.preStepCallback(settings.$li.index(), settings.$next_tip );

                        // parse options
                        opts_arr = (settings.$li.data('options') || ':').split(';');
                        opts_len = opts_arr.length;
                        for (ii = opts_len - 1; ii >= 0; ii--) {
                            p = opts_arr[ii].split(':');

                            if (p.length === 2) {
                                opts[$.trim(p[0])] = $.trim(p[1]);
                            }
                        }
                        settings.tipSettings = $.extend({}, settings, opts);
                        settings.tipSettings.tipLocationPattern = settings.tipLocationPatterns[settings.tipSettings.tipLocation];

                        if(settings.modal && settings.expose){
                            methods.expose();
                        }

                        // scroll if not modal
                        if (!/body/i.test(settings.$target.selector) && settings.scroll) {
                            methods.scroll_to();
                        }

                        if (methods.is_phone()) {
                            methods.pos_phone(true);
                        } else {
                            methods.pos_default(true);
                        }

                        $timer = $('.joyride-timer-indicator', settings.$next_tip);

                        if (/pop/i.test(settings.tipAnimation)) {

                            $timer.outerWidth(0);

                            if (settings.timer > 0) {

                                settings.$next_tip.show();
                                $timer.animate({
                                    width: $('.joyride-timer-indicator-wrap', settings.$next_tip).outerWidth()
                                }, settings.timer);

                            } else {

                                settings.$next_tip.show();

                            }


                        } else if (/fade/i.test(settings.tipAnimation)) {

                            $timer.outerWidth(0);

                            if (settings.timer > 0) {

                                settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed);

                                settings.$next_tip.show();
                                $timer.animate({
                                    width: $('.joyride-timer-indicator-wrap', settings.$next_tip).outerWidth()
                                }, settings.timer);

                            } else {

                                settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed);

                            }
                        }

                        settings.$current_tip = settings.$next_tip;
                        // Focus next button for keyboard users.
                        $('.joyride-next-tip', settings.$current_tip).focus();
                        methods.tabbable(settings.$current_tip);
                        // skip non-existent targets
                    } else if (settings.$li && settings.$target.length < 1) {

                        methods.show();

                    } else {

                        methods.end();

                    }
                } else {

                    settings.paused = true;

                }

            },

            // detect phones with media queries if supported.
            is_phone : function () {
                if (Modernizr) {
                    return Modernizr.mq('only screen and (max-width: 767px)');
                }

                return (settings.$window.width() < 767) ? true : false;
            },

            support_localstorage : function () {
                if (Modernizr) {
                    return Modernizr.localstorage;
                } else {
                    return !!window.localStorage;
                }
            },

            hide : function () {
                if(settings.modal && settings.expose){
                    methods.un_expose();
                }
                if(!settings.modal){
                    $('.joyride-modal-bg').hide();
                }
                settings.$current_tip.hide();
                settings.postStepCallback(settings.$li.index(), settings.$current_tip);
            },

            set_li : function (init) {
                if (init) {
                    settings.$li = settings.$tip_content.eq(settings.startOffset);
                    methods.set_next_tip();
                    settings.$current_tip = settings.$next_tip;
                } else {
                    settings.$li = settings.$li.next();
                    methods.set_next_tip();
                }

                methods.set_target();
            },

            set_next_tip : function () {
                settings.$next_tip = $('.joyride-tip-guide[data-index=' + settings.$li.index() + ']');
            },

            set_target : function () {
                var cl = settings.$li.attr('data-class'),
                    id = settings.$li.attr('data-id'),
                    $sel = function () {
                        if (id) {
                            return $(settings.document.getElementById(id));
                        } else if (cl) {
                            return $('.' + cl).filter(":visible").first();
                        } else {
                            return $('body');
                        }
                    };

                settings.$target = $sel();
            },

            scroll_to : function () {
                var window_half, tipOffset;

                window_half = settings.$window.height() / 2;
                tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight());

                $("html, body").stop().animate({
                    scrollTop: tipOffset
                }, settings.scrollSpeed);
            },

            paused : function () {
                if (($.inArray((settings.$li.index() + 1), settings.pauseAfter) === -1)) {
                    return true;
                }

                return false;
            },

            destroy : function () {
                if(!$.isEmptyObject(settings)){
                    settings.$document.off('.joyride');
                }

                $(window).off('.joyride');
                $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
                $('.joyride-tip-guide, .joyride-modal-bg').remove();
                clearTimeout(settings.automate);
                settings = {};
            },

            restart : function () {
                if(!settings.autoStart)
                {
                    if (!settings.startTimerOnClick && settings.timer > 0) {
                        methods.show('init');
                        methods.startTimer();
                    } else {
                        methods.show('init');
                    }
                    settings.autoStart = true;
                }
                else
                {
                    methods.hide();
                    settings.$li = undefined;
                    methods.show('init');
                }
            },

            pos_default : function (init) {
                var half_fold = Math.ceil(settings.$window.height() / 2),
                    tip_position = settings.$next_tip.offset(),
                    $nub = $('.joyride-nub', settings.$next_tip),
                    nub_width = Math.ceil($nub.outerWidth() / 2),
                    nub_height = Math.ceil($nub.outerHeight() / 2),
                    toggle = init || false;

                // tip must not be "display: none" to calculate position
                if (toggle) {
                    settings.$next_tip.css('visibility', 'hidden');
                    settings.$next_tip.show();
                }

                if (!/body/i.test(settings.$target.selector)) {
                    var
                        topAdjustment = settings.tipSettings.tipAdjustmentY ? parseInt(settings.tipSettings.tipAdjustmentY) : 0,
                        leftAdjustment = settings.tipSettings.tipAdjustmentX ? parseInt(settings.tipSettings.tipAdjustmentX) : 0;

                    if (methods.bottom()) {
                        settings.$next_tip.css({
                            top: (settings.$target.offset().top + nub_height + settings.$target.outerHeight() + topAdjustment),
                            left: settings.$target.offset().left + leftAdjustment});

                        if (/right/i.test(settings.tipSettings.nubPosition)) {
                            settings.$next_tip.css('left', settings.$target.offset().left - settings.$next_tip.outerWidth() + settings.$target.outerWidth());
                        }

                        methods.nub_position($nub, settings.tipSettings.nubPosition, 'top');

                    } else if (methods.top()) {

                        settings.$next_tip.css({
                            top: (settings.$target.offset().top - settings.$next_tip.outerHeight() - nub_height + topAdjustment),
                            left: settings.$target.offset().left + leftAdjustment});

                        methods.nub_position($nub, settings.tipSettings.nubPosition, 'bottom');

                    } else if (methods.right()) {

                        settings.$next_tip.css({
                            top: settings.$target.offset().top + topAdjustment,
                            left: (settings.$target.outerWidth() + settings.$target.offset().left + nub_width) + leftAdjustment});

                        methods.nub_position($nub, settings.tipSettings.nubPosition, 'left');

                    } else if (methods.left()) {

                        settings.$next_tip.css({
                            top: settings.$target.offset().top + topAdjustment,
                            left: (settings.$target.offset().left - settings.$next_tip.outerWidth() - nub_width) + leftAdjustment});

                        methods.nub_position($nub, settings.tipSettings.nubPosition, 'right');

                    }

                    if (!methods.visible(methods.corners(settings.$next_tip)) && settings.attempts < settings.tipSettings.tipLocationPattern.length) {

                        $nub.removeClass('bottom')
                            .removeClass('top')
                            .removeClass('right')
                            .removeClass('left');

                        settings.tipSettings.tipLocation = settings.tipSettings.tipLocationPattern[settings.attempts];

                        settings.attempts++;

                        methods.pos_default(true);

                    }

                } else if (settings.$li.length) {

                    methods.pos_modal($nub);

                }

                if (toggle) {
                    settings.$next_tip.hide();
                    settings.$next_tip.css('visibility', 'visible');
                }

            },

            pos_phone : function (init) {
                var tip_height = settings.$next_tip.outerHeight(),
                    tip_offset = settings.$next_tip.offset(),
                    target_height = settings.$target.outerHeight(),
                    $nub = $('.joyride-nub', settings.$next_tip),
                    nub_height = Math.ceil($nub.outerHeight() / 2),
                    toggle = init || false;

                $nub.removeClass('bottom')
                    .removeClass('top')
                    .removeClass('right')
                    .removeClass('left');

                if (toggle) {
                    settings.$next_tip.css('visibility', 'hidden');
                    settings.$next_tip.show();
                }

                if (!/body/i.test(settings.$target.selector)) {

                    if (methods.top()) {

                        settings.$next_tip.offset({top: settings.$target.offset().top - tip_height - nub_height});
                        $nub.addClass('bottom');

                    } else {

                        settings.$next_tip.offset({top: settings.$target.offset().top + target_height + nub_height});
                        $nub.addClass('top');

                    }

                } else if (settings.$li.length) {

                    methods.pos_modal($nub);

                }

                if (toggle) {
                    settings.$next_tip.hide();
                    settings.$next_tip.css('visibility', 'visible');
                }
            },

            pos_modal : function ($nub) {
                methods.center();
                $nub.hide();

                methods.show_modal();

            },

            show_modal : function() {
                if ($('.joyride-modal-bg').length < 1) {
                    $('body').append(settings.template.modal).show();
                }

                if (/pop/i.test(settings.tipAnimation)) {
                    $('.joyride-modal-bg').show();
                } else {
                    $('.joyride-modal-bg').fadeIn(settings.tipAnimationFadeSpeed);
                }
            },

            expose: function(){
                var expose,
                    exposeCover,
                    el,
                    origCSS,
                    randId = 'expose-'+Math.floor(Math.random()*10000);
                if (arguments.length>0 && arguments[0] instanceof $){
                    el = arguments[0];
                } else if(settings.$target && !/body/i.test(settings.$target.selector)){
                    el = settings.$target;
                }  else {
                    return false;
                }
                if(el.length < 1){
                    if(window.console){
                        console.error('element not valid', el);
                    }
                    return false;
                }
                expose = $(settings.template.expose);
                settings.$body.append(expose);
                expose.css({
                    top: el.offset().top,
                    left: el.offset().left,
                    width: el.outerWidth(true),
                    height: el.outerHeight(true)
                });
                exposeCover = $(settings.template.exposeCover);
                origCSS = {
                    zIndex: el.css('z-index'),
                    position: el.css('position')
                };
                el.css('z-index',expose.css('z-index')*1+1);
                if(origCSS.position == 'static'){
                    el.css('position','relative');
                }
                el.data('expose-css',origCSS);
                exposeCover.css({
                    top: el.offset().top,
                    left: el.offset().left,
                    width: el.outerWidth(true),
                    height: el.outerHeight(true)
                });
                settings.$body.append(exposeCover);
                expose.addClass(randId);
                exposeCover.addClass(randId);
                if(settings.tipSettings['exposeClass']){
                    expose.addClass(settings.tipSettings['exposeClass']);
                    exposeCover.addClass(settings.tipSettings['exposeClass']);
                }
                el.data('expose', randId);
                settings.postExposeCallback(settings.$li.index(), settings.$next_tip, el);
                methods.add_exposed(el);
            },

            un_expose: function(){
                var exposeId,
                    el,
                    expose ,
                    origCSS,
                    clearAll = false;
                if (arguments.length>0 && arguments[0] instanceof $){
                    el = arguments[0];
                } else if(settings.$target && !/body/i.test(settings.$target.selector)){
                    el = settings.$target;
                }  else {
                    return false;
                }
                if(el.length < 1){
                    if(window.console){
                        console.error('element not valid', el);
                    }
                    return false;
                }
                exposeId = el.data('expose');
                expose = $('.'+exposeId);
                if(arguments.length>1){
                    clearAll = arguments[1];
                }
                if(clearAll === true){
                    $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
                } else {
                    expose.remove();
                }
                origCSS = el.data('expose-css');
                if(origCSS.zIndex == 'auto'){
                    el.css('z-index', '');
                } else {
                    el.css('z-index',origCSS.zIndex);
                }
                if(origCSS.position != el.css('position')){
                    if(origCSS.position == 'static'){// this is default, no need to set it.
                        el.css('position', '');
                    } else {
                        el.css('position',origCSS.position);
                    }
                }
                el.removeData('expose');
                el.removeData('expose-z-index');
                methods.remove_exposed(el);
            },

            add_exposed: function(el){
                settings.exposed = settings.exposed || [];
                if(el instanceof $){
                    settings.exposed.push(el[0]);
                } else if(typeof el == 'string'){
                    settings.exposed.push(el);
                }
            },

            remove_exposed: function(el){
                var search;
                if(el instanceof $){
                    search = el[0]
                } else if (typeof el == 'string'){
                    search = el;
                }
                settings.exposed = settings.exposed || [];
                for(var i=0; i<settings.exposed.length; i++){
                    if(settings.exposed[i] == search){
                        settings.exposed.splice(i,1);
                        return;
                    }
                }
            },

            center : function () {
                var $w = settings.$window;

                settings.$next_tip.css({
                    top : ((($w.height() - settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
                    left : ((($w.width() - settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
                });

                return true;
            },

            bottom : function () {
                return /bottom/i.test(settings.tipSettings.tipLocation);
            },

            top : function () {
                return /top/i.test(settings.tipSettings.tipLocation);
            },

            right : function () {
                return /right/i.test(settings.tipSettings.tipLocation);
            },

            left : function () {
                return /left/i.test(settings.tipSettings.tipLocation);
            },

            corners : function (el) {
                var w = settings.$window,
                    window_half = w.height() / 2,
                    tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight()),//using this to calculate since scroll may not have finished yet.
                    right = w.width() + w.scrollLeft(),
                    offsetBottom =  w.height() + tipOffset,
                    bottom = w.height() + w.scrollTop(),
                    top = w.scrollTop();

                if(tipOffset < top){
                    if (tipOffset <0 ){
                        top = 0;
                    } else {
                        top = tipOffset;
                    }
                }

                if(offsetBottom > bottom){
                    bottom = offsetBottom;
                }

                return [
                    el.offset().top < top,
                    right < el.offset().left + el.outerWidth(),
                    bottom < el.offset().top + el.outerHeight(),
                    w.scrollLeft() > el.offset().left
                ];
            },

            visible : function (hidden_corners) {
                var i = hidden_corners.length;

                while (i--) {
                    if (hidden_corners[i]) return false;
                }

                return true;
            },

            nub_position : function (nub, pos, def) {
                if (pos === 'auto') {
                    nub.addClass(def);
                } else {
                    nub.addClass(pos);
                }
            },

            startTimer : function () {
                if (settings.$li.length) {
                    settings.automate = setTimeout(function () {
                        methods.hide();
                        methods.show();
                        methods.startTimer();
                    }, settings.timer);
                } else {
                    clearTimeout(settings.automate);
                }
            },

            end : function (isAborted) {
                isAborted = isAborted || false;

                // Unbind resize events.
                if (isAborted) {
                    settings.$window.unbind('resize.joyride');
                }

                if (settings.cookieMonster) {
                    $.cookie(settings.cookieName, 'ridden', { expires: 365, domain: settings.cookieDomain, path: settings.cookiePath });
                }

                if (settings.localStorage) {
                    localStorage.setItem(settings.localStorageKey, true);
                }

                if (settings.timer > 0) {
                    clearTimeout(settings.automate);
                }
                if(settings.modal && settings.expose){
                    methods.un_expose();
                }
                if (settings.$current_tip) {
                    settings.$current_tip.hide();
                }
                if (settings.$li) {
                    settings.postStepCallback(settings.$li.index(), settings.$current_tip, isAborted);
                    settings.postRideCallback(settings.$li.index(), settings.$current_tip, isAborted);
                }
                $('.joyride-modal-bg').hide();
            },

            jquery_check : function () {
                // define on() and off() for older jQuery
                if (!$.isFunction($.fn.on)) {

                    $.fn.on = function (types, sel, fn) {

                        return this.delegate(sel, types, fn);

                    };

                    $.fn.off = function (types, sel, fn) {

                        return this.undelegate(sel, types, fn);

                    };

                    return false;
                }

                return true;
            },

            outerHTML : function (el) {
                // support FireFox < 11
                return el.outerHTML || new XMLSerializer().serializeToString(el);
            },

            version : function () {
                return settings.version;
            },

            tabbable : function (el) {
                $(el).on('keydown', function( event ) {
                    if (!event.isDefaultPrevented() && event.keyCode &&
                            // Escape key.
                        event.keyCode === 27 ) {
                        event.preventDefault();
                        methods.end(true /* isAborted */);
                        return;
                    }

                    // Prevent tabbing out of tour items.
                    if ( event.keyCode !== 9 ) {
                        return;
                    }
                    var tabbables = $(el).find(":tabbable"),
                        first = tabbables.filter(":first"),
                        last  = tabbables.filter(":last");
                    if ( event.target === last[0] && !event.shiftKey ) {
                        first.focus( 1 );
                        event.preventDefault();
                    } else if ( event.target === first[0] && event.shiftKey ) {
                        last.focus( 1 );
                        event.preventDefault();
                    }
                });
            }

        };

    $.fn.joyride = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.joyride');
        }
    };

}(jQuery, this));/* End: javascript/custom-bootstrap/vendor/jquery.joyride.js */

/* Begin: javascript/custom-bootstrap/pattern-data-grid.js */


// Data-Grid

$( document ).ready(function() {

	// Check if table is on page
	if ( $('table.data-grid').length ) {

		// Support the rearange of columns. Use class .draggable on th of the column you want to allow drag
		$('table.data-grid.draggable').dragtable({dragaccept:'.draggable'});
		//$('table.data-grid.sortable').tablesorter();

		// Assign zebra classes
		// TODO: Refactor this to a method??!!!
		$('table.data-grid tbody tr:not(.collapse):even').each( function () {
			$(this).addClass('row-even');
		});

		// Handle collapse/expand rows:

		$('table.data-grid [data-toggle="collapse"]').click( function(e) {
			var $thisRow = $(this).closest('tr'),
				selector = $(this).data('target'),
				$icon = $(this).find('i');
				$target = $(selector);

			if ( $target.hasClass('in') ) {
				// close
				$thisRow.removeClass('row-expanded');
				$target.removeClass('row-expanded');
				$icon.removeAttr('class');
				$icon.addClass('icon-caret-down');

			} else {
				// open
				$thisRow.addClass('row-expanded');
				$target.addClass('row-expanded');
				$icon.removeAttr('class');
				$icon.addClass('icon-caret-up');
			}

			//$target.addClass('row-collapse');
			//console.log ( $target );

		});
		$('table.data-grid tr.collapse td').wrapInner( '<div class="td-wrapper">' );


		if ( $('.data-grid-controls').length ) {

			// Update total number of items fount if possible
			$('.items-total').each( function () {
				var $this = $(this);
				var $table = $this.closest('.data-grid-controls').next('table.data-grid');
				console.log($table);
				var itemsNum = $table.find('tbody tr').length;
				$this.find('.num').text( itemsNum );
			});


			// Fixed table header

			//Table heading for fixed header
			$('.data-grid').addClass('original');
			var tableHead = $('.data-grid').clone();
			var	tableWrapper = $('<div class="cloned"></div>');
			tableHead.removeClass('original');
			tableHead.find('*').removeAttr('id');
			tableHead.find('th').each( function () {

				//var $th = $(this);
				//$th.width( $th.outerWidth() );
			});
			tableWrapper.append(tableHead);
			tableWrapper.appendTo( $(".data-grid-controls-sticky") )
			//tableWrapper.find('tbody').css('v);




			$('.data-grid-controls.controls-second').each( function () {

				var dataGridControls = $(this);
				var dataGridOffsetTop = dataGridControls.offset().top + dataGridControls.outerHeight();
				var parent = dataGridControls.closest( '.modal, .app-main-wrap' );

				parent.on('scroll', function (e) {

					var scrollTop = $(this).scrollTop(),
					element = $('.data-grid-controls-sticky');

					//element.css({ top: scrollTop });
					element.css({ width: $('.data-grid.original').outerWidth() });

					if ( 0 > dataGridControls.offset().top ) {
						element.addClass('affix');
					}
					else {
						element.removeClass('affix');
					}



				});

			});






				// Populate Settings List with columns
			var settingsColumns = $('.settings-columns');

			// Check if functiuonality exsists
			if ( settingsColumns.length ) {


				var tableHeaders = $('.data-grid thead th:not(.col-massaction)'),
					columnItems = '';

					//$('table.data-grid').prepend('<colgroup></colgroup');

				i=0;

				tableHeaders.each( function () {
					$(this).data("col-id", i );
					columnItems += '<label><input type="checkbox" checked="checked" data-column="' + i + '" /> ' + $(this).text() + '</label>';
					//$('table.data-grid colgroup').append('<col data-column="' + i + '"></col>' );
					i++;
				});

				settingsColumns.append( columnItems );

				var columnCheckboxes = settingsColumns.find('input[type="checkbox"]');

				columnCheckboxes.click( function (e) {

					var column = $(this).data('column'),
						checkboxes = columnCheckboxes.filter(function() { return $(this).data('column') == column });;
					checkboxes.prop( 'checked', $(this).prop('checked') );
				});




				/*
				$('.control-settings-dropdown .dropdown-toggle, .control-settings-dropdown .btn-cancel').on('click', function (e) {
					$('.control-settings-dropdown').toggleClass('open');
				});
				*/
				$('.control-settings-dropdown label, .control-settings-dropdown .dropdown-menu').on('click', function (e) {
					e.stopPropagation();
				});

				// Apply Settings
				$('.control-settings-dropdown .btn-apply').click(function (e) {
					e.preventDefault();
					//var uncheckedColumns = $('.settings-columns input[type="checkbox"]:not(:checked)');

					columnCheckboxes.each( function () {
						var colId = $(this).data('column'),
							header = tableHeaders.filter( function () { return $(this).data("col-id") == colId; }),
							index = header.index();


						if ( $(this).is(":checked") ) {
							$('.data-grid td:nth-child(' + ( index + 1) + '), .data-grid th:nth-child(' + ( index + 1) + ')').show();
						} else {
							header.hide();
							$('.data-grid td:nth-child(' + ( index + 1) + '), .data-grid th:nth-child(' + ( index + 1) + ')').hide();
						}
					});


					$('.control-settings-dropdown').removeClass('open');
				});

				$('.control-settings-dropdown .btn-cancel , .control-settings-dropdown .btn-reset').click( function (e) {

					$('.control-settings-dropdown').removeClass('open');
				});


			}



			/*

			$('.control-settings-dropdown').on('hide.bs.dropdown', function (e) {
				var target = $(e.target);
				alert ( target.parents(  ).html()  );

				if( target.parents( '.control-settings-dropdown' ) ) {
					return false;
				}
			});*/






			$('.control-view .dropdown-menu input ').click( function (e)  {

				e.stopPropagation();
			});
			$('.control-view .dropdown-menu .btn-edit').click( function (e) {
				e.stopPropagation();
				$(this).closest('li').toggleClass('editing-view');

			});
			$('.control-view .dropdown-menu .btn-save').click( function (e) {
				e.stopPropagation();
				var menuItem = $(this).closest('li'),
					itemName = menuItem.find('input').val();

				menuItem.find('a').html( itemName );
				menuItem.toggleClass('editing-view');
			});

			$('.control-view .dropdown-menu .btn-trash').click( function (e) {
				e.stopPropagation();
				$(this).closest('li').hide();

			});


			// Get all fields in table
			var myTableArray = [];
			$("table.data-grid:first td").each(function() {
				var tableData = $(this).text().substr(0, 40);
				if (tableData.length > 0) {
					myTableArray.push(tableData);
				}
			});
			// type ahead suggestion
			$('.search-input').typeahead({ minLength: 3, source: myTableArray });





		} // data-grid-controls










		// Mass action checkboxes

	    $('.table.data-grid th .massaction-checkbox').click(function () {
			var checkBoxes = $('table.data-grid td input[type="checkbox"]');
			checkBoxes.prop("checked", $(this).prop("checked") );
		});

		$('.table.data-grid td.col-massaction').click( function (e) {
			e.stopPropagation();
			$(this).find('input[type="checkbox"]').trigger('click');
		});

		 $('.table.data-grid .massaction-checkbox').click(function (e) {
			 e.stopPropagation();
			var checkBoxes = $('table.data-grid td input[type="checkbox"]'),
				selectedCheckboxes = checkBoxes.filter(":checked"),
				selectedCheckboxesCount = selectedCheckboxes.length;
			if ( selectedCheckboxesCount ) {
				$('.control-items .items-selected').html('('+ selectedCheckboxes.length + ' selected)');
			} else {
				$('.control-items .items-selected').html('');
			}

		});






    }
});



var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  };
};


/*!
 * dragtable
 *
 * @Version 2.0.13
 *
 * Copyright (c) 2010-2013, Andres akottr@gmail.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Inspired by the the dragtable from Dan Vanderkam (danvk.org/dragtable/)
 * Thanks to the jquery and jqueryui comitters
 *
 * Any comment, bug report, feature-request is welcome
 * Feel free to contact me.
 */

/* TOKNOW:
 * For IE7 you need this css rule:
 * table {
 *   border-collapse: collapse;
 * }
 * Or take a clean reset.css (see http://meyerweb.com/eric/tools/css/reset/)
 */

/* TODO: investigate
 * Does not work properly with css rule:
 * html {
 *      overflow: -moz-scrollbars-vertical;
 *  }
 * Workaround:
 * Fixing Firefox issues by scrolling down the page
 * http://stackoverflow.com/questions/2451528/jquery-ui-sortable-scroll-helper-element-offset-firefox-issue
 *
 * var start = $.noop;
 * var beforeStop = $.noop;
 * if($.browser.mozilla) {
 * var start = function (event, ui) {
 *               if( ui.helper !== undefined )
 *                 ui.helper.css('position','absolute').css('margin-top', $(window).scrollTop() );
 *               }
 * var beforeStop = function (event, ui) {
 *              if( ui.offset !== undefined )
 *                ui.helper.css('margin-top', 0);
 *              }
 * }
 *
 * and pass this as start and stop function to the sortable initialisation
 * start: start,
 * beforeStop: beforeStop
 */
/*
 * Special thx to all pull requests comitters
 */

(function($) {
  $.widget("akottr.dragtable", {
    options: {
      revert: false,               // smooth revert
      dragHandle: '.table-handle', // handle for moving cols, if not exists the whole 'th' is the handle
      maxMovingRows: 40,           // 1 -> only header. 40 row should be enough, the rest is usually not in the viewport
      excludeFooter: false,        // excludes the footer row(s) while moving other columns. Make sense if there is a footer with a colspan. */
      onlyHeaderThreshold: 100,    // TODO:  not implemented yet, switch automatically between entire col moving / only header moving
      dragaccept: null,            // draggable cols -> default all
      persistState: null,          // url or function -> plug in your custom persistState function right here. function call is persistState(originalTable)
      restoreState: null,          // JSON-Object or function:  some kind of experimental aka Quick-Hack TODO: do it better
      exact: true,                 // removes pixels, so that the overlay table width fits exactly the original table width
      clickDelay: 10,              // ms to wait before rendering sortable list and delegating click event
      containment: null,           // @see http://api.jqueryui.com/sortable/#option-containment, use it if you want to move in 2 dimesnions (together with axis: null)
      cursor: 'move',              // @see http://api.jqueryui.com/sortable/#option-cursor
      cursorAt: false,             // @see http://api.jqueryui.com/sortable/#option-cursorAt
      distance: 0,                 // @see http://api.jqueryui.com/sortable/#option-distance, for immediate feedback use "0"
      tolerance: 'pointer',        // @see http://api.jqueryui.com/sortable/#option-tolerance
      axis: 'x',                   // @see http://api.jqueryui.com/sortable/#option-axis, Only vertical moving is allowed. Use 'x' or null. Use this in conjunction with the 'containment' setting
      beforeStart: $.noop,         // returning FALSE will stop the execution chain.
      beforeMoving: $.noop,
      beforeReorganize: $.noop,
      beforeStop: $.noop
    },
    originalTable: {
      el: null,
      selectedHandle: null,
      sortOrder: null,
      startIndex: 0,
      endIndex: 0
    },
    sortableTable: {
      el: $(),
      selectedHandle: $(),
      movingRow: $()
    },
    persistState: function() {
      var _this = this;
      this.originalTable.el.find('th').each(function(i) {
        if (this.id !== '') {
          _this.originalTable.sortOrder[this.id] = i;
        }
      });
      $.ajax({
        url: this.options.persistState,
        data: this.originalTable.sortOrder
      });
    },
    /*
     * persistObj looks like
     * {'id1':'2','id3':'3','id2':'1'}
     * table looks like
     * |   id2  |   id1   |   id3   |
     */
    _restoreState: function(persistObj) {
      for (var n in persistObj) {
        this.originalTable.startIndex = $('#' + n).closest('th').prevAll().size() + 1;
        this.originalTable.endIndex = parseInt(persistObj[n] + 1, 10);
        this._bubbleCols();
      }
    },
    // bubble the moved col left or right
    _bubbleCols: function() {
      var i, j, col1, col2;
      var from = this.originalTable.startIndex;
      var to = this.originalTable.endIndex;
      /* Find children thead and tbody.
       * Only to process the immediate tr-children. Bugfix for inner tables
       */
      var thtb = this.originalTable.el.children();
      if (this.options.excludeFooter) {
        thtb = thtb.not('tfoot');
      }
      if (from < to) {
        for (i = from; i < to; i++) {
          col1 = thtb.find('> tr > td:nth-child(' + i + ')')
            .add(thtb.find('> tr > th:nth-child(' + i + ')'));
          col2 = thtb.find('> tr > td:nth-child(' + (i + 1) + ')')
            .add(thtb.find('> tr > th:nth-child(' + (i + 1) + ')'));
          for (j = 0; j < col1.length; j++) {
            swapNodes(col1[j], col2[j]);
          }
        }
      } else {
        for (i = from; i > to; i--) {
          col1 = thtb.find('> tr > td:nth-child(' + i + ')')
            .add(thtb.find('> tr > th:nth-child(' + i + ')'));
          col2 = thtb.find('> tr > td:nth-child(' + (i - 1) + ')')
            .add(thtb.find('> tr > th:nth-child(' + (i - 1) + ')'));
          for (j = 0; j < col1.length; j++) {
            swapNodes(col1[j], col2[j]);
          }
        }
      }
    },
    _rearrangeTableBackroundProcessing: function() {
      var _this = this;
      return function() {
        _this._bubbleCols();
        _this.options.beforeStop(_this.originalTable);
        _this.sortableTable.el.remove();
        restoreTextSelection();
        // persist state if necessary
        if (_this.options.persistState !== null) {
          $.isFunction(_this.options.persistState) ? _this.options.persistState(_this.originalTable) : _this.persistState();
        }
      };
    },
    _rearrangeTable: function() {
      var _this = this;
      return function() {
        // remove handler-class -> handler is now finished
        _this.originalTable.selectedHandle.removeClass('dragtable-handle-selected');
        // add disabled class -> reorgorganisation starts soon
        _this.sortableTable.el.sortable("disable");
        _this.sortableTable.el.addClass('dragtable-disabled');
        _this.options.beforeReorganize(_this.originalTable, _this.sortableTable);
        // do reorganisation asynchronous
        // for chrome a little bit more than 1 ms because we want to force a rerender
        _this.originalTable.endIndex = _this.sortableTable.movingRow.prevAll().size() + 1;
        setTimeout(_this._rearrangeTableBackroundProcessing(), 50);
      };
    },
    /*
     * Disrupts the table. The original table stays the same.
     * But on a layer above the original table we are constructing a list (ul > li)
     * each li with a separate table representig a single col of the original table.
     */
    _generateSortable: function(e) {
      !e.cancelBubble && (e.cancelBubble = true);
      var _this = this;
      // table attributes
      var attrs = this.originalTable.el[0].attributes;
      var attrsString = '';
      for (var i = 0; i < attrs.length; i++) {
        if (attrs[i].nodeValue && attrs[i].nodeName != 'id' && attrs[i].nodeName != 'width') {
          attrsString += attrs[i].nodeName + '="' + attrs[i].nodeValue + '" ';
        }
      }

      // row attributes
      var rowAttrsArr = [];
      //compute height, special handling for ie needed :-(
      var heightArr = [];
      this.originalTable.el.find('tr').slice(0, this.options.maxMovingRows).each(function(i, v) {
        // row attributes
        var attrs = this.attributes;
        var attrsString = "";
        for (var j = 0; j < attrs.length; j++) {
          if (attrs[j].nodeValue && attrs[j].nodeName != 'id') {
            attrsString += " " + attrs[j].nodeName + '="' + attrs[j].nodeValue + '"';
          }
        }
        rowAttrsArr.push(attrsString);
        heightArr.push($(this).height());
      });

      // compute width, no special handling for ie needed :-)
      var widthArr = [];
      // compute total width, needed for not wrapping around after the screen ends (floating)
      var totalWidth = 0;
      /* Find children thead and tbody.
       * Only to process the immediate tr-children. Bugfix for inner tables
       */
      var thtb = _this.originalTable.el.children();
      if (this.options.excludeFooter) {
        thtb = thtb.not('tfoot');
      }
      thtb.find('> tr > th').each(function(i, v) {
        var w = $(this).outerWidth();
        widthArr.push(w);
        totalWidth += w;
      });
      if(_this.options.exact) {
          var difference = totalWidth - _this.originalTable.el.outerWidth();
          widthArr[0] -= difference;
      }
      // one extra px on right and left side
      totalWidth += 2

      var sortableHtml = '<ul class="dragtable-sortable" style="position:absolute; width:' + totalWidth + 'px;">';
      // assemble the needed html
      thtb.find('> tr > th').each(function(i, v) {
        sortableHtml += '<li>';
        sortableHtml += '<table ' + attrsString + '>';
        var row = thtb.find('> tr > th:nth-child(' + (i + 1) + ')');
        if (_this.options.maxMovingRows > 1) {
          row = row.add(thtb.find('> tr > td:nth-child(' + (i + 1) + ')').slice(0, _this.options.maxMovingRows - 1));
        }
        row.each(function(j) {
          // TODO: May cause duplicate style-Attribute
          var row_content = $(this).clone().wrap('<div></div>').parent().html();
          if (row_content.toLowerCase().indexOf('<th') === 0) sortableHtml += "<thead>";
          sortableHtml += '<tr ' + rowAttrsArr[j] + '" style="height:' + heightArr[j] + 'px;">';
          sortableHtml += row_content;
          if (row_content.toLowerCase().indexOf('<th') === 0) sortableHtml += "</thead>";
          sortableHtml += '</tr>';
        });
        sortableHtml += '</table>';
        sortableHtml += '</li>';
      });
      sortableHtml += '</ul>';
      this.sortableTable.el = this.originalTable.el.before(sortableHtml).prev();
      // set width if necessary
      this.sortableTable.el.find('> li > table').each(function(i, v) {
        $(this).css('width', widthArr[i] + 'px');
      });

      // assign this.sortableTable.selectedHandle
      this.sortableTable.selectedHandle = this.sortableTable.el.find('th .dragtable-handle-selected');

      var items = !this.options.dragaccept ? 'li' : 'li:has(' + this.options.dragaccept + ')';
      this.sortableTable.el.sortable({
        items: items,
        stop: this._rearrangeTable(),
        // pass thru options for sortable widget
        revert: this.options.revert,
        tolerance: this.options.tolerance,
        containment: this.options.containment,
        cursor: this.options.cursor,
        cursorAt: this.options.cursorAt,
        distance: this.options.distance,
        axis: this.options.axis
      });

      // assign start index
      this.originalTable.startIndex = $(e.target).closest('th').prevAll().size() + 1;

      this.options.beforeMoving(this.originalTable, this.sortableTable);
      // Start moving by delegating the original event to the new sortable table
      this.sortableTable.movingRow = this.sortableTable.el.find('> li:nth-child(' + this.originalTable.startIndex + ')');

      // prevent the user from drag selecting "highlighting" surrounding page elements
      disableTextSelection();
      // clone the initial event and trigger the sort with it
      this.sortableTable.movingRow.trigger($.extend($.Event(e.type), {
        which: 1,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY
      }));

      // Some inner divs to deliver the posibillity to style the placeholder more sophisticated
      var placeholder = this.sortableTable.el.find('.ui-sortable-placeholder');
      if(!placeholder.height()  <= 0) {
        placeholder.css('height', this.sortableTable.el.find('.ui-sortable-helper').height());
      }

      placeholder.html('<div class="outer" style="height:100%;"><div class="inner" style="height:100%;"></div></div>');
    },
    bindTo: {},
    _create: function() {
      this.originalTable = {
        el: this.element,
        selectedHandle: $(),
        sortOrder: {},
        startIndex: 0,
        endIndex: 0
      };
      // bind draggable to 'th' by default
      this.bindTo = this.originalTable.el.find('th');
      // filter only the cols that are accepted
      if (this.options.dragaccept) {
        this.bindTo = this.bindTo.filter(this.options.dragaccept);
      }
      // bind draggable to handle if exists
      if (this.bindTo.find(this.options.dragHandle).size() > 0) {
        this.bindTo = this.bindTo.find(this.options.dragHandle);
      }
      // restore state if necessary
      if (this.options.restoreState !== null) {
        $.isFunction(this.options.restoreState) ? this.options.restoreState(this.originalTable) : this._restoreState(this.options.restoreState);
      }
      var _this = this;
      this.bindTo.mousedown(function(evt) {
        // listen only to left mouse click
        if(evt.which!==1) return;
        if (_this.options.beforeStart(_this.originalTable) === false) {
          return;
        }
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(function() {
          _this.originalTable.selectedHandle = $(this);
          _this.originalTable.selectedHandle.addClass('dragtable-handle-selected');
          _this._generateSortable(evt);
        }, _this.options.clickDelay);
      }).mouseup(function(evt) {
        clearTimeout(this.downTimer);
      });
    },
    redraw: function(){
      this.destroy();
      this._create();
    },
    destroy: function() {
      this.bindTo.unbind('mousedown');
      $.Widget.prototype.destroy.apply(this, arguments); // default destroy
      // now do other stuff particular to this widget
    }
  });

  /** closure-scoped "private" functions **/

  var body_onselectstart_save = $(document.body).attr('onselectstart'),
    body_unselectable_save = $(document.body).attr('unselectable');

  // css properties to disable user-select on the body tag by appending a <style> tag to the <head>
  // remove any current document selections

  function disableTextSelection() {
    // jQuery doesn't support the element.text attribute in MSIE 8
    // http://stackoverflow.com/questions/2692770/style-style-textcss-appendtohead-does-not-work-in-ie
    var $style = $('<style id="__dragtable_disable_text_selection__" type="text/css">body { -ms-user-select:none;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;user-select:none; }</style>');
    $(document.head).append($style);
    $(document.body).attr('onselectstart', 'return false;').attr('unselectable', 'on');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      document.selection.empty(); // MSIE http://msdn.microsoft.com/en-us/library/ms535869%28v=VS.85%29.aspx
    }
  }

  // remove the <style> tag, and restore the original <body> onselectstart attribute

  function restoreTextSelection() {
    $('#__dragtable_disable_text_selection__').remove();
    if (body_onselectstart_save) {
      $(document.body).attr('onselectstart', body_onselectstart_save);
    } else {
      $(document.body).removeAttr('onselectstart');
    }
    if (body_unselectable_save) {
      $(document.body).attr('unselectable', body_unselectable_save);
    } else {
      $(document.body).removeAttr('unselectable');
    }
  }

  function swapNodes(a, b) {
    var aparent = a.parentNode;
    var asibling = a.nextSibling === b ? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
  }
})(jQuery);
/* End: javascript/custom-bootstrap/pattern-data-grid.js */
/* Begin: javascript/custom-bootstrap/pattern-advanced-control.js */
//----------Advanced Options -------------------



$('.AdvancedControl').click(function() {
    $('.AdvancedContent').toggle(0);
    $('.close_arrow').toggle(0);
    $('.open_arrow').toggle(0);

});/* End: javascript/custom-bootstrap/pattern-advanced-control.js */
/* Begin: javascript/custom-bootstrap/pattern-buttonbar.js */
//----------Sticky Button Bar-------------------

// Create a clone of the button bar, right next to original.
$( document ).ready(function() { 
	if ( $('.button-bar').length ) {
		
		// Grab each instance of button-bar and clone it. Then attach scrolling event to it's neares scrollable parent (.modal or .app-main-wrap)
		// This done because we have button bars inside fixed position elements which provides a buggy behavior. 
		
		$('.button-bar').each(function () {
			var buttonBar = $(this);
			var	parentFrame = buttonBar.closest( '.modal, .app-main-wrap' );
			var parent = buttonBar.parent();
			var	clone = buttonBar.clone();
			
			clone.appendTo(parent).addClass('cloned').hide();
			buttonBar.addClass('original');
			
			parentFrame.scroll( function () {
				
				if ( buttonBar.offset().top < 0 ) {

					clone.width( buttonBar.width() );
					//clone.css('top', $(this).scrollTop() );
					clone.css('left', buttonBar.offset().left );
					clone.show();
					//console.log(  $(this).attr('class') + ': ' + $(this).scrollTop() );
					
				} else {
					clone.hide();
				}				
				
				
			});
		
		}); 
	
	
	}
});/* End: javascript/custom-bootstrap/pattern-buttonbar.js */
/* Begin: javascript/custom-bootstrap/pattern-modals.js */
// Cusom JS to handle modal overlays:

$(document).ready(function() {
	$('#openBtn').click(function(){
		$('#myModal').modal({show:true})
	});

	$('.modal').on('hidden.bs.modal', function( event ) {
		$(this).removeClass( 'fv-modal-stack' );
		$('body').data( 'fv_open_modals', $('body').data( 'fv_open_modals' ) - 1 );
		if ( $('body').data( 'fv_open_modals' ) > 0 ) {
			$('body').addClass('modal-open');
		}
		else {
			
		}
		
	});
	

	$( '.modal' ).on( 'shown.bs.modal', function ( event ) {

		// keep track of the number of open modals

		if ( typeof( $('body').data( 'fv_open_modals' ) ) == 'undefined' ) {
			$('body').data( 'fv_open_modals', 0 );
		}

		// if the z-index of this modal has been set, ignore.
        if ( $(this).hasClass( 'fv-modal-stack' ) )	{
			return;
		}
                   
		$(this).addClass( 'fv-modal-stack' );

		$('body').data( 'fv_open_modals', $('body').data( 'fv_open_modals' ) + 1 );

		//$(this).css('z-index', 1040 + (10 * $('body').data( 'fv_open_modals' )));
		//$( '.modal-backdrop' ).not( '.fv-modal-stack' ).css( 'z-index', 1039 + (10 * $('body').data( 'fv_open_modals' )));

		$( '.modal-backdrop' ).not( 'fv-modal-stack' ).addClass( 'fv-modal-stack' ); 

	});


});/* End: javascript/custom-bootstrap/pattern-modals.js */
/* Begin: javascript/custom-bootstrap/pattern-panels.js */


// Hello world
/*
$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});
*/



$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
});



$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".expander-collapsed").removeClass("expander-collapsed").addClass("expander-expanded");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".expander-expanded").removeClass("expander-expanded").addClass("expander-collapsed");
});

/*Control for second level*/
$('.control-secondLevel').click(function(){

	if( $(this).hasClass("expander-collapsed-nth-level") ){
		$(this).removeClass("expander-collapsed-nth-level").addClass("expander-expanded-nth-level");
	}else {
		$(this).removeClass("expander-expanded-nth-level").addClass("expander-collapsed-nth-level");
	}

});/* End: javascript/custom-bootstrap/pattern-panels.js */
/* Begin: javascript/custom-bootstrap/pattern-progress-bar.js */


//----------Installation Text on Progress Bar & Console-------------------

  $('#step-1').delay(2000).hide(0);
  $('#step-2').delay(2000).show(0);
  $('#step-2').delay(2000).hide(0);
  $('#step-3').delay(4000).show(0);
  $('#step-3').delay(2000).hide(0);
  $('#step-4').delay(6000).show(0);




$('.console-log').click(function() {
    $('.console-log-content').toggle(0);
    $('.open-console').toggle(0);
    $('.close-console').toggle(0);

});


$("#start-downloading").click(function(){
    setTimeout("window.location='readinessCheckLanding-addComp.html'",2000);
});

/* End: javascript/custom-bootstrap/pattern-progress-bar.js */
/* Begin: javascript/custom-bootstrap/pattern-toggle.js */
$( document ).ready(function() {
	
	$('.toggle-off, .toggle-on').click(function (e) {
		var $this = $(this);
		
		if ( $this.hasClass( 'toggle-on' ) ) {
			$this.removeClass('toggle-on').addClass('toggle-off').html('Off');
		} else {
			$this.removeClass('toggle-off').addClass('toggle-on').html('On');
		}
		
		
	});
	
	/*
	
	function toggleClass(el){
	
	if(el.className == "toggle-off"){
	el.className = "toggle-on";
	el.innerHTML = 'On';
	} else {
	el.className = "toggle-off";
	el.innerHTML = 'Off';
	}
	}
	*/
});/* End: javascript/custom-bootstrap/pattern-toggle.js */
/* Begin: javascript/custom-bootstrap/pattern-trees.js */
$(function () {


   // add toggles to the nodes
   var $collapseToggle = $('<span class="collapse-toggle">');

   $('.tree li').append( $collapseToggle );
   $('.tree li > ul').addClass('children');

   $('.tree li:has(.children)').addClass('parent_li').find(' > .collapse-toggle').attr('title', 'Collapse this branch');

   $('.tree .collapse-toggle').on('click', function (e) {
      e.stopPropagation();

      var $node = $(this).parent('li');
      var $children = $node.find(' > ul > li');

      if ( $children.is(":visible") ) {
         $children.hide('fast');
         $node.addClass('collapsed');
      } else {
         $children.show('fast');
         $node.removeClass('collapsed');
      }

   });



   $('.collapse-all').click( function(e){
      e.preventDefault();

      if($(this).hasClass("collapse-all")){
           $(".tree").find(' ul > li > ul > li > span >i').addClass('icon-close').removeClass('icon-open');
           var child = $(".tree").find(' ul > li > ul > li >ul >li');
           child.hide('fast');
           $(this).removeClass('collapse-all');
           $(this).addClass('expand-all');
           //document.getElementById("expand-collpase-all").innerHTML = "Expand All";
       }else{
           child = $(".tree").find(' ul > li > ul > li >ul >li');
           $(".tree").find(' ul > li > ul > li > span > i').addClass('icon-open').removeClass('icon-close');
           child.show('fast');
           $(this).removeClass('expand-all');
           $(this).addClass('collapse-all');
           //document.getElementById("expand-collpase-all").innerHTML = "Collapse All";
       }


   });

});
/* End: javascript/custom-bootstrap/pattern-trees.js */
/* Begin: javascript/custom-bootstrap/pattern-wizard.js */
$(function() {
// TODO: Revrite to one, using plugin pattern
// TODO: onStepChangeEvent
// TODO: 

/*==========================================First Version*==========================================*/


var current_step = $("#contentOfStep-1"); //set current step to cotent of step 1
var next_step, prev_step;
var num_steps_in_progress = $("#steps_bar > li").length;
var current_li = $("#wizard-step-1");
var next_li, prev_li;

//NEXT==========================================

$("#next_button").click(function(){


  if(current_li.is("#wizard-step-1")){
      $("#back_button").removeClass("disabled");
      $("#back_button").removeAttr("disabled", true);
  }

  
  current_step.hide(); 
  current_li.removeClass("active");

  //set next step content to show.
  next_step = current_step.next(); 
  next_step.show();

  //set progress bar list to mark active
  next_li = current_li.next();
  next_li.addClass("active");
  next_li.addClass("visited");

  current_step = next_step; //set current step to next step
  current_li = next_li;

  //Set next button to disabled at last step
  if(current_li.is(':last-child')){
      $("#next_button").addClass("disabled");
      $("#next_button").attr("disabled", true);
      return;
  }

  $(window).trigger('resize');


});


//BACK==========================================

$("#back_button").click(function(){

  //Going back to previous step, so next button should be enabled

  if(current_li.is(':last-child')){
      $("#next_button").removeClass("disabled");
      $("#next_button").removeAttr("disabled", true);
  }

  //hide current step's content
  current_step.hide(); 
  current_li.removeClass("active");

  //set previous step's content to show.
  prev_step = current_step.prev(); 
  prev_step.show();

  //set progress bar list to mark active
  prev_li = current_li.prev();
  prev_li.addClass("active");

  current_step = prev_step; //set current step to next step
  current_li = prev_li;

  if(current_li.is("#wizard-step-1")){
      $("#back_button").addClass("disabled");
      $("#back_button").attr("disabled", true);
  }
  
  $(window).trigger('resize');

});


/*==========================================Second Version*==========================================*/
//NEXT==========================================
var $wizard = $('#steps_bar_2');
$wizard.data('current_step_2', $("#contentOfStep_2") );
$wizard.data('next_step_2', '' );
$wizard.data('prev_step_2', '' );
$wizard.data('num_steps_in_progress_2', $("#steps_bar_2 > li").length );
$wizard.data('current_li_2', $("#wizard-step-2") );
$wizard.data('next_li_2', '' );
$wizard.data('prev_li_2', '' );

//var current_step_2 = $("#contentOfStep_2"); //set current step to cotent of step 1
var next_step_2, prev_step_2;
var num_steps_in_progress_2 = $("#steps_bar_2 > li").length;
var current_li_2 = $("#wizard-step-2");
var next_li_2, prev_li_2;


$("#next_button2").click(function(){


  if( $wizard.data('current_li_2').is("#wizard-step-2") ){
      $("#back_button2").removeClass("disabled");
      $("#back_button2").removeAttr("disabled", true);
  }

  
  $wizard.data('current_step_2').hide(); 
  $wizard.data('current_li_2').removeClass("active");

  //set next step content to show.
  $wizard.data('next_step_2', $wizard.data('current_step_2').next() ); 
  $wizard.data('next_step_2').show();
  

  //set progress bar list to mark active
  $wizard.data('next_li_2', $wizard.data('current_li_2').next() );
  $wizard.data('next_li_2').addClass("active");
  $wizard.data('next_li_2').addClass("visited");

  $wizard.data('current_step_2', $wizard.data('next_step_2') ); //set current step to next step
  $wizard.data('current_li_2', $wizard.data('next_li_2') );

  //Set next button to disabled at last step
  if(  $wizard.data('current_li_2').is(':last-child')){
      $("#next_button2").hide();
      $(".second-wizard-save-button").show();
       
  }


  $(window).trigger('resize');

});


//BACK==========================================

$("#back_button2").click(function(){

  //Going back to previous step, so next button should be enabled
  if( $wizard.data('current_li_2').is(':last-child') ){
      $("#next_button2").show();
      $(".second-wizard-save-button").hide();
  }

  //hide current step's content
  $wizard.data('current_step_2').hide(); 
  $wizard.data('current_li_2').removeClass("active");

  //set previous step's content to show.
  $wizard.data('prev_step_2', $wizard.data('current_step_2').prev() ); 
  $wizard.data('prev_step_2').show();

  //set progress bar list to mark active
  $wizard.data('prev_li_2', $wizard.data('current_li_2').prev() );
  $wizard.data('prev_li_2').addClass("active");


  $wizard.data('current_step_2', $wizard.data('prev_step_2') ); //set current step to next step
  $wizard.data('current_li_2', $wizard.data('prev_li_2') );

  if( $wizard.data('current_li_2').is("#wizard-step-2")){
      $("#back_button2").addClass("disabled");
      $("#back_button2").attr("disabled", true);
  }

  $(window).trigger('resize');

});


});


// WIZARD JQUERY PATTERN

/*
 * 'Highly configurable' mutable plugin boilerplate
 * Author: @markdalgleish
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.
/*

;(function( $, window, document, undefined ){

	// our plugin constructor
	var Wizard = function( elem, options ){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		
		

		// This next line takes advantage of HTML5 data attributes
		// to support customization of the plugin on a per-element
		// basis. For example,
		// <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
		this.metadata = this.$elem.data( "plugin-options" );
	};

	// the plugin prototype
	Wizard.prototype = {
		defaults: {
			activeSelector: 		'.active',
			visitedSelector: 		'.visited',
			navSelector: 			'.wizard-nav li',
			bodySelector:			'.wizard-content',
			stepSelector:			'.wizard-step',
			nextSelector:			'.wizard-next',
			prevSelector:			'.wizard-prev',
			endSelector:			'.wizard-end',
			startStep:				1,
		},

		init: function() {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			var self = this;
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			
			this.config.currentStep = this.config.startStep;
			
			// Store dom objects for later use
			this.config.nav = $(this.elem).find(this.config.navSelector);
			this.config.steps = $(this.elem).find(this.config.stepSelector);
			

			// Bind events
			$(this.elem).find(this.config.nextSelector).on('click', self.nextStep );
			$(this.elem).find(this.config.prevSelector).on('click', self.prevStep );
			
			$(this.elem).on('lastStep', this.lastStep );
			
			
			// hide all but current step
			this.goToStep( this.config.startStep );
			
			return this;
		},
		lastStep: function () {
			
		}
		goToStep: function (step) {
			
			_step = parseInt(step,10) - 1;
			
			// Track min-max step values
			if ( _step <= 0 ) {
				_step = 0;
				$(this.elem).trigger('firstStep');
			} 
			if ( _step > this.config.steps.length ) {
				_step = this.config.steps.length - 1;
				$(this.elem).trigger('lastStep');
			}
	
			// set human-readable step number
			this.config.currentStep = _step + 1;

			// Update wizard steps
			this.config.steps.addClass('hide');
			$(this.config.steps[_step]).removeClass('hide').addClass('active');
			
			// Update navigation 
			$(this.config.nav).removeClass('visited active').eq(_step).addClass('active').prevAll().addClass('visited');
			
			// Fire event
			$(this.elem).trigger('changedStep');

		},
		nextStep: function (event) {
			this.goToStep( this.config.currentStep + 1 );
		},
		prevStep: function (event) {
			this.goToStep( this.config.currentStep - 1 );
		}
	}
	
	Wizard.defaults = Wizard.prototype.defaults;

	$.fn.wizard = function(options) {
		return this.each(function() {
			var wiz = new Wizard(this, options).init();
			
			$(this).data('wizard',wiz);
		});
	};

  //optional: window.Plugin = Plugin;

})( jQuery, window , document );

*/
/* End: javascript/custom-bootstrap/pattern-wizard.js */
/* Begin: javascript/custom-bootstrap/pattern-joyride.js */
$(document).ready(function () {

	// TODO: Allow for inline options using the data-joyride attribute
	$("ol[data-joyride]").joyride({
		'autoStart': true,
		'tipContainer': '.main-content',
		'template' : { // HTML segments for tip layout
			'link'    : '<a href="#close" class="joyride-close-tip">&times;</a>',
			'timer'   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
			'tip'     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
			'wrapper' : '<div class="joyride-content-wrapper" role="dialog"></div>',
			'button'  : '<a href="#" class="joyride-next-tip btn btn-primary"></a>',
			'modal'   : '<div class="joyride-modal-bg"></div>',
			'expose'  : '<div class="joyride-expose-wrapper"></div>',
			'exposeCover': '<div class="joyride-expose-cover"></div>'
		}
	});
});/* End: javascript/custom-bootstrap/pattern-joyride.js */
