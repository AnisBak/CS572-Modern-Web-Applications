
require("dotenv").config();
const mongoose = require("mongoose");
require("../data/jobs-model");
const Job = mongoose.model("Job");

const _runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    console.log(lat," ",lng);
    
    const point = { type: "Point", coordinates: [lng, lat] };
    const query = {
        "location.coordinates":        
        {
            $near: {
                $geometry: point,
                /*parseFloat(process.env.GEO_SEARCH_MAX_DIST, 10)*/
                $minDistance: 0.111,
                $maxDistance: 800//parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10)
            }
        }
    };
    Job.find(query).limit(parseFloat(process.env.DEFAULT_FIND_COUNT, 10)).exec(function (err, jobs) {
        if (err) {
            console.log("Geo error ", err);
            res.status(200).json(err);
        }
        else {
            console.log("Geo results", jobs);
            res.status(200).json(jobs);
        }
    });
}

const getAll = function (req, res) {
    console.log("GET all jobs Controller");
    let offset = process.env.OFFSET;
    let count = process.env.COUNT;
    let maxCount = process.env.MAX_COUNT;

    if (req.query && req.query.lat && req.query.lng) {
        
        _runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryStrings should be numbers" });
        return;
    }

    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of" + maxCount });
        return;
    }

    Job.find().skip(offset).limit(count).exec(function (err, jobs) {
        console.log("In the getAll Controller");

        if (err) {
            console.log("Error finding jobs");
            res.status(500).json(err);
        }
        else {
            console.log("Found jobs", jobs.length);
            res.status(200).json(jobs);
        }
    });

}

const getOne = function (req, res) {
    console.log("GET one job Controller");
    const jobId = req.params.jobId;
    
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Error finding the job");
            res.status(500).json(err);
        } else if (!job) {
            console.log("Job id not found");
            res.status(404).json({ "Message": "Job ID not found" });
        } else {
            console.log("Found job", job);
            res.status(200).json(job);
        }
    })
}
const getOneBySkill = function (req, res) {
    console.log("GET one job Controller");
    const skill = req.params.skill;
    console.log("shhhhhhhhhh",req.params.skill);
    const query = {
        "skills": skill       
    };
    Job.find(query).exec(function (err, job) {
        if (err) {
            console.log("Error finding the job");
            res.status(500).json(err);
        } else if (!job) {
            console.log("Job id not found");
            res.status(404).json({ "Message": "Job ID not found" });
        } else {
            console.log("Found job", job);
            res.status(200).json(job);
        }
    })
}
const addOne = function (req, res) {
    console.log("POST addOne request");
    const skills = req.body.skills
    const skillsArray = skills.split(" ");
    const newJob = {
        title: req.body.title,
        salary: parseFloat(req.body.salary),
        description: req.body.description,
        experience: parseFloat(req.body.experience),
        location: {
            address: req.body.address
        },
        skills: skillsArray ,
        postDate: Date.now()
    };
    Job.create(newJob, function (err, job) {
        const response = { status: 201, message: job };
        if (err) {
            console.log("Error creating job");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

const _updateOne = function (req, res, updateJobCallback) {

    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (err, job) {
        const response = { status: 204, message: job };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else if (!job) {
            console.log("Job id not found");
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            updateJobCallback(req, res, job, response);
        }
    });
}

const _fullJobUpdate = function (req, res, job, response) {
    job.title = req.body.title;
    job.salary = parseFloat(req.body.salary);
    job.description = req.body.description;
    job.experience = parseFloat(req.body.experience);
    job.location.address = req.body.address;
    console.log(req.body.address);
    job.skills = req.body.skills;

    job.save(function (err, updatedJob) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 201;
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
    });

}

const fullUpdate = function (req, res) {
    console.log("Full Update job Controller");
    _updateOne(req, res, _fullJobUpdate);

}

const _partialUpdate = function (req, res, job, response) {

    if (req.body.title) {
        job.title = req.body.title;
    }
    if (req.body.salary) {
        job.salary = parseFloat(req.body.salary);
    }
    if (req.body.description) {
        job.description = req.body.description;
    }
    if (req.body.experience) {
        job.experience = parseFloat(req.body.experience);
    }
    if (req.body.address) {
        job.location.address = req.body.address;
    }
    if (req.body.skills) {
        job.skills = req.body.skills;
    }

    job.save(function (err, updatedJob) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 201;
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
    });
}

const partialUpdate = function (req, res) {
    console.log("Partial Update One Job Controller");

    _updateOne(req, res, _partialUpdate);
}

const deleteOne = function (req, res) {
    const jobId = req.params.jobId;
    Job.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
        const response = { status: 204, message: deletedJob };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else if (!deletedJob) {
            console.log("Job id not found");
            response.status = 404;
            response.message = {
                "message": "Job ID not found"
            };
        }
        else {
            response.status = 200;
        }
        res.status(response.status).json(response.message);

    });
}



module.exports = {
    getAll,
    getOne,
    addOne,
    fullUpdate,
    partialUpdate,
    deleteOne,
    getOneBySkill

}