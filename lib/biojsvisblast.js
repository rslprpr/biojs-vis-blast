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
var boneView = require('backbone-viewj');
var fs = require('fs');

var view;
module.exports = view = boneView.extend({
	tagName: 'div',
	initialize: function(){
		blast.read('../blast_results_ncbi.xml', function(jsonData){
			var ul = this.el.append() ;
			jsonData.iterations.forEach(function(it){
				it.hits.forEach(function(hit){
					console.log(hit.accession);
					var li = ul.append('li');

				});
			});
		});
		this.el.textContent = "oo";
	},
	render: function(){
		
	}

});
