// if you don't specify a html file, the sniper will generate a div
var app = require("biojs-vis-blast");
var blast = require('biojs-io-blast');
blast.read('../blast_results_ebi.xml', function(jsonData){
	var instance = new app({el: yourDiv, model: jsonData});
	instance.render();
});