/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static("website"));

const port = 3000;
//callback function to let us know server is running
function listening(){
  console.log(`Running on localhost:${port}`);
};
//function to listen to server on port 3000
app.listen(port, listening);

//post route server-side
function postData(req, res){
  projectData = req.body;
  //respond with data in projectData object then log it
  res.send(projectData);
  console.log(projectData);
};

app.post('/add', postData);


//get route server-side
function sendData (request, response) { 
  response.send(projectData);
};

app.get('/all', sendData);

