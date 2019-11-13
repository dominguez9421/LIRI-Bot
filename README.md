# LIRI-Bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


Expected Outcomes
The LIRI Bot was designed to produce search results based on the following commands:

node liri.js concert-this
node liri.js spotify-this-song
node liri.js movie-this
node liri.js do-what-it-says
Each command produced different search results as listed below:

node liri.js concert-this "artist/band name"

Name of venue
Venue location
Date of the event in MM/DD/YYYY format
node liri.js spotify-this-song "song/track name"

Artist
Song
Spotify song preview url
Album
node liri.js movie-this "movie title"

Title of the movie
Year the movie came out
IMDB Rating of the movie
Country where the movie was produced
Language of the movie
Plot of the movie
Actors in the movie
Rotten Tomatoes Rating of the movie
node liri.js do-what-it-says

Print the spotify results for "I want it that way" stored in the random.txt file
Code by Command
concert-this
This command used the Bands in Town Artist Events API. An axios.get sent the search request and the results were console.logged using moment to change the format of the returned date.

    

spotify-this-song
This command used the Spotify request API. A node-spotify-api spotify.request sent the search request and the results were console.logged.

movie-this
This command used the omdb API. An axios.get sent the search request and the results were console.logged.

do-what-it-says
This command pulled the spotify-this-song information from the local random.txt file.


Spotify API, Client ID & Client SECRET
The Spotify API requires developers to sign up and generate the necessary API credentials (client id and client secret):

Step One: Visit https://developer.spotify.com/my-applications/#!/
Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in
Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. When finished, click the "complete" button
Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
As a security precaution the Spotify Client ID & SECRET were stored on a local .env file and added to a local .gitignore file to avoid publishing the information.


![log-this](https://user-images.githubusercontent.com/54006976/68720877-60691280-0576-11ea-8665-96ae7a335cd7.gif)
![do-it](https://user-images.githubusercontent.com/54006976/68720887-63fc9980-0576-11ea-8a48-fa3bce95534f.gif)
![spotify](https://user-images.githubusercontent.com/54006976/68720892-65c65d00-0576-11ea-96d9-cdb6d57e3c28.gif)
![movie-this](https://user-images.githubusercontent.com/54006976/68720894-66f78a00-0576-11ea-9454-e3820e111933.gif)



Require & Local Linked files
LIRI required installation of several npm packages and links to local files.

require("dotenv").config();
var fs = require("fs");
var moment = require("moment");

var axios = require("axios");
var Spotify = require("node-spotify-api");

var spotifyKeyInfo = require("./keys.js");
