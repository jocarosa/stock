var path    = process.cwd();


module.exports= function(app,io){
    
    var controller    = require(path+'/controller/main.js');
    var objcontroller = new controller(io);
   
   app.get('/',objcontroller.servindexfile);
   app.get("/data",objcontroller.getdata)
};