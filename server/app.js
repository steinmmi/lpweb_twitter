const Twitter = require('twitter');
const config = require('./config.js');

const twitter = new Twitter(config)
var params = {
    q: '#Lannion',
    count: 10,
    result_type: 'recent',
    lang: 'fr'
}

twitter.get('search/tweets', params, function (err, data, response) {
    if (!err) {
        for (tweet of data.statuses) {
            console.log(tweet.text);
        }
    } else {
        console.log(err);
    }
})