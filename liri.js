var fs = require ("fs");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var keys = require("./keys.js");


var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret
});

var spotifyFunction = function() {
	if (commandTwo === "undefined") {
			commandTwo = "The Sign"
		};
	spotify.search({ type: 'track', query: commandTwo}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview: " + data.tracks.items[0].preview_url);

});

}; 


var command = (process.argv[2]);
var commandTwo = (process.argv[3]);
console.log("this is command one: " + command);
console.log("this is command two: " + commandTwo);



if (command === "my-tweets" ) {

	var params = {screen_name: 'bootcamp_coding', count:5};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (x=0; x<tweets.length; x++) {
  		console.log(tweets[x].text);
  		console.log("-------------");
  }
  	}
    
  
});

};
else if (command === "spotify-this-song") {
	spotifyFunction();
};
else if (command === "movie-this") {
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

};
else {};