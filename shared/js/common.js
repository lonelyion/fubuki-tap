var aidn = aidn || {}
;(aidn.log = function () {
  window.console && console.log(arguments)
}),
  (aidn.alert = function () {
    for (var e = '', t = arguments.length, n = 0; n < t - 1; n++)
      e += arguments[n] + ', '
    0 < t && (e += arguments[n]), alert(e)
  }),
  (aidn.debug = function () {
    if ('undefined' != typeof jQuery) {
      for (var e = '', t = arguments.length, n = 0; n < t; n++)
        e += arguments[n] + ', '
      0 == $('#__debugx').length &&
        $('html').append(
          "<div id='__debugx' style='pointer-events:none;text-align:left;position:fixed;z-index:10000000;top:0;font-weight:bold;background:rgba(255,255,255,0.5);'></div>"
        ),
        $('#__debugx').prepend('<p>' + e + '</p>')
    }
  }),
  (aidn.constant = {
    album2ndJa: '/daniwell/cats/',
    album2ndEn: '/daniwell/cats/en/',
    advUrlJa: '/daniwell/',
    advUrlEn: '/daniwell/',
    advImg: 'shared/img/adv.gif',
    advTex: 'DANIWELL DISCOGRAPHY',
    advAlt: 'DANIWELL (Nyan Cat Song Creator) DISCOGRAPHY',
  })
try {
  for (
    var l = location.href.split('aidn')[1].split('/').length - 2, i = 0;
    i < l;
    i++
  )
    aidn.constant.advImg = '../' + aidn.constant.advImg
} catch (e) {}
;(aidn.init = {
  ver: 0,
  selectBasePath: function (e, t) {
    var n = parseInt(aidn.util.getCookie('baseid')),
      i = e
    return (
      (isNaN(n) || 1 == t) &&
        ((n = Math.floor(Math.random() * i.length)),
        aidn.util.setCookie('baseid', n, 604800)),
      (i.length <= n || n < 0) && (n = 0),
      (this.basepath = i[n]),
      this.basepath
    )
  },
  loadScript: function (n, i) {
    $.ajaxSetup({
      cache: !0,
    })
    var a = function (e) {
      var t = n[e] + '?' + aidn.init.ver
      aidn.init.usebase &&
        0 != t.indexOf('http') &&
        (t = aidn.init.basepath + t),
        $.getScript(t, function () {
          e + 1 < n.length ? a(e + 1) : i && i()
        })
    }
    a(0)
  },
  basepath: '',
  usebase: !0,
}),
  (aidn.config = {
    init: function () {
      ;(this.clWidth = document.documentElement.clientWidth),
        (this.clHeight = document.documentElement.clientHeight),
        (this.scWidth = screen.width),
        (this.scHeight = screen.height),
        (this.inWidth = window.innerWidth),
        (this.inHeight = window.innerHeight),
        (this.clHeight <= 0 || this.clWidth <= 0) &&
          ((this.clWidth = this.scWidth), (this.clHeight = this.scHeight)),
        (this.inHeight <= 0 || this.inWidth <= 0) &&
          ((this.inWidth = this.clWidth), (this.inHeight = this.clHeight))
    },
    clWidth: 0,
    clHeight: 0,
    scWidth: 0,
    scHeight: 0,
    inWidth: 0,
    inHeight: 0,
    touchEnabled: null != window.TouchEvent,
  }),
  (aidn.audio = {
    init: function () {
      if (!this._inited) {
        this._inited = !0
        try {
          ;(this.audio = []),
            (this.audio[0] = new Audio()),
            (this.availableAudio = !0),
            (this.availableOgg = '' != this.audio[0].canPlayType('audio/ogg')),
            (this.availableMP3 = '' != this.audio[0].canPlayType('audio/mpeg')),
            (this.availableWav = '' != this.audio[0].canPlayType('audio/wav'))
        } catch (e) {
          availableAudio = !1
        }
      }
    },
    setSrc: function (e, t) {
      this.audio[e] ? (this.audio[e].src = t) : (this.audio[e] = new Audio(t))
    },
    load: function (e) {
      this.audio[e].load()
    },
    play: function (e) {
      this.audio[e].play()
    },
    pause: function (e) {
      this.audio[e].pause()
    },
    stop: function (e) {
      this.audio[e].ended ||
        (this.audio[e].pause(), (this.audio[e].currentTime = 0))
    },
    volume: function (e, t) {
      t < 0 && (t = 0), 1 < t && (t = 1), (this.audio[e].volume = t)
    },
    getPath: function (e) {
      for (var t = e.length, n = 0; n < t; n++) {
        var i = e[n],
          a = i.toLowerCase()
        if (aidn.audio.availableMP3 && a.indexOf('.mp3')) break
        if (aidn.audio.availableOgg && a.indexOf('.ogg')) break
        if (aidn.audio.availableWav && a.indexOf('.wav')) break
      }
      return n == t && (i = null), i
    },
    _inited: !1,
    audio: [],
    availableAudio: !1,
    availableMP3: !1,
    availableWav: !1,
    availableOgg: !1,
  }),
  (aidn.canvas = {
    create: function (e, t, n, i, a) {
      var o =
        '<canvas id="' + t + '" width="' + n + '" height="' + i + '"></canvas>'
      ;(document.getElementById(e).innerHTML = o),
        (this.canvas = document.getElementById(t)),
        (this.ctx = this.canvas.getContext('2d')),
        (this.w = n),
        (this.h = i),
        (this.bgColor = a),
        this.clear(!0)
    },
    clear: function (e) {
      ;(this.ctx.fillStyle = this.bgColor),
        this.ctx.fillRect(0, 0, this.w, this.h),
        e && this.ctx.fill()
    },
    canvas: null,
    ctx: null,
    w: 0,
    h: 0,
    bgColor: '#ffffff',
  }),
  (aidn.event = {
    addTouchEvent: function (e, t, n, i, a) {
      'string' == typeof e && (e = document.getElementById(e)),
        t && e.addEventListener('touchstart', t, !1),
        n && e.addEventListener('touchmove', n, !1),
        i && e.addEventListener('touchend', i, !1),
        a && e.addEventListener('touchcancel', a, !1)
    },
    removeTouchEvent: function (e, t, n, i, a) {
      'string' == typeof e && (e = document.getElementById(e)),
        t && e.removeEventListener('touchstart', t, !1),
        n && e.removeEventListener('touchmove', n, !1),
        i && e.removeEventListener('touchend', i, !1),
        a && e.removeEventListener('touchcancel', a, !1)
    },
    addMouseEvent: function (e, t, n, i, a) {
      'string' == typeof e && (e = document.getElementById(e)),
        t && e.addEventListener('mousedown', t, !1),
        n && e.addEventListener('mousemove', n, !1),
        i && e.addEventListener('mouseup', i, !1),
        a && e.addEventListener('mouseout', a, !1)
    },
    removeMouseEvent: function (e, t, n, i, a) {
      'string' == typeof e && (e = document.getElementById(e)),
        t && e.removeEventListener('mousedown', t, !1),
        n && e.removeEventListener('mousemove', n, !1),
        i && e.removeEventListener('mouseup', i, !1),
        a && e.removeEventListener('mouseout', a, !1)
    },
    add: function (e, t, n, i, a) {
      ;(aidn.config.touchEnabled ? this.addTouchEvent : this.addMouseEvent)(
        e,
        t,
        n,
        i,
        a
      )
    },
    remove: function (e, t, n, i, a) {
      ;(aidn.config.touchEnabled
        ? this.removeTouchEvent
        : this.removeMouseEvent)(e, t, n, i, a)
    },
    addMouseWheel: function (e, t) {
      var n =
        'onwheel' in document
          ? 'wheel'
          : 'onmousewheel' in document
          ? 'mousewheel'
          : 'DOMMouseScroll'
      'string' == typeof e && (e = document.getElementById(e)),
        e.addEventListener(n, t)
    },
    removeMouseWheel: function (e, t) {
      var n =
        'onwheel' in document
          ? 'wheel'
          : 'onmousewheel' in document
          ? 'mousewheel'
          : 'DOMMouseScroll'
      'string' == typeof e && (e = document.getElementById(e)),
        e.removeEventListener(n, t)
    },
    addDeviceOrientation: function (e) {
      window.addEventListener('deviceorientation', e)
    },
    removeDeviceOrientation: function (e) {
      window.removeEventListener('deviceorientation', e)
    },
    addDeviceMotion: function (e) {
      window.addEventListener('devicemotion', e)
    },
    removeDeviceMotion: function (e) {
      window.removeEventListener('devicemotion', e)
    },
    getWheelDelta: function (e) {
      return void 0 !== e.wheelDelta ? e.wheelDelta : e.detail
    },
    getPos: function (e) {
      return e.touches
        ? {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          }
        : e.originalEvent && e.originalEvent.touches
        ? {
            x: e.originalEvent.touches[0].pageX,
            y: e.originalEvent.touches[0].pageY,
          }
        : {
            x: e.clientX,
            y: e.clientY,
          }
    },
  }),
  (aidn.ref = {
    init: function (e) {
      0 < this.__total &&
        e != this.__interval &&
        (clearInterval(this.__sid),
        (this.__sid = setInterval(this.__update, e))),
        (this.__interval = e)
    },
    addInterval: function (e, t) {
      ;(this.__list[this.__total] = {
        time: 0,
        delay: t,
        func: e,
      }),
        0 == this.__total &&
          (this.__sid = setInterval(this.__update, this.__interval)),
        this.__total++
    },
    removeInterval: function (e) {
      for (var t = 0; t < this.__total; t++)
        this.__list[t].func == e &&
          (delete this.__list[t], this.__list.splice(t, 1), this.__total--)
      0 == this.__total && clearInterval(this.__sid)
    },
    __update: function () {
      for (
        var e,
          t = aidn.ref.__list,
          n = aidn.ref.__total,
          i = aidn.ref.__interval,
          a = 0;
        a < n;
        a++
      )
        ((e = t[a]).time += i),
          e.delay < e.time && ((e.time -= e.delay), e.func())
    },
    __interval: 10,
    __sid: -1,
    __list: [],
    __total: 0,
  }),
  (aidn.util = {
    initHideAddressBar: function (e, t) {
      e &&
        window.addEventListener(
          'load',
          function () {
            setTimeout(aidn.util.hideAddressBar, 100)
          },
          !1
        ),
        t &&
          window.addEventListener(
            'orientationchange',
            function () {
              setTimeout(aidn.util.hideAddressBar, 100)
            },
            !1
          )
    },
    hideAddressBar: function () {
      window.pageYOffset <= 0 && window.scrollTo(0, 1)
    },
    hideAddressBarStart: function (e) {
      navigator.userAgent.match(/iphone|ipod/i)
        ? ((this.m = parseInt(document.body.style.minHeight)),
          isNaN(this.m) && (this.m = 0),
          (document.body.style.minHeight = '2000px'),
          window.addEventListener('scroll', this._scrolled),
          (this.f = e),
          (this.i = setInterval(function () {
            aidn.util.hideAddressBar()
          }, 50)))
        : e && e()
    },
    _scrolled: function () {
      var e = aidn.util
      ;(document.body.style.minHeight =
        Math.max(window.innerHeight, e.m) + 'px'),
        clearInterval(e.i),
        window.removeEventListener('scroll', e._scrolled),
        e.f && e.f()
    },
    lowerAndroid: function (e) {
      var t = !1,
        n = navigator.userAgent
      return (
        0 < n.indexOf('Android') &&
          parseFloat(n.substr(n.indexOf('Android') + 8, 3)) < e &&
          (t = !0),
        t
      )
    },
    getLanguage: function () {
      var e = this.getQuery()
      return e.lc
        ? e.lc
        : (
            navigator.browserLanguage ||
            navigator.language ||
            navigator.userLanguage
          ).substr(0, 2)
    },
    stopScroll: function () {
      document.addEventListener(
        'touchmove',
        function (e) {
          e.preventDefault()
        },
        !1
      )
    },
    checkJapanese: function () {
      this.getLanguage()
      return (
        'ja' == this.getLanguage() ||
        !!(
          this.lowerAndroid(2.4) &&
          0 < navigator.userAgent.toLowerCase().indexOf('ja-jp')
        )
      )
    },
    useDummyDiv: function () {
      var e = aidn.util.getiOSVersion()
      return 0 < e && e < 10
    },
    getiOSVersion: function () {
      var e = navigator.userAgent,
        t = e.match(/iPhone OS (\d+_*\d*)/)
      return t && t[1]
        ? parseFloat(t[1].replace('_', '.'))
        : (t = e.match(/iPad; CPU OS (\d+_*\d*)/)) && t[1]
        ? parseFloat(t[1].replace('_', '.'))
        : aidn.util.checkiOS() && (t = e.match(/Version\/(\d+\.*\d*)/)) && t[1]
        ? t[1]
        : -1
    },
    checkChrome: function () {
      var e = navigator.userAgent
      return 0 <= e.indexOf('CriOS') || 0 <= e.indexOf('Chrome')
    },
    checkSafari: function () {
      var e = navigator.userAgent
      return 0 <= e.indexOf('Version') && 0 <= e.indexOf('Safari')
    },
    checkFirefox: function () {
      return 0 <= navigator.userAgent.indexOf('Firefox')
    },
    checkAndroid: function () {
      return 0 <= navigator.userAgent.indexOf('Android')
    },
    checkiOS: function (e) {
      var t = navigator.userAgent,
        n = 0 <= t.indexOf('iPhone') || 0 <= t.indexOf('iPod')
      return 0 != e
        ? n ||
            0 <= t.indexOf('iPad') ||
            (0 < t.indexOf('Mac OS') && void 0 !== document.ontouchstart)
        : n
    },
    checkMobile: function () {
      var e = navigator.userAgent
      return (
        aidn.util.checkiOS() ||
        0 <= e.indexOf('Android') ||
        0 <= e.indexOf('BlackBerry') ||
        0 <= e.indexOf('Windows Phone')
      )
    },
    checkApps: function () {
      return (
        aidn.util.checkAppTwitter() ||
        aidn.util.checkAppFacebook() ||
        aidn.util.checkAppLine()
      )
    },
    checkAppTwitter: function () {
      var e = navigator.userAgent
      return (
        !(!aidn.util.checkSafari() || !aidn.util.checkMobile()) ||
        0 <= e.indexOf('Twitter for')
      )
    },
    checkAppFacebook: function () {
      return 0 <= navigator.userAgent.indexOf('FBAV')
    },
    checkAppLine: function () {
      return 0 <= navigator.userAgent.indexOf('Line')
    },
    shuffleArray: function (e) {
      var t,
        n = e.length
      for (t = 0; t < n; t++) {
        var i = e[t],
          a = Math.floor(Math.random() * n)
        ;(e[t] = e[a]), (e[a] = i)
      }
      return e
    },
    getQuery: function () {
      for (
        var e = [],
          t = window.location.search.slice(1).split('&'),
          n = t.length,
          i = 0;
        i < n;
        i++
      ) {
        var a = t[i].split('=')
        e.push(a[0]), (e[a[0]] = a[1])
      }
      return e
    },
    getTime: function () {
      return 'undefined' == typeof performance
        ? Date.now()
        : void 0 === performance.now
        ? Date.now()
        : performance.now()
    },
    fullscreen: function (e) {
      aidn.util.checkFullscreen()
        ? document.webkitCancelFullScreen
          ? document.webkitCancelFullScreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.msExitFullscreen
          ? document.msExitFullscreen()
          : document.cancelFullScreen
          ? document.cancelFullScreen()
          : document.exitFullscreen && document.exitFullscreen()
        : (e
            ? 'string' == typeof e && (e = document.getElementById(e))
            : (e = document.body),
          e.webkitRequestFullscreen
            ? e.webkitRequestFullscreen()
            : e.mozRequestFullScreen
            ? e.mozRequestFullScreen()
            : e.msRequestFullscreen
            ? e.msRequestFullscreen()
            : e.requestFullscreen && e.requestFullscreen())
    },
    checkFullscreen: function () {
      return !!(
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.fullscreenElement
      )
    },
    enabledFullscreen: function (e) {
      return (
        (!e || !navigator.userAgent.match(/Firefox/i)) &&
        (document.fullscreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.msFullscreenEnabled ||
          !1)
      )
    },
    copyToClipboard: function (e) {
      var t = document.createElement('textarea')
      ;(t.value = e), (t.selectionStart = 0), (t.selectionEnd = t.value.length)
      var n = t.style
      ;(n.position = 'fixed'),
        (n.left = '-100%'),
        document.body.appendChild(t),
        t.focus()
      var i = document.execCommand('copy')
      return t.blur(), document.body.removeChild(t), i
    },
    getCookie: function (e) {
      var t = null,
        n = e + '=',
        i = document.cookie,
        a = i.indexOf(n)
      if (0 <= a) {
        var o = a + n.length,
          r = i.indexOf(';', o)
        ;-1 == r && (r = i.length), (t = decodeURIComponent(i.substring(o, r)))
      }
      return t
    },
    setCookie: function (e, t, n, i) {
      var a = e + '=' + encodeURIComponent(t) + ';'
      0 <= n && (a += ' max-age=' + n + ';'),
        i && (a += ' path=' + i + ';'),
        (document.cookie = a)
    },
    getStorage: function (e) {
      void 0 === e && (e = location.href.split('/')[3])
      var t = localStorage.getItem(e)
      try {
        t = JSON.parse(t)
      } catch (e) {}
      return t
    },
    setStorage: function (e, t) {
      void 0 === t && (t = location.href.split('/')[3]),
        'object' == typeof e && (e = JSON.stringify(e)),
        localStorage.setItem(t, e)
    },
    needExpandArea: function (e) {
      var t = navigator.userAgent,
        n = 0 <= t.indexOf('iPhone') || 0 <= t.indexOf('iPod')
      return (
        (n =
          n &&
          0 <= t.indexOf('Version/') &&
          Math.max(window.screen.width, window.screen.height) < 600) &&
          1 == e &&
          (window.scrollTo(0, 0), $('body').css('padding-bottom', 1)),
        n
      )
    },
    checkStandAlone: function () {
      return 'standalone' in window.navigator && window.navigator.standalone
    },
    checkEnableDownload: function () {
      return !(aidn.util.checkiOS() && aidn.util.getiOSVersion() < 12)
    },
    initStandAlone: function () {
      aidn.util.checkStandAlone() &&
        $('a').each(function (e, t) {
          var n = $(this),
            i = n.attr('target'),
            a = !0
          i && 0 <= i.indexOf('blank') && (a = !1)
          var o = n.attr('href')
          a &&
            o &&
            '' != o &&
            (n.click(function (e) {
              ;(location.href = o), e.preventDefault()
            }),
            n.attr('href', ''))
        })
    },
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function () {
      try {
        var e = document.createElement('canvas'),
          t = e.getContext('webgl') || e.getContext('experimental-webgl')
        return !!(
          window.WebGLRenderingContext &&
          t &&
          t.getShaderPrecisionFormat
        )
      } catch (e) {
        return !1
      }
    })(),
    webaudio: (function () {
      for (
        var e = ['SO-03F', 'SO-02F', 'SO-01F'],
          t = e.length,
          n = navigator.userAgent,
          i = 0;
        i < t;
        i++
      )
        if (0 <= n.indexOf(e[i])) return !1
      return !(!window.AudioContext && !window.webkitAudioContext)
    })(),
  }),
  (aidn.adv = {
    showLink: function (e, t) {
      if (aidn.adv._useAdv() && 1 != aidn.adv._el)
        if (aidn.adv._el) aidn.adv._el.show()
        else {
          var n = ''
          ;(n +=
            '<div style="width:200px;"><div id="close_adv_link" style="text-align: right; cursor:pointer;">'),
            (n +=
              '<svg style="vertical-align:bottom;" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>'),
            (n += '</div>')
          var i = ''
          aidn.util.getQuery().lc && (i = ' background:rgba(0, 0, 0, 0.05);'),
            (n += '<div style="width:200px; height:90px;' + i + '">'),
            (n +=
              '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'),
            (n +=
              '<ins class="adsbygoogle" style="display:inline-block;width:200px;height:90px" data-ad-client="ca-pub-2758302531676411" data-ad-slot="3037968718"></ins>'),
            (n +=
              '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'),
            (n += '</div>'),
            (n += '</div>')
          var a = (aidn.adv._el = $(n))
          a.children('#close_adv_link').on('click', aidn.adv.closeLink),
            0 != t
              ? 1 != t
                ? 2 != t
                  ? e.append(a)
                  : e.prepend(a)
                : e.after(a)
              : e.before(a)
        }
    },
    hideLink: function () {
      aidn.adv._el && 1 != aidn.adv._el && aidn.adv._el.hide()
    },
    closeLink: function () {
      aidn.adv.hideLink(), (aidn.adv._el = 1)
    },
    _useAdv: function () {
      return !1
    },
    _e: null,
    _el: null,
  }),
  (aidn.window = {
    useDummyDiv: aidn.util.useDummyDiv,
    addDummyDiv: function () {
      if (aidn.window.useDummyDiv()) {
        var e = $("<div id='dummy'></div>")
        e.css({
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: -1,
        }),
          e.html('<p style="width:100%;height:100%;"></p>'),
          $('body').prepend(e),
          (aidn.window._dummy = $('#dummy p'))
      }
    },
    resize: function (e, t) {
      void 0 === (aidn.window._isFit = t) && (aidn.window._isFit = !0),
        (aidn.window._resizeFunc = e),
        $(window).resize(aidn.window._resize),
        aidn.window._isFit && aidn.window.scrollOff(),
        aidn.window._isTwitteriOS && aidn.window._resizeFix(),
        aidn.window._resize()
    },
    width: function () {
      return $(window).width()
    },
    height: function () {
      return aidn.window._isTwitteriOS
        ? window.innerHeight
        : aidn.window._dummy
        ? aidn.window._dummy.height()
        : $(window).height()
    },
    scrollOff: function () {
      window.addEventListener('touchmove', aidn.window.__scroll, {
        passive: !1,
      })
    },
    scrollOn: function () {
      window.removeEventListener('touchmove', aidn.window.__scroll, {
        passive: !1,
      })
    },
    __scroll: function (e) {
      e.preventDefault()
    },
    _resize: function () {
      aidn.window._isTwitteriOS &&
        aidn.window._isFit &&
        $('body').height(window.innerHeight + 20),
        aidn.window._isTwitteriOS
          ? setTimeout(aidn.window._resizeFix, 100)
          : aidn.window._resizeFix()
    },
    _resizeFix: function () {
      aidn.window._isTwitteriOS &&
        aidn.window._isFit &&
        $('body').height(window.innerHeight),
        aidn.window._resizeFunc && aidn.window._resizeFunc()
    },
    _isFit: !0,
    _isTwitteriOS: aidn.util.checkAppTwitter(),
    _dummy: null,
    _resizeFunc: null,
  }),
  (aidn.math = {
    toRad: function (e) {
      return (e * Math.PI) / 180
    },
    toDeg: function (e) {
      return (180 * e) / Math.PI
    },
    rand: function (e, t) {
      return Math.random() * (t - e) + e
    },
    randInt: function (e, t) {
      return Math.floor(Math.random() * (t + 1 - e) + e)
    },
  }),
  (aidn.social = {
    init: function () {
      this.initTw(), this.initFb(), this.initGp()
    },
    initTw: function () {
      var e, t, n, i, a
      location.href.indexOf('http') < 0 ||
        ((e = document),
        (t = 'twitter-wjs'),
        (i = e.getElementsByTagName('script')[0]),
        (a = /^http:/.test(e.location) ? 'http' : 'https'),
        e.getElementById(t) ||
          (((n = e.createElement('script')).id = t),
          (n.src = a + '://platform.twitter.com/widgets.js'),
          i.parentNode.insertBefore(n, i)))
    },
    initFb: function () {
      var e, t, n, i
      location.href.indexOf('http') < 0 ||
        ((e = document),
        (t = 'facebook-jssdk'),
        (i = e.getElementsByTagName('script')[0]),
        e.getElementById(t) ||
          (((n = e.createElement('script')).id = t),
          (n.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0'),
          i.parentNode.insertBefore(n, i)))
    },
    initGp: function () {
      if (!(location.href.indexOf('http') < 0)) {
        var e = aidn.util.getLanguage()
        'en' != e &&
          (window.___gcfg = {
            lang: e,
          }),
          (function () {
            var e = document.createElement('script')
            ;(e.type = 'text/javascript'),
              (e.async = !0),
              (e.src = 'https://apis.google.com/js/plusone.js')
            var t = document.getElementsByTagName('script')[0]
            t.parentNode.insertBefore(e, t)
          })()
      }
    },
    reloadTw: function (e, t, n, i) {
      0 <= i.indexOf('http://aidn.jp') && (i = i.replace('http', 'https')),
        0 < $('#twitter iframe').length && $('#twitter iframe').remove(),
        0 < $('#twitter-wjs').length && $('#twitter-wjs').remove()
      var a = '<a href="https://twitter.com/share" class="twitter-share-button"'
      e && (a += ' data-text="' + e + '"'),
        t && (a += 'data-related="' + t + '"'),
        n && (a += 'data-count="' + n + '"'),
        i && (a += 'data-url="' + i + '"'),
        (a += ' data-lang="en">Tweet</a>'),
        $('#twitter').append(a),
        this.initTw()
    },
    shareTw: function (e, t, n, i, a) {
      var o = 'https://twitter.com/intent/tweet',
        r = {}
      e && (r.url = encodeURIComponent(e)),
        n && (r.text = encodeURIComponent(n)),
        i && (r.related = i),
        a && (r.hashtags = encodeURIComponent(a))
      var d = 0
      for (var s in r)
        (o += 0 == d ? '?' + s + '=' + r[s] : '&' + s + '=' + r[s]), d++
      t && !aidn.util.checkMobile()
        ? window.open(
            o,
            'tw',
            'width=730, height=460, personalbar=0,toolbar=0,scrollbars=1,resizable=1'
          )
        : (location.href = o)
    },
    shareFb: function (e, t) {
      var n =
        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(e)
      t
        ? aidn.util.checkMobile()
          ? window.open(n)
          : window.open(
              n,
              'fb',
              'width=730, height=460, personalbar=0,toolbar=0,scrollbars=1,resizable=1'
            )
        : (location.href = n)
    },
    shareGp: function (e, t) {
      var n = 'https://plus.google.com/share?url=' + encodeURIComponent(e)
      t
        ? aidn.util.checkMobile()
          ? window.open(n)
          : window.open(
              n,
              'gp',
              'width=960, height=790, personalbar=0,toolbar=0,scrollbars=1,resizable=1'
            )
        : (location.href = n)
    },
    shareHatena: function (e, t) {
      var n = 'http://b.hatena.ne.jp/entry/' + encodeURIComponent(e)
      t
        ? aidn.util.checkMobile()
          ? window.open(n)
          : window.open(
              n,
              'hatena',
              'width=1024, height=790, personalbar=0,toolbar=0,scrollbars=1,resizable=1'
            )
        : (location.href = n)
    },
    shareLi: function (e, t) {
      var n =
        'http://line.me/R/msg/text/?' +
        encodeURIComponent(t) +
        ' ' +
        encodeURIComponent(e)
      location.href = n
    },
    setShareInfo: function (e, t) {
      $('title').text(e),
        $('h1').text(e),
        $('#twitter a').attr('data-text', e),
        $('#twitter a').attr('data-url', t),
        $($('#facebook').children()).attr('href', t),
        $($('#plusone').children()).attr('href', t)
    },
  })
var _isJapanese = aidn.util.checkJapanese(),
  _active = !1

function __googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'ja',
      includedLanguages: 'de,en,es,fr,it,ja,ko,pt,ru,zh-CN,zh-TW',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: !1,
    },
    'google_translate_element'
  )
}

function __addRelease(e, t, n, i, a, o, r) {
  if (
    (void 0 === r && (r = null),
    'string' != typeof r ||
      ((r = '_release' + r), '1' != aidn.util.getCookie(r)))
  ) {
    'string' != typeof a && (a = 'New Release')
    for (
      var d = 'Sawarabi+Gothic',
        s = !1,
        l = 'Montserrat',
        c = !1,
        u = $('link'),
        h = 0,
        f = u.length;
      h < f;
      h++
    ) {
      var p = u[h].getAttribute('href')
      p && (0 < p.indexOf(d) && (s = !0), 0 < p.indexOf(l) && (c = !0))
    }
    if (!s || !c) {
      var v = '<link href="https://fonts.googleapis.com/css?family='
      s || (v += d),
        s || c || (v += '|'),
        c || (v += l),
        (v += '&display=swap" rel="stylesheet">'),
        $('head').append(v)
    }
    _isJapanese || (n = i)
    var g = Date.now() + Math.floor(1e5 * Math.random()),
      m = 'calc(0.7rem + 0.8vh)'
    24 <= n.length && (m = 'calc(0.6rem + 0.7vh)')
    var w = 'bottom'
    1 == o && (w = 'top')
    var b =
        'white-space: nowrap; position: fixed; ' +
        w +
        ': 0; z-index: 100000; left: 50%; transform: translateX(-50%); width:100%; max-width: 480px; color: #000; background:rgba(247, 247, 247, 0.95); text-align:left; cursor:pointer; letter-spacing: .4rem; line-height: 1;',
      y =
        '<div id="rel_open' +
        g +
        '" style="' +
        (b +=
          "font-family:'Montserrat Light',Montserrat,'Sawarabi Gothic','游ゴシック','Yu Gothic','游ゴシック体',YuGothic,'Yu Gothic UI','ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','Meiryo UI','メイリオ',Meiryo,sans-serif") +
        '">'
    ;(y +=
      '<img src="' +
      e +
      '" style="width:calc(50px + 3vh); height:calc(50px + 3vh); margin: calc(5px + 1vh); vertical-align:middle; border:1px solid #ccc;">'),
      (y +=
        '<p style="display:inline-block; vertical-align:middle; letter-spacing:0.13rem; line-height:1.5; font-weight:bold;">'),
      (y +=
        '<span style="font-size:calc(0.5rem + 0.7vh);" class="blink">' +
        a +
        '</span><br>'),
      (y += '<span style="font-size:' + m + ';">' + n + '</span>'),
      (y += '</p>'),
      (y +=
        '<p id="rel_close' +
        g +
        '" style="position:absolute; right:0; top:-1.2vh; font-size:calc(2rem + 3vh);">×</p>'),
      (y += '</div>'),
      $('body').append(y),
      (y = '<style>\n.blink{\n'),
      (y += '-webkit-animation: animFade 0.6s ease-in infinite alternate;\n'),
      (y += 'animation: animFade 0.6s ease-in infinite alternate;\n'),
      (y += '}\n'),
      (y +=
        '@-webkit-keyframes animFade {\n 0% { opacity: 1; }\n 100% { opacity: 0.1; } \n}\n'),
      (y +=
        '@keyframes animFade {\n 0% { opacity: 1; }\n 100% { opacity: 0.1; } \n}\n'),
      (y += '</style>'),
      $('head').append(y),
      $('#rel_open' + g).on('click', function (e) {
        e.preventDefault(), (location.href = t)
      }),
      $('#rel_close' + g).on('click', function (e) {
        e.preventDefault(),
          e.stopPropagation(),
          $('#rel_open' + g).hide(),
          r && aidn.util.setCookie(r, '1', 86400, '/')
      })
  }
}

function __checkInit() {
  if ('undefined' == typeof jQuery) setTimeout(__checkInit, 10)
  else {
    var e = window.__s
    e &&
      'string' == typeof e &&
      ($.ajax({
        url: e,
        cache: !0,
        dataType: 'script',
      }),
      delete window.__s),
      $(function () {
        if ($("meta[name='theme-color']").length <= 0) {
          $('meta:last').after('<meta name="theme-color" content="#000000">')
        }
        aidn.util.initStandAlone()
        var e = aidn.util.getiOSVersion()
        if (8 <= e && aidn.util.checkStandAlone()) {
          var t = '_start_url'
          localStorage.getItem(t) || localStorage.setItem(t, location.href),
            document.addEventListener('visibilitychange', function (e) {
              'visible' == document.visibilityState &&
                location.href != localStorage.getItem(t) &&
                (location.href = localStorage.getItem(t))
            })
        }
        var n = navigator.userAgent
        if (
          (0 < n.indexOf('MSIE') || 0 < n.indexOf('rv:11.0')) &&
          0 < $('svg').length
        ) {
          function i() {
            $('svg').each(function () {
              var e = $(this)
              if ('none' == e.css('display')) return !0
              var t = e.width(),
                n = e.context.viewBox.baseVal,
                i = n.width,
                a = (n.height * t) / i
              e.height(a)
            })
          }
          var a = -1
          $(window).resize(function () {
            clearTimeout(a), (a = setTimeout(i, 200))
          }),
            i(),
            setInterval(i, 1e3)
        }
        if (12.2 <= e) {
          for (
            var o = [
                '/mikuboard',
                '/vtofu',
                '/omikuji',
                '/momoko_vr',
                '/catsphere',
                '/shake',
                '/m/nijimi',
              ],
              r = location.href,
              d = !1,
              s = 0,
              l = 0;
            l < o.length;
            l++
          )
            0 < r.indexOf(o[l]) && ((d = !0), (s = o[l].split('/').length - 2))
          if (1 == $('body').data('motion')) {
            var c = location.href.split('aidn')
            2 <= c.length && ((d = !0), (s = c[1].split('/').length - 3))
          }
          if (d) {
            var u = setTimeout(function () {
              var e = ''
              e +=
                '<div style="width:100%; height:100%; background:rgba(255, 255, 255, 0.94); position:fixed; z-index:1000000; top: 0; left: 0; display: none;">'
              var t = ''
              13 <= aidn.util.getiOSVersion() && (t = '_13')
              var n = './shared/img/dialog_sensor' + t + '.png'
              _isJapanese || (n = './shared/img/dialog_sensor_en' + t + '.png')
              for (var i = 0; i < s; i++) n = '../' + n
              ;(e +=
                '<img src="' +
                n +
                '" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:100%; height:100%; max-width:640px; object-fit: contain;">'),
                (e += '</div>')
              var a = $(e)
              a.fadeIn('normal'),
                a.on('click', function () {
                  13 <= aidn.util.getiOSVersion() &&
                    DeviceMotionEvent.requestPermission(),
                    a.fadeOut('normal')
                }),
                $('body').append(a)
            }, 500)
            window.addEventListener('deviceorientation', function e(t) {
              clearTimeout(u),
                window.removeEventListener('deviceorientation', e)
            })
          }
        }
        if (
          (_isJapanese ||
            (null != document.getElementById('google_translate_element') &&
              $.getScript(
                '//translate.google.com/translate_a/element.js?cb=__googleTranslateElementInit',
                function () {
                  var e = $('.aidnsub').length,
                    t = $('#lyrics_base').length,
                    n = aidn.util.getQuery()
                  setInterval(function () {
                    $('.goog-te-banner-frame').length &&
                      ('none' == $('.skiptranslate').css('display')
                        ? (e &&
                            ('block' == $('#bt_menu').css('display')
                              ? $('#menu, #bt_menu').css('top', 0)
                              : $('#menu').css('top', 0)),
                          t &&
                            ($('#lyrics_base').css({
                              top: 0,
                              height: '100%',
                            }),
                            $('#bt_close').css('top', 0)))
                        : (e &&
                            ('block' == $('#bt_menu').css('display')
                              ? $('#menu, #bt_menu').css('top', 39)
                              : $('#menu').css('top', 39)),
                          t &&
                            ($('#lyrics_base').css({
                              top: 39,
                              height: 'calc(100% - 39px)',
                            }),
                            $('#bt_close').css('top', 39)),
                          0 != n.tw &&
                            $('#goog-gt-tt').css({
                              display: 'none',
                              opacity: 0,
                            })))
                  }, 100),
                    setInterval(function () {
                      $('.goog-te-menu-frame').length &&
                        ($('iframe.goog-te-menu-frame').css({
                          'box-shadow': 'none',
                          '-webkit-box-shadow': 'none',
                        }),
                        $('iframe.goog-te-menu-frame')
                          .contents()
                          .find('.goog-te-menu2 div')
                          .css({
                            'letter-spacing': '0.13rem',
                            padding: '6px 8px',
                          }))
                    }, 500)
                  var i = setInterval(function () {
                    $('.goog-te-banner-frame').length &&
                      'none' != $('.skiptranslate').css('display') &&
                      ($('.goog-te-banner-frame').css({
                        'box-shadow': 'none',
                        '-webkit-box-shadow': 'none',
                        'border-bottom': '1px solid #000000',
                      }),
                      $('iframe:first')
                        .contents()
                        .find('.goog-te-banner')
                        .css('background', '#FFF'),
                      $('iframe:first')
                        .contents()
                        .find('.goog-te-button')
                        .css('display', 'none'),
                      $('div.skiptranslate').css('opacity', 1),
                      clearInterval(i))
                  }, 100)
                }
              )),
          aidn.util.checkMobile())
        ) {
          function h() {
            try {
              for (var e in document.styleSheets) {
                var t = document.styleSheets[e],
                  n = t.cssRules
                if (n)
                  for (var i = n.length - 1; 0 <= i; i--) {
                    var a = n[i].selectorText
                    if (a && a.match(':hover')) {
                      for (
                        var o = a.split(','), r = [], d = 0;
                        d < o.length;
                        d++
                      )
                        o[d].match(':hover') || r.push(o[d])
                      0 < r.length
                        ? (n[i].selectorText = r.join(','))
                        : t.deleteRule(i)
                    }
                  }
              }
            } catch (e) {}
          }
          $("a[href='http://twitter.com/daniwell_aidn']").attr(
            'target',
            '_self'
          ),
            $("a[href='https://twitter.com/daniwell_aidn']").attr(
              'target',
              '_self'
            ),
            h(),
            setTimeout(h, 500)
        }
        var f = !1,
          p = 'New Release',
          v = 'daniwell/',
          g = 'daniwell/shared/img/jacket/wow.png',
          m = 'Wonder of Wonder',
          w = 'Wonder of Wonder'
        for (
          o = [
            {
              path: '/momotap',
            },
            {
              path: '/mikutap',
            },
            {
              path: '/mikuwarp',
            },
            {
              path: '/rinlenwarp',
            },
            {
              path: '/tetomomowarp',
            },
            {
              path: '/mmd',
            },
            {
              path: '/flag',
              desc: 'Now On Sale',
              link: 'daniwell/#x_mklypn',
              imgPath: 'daniwell/shared/img/jacket/mklypn.png',
              title: 'MKLYPN',
              key: '_mklypn',
            },
            {
              path: '/twintail',
              desc: 'Now On Sale',
              link: 'daniwell/#x_mklypn',
              imgPath: 'daniwell/shared/img/jacket/mklypn.png',
              title: 'MKLYPN',
              key: '_mklypn',
            },
          ],
            r = location.href,
            d = !1,
            t = '',
            l = 0;
          l < o.length;
          l++
        ) {
          var b = o[l]
          if (0 < r.indexOf(b.path)) {
            ;(d = !0),
              (t = '_sub'),
              b.key && (t = b.key),
              b.desc && (p = b.desc),
              b.link && (v = b.link),
              b.imgPath && (g = b.imgPath),
              b.title && ((m = b.title), (w = b.title)),
              b.titleEn && (w = b.titleEn),
              'boolean' == typeof b.topFlag && (f = b.topFlag)
            break
          }
        }
        if (0 < $('#aidnx').length || d) {
          var y = (r =
              0 <=
              (r = location.href.split('#')[0].split('?')[0]).indexOf(
                'aidn.jp/'
              )
                ? r.split('aidn.jp/')[1]
                : r.split('aidn/')[1]).split('/').length,
            _ = ''
          for (l = 0; l < y - 1; l++) _ += '../'
          g.indexOf('http') < 0 && (g = _ + g),
            v.indexOf('http') < 0 && (v = _ + v),
            __addRelease(g, v, m, w, p, f, t)
        }
        if (
          (0 < $('#aidn').length && (_active = !1),
          0 < $('#aidnx').length &&
            ((_active = !1),
            $('#bt_menu').on('click', function () {
              $('#menu').stop().slideToggle(150)
            })),
          !_active)
        ) {
          var x = aidn.constant.advUrlEn
          aidn.util.checkJapanese() && (x = aidn.constant.advUrlJa)
          var k = ''
          if (
            ((k += '<a href="' + x + '" target="_blank"><div class="adv_con">'),
            (k += '<p class="text">' + aidn.constant.advTex + '</p>'),
            (k +=
              '<p class="image"><img src="' +
              aidn.constant.advImg +
              '" alt="' +
              aidn.constant.advAlt +
              '" /></p>'),
            (k += '</div></a>'),
            0 < $('.adv').length)
          );
          else {
            var E = $('#common_back')
            0 < E.length &&
              ((k =
                '<div class="adv"><div class="hr_top"></div>' + k + '</div>'),
              $('body').css('overflow', 'auto'),
              E.after(k))
          }
        }
      })
  }
}
;(_active =
  'undefined' == typeof swfobject ||
  (swfobject.hasFlashPlayerVersion('9') && !aidn.util.checkMobile())) ||
  (swffit.fit = function () {}),
  __checkInit(),
  (aidn.extra = {
    Button: function (e, t) {
      var n = e,
        i = e
      t && (i = t)
      var a = i.text(),
        o = a.length,
        r = -1,
        d = !1,
        s = 0,
        l = 0

      function c() {
        d || (++s % 5 == 0 && l++, o <= l && (clearInterval(r), i.text(a)))
        for (var e = a.substr(0, l), t = l; t < o; t++)
          e += String.fromCharCode(65 + 26 * Math.random())
        i.text(e)
      }
      n.bind('mouseover', function (e) {
        clearInterval(r), (s = l = 0), (r = setInterval(c, 20)), (d = !0)
      }),
        n.bind('mouseout', function (e) {
          d = !1
        })
    },
    initSnsButtons: function (t, n) {
      0 <= t.indexOf('http://aidn.jp') && (t = t.replace('http', 'https')),
        $('#sns_tw').click(function (e) {
          aidn.social.shareTw(t, !0, n, 'daniwell_aidn')
        }),
        $('#sns_fb').click(function (e) {
          aidn.social.shareFb(t, !0)
        }),
        $('#sns_gp').click(function (e) {
          aidn.social.shareGp(t, !0)
        })
    },
  }),
  (aidn.Audio = function () {
    aidn.audio.init()
    var o,
      r,
      d,
      s,
      l,
      t,
      c = this,
      u = new Audio(),
      n = 1
    ;(this._audio = u).addEventListener('playing', function () {
      0 < o && ((u.currentTime = o), (o = -1))
    }),
      u.addEventListener('timeupdate', function () {
        r <= u.currentTime && u.pause()
        0 < u.currentTime && l && (l(), (l = null))
      }),
      u.addEventListener('ended', function () {
        t && t()
        d && ((u.currentTime = 0), u.play(), (u.playbackRate = n))
      }),
      u.addEventListener('canplaythrough', function () {
        0 < o && ((u.currentTime = o), (o = -1))
        s && (s(), (s = null))
      }),
      (this.load = function (e, t, n, i) {
        isNaN(n) || (n = null), i && (n = i), 'string' == typeof e && (e = [e])
        var a = aidn.audio.getPath(e)
        if (!a) return !1
        ;(s = t),
          (u.src = a),
          (u.onprogress = function () {
            try {
              n && n(u.buffered.end(0) / u.duration)
            } catch (e) {}
          }),
          u.load()
      }),
      (this.play = function (t, e, n, i, a) {
        void 0 === t && (t = 0),
          void 0 === e && (e = !1),
          void 0 === i && (i = 0),
          void 0 === a && (a = 1),
          (l = n),
          (d = e),
          (r = 1e6)
        try {
          u.currentTime = t
        } catch (e) {
          aidn.log(e), (o = t)
        }
        u.play(),
          0 < i && 'undefined' != typeof jQuery
            ? ((c.volume = 0),
              $(c)
                .stop()
                .animate(
                  {
                    volume: a,
                  },
                  1e3 * i,
                  'easeInSine'
                ))
            : (c.volume = a)
      }),
      (this.pause = function () {
        u.pause()
      }),
      (this.playSprite = function (e, t) {
        ;(u.currentTime = e), u.play(), (r = t)
      }),
      (this.addEndEvent = function (e) {
        t = e
      }),
      Object.defineProperty(this, 'speed', {
        get: function () {
          return n
        },
        set: function (e) {
          u.playbackRate = n = e
        },
      }),
      Object.defineProperty(this, 'loop', {
        get: function () {
          return d
        },
        set: function (e) {
          d = e
        },
      }),
      Object.defineProperty(this, 'time', {
        get: function () {
          return u.currentTime
        },
        set: function (e) {
          u.currentTime = e
        },
      }),
      Object.defineProperty(this, 'volume', {
        get: function () {
          return u.volume
        },
        set: function (e) {
          u.volume = e
        },
      }),
      Object.defineProperty(this, 'duration', {
        get: function () {
          return u.duration
        },
      })
  }),
  (aidn.WebAudio = function () {
    aidn.audio.init()
    var f,
      p,
      u,
      h,
      v,
      g,
      m,
      w,
      b,
      y,
      _,
      x,
      t,
      k = this,
      E = [],
      O = 0,
      S = 100,
      A = -1,
      F = !1,
      n = 1,
      I = 1
    if (void 0 !== aidn.___waContext) this._context = f = aidn.___waContext
    else {
      try {
        var e = window.AudioContext || window.webkitAudioContext
        f = new e()
      } catch (e) {}
      ;(this._context = f), (aidn.___waContext = f)
    }

    function T() {
      ;(u.onended = null), t && t()
    }
    ;(this.load = function (e, u, t, n) {
      var i,
        a = (F = !1)
      if ((0 <= t && (A = t), 'string' == typeof e))
        if (0 < e.indexOf('base64')) {
          a = !0
          var o = atob(e.split(',')[1]),
            r = o.length
          i = new Uint8Array(r)
          for (var d = 0; d < r; ++d) i[d] = o.charCodeAt(d)
        } else e = [e]
      if (0 < e[0].indexOf('blank.mp3')) {
        var s = new Audio(e[0])
        document.body.appendChild(s)
      }
      if (!f) return !1
      f.createBufferSource().start(0), (p = null)
      var l = aidn.audio.getPath(e)
      if (!l && !a) return !1

      function c() {
        var e
        ;(e = a ? i.buffer : h.response),
          f.decodeAudioData(
            e,
            function (e) {
              if (0 <= A) {
                for (
                  var t = A,
                    n = Number.MAX_VALUE,
                    i = e.numberOfChannels,
                    a = 0;
                  a < i;
                  a++
                ) {
                  for (
                    var o = e.getChannelData(a), r = o.length, d = 0;
                    d < r && !(t < Math.abs(o[d]));
                    d++
                  );
                  d < n && (n = d)
                }
                r = e.length - n
                var s = f.createBuffer(i, r, f.sampleRate)
                for (a = 0; a < i; a++) {
                  var l = e.getChannelData(a),
                    c = s.getChannelData(a)
                  for (d = 0; d < r; d++) c[d] = l[d + n]
                }
                e = s
              }
              ;(S = (p = e).duration),
                u && u(p),
                F && ((F = !1), k.play(m, w, b, y, _, x))
            },
            function () {}
          )
      }
      if (a) c()
      else {
        var h = new XMLHttpRequest()
        h.open('GET', l, !0),
          (h.responseType = 'arraybuffer'),
          (h.onload = c),
          (h.onprogress = function (e) {
            n && n(e.loaded / e.total)
          }),
          h.send()
      }
      return !0
    }),
      (this.play = function (e, t, n, i, a, o) {
        if (((m = e), (w = t), (b = n), (y = i), (_ = a), (x = o), !p))
          return (F = !0), void console.log('call "load" method before "play"')
        void 0 === e && (e = 0),
          void 0 === t && (t = !1),
          void 0 === i && (i = 0),
          void 0 === a ? (a = I) : (I = a),
          void 0 === o && (o = 0),
          ((u = f.createBufferSource()).buffer = p),
          (u.loop = t),
          (u.onended = T),
          v || (v = f.createGain())
        var r = [u, v]
        ;(r = r.concat(E)), h && r.push(h), g && r.push(g)
        for (var d = 1; d < r.length; d++) {
          var s = r[d - 1],
            l = r[d]
          s.connect(l), d == r.length - 1 && l.connect(f.destination)
        }
        if (
          (u.start ? u.start(f.currentTime + o, e) : u.noteOn(e),
          (O = f.currentTime - e),
          (this._source = u),
          (this.nodeGain = v),
          0 < i && 'undefined' != typeof jQuery
            ? ((k.volume = 0),
              $(k)
                .stop()
                .animate(
                  {
                    volume: a,
                  },
                  1e3 * i,
                  'easeInSine'
                ))
            : (k.volume = a),
          n)
        )
          var c = setInterval(function () {
            0 < k.time && (clearInterval(c), n())
          }, 10)
      }),
      (this.stop = function () {
        ;(F = !1), u && (u.stop ? u.stop(0) : u.noteOff())
      }),
      (this.initPanner = function (e) {
        return (
          (void 0 === e || e <= 0) && (e = 'equalpower'),
          0 < e && (e = 'HRTF'),
          ((h = f.createPanner()).panningModel = e),
          (this.nodePanner = h)
        )
      }),
      (this.initBiquadFilter = function (e) {
        return (
          void 0 === e && (e = 0), ((g = f.createBiquadFilter()).type = e), g
        )
      }),
      (this.addNode = function (e) {
        E.push(e)
      }),
      (this.addEndEvent = function (e) {
        t = e
      }),
      Object.defineProperty(this, 'speed', {
        get: function () {
          return u.playbackRate.value
        },
        set: function (e) {
          try {
            O = f.currentTime - this.time / e
          } catch (e) {}
          u.playbackRate.value = n = e
        },
      }),
      Object.defineProperty(this, 'loop', {
        get: function () {
          return u.loop
        },
        set: function (e) {
          u.loop = e
        },
      }),
      Object.defineProperty(this, 'time', {
        get: function () {
          return ((f.currentTime - O) * n) % S
        },
        set: function (e) {
          u.stop(0), k.play(e, u.loop)
        },
      }),
      Object.defineProperty(this, 'volume', {
        get: function () {
          return I
        },
        set: function (e) {
          ;(I = e), v && (v.gain.value = e)
        },
      }),
      Object.defineProperty(this, 'duration', {
        get: function () {
          return S
        },
      })
  }),
  (aidn.AutoAudio = function (e, t, n) {
    void 0 === e && (e = './shared/swf/audio.swf'), aidn.audio.init()
    var i,
      a,
      o,
      r = 2
    if (
      ('undefined' != typeof swfobject &&
      swfobject.hasFlashPlayerVersion(10) &&
      null != e
        ? (r = 0)
        : aidn.util.webaudio && (r = 1),
      0 <= n && n <= 2 && (r = n),
      (___flash_audioLoadComplete = function () {
        a()
      }),
      (___flash_audioPlay = function () {
        o()
      }),
      0 == r)
    ) {
      var d = document.createElement('div')
      ;(d.id = 'flash_audio'), document.body.appendChild(d)
      var s = {
        callback: t,
      }
      swfobject.embedSWF(
        e,
        'flash_audio',
        '20',
        '20',
        '10.2.0',
        '',
        s,
        {
          menu: 'false',
          scale: 'noScale',
          wmode: 'transparent',
          allowScriptAccess: 'always',
          allowFullScreen: 'true',
        },
        {
          id: 'flash_audio',
          name: 'flash_audio',
        }
      )
      var l = setInterval(function () {
        document.getElementById('flash_audio').loadFunc &&
          (clearInterval(l), (i = document.getElementById('flash_audio')), t(r))
      }, 100)
    } else
      (i = 1 == r ? new aidn.WebAudio() : new aidn.Audio()),
        (this.audio = i),
        t &&
          setTimeout(function () {
            t(r)
          }, 10)
    ;(this.load = function () {
      var e
      if (
        ('string' == typeof arguments[0] && (arguments[0] = [arguments[0]]),
        0 == r)
      ) {
        for (this.audio = i, e = 0; e < arguments[0].length; e++)
          if (0 <= arguments[0][e].indexOf('.swf')) {
            arguments[0] = arguments[0][e]
            break
          }
        arguments[1] &&
          ((a = arguments[1]), (arguments[1] = '___flash_audioLoadComplete'))
      } else {
        var t = []
        for (e = 0; e < arguments[0].length; e++)
          arguments[0][e].indexOf('.swf') < 0 && t.push(arguments[0][e])
        arguments[0] = t
      }
      ;(i.loadFunc || i.load).apply(i, arguments)
    }),
      (this.play = function () {
        0 == r &&
          arguments[2] &&
          ((o = arguments[2]), (arguments[2] = '___flash_audioPlay')),
          (i.playFunc || i.play).apply(i, arguments)
      }),
      (this.stop = function () {
        ;(i.stopFunc || i.stop || i.pause).apply(i, arguments)
      }),
      (this.addEndEvent = function (e) {
        0 == r || i.addEndEvent(e)
      }),
      Object.defineProperty(this, 'speed', {
        get: function () {
          return 0 == r ? -1 : i.speed
        },
        set: function (e) {
          0 == r || (i.speed = e)
        },
      }),
      Object.defineProperty(this, 'time', {
        get: function () {
          return 0 == r ? (i ? i.getTimeFunc() : -1) : i.time
        },
        set: function (e) {
          0 == r || (i.time = e)
        },
      }),
      Object.defineProperty(this, 'volume', {
        get: function () {
          return 0 == r ? -1 : i.volume
        },
        set: function (e) {
          0 == r || (i.volume = e)
        },
      }),
      Object.defineProperty(this, 'duration', {
        get: function () {
          return 0 == r ? -1 : i.duration
        },
      }),
      (this.type = r)
  }),
  (window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (e) {
      window.setTimeout(e, 1e3 / 60)
    })
