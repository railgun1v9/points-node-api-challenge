const express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// configure the app to use bodyParser()
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

// Initialize datastore
global.myPoints = [];

// Register routes
var pointRouter = require("./api/routes/pointRoute");
app.use("/", pointRouter);

app.listen(port);

console.log("Points API server started on: " + port);
