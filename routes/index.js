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

let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: "https://localhost:3500",
});

/* GET home page. */
app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/callback', async (req,res) => {
    const { code } = req.query;
    console.log(code)
    try {
        var data = await spotifyApi.authorizationCodeGrant(code)
        const { access_token, refresh_token } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        res.redirect('http://localhost:3500');
    } catch(err) {
        res.redirect('/#/error/invalid token');
    }
});

app.get('/playlists', async (req,res) => {
    try {
        var result = await spotifyApi.getUserPlaylists();
        console.log(result.body);
        res.status(200).send(result.body);
    } catch (err) {
        res.status(400).send(err)
    }

});


// app.get('/', function(req, resp) {
//   resp.header('Access-Control-Allow-Origin', '*');
//   resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
//
//   // your application requests authorization
//   let authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       Authorization:
//           'Basic ' +
//           new Buffer(client_id + ':' + client_secret).toString('base64')
//     },
//     form: {
//       grant_type: 'client_credentials'
//     },
//     json: true
//   };
//
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       //resp.json({ token: body.access_token });
//       auth_token = body.access_token;
//       console.log(auth_token);
//     }
//   });
//
//   var playlistTest = {
//       url: 'https://api.spotify.com/v1/playlists/43ZHCT0cAZBISjO8DG9PnE/tracks',
//       headers: {
//           Authorization:
//               'Bearer ' + auth_token
//       },
//       form: {
//           grant_type: 'client_credentials'
//       },
//       json: true
//   };
//
//   request.get(playlistTest, function(error, response, body) {
//       //resp.json({ tracks: body.tracks });
//       var tracks = body.tracks;
//       console.log(tracks);
//   });
//
//   resp.sendFile(path.join(__dirname, '../views/index.html'));
//
// });

////////////////////////////////////////////////////////////////////////////////////
/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index');
// });

// let spotifyApi = new SpotifyWebApi({
//     clientId: 'a88350ce46434eb69ef3df2cab4a940f',
//     clientSecret: '16def6c1939b49e5bcab25cb5040c9fb',
//     redirectUri: 'http://localhost:3500',
// });
//
// spotifyApi.clientCredentialsGrant()
//     .then(function (data) {
//         console.log('The access token expires in ' + data.body['expires_in']);
//         console.log('The access token is ' + data.body['access_token']);
//
//         // Save the access token so that it's used in future calls
//         spotifyApi.setAccessToken(data.body['access_token']);
//         //auth_token = data.body['access_token'];
//     }, function (err) {
//         console.log('Something went wrong when retrieving an access token', err.message);
//     });
//
//
// // Get Elvis' albums
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function (data) {
//         console.log('Artist albums', data.body);
//     },
//     function (err) {
//         console.error(err);
//     }
// );

let server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  //server.close(function() {console.log('Port is closed');});
});

module.exports = router;
