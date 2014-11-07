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

var width = 400,height = 40, seq_height = 10;

var view;
module.exports = view = boneView.extend({
	tagName: 'section',
	initialize: function(){
	},
	render: function(){
		var el = this.el;
		var model = this.model;
		model.iterations.forEach(function(it){
			it.hits.forEach(function(hit){
				var div = mk("div");
				var header = mk("h2");
				header.textContent = hit.accession;
				div.appendChild(header);
				el.appendChild(div);
				hit.hsps.forEach(function(hsp_hit){
					var alignment = convertPositions(model["query-len"], hit.len, hsp_hit)
					drawAlignment(alignment, div);
				})
			});
		});
	}

});

var convertPositions = function(queryLength, hitLength, hsp) {
	var prefix = (hsp['hit-from'] > hsp['query-from'])?
						hsp['hit-from'] : hsp['query-from'];

	var suffix = ((hitLength - hsp['hit-to'] - hsp['hit-from'])>(queryLength - hsp['query-to'] - hsp['query-from']))?
						hitLength - hsp['hit-to'] - hsp['hit-from'] : queryLength - hsp['query-to'] - hsp['query-from'];

	var totalLength = (parseInt(prefix) + parseInt(hsp["align-len"]) + parseInt(suffix));

	var alignment = {
		'total_length':totalLength,
		'query_start':'',
		'query_length':queryLength,
		'hit_start':'',
		'hit_length':hitLength,
		'match_start':prefix,
		'match_length': hsp["align-len"]
	};

	//The query sequence starts before the hit sequence
	if(hsp['query-from'] > hsp['hit-from']) {
		alignment.query_start = 0;
		alignment.hit_start = prefix - hsp['hit-from'];
	} else { //The hit sequence starts before the query sequence
		alignment.query_start = prefix - hsp['query-from'];
		alignment.hit_start = 0;
	}



	console.log(alignment);
	return alignment;
}

var drawAlignment = function (alignment, element) {
	var scale = d3.scale.linear()
                .domain([1, alignment.total_length])
                .range([0, width]);

	var svg = d3.select(element).append("svg")
								.attr("width",width)
								.attr("height",height);
	//query rectangle
	svg.append("rect")
		.attr("x", scale(alignment.query_start))
		.attr("y",5)
		.attr("height",seq_height)
		.attr("width",scale(alignment.query_length))
		.attr("fill","black");

	//hit rectangle
	svg.append("rect")
		.attr("x",scale(alignment.hit_start))
		.attr("y",seq_height + 10)
		.attr("height",seq_height)
		.attr("width",scale(alignment.hit_length))
		.attr("fill","red");

	// match rectangle
	svg.append("rect")
		.attr("x", scale(alignment.match_start))
		.attr("y",2)
		.attr("height", (2*seq_height) + 11)
		.attr("width",scale(alignment.match_length))
		.attr("stroke","black")
		.attr("fill-opacity","0");
};

function mk(name){ return  document.createElement(name);}