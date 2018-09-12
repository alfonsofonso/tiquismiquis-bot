// need to use this OTHER twitter lib to post photos, sigh
var conf = require('./config.js');
var Twitter = require('node-twitter');
var twitterRestClient = new Twitter.RestClient(
  conf.consumer_key,
  conf.consumer_secret,
  conf.access_token,
  conf.access_token_secret
);

var Twit = require('twit')
var T = new Twit({
  consumer_key:         conf.consumer_key,
  consumer_secret:      conf.consumer_secret,
  access_token:         conf.access_token,
  access_token_secret:  conf.access_token_secret
})

// Helper function
function cinvirtString(str) {
	return str.replace(/[AEOU]/g, 'I')
						.replace(/[aeou]/g, 'i')
						.replace(/[áéóú]/g, 'í')
						.replace(/[àèò]/g,  'ì');
}

// Get the tweet by Id using node-twitter to get the original tweet from 'in_reply_to_status_id_str'
function getParentTweet(statusIn) {
	T.get('statuses/show/:id', { id: statusIn },
		function (err, data, response) {
			if (!err) {
				// console.log(data);
				// console.log(cinvirtString(data.text));
				return data.text;
			}
		}
	);
}


// Main function to offer the service to people
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

  twitterStreamClient.start(['@istipidi']);

  twitterStreamClient.on('tweet', function(tweet) {
      console.log('A new request is on the way');
      console.log(tweet);
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

// Start listening to masses to offer our Sarcasm for free
 // listenToMasses();

// Challenge 2
// var Tid = '1035490030284881920';
// getParentTweet(Tid);

// Challenge 1
// var strTest = 'Hello Twitter! #myfirstTweet';
// console.log(strTest);
// console.log('---');
// console.log(cinvirtString(strTest));
