var path    = process.cwd();


module.exports= function(app,io){
    
    var controller= require(path+'/controller/main.js');
    var objcontroller= new controller(io);
   
   app.route('/data')
        .get(objcontroller.getdata);
        
        
   app.route('/')
        .get(objcontroller.startsocket);

};