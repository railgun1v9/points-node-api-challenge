const { body, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'addPoints': {
            return [
                body("payer", "payer is required").exists(),
                body("payer", "payer must be a string").isString(),
                body('points', 'points is required').exists(),
                body('points', 'points must be an integer').isInt(),
                body('timestamp', 'timestamp is required ').exists(),
                body('timestamp', 'timestamp must be a date').isISO8601()
            ];
        }
    }
}

exports.getPoints = function (req, res) {
    let result = {};
    myPoints.forEach(point => {
        if(!result[point.payer]) {
            // Initialize payer points
            result[point.payer] = 0; 
        }
        // Add points to payer
        result[point.payer] += point.points;
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
    res.send("NOT IMPLEMENTED: Site Home Page");
};
