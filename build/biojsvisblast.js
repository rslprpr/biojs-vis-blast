require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * biojs-vis-blast
 * https://github.com/xwatkins/biojs-vis-blast
 *
 * Copyright (c) 2014 Xavier Watkins
 * Licensed under the Apache 2 license.
 */

/**
@class biojsvisblast
 */


var  biojsvisblast;
module.exports = biojsvisblast = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsvisblast.hello(opts.text);
};

/**
 * Private Methods
 */

/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsvisblast.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */


biojsvisblast.hello = function (name) {

  return 'hello ' + name;
};


},{}],"biojs-vis-blast":[function(require,module,exports){
module.exports = require("./lib/biojsvisblast");

},{"./lib/biojsvisblast":1}]},{},["biojs-vis-blast"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveHdhdGtpbnMvcHJvamVjdHMvYmlvanMyL2Jpb2pzLXZpcy1ibGFzdC9saWIvYmlvanN2aXNibGFzdC5qcyIsIi4vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogYmlvanMtdmlzLWJsYXN0XG4gKiBodHRwczovL2dpdGh1Yi5jb20veHdhdGtpbnMvYmlvanMtdmlzLWJsYXN0XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IFhhdmllciBXYXRraW5zXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIDIgbGljZW5zZS5cbiAqL1xuXG4vKipcbkBjbGFzcyBiaW9qc3Zpc2JsYXN0XG4gKi9cblxuXG52YXIgIGJpb2pzdmlzYmxhc3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGJpb2pzdmlzYmxhc3QgPSBmdW5jdGlvbihvcHRzKXtcbiAgdGhpcy5lbCA9IG9wdHMuZWw7XG4gIHRoaXMuZWwudGV4dENvbnRlbnQgPSBiaW9qc3Zpc2JsYXN0LmhlbGxvKG9wdHMudGV4dCk7XG59O1xuXG4vKipcbiAqIFByaXZhdGUgTWV0aG9kc1xuICovXG5cbi8qXG4gKiBQdWJsaWMgTWV0aG9kc1xuICovXG5cbi8qKlxuICogTWV0aG9kIHJlc3BvbnNpYmxlIHRvIHNheSBIZWxsb1xuICpcbiAqIEBleGFtcGxlXG4gKlxuICogICAgIGJpb2pzdmlzYmxhc3QuaGVsbG8oJ2Jpb2pzJyk7XG4gKlxuICogQG1ldGhvZCBoZWxsb1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiBhIHBlcnNvblxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm5zIGhlbGxvIG5hbWVcbiAqL1xuXG5cbmJpb2pzdmlzYmxhc3QuaGVsbG8gPSBmdW5jdGlvbiAobmFtZSkge1xuXG4gIHJldHVybiAnaGVsbG8gJyArIG5hbWU7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9iaW9qc3Zpc2JsYXN0XCIpO1xuIl19
