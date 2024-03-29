const express = require("express");
const app = express();

app.get(
  "/user/:id",
  function(req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  function(req, res, next) {
    // send a regular response
    res.send("regular");
  }
);

app.get("/user/:id", [
  function(req, res, next) {
    console.log("pretty special");
    next("route");
  },
  function(req, res, next) {
    res.send("special");
  }
]);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", function(req, res, next) {
  res.send("so special");
});

app.listen(8080);
