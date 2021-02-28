'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var eventEmitter = createCommonjsModule(function (module) {

  (function (exports) {
    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */

    function EventEmitter() {} // Shortcuts to improve speed and size


    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;
    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */

    function indexOfListener(listeners, listener) {
      var i = listeners.length;

      while (i--) {
        if (listeners[i].listener === listener) {
          return i;
        }
      }

      return -1;
    }
    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */


    function alias(name) {
      return function aliasClosure() {
        return this[name].apply(this, arguments);
      };
    }
    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */


    proto.getListeners = function getListeners(evt) {
      var events = this._getEvents();

      var response;
      var key; // Return a concatenated array of all matching events if
      // the selector is a regular expression.

      if (evt instanceof RegExp) {
        response = {};

        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            response[key] = events[key];
          }
        }
      } else {
        response = events[evt] || (events[evt] = []);
      }

      return response;
    };
    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */


    proto.flattenListeners = function flattenListeners(listeners) {
      var flatListeners = [];
      var i;

      for (i = 0; i < listeners.length; i += 1) {
        flatListeners.push(listeners[i].listener);
      }

      return flatListeners;
    };
    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */


    proto.getListenersAsObject = function getListenersAsObject(evt) {
      var listeners = this.getListeners(evt);
      var response;

      if (listeners instanceof Array) {
        response = {};
        response[evt] = listeners;
      }

      return response || listeners;
    };

    function isValidListener(listener) {
      if (typeof listener === 'function' || listener instanceof RegExp) {
        return true;
      } else if (listener && _typeof(listener) === 'object') {
        return isValidListener(listener.listener);
      } else {
        return false;
      }
    }
    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.addListener = function addListener(evt, listener) {
      if (!isValidListener(listener)) {
        throw new TypeError('listener must be a function');
      }

      var listeners = this.getListenersAsObject(evt);
      var listenerIsWrapped = _typeof(listener) === 'object';
      var key;

      for (key in listeners) {
        if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
          listeners[key].push(listenerIsWrapped ? listener : {
            listener: listener,
            once: false
          });
        }
      }

      return this;
    };
    /**
     * Alias of addListener
     */


    proto.on = alias('addListener');
    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */

    proto.addOnceListener = function addOnceListener(evt, listener) {
      return this.addListener(evt, {
        listener: listener,
        once: true
      });
    };
    /**
     * Alias of addOnceListener.
     */


    proto.once = alias('addOnceListener');
    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */

    proto.defineEvent = function defineEvent(evt) {
      this.getListeners(evt);
      return this;
    };
    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.defineEvents = function defineEvents(evts) {
      for (var i = 0; i < evts.length; i += 1) {
        this.defineEvent(evts[i]);
      }

      return this;
    };
    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.removeListener = function removeListener(evt, listener) {
      var listeners = this.getListenersAsObject(evt);
      var index;
      var key;

      for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
          index = indexOfListener(listeners[key], listener);

          if (index !== -1) {
            listeners[key].splice(index, 1);
          }
        }
      }

      return this;
    };
    /**
     * Alias of removeListener
     */


    proto.off = alias('removeListener');
    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */

    proto.addListeners = function addListeners(evt, listeners) {
      // Pass through to manipulateListeners
      return this.manipulateListeners(false, evt, listeners);
    };
    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.removeListeners = function removeListeners(evt, listeners) {
      // Pass through to manipulateListeners
      return this.manipulateListeners(true, evt, listeners);
    };
    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
      var i;
      var value;
      var single = remove ? this.removeListener : this.addListener;
      var multiple = remove ? this.removeListeners : this.addListeners; // If evt is an object then pass each of its properties to this method

      if (_typeof(evt) === 'object' && !(evt instanceof RegExp)) {
        for (i in evt) {
          if (evt.hasOwnProperty(i) && (value = evt[i])) {
            // Pass the single listener straight through to the singular method
            if (typeof value === 'function') {
              single.call(this, i, value);
            } else {
              // Otherwise pass back to the multiple function
              multiple.call(this, i, value);
            }
          }
        }
      } else {
        // So evt must be a string
        // And listeners must be an array of listeners
        // Loop over it and pass each one to the multiple method
        i = listeners.length;

        while (i--) {
          single.call(this, evt, listeners[i]);
        }
      }

      return this;
    };
    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.removeEvent = function removeEvent(evt) {
      var type = _typeof(evt);

      var events = this._getEvents();

      var key; // Remove different things depending on the state of evt

      if (type === 'string') {
        // Remove all listeners for the specified event
        delete events[evt];
      } else if (evt instanceof RegExp) {
        // Remove all events matching the regex.
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            delete events[key];
          }
        }
      } else {
        // Remove all listeners in all events
        delete this._events;
      }

      return this;
    };
    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */


    proto.removeAllListeners = alias('removeEvent');
    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */

    proto.emitEvent = function emitEvent(evt, args) {
      var listenersMap = this.getListenersAsObject(evt);
      var listeners;
      var listener;
      var i;
      var key;
      var response;

      for (key in listenersMap) {
        if (listenersMap.hasOwnProperty(key)) {
          listeners = listenersMap[key].slice(0);

          for (i = 0; i < listeners.length; i++) {
            // If the listener returns true then it shall be removed from the event
            // The function is executed either with a basic call or an apply if there is an args array
            listener = listeners[i];

            if (listener.once === true) {
              this.removeListener(evt, listener.listener);
            }

            response = listener.listener.apply(this, args || []);

            if (response === this._getOnceReturnValue()) {
              this.removeListener(evt, listener.listener);
            }
          }
        }
      }

      return this;
    };
    /**
     * Alias of emitEvent
     */


    proto.trigger = alias('emitEvent');
    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */

    proto.emit = function emit(evt) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(evt, args);
    };
    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */


    proto.setOnceReturnValue = function setOnceReturnValue(value) {
      this._onceReturnValue = value;
      return this;
    };
    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */


    proto._getOnceReturnValue = function _getOnceReturnValue() {
      if (this.hasOwnProperty('_onceReturnValue')) {
        return this._onceReturnValue;
      } else {
        return true;
      }
    };
    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */


    proto._getEvents = function _getEvents() {
      return this._events || (this._events = {});
    };
    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */


    EventEmitter.noConflict = function noConflict() {
      exports.EventEmitter = originalGlobalValue;
      return EventEmitter;
    }; // Expose the class either via AMD, CommonJS or the global object


    if (module.exports) {
      module.exports = EventEmitter;
    } else {
      exports.EventEmitter = EventEmitter;
    }
  })(typeof window !== 'undefined' ? window : commonjsGlobal || {});
});

/* eslint-disable */

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
* Bitwise rotate a 32-bit number to the left.
*/


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
* These functions implement the four basic operations the algorithm uses.
*/


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/


function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
* Convert an array of little-endian words to a string
*/


function binl2rstr(input) {
  var i;
  var output = '';
  var length32 = input.length * 32;

  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
  }

  return output;
}
/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/


function rstr2binl(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;

  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }

  var length8 = input.length * 8;

  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
  }

  return output;
}
/*
* Calculate the MD5 of a raw string
*/


function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}
/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/


function rstrHMACMD5(key, data) {
  var i;
  var bkey = rstr2binl(key);
  var ipad = [];
  var opad = [];
  var hash;
  ipad[15] = opad[15] = undefined;

  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }

  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }

  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
/*
* Convert a raw string to a hex string
*/


function rstr2hex(input) {
  var hexTab = '0123456789abcdef';
  var output = '';
  var x;
  var i;

  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
  }

  return output;
}
/*
* Encode a string as utf-8
*/


function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input));
}
/*
* Take string arguments and return either raw or hex encoded strings
*/


function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s));
}

function hexMD5(s) {
  return rstr2hex(rawMD5(s));
}

function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}

function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d));
}

var md5 = function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }

    return rawMD5(string);
  }

  if (!raw) {
    return hexHMACMD5(key, string);
  }

  return rawHMACMD5(key, string);
};

var getByChain = function getByChain(data, keyString) {
  if (keyString === undefined) return undefined;
  var keys = typeof keyString === 'string' ? keyString.split('.') : keyString;
  if (!keys.length) return undefined;
  if (data[keys[0]] === undefined || data[keys[0]] === null) return data[keys[0]];
  var result = data;
  keys.forEach(function (key) {
    if (result === undefined) return;
    result = result[key];
  });
  return result;
};
var traversal = function traversal(node, callback) {
  callback(node);
  node.children && node.children.forEach(function (child) {
    traversal(child, callback);
  });
};

var template = function template(tpl, data) {
  if (!tpl.includes('${')) return tpl;
  var tplString = tpl;
  var keys = [];
  var arr = tplString.match(/\$\{(.*?)\}/g);

  for (var key in arr) {
    var s = arr[key].replace('${', '').replace('}', '');
    keys.push(s);
  }

  keys.forEach(function (key) {
    tplString = tplString.replace('${' + key + '}', getByChain(data, key));
  });
  return tplString;
};
var render = function render(key, data) {
  if (!key) return '';
  if (typeof key === 'function') return key(data);
  return template(key, data);
};
var parseValueWithData = function parseValueWithData(key, data) {
  return getByChain(data, render(key, data));
};
var parseValue = function parseValue(value, data, defaultValue) {
  if (value === undefined) return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return parseValueWithData(value, data);
  if (typeof value === 'function') return value(data);
  return defaultValue;
};
var parseProps = function parseProps(pProps) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!pProps) return {};
  var p = {}; // 处理'-'到驼峰

  Object.keys(pProps).forEach(function (key) {
    var LeFEIndex = key.indexOf('_LeFE');
    var value = pProps[key];

    if (LeFEIndex != -1) {
      key = key.substr(0, LeFEIndex);
      value = parseValue(value, data);
    }

    var index = key.indexOf('-');

    if (index == -1) {
      p[key] = value;
    } else {
      p[key.slice(0, index) + key[index + 1].toUpperCase() + key.substr(index + 2)] = pProps[key];
    }
  });
  return p;
};

var index = {
  EventEmitter: eventEmitter,
  md5: md5,
  getByChain: getByChain,
  traversal: traversal,
  parseProps: parseProps,
  parseValue: parseValue,
  parseValueWithData: parseValueWithData,
  template: template,
  render: render
};

exports.default = index;
//# sourceMappingURL=index.js.map
