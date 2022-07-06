const mongoose = require("mongoose");
require("../data/album-model");
const Album = mongoose.model("Albums");
require("dotenv").config();


var response = { status: "", message: "" };

const _sendResponse = function (res) {
    res.status(response.status).json(response.message);
}

const _positiveResponse = function (album) {
    response.status = process.env.HTTP_OK;
    response.message = album;
}

const _errorResponse = function (err) {
    response.status = process.env.HTTP_GENERIC_ERROR;
    response.message = err;
}

const getAll = function (req, res) {
    console.log("getall");
    let offset = parseInt(process.env.OFFSET);
    let count = parseInt(process.env.COUNT);
    let maxCount = parseInt(process.env.MAX_COUNT);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(process.env.HTTP_BAD_REQUEST).json({ "message": process.env.QUERYSTRING_ERROR });
        return;
    }
    if (count > maxCount) {
        res.status(process.env.HTTP_BAD_REQUEST).json({ "message": process.env.COUNT_ERROR  + count });
        return;
    }
    Album.find().skip(offset).limit(count).exec()
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));
}

const getOne = function (req, res) {
    const albumId = req.params.albumId;
    Album.findById(albumId).exec()
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));

}

const addOne = function (req, res) {
    console.log("Album AddOne request");
    console.log(req.body);
    const newAlbum = {
        title: req.body.title,
        year: parseInt(req.body.year),
        artist: req.body.artist,
        songs: [],
    };
    Album.create(newAlbum)
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res))
}



const _fullUpdateResponse = function (req, album) {
    return new Promise(function (resolve, reject) {
        if (album) {
            album.title = req.body.title;
            album.year = parseInt(req.body.year);
            album.artist = req.body.artist;
            album.songs = req.body.songs;
            resolve(album.save()
                .then(_positiveResponse)
                .catch(_errorResponse));
        }
        else {
            reject();
        }
    });
   
}


const fullUpdateOne = function (req, res) {
    console.log("Full Update One Album Controller");
    const albumId = req.params.albumId;

    Album.findById(albumId).exec()
        .then((album)=>_fullUpdateResponse(req,album))
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));

}


const _partialUpdateResponse = function (req, album) {
    return new Promise(function (resolve, reject) {
        if (album) {
            if (req.body.title) {
                album.title = req.body.title;
            }
            if (req.body.year) {
                album.year = parseInt(req.body.year);
            }
            if (req.body.artist) {
                album.artist = req.body.artist;
            }
            if (req.body.songs) {
                album.songs = req.body.songs;
            }
            console.log(album);
            resolve(album.save()
                .then(_positiveResponse)
                .catch(_errorResponse));
        }
        else {
            reject();
        }
    });


}

const partialUpdateOne = function (req, res) {
    console.log("Partial Update One Album Controller");

    const albumId = req.params.albumId;
    Album.findById(albumId).exec()
        .then((album)=>_partialUpdateResponse(req,album))
        .catch((error)=> _errorResponse(error))
        .finally(() => _sendResponse(res));
}


const deleteOne = function (req, res) {
    const albumId = req.params.albumId;
    Album.findByIdAndDelete(albumId).exec()
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));
}


module.exports = {
    getOne,
    getAll,
    addOne,
    fullUpdateOne,
    partialUpdateOne,
    deleteOne

}



