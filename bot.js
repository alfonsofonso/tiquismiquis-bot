// need to use this OTHER twitter lib to post photos, sigh
var conf = require('./config.js');
var Twitter = require('node-twitter');
var twitterRestClient = new Twitter.RestClient(
  conf.consumer_key,
  conf.consumer_secret,
  conf.access_token,
  conf.access_token_secret
);

// Helper function
function cinvirtString(strIn) {
	var strOut;
	// Do things
	strOut = strIn;
	return strOut;
}

function listenToMasses() {
  var twitterStreamClient = new Twitter.StreamClient(
    conf.consumer_key,
    conf.consumer_secret,
    conf.access_token,
    conf.access_token_secret
  );

  if (twitterStreamClient.isRunning())
  {
    twitterStreamClient.stop();
  }

  twitterStreamClient.start(['@tiquismiquisbot']);

  twitterStreamClient.on('tweet', function(tweet) {
      console.log('A new request is on the way');
      // console.log(tweet);
      // postSarcasm(tweet.user.screen_name, tweet.id_str, tweet.text);
  });

  twitterStreamClient.on('close', function() {
      console.log('Connection closed.');
  });
  twitterStreamClient.on('end', function() {
      console.log('End of Line.');
  });
  twitterStreamClient.on('error', function(error) {
      console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
  });
}

// Main function
listenToMasses();

// Challenge 1
var strTest = '';
console.log(cinvirtString(strTest));
