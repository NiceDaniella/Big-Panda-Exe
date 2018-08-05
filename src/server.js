const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/test';
const collectionName = 'commentsListApp';
const dbName = 'test';

app.use(bodyParser());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => {
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection(collectionName).find().toArray(function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});
app.post('/addComment', (req, res)=> {
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var myobj = req.body;
		dbo.collection(collectionName).insert(myobj, function(err, result) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});
app.listen(3000, () => console.log('app listening on port 3000!'));