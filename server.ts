import express from "express";
import { Request, Response } from "express";

import errorhandler from "errorhandler";
import bodyParser from "body-parser";

const app = express();
const isProd = process.env.NODE_ENV === "production";
// user bodyParaser to expose body on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers for cors
app.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  next();
});
// use errorHandler
if (!isProd) {
  app.use(errorhandler());
}
// fetch routes
app.use(require("./routes"));

// catch 404 errors and forward to error handler
app.use((req, res, next) => {
  interface BetterError extends Error {
    status?: number;
  }

  const err: BetterError = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: !isProd ? err : {}
    }
  });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port " + server.address());
});
