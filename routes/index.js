const express = require('express');
const request = require('request');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');


app = express()

app.set('port', 3500);

let auth_token = '';
//
//
// app.get('/', function(req, resp) {
//   resp.header('Access-Control-Allow-Origin', '*');
//   resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
//
//   var client_id = 'a88350ce46434eb69ef3df2cab4a940f';
//   var client_secret = '16def6c1939b49e5bcab25cb5040c9fb';
//
//   // your application requests authorization
//   var authOptions = {
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
//       resp.json({ token: body.access_token });
//       auth_token = body.access_token;
//       console.log(auth_token);
//     }
//   });
// });

//let spotifyApi = new SpotifyWebApi();
//spotifyApi.setAccessToken(auth_token); //set access token

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');

let spotifyApi = new SpotifyWebApi({
  clientId: 'a88350ce46434eb69ef3df2cab4a940f',
  clientSecret: '16def6c1939b49e5bcab25cb5040c9fb',
  redirectUri: 'http://localhost:3500',
});

spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      //auth_token = data.body['access_token'];
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });


// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
);

let server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  //server.close(function() {console.log('Port is closed');});
});

module.exports = router;
