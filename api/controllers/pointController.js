const { body, validationResult } = require("express-validator");
var pointService = require("../services/pointService");

exports.validate = (method) => {
    switch (method) {
        case "addPoints": {
            return [
                body("payer", "payer is required").exists(),
                body("payer", "payer must be a string").isString(),
                body("points", "points is required").exists(),
                body("points", "points must be an integer").isInt(),
                body("timestamp", "timestamp is required ").exists(),
                body("timestamp", "timestamp must be a date").isISO8601(),
            ];
        }
        case "spendPoints": {
            return [
                body("points", "points is required").exists(),
                body("points", "points must be an integer").isInt(),
            ];
        }
    }
};

exports.getPoints = function (req, res) {
    let result = {};
    myPoints.forEach((element) => {
        if (!result[element.payer]) {
            // Initialize payer points
            result[element.payer] = 0;
        }
        // Add points to payer
        result[element.payer] += element.points;
    });
    res.json(result);
};

exports.addPoints = function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    // Convert request back to integer
    req.body.points = parseInt(req.body.points);
    // Save points into datastore
    myPoints.push(req.body);
    // Return response
    res.json(myPoints);
};

exports.spendPoints = function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    // Convert request back to integer
    let pointsToSpend = parseInt(req.body.points);

    // Check balance before spending
    if (pointService.getTotalBalance() < pointsToSpend) {
        res.status(402).json({ message: "Balance is insufficient." });
        return;
    }

    // Call service
    let result = pointService.spendPoints(pointsToSpend);
    // Return response
    res.json(result);
};
