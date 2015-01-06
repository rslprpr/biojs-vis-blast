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
	var width = 700,
	height = 10,
	seq_height = 10,
	padding = 1,
	side_padding = 15;
	var view;
	module.exports = view = boneView.extend({
	tagName: 'section',
	showQuery: false,
	initialize: function() {
		var el = this.el;
		var self = this;
		
		var header = mk("header");
		header.className="form";
		header.id="header1";
		
		this.table = mk("div");
		
		var form=mk("form");
		form.className="pure-form";
		
		var input = mk("input");
		input.className="form-control";
		input.style.width  = "100px";
		input.style.display = "inline-block";
		
		var inputRange = mk("input");
		inputRange.type ="range";
		var res = this.minMax;
		inputRange.min=res[0];
		inputRange.max=res[1];
		
		
		var descFilter = mk("span");
		descFilter.className="focus";
		descFilter.id="styled";
		
		this.detail = mk("div");
		this.detail.className="inhalt";
		this.detail.id="inhalt";
		
		this.opts = 
		{
			showQuery: this.showQuery,
			drawHead: false,
			filterScore: 0
		};
		
   
		input.addEventListener("keyup", function(e) 
		{
			self.opts.filterScore = parseInt(input.value) || 0;
			descFilter.textContent = self.opts.filterScore;
			self.render();
		});
		form.appendChild(inputRange);
		header.appendChild(input);
		descFilter.textContent = "Score";
		header.appendChild(descFilter);
 
	
		this.header = header;
		
		form.appendChild(this.detail);
		this.header.appendChild(this.sortInit());
		el.appendChild(header);
		el.appendChild(form);
		el.appendChild(this.table);
		/* el.appendChild(this.detail);
		el.appendChild(this.table);*/
		
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
	var select = this.select;
	
    model.iterations.forEach(function(it) {
	
		var queryLength = it["query-len"];
	
	

      it.hits.forEach(function(hit) {
        var div = mk("div");
        table.appendChild(div);
        if (opts.drawHead) {
          var header = mk("h2");
          header.textContent = hit.id;
          div.appendChild(header);
        }
        hit.hsps.forEach(function(hsp_hit) {
       
switch(select.value){
case "bitscore":
if (hsp_hit.bit-score  > opts.filterScore) {
            self.drawAlignment(queryLength, hit, hsp_hit, div, opts);
          }
	
	//this.model.iterations[0].hits = b;
	break;
case  "evalue":
if ( parseFloat(hsp_hit.evalue) >= opts.filterScore) {
            self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
          }
	//this.model.iterations[0].hits = b;
	
	break;

	case  "identity":
if (hsp_hit.identity > opts.filterScore) {
            self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
          }
	//this.model.iterations[0].hits = b;
	break;
case "score":
default:
	 if (hsp_hit.score > opts.filterScore) {
			self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
          }
		 break;
}
        })
      });
    });
	el.replaceChild(table, this.table);
    this.table = table;
  },
 drawAlignment: function(queryLength, hit, hsp, element, opts) {

 
 
    var hitLength = parseInt(hit.len);
    var scale = d3.scale.linear()
      .domain([1, queryLength])
      .range([0, width - side_padding * 2]);
      var scaledWidth = hitLength  / queryLength * width;
	 // var logscalevartg=parseInt(log(scalevar));
	  var  paddingleft=parseInt(hsp["query-from"])/(queryLength)*width;
      var svg = d3.select(element).append("svg")
      .attr("width", scaledWidth)
	  .attr("padding-left", paddingleft)
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
  },
  sortInit:  function Sort(){
  /*
  <div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
  </ul>
</div>*/
  
 	var select = mk("select");
 	select.id = "sort";
	select.name="sort";
	select.className="styled";
	this.sortForm = this.select = select;
	
	
	var button = mk("button");
 	button.id = "dropdownMenu1";
	button.name="buttonname";
	button["data-toggle"] ="dropdown"
	select.className="btn btn-default dropdown-toggle";

	var option1 = mk("option");
	option1.className="dropdown-menu";
	option1.value="evalue";
	option1.selected= "evalue";
	option1.textContent = "evalue";

	var option2 = mk("option");
	option2.value= "bitscore";
	option2.textContent= "bit-score";

	var option3 = mk("option");
	option3.value= "identity";
	option3.textContent = "identity";

	var option4 = mk("option");
	option4.value= "score";
	option4.textContent = "score";
select.appendChild(button);	
select.appendChild(option1);
select.appendChild(option2);
select.appendChild(option3);
select.appendChild(option4);
select.addEventListener("change", this.onSort.bind(this));
this.select = select;
return select;
},
onSort: function(){

var select = this.select;

switch(select.value){
case "bitscore":
 	var b =this.model.iterations[0].hits.sort(function(a,b){
	var aVal = parseInt(a.hsps[0]["bit-score"]);
	var bVal = parseInt(b.hsps[0]["bit-score"]);
	var sorti = - aVal + bVal;
	console.log(sorti);
		return  sorti;
	});
	//this.model.iterations[0].hits = b;
	this.render();
	break;
case  "evalue":
	var b =this.model.iterations[0].hits.sort(function(a,b){
	var aVal = parseInt(a.hsps[0]["bit-score"]);
	var bVal = parseInt(b.hsps[0]["bit-score"]);
	var sorti = - aVal + bVal;
	console.log(sorti);
		return  - sorti;
	});
	//this.model.iterations[0].hits = b;
	this.render();
	break;
case "identity":
default:
	var b =this.model.iterations[0].hits.sort(function(a,b){
	var aVal = parseInt(a.hsps[0]["bit-score"]);
	var bVal = parseInt(b.hsps[0]["bit-score"]);
	var sorti = - aVal + bVal;
	console.log(sorti);
	sorti =  a.accession.localeCompare(b.accession);
		return  sorti;
	});
	//this.model.iterations[0].hits = b;
	this.render();
}
}
,minMax:  function Sort(){

    var model = this.model;
    var self = this;
	var Max=0;
	var Min=0;
	
    model.iterations.forEach(function(it) {
	
		it.hits.forEach(function(hit){
	  
			hit.hsps.forEach(function(hsp_hit) {
				Min=Math.min(hsp_hit.length, Min);
				Max=Math.Max(hsp_hit.length, Max);
				
			});
		});
	});
return [Max, Min];
	}
	
	});

function mk(name) {
  return document.createElement(name);
}
