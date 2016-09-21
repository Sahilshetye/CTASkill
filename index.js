'use strict';
module.change_code =1;
var _ = require ('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('ctaapp');
var datahelper = require('./dir4rt');
var xml2js= require('xml2js').parseString;
var dba= require('./dbhelper');
var db= new dba();

// Launch skill to test whether user is registered or not.
app.launch(function(req,res){
//console.log("here");
//  var userId=JSON.stringify(req.userId);
  var po=db.findUserBusInfo("test1").then(function(data){
		var flag= data.Flag;
			///// put skill to check for busstop for User-Agent
		if(flag)
		{
			var poompt = 'Welcome to CTA Bus tracker.';
//			res.say(prmpt).reprompt(prmpt).shouldEndSession(false);
		}
	else {
//console.log(flag);
			var prompt = 'the data found and here is your timings.'
	//		res.say(prompt).reprompt(prompt).shouldEndSession(false);
	};
//  res.say(prompt).reprompt(prompt).shouldEndSession(false);
return prompt;
});

  res.say(po).reprompt(po).shouldEndSession(false);


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
