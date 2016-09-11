'use strict' // testig stash
var _ = require('lodash');
var rp = require('request-promise');
var ep2 = 'http://www.ctabustracker.com/bustime/api/v1/getdirections?key=rD8qXzviH4zzdPGZsJa8wfwwz&rt=157';
var ep = 'http://www.ctabustracker.com/bustime/api/v1/getdirections';
var key = 'rD8qXzviH4zzdPGZsJa8wfwwz';
var  request = require('request');



var args={key: key,rt:'157'}



function ctadatahelper(){}

ctadatahelper.prototype.requestBus= function(stpNo, busNo){
return this.getBusStatus(stpNo,busNo).then(function(response){console.log('success-received info for '+ busNo);
return response.body;
}
);
};




ctadatahelper.prototype.getBusStatus = function(stpNo,busNo){
//var option = {
//	method:'GET',
//	uri:ep+key+'&rt=157',
//	resolveWithFullResponse: false,
//	json:false
//};
//client.get(ep2, function(data,Response){
//	var option= data;

//soap.createClient(ep,function(err,client){
//client.MyFunction(args,function(err,result){
//console.log(result);
//});
//});
//	console.log(Response);

//});
// /return rp(option);
 request(ep2,function(error,response,body){
 	if(!error&& response.statuscode==200){
 		console.log("body is:  "+body);
 	}
 	else{console.log("error is :  "+error);}
 });	


};



ctadatahelper.prototype.formatBusStatus = function (busStatus){
	var weather = _.template('The eoute available are conditions are ${first},${second}.')({
		first: busStatus.bustime-response.dir,
		second : airportStatus.bustime-response.dir,
	});
	
};
module.exports = ctadatahelper;