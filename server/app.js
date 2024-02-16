// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data.js');

const express = require('express');
const app = express();

// Your code here
app.use(express.json());

app.use((req, res, next) => {
  console.log('Body', req.body);
  next();
})

app.get('/artists', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getAllArtists());
})

app.post('/artists', (req, res) => {
  res.status(201)
    .send(addArtist(req.body));
})

app.get('/artists/latest', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getLatestArtist());
})

app.get('/artists/latest/albums', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getAlbumsForLatestArtist());
})

app.get('/artists/:artistId', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getArtistByArtistId(req.params.artistId));
})

app.put('/artists/:artistId', editArtistHandler);
app.patch('/artists/:artistId', editArtistHandler);

function editArtistHandler(req, res) {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(editArtistByArtistId(req.params.artistId, req.body));
}

app.delete('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  if (getArtistByArtistId(artistId)) {
    deleteArtistByArtistId(artistId);

    res.status(200)
      .set('Content-Type', 'application/json')
      .send({ message: "Successfully deleted" })
  }

})

app.get('/artists/:artistId/albums', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getAlbumsByArtistId(req.params.artistId));
})

app.get('/albums/:albumId', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getAlbumByAlbumId(req.params.albumId));
})

app.post('/artists/:artistId/albums', (req, res) => {
  res.status(201)
    .set('Content-Type', 'application/json')
    .send(addAlbumByArtistId(req.params.artistId, req.body));
})

app.put('/albums/:albumId', editAlbumHandler)
app.patch('/albums/:albumId', editAlbumHandler);

function editAlbumHandler(req, res) {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(editAlbumByAlbumId(req.params.albumId, req.body));
}

app.delete('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  if (getAlbumByAlbumId(albumId)) {
    deleteAlbumByAlbumId(albumId);

    res.status(200)
      .set('Content-Type', 'application/json')
      .send({ message: "Successfully deleted" })
  }
})

app.get('/albums', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getFilteredAlbums(req.query.startsWith));
})

app.get('/songs/:songId', (req, res) => {
  res.status(200)
    .set('Content-Type', 'application/json')
    .send(getSongBySongId(req.params.songId));
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
