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
  height = 15,
  seq_height = 10,
  padding = 1,
  side_padding = 20;

var view;
module.exports = view = boneView.extend({
  tagName: 'section',
  showQuery: false,
  initialize: function() {
    var el = this.el;
    var header = mk("div");
    var input = mk("input");
    var self = this;
    this.opts = {
      showQuery: this.showQuery,
      drawHead: false,
      filterScore: 0
    };
    var descFilter = mk("span");
    input.addEventListener("keyup", function(e) {
      self.opts.filterScore = parseInt(input.value) || 0;
      descFilter.textContent = self.opts.filterScore;
      self.render();
    });
    descFilter.textContent = "Score";
    header.appendChild(descFilter);
    header.appendChild(input);
    this.table = mk("div");
    this.detail = mk("div");
    el.appendChild(header);
    el.appendChild(this.detail);
    el.appendChild(this.table);
  },
  renderDetail: function() {
    this.detail.textContent = "currently selected:" + this.selected.id;
  },
  render: function() {
    var el = this.el;
    var model = this.model;
    var opts = this.opts;
    var table = mk("div");
    var self = this;
    model.iterations.forEach(function(it) {
      it.hits.forEach(function(hit) {
        var div = mk("div");
        table.appendChild(div);
        if (opts.drawHead) {
          var header = mk("h2");
          header.textContent = hit.id;
          div.appendChild(header);
        }
        hit.hsps.forEach(function(hsp_hit) {
          if (hsp_hit.score > opts.filterScore) {
            self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
          }
        })
      });
    });
    el.replaceChild(table, this.table);
    this.table = table;
  },
  drawAlignment: function(queryLength, hit, hsp, element, opts) {
    var hitLength = hit.len;
    var scale = d3.scale.linear()
      .domain([1, queryLength])
      .range([0, width - side_padding * 2]);

    var svg = d3.select(element).append("svg")
      .attr("width", width)
      .attr("height", height);

    var self = this;
    svg.on("mouseover", function() {
      self.selected = hit;
      self.renderDetail();
    });

    //query rectangle
    var heightCounter = 0;
    if (opts.showQuery) {
      var query_rect = svg.append("rect")
        .attr("x", 0)
        .attr("y", padding)
        .attr("height", seq_height)
        .attr("width", scale(queryLength))
        .attr("fill", "black")
        .attr("transform", "translate(" + side_padding + ",0)");
      heightCounter += seq_height;
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
    }

    //hit rectangle
    svg.append("rect")
      .attr("x", scale(hsp['query-from']))
      .attr("y", heightCounter + padding * 2)
      .attr("height", seq_height)
      .attr("width", scale(hsp['align-len']))
      .attr("fill", "red")
      .attr("transform", "translate(" + side_padding + ",0)");

    // hit pre-fix
    svg.append("rect")
      .attr("x", scale(hsp['query-from']))
      .attr("y", heightCounter + padding * 2)
      .attr("height", seq_height)
      .attr("width", scale(hsp['hit-from']))
      .attr("fill", "red")
      .attr("fill-opacity", 0.7)
      .attr("transform", "translate(" + (-parseInt(hsp['hit-from']) + side_padding) + ",0)");

    // hit suffix
    svg.append("rect")
      .attr("x", scale(hsp['query-from']) + scale(hsp['align-len']))
      .attr("y", heightCounter + padding * 2)
      .attr("height", seq_height)
      .attr("width", hitLength - scale(hsp['hit-from']) - scale(hsp['align-len']))
      .attr("fill-opacity", 0.7)
      .attr("fill", "red");

  }
});

function mk(name) {
  return document.createElement(name);
}
