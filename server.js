console.log('app started');
const express=require('express');
const status = require('http-status');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const { DB } = require('./config');

// app creation & set up
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
const url =`${DB.HOST}:${DB.PORT}`;
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    if(err) throw err;
    //assert.equal(null, err);
    console.log("Connected successfully to server");  
    const db = client.db(DB.NAME);  
    db.collection('demo').insert({demo: 'test'});
    client.close();
  });
  

//routes
//app.method(route,callback)

//app.get('/',(req, res)=> {
   // res.send('Hello World');
  // res.status(status.NO_CONTENT).json({'test': 'demo', 'data' : 'new data'});
//});

//app.get('/:id?',(req, res)=> {
    // res.send('Hello World');
    //res.status(status.OK).json(
      //  {'testdata': 'demo', 'data' : 'new data', id: req.params}
      //  );
 //});

 app.get('/:id',(req, res)=> {
    // res.send('Hello World');
    res.status(status.OK).json(
        {'testdata': 'demo', 'data' : 'new data', id: req.params}
        );
 });


app.post('/', (req, res) => {
    res.json( { body: req.body });
});
//server starts here 
app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('app started on http://localhost:3000');
});

