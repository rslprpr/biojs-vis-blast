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

var width = 900,
  height = 40,
  seq_height = 10,
  padding = 5,
  side_padding = 20;

var view;
module.exports = view = boneView.extend({
  tagName: 'section',
  showQuery: true,
  initialize: function() {},
  render: function() {
    var el = this.el;
    var model = this.model;
    var opts = {showQuery: this.showQuery};
    model.iterations.forEach(function(it) {
      it.hits.forEach(function(hit) {
        var div = mk("div");
        var header = mk("h2");
        header.textContent = hit.accession;
        div.appendChild(header);
        el.appendChild(div);
        hit.hsps.forEach(function(hsp_hit) {
          drawAlignment(it["query-len"], hit.len, hsp_hit, div, opts);
        })
      });
    });
  }

});

var drawAlignment = function(queryLength, hitLength, hsp, element, opts) {
  var scale = d3.scale.linear()
    .domain([1, queryLength])
    .range([0, width - side_padding * 2]);

  var svg = d3.select(element).append("svg")
    .attr("width", width)
    .attr("height", height);
  //query rectangle
  if (opts.showQuery) {
    var query_rect = svg.append("rect")
      .attr("x", 0)
      .attr("y", padding)
      .attr("height", seq_height)
      .attr("width", scale(queryLength))
      .attr("fill", "black")
      .attr("transform", "translate(" + side_padding + ",0)");
  }

  //hit rectangle
  svg.append("rect")
    .attr("x", scale(hsp['query-from']))
    .attr("y", seq_height + padding * 2)
    .attr("height", seq_height)
    .attr("width", scale(hsp['align-len']))
    .attr("fill", "red")
    .attr("transform", "translate(" + side_padding + ",0)");

  // hit pre-fix
  svg.append("rect")
    .attr("x", scale(hsp['query-from']))
    .attr("y", seq_height + padding * 2)
    .attr("height", seq_height)
    .attr("width", scale(hsp['hit-from']))
    .attr("fill", "red")
    .attr("transform", "translate(" + (-parseInt(hsp['hit-from']) + side_padding) + ",0)");

  // hit suffix
  svg.append("rect")
    .attr("x", scale(hsp['query-from']) + scale(hsp['align-len']))
    .attr("y", seq_height + padding * 2)
    .attr("height", seq_height)
    .attr("width", hitLength - scale(hsp['hit-from']) - scale(hsp['align-len']))
    .attr("fill", "red");

  // left mask
  svg.append("rect")
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", scale(hsp['query-from']) + side_padding)
    .attr("height", height)
    .attr("fill", "white")
    .attr("fill-opacity", 0.7);

  // right mask
  svg.append("rect")
    .attr("x", scale(hsp['query-from']) + scale(hsp['align-len']))
    .attr("y", "0")
    .attr("width", width - scale(hsp['query-from']) - scale(hsp['align-len']))
    .attr("height", height)
    .attr("fill", "white")
    .attr("fill-opacity", 0.7)
    .attr("transform", "translate(" + side_padding + ",0)");
};

function mk(name) {
  return document.createElement(name);
}
