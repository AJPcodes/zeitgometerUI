(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\component-emitter\\index.js":[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\reduce-component\\index.js":[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\client.js":[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');
var requestBase = require('./request-base');
var isObject = require('./is-object');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Expose `request`.
 */

var request = module.exports = require('./request').bind(null, Request);

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  this._getFormData().append(field, file, filename || file.name);
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * @deprecated
 */
Response.prototype.parse = function serialize(fn){
  if (root.console) {
    console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");
  }
  this.serialize(fn);
  return this;
};

Response.prototype.serialize = function serialize(fn){
  this._parser = fn;
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = 'download';
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  if (this.username && this.password) {
    xhr.open(this.method, this.url, true, this.username, this.password);
  } else {
    xhr.open(this.method, this.url, true);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};


/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\is-object.js","./request":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\request.js","./request-base":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\request-base.js","emitter":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\component-emitter\\index.js","reduce":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\reduce-component\\index.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\is-object.js":[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}

module.exports = isObject;

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\request-base.js":[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {
  this._getFormData().append(name, val);
  return this;
};

},{"./is-object":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\is-object.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\request.js":[function(require,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.jsx":[function(require,module,exports){
var ArticlesContainer = require('./container/ArticlesContainer.jsx')
var ConceptsContainer = require('./container/ConceptsContainer.jsx')
var Navigation = require('./components/Navigation.jsx')

ReactDOM.render(
  React.createElement("div", null, 
    React.createElement(Navigation, null), 
    React.createElement("div", {className: "container row"}, 
    React.createElement(ArticlesContainer, null), 
    React.createElement(ConceptsContainer, null)
    )
  )
  , document.getElementById('content'))
},{"./components/Navigation.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\Navigation.jsx","./container/ArticlesContainer.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\container\\ArticlesContainer.jsx","./container/ConceptsContainer.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\container\\ConceptsContainer.jsx"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticleConcepts.jsx":[function(require,module,exports){
var RP = require('./ReactPlotly.jsx')

var ArticleConcepts = React.createClass({displayName: "ArticleConcepts",

  render: function(){
    // console.log(this.props)
    if (this.props.concepts) {

      var plotID = this.props.title
      var plotData = {
        x: [],
        y: [],
        type: 'bar',
        orientation: 'h'
      }

      var layout = {                     // all "layout" attributes: #layout
          title: 'Concepts By Relevance',  // more about "layout.title": #layout-title
          barmode: 'stack',
          showlegend: false,
          xaxis: {
              title: 'Relevance Score',
              range: [50, 100],
              domain: [0, 1],
              zeroline: false,
              showline: false
              // showticklabels: true,
              // showgrid: true
            },
          height: 600,
          width: 550,
          margin: {l: 250}
        }


      var concepts = this.props.concepts.slice(0,25).reverse().forEach(function(concept){
        var score = concept.score.toFixed(2) * 100;
        // return <p><span className="badge">{concept.concept.label} {score}</span></p>;
          plotData.x.push(score),
          plotData.y.push(concept.concept.label)
      });

      var config = {
        showLink: false,
        displayModeBar: false,
        displayLogo: false
      };

      return (
        React.createElement("div", {className: "plotlyPlot"}, 
          React.createElement(RP, {handle: plotID, data: [plotData], layout: layout, config: config})
        )
      )

    }//end if

    else {

      return (React.createElement("div", null, "Loading Concept Graph"))
    }
  }//end render

}) //end

module.exports = ArticleConcepts


  // render() {
  //   let data = [
  //     {
  //       type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
  //       x: [1, 2, 3],     // more about "x": #scatter-x
  //       y: [6, 2, 3],     // #scatter-y
  //       marker: {         // marker is an object, valid marker keys: #scatter-marker
  //         color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
  //       }
  //     },
  //     {
  //       type: 'bar',      // all "bar" chart attributes: #bar
  //       x: [1, 2, 3],     // more about "x": #bar-x
  //       y: [6, 2, 3],     // #bar-y
  //       name: 'bar chart example' // #bar-name
  //     }
  //   ];
  //   let layout = {                     // all "layout" attributes: #layout
  //     title: 'simple example',  // more about "layout.title": #layout-title
  //     xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
  //       title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
  //     },
  //     annotations: [            // all "annotation" attributes: #layout-annotations
  //       {
  //         text: 'simple annotation',    // #layout-annotations-text
  //         x: 0,                         // #layout-annotations-x
  //         xref: 'paper',                // #layout-annotations-xref
  //         y: 0,                         // #layout-annotations-y
  //         yref: 'paper'                 // #layout-annotations-yref
  //       }
  //     ]
  //   };
  //   let config = {
  //     showLink: false,
  //     displayModeBar: true
  //   };
  //   return (
  //     <Plotly className="whatever" data={data} layout={layout} config={config}/>
  //   );
  // }
},{"./ReactPlotly.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ReactPlotly.jsx"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListArticles.jsx":[function(require,module,exports){
var ArticleConcepts = require('./ArticleConcepts.jsx')

var ListArticles = React.createClass({displayName: "ListArticles",

  componentDidMount: function() {
      $('.modal-trigger').leanModal();
  },


  openGraph: function(modalID) {
    console.log('open graph')
    $("#" + modalID).openModal()
  },

  closeGraph: function(modalID) {
    console.log('close graph')
    $("#" + modalID).closeModal()
  },

  render: function(){

    if (this.props.articles === null) {
      return (
        React.createElement("div", null, 
            React.createElement("ul", {className: "collapsible popout", "data-collapsible": "accordion"}, 
              "Getting Data"
            )
        )
      )
    } else {

      var articles = this.props.articles.map(function(article){
        return  React.createElement("li", null, 
                  React.createElement("div", {className: "collapsible-header"}, 
                    React.createElement("h4", null, article.title)
                  ), 
                  React.createElement("div", {className: "collapsible-body"}, 
                    React.createElement("p", null, " ", React.createElement("a", {href: article.url, target: "blank"}, " Read it on ", article.website, " "), " or" + ' ' +
                     "view a ", React.createElement("a", {className: "waves-effect waves-light .modal-trigger", href: "#" + article._id, onClick: function(){this.openGraph(article._id)}.bind(this)}, " Concept Graph")
                    ), 
                    React.createElement("div", {id: article._id, className: "modal"}, 
                      React.createElement("div", {className: "modal-content"}, 
                        React.createElement("h4", null, article.title), 
                        React.createElement(ArticleConcepts, {title: article.title, concepts: article.concepts})
                      ), 
                        React.createElement("div", {className: "modal-footer"}, 
                          React.createElement("a", {href: "#!", className: "modal-action modal-close waves-effect waves-green btn-flat", onClick: function() {this.closeGraph(article._id)}.bind(this)}, "Close")
                        )
                    )
                  )
                );
      }.bind(this));
      return (
        React.createElement("div", null, 
            React.createElement("ul", {className: "collapsible popout", "data-collapsible": "accordion"}, 
              articles
            )
        )
      )
    }
  }
})

module.exports = ListArticles

},{"./ArticleConcepts.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticleConcepts.jsx"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListConcepts.jsx":[function(require,module,exports){
var ArticleConcepts = require('./ArticleConcepts.jsx')
var getById = "http://zeitgometerapi.heroku.com/article/"
var request = require('superagent')

var ListConcepts = React.createClass({displayName: "ListConcepts",

  getInitialState: function() {
    return {modalData: null};
  },

  openGraph: function(modalID) {
    console.log('open graph')
    this.getArticleById(modalID)
    $("#" + modalID).openModal()
  },

  closeGraph: function(modalID) {
    console.log('close graph')
    $("#" + modalID).closeModal()
  },


  getArticleById: function(articleId) {

     request
      .post('/api')
      .send({ "apiEndpoint": (getById + articleId)})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          modalData: data.data
        });

      }.bind(this))
  },

  render: function(){

    if (this.props.concepts === null) {

      return (
        React.createElement("div", null, 
            React.createElement("ul", {className: "collapsible popout", "data-collapsible": "accordion"}, 
            "Getting Data"
            )
        )
      ) //end return

    } else {

      var conceptKeys = Object.keys(this.props.concepts);

      //sory by number of articles
      conceptKeys.sort(function(a,b) {
        if (this.props.concepts[a].size > this.props.concepts[b].size) {
          return -1
        } else if (this.props.concepts[a].size < this.props.concepts[b].size) {
          return 1
        } else {
          return 0;
        }
      }.bind(this))





      var concepts = conceptKeys.map(function(concept){

        var conceptId = this.props.concepts[concept]._id
        var articles = this.props.concepts[concept].articles
        var numArticles = 0;
        if (articles) {
          numArticles = articles.length
        }

        mappedArticles = articles.map(function(article) {

          if (this.state.modalData && this.state.modalData._id  === article._id) {
            graphData = this.state.modalData.concepts

          return  React.createElement("div", null, 
                    React.createElement("h6", null, " ", article.title, ":"), 
                    React.createElement("p", null, React.createElement("a", {href: article.url, target: "blank"}, " Read it on ", article.website, " "), " or" + ' ' +
                     "view a ", React.createElement("a", {className: "waves-effect waves-light .modal-trigger", href: "#" + article._id, onClick: function(){this.openGraph(article._id)}.bind(this)}, " Concept Graph")
                    ), 
                    React.createElement("div", {id: article._id, className: "modal"}, 
                      React.createElement("div", {className: "modal-content"}, 
                        React.createElement("h4", null, article.title), 
                        React.createElement(ArticleConcepts, {title: article.title, articleId: article._id, concepts: graphData})
                      ), 
                        React.createElement("div", {className: "modal-footer"}, 
                          React.createElement("a", {href: "#!", className: "modal-action modal-close waves-effect waves-green btn-flat", onClick: function() {this.closeGraph(article._id)}.bind(this)}, "Close")
                        )
                    )
                  );


          } else {
            graphData = null

            return React.createElement("div", null, 
                    React.createElement("h6", null, " ", article.title, ":"), 
                    React.createElement("p", null, React.createElement("a", {href: article.url, target: "blank"}, " Read it on ", article.website, " "), " or" + ' ' +
                     "view a ", React.createElement("a", {className: "waves-effect waves-light .modal-trigger", href: "#" + article._id, onClick: function(){this.openGraph(article._id)}.bind(this)}, " Concept Graph")
                    ), 
                    React.createElement("div", {id: article._id, className: "modal"}, 
                      React.createElement("div", {className: "modal-content"}, 
                        React.createElement("h4", null, article.title), 
                        React.createElement("p", null, "Loading Graph Data")
                      ), 
                        React.createElement("div", {className: "modal-footer"}, 
                          React.createElement("a", {href: "#!", className: "modal-action modal-close waves-effect waves-green btn-flat", onClick: function() {this.closeGraph(article._id)}.bind(this)}, "Close")
                        )
                    )
                  );

          }


        }.bind(this)) //end map

        return  React.createElement("li", null, 
                  React.createElement("div", {className: "collapsible-header"}, React.createElement("h4", null, "Concept: ", concept), "  ", React.createElement("p", null, "Mentions: ", numArticles)), 
                  React.createElement("div", {className: "collapsible-body"}, mappedArticles)
                );

      }.bind(this)); //end map concepts


      return (
        React.createElement("div", null, 
            React.createElement("ul", {className: "collapsible popout", "data-collapsible": "accordion"}, 
              concepts
            )
        )
      ) //end return
    } //end render
  }
}) //end class declaration

module.exports = ListConcepts

},{"./ArticleConcepts.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ArticleConcepts.jsx","superagent":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\client.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\Navigation.jsx":[function(require,module,exports){
var Navigation = React.createClass({displayName: "Navigation",

  render: function(){

    return (
      React.createElement("div", {className: "navbar-fixed"}, 
        React.createElement("nav", null, 
          React.createElement("div", {className: "nav-wrapper"}, 
            React.createElement("a", {href: "#", className: "brand-logo"}, "Zeitgometer"), 
            React.createElement("ul", {id: "nav-mobile", className: "right"}, 
              React.createElement("li", null, React.createElement("a", {href: "#articlesTop"}, "Articles")), 
              React.createElement("li", null, React.createElement("a", {href: "#conceptsTop"}, "Concepts"))
            )
          )
        )
      )
    )
  }
})

module.exports = Navigation
},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ReactPlotly.jsx":[function(require,module,exports){
var RP = React.createClass({
    displayName: 'Plot',

    propTypes: {
      handle: React.PropTypes.string.isRequired,
      data: React.PropTypes.array.isRequired,
      layout: React.PropTypes.object,
      config: React.PropTypes.object
    },
    componentDidMount: function componentDidMount() {
      this.plot(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      this.plot(nextProps);
    },
    plot: function plot(props) {
      var handle = props.handle,
          data = props.data,
          layout = props.layout,
          config = props.config;
      Plotly.plot(handle, data, layout, config);
    },
    render: function render() {
      return React.createElement(
        'div',
        { id: this.props.handle }
      );
    }
  });

module.exports = RP

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\SearchBar.jsx":[function(require,module,exports){
var SearchBar = React.createClass({displayName: "SearchBar",

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){

        this.setState({searchString:e.target.value});
    },

    handleClick: function(concept){

        this.setState({searchString: ''});
        lookup = this.props.conceptLookup,
        lookup(concept._id)
    },



    render: function() {

        var libraries = this.props.items,
            handleClick = this.handleClick,
            searchString = this.state.searchString.trim().toLowerCase();


        if(libraries == null) {
            libraries = [React.createElement("li", null)]
        }

        if(searchString.length > 0){

            // We are searching. Filter the results.

            libraries = libraries.filter(function(l){
                return l.label.toLowerCase().match( searchString );
            });

            libraries = libraries.map(function(l){
                return React.createElement("li", {onClick: function(){handleClick(l)}}, React.createElement("p", null, " ", l.label, " "))
            })


        return React.createElement("div", null, 
                    React.createElement("input", {id: "conceptSearchbar", className: "lime", type: "text", value: this.state.searchString, onChange: this.handleChange, placeholder: "Search Concepts"}), 
                    React.createElement("ul", null, 
                        libraries
                    )
                );
        } else {
           return  React.createElement("div", null, 
                React.createElement("input", {type: "text", value: this.state.searchString, onChange: this.handleChange, placeholder: "Search Concepts"}), 
                React.createElement("ul", null
                )
            );
        }

    }
});

module.exports = SearchBar

},{}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\container\\ArticlesContainer.jsx":[function(require,module,exports){
var ListArticles = require('../components/ListArticles.jsx')
var request = require('superagent')

var recent = "http://zeitgometerapi.heroku.com/article/recent"
var getById = "http://zeitgometerapi.heroku.com/article/"

var ArticlesContainer  = React.createClass({displayName: "ArticlesContainer",

  getInitialState: function() {
    return {
      articles: null
    };
  },

  componentDidMount: function() {

    this.getArticles(recent)

  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  getArticles: function(apiEndpoint) {
     request
      .post('/api')
      .send({ "apiEndpoint": apiEndpoint})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          articles: data.data
        });

      }.bind(this))
  },

  getArticleById: function(articleId) {

    this.getArticles(getById + articleId)

  },

  handleClick: function() {
    this.setState({
      articles: null
    });

    this.getArticles(recent)

  },

  render: function(){
    return (
      React.createElement("div", {className: "col s12 m5 z-depth-2", id: "articlesTop"}, 
        React.createElement("h2", null, " Articles "), 
        React.createElement("p", null, " ", React.createElement("span", {className: "clickableLink", onClick: function(){this.handleClick('trending')}.bind(this)}, " View recent articles "), " "), 
        React.createElement(ListArticles, {articles: this.state.articles})
      )
    )
  }
})

module.exports = ArticlesContainer

},{"../components/ListArticles.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListArticles.jsx","superagent":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\client.js"}],"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\container\\ConceptsContainer.jsx":[function(require,module,exports){
var ListConcepts = require('../components/ListConcepts.jsx')
var SearchBar = require('../components/SearchBar.jsx')
var request = require('superagent')

var trending = "http://zeitgometerapi.heroku.com/concept/trending"
var popular = "http://zeitgometerapi.heroku.com/popular"
var listAll = "http://zeitgometerapi.heroku.com/concept/listAll"

var ConceptsContainer  = React.createClass({displayName: "ConceptsContainer",

  getInitialState: function() {
    return {
      concepts: null,
      conceptsList: null
    };
  },

  componentDidMount: function() {
     this.getData();
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  getData: function() {

    this.trendingLookup()

    request
      .post('/api')
      .send({ "apiEndpoint": listAll})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)

        this.setState({
          conceptsList: data.data
        });

      }.bind(this))
  },

  conceptLookup: function(conceptId) {

    this.setState({
      concepts: null
    });

    // console.log('concept lookup called with', conceptId)
    var apiUrl = "http://zeitgometerapi.heroku.com/concept/" + conceptId

     request
      .post('/api')
      .send({ "apiEndpoint": apiUrl})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          concepts: data.data
        });

      }.bind(this))

  },

  trendingLookup: function() {

     request
      .post('/api')
      .send({ "apiEndpoint": trending})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          concepts: data.data.concepts
        });

      }.bind(this))

  },

  popularLookup: function() {

     request
      .post('/api')
      .send({ "apiEndpoint": popular})
      .set('Accept', "*/*")
      .end(function (err, res) {
        if (err) return console.error(err)

        var data = JSON.parse(res.text)
        this.setState({
          concepts: data.data
        });

      }.bind(this))

  },

  handleClick: function(lookupParam) {
    this.setState({
      concepts: null
    });

    if (lookupParam == 'trending') {
      this.trendingLookup()
    } else {
      this.popularLookup()
    }

  },

  render: function(){
    return (
      React.createElement("div", {className: "col s12 m5 z-depth-2", id: "conceptsTop"}, 
        React.createElement("h2", null, " Concepts "), 
        React.createElement("p", null, " ", React.createElement("span", {className: "clickableLink", onClick: function(){this.handleClick('trending')}.bind(this)}, " View trending concepts "), " or ", React.createElement("span", {className: "clickableLink", onClick: function(){this.handleClick('popular')}.bind(this)}, " view popular concepts "), " "), 
        React.createElement(SearchBar, {items: this.state.conceptsList, conceptLookup: this.conceptLookup}), 

        React.createElement(ListConcepts, {concepts: this.state.concepts})
      )
    )
  }
})

module.exports = ConceptsContainer

},{"../components/ListConcepts.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\ListConcepts.jsx","../components/SearchBar.jsx":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\components\\SearchBar.jsx","superagent":"C:\\Users\\Allen\\workspace\\zeitgometerUI\\node_modules\\superagent\\lib\\client.js"}]},{},["C:\\Users\\Allen\\workspace\\zeitgometerUI\\scripts\\app.jsx"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXF1ZXN0LmpzIiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxhcHAuanN4IiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxBcnRpY2xlQ29uY2VwdHMuanN4IiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxMaXN0QXJ0aWNsZXMuanN4IiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxMaXN0Q29uY2VwdHMuanN4IiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxOYXZpZ2F0aW9uLmpzeCIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29tcG9uZW50c1xcUmVhY3RQbG90bHkuanN4IiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb21wb25lbnRzXFxTZWFyY2hCYXIuanN4IiwiQzpcXFVzZXJzXFxBbGxlblxcd29ya3NwYWNlXFx6ZWl0Z29tZXRlclVJXFxzY3JpcHRzXFxjb250YWluZXJcXEFydGljbGVzQ29udGFpbmVyLmpzeCIsIkM6XFxVc2Vyc1xcQWxsZW5cXHdvcmtzcGFjZVxcemVpdGdvbWV0ZXJVSVxcc2NyaXB0c1xcY29udGFpbmVyXFxDb25jZXB0c0NvbnRhaW5lci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFBLEdBQUssQ0FBQSxFQUFBO0FBQzlRLFFBQVEsb0JBQUMsU0FBUyxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBQyxDQUFDLGFBQUEsRUFBYSxDQUFFLElBQUksQ0FBQyxhQUFjLENBQUUsQ0FBQSxFQUFBOztRQUUvRSxvQkFBQyxZQUFZLEVBQUEsQ0FBQSxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUcsQ0FBQTtNQUMzQyxDQUFBO0tBQ1A7R0FDRjtBQUNILENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLyoqXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufTtcblxuLyoqXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcbiAgICAucHVzaChmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIGZ1bmN0aW9uIG9uKCkge1xuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIG9uLmZuID0gZm47XG4gIHRoaXMub24oZXZlbnQsIG9uKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgLy8gYWxsXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHNwZWNpZmljIGV2ZW50XG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG5cbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICB2YXIgY2I7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2IgPSBjYWxsYmFja3NbaV07XG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsIlxuLyoqXG4gKiBSZWR1Y2UgYGFycmAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TWl4ZWR9IGluaXRpYWxcbiAqXG4gKiBUT0RPOiBjb21iYXRpYmxlIGVycm9yIGhhbmRsaW5nP1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBmbiwgaW5pdGlhbCl7ICBcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgY3VyciA9IGFyZ3VtZW50cy5sZW5ndGggPT0gM1xuICAgID8gaW5pdGlhbFxuICAgIDogYXJyW2lkeCsrXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgY3VyciA9IGZuLmNhbGwobnVsbCwgY3VyciwgYXJyW2lkeF0sICsraWR4LCBhcnIpO1xuICB9XG4gIFxuICByZXR1cm4gY3Vycjtcbn07IiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnZW1pdHRlcicpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ3JlZHVjZScpO1xudmFyIHJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5cbi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgeyAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgcm9vdCA9IHRoaXM7XG59XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBUT0RPOiBmdXR1cmUgcHJvb2YsIG1vdmUgdG8gY29tcG9lbnQgbGFuZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0hvc3Qob2JqKSB7XG4gIHZhciBzdHIgPSB7fS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgc3dpdGNoIChzdHIpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZpbGVdJzpcbiAgICBjYXNlICdbb2JqZWN0IEJsb2JdJzpcbiAgICBjYXNlICdbb2JqZWN0IEZvcm1EYXRhXSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG52YXIgcmVxdWVzdCA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZXF1ZXN0JykuYmluZChudWxsLCBSZXF1ZXN0KTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gZnVuY3Rpb24gKCkge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICAgJiYgKCFyb290LmxvY2F0aW9uIHx8ICdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbFxuICAgICAgICAgIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgdHJpbSA9ICcnLnRyaW1cbiAgPyBmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7IH07XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAobnVsbCAhPSBvYmpba2V5XSkge1xuICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgb2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogSGVscHMgJ3NlcmlhbGl6ZScgd2l0aCBzZXJpYWxpemluZyBhcnJheXMuXG4gKiBNdXRhdGVzIHRoZSBwYWlycyBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKi9cblxuZnVuY3Rpb24gcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdmFsKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gdmFsLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgfSk7XG4gIH1cbiAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QgPSBzZXJpYWxpemU7XG5cbiAvKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG4gIHZhciBwYXJ0cztcbiAgdmFyIHBhaXI7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBhcnRzID0gcGFpci5zcGxpdCgnPScpO1xuICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1sxXSk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAnYXBwbGljYXRpb24veG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZSA9IHtcbiAgICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG4gfTtcblxuIC8qKlxuICAqIERlZmF1bHQgcGFyc2Vycy5cbiAgKlxuICAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xuICAqICAgICB9O1xuICAqXG4gICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlXG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcHBlZCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgZmllbGRzID0ge307XG4gIHZhciBpbmRleDtcbiAgdmFyIGxpbmU7XG4gIHZhciBmaWVsZDtcbiAgdmFyIHZhbDtcblxuICBsaW5lcy5wb3AoKTsgLy8gdHJhaWxpbmcgQ1JMRlxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGZpZWxkID0gbGluZS5zbGljZSgwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB0cmltKGxpbmUuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgZmllbGRzW2ZpZWxkXSA9IHZhbDtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG1pbWVgIGlzIGpzb24gb3IgaGFzICtqc29uIHN0cnVjdHVyZWQgc3ludGF4IHN1ZmZpeC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSlNPTihtaW1lKSB7XG4gIHJldHVybiAvW1xcLytdanNvblxcYi8udGVzdChtaW1lKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHR5cGUoc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyYW1zKHN0cil7XG4gIHJldHVybiByZWR1Y2Uoc3RyLnNwbGl0KC8gKjsgKi8pLCBmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pXG4gICAgICAsIGtleSA9IHBhcnRzLnNoaWZ0KClcbiAgICAgICwgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICAgIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgLy8gcmVzcG9uc2VUZXh0IGlzIGFjY2Vzc2libGUgb25seSBpZiByZXNwb25zZVR5cGUgaXMgJycgb3IgJ3RleHQnIGFuZCBvbiBvbGRlciBicm93c2Vyc1xuICB0aGlzLnRleHQgPSAoKHRoaXMucmVxLm1ldGhvZCAhPSdIRUFEJyAmJiAodGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAnJyB8fCB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JykpIHx8IHR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICd1bmRlZmluZWQnKVxuICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dFxuICAgICA6IG51bGw7XG4gIHRoaXMuc3RhdHVzVGV4dCA9IHRoaXMucmVxLnhoci5zdGF0dXNUZXh0O1xuICB0aGlzLnNldFN0YXR1c1Byb3BlcnRpZXModGhpcy54aHIuc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLnNldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgPyB0aGlzLnBhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICA6IG51bGw7XG59XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKXtcbiAgLy8gY29udGVudC10eXBlXG4gIHZhciBjdCA9IHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgdGhpcy50eXBlID0gdHlwZShjdCk7XG5cbiAgLy8gcGFyYW1zXG4gIHZhciBvYmogPSBwYXJhbXMoY3QpO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB0aGlzW2tleV0gPSBvYmpba2V5XTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXG4gKlxuICogVXNlZCBmb3IgYXV0by1wYXJzaW5nIG9mIGJvZGllcy4gUGFyc2Vyc1xuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUucGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuXG4gIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAvLyBzdGF0dXMgLyBjbGFzc1xuICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgIDogZmFsc2U7XG5cbiAgLy8gc3VnYXJcbiAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbiAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgZXJyLnJhd1Jlc3BvbnNlID0gc2VsZi54aHIgJiYgc2VsZi54aHIucmVzcG9uc2VUZXh0ID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogbnVsbDtcbiAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgZXJyLnN0YXR1c0NvZGUgPSBzZWxmLnhociAmJiBzZWxmLnhoci5zdGF0dXMgPyBzZWxmLnhoci5zdGF0dXMgOiBudWxsO1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICB9XG5cbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH1cblxuICAgIHZhciBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG5cbiAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYHJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcbmZvciAodmFyIGtleSBpbiByZXF1ZXN0QmFzZSkge1xuICBSZXF1ZXN0LnByb3RvdHlwZVtrZXldID0gcmVxdWVzdEJhc2Vba2V5XTtcbn1cblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuYWJvcnRlZCkgcmV0dXJuO1xuICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhoci5hYm9ydCgpO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgcmVzcG9uc2VUeXBlIHRvIGB2YWxgLiBQcmVzZW50bHkgdmFsaWQgcmVzcG9uc2VUeXBlcyBhcmUgJ2Jsb2InIGFuZCBcbiAqICdhcnJheWJ1ZmZlcicuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24odmFsKXtcbiAgdGhpcy5fcmVzcG9uc2VUeXBlID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IHBhc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHdpdGggJ3R5cGUnIHByb3BlcnR5ICdhdXRvJyBvciAnYmFzaWMnIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Jhc2ljJ1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdmFyIHN0ciA9IGJ0b2EodXNlciArICc6JyArIHBhc3MpO1xuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHN0cik7XG4gICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRvJzpcbiAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyO1xuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3M7XG4gICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbipcbiogRXhhbXBsZXM6XG4qXG4qICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4qICAgICAucXVlcnkoJ3NpemU9MTAnKVxuKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuKlxuKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiogQGFwaSBwdWJsaWNcbiovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgZmlsZW5hbWVgLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaChuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgZmlsZW5hbWUpe1xuICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChmaWVsZCwgZmlsZSwgZmlsZW5hbWUgfHwgZmlsZS5uYW1lKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbigpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogU2VuZCBgZGF0YWAgYXMgdGhlIHJlcXVlc3QgYm9keSwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9JylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgLy8gbWVyZ2VcbiAgaWYgKG9iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBkYXRhKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghb2JqIHx8IGlzSG9zdChkYXRhKSkgcmV0dXJuIHRoaXM7XG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5SZXNwb25zZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBzZXJpYWxpemUoZm4pe1xuICBpZiAocm9vdC5jb25zb2xlKSB7XG4gICAgY29uc29sZS53YXJuKFwiQ2xpZW50LXNpZGUgcGFyc2UoKSBtZXRob2QgaGFzIGJlZW4gcmVuYW1lZCB0byBzZXJpYWxpemUoKS4gVGhpcyBtZXRob2QgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBzdXBlcmFnZW50IHYyLjBcIik7XG4gIH1cbiAgdGhpcy5zZXJpYWxpemUoZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlc3BvbnNlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUoZm4pe1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBgZXJyYCBhbmQgYHJlc2BcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCByZXMpe1xuICB2YXIgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgZm4oZXJyLCByZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignUmVxdWVzdCBoYXMgYmVlbiB0ZXJtaW5hdGVkXFxuUG9zc2libGUgY2F1c2VzOiB0aGUgbmV0d29yayBpcyBvZmZsaW5lLCBPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luLCB0aGUgcGFnZSBpcyBiZWluZyB1bmxvYWRlZCwgZXRjLicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuXG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnIudXJsID0gdGhpcy51cmw7XG5cbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcigndGltZW91dCBvZiAnICsgdGltZW91dCArICdtcyBleGNlZWRlZCcpO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5fd2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxuICogd2l0aCBhbiBpbnN0YW5jZW9mIGBSZXNwb25zZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihmbil7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhociA9IHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKTtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIGlmICg0ICE9IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG5cbiAgICAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG4gICAgdmFyIHN0YXR1cztcbiAgICB0cnkgeyBzdGF0dXMgPSB4aHIuc3RhdHVzIH0gY2F0Y2goZSkgeyBzdGF0dXMgPSAwOyB9XG5cbiAgICBpZiAoMCA9PSBzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0KSByZXR1cm4gc2VsZi50aW1lb3V0RXJyb3IoKTtcbiAgICAgIGlmIChzZWxmLmFib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICB2YXIgaGFuZGxlUHJvZ3Jlc3MgPSBmdW5jdGlvbihlKXtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICB9XG4gICAgZS5kaXJlY3Rpb24gPSAnZG93bmxvYWQnO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgfVxuICB0cnkge1xuICAgIGlmICh4aHIudXBsb2FkICYmIHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgfVxuXG4gIC8vIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICB9IGVsc2Uge1xuICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gIH1cblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCdHRVQnICE9IHRoaXMubWV0aG9kICYmICdIRUFEJyAhPSB0aGlzLm1ldGhvZCAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgZGF0YSAmJiAhaXNIb3N0KGRhdGEpKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICB2YXIgc2VyaWFsaXplID0gdGhpcy5fcGFyc2VyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgLy8gSUUxMSB4aHIuc2VuZCh1bmRlZmluZWQpIHNlbmRzICd1bmRlZmluZWQnIHN0cmluZyBhcyBQT1NUIHBheWxvYWQgKGluc3RlYWQgb2Ygbm90aGluZylcbiAgLy8gV2UgbmVlZCBudWxsIGhlcmUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnID8gZGF0YSA6IG51bGwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RgLlxuICovXG5cbnJlcXVlc3QuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbnJlcXVlc3RbJ2RlbCddID0gZGVsO1xucmVxdWVzdFsnZGVsZXRlJ10gPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG4iLCIvKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBudWxsICE9IG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBNb2R1bGUgb2YgbWl4ZWQtaW4gZnVuY3Rpb25zIHNoYXJlZCBiZXR3ZWVuIG5vZGUgYW5kIGNsaWVudCBjb2RlXG4gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBfY2xlYXJUaW1lb3V0KCl7XG4gIHRoaXMuX3RpbWVvdXQgPSAwO1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRm9yY2UgZ2l2ZW4gcGFyc2VyXG4gKlxuICogU2V0cyB0aGUgYm9keSBwYXJzZXIgbm8gbWF0dGVyIHR5cGUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKGZuKXtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGltZW91dCB0byBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudGltZW91dCA9IGZ1bmN0aW9uIHRpbWVvdXQobXMpe1xuICB0aGlzLl90aW1lb3V0ID0gbXM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGYXV4IHByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdFxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5leHBvcnRzLnRoZW4gPSBmdW5jdGlvbiB0aGVuKGZ1bGZpbGwsIHJlamVjdCkge1xuICByZXR1cm4gdGhpcy5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICBlcnIgPyByZWplY3QoZXJyKSA6IGZ1bGZpbGwocmVzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cbmV4cG9ydHMudXNlID0gZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cblxuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuZXhwb3J0cy5nZXRIZWFkZXIgPSBleHBvcnRzLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICovXG5leHBvcnRzLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAgZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXG4gKiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuIiwiLy8gVGhlIG5vZGUgYW5kIGJyb3dzZXIgbW9kdWxlcyBleHBvc2UgdmVyc2lvbnMgb2YgdGhpcyB3aXRoIHRoZVxuLy8gYXBwcm9wcmlhdGUgY29uc3RydWN0b3IgZnVuY3Rpb24gYm91bmQgYXMgZmlyc3QgYXJndW1lbnRcbi8qKlxuICogSXNzdWUgYSByZXF1ZXN0OlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgIHJlcXVlc3QoJ0dFVCcsICcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnLCBjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gdXJsIG9yIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiByZXF1ZXN0KFJlcXVlc3RDb25zdHJ1Y3RvciwgbWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdENvbnN0cnVjdG9yKCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgyID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3RDb25zdHJ1Y3RvcignR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdENvbnN0cnVjdG9yKG1ldGhvZCwgdXJsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0O1xuIiwidmFyIEFydGljbGVzQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXIvQXJ0aWNsZXNDb250YWluZXIuanN4JylcclxudmFyIENvbmNlcHRzQ29udGFpbmVyID0gcmVxdWlyZSgnLi9jb250YWluZXIvQ29uY2VwdHNDb250YWluZXIuanN4JylcclxudmFyIE5hdmlnYXRpb24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTmF2aWdhdGlvbi5qc3gnKVxyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gIDxkaXY+XHJcbiAgICA8TmF2aWdhdGlvbi8+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciByb3dcIiA+XHJcbiAgICA8QXJ0aWNsZXNDb250YWluZXIvPlxyXG4gICAgPENvbmNlcHRzQ29udGFpbmVyLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gICwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSlcclxuXHJcblxyXG4iLCJ2YXIgUlAgPSByZXF1aXJlKCcuL1JlYWN0UGxvdGx5LmpzeCcpXHJcblxyXG52YXIgQXJ0aWNsZUNvbmNlcHRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb3BzKVxyXG4gICAgaWYgKHRoaXMucHJvcHMuY29uY2VwdHMpIHtcclxuXHJcbiAgICAgIHZhciBwbG90SUQgPSB0aGlzLnByb3BzLnRpdGxlXHJcbiAgICAgIHZhciBwbG90RGF0YSA9IHtcclxuICAgICAgICB4OiBbXSxcclxuICAgICAgICB5OiBbXSxcclxuICAgICAgICB0eXBlOiAnYmFyJyxcclxuICAgICAgICBvcmllbnRhdGlvbjogJ2gnXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBsYXlvdXQgPSB7ICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIFwibGF5b3V0XCIgYXR0cmlidXRlczogI2xheW91dFxyXG4gICAgICAgICAgdGl0bGU6ICdDb25jZXB0cyBCeSBSZWxldmFuY2UnLCAgLy8gbW9yZSBhYm91dCBcImxheW91dC50aXRsZVwiOiAjbGF5b3V0LXRpdGxlXHJcbiAgICAgICAgICBiYXJtb2RlOiAnc3RhY2snLFxyXG4gICAgICAgICAgc2hvd2xlZ2VuZDogZmFsc2UsXHJcbiAgICAgICAgICB4YXhpczoge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnUmVsZXZhbmNlIFNjb3JlJyxcclxuICAgICAgICAgICAgICByYW5nZTogWzUwLCAxMDBdLFxyXG4gICAgICAgICAgICAgIGRvbWFpbjogWzAsIDFdLFxyXG4gICAgICAgICAgICAgIHplcm9saW5lOiBmYWxzZSxcclxuICAgICAgICAgICAgICBzaG93bGluZTogZmFsc2VcclxuICAgICAgICAgICAgICAvLyBzaG93dGlja2xhYmVsczogdHJ1ZSxcclxuICAgICAgICAgICAgICAvLyBzaG93Z3JpZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgaGVpZ2h0OiA2MDAsXHJcbiAgICAgICAgICB3aWR0aDogNTUwLFxyXG4gICAgICAgICAgbWFyZ2luOiB7bDogMjUwfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB2YXIgY29uY2VwdHMgPSB0aGlzLnByb3BzLmNvbmNlcHRzLnNsaWNlKDAsMjUpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKGNvbmNlcHQpe1xyXG4gICAgICAgIHZhciBzY29yZSA9IGNvbmNlcHQuc2NvcmUudG9GaXhlZCgyKSAqIDEwMDtcclxuICAgICAgICAvLyByZXR1cm4gPHA+PHNwYW4gY2xhc3NOYW1lPVwiYmFkZ2VcIj57Y29uY2VwdC5jb25jZXB0LmxhYmVsfSB7c2NvcmV9PC9zcGFuPjwvcD47XHJcbiAgICAgICAgICBwbG90RGF0YS54LnB1c2goc2NvcmUpLFxyXG4gICAgICAgICAgcGxvdERhdGEueS5wdXNoKGNvbmNlcHQuY29uY2VwdC5sYWJlbClcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB2YXIgY29uZmlnID0ge1xyXG4gICAgICAgIHNob3dMaW5rOiBmYWxzZSxcclxuICAgICAgICBkaXNwbGF5TW9kZUJhcjogZmFsc2UsXHJcbiAgICAgICAgZGlzcGxheUxvZ286IGZhbHNlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxvdGx5UGxvdFwiPlxyXG4gICAgICAgICAgPFJQIGhhbmRsZT17cGxvdElEfSBkYXRhPXtbcGxvdERhdGFdfSBsYXlvdXQ9e2xheW91dH0gY29uZmlnPXtjb25maWd9Lz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKVxyXG5cclxuICAgIH0vL2VuZCBpZlxyXG5cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgcmV0dXJuICg8ZGl2PkxvYWRpbmcgQ29uY2VwdCBHcmFwaDwvZGl2PilcclxuICAgIH1cclxuICB9Ly9lbmQgcmVuZGVyXHJcblxyXG59KSAvL2VuZFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnRpY2xlQ29uY2VwdHNcclxuXHJcblxyXG4gIC8vIHJlbmRlcigpIHtcclxuICAvLyAgIGxldCBkYXRhID0gW1xyXG4gIC8vICAgICB7XHJcbiAgLy8gICAgICAgdHlwZTogJ3NjYXR0ZXInLCAgLy8gYWxsIFwic2NhdHRlclwiIGF0dHJpYnV0ZXM6IGh0dHBzOi8vcGxvdC5seS9qYXZhc2NyaXB0L3JlZmVyZW5jZS8jc2NhdHRlclxyXG4gIC8vICAgICAgIHg6IFsxLCAyLCAzXSwgICAgIC8vIG1vcmUgYWJvdXQgXCJ4XCI6ICNzY2F0dGVyLXhcclxuICAvLyAgICAgICB5OiBbNiwgMiwgM10sICAgICAvLyAjc2NhdHRlci15XHJcbiAgLy8gICAgICAgbWFya2VyOiB7ICAgICAgICAgLy8gbWFya2VyIGlzIGFuIG9iamVjdCwgdmFsaWQgbWFya2VyIGtleXM6ICNzY2F0dGVyLW1hcmtlclxyXG4gIC8vICAgICAgICAgY29sb3I6ICdyZ2IoMTYsIDMyLCA3NyknIC8vIG1vcmUgYWJvdXQgXCJtYXJrZXIuY29sb3JcIjogI3NjYXR0ZXItbWFya2VyLWNvbG9yXHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICB7XHJcbiAgLy8gICAgICAgdHlwZTogJ2JhcicsICAgICAgLy8gYWxsIFwiYmFyXCIgY2hhcnQgYXR0cmlidXRlczogI2JhclxyXG4gIC8vICAgICAgIHg6IFsxLCAyLCAzXSwgICAgIC8vIG1vcmUgYWJvdXQgXCJ4XCI6ICNiYXIteFxyXG4gIC8vICAgICAgIHk6IFs2LCAyLCAzXSwgICAgIC8vICNiYXIteVxyXG4gIC8vICAgICAgIG5hbWU6ICdiYXIgY2hhcnQgZXhhbXBsZScgLy8gI2Jhci1uYW1lXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIF07XHJcbiAgLy8gICBsZXQgbGF5b3V0ID0geyAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBcImxheW91dFwiIGF0dHJpYnV0ZXM6ICNsYXlvdXRcclxuICAvLyAgICAgdGl0bGU6ICdzaW1wbGUgZXhhbXBsZScsICAvLyBtb3JlIGFib3V0IFwibGF5b3V0LnRpdGxlXCI6ICNsYXlvdXQtdGl0bGVcclxuICAvLyAgICAgeGF4aXM6IHsgICAgICAgICAgICAgICAgICAvLyBhbGwgXCJsYXlvdXQueGF4aXNcIiBhdHRyaWJ1dGVzOiAjbGF5b3V0LXhheGlzXHJcbiAgLy8gICAgICAgdGl0bGU6ICd0aW1lJyAgICAgICAgIC8vIG1vcmUgYWJvdXQgXCJsYXlvdXQueGF4aXMudGl0bGVcIjogI2xheW91dC14YXhpcy10aXRsZVxyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBhbm5vdGF0aW9uczogWyAgICAgICAgICAgIC8vIGFsbCBcImFubm90YXRpb25cIiBhdHRyaWJ1dGVzOiAjbGF5b3V0LWFubm90YXRpb25zXHJcbiAgLy8gICAgICAge1xyXG4gIC8vICAgICAgICAgdGV4dDogJ3NpbXBsZSBhbm5vdGF0aW9uJywgICAgLy8gI2xheW91dC1hbm5vdGF0aW9ucy10ZXh0XHJcbiAgLy8gICAgICAgICB4OiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAjbGF5b3V0LWFubm90YXRpb25zLXhcclxuICAvLyAgICAgICAgIHhyZWY6ICdwYXBlcicsICAgICAgICAgICAgICAgIC8vICNsYXlvdXQtYW5ub3RhdGlvbnMteHJlZlxyXG4gIC8vICAgICAgICAgeTogMCwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gI2xheW91dC1hbm5vdGF0aW9ucy15XHJcbiAgLy8gICAgICAgICB5cmVmOiAncGFwZXInICAgICAgICAgICAgICAgICAvLyAjbGF5b3V0LWFubm90YXRpb25zLXlyZWZcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIF1cclxuICAvLyAgIH07XHJcbiAgLy8gICBsZXQgY29uZmlnID0ge1xyXG4gIC8vICAgICBzaG93TGluazogZmFsc2UsXHJcbiAgLy8gICAgIGRpc3BsYXlNb2RlQmFyOiB0cnVlXHJcbiAgLy8gICB9O1xyXG4gIC8vICAgcmV0dXJuIChcclxuICAvLyAgICAgPFBsb3RseSBjbGFzc05hbWU9XCJ3aGF0ZXZlclwiIGRhdGE9e2RhdGF9IGxheW91dD17bGF5b3V0fSBjb25maWc9e2NvbmZpZ30vPlxyXG4gIC8vICAgKTtcclxuICAvLyB9XHJcblxyXG4iLCJ2YXIgQXJ0aWNsZUNvbmNlcHRzID0gcmVxdWlyZSgnLi9BcnRpY2xlQ29uY2VwdHMuanN4JylcclxuXHJcbnZhciBMaXN0QXJ0aWNsZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLm1vZGFsLXRyaWdnZXInKS5sZWFuTW9kYWwoKTtcclxuICB9LFxyXG5cclxuXHJcbiAgb3BlbkdyYXBoOiBmdW5jdGlvbihtb2RhbElEKSB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbiBncmFwaCcpXHJcbiAgICAkKFwiI1wiICsgbW9kYWxJRCkub3Blbk1vZGFsKClcclxuICB9LFxyXG5cclxuICBjbG9zZUdyYXBoOiBmdW5jdGlvbihtb2RhbElEKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2xvc2UgZ3JhcGgnKVxyXG4gICAgJChcIiNcIiArIG1vZGFsSUQpLmNsb3NlTW9kYWwoKVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5hcnRpY2xlcyA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZSBwb3BvdXRcIiBkYXRhLWNvbGxhcHNpYmxlPVwiYWNjb3JkaW9uXCI+XHJcbiAgICAgICAgICAgICAgR2V0dGluZyBEYXRhXHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB2YXIgYXJ0aWNsZXMgPSB0aGlzLnByb3BzLmFydGljbGVzLm1hcChmdW5jdGlvbihhcnRpY2xlKXtcclxuICAgICAgICByZXR1cm4gIDxsaT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZS1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+e2FydGljbGUudGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2libGUtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPiA8YSBocmVmPXthcnRpY2xlLnVybH0gdGFyZ2V0PVwiYmxhbmtcIj4gUmVhZCBpdCBvbiB7YXJ0aWNsZS53ZWJzaXRlfSA8L2E+IG9yXHJcbiAgICAgICAgICAgICAgICAgICAgIHZpZXcgYSA8YSBjbGFzc05hbWU9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgLm1vZGFsLXRyaWdnZXJcIiBocmVmPXtcIiNcIiArIGFydGljbGUuX2lkfSBvbkNsaWNrPXtmdW5jdGlvbigpe3RoaXMub3BlbkdyYXBoKGFydGljbGUuX2lkKX0uYmluZCh0aGlzKX0+IENvbmNlcHQgR3JhcGg8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9e2FydGljbGUuX2lkfSBjbGFzc05hbWU9XCJtb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57YXJ0aWNsZS50aXRsZX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QXJ0aWNsZUNvbmNlcHRzIHRpdGxlPXthcnRpY2xlLnRpdGxlfSBjb25jZXB0cz17YXJ0aWNsZS5jb25jZXB0c30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiMhXCIgY2xhc3NOYW1lPVwibW9kYWwtYWN0aW9uIG1vZGFsLWNsb3NlIHdhdmVzLWVmZmVjdCB3YXZlcy1ncmVlbiBidG4tZmxhdFwiIG9uQ2xpY2s9e2Z1bmN0aW9uKCkge3RoaXMuY2xvc2VHcmFwaChhcnRpY2xlLl9pZCl9LmJpbmQodGhpcyl9PkNsb3NlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2xpPjtcclxuICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29sbGFwc2libGUgcG9wb3V0XCIgZGF0YS1jb2xsYXBzaWJsZT1cImFjY29yZGlvblwiPlxyXG4gICAgICAgICAgICAgIHthcnRpY2xlc31cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGlzdEFydGljbGVzIiwidmFyIEFydGljbGVDb25jZXB0cyA9IHJlcXVpcmUoJy4vQXJ0aWNsZUNvbmNlcHRzLmpzeCcpXHJcbnZhciBnZXRCeUlkID0gXCJodHRwOi8vemVpdGdvbWV0ZXJhcGkuaGVyb2t1LmNvbS9hcnRpY2xlL1wiXHJcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpXHJcblxyXG52YXIgTGlzdENvbmNlcHRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHttb2RhbERhdGE6IG51bGx9O1xyXG4gIH0sXHJcblxyXG4gIG9wZW5HcmFwaDogZnVuY3Rpb24obW9kYWxJRCkge1xyXG4gICAgY29uc29sZS5sb2coJ29wZW4gZ3JhcGgnKVxyXG4gICAgdGhpcy5nZXRBcnRpY2xlQnlJZChtb2RhbElEKVxyXG4gICAgJChcIiNcIiArIG1vZGFsSUQpLm9wZW5Nb2RhbCgpXHJcbiAgfSxcclxuXHJcbiAgY2xvc2VHcmFwaDogZnVuY3Rpb24obW9kYWxJRCkge1xyXG4gICAgY29uc29sZS5sb2coJ2Nsb3NlIGdyYXBoJylcclxuICAgICQoXCIjXCIgKyBtb2RhbElEKS5jbG9zZU1vZGFsKClcclxuICB9LFxyXG5cclxuXHJcbiAgZ2V0QXJ0aWNsZUJ5SWQ6IGZ1bmN0aW9uKGFydGljbGVJZCkge1xyXG5cclxuICAgICByZXF1ZXN0XHJcbiAgICAgIC5wb3N0KCcvYXBpJylcclxuICAgICAgLnNlbmQoeyBcImFwaUVuZHBvaW50XCI6IChnZXRCeUlkICsgYXJ0aWNsZUlkKX0pXHJcbiAgICAgIC5zZXQoJ0FjY2VwdCcsIFwiKi8qXCIpXHJcbiAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBtb2RhbERhdGE6IGRhdGEuZGF0YVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5jb25jZXB0cyA9PT0gbnVsbCkge1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29sbGFwc2libGUgcG9wb3V0XCIgZGF0YS1jb2xsYXBzaWJsZT1cImFjY29yZGlvblwiPlxyXG4gICAgICAgICAgICBHZXR0aW5nIERhdGFcclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSAvL2VuZCByZXR1cm5cclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdmFyIGNvbmNlcHRLZXlzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5jb25jZXB0cyk7XHJcblxyXG4gICAgICAvL3NvcnkgYnkgbnVtYmVyIG9mIGFydGljbGVzXHJcbiAgICAgIGNvbmNlcHRLZXlzLnNvcnQoZnVuY3Rpb24oYSxiKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29uY2VwdHNbYV0uc2l6ZSA+IHRoaXMucHJvcHMuY29uY2VwdHNbYl0uc2l6ZSkge1xyXG4gICAgICAgICAgcmV0dXJuIC0xXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmNvbmNlcHRzW2FdLnNpemUgPCB0aGlzLnByb3BzLmNvbmNlcHRzW2JdLnNpemUpIHtcclxuICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpKVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIHZhciBjb25jZXB0cyA9IGNvbmNlcHRLZXlzLm1hcChmdW5jdGlvbihjb25jZXB0KXtcclxuXHJcbiAgICAgICAgdmFyIGNvbmNlcHRJZCA9IHRoaXMucHJvcHMuY29uY2VwdHNbY29uY2VwdF0uX2lkXHJcbiAgICAgICAgdmFyIGFydGljbGVzID0gdGhpcy5wcm9wcy5jb25jZXB0c1tjb25jZXB0XS5hcnRpY2xlc1xyXG4gICAgICAgIHZhciBudW1BcnRpY2xlcyA9IDA7XHJcbiAgICAgICAgaWYgKGFydGljbGVzKSB7XHJcbiAgICAgICAgICBudW1BcnRpY2xlcyA9IGFydGljbGVzLmxlbmd0aFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWFwcGVkQXJ0aWNsZXMgPSBhcnRpY2xlcy5tYXAoZnVuY3Rpb24oYXJ0aWNsZSkge1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLm1vZGFsRGF0YSAmJiB0aGlzLnN0YXRlLm1vZGFsRGF0YS5faWQgID09PSBhcnRpY2xlLl9pZCkge1xyXG4gICAgICAgICAgICBncmFwaERhdGEgPSB0aGlzLnN0YXRlLm1vZGFsRGF0YS5jb25jZXB0c1xyXG5cclxuICAgICAgICAgIHJldHVybiAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aDY+IHthcnRpY2xlLnRpdGxlfTo8L2g2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxhIGhyZWY9e2FydGljbGUudXJsfSB0YXJnZXQ9XCJibGFua1wiPiBSZWFkIGl0IG9uIHthcnRpY2xlLndlYnNpdGV9IDwvYT4gb3JcclxuICAgICAgICAgICAgICAgICAgICAgdmlldyBhIDxhIGNsYXNzTmFtZT1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCAubW9kYWwtdHJpZ2dlclwiIGhyZWY9e1wiI1wiICsgYXJ0aWNsZS5faWR9IG9uQ2xpY2s9e2Z1bmN0aW9uKCl7dGhpcy5vcGVuR3JhcGgoYXJ0aWNsZS5faWQpfS5iaW5kKHRoaXMpfT4gQ29uY2VwdCBHcmFwaDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD17YXJ0aWNsZS5faWR9IGNsYXNzTmFtZT1cIm1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PnthcnRpY2xlLnRpdGxlfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxBcnRpY2xlQ29uY2VwdHMgdGl0bGU9e2FydGljbGUudGl0bGV9IGFydGljbGVJZD17YXJ0aWNsZS5faWR9IGNvbmNlcHRzPXtncmFwaERhdGF9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjIVwiIGNsYXNzTmFtZT1cIm1vZGFsLWFjdGlvbiBtb2RhbC1jbG9zZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtZ3JlZW4gYnRuLWZsYXRcIiBvbkNsaWNrPXtmdW5jdGlvbigpIHt0aGlzLmNsb3NlR3JhcGgoYXJ0aWNsZS5faWQpfS5iaW5kKHRoaXMpfT5DbG9zZTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PjtcclxuXHJcblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JhcGhEYXRhID0gbnVsbFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg2PiB7YXJ0aWNsZS50aXRsZX06PC9oNj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48YSBocmVmPXthcnRpY2xlLnVybH0gdGFyZ2V0PVwiYmxhbmtcIj4gUmVhZCBpdCBvbiB7YXJ0aWNsZS53ZWJzaXRlfSA8L2E+IG9yXHJcbiAgICAgICAgICAgICAgICAgICAgIHZpZXcgYSA8YSBjbGFzc05hbWU9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgLm1vZGFsLXRyaWdnZXJcIiBocmVmPXtcIiNcIiArIGFydGljbGUuX2lkfSBvbkNsaWNrPXtmdW5jdGlvbigpe3RoaXMub3BlbkdyYXBoKGFydGljbGUuX2lkKX0uYmluZCh0aGlzKX0+IENvbmNlcHQgR3JhcGg8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9e2FydGljbGUuX2lkfSBjbGFzc05hbWU9XCJtb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57YXJ0aWNsZS50aXRsZX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5Mb2FkaW5nIEdyYXBoIERhdGE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiIyFcIiBjbGFzc05hbWU9XCJtb2RhbC1hY3Rpb24gbW9kYWwtY2xvc2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWdyZWVuIGJ0bi1mbGF0XCIgb25DbGljaz17ZnVuY3Rpb24oKSB7dGhpcy5jbG9zZUdyYXBoKGFydGljbGUuX2lkKX0uYmluZCh0aGlzKX0+Q2xvc2U8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj47XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKSAvL2VuZCBtYXBcclxuXHJcbiAgICAgICAgcmV0dXJuICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2libGUtaGVhZGVyXCI+PGg0PkNvbmNlcHQ6IHtjb25jZXB0fTwvaDQ+ICA8cD5NZW50aW9uczoge251bUFydGljbGVzfTwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZS1ib2R5XCI+e21hcHBlZEFydGljbGVzfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9saT47XHJcblxyXG4gICAgICB9LmJpbmQodGhpcykpOyAvL2VuZCBtYXAgY29uY2VwdHNcclxuXHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2xsYXBzaWJsZSBwb3BvdXRcIiBkYXRhLWNvbGxhcHNpYmxlPVwiYWNjb3JkaW9uXCI+XHJcbiAgICAgICAgICAgICAge2NvbmNlcHRzfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIC8vZW5kIHJldHVyblxyXG4gICAgfSAvL2VuZCByZW5kZXJcclxuICB9XHJcbn0pIC8vZW5kIGNsYXNzIGRlY2xhcmF0aW9uXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RDb25jZXB0cyIsInZhciBOYXZpZ2F0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItZml4ZWRcIj5cclxuICAgICAgICA8bmF2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImJyYW5kLWxvZ29cIj5aZWl0Z29tZXRlcjwvYT5cclxuICAgICAgICAgICAgPHVsIGlkPVwibmF2LW1vYmlsZVwiIGNsYXNzTmFtZT1cInJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjYXJ0aWNsZXNUb3BcIj5BcnRpY2xlczwvYT48L2xpPlxyXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI2NvbmNlcHRzVG9wXCI+Q29uY2VwdHM8L2E+PC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb25cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJ2YXIgUlAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1Bsb3QnLFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICBoYW5kbGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgIGxheW91dDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgY29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICB0aGlzLnBsb3QodGhpcy5wcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgdGhpcy5wbG90KG5leHRQcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgcGxvdDogZnVuY3Rpb24gcGxvdChwcm9wcykge1xyXG4gICAgICB2YXIgaGFuZGxlID0gcHJvcHMuaGFuZGxlLFxyXG4gICAgICAgICAgZGF0YSA9IHByb3BzLmRhdGEsXHJcbiAgICAgICAgICBsYXlvdXQgPSBwcm9wcy5sYXlvdXQsXHJcbiAgICAgICAgICBjb25maWcgPSBwcm9wcy5jb25maWc7XHJcbiAgICAgIFBsb3RseS5wbG90KGhhbmRsZSwgZGF0YSwgbGF5b3V0LCBjb25maWcpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAnZGl2JyxcclxuICAgICAgICB7IGlkOiB0aGlzLnByb3BzLmhhbmRsZSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJQIiwidmFyIFNlYXJjaEJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHsgc2VhcmNoU3RyaW5nOiAnJyB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2hTdHJpbmc6ZS50YXJnZXQudmFsdWV9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKGNvbmNlcHQpe1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2hTdHJpbmc6ICcnfSk7XHJcbiAgICAgICAgbG9va3VwID0gdGhpcy5wcm9wcy5jb25jZXB0TG9va3VwLFxyXG4gICAgICAgIGxvb2t1cChjb25jZXB0Ll9pZClcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbGlicmFyaWVzID0gdGhpcy5wcm9wcy5pdGVtcyxcclxuICAgICAgICAgICAgaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLFxyXG4gICAgICAgICAgICBzZWFyY2hTdHJpbmcgPSB0aGlzLnN0YXRlLnNlYXJjaFN0cmluZy50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcblxyXG4gICAgICAgIGlmKGxpYnJhcmllcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxpYnJhcmllcyA9IFs8bGk+PC9saT5dXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZWFyY2hTdHJpbmcubGVuZ3RoID4gMCl7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBhcmUgc2VhcmNoaW5nLiBGaWx0ZXIgdGhlIHJlc3VsdHMuXHJcblxyXG4gICAgICAgICAgICBsaWJyYXJpZXMgPSBsaWJyYXJpZXMuZmlsdGVyKGZ1bmN0aW9uKGwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGwubGFiZWwudG9Mb3dlckNhc2UoKS5tYXRjaCggc2VhcmNoU3RyaW5nICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGlicmFyaWVzID0gbGlicmFyaWVzLm1hcChmdW5jdGlvbihsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8bGkgb25DbGljaz17ZnVuY3Rpb24oKXtoYW5kbGVDbGljayhsKX19PjxwPiB7bC5sYWJlbH0gPC9wPjwvbGk+XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjb25jZXB0U2VhcmNoYmFyXCIgY2xhc3NOYW1lPVwibGltZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoU3RyaW5nfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHBsYWNlaG9sZGVyPVwiU2VhcmNoIENvbmNlcHRzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsaWJyYXJpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHJldHVybiAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFN0cmluZ30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSBwbGFjZWhvbGRlcj1cIlNlYXJjaCBDb25jZXB0c1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj47XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaEJhciIsInZhciBMaXN0QXJ0aWNsZXMgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0xpc3RBcnRpY2xlcy5qc3gnKVxyXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKVxyXG5cclxudmFyIHJlY2VudCA9IFwiaHR0cDovL3plaXRnb21ldGVyYXBpLmhlcm9rdS5jb20vYXJ0aWNsZS9yZWNlbnRcIlxyXG52YXIgZ2V0QnlJZCA9IFwiaHR0cDovL3plaXRnb21ldGVyYXBpLmhlcm9rdS5jb20vYXJ0aWNsZS9cIlxyXG5cclxudmFyIEFydGljbGVzQ29udGFpbmVyICA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFydGljbGVzOiBudWxsXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdldEFydGljbGVzKHJlY2VudClcclxuXHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QXJ0aWNsZXM6IGZ1bmN0aW9uKGFwaUVuZHBvaW50KSB7XHJcbiAgICAgcmVxdWVzdFxyXG4gICAgICAucG9zdCgnL2FwaScpXHJcbiAgICAgIC5zZW5kKHsgXCJhcGlFbmRwb2ludFwiOiBhcGlFbmRwb2ludH0pXHJcbiAgICAgIC5zZXQoJ0FjY2VwdCcsIFwiKi8qXCIpXHJcbiAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBhcnRpY2xlczogZGF0YS5kYXRhXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LmJpbmQodGhpcykpXHJcbiAgfSxcclxuXHJcbiAgZ2V0QXJ0aWNsZUJ5SWQ6IGZ1bmN0aW9uKGFydGljbGVJZCkge1xyXG5cclxuICAgIHRoaXMuZ2V0QXJ0aWNsZXMoZ2V0QnlJZCArIGFydGljbGVJZClcclxuXHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGFydGljbGVzOiBudWxsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmdldEFydGljbGVzKHJlY2VudClcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIG01IHotZGVwdGgtMlwiIGlkPVwiYXJ0aWNsZXNUb3BcIiA+XHJcbiAgICAgICAgPGgyID4gQXJ0aWNsZXMgPC9oMj5cclxuICAgICAgICA8cCA+IDxzcGFuIGNsYXNzTmFtZT1cImNsaWNrYWJsZUxpbmtcIiBvbkNsaWNrPXtmdW5jdGlvbigpe3RoaXMuaGFuZGxlQ2xpY2soJ3RyZW5kaW5nJyl9LmJpbmQodGhpcyl9PiBWaWV3IHJlY2VudCBhcnRpY2xlcyA8L3NwYW4+IDwvcD5cclxuICAgICAgICA8TGlzdEFydGljbGVzIGFydGljbGVzPXt0aGlzLnN0YXRlLmFydGljbGVzfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydGljbGVzQ29udGFpbmVyIiwidmFyIExpc3RDb25jZXB0cyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvTGlzdENvbmNlcHRzLmpzeCcpXHJcbnZhciBTZWFyY2hCYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL1NlYXJjaEJhci5qc3gnKVxyXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKVxyXG5cclxudmFyIHRyZW5kaW5nID0gXCJodHRwOi8vemVpdGdvbWV0ZXJhcGkuaGVyb2t1LmNvbS9jb25jZXB0L3RyZW5kaW5nXCJcclxudmFyIHBvcHVsYXIgPSBcImh0dHA6Ly96ZWl0Z29tZXRlcmFwaS5oZXJva3UuY29tL3BvcHVsYXJcIlxyXG52YXIgbGlzdEFsbCA9IFwiaHR0cDovL3plaXRnb21ldGVyYXBpLmhlcm9rdS5jb20vY29uY2VwdC9saXN0QWxsXCJcclxuXHJcbnZhciBDb25jZXB0c0NvbnRhaW5lciAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjb25jZXB0czogbnVsbCxcclxuICAgICAgY29uY2VwdHNMaXN0OiBudWxsXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICB0aGlzLmdldERhdGEoKTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QuYWJvcnQoKTtcclxuICB9LFxyXG5cclxuICBnZXREYXRhOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnRyZW5kaW5nTG9va3VwKClcclxuXHJcbiAgICByZXF1ZXN0XHJcbiAgICAgIC5wb3N0KCcvYXBpJylcclxuICAgICAgLnNlbmQoeyBcImFwaUVuZHBvaW50XCI6IGxpc3RBbGx9KVxyXG4gICAgICAuc2V0KCdBY2NlcHQnLCBcIiovKlwiKVxyXG4gICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xyXG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmVycm9yKGVycilcclxuXHJcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy50ZXh0KVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIGNvbmNlcHRzTGlzdDogZGF0YS5kYXRhXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LmJpbmQodGhpcykpXHJcbiAgfSxcclxuXHJcbiAgY29uY2VwdExvb2t1cDogZnVuY3Rpb24oY29uY2VwdElkKSB7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNvbmNlcHRzOiBudWxsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnY29uY2VwdCBsb29rdXAgY2FsbGVkIHdpdGgnLCBjb25jZXB0SWQpXHJcbiAgICB2YXIgYXBpVXJsID0gXCJodHRwOi8vemVpdGdvbWV0ZXJhcGkuaGVyb2t1LmNvbS9jb25jZXB0L1wiICsgY29uY2VwdElkXHJcblxyXG4gICAgIHJlcXVlc3RcclxuICAgICAgLnBvc3QoJy9hcGknKVxyXG4gICAgICAuc2VuZCh7IFwiYXBpRW5kcG9pbnRcIjogYXBpVXJsfSlcclxuICAgICAgLnNldCgnQWNjZXB0JywgXCIqLypcIilcclxuICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpXHJcblxyXG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXMudGV4dClcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIGNvbmNlcHRzOiBkYXRhLmRhdGFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0uYmluZCh0aGlzKSlcclxuXHJcbiAgfSxcclxuXHJcbiAgdHJlbmRpbmdMb29rdXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICByZXF1ZXN0XHJcbiAgICAgIC5wb3N0KCcvYXBpJylcclxuICAgICAgLnNlbmQoeyBcImFwaUVuZHBvaW50XCI6IHRyZW5kaW5nfSlcclxuICAgICAgLnNldCgnQWNjZXB0JywgXCIqLypcIilcclxuICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpXHJcblxyXG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXMudGV4dClcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIGNvbmNlcHRzOiBkYXRhLmRhdGEuY29uY2VwdHNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0uYmluZCh0aGlzKSlcclxuXHJcbiAgfSxcclxuXHJcbiAgcG9wdWxhckxvb2t1cDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgIHJlcXVlc3RcclxuICAgICAgLnBvc3QoJy9hcGknKVxyXG4gICAgICAuc2VuZCh7IFwiYXBpRW5kcG9pbnRcIjogcG9wdWxhcn0pXHJcbiAgICAgIC5zZXQoJ0FjY2VwdCcsIFwiKi8qXCIpXHJcbiAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBjb25jZXB0czogZGF0YS5kYXRhXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9LmJpbmQodGhpcykpXHJcblxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihsb29rdXBQYXJhbSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNvbmNlcHRzOiBudWxsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobG9va3VwUGFyYW0gPT0gJ3RyZW5kaW5nJykge1xyXG4gICAgICB0aGlzLnRyZW5kaW5nTG9va3VwKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucG9wdWxhckxvb2t1cCgpXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHMxMiBtNSB6LWRlcHRoLTJcIiBpZD1cImNvbmNlcHRzVG9wXCIgPlxyXG4gICAgICAgIDxoMiA+IENvbmNlcHRzIDwvaDI+XHJcbiAgICAgICAgPHAgPiA8c3BhbiBjbGFzc05hbWU9XCJjbGlja2FibGVMaW5rXCIgb25DbGljaz17ZnVuY3Rpb24oKXt0aGlzLmhhbmRsZUNsaWNrKCd0cmVuZGluZycpfS5iaW5kKHRoaXMpfT4gVmlldyB0cmVuZGluZyBjb25jZXB0cyA8L3NwYW4+IG9yIDxzcGFuIGNsYXNzTmFtZT1cImNsaWNrYWJsZUxpbmtcIiBvbkNsaWNrPXtmdW5jdGlvbigpe3RoaXMuaGFuZGxlQ2xpY2soJ3BvcHVsYXInKX0uYmluZCh0aGlzKX0+IHZpZXcgcG9wdWxhciBjb25jZXB0cyA8L3NwYW4+IDwvcD5cclxuICAgICAgICA8U2VhcmNoQmFyIGl0ZW1zPXt0aGlzLnN0YXRlLmNvbmNlcHRzTGlzdH0gY29uY2VwdExvb2t1cD17dGhpcy5jb25jZXB0TG9va3VwfS8+XHJcblxyXG4gICAgICAgIDxMaXN0Q29uY2VwdHMgY29uY2VwdHM9e3RoaXMuc3RhdGUuY29uY2VwdHN9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29uY2VwdHNDb250YWluZXIiXX0=
