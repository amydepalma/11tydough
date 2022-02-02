/////////////////////////////////////////////////////////////////////////////////////////////
// MOBILE NAV - This plugin is used for the drilldown affect of the mobile menu.
/////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A simple jQuery plugin for creating animated drilldown menus.
 * https://github.com/Cinamonas/jquery-drilldown
 * @name jQuery Drilldown
 * @version 1.1.1
 * @requires jQuery v1.7+
 * @author Aleksandras Nelkinas
 * @license [MIT]{@link http://opensource.org/licenses/mit-license.php}
 *
 * Copyright (c) 2015 Aleksandras Nelkinas
 */
// !function (t) { "function" === typeof define && define.amd ? define(["jquery"], t) : "object" === typeof exports ? module.exports = t(require("jquery")) : t(jQuery) }(function (t, s) { "use strict"; var i = "drilldown", e = "data-next-parent", n = { event: "click", selector: ".subnav-trigger", speed: 100, cssClass: { container: i + "-container", root: i + "-root", sub: i + "-sub", back: i + "-back" } }, o = function () { function o(s, e) { var o = this; this._name = i, this._defaults = n, this.element = s, this.$element = t(s), this.options = t.extend({}, n, e), this._history = [], this._css = { float: "left", width: null }, this.$container = this.$element.find("." + this.options.cssClass.container), this.$element.on(this.options.event + "." + i, this.options.selector, function (s) { h.call(o, s, t(this)) }) } function h(t, s) { var i = s.nextAll("." + this.options.cssClass.sub), e = !0; i.length ? a.call(this, i) : s.closest("." + this.options.cssClass.back).length ? r.call(this) : e = !1, e && "A" === s.prop("tagName") && t.preventDefault() } function a(t, i) { var n = i && i.speed !== s ? i.speed : this.options.speed; t.length && (this._css.width = this.$element.outerWidth(), this.$container.width(2 * this._css.width), t.parent().attr(e, !0), t = t.removeClass(this.options.cssClass.sub).addClass(this.options.cssClass.root), this.$container.append(t), c.call(this, { marginLeft: -1 * this._css.width, speed: n }, function () { var s = t.prev(); this._history.push(s.detach()), l.call(this, t) }.bind(this))) } function r(t) { var i = t && t.speed !== s ? t.speed : this.options.speed, n = this._history.pop(); this._css.width = this.$element.outerWidth(), this.$container.width(2 * this._css.width), this.$container.prepend(n), c.call(this, { marginLeft: 0, speed: i }, function () { var t = n.next(); t.addClass(this.options.cssClass.sub).removeClass(this.options.cssClass.root), this.$container.find("[" + e + "]").last().removeAttr(e).append(t), l.call(this, n) }.bind(this)) } function c(t, s) { var i = this.$container.children("." + this.options.cssClass.root); i.css(this._css), i.first().animate({ marginLeft: t.marginLeft }, t.speed, s) } function l(t) { t.css({ float: "", width: "", marginLeft: "" }), this.$container.css("width", "") } return o.prototype = { destroy: function () { this.reset(), this.$element.off(this.options.event + "." + i, this.options.selector) }, reset: function () { var t; for (t = this._history.length; t > 0; t--) r.call(this, { speed: 0 }); this._history = [], this._css = { float: "left", width: null } } }, o }(); t.fn[i] = function (s) { return this.each(function () { var e = t.data(this, i), n = s; e ? "string" === typeof n && ("destroy" === n && t.removeData(this, i), "function" === typeof e[n] && e[n]()) : t.data(this, i, new o(this, s)) }) } });

var Site = Site || {}
Site.nav = Site.nav || {}

Site.nav = {
	// Set the height variables so should the user scroll/resize in one go, we can have the header adapt
	mobileHeaderHeight: 47,
	mobileHeaderHeightWithAlert: 79,
	tabletHeaderHeight: 125,
	tabletHeaderHeightWithAlert: 157,
	tabletMenuMinWidth: 768,
	desktopHeaderHeight: 160,
	desktopHeaderHeightWithAlert: 192,
	desktopMenuMinWidth: 992,
	navOpen: false,
	drilldownWasActivated: false,
	initialWindowWidth: $(window).outerWidth(),
	fixedWrapHeight: $('#fixed-header-wrap').outerHeight(),
	currentfixedWrapHeight: 0,

	// Get height of fixed header so we can set the body's top margin
	setBodyTopMargin: function (h) {
		$('body').css('margin-top', h)
		this.currentfixedWrapHeight = h
	},

	//Speed for the drilldown slide down/up
	// options: {
	// 	speed: 250
	// },

	destroyDrilldown: function () {
		//			$('#drilldown').drilldown('destroy');
		$('#drilldown').attr('style', '')
		$('#menu-btn').removeClass('open')
		$('body').removeClass('locked')
		$('html').removeClass('locked')
		$('#menu-btn').removeClass('open')
		$('#drilldown').removeClass('keep-on-top')
		$('#menu-btn svg use').attr('xlink:href', '#icon-menu')
		this.navOpen = false
		$('.primary-lvl-1').attr('style', '')
		$('.primary-lvl-2').attr('style', '')
		$('.primary-lvl-3').attr('style', '')
		$('#fixed-header-wrap').removeClass('drilldownOpen')
		$('#fixed-header-wrap').removeClass('drilldownClosed')

		//Set drilldownWasActivated to false determine if we need to reinit if the user resizes back to mobile
		this.drilldownWasActivated = false
	},

	mobileNavExpand: function () {
		$('body').toggleClass('locked')
		$('html').toggleClass('locked')
		$('#menu-btn').toggleClass('open')
		$('#drilldown').toggleClass('keep-on-top')
		$('#drilldown').slideToggle('slow')

		//If search is open, close it before opening the menu
		if (!this.navOpen) {
			$('#menu-btn svg use').attr('xlink:href', '#icon-close')
			this.navOpen = true
		} else if (this.navOpen) {
			$('#menu-btn svg use').attr('xlink:href', '#icon-menu')
			this.navOpen = false
		}
	},

	windowResizeHandler: function (_fixedWrapHeight) {
		var widthCheck = $(window).outerWidth()

		//Add a class to the mobile link bar so we can check if it's visible so we can change the height if a user resizes from desktop/mobile, mobile/desktop whiel the header is sticky
		if (widthCheck < this.tabletMenuMinWidth) {
			$('#mobile-navbar-links').addClass('mobile-on')
		} else {
			$('#mobile-navbar-links').removeClass('mobile-on')
		}

		//On a window width change, check the height of the fixed header wrap. If it doesn't match the current height, update the body margin accordingly.
		//We do this so if users resize their browser, the breadcrumbs don't hide below the header
		//We only check for width because mobile browsers that hide the address bar on scroll (and thus have their height change) triggers the resize event. That is why mobile browsers were jumpy before
		if (widthCheck != this.initialWindowWidth) {
			//Control if the user resizes while at the top of the page
			if (this.currentfixedWrapHeight != _fixedWrapHeight && !$('#fixed-header-wrap').hasClass('fixed-on')) {
				this.setBodyTopMargin(_fixedWrapHeight)
				//Control if the user resizes while the top banner is fixed
			} else if ($('#fixed-header-wrap').hasClass('fixed-on')) {
				if ($('#mobile-navbar-links').hasClass('mobile-on')) {
					if ($('#alert-banner').length > 0) {
						this.setBodyTopMargin(this.mobileHeaderHeightWithAlert)
					} else {
						this.setBodyTopMargin(this.mobileHeaderHeight)
					}
				} else {
					if (widthCheck >= this.tabletMenuMinWidth && widthCheck < this.desktopMenuMinWidth) {
						if ($('#alert-banner').length > 0) {
							this.setBodyTopMargin(this.tabletHeaderHeightWithAlert)
						} else {
							this.setBodyTopMargin(this.tabletHeaderHeight)
						}
					} else {
						if ($('#alert-banner').length > 0) {
							this.setBodyTopMargin(this.desktopHeaderHeightWithAlert)
						} else {
							this.setBodyTopMargin(this.desktopHeaderHeight)
						}
					}
				}
			}

			//Reinit the drilldown mobile menu options when the page is resized on mobile
			if (widthCheck < this.tabletMenuMinWidth && !this.drilldownWasActivated) {
				//				$("#drilldown").drilldown(Site.nav.options);
				//Set drilldownWasActivated to true so we can use this to detect if we need to reset the menu on window resize
				this.drilldownWasActivated = true
			}

			//Reset this so if a user is on a mobile device and rotates, we have a new comparison
			this.initialWindowWidth = widthCheck

			//If the user is at the top of the screen and goes from desktop to mobile to desktop, AFTER having scrolled to the bottom of the page, then the utility nav style needs clear to ensure it shows when they go to desktop again
			if ($(window).scrollTop() > this.fixedWrapHeight && widthCheck < this.tabletMenuMinWidth) {
				if ($('#utility').attr('style') == '') {
					//Do nothing
				} else {
					//Clear style
					$('#utility').attr('style', '')
				}
			}
		}

		if (this.drilldownWasActivated && widthCheck >= this.tabletMenuMinWidth) {
			//Get rid of the plugins and mobile-specific transparent background styling when resizing from mobile to desktop if the drilldown has been activated. We only do it if it was activated; otherwise the drilldown turns on on desktop, making it so when you clicl a subnav-trigger, the menu slides to the right
			this.destroyDrilldown()
		}
	},

	windowScrollHandler: function () {
		var widthCheck = $(window).outerWidth()

		//Add/remove a class to the header when the user scrolls the height of the fixed-header-wrap (this class controls the styling of the header on sticky)
		//Hide/show the alert banner if there is one
		if ($(window).scrollTop() > this.fixedWrapHeight) {
			$('#fixed-header-wrap').addClass('fixed-on')

			if (widthCheck >= this.tabletMenuMinWidth) {
				$('#utility-bar').slideUp('fast')
			}

			if ($('#alert-banner:visible')) {
				$('#alert-banner').slideUp('fast')
			}
		} else {
			if ($('#alert-banner:visible')) {
				$('#alert-banner').slideDown('fast')
			}

			if (widthCheck >= this.tabletMenuMinWidth) {
				$('#utility-bar').slideDown(150)
			}

			$('#fixed-header-wrap').removeClass('fixed-on')
		}
	},

	init: function () {
		var fixedheight = $('#fixed-header-wrap').outerHeight()
		Site.nav.fixedWrapHeight = fixedheight
		Site.nav.currentfixedWrapHeight = fixedheight

		Site.nav.setBodyTopMargin(fixedheight)

		//Set up the drilldown mobile menu options when the page is loaded on mobile
		if (!$(window).outerWidth < Site.nav.tabletMenuMinWidth) {
			//			 $("#drilldown").drilldown(Site.nav.options);

			//Set to true so we can use this to detect if we need to destroy/reinit the menu on window resize
			Site.nav.drilldownWasActivated = true
		}

		//If on mobile, toggle the drilldown mobile menu on menu button click
		$('#menu-btn').click(function (e) {
			e.preventDefault()
			if ($(window).outerWidth() < Site.nav.tabletMenuMinWidth) {
				Site.nav.mobileNavExpand()
			}
		})

		// Slider setup

		$('.slider-big').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-thumbs',
		})

		$('.slider-thumbs').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.slider-big',
			dots: false,
			centerMode: true,
			focusOnSelect: true,
			respondTo: 'slider',
		})
	},
}

$(document).ready(function () {
	Site.nav.init()

	$(window).resize(function () {
		Site.nav.windowResizeHandler($('#fixed-header-wrap').height())
	})

	$(window).scroll(function () {
		Site.nav.windowScrollHandler()
	})
})
