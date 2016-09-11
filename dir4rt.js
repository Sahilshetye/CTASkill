'use strict' // testig stash
var _ = require('lodash');
var rp = require('request-promise');

var ep = 'http://www.ctabustracker.com/bustime/api/v1/getdirections';
var key = require('./credential').key;

var xml2js= require('xml2js').parseString;


function ctadatahelper(){}

ctadatahelper.prototype.requestBus= function(stpNo, busNo){
return this.getBusStatus(stpNo,busNo).then(function(response){
	var rs;
console.log('success-received info for '+busNo);
xml2js(response,function(err,result){ 
	rs = result;
	//console.log(result);
});
return rs;
});
};




ctadatahelper.prototype.getBusStatus = function(stpNo,busNo){
var option = {
	method:'GET',
	uri:ep,//+key+'&rt=157',
	qs:{
		key,rt:busNo
	},
	header:{
		'accept': 'text/html',
		'User-Agent':'Request-Promise',
		'Content-Type': 'text/html'
	},
	json:false
};


//console.dir(rp(option));
	return rp(option)

};



ctadatahelper.prototype.formatBusStatus = function (busStatus){
	var weather = _.template('The eoute available are conditions are ${first},${second}.')({
		first: busStatus["bustime-response"].dir[0],
		second : busStatus["bustime-response"].dir[1],

	});
	return weather;
};
module.exports = ctadatahelper;