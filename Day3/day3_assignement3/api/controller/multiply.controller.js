

module.exports.get = function (req, res) {
    let result;
    if (req.query && req.query.secondNumber)
        result = parseInt(req.params.firstNumber) * parseInt(req.query.secondNumber);
    console.log(result);
    res.status(200).send(JSON.stringify(result));
}



 