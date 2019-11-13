
require("dotenv").config();

//variables//
var axios = require("axios");
// concert //
var moment = require("moment");
//music //
var Spotify = require('node-spotify-api');

//keys//
var keys = require("./keys.js");
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var searchType = process.argv.splice(3).join();


//Statements for user input//

//OMDB//
if (input === 'movie-this') {
    movieThis(searchType);
}
//BANDS IN TOWN//
else if (input === 'concert-this') {
    concertThis(searchType);
}
//SPOTIFY//
else if (input === 'spotify-this-song') {
    spotifyTrack(searchType);
}
else if (input === 'do-what-it-says') {
    doWhatItSays(searchType);
}
else {
    console.log('LIRI doesnt know that!');

}


//OMDB FUNCTION//
function movieThis(movie) {
    //sample text movie when the input movie this is typed 
    var movieQuery = movie || "Mr. Nobody"

    axios.get("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(function (response) {

        var divider = "\n------------------------------------------------------------\n\n";
        var jsonData = response.data;

        if (jsonData.title != undefined) {
        }
        else {
        }
         // data that will be retrieved when the user requests for movie info
        var movieData = [
            "Title: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "imdb Rating: " + jsonData.imdbRating,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Cast: " + jsonData.Actors,
        ].join("\n\n");
        // appending the information to the log txt so the data is saved
        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(divider + movieData);
        });
    })

};



/////BANDS IN TOWN FUNCTION/////
var concertThis = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            var jsonData = response.data;

            if (!jsonData.length) {
                console.log("No results found for " + artist);
                return;
            }

            console.log("Upcoming concerts for " + artist + ":");

            for (var i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];
                // will display the venue, city, and region along with the country and format. 
                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );

                fs.appendFile("log.txt", jsonData.length + divider, function (err) {
                    if (err) throw err;
                    console.log(divider + jsonData.length);
                });
            }
        }
    );
};



///SPOTIFY FUNCTION/////
function spotifyTrack(track) {

    console.log(track);

    spotify.search({ type: 'track', query: track }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var jsonData = response.tracks;
        console.log(jsonData);
        //looping thourgh the array of objects and obtaining the information requested
        for (var i = 0; i < 5; i++) {
            var divider = "\n------------------------------------------------------------\n\n";
            var trackInfo = [
                "\nArtist: " + jsonData.items[i].artists[0].name,
                "\nTrack Name: " + jsonData.items[i].name,
                "\nAlbum Name: " + jsonData.items[i].album.name,
                "\nPreview Track: " + jsonData.items[i].preview_url,
            ]

            console.log(divider + trackInfo);

            // appendinf to log text file 
            fs.appendFile("log.txt", trackInfo + divider, function (err) {
                if (err) throw err;
                console.log(divider + trackInfo);
            });
        }
    })

};




function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, response) {
        if (err) throw err

        var responseArr = response.split(',');
        console.log('');
        console.log('---MAIN--CONTENT---');
        console.log('');

        for (var i = 0; i < responseArr.length; i++) {

            if (responseArr[i] === 'movie-this') {
                movieThis(searchType);

            } else if (responseArr[i] === 'spotify-this-song') {
                spotifyTrack(searchType);

            } else if (responseArr[i] === 'concert-this') {
                concertThis(searchType);

            } else if (responseArr[i] === 'do-what-it-says') {
                doWhatItSays(searchType);
                console.log("LIRI doesn't know that!");

            }
        }
    })
}



