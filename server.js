// Create express app
const express = require("express");
const db = require("./database.js");
const app = express();
const errorhandler = require("errorhandler");

const bodyParser = require("body-parser");
const isProd = process.env.NODE_ENV === "prod";

// user bodyParaser to expose body on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers for cors
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});
// use errorHandler
if (!isProd) {
  app.use(errorhandler());
}
// fetch routes
app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProd) {
  app.use(function(err, req, res) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const server = app.listen(process.env.PORT || 8000, function() {
  console.log("Listening on port " + server.address().port);
});
