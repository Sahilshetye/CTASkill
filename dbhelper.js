'use strict';
var localUrl = 'http://localhost:8000';
var localCredentials = {
  region: 'us-east-1',
  accessKeyId: 'fake',
  secretAccessKey: 'fake'
};
var dyn = require('dynasty')(localCredentials,localUrl);
var _=require('lodash');
function dbhelper(){}

var dbmain= function(){
  return dyn.table('user_info')
};

dbhelper.prototype.storeUserBusInfo= function(userId,busNo,busStopNo){
  return dbmain().insert({
    userid:userId,
    busnum: busNo,
    busstpnum:busStopNo
  }).catch(function(error){
    console.log(error);
  });
};

dbhelper.prototype.findUserBusInfo= function(userId){

  return dbmain().findAll(userId,function(err, all){
    if(err){
      console.log(err);
  return err;
    }
    else{
        if(!_.isEmpty(all)){
        all["Flag"]=false;   //Is the object is not empty then that means that user exists and a flag is added to object
        //all.forEach(console.log);
        console.log("\n");

      }
      else{
        all["Flag"]= true;
        console.log("Empty");
      };



  };
  //console.log(all);
  return all;
});

};

module.exports = dbhelper;
