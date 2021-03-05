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
    res.send(myPoints);
};

exports.addPoints = function (req, res) {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    res.send(req.body);
    res.send(myPoints);
};

exports.spendPoints = function (req, res) {
    res.send("NOT IMPLEMENTED: Site Home Page");
};
