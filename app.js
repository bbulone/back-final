var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var express = require("express");
var cors = require("cors");
var pianoRouter = require("./routes/piano");

var app = express();
var mongoose = require("mongoose");

var dev_db_url =
  "mongodb+srv://benjamin:benjamin@piano.utksb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// CONNEXIONN STRING
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;

var app = express();

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/piano", pianoRouter);
app.use(cors());

module.exports = app;
