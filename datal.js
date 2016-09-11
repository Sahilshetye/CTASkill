'use strict' // testig stash
var _ = require('lodash');
var rp = require('request-promise');
var ep = 'http://services.faa.gov/airport/status/'
var key = rD8qXzviH4zzdPGZsJa8wfwwz

function ctadatahelper(){}

ctadatahelper.prototype.requestBus= function(stpNo, busNo){
return this.getBusStatus(stpNo,busNo).then(function(response){console.log('success-received info for '+ busNo);
return response.body;
}
);
};


ctadatahelper.prototype.getBusStatus = function(stpNo,busNo){
var option = {
	method:'GET',
	uri:ep+airportcode,
	resolveWithFullResponse: true,
	json:true
};
return rp(option);
	
};

ctadatahelper.prototype.formatAirportStatus = function (airportStatus){
	var weather = _.template('The current weather conditions are ${weather},${temp} and wind ${wind}.')({
		weather: airportStatus.weather.weather,
		temp : airportStatus.weather.temp,
		wind: airportStatus.weather.wind
	});
	if (airportStatus.delay ==='true'){
		var template = _.template('There is currently a delay for ${airport}. ' +
			'the average delay time is ${delay_time}. ' +
			'Delay is because of the following : ${delay_reason}. ${weather}');
		return template({
			airport: airportStatus.name,
			delay_time : airportStatus.status.avgDelay,
			delay_reason : airportStatus.status.reason,
			weather: weather
		});
	} else {
		return _.template('There is  currently no delay at ${airport}. ${weather}')({
			airport : airportStatus.name,
			weather : weather
		});
	}
};

module.exports = ctadatahelper;
