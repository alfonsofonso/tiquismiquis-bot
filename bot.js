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
function cinvirtString(str) {
	return str.replace(/[AEOU]/g, 'I')
						.replace(/[aeou]/g, 'i')
						.replace(/[áéóú]/g, 'í')
						.replace(/[àèò]/g,  'ì');
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

  twitterStreamClient.start(['@tiquismiquisbot']);

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

// Challenge 1
var strTest = 'Se cumple un año del golpe a la democracia. El 6-7 de sept el separatismo silenció a la oposición y atropelló los derechos de millones de catalanes. Hoy, el Parlament está cerrado y siguen degradando la institución. No permitiremos que vuelvan a pisotear la democracia. Nunca más.';
console.log(strTest);
console.log('---');
console.log(cinvirtString(strTest));
