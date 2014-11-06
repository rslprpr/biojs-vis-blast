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

var width = 400,height = 200, seq_height = 10;

var view;
module.exports = view = boneView.extend({
	tagName: 'section',
	initialize: function(){
	},
	render: function(){
		var el = this.el;
		this.model.iterations.forEach(function(it){
			it.hits.forEach(function(hit){
				var div = mk("div");
				var header = mk("h2");
				header.textContent = hit.accession;
				div.appendChild(header);
				el.appendChild(div);
				hit.hsps.forEach(function(hsp_hit){
					drawAlignment(hsp_hit, div);
				})
			});
		});
	}

});

var drawAlignment = function(hit, element) {
	var scale = d3.scale.linear()
                .domain([1, d3.max([hit["query-to"], hit["hit-to"]])])
                .range([0, width]);
	console.log(d3.max([hit["query-to"], hit["hit-to"]]));

	var svg = d3.select(element).append("svg")
								.attr("width",width)
								.attr("height",height);
	//query rectangle
	svg.append("rect")
		.attr("x",scale(hit["query-from"]))
		.attr("y",0)
		.attr("height",seq_height)
		.attr("width",scale(hit["query-to"]))
		.attr("fill","black");

	//hit rectangle
	svg.append("rect")
		.attr("x",scale(hit["hit-from"]))
		.attr("y",seq_height + 5)
		.attr("height",seq_height)
		.attr("width",scale(hit["hit-to"]))
		.attr("fill","red");
};

function mk(name){ return  document.createElement(name);}