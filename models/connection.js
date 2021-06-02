let mongoose = require('mongoose');
require('dotenv').config();

let options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// URI_BDD Credentials
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
const URI_BDD = `mongodb+srv://${username}:${password}@cluster0.9rdyy.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(URI_BDD, options, (err) => {
  console.log(err);
});

module.exports = mongoose;
