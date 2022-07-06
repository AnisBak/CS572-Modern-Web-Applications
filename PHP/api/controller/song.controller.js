const mongoose = require("mongoose");
const Album = mongoose.model(process.env.GAME_MODEL);


var response = { status: "", message: "" };


const _sendResponse = function (res) {
    res.status(response.status).json(response.message);
}

const _positiveResponse = function (object) {
    response.status = process.env.HTTP_OK;
    response.message = object;
}

const _errorResponse = function (err) {
    response.status = process.env.HTTP_GENERIC_ERROR;
    response.message = err;
}


const getAll = function (req, res) {
    console.log("GET Songs Controller");
    const albumId = req.params.albumId;
    Album.findById(albumId).select("songs").exec()
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(function () {
            res.status(response.status).json(response.message);
        });
}
const _getOneSong = function (songId, album) {
    return album.songs.id(songId);
  
}

const getOne = function (req, res) {
    console.log("GET One Songs Controller");
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    Album.findById(albumId).exec()
        .then((album)=>_getOneSong(songId, album))
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));
}


const _addSongs = function (album, req, res) {
    album.songs.push({
        title: req.body.title,
        length: _sToMS(parseInt(req.body.length))
    })
    album.save()
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));
}

const addOne = function (req, res) {
    console.log("Add one song Controller");
    const albumId = req.params.albumId;
    console.log(req.params.albumId);
    Album.findById(albumId).exec()
        .then((album) => _addSongs(album, req, res))
    
}

const _sToMS = function (seconds) {
    const minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return (minutes + ":" + seconds);
}

const _deleteOne = function (songId, album, res) {
    album.songs.id(songId).remove();
    album.save()
        .then(_positiveResponse)
        .catch(_errorResponse)
        .finally(() => _sendResponse(res));
}



const _partialUpdateResponse = function (res, req, album, songId) {
    return new Promise(function (resolve, reject) {
        if (album) {
            console.log(album.songs.id(songId));
            if (req.body.title) {
                album.songs.id(songId).title = req.body.title;
            }
            if (req.body.length) {
                album.songs.id(songId).length = _sToMS(parseInt(req.body.length));
            }
            resolve(album.save()
                .then(_positiveResponse)
                .catch(_errorResponse)
                .finally(() => _sendResponse(res)));
        }
        else {
            reject();
        }
    });
}
const partialUpdateOne = function (req, res) {
    console.log("Partial Update One Song Controller");
    const songId = req.params.songId;
    const albumId = req.params.albumId;
    Album.findById(albumId).exec()
        .then((album) => _partialUpdateResponse(res, req, album, songId))
        
}
const deleteOne = function (req, res) {
    console.log("Delete one song Controller");
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    Album.findById(albumId).exec()
        .then((album) => _deleteOne(songId, album, res))
}
module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    partialUpdateOne
}