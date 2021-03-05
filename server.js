const express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

global.myPoints = [
    { payer: "DANNON", points: -100 },
    { payer: "UNILEVER", points: -200 },
    { payer: "MILLER COORS", points: -4700 },
];

// Register routes
var pointRouter = require('./api/routes/point');
app.use('/', pointRouter);

app.listen(port);

console.log("Points API server started on: " + port);
