require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

const moment = require('moment');
const axios = require('axios');
const fs = require('fs');
var base_omdb_url = "http://www.omdbapi.com/?apikey=" + keys.omdb.api_key + "&";

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data); 
//   });

// =========================================
function runSpotify() {
    var songName = "";
    for (i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
    }

    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var mainPath = data.tracks.items[0];
        var artistPath = JSON.stringify(mainPath.album.artists[0].name, null, 2);
        var songPath = JSON.stringify(mainPath.name);
        var albumPath = JSON.stringify(mainPath.album.name);
        var previewPath = JSON.stringify(mainPath.preview_url);

        console.log("\n============================================\n");
        console.log("\nTrack title: " + songPath);
        console.log("\nArtist: " + artistPath);
        console.log("\nAlbum: " + albumPath);
        console.log("\nSpotify preview: " + previewPath);
        console.log("\n============================================\n");
    });
}

// =========================================
function runOMDB() {
    var movieName = "";
    for (i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {

        var data = JSON.parse(body);

        console.log("\n============================================\n");
        console.log("\nTitle: " + data.Title);
        console.log("\nRelease date: " + data.Released);
        console.log("\nIMDB rating: " + data.Ratings[0].Value);
        console.log("\nRotten Tomatoes rating: " + data.Ratings[1].Value);
        console.log("\nCountry: " + data.Country);
        console.log("\nLanguage: " + data.Language);
        console.log("\nPlot summary: " + data.Plot);
        console.log("\nStarring: " + data.Actors);
        console.log("\n============================================\n");
    })
}

// =========================================
function fooBar() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        var dataArr = data.split(',');
        var songName = dataArr[1];

        spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var mainPath = data.tracks.items[0];
            var artistPath = JSON.stringify(mainPath.album.artists[0].name, null, 2);
            var songPath = JSON.stringify(mainPath.name);
            var albumPath = JSON.stringify(mainPath.album.name);
            var previewPath = JSON.stringify(mainPath.preview_url);

            console.log("\n============================================\n");
            console.log("\nTrack title: " + songPath);
            console.log("\nArtist: " + artistPath);
            console.log("\nAlbum: " + albumPath);
            console.log("\nSpotify preview: " + previewPath);
            console.log("\n============================================\n");
        });
    })
}