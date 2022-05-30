import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
window['$'] = window['jQuery'] = $;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  loadData() {
      if(document.getElementsByClassName('sidebar-wrapper')[0].classList.contains('close_icon')) {
        let element =  document.getElementsByClassName('page-body')[0] as any;
        element.style.marginLeft = '280px';
      } else {
        let element =  document.getElementsByClassName('page-body')[0] as any;
        element.style.marginLeft = '100px';
      }   
  }

  ngOnInit(): void {
    const $nav = $('.sidebar-wrapper');
    const $header = $('.page-header');
    const $toggle_nav_top: any = $('.toggle-sidebar');
    $toggle_nav_top.click(function () {
      // $this = $(this);
      // $nav = $('.sidebar-wrapper');
      $nav.toggleClass('close_icon');
      $header.toggleClass('close_icon');
      $(window).trigger('overlay');
    });
    $(window).on('overlay', function () {
      const $bgOverlay: any = $(".bg-overlay");
      const $isHidden: any = $nav.hasClass('close_icon');
      if (window.innerWidth <= 991 && !$isHidden && $bgOverlay.length === 0) {
        $('<div class="bg-overlay active"></div>').appendTo($('body'));
      }

      if ($isHidden && $bgOverlay.length > 0) {
        $bgOverlay.remove();
      }
    });

    $('.sidebar-wrapper .back-btn').on('click', function (e) {
      $(".page-header").toggleClass("close_icon");
      $(".sidebar-wrapper").toggleClass("close_icon");
      $(window).trigger('overlay');
    });

    $("body").on("click", ".bg-overlay", function () {
      $header.addClass("close_icon");
      $nav.addClass("close_icon");
      $(this).remove();
    });

    const $body_part_side: any = $('.body-part');
    $body_part_side.click(function () {
      $toggle_nav_top.attr('checked', false);
      $nav.addClass('close_icon');
      $header.addClass('close_icon');
    });

    //    responsive sidebar
    var $window = $(window);
    var widthwindow: any = $window.width();
    (function ($)
 {
      "use strict";
      if (widthwindow <= 991) {
        $toggle_nav_top.attr('checked', false);
        $nav.addClass("close_icon");
        $header.addClass("close_icon");
      }
    })(jQuery);
    $(window).resize(function () {
      var widthwindaw: any = $window.width();
      if (widthwindaw <= 991) {
        $toggle_nav_top.attr('checked', false);
        $nav.addClass("close_icon");
        $header.addClass("close_icon");
      } else {
        $toggle_nav_top.attr('checked', true);
        $nav.removeClass("close_icon");
        $header.removeClass("close_icon");
      }
    });

    // horizontal arrows
    var view = $("#sidebar-menu");
    var move = "500px";
    var leftsideLimit = -500

    var getMenuWrapperSize = function () {
      return $('.sidebar-wrapper').innerWidth();
    }
    var menuWrapperSize: any = getMenuWrapperSize();

    if ((menuWrapperSize) >= '1660') {
      var sliderLimit = -3000

    } else if ((menuWrapperSize) >= '1440') {
      var sliderLimit = -3600
    } else {
      var sliderLimit = -4200
    }

    $("#left-arrow").addClass("disabled");
    $("#right-arrow").click(function () {
      var currentPosition = parseInt(view.css("marginLeft"));
      if (currentPosition >= sliderLimit) {
        $("#left-arrow").removeClass("disabled");
        view.stop(false, true).animate({
          marginLeft: "-=" + move
        }, {
          duration: 400
        })
        if (currentPosition == sliderLimit) {
          $(this).addClass("disabled");
          console.log("sliderLimit", sliderLimit);
        }
      }
    });

    $("#left-arrow").click(function () {
      var currentPosition = parseInt(view.css("marginLeft"));
      if (currentPosition < 0) {
        view.stop(false, true).animate({
          marginLeft: "+=" + move
        }, {
          duration: 400
        })
        $("#right-arrow").removeClass("disabled");
        $("#left-arrow").removeClass("disabled");
        if (currentPosition >= leftsideLimit) {
          $(this).addClass("disabled");
        }
      }
    });

    // page active
    if ($('#pageWrapper').hasClass('compact-wrapper')) {
      $(".sidebar-wrapper nav").find("a").removeClass("active");
      $(".sidebar-wrapper nav").find("li").removeClass("active");

      var current = window.location.pathname;

         }

    $('.left-header .mega-menu .nav-link').on('click', function (e) {
      $(this).toggleClass("active");
      $(this).parent().children('.mega-menu-container').toggleClass("d-block").slideToggle();
    });

    $(".left-header .level-menu .header-level-menu").css('display', 'none');
    $('.left-header .level-menu .nav-link').on('click', function (e) {
      $(this).toggleClass("active");
      $(this).parent().children('.header-level-menu').toggleClass("d-block").slideToggle();
    });

    $('.left-header .link-section > div').on('click', function (e) {
      if (window.innerWidth <= 1199) {
        $(".left-header .link-section > div").removeClass("active");
        $(this).toggleClass("active");
        $(this).parent().children('ul').toggleClass("d-block").slideToggle();
      }
    });

    if (window.innerWidth <= 1199) {
      $(".left-header .link-section").children('ul').css('display', 'none');
      $(this).parent().children('ul').toggleClass("d-block").slideToggle();
    }
  }
}
