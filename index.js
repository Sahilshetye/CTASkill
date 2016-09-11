'use strict';
module.change_code =1;
var _ = require ('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('ctaapp');
var datahelper = require('./dir4rt');
var xml2js= require('xml2js').parseString;


app.launch(function(req,res){
	var prompt = ' For delay tell me code';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('testapp',{
	'slots' : {
		'AIRPORTCODE': 'FAACODES'
	},
	'utterances' :['{|flight|airport} {|delay|status} {|info} {|for} {-|AIRPORTCODE}']
},
function(req,res){

	var airportcode = req.slot('AIRPORTCODE');
	var reprompt='Please Tell me the code again';
	if (_.isEmpty(airportcode)){
		var prompt = 'dint here the code man. Tell me again';
		res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
		return true;
	}else{
		var datahelp = new datahelper();
		datahelp.requestBus(12345,airportcode).then(function(airportStatus){
			//console.dir(airportStatus);
			//xml2js(airportStatus,function(err,result){
			//var jsoo=JSON.stringify(result);
			//console.dir(result);
			console.log(airportStatus);
			res.say(datahelp.formatBusStatus(airportStatus)).send();
		//});
		}).catch(function (err) {
			console.log(err.statusCode);
			var prompt = 'error aaya re dost '+airportcode ;
			res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
		});
		
		return false;


	}
    });
var utterancesMethod = app.utterances;
app.utterances = function(){
	return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;