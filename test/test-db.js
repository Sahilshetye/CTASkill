var test = require("../dbhelper");
var t= new test();
//t.storeUserBusInfo('test1','15337','12345');
t.findUserBusInfo('test1').then(function(ob){console.log(ob);
});

/// Testing is done to check the connection parameter of the  db. After intial insertion in the js. The table is checked for value.
