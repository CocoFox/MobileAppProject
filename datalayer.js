var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
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
    },

    deleteTask : function(task_id, cb){
        db.collection("Tasks").deleteOne({_id: new mongodb.ObjectID(task_id)},function(err,result){
            if (err) console.log("fuckyou");
            
            cb();
        });
    },

    toggleTask : function(task_id,cb){
        var task;
        db.collection("Tasks").findOne({ _id: new mongodb.ObjectID(task_id) },function(err,result){
            
            if(result.done){
                db.collection("Tasks").updateOne({ _id: new mongodb.ObjectID(task_id) },{$set: {done: false}},function(err,result){
                    cb();
                });
            }
            else{
                db.collection("Tasks").updateOne({ _id: new mongodb.ObjectID(task_id) }, { $set: { done: true } }, function (err, result) {
                    cb();
                });
            }
        });
    }
}
module.exports = dataLayer;