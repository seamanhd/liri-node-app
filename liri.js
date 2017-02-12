//---------------------- NODE PACKAGES ---------------------

var fs = require ("fs");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var keys = require("./keys.js");

//------------------------GLOBAL VARIABLES ---------------

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret
});



var command = (process.argv[2]);
var commandTwo = (process.argv[3]);
//console.log("this is command one: " + command);
//console.log("this is command two: " + commandTwo);
console.log("LIRI is loading, thank you for your patience ...")

// -----------------------FUNCTIONS ---------------------------
var spotifyFunction = function() {
	if (commandTwo == undefined) {
			commandTwo = "The Sign by Ace of Base"	}
		
	spotify.search({ type: 'track', query: commandTwo}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	console.log("------------------------------------");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview: " + data.tracks.items[0].preview_url);
    console.log("------------------------------------");
});
}; 

var tweetFunction = function() {
	console.log("-------------------------");
	var params = {screen_name: 'bootcamp_coding', count:5};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (x=0; x<tweets.length; x++) {
  		console.log(tweets[x].user.name + " on " + tweets[x].created_at + ":  " + tweets[x].text);
  		console.log("-------------------------");
  }
  
  	}
});
}

var movieFunction = function() {
	if (commandTwo == undefined) {
		commandTwo = "Mr. Nobody";
	}
	var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  qs: 
   { include_adult: 'false',
     page: '1',
     language: 'en-US',
     api_key: 'c6d7513ae9923f11eae21eefb1a67b56',
     query: commandTwo },
  body: '{}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  var parsed = JSON.parse(body);
  var rating = Math.round(parsed.results[0].popularity);
  console.log("------------------------------------");
  console.log("TITLE: " + parsed.results[0].title);
  console.log("RELEASE DATE: " + parsed.results[0].release_date);
  console.log("POPULARITY (1-10): " + rating);
  console.log("ORIGINAL LANGUAGE (abbreviated): " + parsed.results[0].original_language);
  console.log("SUMMARY: " + parsed.results[0].overview);
   console.log("------------------------------------");
});
}

var textFileFunction = function() {
	fs.readFile('random.txt', "utf-8", (err, data) => {
  if (err) throw err;
  //console.log(data);
  var dataArr = data.split(",");

  
  //console.log(dataArr);
  command = dataArr[0];
  commandTwo = dataArr[1];
  spotifyFunction();
});
}

// ------------------------LIRI IN ACTION -------------------------------

if (command === "my-tweets" ) {
	tweetFunction ();

} else if (command === "spotify-this-song") {
	spotifyFunction();

} else if (command === "movie-this") {

	movieFunction();

} else if (command === "do-what-it-says") {
	textFileFunction();
} else {
	console.log("--------------------------------------------------")
	console.log("I don't recognize that command. Please try again!")
}


