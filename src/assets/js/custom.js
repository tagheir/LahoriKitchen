function isMobile() {
    //mobile detection
    if (Modernizr.mq('only all and(max-width: 767px)')) {
        return true;
    } else {
        return false;
    }
}
/* =====================================================================
 * DOCUMENT READY
 * =====================================================================
 */
$(document).ready(function() {

    Modernizr.addTest('ipad', function() {
        return !!navigator.userAgent.match(/iPad/i);
    });
    Modernizr.addTest('iphone', function() {
        return !!navigator.userAgent.match(/iPhone/i);
    });
    Modernizr.addTest('ipod', function() {
        return !!navigator.userAgent.match(/iPod/i);
    });
    Modernizr.addTest('ios', function() {
        return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
    });

    initializeMainMenu();

    $('body').addClass('loaded');

    $('a[href^="#"]:not(a[href$="#"])').on('click', function(e) {
        e.defaultPrevented;
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - parseInt($('body').css('padding-top'))
        }, 1400, 'easeInOutCirc');
        return false;
    });
    $('a#toTop').on('click', function(e) {
        e.defaultPrevented;
        $('html, body').animate({ scrollTop: '0px' });
        return false;
    });
    $('body').bind('touchmove', function(e) {
        $(window).trigger('scroll');
    });
    $(window).on('onscroll scrollstart touchmove', function() {
        $(window).trigger('scroll');
    });
    $(window).on('scroll', function() {
        var scroll_1 = $('html, body').scrollTop();
        var scroll_2 = $('body').scrollTop();
        var scrolltop = scroll_1;
        if (scroll_1 === 0) scrolltop = scroll_2;

        if (scrolltop >= 200) $('a#toTop').css({ bottom: '30px' });
        else $('a#toTop').css({ bottom: '-40px' });
        if (scrolltop > 0) $('.navbar-fixed-top').addClass('fixed');
        else $('.navbar-fixed-top').removeClass('fixed');
    });
    $(window).trigger('scroll');

    $(window).on('resize', function() {
        if (!Modernizr.ipad) {
            initializeMainMenu();
        }
    });

    /* =================================================================
     * STYLE SWITCHER
     * =================================================================
     */
    $('body').append(
        // '<div id="styleSwitcher">'+
        //     '<a id="btnSwitcher" href="#"><i class="fa fa-cog"></i></a>'+
        //     '<h4>STYLE SWITCHER</h4>'+
        //     '<ul class="color-switcher">'+
        //         '<li><a href="/coffee.css" style="background-color:#A3855D;"></a></li>'+
        //         '<li><a href="/green.css" style="background-color:#8BC85E;"></a></li>'+
        //         '<li><a href="/grey.css" style="background-color:#808080;"></a></li>'+
        //         '<li><a href="/orange.css" style="background-color:#F24937;"></a></li>'+
        //         '<li><a href="/gold.css" style="background-color:#A67C00;"></a></li>'+
        //         '<li><a href="/yellow.css" style="background-color:#F6B202;"></a></li>'+
        //         '<li><a href="/pink.css" style="background-color:#CE1241;"></a></li>'+
        //         '<li><a href="/red.css" style="background-color:#C43540;"></a></li>'+
        //     '</ul>'+
        // '</div>'
    );
    if ($.cookie('css')) $('#colors').attr('href', $.cookie('css'));
    $('.color-switcher li a').on('click', function() {
        var stylesheet = $('#colors').attr('href');
        stylesheet = stylesheet.replace(stylesheet.substr(stylesheet.lastIndexOf('/')), $(this).attr('href'));
        $('#colors').attr('href', stylesheet);
        $.cookie('css', stylesheet);
        return false;
    });
    $('#btnSwitcher').on('click', function() {
        if ($('#styleSwitcher').css('left') === '-180px') {
            $('#styleSwitcher').animate({ 'left': 0 },
                300, 'easeOutQuart'
            );
        } else {
            $('#styleSwitcher').animate({ 'left': -180 },
                300, 'easeInQuart'
            );
        }
        return false;
    });

    /* =================================================================
     * STELLAR - PARALLAX
     * =================================================================
     */
    if ($('.stellar').length) {
        if (!Modernizr.ios) {
            $('.stellar').css('background-attachment', 'fixed');
        }
        $(window).stellar({
            horizontalScrolling: false,
            responsive: true
        });
    }

    /* =================================================================
     * form placeholder for IE
     * =================================================================
     */
    if (!Modernizr.input.placeholder) {
        $('[placeholder]').on('focus', function() {
            var input = $(this);
            if (input.val() === input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).on('blur', function() {
            var input = $(this);
            if (input.val() === '' || input.val() === input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).trigger('blur');
        $('[placeholder]').parents('form').on('submit', function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() === input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
    /* =================================================================
     * DATEPICKER
     * =================================================================
     */
    if ($('.datepicker').length) {
        $('.datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: null
        });
    }
    /* =================================================================
     * FORM VALIDATOR
     * =================================================================
     */
    if ($('.form-validator').length) {
        $.validate({
            modules: 'html5'
        });
    }
    /* =================================================================
     * AJAX FORM
     * =================================================================
     */
    if ($('form.ajax-form').length) {
        function sendAjaxForm(form, action, targetCont, refresh) {
            var posQuery = action.indexOf('?');
            var extraData = '';
            if (posQuery != -1) {
                extraData = action.substr(posQuery + 1);
                if (extraData != '') extraData = '&' + extraData;
                action = action.substr(0, posQuery);
            }

            $.ajax({
                url: action,
                type: form.attr('method'),
                data: form.serialize() + extraData,
                success: function(response) {
                    $('.field-notice', form).html('').hide().parent().removeClass('has-error');

                    $('.alert.alert-danger').html('').hide();
                    $('.alert.alert-success').html('').hide();

                    var response = $.parseJSON(response);

                    if (targetCont != '') $(targetCont).removeClass('loading-ajax');

                    if (response.error != '') $('.alert.alert-danger', form).html(response.error).slideDown();
                    else if (response.redirect != '' && response.redirect != undefined) window.location.href = response.redirect;
                    else if (refresh === true) window.location.reload(true);
                    if (response.success != '') {
                        $('.alert.alert-success', form).html(response.success).slideDown();
                        if (response.error === '' && response.notices.length === 0)
                            form[0].reset();
                    }

                    if (!$.isEmptyObject(response.notices)) {
                        if (targetCont != "") $(targetCont).hide();
                        $.each(response.notices, function(field, notice) {
                            var container = $('[name="' + field + '"]', form).parents('.form-group');
                            if ($('.field-notice', container).get(0) === undefined)
                                $('<div class="field-notice text-danger"></div>').appendTo(container);

                            $('.field-notice', container).html(notice).fadeIn('slow').parent().addClass('has-error');
                        });
                        if ($('.captcha_refresh', form).length) $('.captcha_refresh', form).trigger('click');
                    } else {
                        if (targetCont != "") {
                            $(targetCont).html(response.html);
                            if ($('.open-popup-link', form).length) {
                                $('.open-popup-link').magnificPopup({
                                    type: 'inline',
                                    midClick: true
                                });
                            }
                            if ($('.selectpicker', form).length) $('.selectpicker').selectpicker('refresh');
                        }
                    }
                }
            });
        }
        $('form.ajax-form').on('click change', '.sendAjaxForm', function(e) {
            e.defaultPrevented;
            var elm = $(this);
            var tagName = elm.prop('tagName');
            if ((e.type === 'click' && ((tagName === 'INPUT' && (elm.attr('type') === 'submit' || elm.attr('type') === 'image')) || tagName === 'A' || tagName === 'BUTTON')) || e.type === 'change') {
                var targetCont = elm.data('target');
                var refresh = elm.data('refresh');
                if (targetCont != "") $(targetCont).html('').addClass('loading-ajax').show();
                sendAjaxForm(elm.parents('form'), elm.data('action'), targetCont, refresh);
                if (tagName === 'A') return false;
            } else {
                if (tagName === 'A') return false;
            }
        });
        $('.submitOnClick').on('click', function(e) {
            e.defaultPrevented;
            $(this).parents('form').submit();
            return false;
        });
    }
    if ($('a.ajax-link').length) {
        $('a.ajax-link').on('click', function(e) {
            e.defaultPrevented;
            var elm = $(this);
            var href = elm.attr('href');
            $.ajax({
                url: elm.data('action'),
                type: 'get',
                success: function(response) {
                    if (href != '' && href != '#') $(location).attr('href', href);
                }
            });
            return false;
        });
    }
    /* =================================================================
     * MAGNIFIC POPUP
     * =================================================================
     */
    if ($('a.image-link').length) {
        $('a.image-link').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true
            }
        });
    }
    /* =================================================================
     * HTML5 VIDEO
     * =================================================================
     */
    if ($('.player').length) {
        $('.player').mb_YTPlayer();
    }
    /* =================================================================
     * TOOLTIP
     * =================================================================
     */
    $('.tips').tooltip({ placement: 'auto' });

    /* =================================================================
     * ALERT
     * =================================================================
     */
    $('.alert').delegate('button', 'click', function() {
        $(this).parent().fadeOut('fast');
    });
    /* =================================================================
     * ISOTOPE
     * =================================================================
     */
    if ($('.isotopeWrapper').length) {
        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').data('columns');

        setTimeout(function() {
            $container.addClass('loaded').isotope({
                layoutMode: 'masonry',
                itemSelector: '.isotopeItem',
                resizable: true,
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        }, 300);

        $('.filter-isotope').on('click', 'a', function(e) {
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 300,
                    easing: 'easeOutQuart'
                }
            });
            e.defaultPrevented;
            return false;
        });
        $(window).on('resize', function() {
            $container.isotope({
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
    }

    /* =================================================================
     * IMAGE FILL
     * =================================================================
     */
    if ($('.img-container').length) {
        $('.img-container').imagefill();
    }
    /* =================================================================
     * SHARRRE
     * =================================================================
     */
    if ($('#twitter').length) {
        $('#twitter').sharrre({
            share: {
                twitter: true
            },
            enableHover: false,
            enableTracking: false,
            buttons: { twitter: {} },
            click: function(api, options) {
                api.simulateClick();
                api.openPopup('twitter');
            }
        });
    }
    if ($('#facebook').length) {
        $('#facebook').sharrre({
            share: {
                facebook: true
            },
            enableHover: false,
            enableTracking: false,
            click: function(api, options) {
                api.simulateClick();
                api.openPopup('facebook');
            }
        });
    }
    if ($('#googleplus').length) {
        $('#googleplus').sharrre({
            share: {
                googlePlus: true
            },
            enableHover: false,
            enableTracking: true,
            urlCurl: $('#googleplus').attr('data-curl'),
            click: function(api, options) {
                api.simulateClick();
                api.openPopup('googlePlus');
            }
        });
    }
    /* =================================================================
     * FULL SCREEN HANDLER
     * =================================================================
     */
    if ($('.fullScreen').length) {
        function setFullscreen() {
            $('.fullScreen').each(function() {
                var height = $(window).height() - parseInt($(this).offset().top);
                var width = $(window).width();
                $(this).height(height);
            });
        }
        setFullscreen();
        $(window).on('resize', function() {
            setFullscreen();
        });
    }
    /* =====================================================================
     * APPEAR ANIMATION
     * =====================================================================
     */
    $('[data-anim]').each(function() {

        var obj = $(this);

        if (isMobile() === false) {

            obj.appear(function() {

                var delay = (obj.data('delay') ? obj.data('delay') : 1);
                if (delay > 1) obj.css('animation-delay', delay + 'ms');

                obj.addClass('animated').addClass(obj.data('anim'));

                setTimeout(function() {
                    obj.removeClass('appear').addClass('appear-visible');
                }, delay);

            }, { accX: 0, accY: -150 });

        } else {
            obj.removeClass('appear').addClass('appear-visible');
        }
    });
    /* =================================================================
     * ROYAL SLIDER
     * =================================================================
     */
    if ($('.royalSlider').length) {
        function royalSliderInit() {
            var height = $(window).height() - parseInt($('.royalSlider').offset().top);
            var width = $(window).width();
            $('.royalSlider').height(height);
            setTimeout(function() {
                $('.royalSlider').royalSlider({
                    arrowsNav: true,
                    loop: true,
                    keyboardNavEnabled: true,
                    controlsInside: false,
                    imageScaleMode: 'fill',
                    arrowsNavAutoHide: false,
                    autoHeight: false,
                    autoScaleSlider: false,
                    autoScaleSliderWidth: width,
                    autoScaleSliderHeight: height,
                    controlNavigation: 'bullets',
                    thumbsFitInViewport: false,
                    navigateByClick: true,
                    startSlideId: 0,
                    autoPlay: {
                        enabled: true,
                        pauseOnHover: true,
                        delay: 4000
                    },
                    transitionType: 'fade',
                    globalCaption: false,
                    deeplinking: {
                        enabled: true,
                        change: false
                    }
                });
            }, 400);
        }
        royalSliderInit();
        $(window).on('resize', function() {
            royalSliderInit();
        });
    }
    /* =================================================================
     * OWL CAROUSEL
     * =================================================================
     */
    if ($('.owlWrapper').length) {
        $('.owlWrapper').each(function() {
            $(this).owlCarousel({
                items: $(this).data('items'),
                singleItem: $(this).data('singleItem'),
                navigation: $(this).data('nav'),
                pagination: $(this).data('dots'),
                autoPlay: $(this).data('autoplay'),
                mouseDrag: $(this).data('mousedrag'),
                responsive: true,
                transitionStyle: $(this).data('transition'),
                itemsCustom: [0, 1]
            });
        });
    }
    /*==================================================================
     * GOOGLE MAP
     * =================================================================
     */
    if ($('#mapWrapper').length) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.google.com/maps/api/js?callback=initialize';
        document.body.appendChild(script);
    }
});

function initialize(id) {

    var locations = [
        // ['Name', 'Address', Latitude, Longitude]
        // Edit the existing location and add places if needed
        ['Red Bistro', 'Westminster London SW1A 0AA', '51.499887', '-0.124512'],
        // ['location 2', 'my full address', '36.399795', '25.451858'],
        // ['location 3', 'my full address', '36.399795', '25.451858'],
    ];
    var overlayTitle = 'Agencies';
    id = (id === undefined) ? 'mapWrapper' : id;

    var image = $('#' + id).attr('data-marker');
    var map = new google.maps.Map(document.getElementById(id), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl: true,
        scaleControl: false,
        zoom: 14,
        styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "lightness": "-31"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "lightness": "0"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "lightness": "100"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "lightness": "-63"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "lightness": "-41"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "color": "#3d3d3d"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    });
    var myLatlng;
    var marker, i;
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow({ content: 'loading...' });
    for (i = 0; i < locations.length; i++) {
        if (locations[i][2] !== undefined && locations[i][3] !== undefined) {
            var content = '<div class="infoWindow">' + locations[i][0] + '<br>' + locations[i][1] + '</div>';
            (function(content) {
                myLatlng = new google.maps.LatLng(locations[i][2], locations[i][3]);
                marker = new google.maps.Marker({
                    position: myLatlng,
                    icon: image,
                    title: overlayTitle,
                    map: map
                });
                google.maps.event.addListener(marker, 'click', (function() {
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, this);
                    };
                })(this, i));
                if (locations.length > 1) {
                    bounds.extend(myLatlng);
                    map.fitBounds(bounds);
                } else {
                    map.setCenter(myLatlng);
                }
            })(content);
        } else {
            var geocoder = new google.maps.Geocoder();
            var info = locations[i][0];
            var addr = locations[i][1];
            var latLng = locations[i][1];
            (function(info, addr) {
                geocoder.geocode({
                    'address': latLng
                }, function(results) {
                    myLatlng = results[0].geometry.location;
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        icon: image,
                        title: overlayTitle,
                        map: map
                    });
                    var $content = '<div class="infoWindow">' + info + '<br>' + addr + '</div>';
                    google.maps.event.addListener(marker, 'click', (function() {
                        return function() {
                            infowindow.setContent($content);
                            infowindow.open(map, this);
                        };
                    })(this, i));
                    if (locations.length > 1) {
                        bounds.extend(myLatlng);
                        map.fitBounds(bounds);
                    } else {
                        map.setCenter(myLatlng);
                    }
                });
            })(info, addr);
        }
    }
}

/* =====================================================================
 * MAIN MENU
 * =====================================================================
 */
function initializeMainMenu() {
    'use strict';
    var $mainMenu = $('#mainMenu').children('ul');
    if (isMobile() === true || Modernizr.mq('(max-width: 767px)')) {
        // Responsive Menu Events
        var addActiveClass = false;
        $('a.hasSubMenu').unbind('click');
        $('li', $mainMenu).unbind('mouseenter mouseleave');
        $('.dropdown-btn').on('click', function(e) {

            addActiveClass = $(this).parent('li').hasClass('Nactive');
            if ($(this).parent('li').hasClass('primary'))
                $('li', $mainMenu).removeClass('Nactive');
            else
                $('li:not(.primary)', $mainMenu).removeClass('Nactive');

            if (!addActiveClass)
                $(this).parents('li').addClass('Nactive');
            else
                $(this).parent().parent('li').addClass('Nactive');
        });
    } else if (Modernizr.mq('(max-width: 1024px)') && Modernizr.touch) {
        $('a.hasSubMenu').attr('href', '');
        $('a.hasSubMenu').on('touchend', function(e) {
            var $li = $(this).parent(),
                $subMenu = $li.children('.subMenu');
            if ($(this).data('clicked_once')) {
                if ($li.parent().is($(':gt(1)', $mainMenu))) {
                    if ($subMenu.css('display') === 'block') {
                        $li.removeClass('hover');
                        $subMenu.css('display', 'none');
                    } else {
                        $('.subMenu').css('display', 'none');
                        $subMenu.css('display', 'block');
                    }
                } else
                    $('.subMenu').css('display', 'none');
                $(this).data('clicked_once', false);
            } else {
                $li.parent().find('li').removeClass('hover');
                $li.addClass('hover');
                if ($li.parent().is($(':gt(1)', $mainMenu))) {
                    $li.parent().find('.subMenu').css('display', 'none');
                    $subMenu.css('left', $subMenu.parent().outerWidth(true));
                    $subMenu.css('display', 'block');
                } else {
                    $('.subMenu').css('display', 'none');
                    $subMenu.css('display', 'block');
                }
                $('a.hasSubMenu').data('clicked_once', false);
                $(this).data('clicked_once', true);

            }
            e.defaultPrevented;
            return false;
        });
        window.addEventListener('orientationchange', function() {
            $('a.hasSubMenu').parent().removeClass('hover');
            $('.subMenu').css('display', 'none');
            $('a.hasSubMenu').data('clicked_once', false);
        }, true);
    } else {
        $('li', $mainMenu).removeClass('Nactive');
        $('a', $mainMenu).unbind('click');
        $('li', $mainMenu).hover(
            function() {
                var $this = $(this),
                    $subMenu = $this.children('.subMenu');
                if ($subMenu.length) {
                    $this.addClass('hover').stop();
                } else {
                    if ($this.parent().is($(':gt(1)', $mainMenu))) {
                        $this.stop(false, true).fadeIn('slow');
                    }
                }
                if ($this.parent().is($(':gt(1)', $mainMenu))) {
                    $subMenu.stop(true, true).fadeIn(200, 'easeInOutQuad');
                    $subMenu.css('left', $subMenu.parent().outerWidth(true));
                } else
                    $subMenu.stop(true, true).delay(300).fadeIn(200, 'easeInOutQuad');

            },
            function() {
                var $nthis = $(this),
                    $subMenu = $nthis.children('ul');
                if ($nthis.parent().is($(':gt(1)', $mainMenu))) {
                    $nthis.children('ul').hide();
                    $nthis.children('ul').css('left', 0);
                } else {
                    $nthis.removeClass('hover');
                    $('.subMenu').stop(true, true).delay(300).fadeOut();
                }
                if ($subMenu.length) { $nthis.removeClass('hover'); }
            }
        );
    }
}