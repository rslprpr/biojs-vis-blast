 function Sort()
 {
 	var select = mk("select");
 	select.id = "sort";
	select.name="sort";
	select.className="searchw8";

	var option1 = mk("option");
	option1.value="evalue";
	option1.selected=hsps.evalue;
	option1.textContent = "evalue";

	var option2 = mk("option");
	option2.value=hsps.bit-score;
	option2.textContent= "bit-score";

	var option3 = mk("option");
	option3.value=hsps.identity;
	option3.textContent = "identity";

select.addChild(option1);
select.addChild(option2);
select.addChild(option3);
document.addChild(select);

var button = document.getElementById("button1");
button.onClick=function(){
alert(select.options[select.selectedIndex].value)

var select = document.getElementById("mySelect");
var result = select.options[select.selectedIndex].value;

if(result[result.selectedIndex].value==option1.value)
{
	
}
else 
  if(result[result.selectedIndex].value==option2.value){
  	
 }
else 
  if(result[result.selectedIndex].value==option3.value){
  	
 }
}
}
 }

