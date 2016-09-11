'use strict';
var chai=require('chai');
var chaiAsPromised= require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var helpertest= require("../dir4rt");
chai.config.includeStack=false;

describe('helpertest',function(){
	var subject= new helpertest();

describe('#getBusStatus',function(){
	context('with a valid airport code',function(){
		it('returns matching airport code',function(){
		var airport_code='157';
		var stopNo = '12345';
		var value = subject.requestBus(stopNo,airport_code).then(function(obj){
			return obj;
        
		});
		console.log(value);
		return expect(value).to.eventually.eq('EastBound');
	});
});

});

});
