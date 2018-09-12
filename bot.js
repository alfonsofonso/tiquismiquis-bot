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

// function postSarcasm(tweet) {
// 	console.log(tweet);
// 	if (tweet.in_reply_to_user_id_str) {
// 		// Get the text from the parent tweet
// 		var text = getParentTweet(tweet.in_reply_to_user_id_str);
// 		text = cinvirtString(text);
// 		console.log(text);
// 	}
// }

// Get the tweet by Id using node-twitter to get the original tweet from 'in_reply_to_status_id_str'
function postSarcasm(tweet) {
	// Get parent tweet
	// var Tid = tweet.id;
	// console.log(tweet);
	T.get('statuses/show/:id', { id: tweet.in_reply_to_status_id_str },
		function (err, data, response) {
			if (!err) {
				console.log('Got parent data OK!');
				// console.log(data);
				// console.log(cinvirtString(data.text));
				var text = cinvirtString(data.text);
				var url = 'https://twitter.com/' + data.user.screen_name + '/status/' + data.id_str;
				// console.log(text);
				// console.log(url);
				// Post text via response
				T.post('statuses/update',
					{
						status: text + ' ' + url
						// status: '@' + data.user.screen_name + ' ' + text ,
						// in_reply_to_status_id: data.id_str
					}, function(err, data, response) {
						console.log('Tweet posted');
				  	// console.log(data);
				});
			} else {
				console.log('Error');
				console.log(err);
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
			// console.log(tweet);
      // console.log(tweet);
      postSarcasm(tweet);
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
 listenToMasses();

// Challenge 2
// var Tid = '1035490030284881920';
// getParentTweet(Tid);

// Challenge 1
// var strTest = 'Hello Twitter! #myfirstTweet';
// console.log(strTest);
// console.log('---');
// console.log(cinvirtString(strTest));
