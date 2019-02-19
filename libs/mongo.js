var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'qiaohui';

/**
 * {
 *   colName:'' 集合名称
 *   type:'insert',
 *   query:{
 *      }
 * }
 */
module.exports = function(options,fn){
    mongodbClient.connect(url,{useNewUrlParser:true},function(err,client){
        if(err) throw err;
        var db = client.db(dbName);
        var col = db.collection(options.colName);
        
        if(options.type === 'find'){
            var res = col[options.type](options.query);
            res.toArray(function(err,data){
                if(err) throw err;
                fn&&fn(data);
            })
        }else{
            var res = col[options.type](options.query,options.content);
        }
        client.close();
    })
}