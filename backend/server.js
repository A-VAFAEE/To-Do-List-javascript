/**
 * Introduction to Computing: A Net-centric Approach

=== EECS Fall 2024 ===
Lassonde School of Engineering

=== Module Description ===
This is the back end code for a simple distributed web application.
It reponds to API calls from a client.
**/

'use strict'; //in strict mode, scope of variables needs to be well defined 

const express = require('express');
const port = 8080;
const app = express();
var tasks = [];

//route or endpoint
app.get('/', (req, res) => {
  res.send("hello");  
});

// add the task
app.get('/api/appendTask', (req, res) => {
  // send the response to the client	
  res.header("Access-Control-Allow-Origin", "*");
  var task = {"category": req.query.category, "text": req.query.text, "isDone": req.query.isDone, "priority": req.query.priority};
  tasks.push(task);
  ///res.send("goodbye"); 
  console.log(task); 
});

// get the task
app.get('/api/getTask', (req, res) => {
  // send the response to the client	
  res.header("Access-Control-Allow-Origin", "*");

  var response = '';
  if (tasks.length > 0)  {
    response += JSON.stringify(tasks);
    for (let i=1; i < tasks.length; i++) {
      response += ',' + JSON.stringify(tasks);
    }
  }
  
  res.send(tasks);  
});

// delete the task
app.get('/api/deleteTask', (req, res) => {
  // send the response to the client	
  res.header("Access-Control-Allow-Origin", "*");
  // var task = {"category": req.query.category, "text": req.query.text, "isDone": req.query.isDone, "priority": req.query.priority};
  
  var index = req.query.index;
  tasks.splice(parseInt(index), 1);
});

// get the number of tasks
app.get('/api/numTask', (req, res) => {
  // send the response to the client	
  res.header("Access-Control-Allow-Origin", "*");
  
  res.send([{length: tasks.length}]);  
});


//listen for requests
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
}); //server will need to listen ... all the time!!
