;
(function (global, undefined) {
    'use strict'
    var _global;

    window.addEventListener('load', function () {
        'use strict'

        // Input change field color
        var inputs = document.querySelectorAll('input, textarea, select');
        [].forEach.call(inputs, function (el) {
            if (el.value) {
                el.classList.add('entered');
            }
            el.addEventListener('input', function () {
                if (this.value) {
                    this.classList.add('entered');
                } else {
                    this.classList.remove('entered');
                }
            });
            var resetButton = document.querySelector('button[type="reset"]');
            if (resetButton) {
                resetButton.addEventListener('click', function () {
                    el.classList.remove('entered');
                });
            }
        });

        // price format
        [].forEach.call(document.getElementsByClassName('price'), function (el) {
            el.innerHTML = el.textContent.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        });

        // Menu
        function navMenu() {
            var ga = document.querySelectorAll('[data-btn]');
            var go = document.querySelectorAll('[data-box]');
            function off(sel) {
                for (var i = 0; i < sel.length; i++) {
                    var seli = sel[i];
                    if (seli.classList.contains('on')) {
                        seli.classList.remove('on');
                    }
                }
            }
            for (var i = 0; i < ga.length; i++) {
                var el = ga[i];
                el.addEventListener('click', function(e){
                    // if (!e.target.classList.contains('on')) {
                    //     off(ga);
                    // }
                    // if (e.target && !e.target.classList.contains('first')) {
                    //     e.target.classList.add('on');
                    // }
                    for (var i = 0; i < go.length; i++) {
                        var goi = go[i];
                        if (e.target.getAttribute('data-btn') === goi.getAttribute('data-box') && !e.target.classList.contains('first')) {
                            goi.classList.add('block');
                            goi.classList.add('on');
                        } else {
                            goi.classList.remove('on');
                        }
                    }
                    setTimeout(function () {
                        for (var i = 0; i < go.length; i++) {
                            var gof = go[i];
                            if (e.target.getAttribute('data-btn') !== gof.getAttribute('data-box')) {
                                gof.classList.remove('block');
                            }
                        }
                    }, 500);
                }, false);
            };
            // document.addEventListener('click', function(e) {
            //     for (var i = 0; i < go.length; i++) {
            //         var goi = go[i];
            //         if (!e.target.getAttribute('data-btn')) {
            //             goi.classList.remove('on');
            //         }
            //     }
            //     for (var i = 0; i < ga.length; i++) {
            //         var gai = ga[i];
            //         if (!e.target.getAttribute('data-btn')) {
            //             gai.classList.remove('on');
            //         }
            //     }
            //     e.stopPropagation();
            // });
        };
        navMenu();

        // nav underline
        var underLine = document.querySelector(".underline");
        var area = document.querySelectorAll('.menu.box');
        for (var i = 0; i < area.length; i++) {
            area[i].onmouseover = function (e) {
                var node = e.target;
                if (node.nodeName === "A") {
                    var left = node.getBoundingClientRect().left;
                    if (node.offsetParent) {
                        left -= node.offsetParent.getBoundingClientRect().left;
                    }
                    underLine.style.transform = 'translateX(' + left + 'px)';
                    underLine.style.width = node.clientWidth + "px";
                }
            };
        }

        // scroll top
        var scrollButton = document.querySelector('.scrollup');
        window.onscroll = function () {
            if (document.body.scrollTop + document.documentElement.scrollTop > 50) {
                scrollButton.style.display = "block";
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        };
        function scrollTo(element, to, duration) {
            if (duration < 0) return;
            var difference = to - element.scrollTop;
            var perTick = difference / duration * 2;

            setTimeout(function() {
                element.scrollTop = element.scrollTop + perTick;
                scrollTo(element, to, duration - 2);
            }, 10);
        }
        scrollButton.onclick = function () {
            scrollTo(document.documentElement, 0, 100);
            scrollTo(document.body, 0, 100);
        }

        // jump to desktop mode
        hc.addEvent(document, 'click', function(e) {
            var v = document.getElementsByTagName('meta')["viewport"];
            if (e.target.classList.contains('desktop')) {
                v.content = "width=1090, viewport-fit=auto, minimum-scale=0.25, maximum-scale=5, user-scalable=yes";
            } else if (e.target.classList.contains('mobile')) {
                v.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
            }
        });
        function isMobile() {
            try {
                document.createEvent("TouchEvent");
                return true;
            }
            catch(e) {
                return false;
            }
        }
        if (isMobile() && window.screen.availWidth <= 1120 ) {
            hc.$('.jump').classList.add('on');
        }
    });


    var hc = {
        
        $: function (ele) {
            if (typeof ele == 'string') {
                return document.querySelector(ele);
            }
        },

        $$: function (ele) {
            if (typeof ele == 'string') {
                return Array.prototype.slice.call(document.querySelectorAll(ele));
            }
        },

        addEvent: function (obj, type, func) {
            return obj.addEventListener(type, func, false);
        },

        openShow: function (t, g) {
            if (typeof e === 'undefined') {
                var e = window.event;
            }
            if (e.target === e.currentTarget) {
                g.classList.add('block');
                g.classList.add('show');
                t.classList.add('on');
            }
        },

        open: function (t, g) {
            if (typeof e === 'undefined') {
                var e = window.event;
            }
            if (e.target === e.currentTarget) {
                g.classList.add('block');
                g.classList.add('show');
            }
        },

        closeBlur: function (t, g) {
            if (typeof e === 'undefined') {
                var e = window.event;
            }
            if (e.target) {
                g.classList.remove('show');
                t.classList.remove('on');
                setTimeout(function () {
                    g.classList.remove('block');
                }, 350);
            }
            e.stopPropagation();
        },

        closeFocus: function (t, g) {
            if (typeof e === 'undefined') {
                var e = window.event;
            }
            if (e.target === t) {
                g.classList.remove('show');
                t.classList.remove('on');
                setTimeout(function () {
                    g.classList.remove('block');
                }, 650);
            }
            e.stopPropagation();
        },

        closeOutside: function (t, g) {
            if (typeof e === 'undefined') {
                var e = window.event;
            }
            if (e.target != t && e.target != g && !g.contains(e.target)) {
                g.classList.remove('show');
                t.classList.remove('on');
                setTimeout(function () {
                    g.classList.remove('block');
                }, 350);
            }
            e.stopPropagation();
        },

        nthParent: function (element, n) {
            while(n-- && element)
            element = element.parentNode;
            return element;
        },

        tableToggle: function (t, g) {
            if (typeof e === 'undefined') {
                var e = window.event;
            }
            // t.classList.toggle('gv');
            if (e.target === e.currentTarget) {
                g.classList.toggle('gv');
                t.classList.add('on');
            }
        },

        // order feature icon change
        orderFeature: function (btn, offLabel, onLabel) {
            var b = document.querySelectorAll(btn);
            [].forEach.call(b, function (el) {
                el.addEventListener('click', function (e) {
                    el.classList.toggle('turn');
                    setTimeout(function () {
                        el.classList.toggle('on');
                        if (el.classList.contains('on')) {
                            el.setAttribute('aria-label', offLabel);
                        } else {
                            el.setAttribute('aria-label', onLabel);
                        }
                    }, 1500);
                });
            });
        },

        // Menu
        selectPair: function (ooo, sss) {
            var ii = '[' + ooo + ']';
            var ee = '[' + sss + ']';
            var ga = document.querySelectorAll(ii);
            var go = document.querySelectorAll(ee);
            // var ii = ooo.replace(/\[|\]/g, '');
            // var ee = sss.replace(/\[|\]/g, '');
            function off(sel) {
                for (var i = 0; i < sel.length; i++) {
                    var seli = sel[i];
                    if (seli.classList.contains('on')) {
                        seli.classList.remove('on');
                    }
                }
            }
            for (var i = 0; i < ga.length; i++) {
                var el = ga[i];
                el.addEventListener('click', function(e){
                    if (!e.target.classList.contains('on')) {
                        off(ga);
                    }
                    if (e.target && !e.target.classList.contains('first')) {
                        e.target.classList.add('on');
                    }
                    for (var i = 0; i < go.length; i++) {
                        var goi = go[i];
                        if (e.target.getAttribute(ooo) === goi.getAttribute(sss)) {
                            goi.classList.add('block');
                            goi.classList.add('on');
                        } else {
                            goi.classList.remove('on');
                        }
                    }
                    setTimeout(function () {
                        for (var i = 0; i < go.length; i++) {
                            var gof = go[i];
                            if (e.target.getAttribute(ooo) !== gof.getAttribute(sss)) {
                                gof.classList.remove('block');
                            }
                        }
                    }, 500);
                }, false);
            };
        },


    }


    _global = (function () {
        return this || (0, eval)('this');
    }());
    !('hc' in _global) && (_global.hc = hc);

}());