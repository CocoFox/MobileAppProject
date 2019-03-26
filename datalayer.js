var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://root:root@cluster0-xhuj1.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser: true});
var db;

var dataLayer = {
    init : function(cb){
        client.connect(function(err){
            if(err) throw err;

            db = client.db("Poly");
            cb();
        });
        
    },

    getTaskSet : function(cb){
        db.collection("Tasks").find({}).toArray(function(err,docs){
            cb(docs);
        });
    },

    insertTask : function(task,cb){
        db.collection("Tasks").insertOne(task, function(err,result){
            cb();
        });
    }
}
module.exports = dataLayer;