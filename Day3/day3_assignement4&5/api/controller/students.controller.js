const students = require("../data/school.json")

const getAll = function (req, res) {
    console.log(students);
    res.status(200).json(students);
}
const getOne = function (req, res) {
   
     var studentsArr = Object.values(students);
     res.status(200).json(studentsArr[parseInt(req.params.x)-1]);
   
}
module.exports = {
    getOne,getAll
}



 