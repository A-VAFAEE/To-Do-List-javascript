/**
 * Introduction to Computing: A Net-centric Approach

=== EECS Fall 2024 ===
Lassonde School of Engineering

=== Module Description ===
This is the back end code for a simple distributed web application.
It reponds to API calls from a client.
**/

'use strict'; //in strict mode, scope of variables needs to be well defined 

const express = require('express'); //to run a server application
const fs = require("fs"); //to read and write to a file
const cors = require("cors"); //to get around cors issues.  browsers may restrict cross-origin HTTP requests initiated from scripts!
const port = 8080;
const app = express();
var tasks = [];

app.use(cors()); //manage cors headers
app.use(express.json()); //messages will be passed in JSON
app.use(express.urlencoded({ extended: true }));


// Function 1
function appendTask(task) {
  tasks.push(task);
  return tasks;
}

function removeTask(index) {
  tasks.splice(index, 1);
  return tasks;
}

function getNumberOfTasks() {
  return tasks.length;
}

//route or endpoint
app.get('/', (req, res) => {
  res.send("hello");  
});

// add the task
app.get('/api/appendTask', (req, res) => {
  // send the response to the client	
  res.header("Access-Control-Allow-Origin", "*");
  var task = {"category": req.query.category, "text": req.query.text, "isDone": req.query.isDone, "priority": req.query.priority};
  appendTask(task);
  ///res.send("goodbye"); 
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
  removeTask(req.query.index);
});

// get the number of tasks
app.get('/api/numTask', (req, res) => {
  // send the response to the client	
  res.header("Access-Control-Allow-Origin", "*");
  
  res.send([{length: getNumberOfTasks()}]);  
});


//listen for requests
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
}); //server will need to listen ... all the time!!

// ADD THE LINE BELOW TO RUN TESTS
// export { appendTask, removeTask, getNumberOfTasks }
