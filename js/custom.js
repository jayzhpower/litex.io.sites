function isMobile() {
  var userAgentInfo = navigator.userAgent;

  var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

  var mobile_flag = false;

  //根据userAgent判断是否是手机
  for (var v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobile_flag = true;
      break;
    }
  }

  var screen_width = window.screen.width;
  var screen_height = window.screen.height;

  //根据屏幕分辨率判断是否是手机
  if (screen_width < 500 && screen_height < 800) {
    mobile_flag = true;
  }

  return mobile_flag;
}

function sync() {
  var windowHeight = window.innerHeight;

  $("section.listen").each(function() {
    var offset = $(this)[0].getBoundingClientRect();
    if (offset.bottom + 10 > windowHeight * 0.1 && offset.top < windowHeight * 0.5) {
      var id = $(this).attr('id');
      $("ul.nav-menu li").removeClass('menu-active');
      $("ul.nav-menu").find("a[href='#" + id + "']").parent('li').addClass('menu-active');
      return false;
    } else {
      var id = $(this).attr('id');
      $("ul.nav-menu").find("a[href='#" + id + "']").parent('li').removeClass('menu-active');
    }
  })
}

jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Header scroll class
  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 100) {
  //     $('#header').addClass('header-scrolled');
  //   } else {
  //     $('#header').removeClass('header-scrolled');
  //   }
  // });

  // Skills section
  $('#skills').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, { offset: '80%'} );

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: false,
    margin: 10,
    autoWidth:true,
    items: 5
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: true,
    items: 1
  });

  $(".icons-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: true,
    items: 5
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".investor-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: true,
    items: 1
  });

  sync()

  var mobile_flag = isMobile();
  var w = document.body.clientWidth;

  if (!mobile_flag) {
    $("#flow_img_id").attr('style', 'width:' + ((w / 1.8)) + 'px;');
  } else {
    $("#flow_img_id").attr('style', 'width: 100%;');

    if (w < 350) {
      $(".yellow-paper-draft").css({
        "margin-top": "1rem",
        "padding": "10px 21px"
      });
    }
  }
  window.addEventListener('scroll', sync, false);
  $("[data-toggle='tooltip']").tooltip();

  $(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
      $("#header").css("background-color", "#189DE8");
    } else {
      $("#header").css("background-color", "transparent");
    }
  });

});
