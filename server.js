const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const corsOptions = {
  origin: ["http://localhost:8080"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const exampleRoutes = require("./app/routes/exampleRoutes");

// db.sequelize.sync();

exampleRoutes(app)

// set port, listen for requests
const PORT = process.env.PORT || 7878;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// open this to run test and set comment for the app.listen, dont forget to change the database in ../models/index.js name before run test
module.exports = app