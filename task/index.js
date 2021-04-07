var express = require('express');
var  app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.post('/test2.html', urlencodedParser, function (req, res){
    var message ={
        id: Date.now(),
        text: JSON.parse('"' + req.body.text + '"')
    }
    console.log(req.body)
    putText(message)
    return console.log('completed')
    function putText(text){
        db.collection('words').insertOne(text, function (err, res){
            if(err){

                return console.log(err)
            }
        })

    }
})


app.get('/test2.html', function (req, res){
    res.sendFile(__dirname + '/test2.html');
})

app.get('/test1.html', function (req, res){
    res.sendFile(__dirname + '/test1.html');
})

app.get('/index.js', function (req, res){
    res.sendFile(__dirname + '/jsone.js');
})


MongoClient.connect('mongodb://localhost:27017/', function (err, database){
    if(!err){
        db = database.db('mydb');
        app.listen(3000, function (){
            console.log('API started')
        })

    }


})


