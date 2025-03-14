import {
  ImageWebGLCanvas,
  WebGLCanvas,
  YUVWebGLCanvas
} from './module/WebGLCanvas.js'

;('use strict')
function BufferNode (a) {
  ;(this.buffer = a), (this.previous = null), (this.next = null)
}
function StreamDrawer (a, b, c) {
  function d () {
    function a () {
      ;(this.first = null), (this.size = 0)
    }
    var b = 15
    return (
      (a.prototype = {
        enqueue: function (a, c, d, e, f, g) {
          this.size >= b ? this.clear() : 0
          var h = new K(a, c, d, e, f, g)
          if (null === this.first) this.first = h
          else {
            for (var i = this.first; null !== i.next; ) i = i.next
            i.next = h
          }
          return (this.size += 1), h
        },
        dequeue: function () {
          var a = null
          return (
            null !== this.first &&
              ((a = this.first),
              (this.first = this.first.next),
              (this.size -= 1)),
            a
          )
        },
        clear: function () {
          console.log('BufferQueue clear!')
          for (var a = null; null !== this.first; )
            (a = this.first),
              (this.first = this.first.next),
              (this.size -= 1),
              (a.buffer = null),
              (a = null)
          ;(this.size = 0), (this.first = null)
        }
      }),
      new a()
    )
  }
  function e () {
    ;(p = 'rgb2d'), (r = null), (L = new d()), (q = F), (E = !1)
  }
  function f (a, b) {
    for (
      var c = atob(a.substring('data:image/png;base64,'.length)),
        d = new Uint8Array(c.length),
        e = 0,
        f = c.length;
      f > e;
      ++e
    )
      d[e] = c.charCodeAt(e)
    var g = new Blob([d.buffer], {
      type: 'image/png'
    })
    N(g, b + '.png')
  }
  function g (a) {
    return (
      ('undefined' == typeof n ||
        'undefined' == typeof o ||
        n !== a.width ||
        o !== a.height) &&
        ((p = 'ImageWebGL'),
        M(a.width, a.height),
        (n = a.width),
        (o = a.height),
        'undefined' != n &&
          null != n &&
          0 != n &&
          s({
            width: a.width,
            height: a.height
          })),
      (w = a.time),
      null !== w && i.timeStamp(w),
      'undefined' != typeof m
        ? (m.drawCanvas(a), D && ((D = !1), f(l.toDataURL(), C)), A.free(a), !0)
        : (console.log('drawer is undefined in StreamDrawer!'), !1)
    )
  }
  function h () {
    window.requestAnimationFrame(P)
  }
  var i = b,
    j = !0,
    k = a,
    l = c,
    m = null,
    n = null,
    o = null,
    p = null,
    q = null,
    r = null,
    s = null,
    t = null,
    u = null,
    v = 0,
    w = null,
    x = 0,
    y = 0,
    z = 0,
    A = new ImagePool(),
    B = null,
    C = '',
    D = !1,
    E = !1,
    F = 16.7,
    G = 20,
    H = 1e3,
    I = null,
    J = 0,
    K = (function () {
      function a (a, b, c, d, e, f) {
        BufferNode.call(this, a),
          (this.width = b),
          (this.height = c),
          (this.codecType = d),
          (this.frameType = e),
          (this.timeStamp = f)
      }
      return a
    })(),
    L = null,
    M = function (a, b) {
      var c = new Size(a, b)
      switch (p) {
        case 'RGB2d':
          m = new RGB2dCanvas(l, c)
          break
        case 'YUVWebGL':
          m = new YUVWebGLCanvas(l, c)
          break
        case 'ImageWebGL':
          m = new ImageWebGLCanvas(l, c)
          break
        case 'WebGL':
          m = new WebGLCanvas(l, c)
      }
    },
    N = (function (a) {
      var b = a.document,
        c = function () {
          return a.URL || a.webkitURL || a
        },
        d = b.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
        e = 'download' in d,
        f = function (a) {
          var b = new MouseEvent('click')
          a.dispatchEvent(b)
        },
        g = /constructor/i.test(a.HTMLElement),
        h = /CriOS\/[\d]+/.test(navigator.userAgent),
        i = function (b) {
          ;(a.setImmediate || a.setTimeout)(function () {
            throw b
          }, 0)
        },
        j = 'application/octet-stream',
        k = 4e4,
        l = function (a) {
          var b = function () {
            'string' == typeof a ? c().revokeObjectURL(a) : a.remove()
          }
          setTimeout(b, k)
        },
        m = function (a, b, c) {
          b = [].concat(b)
          for (var d = b.length; d--; ) {
            var e = a['on' + b[d]]
            if ('function' == typeof e)
              try {
                e.call(a, c || a)
              } catch (f) {
                i(f)
              }
          }
        },
        n = function (a) {
          return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
            a.type
          )
            ? new Blob([String.fromCharCode(65279), a], {
                type: a.type
              })
            : a
        },
        o = function (b, i, k) {
          k || (b = n(b))
          var o,
            p = this,
            q = b.type,
            r = q === j,
            s = function () {
              m(p, 'writestart progress write writeend'.split(' '))
            },
            t = function () {
              if ((h || (r && g)) && a.FileReader) {
                var d = new FileReader()
                return (
                  (d.onloadend = function () {
                    var b = h
                        ? d.result
                        : d.result.replace(
                            /^data:[^;]*;/,
                            'data:attachment/file;'
                          ),
                      c = a.open(b, '_blank')
                    c || (a.location.href = b),
                      (b = void 0),
                      (p.readyState = p.DONE),
                      s()
                  }),
                  d.readAsDataURL(b),
                  void (p.readyState = p.INIT)
                )
              }
              if ((o || (o = c().createObjectURL(b)), r)) a.location.href = o
              else {
                var e = a.open(o, '_blank')
                e || (a.location.href = o)
              }
              ;(p.readyState = p.DONE), s(), l(o)
            }
          return (
            (p.readyState = p.INIT),
            e
              ? ((o = c().createObjectURL(b)),
                void setTimeout(function () {
                  ;(d.href = o),
                    (d.download = i),
                    f(d),
                    s(),
                    l(o),
                    (p.readyState = p.DONE)
                }))
              : void t()
          )
        },
        p = o.prototype,
        q = function (a, b, c) {
          return new o(a, b || a.name || 'download', c)
        }
      return 'undefined' != typeof navigator && navigator.msSaveOrOpenBlob
        ? function (a, b, c) {
            return (
              (b = b || a.name || 'download'),
              c || (a = n(a)),
              navigator.msSaveOrOpenBlob(a, b)
            )
          }
        : ((p.readyState = p.INIT = 0),
          (p.WRITING = 1),
          (p.DONE = 2),
          (p.error =
            p.onwritestart =
            p.onprogress =
            p.onwrite =
            p.onabort =
            p.onerror =
            p.onwriteend =
              null),
          q)
    })(window),
    O = function () {
      if (
        ((B = L.dequeue()),
        null !== B &&
          null !== B.buffer &&
          ('mjpeg' === B.codecType || B.buffer.length > 0))
      ) {
        if (
          (('undefined' == typeof n ||
            'undefined' == typeof o ||
            n !== B.width ||
            o !== B.height ||
            r !== B.codecType) &&
            ((p =
              'h264' === B.codecType || 'h265' === B.codecType
                ? 'YUVWebGL'
                : 'ImageWebGL'),
            M(B.width, B.height),
            'undefined' == n || null == n || 0 == n
              ? t('PlayStart')
              : 'undefined' != typeof s &&
                null !== s &&
                s({
                  width: B.width,
                  height: B.height
                }),
            (n = B.width),
            (o = B.height),
            (r = B.codecType)),
          (w = B.timeStamp),
          i.timeStamp(w),
          'undefined' != typeof m)
        )
          return (
            m.drawCanvas(B.buffer),
            (l.updatedCanvas = !0),
            u(w),
            D && ((D = !1), f(l.toDataURL(), C)),
            'mjpeg' === B.codecType
              ? A.free(B.buffer)
              : (delete B.buffer, (B.buffer = null)),
            (B.previous = null),
            (B.next = null),
            (B = null),
            !0
          )
        console.log('drawer is undefined in StreamDrawer!')
      }
      return !1
    },
    P = function (a) {
      var b = 200
      if (E === !0) {
        if (0 === v || b > a - v)
          return (
            0 === v && (v = a),
            void (null !== L && window.requestAnimationFrame(P))
          )
        ;(z += a - x),
          z > y && (O() ? (y += q) : 0),
          z > H && ((y = 0), (z = 0)),
          (x = a),
          window.requestAnimationFrame(P)
      }
    }
  return (
    (e.prototype = {
      getDrawingStrategy: function () {
        return p
      },
      reassignCanvas: function () {
        var a = $('canvas[kind-channel-id="' + k + '"]')[0]
        l !== a && ((n = 0), (o = 0))
      },
      drawMJPEG: function (a, b, c, d, e, f) {
        var h = A.alloc()
        ;(h.width = b),
          (h.height = c),
          (h.codecType = d),
          (h.frameType = e),
          (h.time = f),
          (h.onload = function () {
            j === !1
              ? g(this)
              : null !== L &&
                L.enqueue(
                  this,
                  this.width,
                  this.height,
                  this.codecType,
                  this.frameType,
                  this.time
                )
          }),
          h.setAttribute(
            'src',
            'data:image/jpeg;base64,' + base64ArrayBuffer(a)
          )
      },
      draw: function (a, b, c, d, e, g) {
        return j === !1
          ? (('undefined' == typeof n ||
              'undefined' == typeof o ||
              n !== b ||
              o !== c ||
              r !== d) &&
              ((p = 'h264' === d || 'h265' === d ? 'YUVWebGL' : 'ImageWebGL'),
              M(b, c),
              (n = b),
              (o = c),
              (r = d),
              s({
                width: b,
                height: c
              })),
            (w = g),
            null !== w && i.timeStamp(w),
            'undefined' != typeof m
              ? (m.drawCanvas(a),
                (l.updatedCanvas = !0),
                D && ((D = !1), f(l.toDataURL(), C)),
                !0)
              : (console.log('drawer is undefined in StreamDrawer!'), !1))
          : void (null !== L && L.enqueue(a, b, c, d, e, g))
      },
      capture: function (a) {
        ;(C = a), (D = !0)
      },
      digitalZoom: function (a) {
        'undefined' != typeof m && null !== m && m.updateVertexArray(a)
      },
      setResizeCallback: function (a) {
        s = a
      },
      getCodecType: function () {
        return r
      },
      getFrameTimestamp: function () {
        return w
      },
      initStartTime: function () {
        0 === v && j !== !1 && h()
      },
      startRendering: function () {
        null !== L && L.clear(),
          0 === v && j !== !1 && ((E = !0), window.requestAnimationFrame(P))
      },
      stopRendering: function () {
        ;(E = !1), (v = 0)
      },
      setFPS: function (a) {
        'undefined' == typeof a
          ? ((q = F), (I = G))
          : 0 === a
          ? ((q = F), (I = G))
          : ((q = H / a), (I = 1 * a)),
          (J = q)
      },
      setFrameInterval: function (a) {
        q = a * J
      },
      getCanvas: function () {
        return l
      },
      renewCanvas: function () {
        M(n, o), 'undefined' != typeof m && null !== m && m.initCanvas()
      },
      setBeginDrawCallback: function (a) {
        t = a
      },
      setupdateCanvasCallback: function (a) {
        u = a
      },
      terminate: function () {
        ;(v = 0),
          (w = null),
          null !== L && (L.clear(), (L = null)),
          m && m.clearCanvas(),
          (m = null)
      }
    }),
    new e()
  )
}
function Size (a, b) {
  function c (a, b) {
    ;(c.prototype.w = a), (c.prototype.h = b)
  }
  return (
    (c.prototype = {
      toString: function () {
        return '(' + c.prototype.w + ', ' + c.prototype.h + ')'
      },
      getHalfSize: function () {
        return new Size(c.prototype.w >>> 1, c.prototype.h >>> 1)
      },
      length: function () {
        return c.prototype.w * c.prototype.h
      }
    }),
    new c(a, b)
  )
}
var ImagePool = function () {
  ;(this.metrics = {}), this._clearMetrics(), (this._objpool = [])
}
;(ImagePool.prototype.alloc = function () {
  var a = null
  return (
    0 === this._objpool.length
      ? ((a = new Image()), this.metrics.totalalloc++)
      : ((a = this._objpool.pop()), this.metrics.totalfree--),
    a
  )
}),
  (ImagePool.prototype.free = function (a) {
    a.length > 0 &&
      (console.log('It is not zero length = ' + a.length),
      this._objpool.push(a),
      this.metrics.totalfree++)
  }),
  (ImagePool.prototype.collect = function () {
    this._objpool = []
    var a = this.metrics.totalalloc - this.metrics.totalfree
    this._clearMetrics(a)
  }),
  (ImagePool.prototype._clearMetrics = function (a) {
    ;(this.metrics.totalalloc = a || 0), (this.metrics.totalfree = 0)
  })

export { ImagePool, Size, StreamDrawer }
