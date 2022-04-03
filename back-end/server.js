const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/music', {
  useNewUrlParser: true
});

//SONG schema & model
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: String,
});
const Song = mongoose.model('Song', songSchema);
//PLAYLIST schema & model
const playlistSchema = new mongoose.Schema({
  title: String,
  description: String,
  songs: Array,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

//SONGS CRUD
app.post('/api/songs', async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    duration: req.body.duration
  });
  console.log(song);
  try {
    await song.save();
    res.send(song);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    let songs = await Song.find();
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/songs/:id', async (req, res) => {
  try {
    await Song.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//PLAYLISTS CRUD
app.post('/api/playlists', async (req, res) => {
  const playlist = new Playlist({
    title: req.body.title,
    description: req.body.description,
    songs: req.body.songs
  });
  console.log(playlist);
  try {
    await playlist.save();
    res.send(playlist);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/playlists', async (req, res) => {
  try {
    let playlists = await Playlist.find();
    res.send(playlists);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//add song to playlist
app.put('/api/playlists/add/:id', async (req, res) => {
  try {
    let playlist = await Playlist.findOne({_id: req.params.id});
    let song = await Song.findOne({_id: req.body.songId});
    playlist.songs.push(song);
    playlist.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
//delete song from playlist
app.put('/api/playlists/delete/:id', async (req, res) => {
  try {
    let playlist = await Playlist.findOne({_id: req.params.id});
    for (var i = 0; i < playlist.songs.length; i++) {
      if (playlist.songs[i]._id == req.body.songId) {
        playlist.songs.splice(i, 1);
      }
    }
    playlist.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/playlists/:id', async (req, res) => {
  try {
    await Playlist.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(4000, () => console.log('Server listening on port 4000!'));
