var helpertest= require("../dir4rt");
var n = new helpertest();
var xml2js= require('xml2js').parseString;
n.getBusStatus(12345,157).then(function(bodyP){
	console.log(bodyP);
//bodyP.replace('-','');
//console.log(bodyP);
//console.log(temp);
xml2js(bodyP,function(err,result){
	var jsoo=JSON.stringify(result);
	console.dir(result["bustime-response"]);
});
});