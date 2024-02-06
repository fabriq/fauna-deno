'use strict'
import packageJson from '../../package.json'
import {
  getBrowserDetails,
  getBrowserOsDetails,
  removeNullAndUndefinedValues,
} from '../_util'
import FetchAdapter from './fetchAdapter'

/**
 * The driver's internal HTTP client.
 *
 * @constructor
 * @param {Object} options Same as the {@link Client} options.
 * @private
 */
export default function HttpClient(options) {
  var isHttps = options.scheme === 'https'

  // If the port is a falsy value - replace it with default one.
  if (!options.port) {
    options.port = isHttps ? 443 : 80
  }

  this._adapter = new FetchAdapter({
    isHttps: isHttps,
    fetch: options.fetch,
    keepAlive: options.keepAlive,
  })

  if (options.endpoint === null) {
    this._baseUrl = options.scheme + '://' + options.domain + ':' + options.port
  } else {
    this._baseUrl = options.endpoint
  }

  this._secret = options.secret
  this._headers = Object.assign({}, options.headers, getDefaultHeaders())
  this._lastSeen = null
  this._queryTimeout = options.queryTimeout
}

/**
 * Returns last seen transaction time.
 *
 * @returns {number} The last seen transaction time.
 */
HttpClient.prototype.getLastTxnTime = function() {
  return this._lastSeen
}

/**
 * Sets the last seen transaction if the given timestamp is greater than then
 * know last seen timestamp.
 *
 * @param {number} time transaction timestamp.
 */
HttpClient.prototype.syncLastTxnTime = function(time) {
  if (this._lastSeen == null || this._lastSeen < time) {
    this._lastSeen = time
  }
}

/**
 * Cleans up any held resources.
 *
 * @param {?object} opts Close options.
 * @param {?boolean} opts.force Whether to force resources clean up.
 * @returns {Promise<void>}
 */
HttpClient.prototype.close = function(opts) {
  return this._adapter.close(opts)
}

/**
 * Executes an HTTP request.
 *
 * @param {?object} options Request parameters.
 * @param {?string} options.method Request method.
 * @param {?string} options.path Request path.
 * @param {?string} options.body Request body.
 * @param {?object} options.query Request query.
 * @params {?object} options.streamConsumer Stream consumer, if presented
 * the request will be "streamed" into streamConsumer.onData function.
 * @params {function} options.streamConsumer.onData Function called with a chunk of data.
 * @params {function} options.streamConsumer.onError Function called
 * when an error occurred.
 * when the stream is ended.
 * @param {?object} options.signal Abort signal object.
 * @param {?object} options.fetch Fetch API compatible function.
 * @param {?object} options.secret FaunaDB secret.
 * @param {?object} options.queryTimeout FaunaDB query timeout.
 * @param {?string} options.traceparent Unique identifier for the query.
 * @param { {[key: string]: string|number } } options.tags Keyword-value pairs which can be associated with a query.
 * @returns {Promise} The response promise.
 */
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
  // We perform basic validation on the traceparent format and pass along as-is.
  // In the event the traceparent is invalid, we silently drop it here, generate
  // a new one server-side, and return it via the traceresponse header.
  // See https://w3c.github.io/trace-context/#a-traceparent-is-received
  var traceparent = isValidTraceparentHeader(options.traceparent)
    ? options.traceparent
    : null

  headers['Authorization'] = secret && secretHeader(secret)
  headers['X-Last-Seen-Txn'] = this._lastSeen
  headers['X-Query-Timeout'] = queryTimeout
  headers['traceparent'] = traceparent
  headers['x-fauna-tags'] = parseTags(options.tags)

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

function isValidTraceparentHeader(traceparentHeader) {
  // Shamelessly copied from shorturl.at/osvwz
  return /^[\da-f]{2}-[\da-f]{32}-[\da-f]{16}-[\da-f]{2}$/.test(
    traceparentHeader
  )
}

function parseTags(tags) {
  if (tags === undefined || tags == null || tags == '') return null
  validateTags(tags)
  return Object.entries(tags)
    .map(e => e.join('='))
    .join(',')
}

function validateTags(tags) {
  if (typeof tags != 'object') {
    throw new Error('Tags must be provided as an object!')
  }
}

function secretHeader(secret) {
  return 'Bearer ' + secret
}

/** @ignore */
function getDefaultHeaders() {
  var driverEnv = {
    driver: ['javascript', packageJson.version].join('-'),
  }

  var isServiceWorker

  try {
    // eslint-disable-next-line no-undef
    isServiceWorker = global instanceof ServiceWorkerGlobalScope
  } catch (error) {
    isServiceWorker = false
  }

  try {
    if (typeof Deno !== undefined) {
      driverEnv.runtime = 'Deno'
      driverEnv.env = 'Deno'
    } else if (isServiceWorker) {
      driverEnv.runtime = 'Service Worker'
    } else {
      driverEnv.runtime = getBrowserDetails()
      driverEnv.env = 'browser'
      driverEnv.os = getBrowserOsDetails()
    }
  } catch (_) {}

  var headers = {
    'X-FaunaDB-API-Version': packageJson.apiVersion,
  }

  return headers
}
