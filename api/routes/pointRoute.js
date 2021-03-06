var express = require("express");
var router = express.Router();

var pointController = require("../controllers/pointController");

/// POINT ROUTES ///

// Get points
router.get("/point", pointController.getPoints);

// Add points
router.post(
    "/point",
    pointController.validate("addPoints"),
    pointController.addPoints
);

// Spend points
router.post(
    "/point/spend",
    pointController.validate("spendPoints"),
    pointController.spendPoints
);

module.exports = router;
