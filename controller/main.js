var path    = process.cwd();
var modelbusca= require('../models/storestock');

module.exports= function(io){
  
  
  var symbolStack=['ST1','ST2','ST3','ST4'];
            var dataStacks= {
                'ST1' : ['12','54','60','55','32','40','55'],
                'ST2' : ['15','34','50','23','40','34','12'],
                'ST3' : ['30','40','60','34','40','50','30'],
                'ST4' : ['20','18','39','43','20','25','39']
                             };
            var arrayinput=[];
            var arraycol=[];   
            
            
            
    this.getdata=function(req,res){
        
        modelbusca.findById('577315cd71849f5a5bd85e3c', function (err, doc) {
             
             res.send([doc.dcol, doc.dinput])
        })
        
        
        
       
    }
  
    
    this.startsocket=function(req,res){
      
       //start socket
       
            io.on('connection', function(socket){
                
                console.log('conectado');
        
                    socket.on('stocksend', function(msg){
    
                        var inputdata= msg.toUpperCase();
    
                         //if this symbolstack exist
                        if(symbolStack.indexOf(inputdata)== -1 ) {
                                io.emit('stocksend', 'no exist');
                        }else
                        {
                            // avoiding equals arrays
                             if(arraycol.indexOf(dataStacks[inputdata])== -1 ) 
                            {
            
                                arraycol.push(dataStacks[inputdata]);
                                arrayinput.push(inputdata);
               
                            }
                       
                        var actualiza={
                          dcol:arraycol,
                          dinput:arrayinput
                        }
                       modelbusca.findByIdAndUpdate('577315cd71849f5a5bd85e3c', actualiza, function(err,doc){
                          //console.log('update correct'+doc) 
                       })
                       
                            io.emit('stocksend', arraycol, arrayinput);
      
                        }
   
     
                    });
  
  
  
  //erasing selected
  
        socket.on('deletesend', function(element){
     
            var arraytodelete = dataStacks[element];
            var exist         = arraycol.indexOf(arraytodelete);
      
            if(exist > -1){
                arraycol.splice(exist,1);
                var indexinput = arrayinput.indexOf(element);
                arrayinput.splice(indexinput,1);
        
                var actualiza={
                      dcol:     arraycol,
                    dinput:   arrayinput
                };
                modelbusca.findByIdAndUpdate('577315cd71849f5a5bd85e3c', actualiza, function(err,doc){
                //console.log('update correct'+doc) 
                });
         
            io.emit('stocksend', arraycol, arrayinput);
        }
      
     
    });
});
      res.sendFile(path+'/public/chart.html');
    };

    
    
}