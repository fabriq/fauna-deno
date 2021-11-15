;(() => {
  var __create = Object.create
  var __defProp = Object.defineProperty
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor
  var __getOwnPropNames = Object.getOwnPropertyNames
  var __getProtoOf = Object.getPrototypeOf
  var __hasOwnProp = Object.prototype.hasOwnProperty
  var __markAsModule = target =>
    __defProp(target, '__esModule', { value: true })
  var __commonJS = (cb, mod) =>
    function __require() {
      return (
        mod ||
          (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod),
        mod.exports
      )
    }
  var __reExport = (target, module2, desc) => {
    if (
      (module2 && typeof module2 === 'object') ||
      typeof module2 === 'function'
    ) {
      for (let key of __getOwnPropNames(module2))
        if (!__hasOwnProp.call(target, key) && key !== 'default')
          __defProp(target, key, {
            get: () => module2[key],
            enumerable:
              !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
          })
    }
    return target
  }
  var __toModule = module2 => {
    return __reExport(
      __markAsModule(
        __defProp(
          module2 != null ? __create(__getProtoOf(module2)) : {},
          'default',
          module2 && module2.__esModule && 'default' in module2
            ? { get: () => module2.default, enumerable: true }
            : { value: module2, enumerable: true }
        )
      ),
      module2
    )
  }

  // (disabled):node_modules/boxen/index.js
  var require_boxen = __commonJS({
    '(disabled):node_modules/boxen/index.js'() {},
  })

  // (disabled):node_modules/chalk/source/index.js
  var require_source = __commonJS({
    '(disabled):node_modules/chalk/source/index.js'() {},
  })

  // node_modules/cross-fetch/dist/browser-ponyfill.js
  var require_browser_ponyfill = __commonJS({
    'node_modules/cross-fetch/dist/browser-ponyfill.js'(exports2, module2) {
      var __self__ = (function(root) {
        function F() {
          this.fetch = false
          this.DOMException = root.DOMException
        }
        F.prototype = root
        return new F()
      })(typeof self !== 'undefined' ? self : exports2)
      ;(function(self2) {
        var irrelevant = (function(exports3) {
          var support = {
            searchParams: 'URLSearchParams' in self2,
            iterable: 'Symbol' in self2 && 'iterator' in Symbol,
            blob:
              'FileReader' in self2 &&
              'Blob' in self2 &&
              (function() {
                try {
                  new Blob()
                  return true
                } catch (e) {
                  return false
                }
              })(),
            formData: 'FormData' in self2,
            arrayBuffer: 'ArrayBuffer' in self2,
          }
          function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj)
          }
          if (support.arrayBuffer) {
            var viewClasses = [
              '[object Int8Array]',
              '[object Uint8Array]',
              '[object Uint8ClampedArray]',
              '[object Int16Array]',
              '[object Uint16Array]',
              '[object Int32Array]',
              '[object Uint32Array]',
              '[object Float32Array]',
              '[object Float64Array]',
            ]
            var isArrayBufferView =
              ArrayBuffer.isView ||
              function(obj) {
                return (
                  obj &&
                  viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
                )
              }
          }
          function normalizeName(name2) {
            if (typeof name2 !== 'string') {
              name2 = String(name2)
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name2)) {
              throw new TypeError('Invalid character in header field name')
            }
            return name2.toLowerCase()
          }
          function normalizeValue(value) {
            if (typeof value !== 'string') {
              value = String(value)
            }
            return value
          }
          function iteratorFor(items) {
            var iterator = {
              next: function() {
                var value = items.shift()
                return { done: value === void 0, value }
              },
            }
            if (support.iterable) {
              iterator[Symbol.iterator] = function() {
                return iterator
              }
            }
            return iterator
          }
          function Headers(headers) {
            this.map = {}
            if (headers instanceof Headers) {
              headers.forEach(function(value, name2) {
                this.append(name2, value)
              }, this)
            } else if (Array.isArray(headers)) {
              headers.forEach(function(header) {
                this.append(header[0], header[1])
              }, this)
            } else if (headers) {
              Object.getOwnPropertyNames(headers).forEach(function(name2) {
                this.append(name2, headers[name2])
              }, this)
            }
          }
          Headers.prototype.append = function(name2, value) {
            name2 = normalizeName(name2)
            value = normalizeValue(value)
            var oldValue = this.map[name2]
            this.map[name2] = oldValue ? oldValue + ', ' + value : value
          }
          Headers.prototype['delete'] = function(name2) {
            delete this.map[normalizeName(name2)]
          }
          Headers.prototype.get = function(name2) {
            name2 = normalizeName(name2)
            return this.has(name2) ? this.map[name2] : null
          }
          Headers.prototype.has = function(name2) {
            return this.map.hasOwnProperty(normalizeName(name2))
          }
          Headers.prototype.set = function(name2, value) {
            this.map[normalizeName(name2)] = normalizeValue(value)
          }
          Headers.prototype.forEach = function(callback, thisArg) {
            for (var name2 in this.map) {
              if (this.map.hasOwnProperty(name2)) {
                callback.call(thisArg, this.map[name2], name2, this)
              }
            }
          }
          Headers.prototype.keys = function() {
            var items = []
            this.forEach(function(value, name2) {
              items.push(name2)
            })
            return iteratorFor(items)
          }
          Headers.prototype.values = function() {
            var items = []
            this.forEach(function(value) {
              items.push(value)
            })
            return iteratorFor(items)
          }
          Headers.prototype.entries = function() {
            var items = []
            this.forEach(function(value, name2) {
              items.push([name2, value])
            })
            return iteratorFor(items)
          }
          if (support.iterable) {
            Headers.prototype[Symbol.iterator] = Headers.prototype.entries
          }
          function consumed(body) {
            if (body.bodyUsed) {
              return Promise.reject(new TypeError('Already read'))
            }
            body.bodyUsed = true
          }
          function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
              reader.onload = function() {
                resolve(reader.result)
              }
              reader.onerror = function() {
                reject(reader.error)
              }
            })
          }
          function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader()
            var promise = fileReaderReady(reader)
            reader.readAsArrayBuffer(blob)
            return promise
          }
          function readBlobAsText(blob) {
            var reader = new FileReader()
            var promise = fileReaderReady(reader)
            reader.readAsText(blob)
            return promise
          }
          function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf)
            var chars = new Array(view.length)
            for (var i = 0; i < view.length; i++) {
              chars[i] = String.fromCharCode(view[i])
            }
            return chars.join('')
          }
          function bufferClone(buf) {
            if (buf.slice) {
              return buf.slice(0)
            } else {
              var view = new Uint8Array(buf.byteLength)
              view.set(new Uint8Array(buf))
              return view.buffer
            }
          }
          function Body() {
            this.bodyUsed = false
            this._initBody = function(body) {
              this._bodyInit = body
              if (!body) {
                this._bodyText = ''
              } else if (typeof body === 'string') {
                this._bodyText = body
              } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body
              } else if (
                support.formData &&
                FormData.prototype.isPrototypeOf(body)
              ) {
                this._bodyFormData = body
              } else if (
                support.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(body)
              ) {
                this._bodyText = body.toString()
              } else if (
                support.arrayBuffer &&
                support.blob &&
                isDataView(body)
              ) {
                this._bodyArrayBuffer = bufferClone(body.buffer)
                this._bodyInit = new Blob([this._bodyArrayBuffer])
              } else if (
                support.arrayBuffer &&
                (ArrayBuffer.prototype.isPrototypeOf(body) ||
                  isArrayBufferView(body))
              ) {
                this._bodyArrayBuffer = bufferClone(body)
              } else {
                this._bodyText = body = Object.prototype.toString.call(body)
              }
              if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                  this.headers.set('content-type', 'text/plain;charset=UTF-8')
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set('content-type', this._bodyBlob.type)
                } else if (
                  support.searchParams &&
                  URLSearchParams.prototype.isPrototypeOf(body)
                ) {
                  this.headers.set(
                    'content-type',
                    'application/x-www-form-urlencoded;charset=UTF-8'
                  )
                }
              }
            }
            if (support.blob) {
              this.blob = function() {
                var rejected = consumed(this)
                if (rejected) {
                  return rejected
                }
                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob)
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]))
                } else if (this._bodyFormData) {
                  throw new Error('could not read FormData body as blob')
                } else {
                  return Promise.resolve(new Blob([this._bodyText]))
                }
              }
              this.arrayBuffer = function() {
                if (this._bodyArrayBuffer) {
                  return (
                    consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                  )
                } else {
                  return this.blob().then(readBlobAsArrayBuffer)
                }
              }
            }
            this.text = function() {
              var rejected = consumed(this)
              if (rejected) {
                return rejected
              }
              if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob)
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(
                  readArrayBufferAsText(this._bodyArrayBuffer)
                )
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text')
              } else {
                return Promise.resolve(this._bodyText)
              }
            }
            if (support.formData) {
              this.formData = function() {
                return this.text().then(decode)
              }
            }
            this.json = function() {
              return this.text().then(JSON.parse)
            }
            return this
          }
          var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
          function normalizeMethod(method) {
            var upcased = method.toUpperCase()
            return methods.indexOf(upcased) > -1 ? upcased : method
          }
          function Request(input, options) {
            options = options || {}
            var body = options.body
            if (input instanceof Request) {
              if (input.bodyUsed) {
                throw new TypeError('Already read')
              }
              this.url = input.url
              this.credentials = input.credentials
              if (!options.headers) {
                this.headers = new Headers(input.headers)
              }
              this.method = input.method
              this.mode = input.mode
              this.signal = input.signal
              if (!body && input._bodyInit != null) {
                body = input._bodyInit
                input.bodyUsed = true
              }
            } else {
              this.url = String(input)
            }
            this.credentials =
              options.credentials || this.credentials || 'same-origin'
            if (options.headers || !this.headers) {
              this.headers = new Headers(options.headers)
            }
            this.method = normalizeMethod(
              options.method || this.method || 'GET'
            )
            this.mode = options.mode || this.mode || null
            this.signal = options.signal || this.signal
            this.referrer = null
            if ((this.method === 'GET' || this.method === 'HEAD') && body) {
              throw new TypeError('Body not allowed for GET or HEAD requests')
            }
            this._initBody(body)
          }
          Request.prototype.clone = function() {
            return new Request(this, { body: this._bodyInit })
          }
          function decode(body) {
            var form = new FormData()
            body
              .trim()
              .split('&')
              .forEach(function(bytes) {
                if (bytes) {
                  var split = bytes.split('=')
                  var name2 = split.shift().replace(/\+/g, ' ')
                  var value = split.join('=').replace(/\+/g, ' ')
                  form.append(
                    decodeURIComponent(name2),
                    decodeURIComponent(value)
                  )
                }
              })
            return form
          }
          function parseHeaders(rawHeaders) {
            var headers = new Headers()
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
              var parts = line.split(':')
              var key = parts.shift().trim()
              if (key) {
                var value = parts.join(':').trim()
                headers.append(key, value)
              }
            })
            return headers
          }
          Body.call(Request.prototype)
          function Response(bodyInit, options) {
            if (!options) {
              options = {}
            }
            this.type = 'default'
            this.status = options.status === void 0 ? 200 : options.status
            this.ok = this.status >= 200 && this.status < 300
            this.statusText =
              'statusText' in options ? options.statusText : 'OK'
            this.headers = new Headers(options.headers)
            this.url = options.url || ''
            this._initBody(bodyInit)
          }
          Body.call(Response.prototype)
          Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new Headers(this.headers),
              url: this.url,
            })
          }
          Response.error = function() {
            var response = new Response(null, { status: 0, statusText: '' })
            response.type = 'error'
            return response
          }
          var redirectStatuses = [301, 302, 303, 307, 308]
          Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
              throw new RangeError('Invalid status code')
            }
            return new Response(null, { status, headers: { location: url } })
          }
          exports3.DOMException = self2.DOMException
          try {
            new exports3.DOMException()
          } catch (err) {
            exports3.DOMException = function(message, name2) {
              this.message = message
              this.name = name2
              var error = Error(message)
              this.stack = error.stack
            }
            exports3.DOMException.prototype = Object.create(Error.prototype)
            exports3.DOMException.prototype.constructor = exports3.DOMException
          }
          function fetch(input, init) {
            return new Promise(function(resolve, reject) {
              var request = new Request(input, init)
              if (request.signal && request.signal.aborted) {
                return reject(
                  new exports3.DOMException('Aborted', 'AbortError')
                )
              }
              var xhr = new XMLHttpRequest()
              function abortXhr() {
                xhr.abort()
              }
              xhr.onload = function() {
                var options = {
                  status: xhr.status,
                  statusText: xhr.statusText,
                  headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
                }
                options.url =
                  'responseURL' in xhr
                    ? xhr.responseURL
                    : options.headers.get('X-Request-URL')
                var body = 'response' in xhr ? xhr.response : xhr.responseText
                resolve(new Response(body, options))
              }
              xhr.onerror = function() {
                reject(new TypeError('Network request failed'))
              }
              xhr.ontimeout = function() {
                reject(new TypeError('Network request failed'))
              }
              xhr.onabort = function() {
                reject(new exports3.DOMException('Aborted', 'AbortError'))
              }
              xhr.open(request.method, request.url, true)
              if (request.credentials === 'include') {
                xhr.withCredentials = true
              } else if (request.credentials === 'omit') {
                xhr.withCredentials = false
              }
              if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob'
              }
              request.headers.forEach(function(value, name2) {
                xhr.setRequestHeader(name2, value)
              })
              if (request.signal) {
                request.signal.addEventListener('abort', abortXhr)
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    request.signal.removeEventListener('abort', abortXhr)
                  }
                }
              }
              xhr.send(
                typeof request._bodyInit === 'undefined'
                  ? null
                  : request._bodyInit
              )
            })
          }
          fetch.polyfill = true
          if (!self2.fetch) {
            self2.fetch = fetch
            self2.Headers = Headers
            self2.Request = Request
            self2.Response = Response
          }
          exports3.Headers = Headers
          exports3.Request = Request
          exports3.Response = Response
          exports3.fetch = fetch
          return exports3
        })({})
      })(__self__)
      delete __self__.fetch.polyfill
      exports2 = __self__.fetch
      exports2.default = __self__.fetch
      exports2.fetch = __self__.fetch
      exports2.Headers = __self__.Headers
      exports2.Request = __self__.Request
      exports2.Response = __self__.Response
      module2.exports = exports2
    },
  })

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    'node_modules/base64-js/index.js'(exports2) {
      'use strict'
      exports2.byteLength = byteLength
      exports2.toByteArray = toByteArray2
      exports2.fromByteArray = fromByteArray2
      var lookup = []
      var revLookup = []
      var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
      var code =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i]
        revLookup[code.charCodeAt(i)] = i
      }
      var i
      var len
      revLookup['-'.charCodeAt(0)] = 62
      revLookup['_'.charCodeAt(0)] = 63
      function getLens(b64) {
        var len2 = b64.length
        if (len2 % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4')
        }
        var validLen = b64.indexOf('=')
        if (validLen === -1) validLen = len2
        var placeHoldersLen = validLen === len2 ? 0 : 4 - (validLen % 4)
        return [validLen, placeHoldersLen]
      }
      function byteLength(b64) {
        var lens = getLens(b64)
        var validLen = lens[0]
        var placeHoldersLen = lens[1]
        return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
      }
      function toByteArray2(b64) {
        var tmp
        var lens = getLens(b64)
        var validLen = lens[0]
        var placeHoldersLen = lens[1]
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
        var curByte = 0
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen
        var i2
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp =
            (revLookup[b64.charCodeAt(i2)] << 18) |
            (revLookup[b64.charCodeAt(i2 + 1)] << 12) |
            (revLookup[b64.charCodeAt(i2 + 2)] << 6) |
            revLookup[b64.charCodeAt(i2 + 3)]
          arr[curByte++] = (tmp >> 16) & 255
          arr[curByte++] = (tmp >> 8) & 255
          arr[curByte++] = tmp & 255
        }
        if (placeHoldersLen === 2) {
          tmp =
            (revLookup[b64.charCodeAt(i2)] << 2) |
            (revLookup[b64.charCodeAt(i2 + 1)] >> 4)
          arr[curByte++] = tmp & 255
        }
        if (placeHoldersLen === 1) {
          tmp =
            (revLookup[b64.charCodeAt(i2)] << 10) |
            (revLookup[b64.charCodeAt(i2 + 1)] << 4) |
            (revLookup[b64.charCodeAt(i2 + 2)] >> 2)
          arr[curByte++] = (tmp >> 8) & 255
          arr[curByte++] = tmp & 255
        }
        return arr
      }
      function tripletToBase64(num) {
        return (
          lookup[(num >> 18) & 63] +
          lookup[(num >> 12) & 63] +
          lookup[(num >> 6) & 63] +
          lookup[num & 63]
        )
      }
      function encodeChunk(uint8, start, end) {
        var tmp
        var output = []
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp =
            ((uint8[i2] << 16) & 16711680) +
            ((uint8[i2 + 1] << 8) & 65280) +
            (uint8[i2 + 2] & 255)
          output.push(tripletToBase64(tmp))
        }
        return output.join('')
      }
      function fromByteArray2(uint8) {
        var tmp
        var len2 = uint8.length
        var extraBytes = len2 % 3
        var parts = []
        var maxChunkLength = 16383
        for (
          var i2 = 0, len22 = len2 - extraBytes;
          i2 < len22;
          i2 += maxChunkLength
        ) {
          parts.push(
            encodeChunk(
              uint8,
              i2,
              i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength
            )
          )
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1]
          parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 63] + '==')
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1]
          parts.push(
            lookup[tmp >> 10] +
              lookup[(tmp >> 4) & 63] +
              lookup[(tmp << 2) & 63] +
              '='
          )
        }
        return parts.join('')
      }
    },
  })

  // node_modules/util-deprecate/browser.js
  var require_browser = __commonJS({
    'node_modules/util-deprecate/browser.js'(exports2, module2) {
      module2.exports = deprecate2
      function deprecate2(fn, msg) {
        if (config('noDeprecation')) {
          return fn
        }
        var warned = false
        function deprecated() {
          if (!warned) {
            if (config('throwDeprecation')) {
              throw new Error(msg)
            } else if (config('traceDeprecation')) {
              console.trace(msg)
            } else {
              console.warn(msg)
            }
            warned = true
          }
          return fn.apply(this, arguments)
        }
        return deprecated
      }
      function config(name2) {
        try {
          if (!global.localStorage) return false
        } catch (_) {
          return false
        }
        var val = global.localStorage[name2]
        if (val == null) return false
        return String(val).toLowerCase() === 'true'
      }
    },
  })

  // node_modules/fn-annotate/index.js
  var require_fn_annotate = __commonJS({
    'node_modules/fn-annotate/index.js'(exports2, module2) {
      'use strict'
      module2.exports = annotate2
      function annotate2(fn) {
        if (typeof fn !== 'function') {
          throw new Error(
            'Could not parse function signature for injection dependencies: Object is not a function'
          )
        }
        if (!fn.length) return []
        var injects =
          /^()\(?([^)=]*)\)? *=>/.exec(fn + '') ||
          /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(fn + '')
        if (!injects) {
          throw new Error(
            'Could not parse function signature for injection dependencies: ' +
              fn +
              ''
          )
        }
        var argumentString = injects[2]
          .replace(/\/\*[\S\s]*?\*\//g, ' ')
          .replace(/\/\/.*/g, ' ')
        function groupSubArguments(_, type, keys) {
          return (
            type +
            keys
              .split(',')
              .map(function(arg) {
                return arg && arg.trim()
              })
              .filter(Boolean)
              .join('@')
          )
        }
        argumentString = argumentString.replace(
          /(\{)([^}]*)\}/g,
          groupSubArguments
        )
        argumentString = argumentString.replace(
          /(\[)([^}]*)\]/g,
          groupSubArguments
        )
        return argumentString
          .split(',')
          .map(function(arg) {
            return arg && arg.trim()
          })
          .map(function(arg) {
            if (arg[0] === '{') {
              return arg.substring(1).split('@')
            }
            if (arg[0] === '[') {
              return { items: arg.substring(1).split('@') }
            }
            return arg
          })
          .filter(Boolean)
      }
    },
  })

  // node_modules/event-target-shim/dist/event-target-shim.js
  var require_event_target_shim = __commonJS({
    'node_modules/event-target-shim/dist/event-target-shim.js'(
      exports2,
      module2
    ) {
      'use strict'
      Object.defineProperty(exports2, '__esModule', { value: true })
      var privateData = new WeakMap()
      var wrappers = new WeakMap()
      function pd(event) {
        const retv = privateData.get(event)
        console.assert(
          retv != null,
          "'this' is expected an Event object, but got",
          event
        )
        return retv
      }
      function setCancelFlag(data) {
        if (data.passiveListener != null) {
          if (
            typeof console !== 'undefined' &&
            typeof console.error === 'function'
          ) {
            console.error(
              'Unable to preventDefault inside passive event listener invocation.',
              data.passiveListener
            )
          }
          return
        }
        if (!data.event.cancelable) {
          return
        }
        data.canceled = true
        if (typeof data.event.preventDefault === 'function') {
          data.event.preventDefault()
        }
      }
      function Event(eventTarget, event) {
        privateData.set(this, {
          eventTarget,
          event,
          eventPhase: 2,
          currentTarget: eventTarget,
          canceled: false,
          stopped: false,
          immediateStopped: false,
          passiveListener: null,
          timeStamp: event.timeStamp || Date.now(),
        })
        Object.defineProperty(this, 'isTrusted', {
          value: false,
          enumerable: true,
        })
        const keys = Object.keys(event)
        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
          if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key))
          }
        }
      }
      Event.prototype = {
        get type() {
          return pd(this).event.type
        },
        get target() {
          return pd(this).eventTarget
        },
        get currentTarget() {
          return pd(this).currentTarget
        },
        composedPath() {
          const currentTarget = pd(this).currentTarget
          if (currentTarget == null) {
            return []
          }
          return [currentTarget]
        },
        get NONE() {
          return 0
        },
        get CAPTURING_PHASE() {
          return 1
        },
        get AT_TARGET() {
          return 2
        },
        get BUBBLING_PHASE() {
          return 3
        },
        get eventPhase() {
          return pd(this).eventPhase
        },
        stopPropagation() {
          const data = pd(this)
          data.stopped = true
          if (typeof data.event.stopPropagation === 'function') {
            data.event.stopPropagation()
          }
        },
        stopImmediatePropagation() {
          const data = pd(this)
          data.stopped = true
          data.immediateStopped = true
          if (typeof data.event.stopImmediatePropagation === 'function') {
            data.event.stopImmediatePropagation()
          }
        },
        get bubbles() {
          return Boolean(pd(this).event.bubbles)
        },
        get cancelable() {
          return Boolean(pd(this).event.cancelable)
        },
        preventDefault() {
          setCancelFlag(pd(this))
        },
        get defaultPrevented() {
          return pd(this).canceled
        },
        get composed() {
          return Boolean(pd(this).event.composed)
        },
        get timeStamp() {
          return pd(this).timeStamp
        },
        get srcElement() {
          return pd(this).eventTarget
        },
        get cancelBubble() {
          return pd(this).stopped
        },
        set cancelBubble(value) {
          if (!value) {
            return
          }
          const data = pd(this)
          data.stopped = true
          if (typeof data.event.cancelBubble === 'boolean') {
            data.event.cancelBubble = true
          }
        },
        get returnValue() {
          return !pd(this).canceled
        },
        set returnValue(value) {
          if (!value) {
            setCancelFlag(pd(this))
          }
        },
        initEvent() {},
      }
      Object.defineProperty(Event.prototype, 'constructor', {
        value: Event,
        configurable: true,
        writable: true,
      })
      if (
        typeof window !== 'undefined' &&
        typeof window.Event !== 'undefined'
      ) {
        Object.setPrototypeOf(Event.prototype, window.Event.prototype)
        wrappers.set(window.Event.prototype, Event)
      }
      function defineRedirectDescriptor(key) {
        return {
          get() {
            return pd(this).event[key]
          },
          set(value) {
            pd(this).event[key] = value
          },
          configurable: true,
          enumerable: true,
        }
      }
      function defineCallDescriptor(key) {
        return {
          value() {
            const event = pd(this).event
            return event[key].apply(event, arguments)
          },
          configurable: true,
          enumerable: true,
        }
      }
      function defineWrapper(BaseEvent, proto) {
        const keys = Object.keys(proto)
        if (keys.length === 0) {
          return BaseEvent
        }
        function CustomEvent(eventTarget, event) {
          BaseEvent.call(this, eventTarget, event)
        }
        CustomEvent.prototype = Object.create(BaseEvent.prototype, {
          constructor: {
            value: CustomEvent,
            configurable: true,
            writable: true,
          },
        })
        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
          if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key)
            const isFunc = typeof descriptor.value === 'function'
            Object.defineProperty(
              CustomEvent.prototype,
              key,
              isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key)
            )
          }
        }
        return CustomEvent
      }
      function getWrapper(proto) {
        if (proto == null || proto === Object.prototype) {
          return Event
        }
        let wrapper = wrappers.get(proto)
        if (wrapper == null) {
          wrapper = defineWrapper(
            getWrapper(Object.getPrototypeOf(proto)),
            proto
          )
          wrappers.set(proto, wrapper)
        }
        return wrapper
      }
      function wrapEvent(eventTarget, event) {
        const Wrapper = getWrapper(Object.getPrototypeOf(event))
        return new Wrapper(eventTarget, event)
      }
      function isStopped(event) {
        return pd(event).immediateStopped
      }
      function setEventPhase(event, eventPhase) {
        pd(event).eventPhase = eventPhase
      }
      function setCurrentTarget(event, currentTarget) {
        pd(event).currentTarget = currentTarget
      }
      function setPassiveListener(event, passiveListener) {
        pd(event).passiveListener = passiveListener
      }
      var listenersMap = new WeakMap()
      var CAPTURE = 1
      var BUBBLE = 2
      var ATTRIBUTE = 3
      function isObject(x) {
        return x !== null && typeof x === 'object'
      }
      function getListeners(eventTarget) {
        const listeners = listenersMap.get(eventTarget)
        if (listeners == null) {
          throw new TypeError(
            "'this' is expected an EventTarget object, but got another value."
          )
        }
        return listeners
      }
      function defineEventAttributeDescriptor(eventName) {
        return {
          get() {
            const listeners = getListeners(this)
            let node = listeners.get(eventName)
            while (node != null) {
              if (node.listenerType === ATTRIBUTE) {
                return node.listener
              }
              node = node.next
            }
            return null
          },
          set(listener) {
            if (typeof listener !== 'function' && !isObject(listener)) {
              listener = null
            }
            const listeners = getListeners(this)
            let prev = null
            let node = listeners.get(eventName)
            while (node != null) {
              if (node.listenerType === ATTRIBUTE) {
                if (prev !== null) {
                  prev.next = node.next
                } else if (node.next !== null) {
                  listeners.set(eventName, node.next)
                } else {
                  listeners.delete(eventName)
                }
              } else {
                prev = node
              }
              node = node.next
            }
            if (listener !== null) {
              const newNode = {
                listener,
                listenerType: ATTRIBUTE,
                passive: false,
                once: false,
                next: null,
              }
              if (prev === null) {
                listeners.set(eventName, newNode)
              } else {
                prev.next = newNode
              }
            }
          },
          configurable: true,
          enumerable: true,
        }
      }
      function defineEventAttribute(eventTargetPrototype, eventName) {
        Object.defineProperty(
          eventTargetPrototype,
          `on${eventName}`,
          defineEventAttributeDescriptor(eventName)
        )
      }
      function defineCustomEventTarget(eventNames) {
        function CustomEventTarget() {
          EventTarget.call(this)
        }
        CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
          constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true,
          },
        })
        for (let i = 0; i < eventNames.length; ++i) {
          defineEventAttribute(CustomEventTarget.prototype, eventNames[i])
        }
        return CustomEventTarget
      }
      function EventTarget() {
        if (this instanceof EventTarget) {
          listenersMap.set(this, new Map())
          return
        }
        if (arguments.length === 1 && Array.isArray(arguments[0])) {
          return defineCustomEventTarget(arguments[0])
        }
        if (arguments.length > 0) {
          const types2 = new Array(arguments.length)
          for (let i = 0; i < arguments.length; ++i) {
            types2[i] = arguments[i]
          }
          return defineCustomEventTarget(types2)
        }
        throw new TypeError('Cannot call a class as a function')
      }
      EventTarget.prototype = {
        addEventListener(eventName, listener, options) {
          if (listener == null) {
            return
          }
          if (typeof listener !== 'function' && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.")
          }
          const listeners = getListeners(this)
          const optionsIsObj = isObject(options)
          const capture = optionsIsObj
            ? Boolean(options.capture)
            : Boolean(options)
          const listenerType = capture ? CAPTURE : BUBBLE
          const newNode = {
            listener,
            listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null,
          }
          let node = listeners.get(eventName)
          if (node === void 0) {
            listeners.set(eventName, newNode)
            return
          }
          let prev = null
          while (node != null) {
            if (
              node.listener === listener &&
              node.listenerType === listenerType
            ) {
              return
            }
            prev = node
            node = node.next
          }
          prev.next = newNode
        },
        removeEventListener(eventName, listener, options) {
          if (listener == null) {
            return
          }
          const listeners = getListeners(this)
          const capture = isObject(options)
            ? Boolean(options.capture)
            : Boolean(options)
          const listenerType = capture ? CAPTURE : BUBBLE
          let prev = null
          let node = listeners.get(eventName)
          while (node != null) {
            if (
              node.listener === listener &&
              node.listenerType === listenerType
            ) {
              if (prev !== null) {
                prev.next = node.next
              } else if (node.next !== null) {
                listeners.set(eventName, node.next)
              } else {
                listeners.delete(eventName)
              }
              return
            }
            prev = node
            node = node.next
          }
        },
        dispatchEvent(event) {
          if (event == null || typeof event.type !== 'string') {
            throw new TypeError('"event.type" should be a string.')
          }
          const listeners = getListeners(this)
          const eventName = event.type
          let node = listeners.get(eventName)
          if (node == null) {
            return true
          }
          const wrappedEvent = wrapEvent(this, event)
          let prev = null
          while (node != null) {
            if (node.once) {
              if (prev !== null) {
                prev.next = node.next
              } else if (node.next !== null) {
                listeners.set(eventName, node.next)
              } else {
                listeners.delete(eventName)
              }
            } else {
              prev = node
            }
            setPassiveListener(
              wrappedEvent,
              node.passive ? node.listener : null
            )
            if (typeof node.listener === 'function') {
              try {
                node.listener.call(this, wrappedEvent)
              } catch (err) {
                if (
                  typeof console !== 'undefined' &&
                  typeof console.error === 'function'
                ) {
                  console.error(err)
                }
              }
            } else if (
              node.listenerType !== ATTRIBUTE &&
              typeof node.listener.handleEvent === 'function'
            ) {
              node.listener.handleEvent(wrappedEvent)
            }
            if (isStopped(wrappedEvent)) {
              break
            }
            node = node.next
          }
          setPassiveListener(wrappedEvent, null)
          setEventPhase(wrappedEvent, 0)
          setCurrentTarget(wrappedEvent, null)
          return !wrappedEvent.defaultPrevented
        },
      }
      Object.defineProperty(EventTarget.prototype, 'constructor', {
        value: EventTarget,
        configurable: true,
        writable: true,
      })
      if (
        typeof window !== 'undefined' &&
        typeof window.EventTarget !== 'undefined'
      ) {
        Object.setPrototypeOf(
          EventTarget.prototype,
          window.EventTarget.prototype
        )
      }
      exports2.defineEventAttribute = defineEventAttribute
      exports2.EventTarget = EventTarget
      exports2.default = EventTarget
      module2.exports = EventTarget
      module2.exports.EventTarget = module2.exports['default'] = EventTarget
      module2.exports.defineEventAttribute = defineEventAttribute
    },
  })

  // node_modules/abort-controller/dist/abort-controller.js
  var require_abort_controller = __commonJS({
    'node_modules/abort-controller/dist/abort-controller.js'(
      exports2,
      module2
    ) {
      'use strict'
      Object.defineProperty(exports2, '__esModule', { value: true })
      var eventTargetShim = require_event_target_shim()
      var AbortSignal = class extends eventTargetShim.EventTarget {
        constructor() {
          super()
          throw new TypeError('AbortSignal cannot be constructed directly')
        }
        get aborted() {
          const aborted = abortedFlags.get(this)
          if (typeof aborted !== 'boolean') {
            throw new TypeError(
              `Expected 'this' to be an 'AbortSignal' object, but got ${
                this === null ? 'null' : typeof this
              }`
            )
          }
          return aborted
        }
      }
      eventTargetShim.defineEventAttribute(AbortSignal.prototype, 'abort')
      function createAbortSignal() {
        const signal = Object.create(AbortSignal.prototype)
        eventTargetShim.EventTarget.call(signal)
        abortedFlags.set(signal, false)
        return signal
      }
      function abortSignal(signal) {
        if (abortedFlags.get(signal) !== false) {
          return
        }
        abortedFlags.set(signal, true)
        signal.dispatchEvent({ type: 'abort' })
      }
      var abortedFlags = new WeakMap()
      Object.defineProperties(AbortSignal.prototype, {
        aborted: { enumerable: true },
      })
      if (
        typeof Symbol === 'function' &&
        typeof Symbol.toStringTag === 'symbol'
      ) {
        Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
          configurable: true,
          value: 'AbortSignal',
        })
      }
      var AbortController2 = class {
        constructor() {
          signals.set(this, createAbortSignal())
        }
        get signal() {
          return getSignal(this)
        }
        abort() {
          abortSignal(getSignal(this))
        }
      }
      var signals = new WeakMap()
      function getSignal(controller) {
        const signal = signals.get(controller)
        if (signal == null) {
          throw new TypeError(
            `Expected 'this' to be an 'AbortController' object, but got ${
              controller === null ? 'null' : typeof controller
            }`
          )
        }
        return signal
      }
      Object.defineProperties(AbortController2.prototype, {
        signal: { enumerable: true },
        abort: { enumerable: true },
      })
      if (
        typeof Symbol === 'function' &&
        typeof Symbol.toStringTag === 'symbol'
      ) {
        Object.defineProperty(AbortController2.prototype, Symbol.toStringTag, {
          configurable: true,
          value: 'AbortController',
        })
      }
      exports2.AbortController = AbortController2
      exports2.AbortSignal = AbortSignal
      exports2.default = AbortController2
      module2.exports = AbortController2
      module2.exports.AbortController = module2.exports[
        'default'
      ] = AbortController2
      module2.exports.AbortSignal = AbortSignal
    },
  })

  // (disabled):http
  var require_http = __commonJS({
    '(disabled):http'() {},
  })

  // (disabled):https
  var require_https = __commonJS({
    '(disabled):https'() {},
  })

  // (disabled):os
  var require_os = __commonJS({
    '(disabled):os'() {},
  })

  // package.json
  var name = '@yacinehmito/faunadb'
  var version = '5.0.0-deno-alpha2'
  var apiVersion = '4'
  var description = 'FaunaDB Javascript driver for Node.JS and Browsers'
  var homepage = 'https://fauna.com'
  var repository = 'fauna/faunadb-js'
  var license = 'MPL-2.0'
  var keywords = ['database', 'fauna', 'official', 'driver']
  var bugs = {
    url: 'https://github.com/fauna/faunadb-js/issues',
  }
  var files = [
    'index.d.ts',
    'src/',
    'dist/',
    'cjs/',
    'esm5/',
    'query/',
    'tools/printReleaseNotes.js',
  ]
  var main = './cjs/index.js'
  var module = './esm5/index.js'
  var es2015 = './src/index.js'
  var exports = {
    '.': {
      require: './cjs/index.js',
      import: './esm5/index.js',
    },
    './stream': {
      require: './cjs/stream.js',
      import: './esm5/stream.js',
    },
    './query': {
      require: './cjs/query/index.js',
      import: './esm5/query/index.js',
    },
    './query/': {
      require: './cjs/query/',
      import: './esm5/query/',
    },
    './query/*': {
      require: './cjs/query/*.js',
      import: './esm5/query/*.js',
    },
  }
  var scripts = {
    doc: 'jsdoc -c ./jsdoc.json',
    prettify: 'prettier --write "{src,test}/**/*.{js,ts}"',
    test:
      'jest --env=node --testTimeout 200000 --verbose=true --forceExit ./test',
    'bundle:analyze': 'webpack --env analyze',
    'bundle:stats': 'webpack --env analyze --env stats',
    'bundle:diff': 'node tools/bundleDiff.js',
    'build:clean': 'shx rm -rf ./dist ./cjs ./esm5 ./query ./mod.js ./mod.d.ts',
    'build:browser': 'webpack',
    'build:cjs': 'cross-env BABEL_ENV=cjs npx babel src -d ./cjs',
    'build:esm5': 'cross-env BABEL_ENV=esm npx babel src -d ./esm5',
    'build:package':
      'npm-run-all build:clean build:browser build:cjs build:esm5 build:deno',
    'build:deno':
      'esbuild --bundle src/index.js --outfile=mod.js --target=esnext && api-extractor run',
    'postbuild:package': 'node tools/postBuildPackage.js',
    posttest: 'node ./test/afterComplete',
    'semantic-release': 'semantic-release',
    wp: 'webpack',
    postinstall: 'node ./tools/printReleaseNotes',
    postupdate: 'node ./tools/printReleaseNotes',
    'load-test': 'node ./tools/loadTest',
  }
  var types = 'index.d.ts'
  var dependencies = {
    'abort-controller': '^3.0.0',
    'base64-js': '^1.2.0',
    boxen: '^5.0.1',
    'btoa-lite': '^1.0.0',
    chalk: '^4.1.1',
    'core-js': '^3.9.1',
    'cross-fetch': '^3.0.6',
    dotenv: '^8.2.0',
    'fn-annotate': '^1.1.3',
    'object-assign': '^4.1.0',
    'util-deprecate': '^1.0.2',
  }
  var devDependencies = {
    '@actions/core': '^1.2.6',
    '@actions/github': '^4.0.0',
    '@babel/cli': '^7.13.10',
    '@babel/core': '^7.13.10',
    '@babel/preset-env': '^7.13.10',
    '@microsoft/api-extractor': '^7.18.19',
    'babel-loader': '^8.2.2',
    'cross-env': '^7.0.3',
    esbuild: '^0.13.13',
    eslint: '^5.3.0',
    'eslint-config-prettier': '^6.5.0',
    'eslint-plugin-prettier': '^3.1.1',
    husky: '>=1',
    'ink-docstrap': '^1.2.1',
    jest: '^26.6.3',
    jsdoc: '^3.6.3',
    'lint-staged': '>=8',
    'modify-source-webpack-plugin': '^1.1.0-beta.3',
    'npm-run-all': '^4.1.5',
    prettier: '1.18.2',
    'semantic-release': '^17.1.2',
    shx: '^0.3.3',
    terser: '^4.3.9',
    webpack: '^5.23.0',
    'webpack-bundle-analyzer': '^4.4.0',
    'webpack-bundle-diff': '^1.0.0',
    'webpack-cli': '^4.5.0',
    yargs: '^16.2.0',
  }
  var husky = {
    hooks: {
      'pre-commit': 'lint-staged',
    },
  }
  var lint_staged = {
    '*.{js,css,json,md}': ['prettier --write', 'git add'],
    '*.js': ['eslint --fix', 'git add'],
  }
  var release = {
    branches: ['main'],
  }
  var browser = {
    http2: false,
    http: false,
    https: false,
    os: false,
    util: false,
    boxen: false,
    chalk: false,
  }
  var jest = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  }
  var volta = {
    node: '16.13.0',
    npm: '6.14.15',
  }
  var package_default = {
    name,
    version,
    apiVersion,
    description,
    homepage,
    repository,
    license,
    keywords,
    bugs,
    files,
    main,
    module,
    es2015,
    exports,
    scripts,
    types,
    dependencies,
    devDependencies,
    husky,
    'lint-staged': lint_staged,
    release,
    browser,
    jest,
    volta,
  }

  // src/_util.js
  var import_boxen = __toModule(require_boxen())
  var import_chalk = __toModule(require_source())
  var import_cross_fetch = __toModule(require_browser_ponyfill())
  ;('use strict')
  var crossGlobal =
    typeof window !== 'undefined'
      ? window
      : typeof globalThis !== 'undefined'
      ? globalThis
      : typeof global !== 'undefined'
      ? global
      : self
  function inherits(ctor, superCtor) {
    if (ctor === void 0 || ctor === null) {
      throw new TypeError(
        'The constructor to "inherits" must not be null or undefined'
      )
    }
    if (superCtor === void 0 || superCtor === null) {
      throw new TypeError(
        'The super constructor to "inherits" must not be null or undefined'
      )
    }
    if (superCtor.prototype === void 0) {
      throw new TypeError(
        'The super constructor to "inherits" must have a prototype'
      )
    }
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    })
  }
  function isNodeEnv() {
    return (
      typeof window === 'undefined' &&
      typeof process !== 'undefined' &&
      process.versions != null &&
      process.versions.node != null
    )
  }
  function getEnvVariable(envKey) {
    var areEnvVarsAvailable = !!(
      typeof process !== 'undefined' &&
      process &&
      process.env
    )
    if (areEnvVarsAvailable && process.env[envKey] != null) {
      return process.env[envKey]
    }
  }
  function getBrowserDetails() {
    var browser2 = navigator.appName
    var browserVersion = '' + parseFloat(navigator.appVersion)
    var nameOffset, verOffset, ix
    if ((verOffset = navigator.userAgent.indexOf('Opera')) != -1) {
      browser2 = 'Opera'
      browserVersion = navigator.userAgent.substring(verOffset + 6)
      if ((verOffset = navigator.userAgent.indexOf('Version')) != -1) {
        browserVersion = navigator.userAgent.substring(verOffset + 8)
      }
    } else if ((verOffset = navigator.userAgent.indexOf('MSIE')) != -1) {
      browser2 = 'Microsoft Internet Explorer'
      browserVersion = navigator.userAgent.substring(verOffset + 5)
    } else if (
      browser2 == 'Netscape' &&
      navigator.userAgent.indexOf('Trident/') != -1
    ) {
      browser2 = 'Microsoft Internet Explorer'
      browserVersion = navigator.userAgent.substring(verOffset + 5)
      if ((verOffset = navigator.userAgent.indexOf('rv:')) != -1) {
        browserVersion = navigator.userAgent.substring(verOffset + 3)
      }
    } else if ((verOffset = navigator.userAgent.indexOf('Chrome')) != -1) {
      browser2 = 'Chrome'
      browserVersion = navigator.userAgent.substring(verOffset + 7)
    } else if ((verOffset = navigator.userAgent.indexOf('Safari')) != -1) {
      browser2 = 'Safari'
      browserVersion = navigator.userAgent.substring(verOffset + 7)
      if ((verOffset = navigator.userAgent.indexOf('Version')) != -1) {
        browserVersion = navigator.userAgent.substring(verOffset + 8)
      }
      if (navigator.userAgent.indexOf('CriOS') != -1) {
        browser2 = 'Chrome'
      }
    } else if ((verOffset = navigator.userAgent.indexOf('Firefox')) != -1) {
      browser2 = 'Firefox'
      browserVersion = navigator.userAgent.substring(verOffset + 8)
    } else if (
      (nameOffset = navigator.userAgent.lastIndexOf(' ') + 1) <
      (verOffset = navigator.userAgent.lastIndexOf('/'))
    ) {
      browser2 = navigator.userAgent.substring(nameOffset, verOffset)
      browserVersion = navigator.userAgent.substring(verOffset + 1)
      if (browser2.toLowerCase() == browser2.toUpperCase()) {
        browser2 = navigator.appName
      }
    }
    if ((ix = browserVersion.indexOf(';')) != -1)
      browserVersion = browserVersion.substring(0, ix)
    if ((ix = browserVersion.indexOf(' ')) != -1)
      browserVersion = browserVersion.substring(0, ix)
    if ((ix = browserVersion.indexOf(')')) != -1)
      browserVersion = browserVersion.substring(0, ix)
    return [browser2, browserVersion].join('-')
  }
  function getBrowserOsDetails() {
    var os = 'unknown'
    var clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Chrome OS', r: /CrOS/ },
      { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ]
    for (var id in clientStrings) {
      var cs = clientStrings[id]
      if (cs.r.test(navigator.userAgent)) {
        os = cs.s
        break
      }
    }
    var osVersion = 'unknown'
    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1]
      os = 'Windows'
    }
    switch (os) {
      case 'Mac OS':
      case 'Mac OS X':
      case 'Android':
        osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(
          navigator.userAgent
        )[1]
        break
      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion)
        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0)
        break
    }
    return [os, osVersion].join('-')
  }
  function getNodeRuntimeEnv() {
    var runtimeEnvs = [
      {
        name: 'Netlify',
        check: function() {
          return process.env.hasOwnProperty('NETLIFY_IMAGES_CDN_DOMAIN')
        },
      },
      {
        name: 'Vercel',
        check: function() {
          return process.env.hasOwnProperty('VERCEL')
        },
      },
      {
        name: 'Heroku',
        check: function() {
          return (
            process.env.hasOwnProperty('PATH') &&
            process.env.PATH.indexOf('.heroku') !== -1
          )
        },
      },
      {
        name: 'AWS Lambda',
        check: function() {
          return process.env.hasOwnProperty('AWS_LAMBDA_FUNCTION_VERSION')
        },
      },
      {
        name: 'GCP Cloud Functions',
        check: function() {
          return (
            process.env.hasOwnProperty('_') &&
            process.env._.indexOf('google') !== -1
          )
        },
      },
      {
        name: 'GCP Compute Instances',
        check: function() {
          return process.env.hasOwnProperty('GOOGLE_CLOUD_PROJECT')
        },
      },
      {
        name: 'Azure Cloud Functions',
        check: function() {
          return process.env.hasOwnProperty(
            'WEBSITE_FUNCTIONS_AZUREMONITOR_CATEGORIES'
          )
        },
      },
      {
        name: 'Azure Compute',
        check: function() {
          return (
            process.env.hasOwnProperty('ORYX_ENV_TYPE') &&
            process.env.hasOwnProperty('WEBSITE_INSTANCE_ID') &&
            process.env.ORYX_ENV_TYPE === 'AppService'
          )
        },
      },
      {
        name: 'Mongo Stitch',
        check: function() {
          return typeof crossGlobal.StitchError === 'function'
        },
      },
      {
        name: 'Render',
        check: function() {
          return process.env.hasOwnProperty('RENDER_SERVICE_ID')
        },
      },
      {
        name: 'Begin',
        check: function() {
          return process.env.hasOwnProperty('BEGIN_DATA_SCOPE_ID')
        },
      },
    ]
    var detectedEnv = runtimeEnvs.find(env => env.check())
    return detectedEnv ? detectedEnv.name : 'unknown'
  }
  function defaults(obj, def) {
    if (obj === void 0) {
      return def
    } else {
      return obj
    }
  }
  function applyDefaults(provided, defaults2) {
    var out = {}
    for (var providedKey in provided) {
      if (!(providedKey in defaults2)) {
        throw new Error('No such option ' + providedKey)
      }
      out[providedKey] = provided[providedKey]
    }
    for (var defaultsKey in defaults2) {
      if (!(defaultsKey in out)) {
        out[defaultsKey] = defaults2[defaultsKey]
      }
    }
    return out
  }
  function removeNullAndUndefinedValues(object) {
    var res = {}
    for (var key in object) {
      var val = object[key]
      if (val !== null && val !== void 0) {
        res[key] = val
      }
    }
    return res
  }
  function removeUndefinedValues(object) {
    var res = {}
    for (var key in object) {
      var val = object[key]
      if (val !== void 0) {
        res[key] = val
      }
    }
    return res
  }
  function checkInstanceHasProperty(obj, prop) {
    return typeof obj === 'object' && obj !== null && Boolean(obj[prop])
  }
  function formatUrl(base, path, query) {
    query = typeof query === 'object' ? querystringify(query) : query
    return [
      base,
      path ? (path.charAt(0) === '/' ? '' : '/' + path) : '',
      query ? (query.charAt(0) === '?' ? '' : '?' + query) : '',
    ].join('')
  }
  function querystringify(obj, prefix) {
    prefix = prefix || ''
    var pairs = [],
      value,
      key
    if (typeof prefix !== 'string') prefix = '?'
    for (key in obj) {
      if (checkInstanceHasProperty(obj, key)) {
        value = obj[key]
        if (!value && (value === null || value === void 0 || isNaN(value))) {
          value = ''
        }
        key = encode(key)
        value = encode(value)
        if (key === null || value === null) continue
        pairs.push(key + '=' + value)
      }
    }
    return pairs.length ? prefix + pairs.join('&') : ''
  }
  function encode(input) {
    try {
      return encodeURIComponent(input)
    } catch (e) {
      return null
    }
  }
  function resolveFetch(fetchOverride) {
    if (typeof fetchOverride === 'function') {
      return fetchOverride
    }
    if (typeof global.fetch === 'function') {
      return global.fetch.bind(global)
    }
    return import_cross_fetch.default
  }
  function notifyAboutNewVersion() {
    var isNotified
    const checkAndNotify = checkNewVersion => {
      if (!isNodeEnv() || isNotified || !checkNewVersion) return
      function onResponse(latestVersion) {
        var isNewVersionAvailable = latestVersion > package_default.version
        if (isNewVersionAvailable) {
          console.info(
            (0, import_boxen.default)(
              'New ' +
                package_default.name +
                ' version available ' +
                import_chalk.default.dim(package_default.version) +
                import_chalk.default.reset(' \u2192 ') +
                import_chalk.default.green(latestVersion) +
                `
Changelog: https://github.com/fauna/faunadb-js/blob/main/CHANGELOG.md`,
              { padding: 1, borderColor: 'yellow' }
            )
          )
        }
      }
      isNotified = true
      resolveFetch()('https://registry.npmjs.org/' + package_default.name)
        .then(resp => resp.json())
        .then(json => onResponse(json['dist-tags'].latest))
        .catch(err => {
          console.error('Unable to check new driver version')
          console.error(err)
        })
    }
    return checkAndNotify
  }

  // src/errors.js
  ;('use strict')
  function FaunaError(name2, message, description2) {
    Error.call(this)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else this.stack = new Error().stack
    this.name = name2
    this.message = message
    this.description = description2
  }
  inherits(FaunaError, Error)
  function InvalidValue(message) {
    FaunaError.call(this, 'InvalidValue', message)
  }
  inherits(InvalidValue, FaunaError)
  function InvalidArity(min, max, actual, callerFunc) {
    var arityInfo = `${callerFunc} function requires ${messageForArity(
      min,
      max
    )} argument(s) but ${actual} were given`
    var documentationLink = logDocumentationLink(callerFunc)
    FaunaError.call(
      this,
      'InvalidArity',
      `${arityInfo}
${documentationLink}`
    )
    this.min = min
    this.max = max
    this.actual = actual
    function messageForArity(min2, max2) {
      if (max2 === null) return 'at least ' + min2
      if (min2 === null) return 'up to ' + max2
      if (min2 === max2) return min2
      return 'from ' + min2 + ' to ' + max2
    }
    function logDocumentationLink(functionName) {
      var docsURL = 'https://docs.fauna.com/fauna/current/api/fql/functions/'
      return `For more info, see the docs: ${docsURL}${functionName.toLowerCase()}`
    }
  }
  inherits(InvalidArity, FaunaError)
  function FaunaHTTPError(name2, requestResult) {
    var response = requestResult.responseContent
    var errors = response.errors
    var message = errors.length === 0 ? '(empty "errors")' : errors[0].code
    var description2 =
      errors.length === 0 ? '(empty "errors")' : errors[0].description
    FaunaError.call(this, name2, message, description2)
    this.requestResult = requestResult
    this.code = this.errors()[0].code
    this.position = this.errors()[0].position || []
    this.httpStatusCode = requestResult.statusCode
  }
  inherits(FaunaHTTPError, FaunaError)
  FaunaHTTPError.prototype.errors = function() {
    return this.requestResult.responseContent.errors
  }
  FaunaHTTPError.raiseForStatusCode = function(requestResult) {
    var code = requestResult.statusCode
    if (code < 200 || code >= 300) {
      switch (code) {
        case 400:
          throw getQueryError(requestResult)
        case 401:
          throw new Unauthorized(requestResult)
        case 403:
          throw new PermissionDenied(requestResult)
        case 404:
          throw new NotFound(requestResult)
        case 405:
          throw new MethodNotAllowed(requestResult)
        case 409:
          throw new Conflict(requestResult)
        case 413:
          throw new PayloadTooLarge(requestResult)
        case 429:
          throw new TooManyRequests(requestResult)
        case 440:
          throw new ProcessingTimeLimitExceeded(requestResult)
        case 500:
          throw new InternalError(requestResult)
        case 502:
          throw new BadGateway(requestResult)
        case 503:
          throw new UnavailableError(requestResult)
        default:
          throw new FaunaHTTPError('UnknownError', requestResult)
      }
    }
  }
  function FunctionCallError(requestResult) {
    FaunaHTTPError.call(this, 'FunctionCallError', requestResult)
    const cause = requestResult.responseContent.errors[0].cause[0]
    this.code = cause.code
    this.position = cause.position
    this.description = cause.description
  }
  inherits(FunctionCallError, FaunaHTTPError)
  function ValidationError(requestResult) {
    FaunaHTTPError.call(this, 'ValidationError', requestResult)
    const failure = requestResult.responseContent.errors[0].failures[0]
    this.code = failure.code
    this.position = failure.field
    this.description = failure.description
  }
  inherits(ValidationError, FaunaHTTPError)
  function Unauthorized(requestResult) {
    FaunaHTTPError.call(this, 'Unauthorized', requestResult)
    this.message = this.message +=
      '. Check that endpoint, schema, port and secret are correct during client\u2019s instantiation'
  }
  inherits(Unauthorized, FaunaHTTPError)
  function PermissionDenied(requestResult) {
    FaunaHTTPError.call(this, 'PermissionDenied', requestResult)
  }
  inherits(PermissionDenied, FaunaHTTPError)
  function NotFound(requestResult) {
    FaunaHTTPError.call(this, 'NotFound', requestResult)
  }
  inherits(NotFound, FaunaHTTPError)
  function BadRequest(requestResult) {
    FaunaHTTPError.call(this, 'BadRequest', requestResult)
  }
  inherits(BadRequest, FaunaHTTPError)
  function MethodNotAllowed(requestResult) {
    FaunaHTTPError.call(this, 'MethodNotAllowed', requestResult)
  }
  inherits(MethodNotAllowed, FaunaHTTPError)
  function Conflict(requestResult) {
    FaunaHTTPError.call(this, 'Conflict', requestResult)
  }
  inherits(Conflict, FaunaHTTPError)
  function TooManyRequests(requestResult) {
    FaunaHTTPError.call(this, 'TooManyRequests', requestResult)
  }
  inherits(TooManyRequests, FaunaHTTPError)
  function PayloadTooLarge(requestResult) {
    FaunaHTTPError.call(this, 'PayloadTooLarge', requestResult)
  }
  inherits(PayloadTooLarge, FaunaHTTPError)
  function BadGateway(requestResult) {
    FaunaHTTPError.call(this, 'BadGateway', requestResult)
  }
  inherits(BadGateway, FaunaHTTPError)
  function ProcessingTimeLimitExceeded(requestResult) {
    FaunaHTTPError.call(this, 'ProcessingTimeLimitExceeded', requestResult)
  }
  inherits(ProcessingTimeLimitExceeded, FaunaHTTPError)
  function InternalError(requestResult) {
    FaunaHTTPError.call(this, 'InternalError', requestResult)
  }
  inherits(InternalError, FaunaHTTPError)
  function UnavailableError(requestResult) {
    FaunaHTTPError.call(this, 'UnavailableError', requestResult)
  }
  inherits(UnavailableError, FaunaHTTPError)
  function StreamError(name2, message, description2) {
    FaunaError.call(this, name2, message, description2)
  }
  inherits(StreamError, FaunaError)
  function StreamsNotSupported(description2) {
    FaunaError.call(
      this,
      'StreamsNotSupported',
      'streams not supported',
      description2
    )
  }
  inherits(StreamsNotSupported, StreamError)
  function StreamErrorEvent(event) {
    var error = event.data || {}
    FaunaError.call(this, 'StreamErrorEvent', error.code, error.description)
    this.event = event
  }
  inherits(StreamErrorEvent, StreamError)
  function ClientClosed(message, description2) {
    FaunaError.call(this, 'ClientClosed', message, description2)
  }
  inherits(ClientClosed, FaunaError)
  function TimeoutError(message) {
    Error.call(this)
    this.message = message || 'Request aborted due to timeout'
    this.isTimeoutError = true
  }
  inherits(TimeoutError, Error)
  function AbortError(message) {
    Error.call(this)
    this.message = message || 'Request aborted'
    this.isAbortError = true
  }
  inherits(AbortError, Error)
  var ErrorCodeMap = {
    'invalid argument': 'InvalidArgumentError',
    'call error': FunctionCallError,
    'invalid expression': 'InvalidExpressionError',
    'invalid url parameter': 'InvalidUrlParameterError',
    'schema not found': 'SchemaNotFoundError',
    'transaction aborted': 'TransactionAbortedError',
    'invalid write time': 'InvalidWriteTimeError',
    'invalid ref': 'InvalidReferenceError',
    'missing identity': 'MissingIdentityError',
    'invalid scope': 'InvalidScopeError',
    'invalid token': 'InvalidTokenError',
    'stack overflow': 'StackOverflowError',
    'authentication failed': 'AuthenticationFailedError',
    'value not found': 'ValueNotFoundError',
    'instance not found': 'InstanceNotFound',
    'instance already exists': 'InstanceAlreadyExistsError',
    'validation failed': ValidationError,
    'instance not unique': 'InstanceNotUniqueError',
    'invalid object in container': 'InvalidObjectInContainerError',
    'move database error': 'MoveDatabaseError',
    'recovery failed': 'RecoveryFailedError',
    'feature not available': 'FeatureNotAvailableError',
  }
  var Errors = {
    FaunaError,
    ClientClosed,
    FaunaHTTPError,
    InvalidValue,
    InvalidArity,
    BadRequest,
    PayloadTooLarge,
    ValidationError,
    Unauthorized,
    PermissionDenied,
    NotFound,
    MethodNotAllowed,
    TooManyRequests,
    InternalError,
    UnavailableError,
    FunctionCallError,
    StreamError,
    StreamsNotSupported,
    StreamErrorEvent,
  }
  function getQueryError(requestResult) {
    const errors = requestResult.responseContent.errors
    const errorCode = errors[0].code
    const ErrorFn =
      typeof ErrorCodeMap[errorCode] === 'string'
        ? Errors[ErrorCodeMap[errorCode]]
        : ErrorCodeMap[errorCode]
    if (errors.length === 0 || !errorCode) {
      return new BadRequest(requestResult)
    }
    if (!ErrorFn) {
      return new FaunaHTTPError('UnknownError', requestResult)
    }
    return new ErrorFn(requestResult)
  }
  Object.keys(ErrorCodeMap).forEach(code => {
    if (typeof ErrorCodeMap[code] === 'string') {
      Errors[ErrorCodeMap[code]] = errorClassFactory(ErrorCodeMap[code])
    } else {
      Errors[ErrorCodeMap[code].name] = ErrorCodeMap[code]
    }
  })
  function errorClassFactory(name2) {
    function ErrorClass(requestResult) {
      FaunaHTTPError.call(this, name2, requestResult)
    }
    inherits(ErrorClass, FaunaHTTPError)
    return ErrorClass
  }

  // src/Expr.js
  ;('use strict')
  function Expr(obj) {
    this.raw = obj
  }
  Expr.prototype._isFaunaExpr = true
  Expr.prototype.toJSON = function() {
    return this.raw
  }
  Expr.prototype.toFQL = function() {
    return exprToString(this.raw)
  }
  var varArgsFunctions = [
    'Do',
    'Call',
    'Union',
    'Intersection',
    'Difference',
    'Equals',
    'Add',
    'BitAnd',
    'BitOr',
    'BitXor',
    'Divide',
    'Max',
    'Min',
    'Modulo',
    'Multiply',
    'Subtract',
    'LT',
    'LTE',
    'GT',
    'GTE',
    'And',
    'Or',
  ]
  var specialCases = {
    containsstrregex: 'ContainsStrRegex',
    containsstr: 'ContainsStr',
    endswith: 'EndsWith',
    findstr: 'FindStr',
    findstrregex: 'FindStrRegex',
    gt: 'GT',
    gte: 'GTE',
    is_nonempty: 'is_non_empty',
    lowercase: 'LowerCase',
    lt: 'LT',
    lte: 'LTE',
    ltrim: 'LTrim',
    ngram: 'NGram',
    rtrim: 'RTrim',
    regexescape: 'RegexEscape',
    replacestr: 'ReplaceStr',
    replacestrregex: 'ReplaceStrRegex',
    startswith: 'StartsWith',
    substring: 'SubString',
    titlecase: 'TitleCase',
    uppercase: 'UpperCase',
  }
  function isExpr(expression) {
    return (
      expression instanceof Expr ||
      checkInstanceHasProperty(expression, '_isFaunaExpr')
    )
  }
  function printObject(obj) {
    return (
      '{' +
      Object.keys(obj)
        .map(function(k) {
          return '"' + k + '": ' + exprToString(obj[k])
        })
        .join(', ') +
      '}'
    )
  }
  function printArray(arr, toStr) {
    return arr
      .map(function(item) {
        return toStr(item)
      })
      .join(', ')
  }
  function convertToCamelCase(fn) {
    if (fn in specialCases) fn = specialCases[fn]
    return fn
      .split('_')
      .map(function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      })
      .join('')
  }
  var exprToString = function(expr, caller) {
    if (isExpr(expr)) {
      if ('value' in expr) return expr.toString()
      expr = expr.raw
    }
    if (expr === null) {
      return 'null'
    }
    switch (typeof expr) {
      case 'string':
        return JSON.stringify(expr)
      case 'symbol':
      case 'number':
      case 'boolean':
        return expr.toString()
      case 'undefined':
        return 'undefined'
    }
    if (Array.isArray(expr)) {
      var array = printArray(expr, exprToString)
      return varArgsFunctions.indexOf(caller) != -1 ? array : '[' + array + ']'
    }
    if ('match' in expr) {
      var matchStr = exprToString(expr['match'])
      var terms = expr['terms'] || []
      if (isExpr(terms)) terms = terms.raw
      if (Array.isArray(terms) && terms.length == 0)
        return 'Match(' + matchStr + ')'
      if (Array.isArray(terms)) {
        return (
          'Match(' + matchStr + ', [' + printArray(terms, exprToString) + '])'
        )
      }
      return 'Match(' + matchStr + ', ' + exprToString(terms) + ')'
    }
    if ('paginate' in expr) {
      var exprKeys = Object.keys(expr)
      if (exprKeys.length === 1) {
        return 'Paginate(' + exprToString(expr['paginate']) + ')'
      }
      var expr2 = Object.assign({}, expr)
      delete expr2['paginate']
      return (
        'Paginate(' +
        exprToString(expr['paginate']) +
        ', ' +
        printObject(expr2) +
        ')'
      )
    }
    if ('let' in expr && 'in' in expr) {
      var letExpr = ''
      if (Array.isArray(expr['let']))
        letExpr = '[' + printArray(expr['let'], printObject) + ']'
      else letExpr = printObject(expr['let'])
      return 'Let(' + letExpr + ', ' + exprToString(expr['in']) + ')'
    }
    if ('object' in expr) return printObject(expr['object'])
    if ('merge' in expr) {
      if (expr.lambda) {
        return (
          'Merge(' +
          exprToString(expr.merge) +
          ', ' +
          exprToString(expr.with) +
          ', ' +
          exprToString(expr.lambda) +
          ')'
        )
      }
      return (
        'Merge(' +
        exprToString(expr.merge) +
        ', ' +
        exprToString(expr.with) +
        ')'
      )
    }
    if ('lambda' in expr) {
      return (
        'Lambda(' +
        exprToString(expr['lambda']) +
        ', ' +
        exprToString(expr['expr']) +
        ')'
      )
    }
    if ('filter' in expr) {
      return (
        'Filter(' +
        exprToString(expr['collection']) +
        ', ' +
        exprToString(expr['filter']) +
        ')'
      )
    }
    if ('call' in expr) {
      return (
        'Call(' +
        exprToString(expr['call']) +
        ', ' +
        exprToString(expr['arguments']) +
        ')'
      )
    }
    if ('map' in expr) {
      return (
        'Map(' +
        exprToString(expr['collection']) +
        ', ' +
        exprToString(expr['map']) +
        ')'
      )
    }
    if ('foreach' in expr) {
      return (
        'Foreach(' +
        exprToString(expr['collection']) +
        ', ' +
        exprToString(expr['foreach']) +
        ')'
      )
    }
    var keys = Object.keys(expr)
    var fn = keys[0]
    fn = convertToCamelCase(fn)
    var args = keys
      .filter(k => expr[k] !== null || keys.length > 1)
      .map(k => exprToString(expr[k], fn))
      .join(', ')
    return fn + '(' + args + ')'
  }
  Expr.toString = exprToString

  // src/values.js
  var base64 = __toModule(require_base64_js())
  var import_util_deprecate = __toModule(require_browser())
  ;('use strict')
  var customInspect = import_util3.inspect && import_util3.inspect.custom
  var stringify = import_util3.inspect ? import_util3.inspect : JSON.stringify
  function Value() {}
  inherits(Value, Expr)
  Value.prototype._isFaunaValue = true
  function Ref(id, collection, database) {
    if (!id) throw new InvalidValue('id cannot be null or undefined')
    this.value = { id }
    if (collection) this.value['collection'] = collection
    if (database) this.value['database'] = database
  }
  inherits(Ref, Value)
  Ref.prototype._isFaunaRef = true
  Object.defineProperty(Ref.prototype, 'collection', {
    get: function() {
      return this.value['collection']
    },
  })
  Object.defineProperty(Ref.prototype, 'class', {
    get: (0, import_util_deprecate.default)(function() {
      return this.value['collection']
    }, 'class is deprecated, use collection instead'),
  })
  Object.defineProperty(Ref.prototype, 'database', {
    get: function() {
      return this.value['database']
    },
  })
  Object.defineProperty(Ref.prototype, 'id', {
    get: function() {
      return this.value['id']
    },
  })
  Ref.prototype.toJSON = function() {
    return { '@ref': this.value }
  }
  wrapToString(Ref, function() {
    var constructors = {
      collections: 'Collection',
      databases: 'Database',
      indexes: 'Index',
      functions: 'Function',
      roles: 'Role',
      access_providers: 'AccessProvider',
    }
    var isNative = function(ref) {
      return ref.collection === void 0
    }
    var toString = function(ref) {
      if (isNative(ref)) {
        var db = ref.database !== void 0 ? ref.database.toString() : ''
        if (ref.id === 'access_providers') return 'AccessProviders(' + db + ')'
        return ref.id.charAt(0).toUpperCase() + ref.id.slice(1) + '(' + db + ')'
      }
      if (isNative(ref.collection)) {
        var constructor = constructors[ref.collection.id]
        if (constructor !== void 0) {
          var db = ref.database !== void 0 ? ', ' + ref.database.toString() : ''
          return constructor + '("' + ref.id + '"' + db + ')'
        }
      }
      return 'Ref(' + toString(ref.collection) + ', "' + ref.id + '")'
    }
    return toString(this)
  })
  Ref.prototype.valueOf = function() {
    return this.value
  }
  Ref.prototype.equals = function(other) {
    return (
      (other instanceof Ref ||
        checkInstanceHasProperty(other, '_isFaunaRef')) &&
      this.id === other.id &&
      ((this.collection === void 0 && other.collection === void 0) ||
        this.collection.equals(other.collection)) &&
      ((this.database === void 0 && other.database === void 0) ||
        this.database.equals(other.database))
    )
  }
  var Native = {
    COLLECTIONS: new Ref('collections'),
    INDEXES: new Ref('indexes'),
    DATABASES: new Ref('databases'),
    FUNCTIONS: new Ref('functions'),
    ROLES: new Ref('roles'),
    KEYS: new Ref('keys'),
    ACCESS_PROVIDERS: new Ref('access_providers'),
  }
  Native.fromName = function(name2) {
    switch (name2) {
      case 'collections':
        return Native.COLLECTIONS
      case 'indexes':
        return Native.INDEXES
      case 'databases':
        return Native.DATABASES
      case 'functions':
        return Native.FUNCTIONS
      case 'roles':
        return Native.ROLES
      case 'keys':
        return Native.KEYS
      case 'access_providers':
        return Native.ACCESS_PROVIDERS
    }
    return new Ref(name2)
  }
  function SetRef(value) {
    this.value = value
  }
  inherits(SetRef, Value)
  wrapToString(SetRef, function() {
    return Expr.toString(this.value)
  })
  SetRef.prototype.toJSON = function() {
    return { '@set': this.value }
  }
  function FaunaTime(value) {
    if (value instanceof Date) {
      value = value.toISOString()
    } else if (!(value.charAt(value.length - 1) === 'Z')) {
      throw new InvalidValue("Only allowed timezone is 'Z', got: " + value)
    }
    this.value = value
  }
  inherits(FaunaTime, Value)
  Object.defineProperty(FaunaTime.prototype, 'date', {
    get: function() {
      return new Date(this.value)
    },
  })
  wrapToString(FaunaTime, function() {
    return 'Time("' + this.value + '")'
  })
  FaunaTime.prototype.toJSON = function() {
    return { '@ts': this.value }
  }
  function FaunaDate(value) {
    if (value instanceof Date) {
      value = value.toISOString().slice(0, 10)
    }
    this.value = value
  }
  inherits(FaunaDate, Value)
  Object.defineProperty(FaunaDate.prototype, 'date', {
    get: function() {
      return new Date(this.value)
    },
  })
  wrapToString(FaunaDate, function() {
    return 'Date("' + this.value + '")'
  })
  FaunaDate.prototype.toJSON = function() {
    return { '@date': this.value }
  }
  function Bytes(value) {
    if (value instanceof ArrayBuffer) {
      this.value = new Uint8Array(value)
    } else if (typeof value === 'string') {
      this.value = base64.toByteArray(value)
    } else if (value instanceof Uint8Array) {
      this.value = value
    } else {
      throw new InvalidValue(
        'Bytes type expect argument to be either Uint8Array|ArrayBuffer|string, got: ' +
          stringify(value)
      )
    }
  }
  inherits(Bytes, Value)
  wrapToString(Bytes, function() {
    return 'Bytes("' + base64.fromByteArray(this.value) + '")'
  })
  Bytes.prototype.toJSON = function() {
    return { '@bytes': base64.fromByteArray(this.value) }
  }
  function Query(value) {
    this.value = value
  }
  inherits(Query, Value)
  wrapToString(Query, function() {
    return 'Query(' + Expr.toString(this.value) + ')'
  })
  Query.prototype.toJSON = function() {
    return { '@query': this.value }
  }
  function wrapToString(type, fn) {
    type.prototype.toString = fn
    type.prototype.inspect = fn
    if (customInspect) {
      type.prototype[customInspect] = fn
    }
  }

  // src/query/Lambda.js
  var import_fn_annotate = __toModule(require_fn_annotate())

  // src/query/Var.js
  function Var(varName) {
    arity.exact(1, arguments, Var.name)
    return new Expr({ var: wrap(varName) })
  }

  // src/query/Lambda.js
  function Lambda() {
    arity.between(1, 2, arguments, Lambda.name)
    switch (arguments.length) {
      case 1:
        var value = arguments[0]
        if (typeof value === 'function') {
          return lambdaFunc(value)
        } else if (
          value instanceof Expr ||
          checkInstanceHasProperty(value, '_isFaunaExpr')
        ) {
          return value
        } else {
          throw new InvalidValue(
            'Lambda function takes either a Function or an Expr.'
          )
        }
      case 2:
        var var_name = arguments[0]
        var expr = arguments[1]
        return lambdaExpr(var_name, expr)
    }
  }
  function lambdaFunc(func) {
    var vars = (0, import_fn_annotate.default)(func)
    switch (vars.length) {
      case 0:
        throw new InvalidValue(
          'Provided Function must take at least 1 argument.'
        )
      case 1:
        return lambdaExpr(vars[0], func(Var(vars[0])))
      default:
        return lambdaExpr(
          vars,
          func.apply(
            null,
            vars.map(function(name2) {
              return Var(name2)
            })
          )
        )
    }
  }
  function lambdaExpr(var_name, expr) {
    return new Expr({ lambda: wrap(var_name), expr: wrap(expr) })
  }

  // src/query/common.js
  function wrap(obj) {
    arity.exact(1, arguments, wrap.name)
    if (obj === null) {
      return null
    } else if (
      obj instanceof Expr ||
      checkInstanceHasProperty(obj, '_isFaunaExpr')
    ) {
      return obj
    } else if (typeof obj === 'symbol') {
      return obj.toString().replace(/Symbol\((.*)\)/, function(str, symbol) {
        return symbol
      })
    } else if (typeof obj === 'function') {
      return Lambda(obj)
    } else if (Array.isArray(obj)) {
      return new Expr(
        obj.map(function(elem) {
          return wrap(elem)
        })
      )
    } else if (obj instanceof Uint8Array || obj instanceof ArrayBuffer) {
      return new Bytes(obj)
    } else if (typeof obj === 'object') {
      return new Expr({ object: wrapValues(obj) })
    } else {
      return obj
    }
  }
  function wrapValues(obj) {
    if (obj !== null) {
      var rv = {}
      Object.keys(obj).forEach(function(key) {
        rv[key] = wrap(obj[key])
      })
      return rv
    } else {
      return null
    }
  }
  function arity(min, max, args, callerFunc) {
    if (
      (min !== null && args.length < min) ||
      (max !== null && args.length > max)
    ) {
      throw new InvalidArity(min, max, args.length, callerFunc)
    }
  }
  arity.exact = function(n, args, callerFunc) {
    arity(n, n, args, callerFunc)
  }
  arity.max = function(n, args, callerFunc) {
    arity(null, n, args, callerFunc)
  }
  arity.min = function(n, args, callerFunc) {
    arity(n, null, args, callerFunc)
  }
  arity.between = function(min, max, args, callerFunc) {
    arity(min, max, args, callerFunc)
  }

  // src/query/Filter.js
  function Filter(collection, lambda_expr) {
    arity.exact(2, arguments, Filter.name)
    return new Expr({ filter: wrap(lambda_expr), collection: wrap(collection) })
  }

  // src/query/Map.js
  function Map2(collection, lambda_expr) {
    arity.exact(2, arguments, Map2.name)
    return new Expr({ map: wrap(lambda_expr), collection: wrap(collection) })
  }

  // src/query/Paginate.js
  function Paginate(set, opts) {
    arity.between(1, 2, arguments, Paginate.name)
    opts = defaults(opts, {})
    return new Expr(Object.assign({ paginate: wrap(set) }, wrapValues(opts)))
  }

  // src/PageHelper.js
  ;('use strict')
  function PageHelper(client, set, params, options) {
    if (params === void 0) {
      params = {}
    }
    if (options === void 0) {
      options = {}
    }
    this.reverse = false
    this.params = {}
    this.before = void 0
    this.after = void 0
    Object.assign(this.params, params)
    var cursorParams = this.params.cursor || this.params
    if ('before' in cursorParams) {
      this.before = cursorParams.before
      delete cursorParams.before
    } else if ('after' in cursorParams) {
      this.after = cursorParams.after
      delete cursorParams.after
    }
    this.options = {}
    Object.assign(this.options, options)
    this.client = client
    this.set = set
    this._faunaFunctions = []
  }
  PageHelper.prototype.map = function(lambda) {
    var rv = this._clone()
    rv._faunaFunctions.push(function(q) {
      return Map2(q, lambda)
    })
    return rv
  }
  PageHelper.prototype.filter = function(lambda) {
    var rv = this._clone()
    rv._faunaFunctions.push(function(q) {
      return Filter(q, lambda)
    })
    return rv
  }
  PageHelper.prototype.each = function(lambda) {
    return this._retrieveNextPage(this.after, false).then(
      this._consumePages(lambda, false)
    )
  }
  PageHelper.prototype.eachReverse = function(lambda) {
    return this._retrieveNextPage(this.before, true).then(
      this._consumePages(lambda, true)
    )
  }
  PageHelper.prototype.previousPage = function() {
    var self2 = this
    return this._retrieveNextPage(this.before, true).then(
      this._adjustCursors.bind(self2)
    )
  }
  PageHelper.prototype.nextPage = function() {
    var self2 = this
    return this._retrieveNextPage(this.after, false).then(
      this._adjustCursors.bind(self2)
    )
  }
  PageHelper.prototype._adjustCursors = function(page) {
    if (page.after !== void 0) {
      this.after = page.after
    }
    if (page.before !== void 0) {
      this.before = page.before
    }
    return page.data
  }
  PageHelper.prototype._consumePages = function(lambda, reverse) {
    var self2 = this
    return function(page) {
      lambda(page.data)
      var nextCursor
      if (reverse) {
        nextCursor = page.before
      } else {
        nextCursor = page.after
      }
      if (nextCursor !== void 0) {
        return self2
          ._retrieveNextPage(nextCursor, reverse)
          .then(self2._consumePages(lambda, reverse))
      } else {
        return Promise.resolve()
      }
    }
  }
  PageHelper.prototype._retrieveNextPage = function(cursor, reverse) {
    var opts = {}
    Object.assign(opts, this.params)
    var cursorOpts = opts.cursor || opts
    if (cursor !== void 0) {
      if (reverse) {
        cursorOpts.before = cursor
      } else {
        cursorOpts.after = cursor
      }
    } else {
      if (reverse) {
        cursorOpts.before = null
      }
    }
    var q = Paginate(this.set, opts)
    if (this._faunaFunctions.length > 0) {
      this._faunaFunctions.forEach(function(lambda) {
        q = lambda(q)
      })
    }
    return this.client.query(q, this.options)
  }
  PageHelper.prototype._clone = function() {
    return Object.create(PageHelper.prototype, {
      client: { value: this.client },
      set: { value: this.set },
      _faunaFunctions: { value: this._faunaFunctions },
      before: { value: this.before },
      after: { value: this.after },
      params: { value: this.params },
    })
  }

  // src/RequestResult.js
  ;('use strict')
  function RequestResult(
    method,
    path,
    query,
    requestRaw,
    requestContent,
    responseRaw,
    responseContent,
    statusCode,
    responseHeaders,
    startTime,
    endTime
  ) {
    this.method = method
    this.path = path
    this.query = query
    this.requestRaw = requestRaw
    this.requestContent = requestContent
    this.responseRaw = responseRaw
    this.responseContent = responseContent
    this.statusCode = statusCode
    this.responseHeaders = responseHeaders
    this.startTime = startTime
    this.endTime = endTime
  }
  Object.defineProperty(RequestResult.prototype, 'timeTaken', {
    get: function() {
      return this.endTime - this.startTime
    },
  })

  // node_modules/abort-controller/polyfill.js
  ;('use strict')
  var ac = require_abort_controller()
  var g =
    typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : void 0
  if (g) {
    if (typeof g.AbortController === 'undefined') {
      g.AbortController = ac.AbortController
    }
    if (typeof g.AbortSignal === 'undefined') {
      g.AbortSignal = ac.AbortSignal
    }
  }

  // src/_http/fetchAdapter.js
  var import_http = __toModule(require_http())
  var import_https = __toModule(require_https())
  ;('use strict')
  function FetchAdapter(options) {
    options = options || {}
    this.type = 'fetch'
    this._closed = false
    this._fetch = resolveFetch(options.fetch)
    this._pendingRequests = new Map()
    if (isNodeEnv() && options.keepAlive) {
      this._keepAliveEnabledAgent = new (options.isHttps
        ? import_https.default
        : import_http.default
      ).Agent({
        keepAlive: true,
      })
    }
  }
  FetchAdapter.prototype.execute = function(options) {
    if (this._closed) {
      return Promise.reject(
        new ClientClosed(
          'The Client has already been closed',
          'No subsequent requests can be issued after the .close method is called. Consider creating a new Client instance'
        )
      )
    }
    var self2 = this
    var timerId = null
    var isStreaming = options.streamConsumer != null
    var useTimeout = !options.signal && !!options.queryTimeout
    var ctrl = new AbortController()
    var pendingRequest = {
      isStreaming,
      isAbortedByClose: false,
      onComplete: null,
    }
    self2._pendingRequests.set(ctrl, pendingRequest)
    var onComplete = function() {
      self2._pendingRequests.delete(ctrl)
      if (options.signal) {
        options.signal.removeEventListener('abort', onAbort)
      }
      if (pendingRequest.onComplete) {
        pendingRequest.onComplete()
      }
    }
    var onSettle = function() {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
    var onResponse = function(response) {
      onSettle()
      var headers = responseHeadersAsObject(response.headers)
      var processStream = isStreaming && response.ok
      if (!processStream) {
        onComplete()
        return response.text().then(function(content) {
          return {
            body: content,
            headers,
            status: response.status,
          }
        })
      }
      attachStreamConsumer(response, options.streamConsumer, onComplete)
      return {
        body: '[stream]',
        headers,
        status: response.status,
      }
    }
    var onError = function(error) {
      onSettle()
      onComplete()
      return Promise.reject(
        remapIfAbortError(error, function() {
          if (!isStreaming && pendingRequest.isAbortedByClose) {
            return new ClientClosed(
              'The request is aborted due to the Client#close call with the force=true option'
            )
          }
          return useTimeout ? new TimeoutError() : new AbortError()
        })
      )
    }
    var onAbort = function() {
      ctrl.abort()
    }
    if (useTimeout) {
      timerId = setTimeout(function() {
        timerId = null
        ctrl.abort()
      }, options.queryTimeout)
    }
    if (options.signal) {
      options.signal.addEventListener('abort', onAbort)
    }
    return this._fetch(formatUrl(options.origin, options.path, options.query), {
      method: options.method,
      headers: options.headers,
      body: options.body,
      agent: this._keepAliveEnabledAgent,
      signal: ctrl.signal,
    })
      .then(onResponse)
      .catch(onError)
  }
  FetchAdapter.prototype.close = function(opts) {
    opts = opts || {}
    this._closed = true
    var promises = []
    var abortOrWait = function(pendingRequest, ctrl) {
      var shouldAbort = pendingRequest.isStreaming || opts.force
      if (shouldAbort) {
        pendingRequest.isAbortedByClose = true
        return ctrl.abort()
      }
      promises.push(
        new Promise(function(resolve) {
          pendingRequest.onComplete = resolve
        })
      )
    }
    this._pendingRequests.forEach(abortOrWait)
    var noop = function() {}
    return Promise.all(promises).then(noop)
  }
  function attachStreamConsumer(response, consumer, onComplete) {
    var onError = function(error) {
      onComplete()
      consumer.onError(remapIfAbortError(error))
    }
    if (isNodeEnv()) {
      response.body
        .on('error', onError)
        .on('data', consumer.onData)
        .on('end', function() {
          onComplete()
          consumer.onError(new TypeError('network error'))
        })
      return
    }
    try {
      let pump = function() {
        return reader.read().then(function(msg) {
          if (!msg.done) {
            var chunk = decoder.decode(msg.value, { stream: true })
            consumer.onData(chunk)
            return pump()
          }
          onComplete()
          consumer.onError(new TypeError('network error'))
        })
      }
      var reader = response.body.getReader()
      var decoder = new TextDecoder('utf-8')
      pump().catch(onError)
    } catch (err) {
      throw new StreamsNotSupported(
        'Please, consider providing a Fetch API-compatible function with streamable response bodies. ' +
          err
      )
    }
  }
  function remapIfAbortError(error, errorFactory) {
    var isAbortError = error && error.name === 'AbortError'
    if (!isAbortError) {
      return error
    }
    if (errorFactory) {
      return errorFactory()
    }
    return new AbortError()
  }
  function responseHeadersAsObject(headers) {
    var result = {}
    for (var header of headers.entries()) {
      var key = header[0]
      var value = header[1]
      result[key] = value
    }
    return result
  }

  // src/_http/index.js
  ;('use strict')
  function HttpClient(options) {
    var isHttps = options.scheme === 'https'
    if (!options.port) {
      options.port = isHttps ? 443 : 80
    }
    this._adapter = new FetchAdapter({
      isHttps,
      fetch: options.fetch,
      keepAlive: options.keepAlive,
    })
    this._baseUrl = options.scheme + '://' + options.domain + ':' + options.port
    this._secret = options.secret
    this._headers = Object.assign({}, options.headers, getDefaultHeaders())
    this._lastSeen = null
    this._queryTimeout = options.queryTimeout
  }
  HttpClient.prototype.getLastTxnTime = function() {
    return this._lastSeen
  }
  HttpClient.prototype.syncLastTxnTime = function(time) {
    if (this._lastSeen == null || this._lastSeen < time) {
      this._lastSeen = time
    }
  }
  HttpClient.prototype.close = function(opts) {
    return this._adapter.close(opts)
  }
  HttpClient.prototype.execute = function(options) {
    options = options || {}
    var invalidStreamConsumer =
      options.streamConsumer &&
      (typeof options.streamConsumer.onData !== 'function' ||
        typeof options.streamConsumer.onError !== 'function')
    if (invalidStreamConsumer) {
      return Promise.reject(new TypeError('Invalid "streamConsumer" provided'))
    }
    var secret = options.secret || this._secret
    var queryTimeout = options.queryTimeout || this._queryTimeout
    var headers = this._headers
    headers['Authorization'] = secret && secretHeader(secret)
    headers['X-Last-Seen-Txn'] = this._lastSeen
    headers['X-Query-Timeout'] = queryTimeout
    return this._adapter.execute({
      origin: this._baseUrl,
      path: options.path || '/',
      query: options.query,
      method: options.method || 'GET',
      headers: removeNullAndUndefinedValues(headers),
      body: options.body,
      signal: options.signal,
      queryTimeout: this._queryTimeout,
      streamConsumer: options.streamConsumer,
    })
  }
  function secretHeader(secret) {
    return 'Bearer ' + secret
  }
  function getDefaultHeaders() {
    var driverEnv = {
      driver: ['javascript', package_default.version].join('-'),
    }
    var isServiceWorker
    try {
      isServiceWorker = global instanceof ServiceWorkerGlobalScope
    } catch (error) {
      isServiceWorker = false
    }
    try {
      if (isNodeEnv()) {
        driverEnv.runtime = ['nodejs', process.version].join('-')
        driverEnv.env = getNodeRuntimeEnv()
        var os = require_os()
        driverEnv.os = [os.platform(), os.release()].join('-')
      } else if (isServiceWorker) {
        driverEnv.runtime = 'Service Worker'
      } else {
        driverEnv.runtime = getBrowserDetails()
        driverEnv.env = 'browser'
        driverEnv.os = getBrowserOsDetails()
      }
    } catch (_) {}
    var headers = {
      'X-FaunaDB-API-Version': package_default.apiVersion,
    }
    if (isNodeEnv()) {
      headers['X-Driver-Env'] = Object.keys(driverEnv)
        .map(key => [key, driverEnv[key].toLowerCase()].join('='))
        .join('; ')
    }
    return headers
  }

  // src/_json.js
  ;('use strict')
  function toJSON(object, pretty) {
    pretty = typeof pretty !== 'undefined' ? pretty : false
    if (pretty) {
      return JSON.stringify(object, null, '  ')
    } else {
      return JSON.stringify(object)
    }
  }
  function parseJSON(json) {
    return JSON.parse(json, json_parse)
  }
  function json_parse(_, val) {
    if (typeof val !== 'object' || val === null) {
      return val
    } else if ('@ref' in val) {
      var ref = val['@ref']
      if (!('collection' in ref) && !('database' in ref)) {
        return Native.fromName(ref['id'])
      }
      var col = json_parse('collection', ref['collection'])
      var db = json_parse('database', ref['database'])
      return new Ref(ref['id'], col, db)
    } else if ('@obj' in val) {
      return val['@obj']
    } else if ('@set' in val) {
      return new SetRef(val['@set'])
    } else if ('@ts' in val) {
      return new FaunaTime(val['@ts'])
    } else if ('@date' in val) {
      return new FaunaDate(val['@date'])
    } else if ('@bytes' in val) {
      return new Bytes(val['@bytes'])
    } else if ('@query' in val) {
      return new Query(val['@query'])
    } else {
      return val
    }
  }

  // src/Client.js
  ;('use strict')
  var notifyIfNewVersion = notifyAboutNewVersion()
  function Client(options) {
    var http2SessionIdleTime = getHttp2SessionIdleTime()
    options = applyDefaults(options, {
      domain: 'db.fauna.com',
      scheme: 'https',
      port: null,
      secret: null,
      observer: null,
      keepAlive: true,
      headers: {},
      fetch: void 0,
      queryTimeout: null,
      http2SessionIdleTime: http2SessionIdleTime.value,
      checkNewVersion: true,
    })
    notifyIfNewVersion(options.checkNewVersion)
    if (http2SessionIdleTime.shouldOverride) {
      options.http2SessionIdleTime = http2SessionIdleTime.value
    }
    this._observer = options.observer
    this._http = new HttpClient(options)
  }
  Client.apiVersion = package_default.apiVersion
  Client.prototype.query = function(expression, options) {
    return this._execute('POST', '', wrap(expression), null, options)
  }
  Client.prototype.paginate = function(expression, params, options) {
    params = defaults(params, {})
    options = defaults(options, {})
    return new PageHelper(this, expression, params, options)
  }
  Client.prototype.ping = function(scope, timeout) {
    return this._execute('GET', 'ping', null, { scope, timeout })
  }
  Client.prototype.getLastTxnTime = function() {
    return this._http.getLastTxnTime()
  }
  Client.prototype.syncLastTxnTime = function(time) {
    this._http.syncLastTxnTime(time)
  }
  Client.prototype.close = function(opts) {
    return this._http.close(opts)
  }
  Client.prototype._execute = function(method, path, data, query, options) {
    query = defaults(query, null)
    if (path instanceof Ref || checkInstanceHasProperty(path, '_isFaunaRef')) {
      path = path.value
    }
    if (query !== null) {
      query = removeUndefinedValues(query)
    }
    var startTime = Date.now()
    var self2 = this
    var body =
      ['GET', 'HEAD'].indexOf(method) >= 0 ? void 0 : JSON.stringify(data)
    return this._http
      .execute(
        Object.assign({}, options, {
          path,
          query,
          method,
          body,
        })
      )
      .then(function(response) {
        var endTime = Date.now()
        var responseObject = parseJSON(response.body)
        var result = new RequestResult(
          method,
          path,
          query,
          body,
          data,
          response.body,
          responseObject,
          response.status,
          response.headers,
          startTime,
          endTime
        )
        self2._handleRequestResult(response, result, options)
        return responseObject['resource']
      })
  }
  Client.prototype._handleRequestResult = function(response, result, options) {
    var txnTimeHeaderKey = 'x-txn-time'
    if (response.headers[txnTimeHeaderKey] != null) {
      this.syncLastTxnTime(parseInt(response.headers[txnTimeHeaderKey], 10))
    }
    var observers = [this._observer, options && options.observer]
    observers.forEach(observer => {
      if (typeof observer == 'function') {
        observer(result, this)
      }
    })
    FaunaHTTPError.raiseForStatusCode(result)
  }
  function getHttp2SessionIdleTime() {
    var fromEnv = getEnvVariable('FAUNADB_HTTP2_SESSION_IDLE_TIME')
    var parsed = fromEnv === 'Infinity' ? Infinity : parseInt(fromEnv, 10)
    var useEnvVar = !isNaN(parsed)
    return {
      shouldOverride: useEnvVar,
      value: useEnvVar ? parsed : 500,
    }
  }

  // src/clientLogger.js
  ;('use strict')
  function logger(loggerFunction) {
    return function(requestResult, client) {
      return loggerFunction(showRequestResult(requestResult), client)
    }
  }
  function showRequestResult(requestResult) {
    var query = requestResult.query,
      method = requestResult.method,
      path = requestResult.path,
      requestContent = requestResult.requestContent,
      responseHeaders = requestResult.responseHeaders,
      responseContent = requestResult.responseContent,
      statusCode = requestResult.statusCode,
      timeTaken = requestResult.timeTaken
    var out = ''
    function log(str) {
      out = out + str
    }
    log('Fauna ' + method + ' /' + path + _queryString(query) + '\n')
    if (requestContent != null) {
      log('  Request JSON: ' + _showJSON(requestContent) + '\n')
    }
    log('  Response headers: ' + _showJSON(responseHeaders) + '\n')
    log('  Response JSON: ' + _showJSON(responseContent) + '\n')
    log(
      '  Response (' + statusCode + '): Network latency ' + timeTaken + 'ms\n'
    )
    return out
  }
  function _indent(str) {
    var indentStr = '  '
    return str.split('\n').join('\n' + indentStr)
  }
  function _showJSON(object) {
    return _indent(toJSON(object, true))
  }
  function _queryString(query) {
    if (query == null) {
      return ''
    }
    var keys = Object.keys(query)
    if (keys.length === 0) {
      return ''
    }
    var pairs = keys.map(function(key) {
      return key + '=' + query[key]
    })
    return '?' + pairs.join('&')
  }
})()
