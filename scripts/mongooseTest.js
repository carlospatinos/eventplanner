const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const app = express();

const { mongoServerUrl } = require('../util/config');

// var router = express.Router();
var viewPath = __dirname + '/views/'; // this folder should contain your html files.
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000


// Replace the uri string with your connection string.


// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoServerUrl);
}


app.get('/', (req, res) => {

  res.send('Hello World!');
  // res.sendFile(viewPath + "index.html");
})


app.listen(port, () => {
  console.log(`Event management app listening on port ${port}`)
});