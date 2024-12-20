'use strict';


// Init all plugin when document is ready 
window.addEventListener('load', function() {
    // 1. Initialization
    // Init console to avoid error
    var method;
    var mainWindow = $(window);
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
    // 1. Page Loader : hide loader when all are loaded
    var pageLoader = document.querySelector('#page-loader');
    if (pageLoader) {
        pageLoader.classList.add('p-hidden');
    }
    document.body.classList.add('page-loaded');

    // 2. Background
    // Background image as data attribut 
    var list = $('.bg-img');
    for (var i = 0; i < list.length; i++) {
        var src = list[i].getAttribute('data-image-src');
        list[i].style.backgroundImage = "url('" + src + "')";
        list[i].style.backgroundRepeat = "no-repeat";
        list[i].style.backgroundPosition = "center";
        list[i].style.backgroundSize = "cover";
    }

    // Background color as data attribut
    var list = $('.bg-color');
    for (var i = 0; i < list.length; i++) {
        var src = list[i].getAttribute('data-bgcolor');
        list[i].style.backgroundColor = src;
    }

    // 3. Background gradient as data attribut
    var list = $('.bg-gradient');
    for (var i = 0; i < list.length; i++) {
        var grd1 = list[i].getAttribute('data-gradient-1');
        var opacity = list[i].getAttribute('data-opacity');
        var grd2 = list[i].getAttribute('data-gradient-2');
        var grd3 = "";
        if (list[i].getAttribute('data-gradient-3')) {
            grd3 = ", " + list[i].getAttribute('data-gradient-3');
        }
        $(list[i]).css("background", "linear-gradient(to bottom, " + grd1 + ", " + grd2 + grd3 + ")");
        $(list[i]).css("opacity", opacity)
    }


    // 4. Show/hide menu when icon is clicked
    var menuItems = $('.page-menu');
    var menuIcon = $('.menu-icon,#menu-link');
    // Menu icon clicked
    menuIcon.on('click', function() {
        if (menuIcon.hasClass('menu-visible')) {
            menuIcon.removeClass('menu-visible');
        } else {
            menuIcon.addClass('menu-visible');
        }
        if (menuItems.hasClass('menu-visible')) {
            menuItems.removeClass('menu-visible');
        } else {
            menuItems.addClass('menu-visible');
        }
        return false;
    });
    // Hide menu after a menu item clicked
    $(".page-menu a").on('click', function() {
        if (menuItems.hasClass('menu-visible')) {
            menuIcon.removeClass('menu-visible');
            menuItems.removeClass('menu-visible');
        }
        return true;
    });

    // 5. Init Slideshow background 
    var imageList = $('.slide-show .img');
    var imageSlides = [];
    for (var i = 0; i < imageList.length; i++) {
        var src = imageList[i].getAttribute('data-src');
        imageSlides.push({
            src: src
        });
    }
    $('.slide-show').vegas({
        delay: 5000,
        shuffle: true,
        slides: imageSlides,
        animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
    });

    // 6. Init video background
    $('.video-container video, .video-container object').maximage('maxcover');

    // 7. Products/Projects/items slider
    var swiper = new Swiper('.items-slide', {
        pagination: '.items-pagination',
        paginationClickable: '.items-pagination',
        nextButton: '.items-button-next',
        prevButton: '.items-button-prev',
        grabCursor: true,
        slidesPerView: '1',
        centeredSlides: false,
        spaceBetween: 0,
        breakpoints: {
            1024: {
                slidesPerView: 1,
            },
            800: {
                slidesPerView: 1,
                spaceBetween: 32
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 32
            },
            440: {
                slidesPerView: 1,
                spaceBetween: 32
            }
        }
    });

    //8. toggle hide-header class of header on scoll down or up
    var prevScrollpos = window.pageYOffset;
    var pageHeader = document.querySelector('.menu-links');
    window.addEventListener("scroll", function() {
        // window.onscroll = function() {
        var currScrollpos = window.pageYOffset;
        if (currScrollpos > prevScrollpos && currScrollpos > 100) {
            if (!pageHeader.classList.contains('scrolled')) {
                pageHeader.classList.add('scrolled');
            };
        } else {
            pageHeader.classList.remove('scrolled');
        }
        prevScrollpos = window.pageYOffset;

        // add scrolled class to body if document is scrolled
        if (window.pageYOffset > 100) {
            if (!document.body.classList.contains('scrolled')) {
                document.body.classList.add('scrolled');
            }
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // 9. Init fullPage.js plugin
    var pageSectionDivs = $('.fullpg .section');
    var headerLogo = $('.header-top .logo');
    var bodySelector = $('body');
    var sectionSelector = $('.section');
    var slideElem = $('.slide');
    var arrowElem = $('.p-footer .arrow-d');
    var pageElem = $('.section');
    var mainPage = $('#mainpage');
    var mainPageBg = $('#main-page-bg');
    var pageSections = [];
    var pageAnchors = [];
    var nextSectionDOM;
    var nextSection;
    if (window.innerWidth < 600) {
        scrollOverflow = false;
        autoScrolling = false;
    } else {
        // large screen
        $('.section-home').height = window.height;
    }
    for (var i = 0; i < pageSectionDivs.length; i++) {
        pageSections.push(pageSectionDivs[i]);
    }
    window.asyncEach(pageSections, function(pageSection, cb) {
        var anchor = pageSection.getAttribute('data-section');
        pageAnchors.push(anchor + "");
        cb();
    }, function(err) {
        if (mainPage.height()) {
            // config fullpage.js
            mainPage.fullpage({
                menu: '#qmenu',
                anchors: pageAnchors,
                // responsiveWidth: 601,
                // scrollOverflow: false,
                // verticalCentered: true,
                // fitToSection: false,
                // autoScrolling: false,// scroll auto
                // scrollOverflow: scrollOverflow,
                scrollOverflow: false,
                verticalCentered: true,
                fitToSection: false,
                // autoScrolling: autoScrolling,// scroll auto
                autoScrolling: false, // scroll auto
                fixedElements: '.section .page-title',
                css3: false,
                navigation: true,
                onLeave: function(index, nextIndex, direction) {
                    // Behavior when a full page is leaved
                    arrowElem.addClass('gone');
                    pageElem.addClass('transition');
                    slideElem.removeClass('transition');
                    pageElem.removeClass('transition');

                    nextSectionDOM = sectionSelector[(nextIndex - 1)];
                    nextSection = $(nextSectionDOM);
                    if (nextSection.hasClass('dark-bg')) {
                        bodySelector.addClass('dark-section');
                        headerLogo.addClass('dark-bg');
                    } else {
                        bodySelector.removeClass('dark-section');
                        headerLogo.removeClass('dark-bg');
                    }
                },
                afterLoad: function(anchorLink, index) {
                    // Behavior after a full page is loaded
                    // manage dark bg for active section
                    var activeSection = $('.section.active');

                    if (activeSection.hasClass('section-color')) {
                        if (activeSection.attr("data-bgcolor")) {
                            mainPageBg.css("background-color", activeSection.attr("data-bgcolor"));
                        } else {
                            mainPageBg.css("background-color", "rgba(0,0,0,0)");
                        }
                    } else {
                        mainPageBg.css("background-color", "rgba(0,0,0,0)");
                    }

                    // page title
                    var activeTitles = $('.page-title.fixed-top');
                    activeTitles.removeClass('active');
                    if (activeSection.attr("data-section")) {
                        var activeTitle = $('.page-title.fixed-top[data-section="' + activeSection.attr("data-section") + '"]')
                        activeTitle.addClass('active');
                    }

                }
            });

        }
    });
    // Scroll to fullPage.js next/previous section
    $('.s-footer a.down').on('click', function() {
        $.fn.fullpage.moveSectionDown();
    });
    $('.s-footer a.up').on('click', function() {
        $.fn.fullpage.moveSectionUp();
    });


    //-- START : ONLY BY DEMO PAGE
    // 10. Detect CSS style then inject it to the head (such used by the demo page)
    var childStyle = qs('style');
    var childStyleLink = $('#child-style');
    if (childStyle) {
        switch (childStyle) {
            case 'style-1':
                childStyleLink.attr("href", "./css/style-color1.css")
                break;
            case 'style-2':
                childStyleLink.attr("href", "./css/style-color2.css")
                break;
            case 'style-3':
                childStyleLink.attr("href", "./css/style-color3.css")
                break;
            case 'style-4':
                childStyleLink.attr("href", "./css/style-color4.css")
                break;

            default:
                childStyleLink.attr("href", "./css/style-color.css")
                break;
        }
    }
    // Get query parameters
    function qs(key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }
    //-- END : ONLY BY DEMO PAGE

});