const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist : req.user.id,
        musics : musics
    })

    res.status(201).json({
        message: "Album created successfully",
        album : {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics : album.musics,
        }
    })
}

async function getAllMusics(req, res){
     // .populate() is a Mongoose method that replaces a raw ObjectId 
     // with the actual document data from another collection Mongoose Docs.

     // populate("artist"); -> give the whole data of "artist"
     // populate("artist", "username email"); -> give only the username and email of "artist"
     const musics = await musicModel
        .find()
        .skip(1)
        .limit(2)
        .populate("artist", "username email")


     res.status(200).json({
        message : "Music Fetched Successfully",
        musics : musics
     })
}

async function getAllAlbums(req, res){
    const albums = await albumModel.find().populate("artist", "username email");

    res.status(200).json({
       message : "Albums Fetched Successfully",
       albums : albums,
    })
}

async function getAlbumById(req, res){
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics");

    res.status(200).json({
       message : "album fetched successfully",
       album : album
    })
}
module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };
