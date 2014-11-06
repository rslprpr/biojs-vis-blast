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
var blast = require('biojs-io-blast');
var d3 = require('d3');

var  biojsvisblast;
module.exports = biojsvisblast = function(opts){
  this.el = opts.el;
};

biojsvisblast.readBlast = blast.read;

biojsvisblast.drawAlignment = function(aligment) {

};

biojsvisblast.fetchFeatures = function(proteinId) {

};