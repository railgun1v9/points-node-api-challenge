exports.spendPoints = function (pointsToSpend) {
    // Sort points by oldest timestamps first
    myPoints.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

    // Initialize spent points array for spending tracking
    let spentPoints = [];

    myPoints.forEach((element) => {
        if (pointsToSpend > 0) {
            // Check if spending these points will make payer go negative
            let payerPointsRemaining =
                getPointsByPayer(element.payer) - element.points;
            if (payerPointsRemaining >= 0) {
                // Check if current point object more than enough to pay off pointsToSpend
                if (element.points > pointsToSpend) {
                    // Add point object to spentPoints array
                    spentPoints.push({
                        payer: element.payer,
                        points: pointsToSpend,
                    });
                    // Subtract pointsToSpend from current point object
                    element.points -= pointsToSpend;
                    pointsToSpend = 0;
                } else {
                    // Add point object to spentPoints array
                    spentPoints.push({
                        payer: element.payer,
                        points: element.points,
                    });
                    // Subtract from pointsToSpend
                    pointsToSpend -= element.points;
                    // Update point object after spending all points
                    element.points = 0;
                }
            }
        }
    });

    let result = {};
    spentPoints.forEach((element) => {
        if (!result[element.payer]) {
            // Initialize payer points
            result[element.payer] = 0;
        }
        // Subtract points from payer
        result[element.payer] -= element.points;
    });
    return result;
};

exports.getTotalBalance = function () {
    let result = 0;
    myPoints.forEach((element) => {
        result += element.points;
    });
    return result;
};

function getPointsByPayer(payer) {
    let result = 0;
    myPoints.forEach((element) => {
        if (element.payer == payer) {
            result += element.points;
        }
    });
    return result;
}
