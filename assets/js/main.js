(function($) {
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $nav = $('#nav'),
        $main = $('#main'),
        $navPanelToggle,
        $navPanel,
        $navPanelInner;

    // Breakpoints.
    breakpoints({
        default: ['1681px', null],
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    /**
     * Applies parallax scrolling to an element's background image.
     * @return {jQuery} jQuery object.
     */
    $.fn._parallax = function(intensity) {
        var $window = $(window),
            $this = $(this);

        if (this.length == 0 || intensity === 0) return $this;

        if (this.length > 1) {
            for (var i = 0; i < this.length; i++)
                $(this[i])._parallax(intensity);

            return $this;
        }

        if (!intensity) intensity = 0.25;

        $this.each(function() {
            var $t = $(this),
                $bg = $('<div class="bg"></div>').appendTo($t),
                on,
                off;

            on = function() {
                $bg.removeClass('fixed').css(
                    'transform',
                    'matrix(1,0,0,1,0,0)'
                );

                $window.on('scroll._parallax', function() {
                    var pos =
                        parseInt($window.scrollTop()) -
                        parseInt($t.position().top);

                    $bg.css(
                        'transform',
                        'matrix(1,0,0,1,0,' + pos * intensity + ')'
                    );
                });
            };

            off = function() {
                $bg.addClass('fixed').css('transform', 'none');

                $window.off('scroll._parallax');
            };

            // Disable parallax on ..
            if (
                browser.name == 'ie' || // IE
                browser.name == 'edge' || // Edge
                window.devicePixelRatio > 1 || // Retina/HiDPI (= poor performance)
                browser.mobile
            )
                // Mobile devices
                off();
            // Enable everywhere else.
            else {
                breakpoints.on('>large', on);
                breakpoints.on('<=large', off);
            }
        });

        $window
            .off('load._parallax resize._parallax')
            .on('load._parallax resize._parallax', function() {
                $window.trigger('scroll');
            });

        return $(this);
    };

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Scrolly.
    $('.scrolly').scrolly();

    // Background.
    $wrapper._parallax(0.925);

    // Nav Panel.

    // Toggle.
    $navPanelToggle = $(
        '<a href="#navPanel" id="navPanelToggle">Menu</a>'
    ).appendTo($wrapper);

    // Change toggle styling once we've scrolled past the header.
    $header.scrollex({
        bottom: '5vh',
        enter: function() {
            $navPanelToggle.removeClass('alt');
        },
        leave: function() {
            $navPanelToggle.addClass('alt');
        }
    });

    // Panel.
    $navPanel = $(
        '<div id="navPanel">' +
            '<nav>' +
            '</nav>' +
            '<a href="#navPanel" class="close"></a>' +
            '</div>'
    )
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-navPanel-visible'
        });

    // Get inner.
    $navPanelInner = $navPanel.children('nav');

    // Move nav content on breakpoint change.
    var $navContent = $nav.children();

    breakpoints.on('>medium', function() {
        // NavPanel -> Nav.
        $navContent.appendTo($nav);

        // Flip icon classes.
        $nav.find('.icons, .icon').removeClass('alt');
    });

    breakpoints.on('<=medium', function() {
        // Nav -> NavPanel.
        $navContent.appendTo($navPanelInner);

        // Flip icon classes.
        $navPanelInner.find('.icons, .icon').addClass('alt');
    });

    // Hack: Disable transitions on WP.
    if (browser.os == 'wp' && browser.osVersion < 10)
        $navPanel.css('transition', 'none');

    // Intro.
    var $intro = $('#intro');

    if ($intro.length > 0) {
        // Hack: Fix flex min-height on IE.
        if (browser.name == 'ie') {
            $window
                .on('resize.ie-intro-fix', function() {
                    var h = $intro.height();

                    if (h > $window.height()) $intro.css('height', 'auto');
                    else $intro.css('height', h);
                })
                .trigger('resize.ie-intro-fix');
        }

        // Hide intro on scroll (> small).
        breakpoints.on('>small', function() {
            $main.unscrollex();

            $main.scrollex({
                mode: 'bottom',
                top: '25vh',
                bottom: '-50vh',
                enter: function() {
                    $intro.addClass('hidden');
                },
                leave: function() {
                    $intro.removeClass('hidden');
                }
            });
        });

        // Hide intro on scroll (<= small).
        breakpoints.on('<=small', function() {
            $main.unscrollex();

            $main.scrollex({
                mode: 'middle',
                top: '15vh',
                bottom: '-15vh',
                enter: function() {
                    $intro.addClass('hidden');
                },
                leave: function() {
                    $intro.removeClass('hidden');
                }
            });
        });
    }
})(jQuery);

// Slideshow

var i = 0;
var images = [];
var time = 3000;

// Image List
images[0] = 'images/cloud/cloud-homepage.png';
images[1] = 'images/cloud/cloud-login.png';
images[2] = 'images/cloud/cloud-nopics.png';
images[3] = 'images/cloud/cloud-pics.png';

// Changes Image

function changeImg() {
    if (document.slide) {
        document.slide.src = images[i];

        if (i < images.length - 1) {
            i++;
        } else {
            i = 0;
        }

        setTimeout('changeImg()', time);
    }
}

var iTwo = 0;
var imagesTwo = [];

// Image List
imagesTwo[0] = 'images/carinsurance/carinsurance.png';
imagesTwo[1] = 'images/carinsurance/carinsurance-quote.png';
imagesTwo[2] = 'images/carinsurance/carinsurance-admin.png';

// Changes Image

function changeImgSecond() {
    if (document.slidetwo) {
        document.slidetwo.src = imagesTwo[iTwo];

        if (iTwo < imagesTwo.length - 1) {
            iTwo++;
        } else {
            iTwo = 0;
        }

        setTimeout('changeImgSecond()', time);
    }
}

var iThree = 0;
var imagesThree = [];

imagesThree[0] = 'images/phone-book/homepage.jpg';
imagesThree[1] = 'images/phone-book/login.jpg';
imagesThree[2] = 'images/phone-book/register.jpg';

function changeImgThree() {
    if (document.slidethree) {
        document.slidethree.src = imagesThree[iThree];

        if (iThree < imagesThree.length - 1) {
            iThree++;
        } else {
            iThree = 0;
        }

        setTimeout('changeImgThree()', time);
    }
}

// slideshow 4
var iFour = 0;
var imagesFour = [];

imagesFour[0] = 'images/lol-summoners/homepage.png';
imagesFour[1] = 'images/lol-summoners/summoner.jpg';

function changeImgFour() {
    if (document.slideFour) {
        document.slideFour.src = imagesFour[iFour];

        if (iFour < imagesFour.length - 1) {
            iFour++;
        } else {
            iFour = 0;
        }

        setTimeout('changeImgFour()', time);
    }
}

// slideshow 5
var iFive = 0;
var imagesFive = [];

imagesFive[0] = 'images/it-work-orders/homepage.png';
imagesFive[1] = 'images/it-work-orders/add-log.png';
imagesFive[2] = 'images/it-work-orders/add-tech.png';
imagesFive[3] = 'images/it-work-orders/tech-list.png';

function changeImgFive() {
    if (document.slideFive) {
        document.slideFive.src = imagesFive[iFive];

        if (iFive < imagesFive.length - 1) {
            iFive++;
        } else {
            iFive = 0;
        }

        setTimeout('changeImgFive()', time);
    }
}

window.onload = changeImgThree();
window.onload = changeImgFour();
window.onload = changeImgFive();
window.onload = changeImg();
window.onload = changeImgSecond();
