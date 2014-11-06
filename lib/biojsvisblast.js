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
		var div = this.$el.append("<div></div>");
		this.model.iterations.forEach(function(it){
			it.hits.forEach(function(hit){
				console.log(hit.accession);
				d3.select(div).append('<h4>'+hit.accession+'</h4>');
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