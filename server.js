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
global.myPoints = [
    { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
    { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z" },
    { payer: "DANNON", points: -200, timestamp: "2020-10-31T15:00:00Z" },
    {
        payer: "MILLER COORS",
        points: 10000,
        timestamp: "2020-11-01T14:00:00Z",
    },
    { payer: "DANNON", points: 300, timestamp: "2020-10-31T10:00:00Z" },
];

// Register routes
var pointRouter = require("./api/routes/pointRoute");
app.use("/", pointRouter);

app.listen(port);

console.log("Points API server started on: " + port);
