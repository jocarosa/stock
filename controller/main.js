var path        = process.cwd();
var modelbusca  = require('../models/storestock');

module.exports= function(io){
    
   this.getdata=function(req,res){
       
       modelbusca.find({},function(err,doc){
          res.send([doc[0].symbolStock,doc[0].contData]);
         // console.log(doc[0])
       });
       
   };
   
    this.servindexfile=function(req,res){
        
        res.sendFile(path+'/public/index.html');    
    
    }; 
        
        var symbolStock = [];
        var dataStocks  = {
            'ST1' : ['12','54','60','55','32','40','55'],
            'ST2' : ['15','34','50','23','40','34','12'],
            'ST3' : ['30','40','60','34','40','50','30'],
            'ST4' : ['20','18','39','43','20','25','39']
        };
   
        var contData = [];
    
        
         io.on('connection', function(socket){  
            
            console.log('conectado');
            
            socket.on("stocksend", function(stockTitle){
          
               var title= stockTitle.toUpperCase();
          
                if(symbolStock.indexOf(title) == -1 && typeof dataStocks[title] != "undefined" ){
                    symbolStock.push(title);
                    contData.push(dataStocks[title]);
                }
                
                io.emit("stocksend",[symbolStock,contData]);
                updatedb() //update db
            });
            
            
            socket.on('deleteStock',function(stock){
                
                
                var index    = symbolStock.indexOf(stock);              //deleting stock from array
                var indextwo = contData.indexOf(dataStocks[stock]);
                symbolStock.splice(index, 1);
                contData.splice(indextwo,1);
               
              
                io.emit('deleteStock',[symbolStock,contData]);
                updatedb() //update db
            
            });
           
            function updatedb(){
               
                modelbusca.find({},function(err,doc){
                    
                    if(doc.length>0){
                        var toUpdate={symbolStock:symbolStock,contData:contData};
                        modelbusca.update({},toUpdate,function(err,afected){
                            //console.log(afected);
                        });
                       
                    }else{
                        var newDoc = new modelbusca({symbolStock:symbolStock,contData:contData});
                        newDoc.save(function(err,doc){
                            //console.log("new doc!");
                        });
                    }
                    
                });
            }
           
        });
    };
    
       
        
    
        
   
  
    
