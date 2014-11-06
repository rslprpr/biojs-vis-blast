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
var boneView = require('backbone-viewj');
var d3 = require('d3');
var fs = require('fs');

var width = 400,height = 200;

var view;
module.exports = view = boneView.extend({
	tagName: 'section',
	initialize: function(){
	},
	render: function(){
		var el = this.el;
		this.model.iterations.forEach(function(it){
			it.hits.forEach(function(hit){
				console.log(hit.accession);
				var div = mk("div");
				var header = mk("h2");
				header.textContent = hit.accession;
				div.appendChild(header);
				el.appendChild(div);
				drawAlignment(hit, div);
			});
		});
	}

});

var drawAlignment = function(hit, element) {
	var svg = d3.select(element).append("svg")
								.attr("width",width)
								.attr("height",height);
};

function mk(name){ return  document.createElement(name);}