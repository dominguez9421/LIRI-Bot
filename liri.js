require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// const moment = require('moment');
// const axios = require('axios');
// const fs = require('fs');
// var base_omdb_url = "http://www.omdbapi.com/?apikey=" + keys.omdb.api_key + "&";

var getArtistsNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function (songName) {

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.track.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s):' + songs[i].artists.map(
                getArtistsNames));
                console.log('song name: ' + songs [i].name);
                console.log('preview song:' + songs[i].preview_url);
                // console.log(':' + songs[i].
        }
    });

}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
            default:
                console.log('LIRI does not know that');
    }
}
