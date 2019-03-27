var express  = require('express');
var app      = express();                               
var mongoose = require('mongoose');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');

var dataLayer = require('./datalayer.js');

app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

dataLayer.init(function(){
   console.log('init');
   app.listen(3002); 
   console.log("Port: 3002");
});

//mongoose.connect('mongodb://localhost/ListeaFaire', { useNewUrlParser: true });

//var Liste = mongoose.model('Liste', {
 //   text : String
//});



app.get('/', function(req, res) {
    res.sendFile('./public/index.html'); 
});

/*
app.get('/api/laliste', function(req, res) {
    Liste.find(function(err, laliste) {
        if (err)
            res.send(err)
        res.json(laliste); 
    });
});

app.post('/api/laliste', function(req, res) {
    Liste.create({
        text : req.body.text,
        done : false
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});

app.delete('/api/laliste/:liste_id', function(req, res) {
    Liste.deleteOne({
        _id : req.params.liste_id
    }, function(err, liste) {
        if (err)
            res.send(err);
        Liste.find(function(err, laliste) {
            if (err)
                res.send(err)
            res.json(laliste);
        });
    });
});
*/

app.post("/api/addTask",function(req,res){
    if(req.body && typeof req.body.name != 'undefined' && req.body.done != 'undefined'){
        console.log(req.body);

        var task = {
            name : req.body.name,
            done : req.body.done
        }

        dataLayer.insertTask(task,function(){
            dataLayer.getTaskSet(function (dataSet) {
                res.send(dataSet); //resend taskList
            });
        });
    }else{

        res.send({
            sucess : false,
            errorCode : "PARAM_MISSING"
        });
        console.log(req.body);
    }
});

app.delete("/api/deleteTask/:id",function(req,res){
    
    console.log(req.params.id);
    
    dataLayer.deleteTask(req.params.id,function(){
        dataLayer.getTaskSet(function (dataSet) {
            res.send(dataSet); //resend taskList
        });
        //console.log("deleted task: " + req.params.id);
    });
});
/*
app.delete("/api/deleteTask/:id",function(req,res){
    dataLayer.deleteTask(req.params.id,function(){
        res.send(req.params.id);
        console.log("deleted task: " + req.params.id);
        
    });
});
*/

app.get("/api/getTaskSet",function(req, res){
    dataLayer.getTaskSet(function(dataSet){
        res.send(dataSet);
    });
});
