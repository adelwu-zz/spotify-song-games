const express = require('express');
const request = require('request');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const path = require("path");

app = express()

app.set('port', 3500);

let auth_token = '';
const client_id = 'a88350ce46434eb69ef3df2cab4a940f';
const client_secret = '16def6c1939b49e5bcab25cb5040c9fb';


app.get('/', function(req, resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

    let spotifyApi = new SpotifyWebApi();

  // your application requests authorization
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization':
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      auth_token = body.access_token;
      spotifyApi.setAccessToken(auth_token);
      console.log(auth_token);

        var playlistTest = {
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization:
                    'Bearer ' + auth_token
            },
            json: true
        };

        // Get Top US 50 Playlist
        spotifyApi.getPlaylist('37i9dQZEVXbLRQDuF5jeBp').then(
            function (data) {
                console.log('Tracks here:', data.body);
            },
            function (err) {
                console.error(err);
            }
        );


    }
  });

  //renders index file
  resp.sendFile(path.join(__dirname, '../views/index.html'));

});


let server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  //server.close(function() {console.log('Port is closed');});
});

module.exports = router;
