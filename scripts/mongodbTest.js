const express = require('express');
const { MongoClient } = require("mongodb");
const path = require('path');
const app = express();

const { mongoServerUrl } = require('../util/config');

// var router = express.Router();
var viewPath = __dirname + '/views/'; // this folder should contain your html files.
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000


// Replace the uri string with your connection string.
const client = new MongoClient(mongoServerUrl);
async function run() {
  try {
    const database = client.db('eventmanagement');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {

  res.send('Hello World!');
  // res.sendFile(viewPath + "index.html");
})


app.listen(port, () => {
  console.log(`Event management app listening on port ${port}`)
});