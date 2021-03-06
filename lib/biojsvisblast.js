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

	var width = 500,
		height = 10,
		seq_height = 15,
		padding = 1,
		side_padding = 15;
	var view;
  //$ = jQuery = require("jquery");
  //require("jquery-ui")($);

	module.exports = view = boneView.extend({
		tagName: 'section',
		showQuery: false,
		initialize: function() {
	    var el = this.el;
	    var self = this;
		

		var title = mk("h1");
	    title.className = "focus";
	    title.id = "titleId";
		title.textContent = "BLAST";
		title.style.margin="5px 50px  0px 130px";	
		title.style.fontFamily="arial";
		title.style.font="100px";
		title.style.fontWeight = 'bold';
		el.appendChild(title);
		
		var titleDesription = mk("h4");
	    titleDesription.className = "focus";
	    titleDesription.id = "titleDesription";
		titleDesription.textContent = " Identify sequences of similarity";
		titleDesription.style.margin="40px 55px 5px 136px";	
		titleDesription.style.fontFamily="arial";
		titleDesription.style.font="10px";
		el.appendChild(titleDesription);
		
	    var header = mk("header");
	    header.className = "form";
	    header.id = "header1";
	    header.style.margin="10px 5px 0px 130px";
		
		this.table = mk("div");
	    //this.table.style.margin="0px 0px 0px 0px";

	    var form = mk("form");
	    form.className = "pure-form";
		form.style.margin="50px 5px 5px 70px";
		
		
		  var container = mk("div");
	    container.class = "container";
	    var input = mk("input");
	    input.className = "form-control";
		input["data-toggle"]="tooltip";
		input["placement"]="bottom";
		input.title="Lower bound";
	    input.style.width = "100px";
	    input.style.display = "inline-block";
		$(input).tooltip({ selector:'[data-toggle=tooltip]'});
		 input.style.margin="50px 5px 5px 0px";
		

		var input2 = mk("input");
	    input2.className = "form-control";
		input2.title="Upper bound";
	    input2.style.width = "100px";
	    input2.style.display = "inline-block";
		
		$(input2).tooltip({ selector:'[data-toggle=tooltip]'});
		  input2.style.margin="50px 5px 5px 0px";	

		
		 
	    var container = mk("div");
	    container.class = "container";
	    var res = this.minMax();
	    var ir = mk("div");
		ir.className="scale-slider";
	    var irVal = mk("div");
	    ir.style.width = "500px";
		ir.style.margin="50px 5px 45px 170px";
      
		

	    $(ir)
		 .slider({
	      range: true,
	      min: res[1],
	      max: res[0],
		  step: 1,
	      values: [res[1], res[0]],
		  slide: function(event, ui) {
			
	        //$( irVal ).val( "$" + 
	        //+ " - $" + ui.values[ 1 ] );
		/*     var value2 = $(ir).slider("values", 0);
            var value1 = $(ir).slider("values", 1);
            $(ir).find(".ui-slider-handle:first").text(value1);
            $(ir).find(".ui-slider-handle:last").text(value2); */
	        self.opts.rangeLen = {
	          min: ui.values[0],
	          max: ui.values[1]
	        };
	         self.render();
	      }
	    });
			 $(ir).slider("pips", {
			rest: "200"
			})
			$(ir).slider("float"); 
	    $(irVal).val("$" + $(ir).slider("values", 0) +
	      " - $" + $(ir).slider("values", 1));
	    container.appendChild(ir);
	    container.appendChild(irVal);
    	
	    var descFilter = mk("span");
	    descFilter.className = "focus";
	    descFilter.id = "styled";
        descFilter.style.margin="0px 2px 0px 5px";
		
		var query = mk("span");
	    descFilter.className = "focus";
	    descFilter.id = "styled";

	    this.detail = mk("div");
	    this.detail.className = "focus";
	    this.detail.id = "focus";
		this.detail.style.margin="3px 5px 10px 4px";
		this.detail.style.fontFamily="Courier, Monaco, monospace";
	   
	    this.moreDetail = mk("button");
	    this.moreDetail.className = "btn btn-success";
		this.moreDetail.style.margin="0px 5px 5px 0px";
		
		
	
	    
	    /* this.queryDetail = mk("div");
	    this.queryDetail.className = "focus";
	    this.queryDetail.id = "focus";
	    this.queryDetail.style.overflowX = "scroll";
	    */

	    this.opts = {
	      showQuery: this.showQuery,
	      drawHead: false,
	      filterScore: 0,
		  filterScore2: 0
	    };

	    input.addEventListener("keyup", function(e) {
	      var select = self.select;
	      self.opts.filterScore = parseInt(input.value) || 0;
	      descFilter.textContent = select.value;
	      self.render();
	    }); 
		
		input2.addEventListener("keyup", function(e) {
	      var select = self.select;
	      self.opts.filterScore2 = parseInt(input2.value) || 0;
	      descFilter.textContent = select.value;
	      self.render();
	    }); 
	    irVal.addEventListener("change", function(e) {
	      self.opts.filterScore = parseInt(irVal.value) || 0;
	      console.log("i", inputRange.value);
	      self.render();
	    });
		
	    descFilter.textContent = "";
	    form.appendChild(container);
	    header.appendChild(descFilter);
	    header.appendChild(input);
		header.appendChild(input2);
	    this.header = header;
	    this.header.appendChild(this.sortInit());

	    header.appendChild(this.detail);
        header.appendChild(this.moreDetail);
	    el.appendChild(header);
	    el.appendChild(form);
	    el.appendChild(this.table);
		//--
			/*var elementtitle = mk("div");
	        elementtitle.textContent = "identity";
			elementtitle.style.width = "100px";
			elementtitle.style["margin-left"]="50px";
			elementtitle.style.display = "inline-block";
			elementtitle.style.cssFloat = "right";
			this.table.appendChild(elementtitle);*/
		//--
		

	  },
	 
	 
	 
	  renderDetail: function() {
	    this.detail.textContent = "Hit id: " + this.selected.description;
	  },
	  renderClick: function() {
		this.moreDetail.textContent ="Query: " +this.model.param.sequences[0].name;
	  },
	  render: function() {
	    
	    var el = this.el;
	    var model = this.model;
	    var opts = this.opts;
		var table = mk("div");
	    var self = this;
	    var select = this.select;
		 self.renderClick();  
		 
	
		this.model.iterations.forEach(function(it){
	      var queryLength = it["query-len"];
	
	      it.hits.forEach(function(hit) {
		   
	        var div = mk("div");
	        table.appendChild(div);
	        if (opts.drawHead) {
	          var header = mk("h2");
	          header.textContent = hit.id;
	          div.appendChild(header);
	        }
	        if (hit.hsps.length > 1) {
	          console.log(hit.hsps);
	        }
	        var i = 0;
	        hit.hsps.forEach(function(hsp_hit) {
	          var length = Math.abs(parseInt(hsp_hit['hit-to']) - parseInt(hsp_hit['hit-from']));

	          if (self.opts.rangeLen && (self.opts.rangeLen.min > length || self.opts.rangeLen.max < length)) {
	            return;
	          }

	          hsp_hit.index = i++;

	          switch (select.value) {
			    case "score":
	            default:
	              if (hsp_hit.score > opts.filterScore && hsp_hit["score"] <= opts.filterScore2) {
	                self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
	              } 
				  
	              
	            case "bitscore":
	              if (hsp_hit["bit-score"] > opts.filterScore && hsp_hit["bit-score"] <= opts.filterScore2) {
	                self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
	              }
				

	              //this.model.iterations[0].hits = b;
	              break;
	            case "evalue":
	              if (parseFloat(hsp_hit.evalue) >= opts.filterScore && hsp_hit["evalue"] <= opts.filterScore2) {
	                self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
	              }
	              //this.model.iterations[0].hits = b;

	              break;

	            case "identity":
	              if (hsp_hit.identity > opts.filterScore && hsp_hit["identity"] <= opts.filterScore2) {
	                self.drawAlignment(it["query-len"], hit, hsp_hit, div, opts);
	              }
			
	              //this.model.iterations[0].hits = b;
	              break;
	          
			
	          }
	        })			
	      });
	    });
			
	 
	    el.replaceChild(table, this.table);
	    this.table = table;
	  },
	  drawAlignment: function(queryLength, hit, hsp, element, opts) {
	    var hitLength = parseInt(hsp["query-to"]) - parseInt(hsp["query-from"]);
	    if (hitLength < 0) {
	      return;
	    }
		element.style.margin="0px 0px 0px 120px";
	    var scale = d3.scale.linear()
	      .domain([1, queryLength])
	      .range([0, width - side_padding * 2]);

	    if (hsp.index === 0) {
	      var di = mk("span");
		  
	      di.textContent = hit.id;
	      di.style.width = "120px";
	      di.style.display = "inline-block";
		  di.style.margin="10px";
		  di.style.fontFamily="Courier, Monaco, monospace";
	      element.appendChild(di);
	    }

	    var scaledWidth = hitLength / queryLength * width;
	    var paddingleft = parseInt(hsp["query-from"]) / (queryLength) * width;
	    var svg = d3.select(element).append("svg")

	      .attr("width", scaledWidth)
	      .attr("padding-left", paddingleft)
	      .attr("height", height);
	    var self = this;
	    svg.on("mouseover", function() {
	      self.selected = hit;
	      self.renderDetail();
	    });
	    svg.on("click", function() {
	      self.selectedClick = hit;
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

		//---------
		    
		var res2 = this.minMax();
	    var irColor = mk("div");
	    var irColorVal = mk("div");
	    irColor.style.width = "30px";
	    irColor.style.marginLeft = "15px";
		//irColor.style.margin="5px 5px 10px 160px";
		
         //------------		
	/*   //--Score---
	
	      var elementScore = mk("div");
	      elementScore.textContent ="score:"+ hit.hsps[0].score+"   ";
	      elementScore.style.width = "100px";
	      elementScore.style.display = "inline-block";
		  elementScore.style.cssFloat = "right";
	      element.appendChild(elementScore);
	
	    //--identity---
	      var elementIdentity = mk("div");
	      elementIdentity.textContent = "identity:"+ hit.hsps[0].identity+"   ";
	      elementIdentity.style.width = "100px";
	      elementIdentity.style.display = "inline-block";
		  elementIdentity.style.cssFloat = "right";
	      element.appendChild(elementIdentity); */
	  //--Evalue---
	      var elementEvalue = mk("div");
		  //var evalueNum=hit.hsps[0].evalue.value;
	      elementEvalue.textContent ="evalue:"+ hit.hsps[0].evalue+"   ";
	      elementEvalue.style.width = "100px";
	      elementEvalue.style.display = "inline-block";
		 // elementEvalue.style.cssFloat = "right";
	      element.appendChild(elementEvalue);
		  
	    /*

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
	      */
	  },
	  sortInit: function Sort() {

	    var select = mk("select");
	    select.id = "sort";
	    select.name = "sort";
	    select.className = "styled";
	    this.sortForm = this.select = select;


	     var button = mk("div");
 	button.id = "dropdownMenu1";
	button.name="buttonname";
	button["data-toggle"] ="dropdown"
	select.className="btn btn-primary dropdown-toggle";
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
	  onSort: function() {

	    var select = this.select;

	    switch (select.value) {

		
		    case "score":
	      default:
	        var b = this.model.iterations[0].hits.sort(function(a, b) {
	          var aVal = parseInt(a.hsps[0]["query-from"]);
	          var bVal = parseInt(b.hsps[0]["query-from"]);
	          var sorti = -aVal + bVal;
	          console.log(sorti);
	          return -sorti;
	        }); 
			 //this.model.iterations[0].hits = b;
	        this.render();
	        break;
	      case "bitscore":
	        var b = this.model.iterations[0].hits.sort(function(a, b) {
	          var aVal = parseInt(a.hsps[0]["bit-score"]);
	          var bVal = parseInt(b.hsps[0]["bit-score"]);
	          var sorti = -aVal + bVal;
	          console.log(sorti);
	          return sorti;
	        });
	        //this.model.iterations[0].hits = b;
	        this.render();
	        break
	      case "identity":

	        var b = this.model.iterations[0].hits.sort(function(a, b) {
	          var aVal = parseInt(a.hsps[0]["identity"]);
	          var bVal = parseInt(b.hsps[0]["identity"]);
	          var sorti = -aVal + bVal;
	          console.log(sorti);
	          sorti = a.accession.localeCompare(b.accession);
	          return sorti;
	        });
	        
	        //this.model.iterations[0].hits = b;
	        this.render();
			break;
	    
		case "evalue":
	        var b = this.model.iterations[0].hits.sort(function(a, b) {
	          var aVal = parseInt(a.hsps[0]["evalue"]);
	          var bVal = parseInt(b.hsps[0]["evalue"]);
	          var sorti = -aVal + bVal;
	          console.log(sorti);
	          return -sorti;
	        });
	        //this.model.iterations[0].hits = b;
	        this.render();
	        break;
	      
	    }
	  },
	  minMax: function Sort() {

	    var model = this.model;
	    var self = this;
	    var Max = 0;
	    var Min = 0;

	    model.iterations.forEach(function(it) {

	      it.hits.forEach(function(hit) {

	        hit.hsps.forEach(function(hsp_hit) {
	          var length = Math.abs(parseInt(hsp_hit['hit-to']) - parseInt(hsp_hit['hit-from']));
	          Min = Math.min(length, Min);
	          Max = Math.max(length, Max);

	        });
	      });
	    });
	    return [Max, Min];
	  }

	});

	function mk(name) {
	  return document.createElement(name);
	}
