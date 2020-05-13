const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

const PORT = process.env.PORT || 5000;

//init app
const app = express();

//Middleware
// app.use(bodyParser.urlencoded({
//   extended: false
// }))

// app.use(bodyParser.json())

// app.use(cors())

//Setting up the static directory
// app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});