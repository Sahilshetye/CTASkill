'use strict' // testig stash
var _ = require('lodash');
var rp = require('request-promise');
var ep = 'http://www.ctabustracker.com/bustime/api/v1/getstops';
var key = require('./credential').key;
var xml2js= require('xml2js').parseString;


function ctaarrivaldata(){}

ctaarrivaldata.prototype.requestBusArrival= function(busNo,dir){
return this.getBusArrivalStatus(busNo,dir).then(function(response){
	var rs;
console.log('success-received stop info for '+busNo);
xml2js(response,function(err,result){ 
	rs = result;
	//console.log(result);
});
return rs;
});
};




ctaarrivaldata.prototype.getBusArrivalStatus = function(busNo,dir){
var option = {
	method:'GET',
	uri:ep,//+key+'&rt=157',
	qs:{
		key,rt:busNo,dir:dir
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


/// Lemme check If I need this
ctaarrivaldata.prototype.formatBusArrivalStatus = function (busStatus){
	var weather = _.template('The eoute available are conditions are ${first},${second}.')({
		first: busStatus["bustime-response"].dir[0],
		second : busStatus["bustime-response"].dir[1],

	});
	return weather;
};
module.exports = ctaarrivaldata;