const Twitter = require('twitter');
const config = require('./config.js');
const express = require('express')
const socket = require('socket.io')
const fs = require('fs')
const app = express()
const port = 3000

const twitter = new Twitter(config)
var params = {
    q: '#macron',
    count: 1,
    result_type: 'recent',
    lang: 'fr',
    tweet_mode: 'extended'
}

twitter.get('search/tweets', params, function (err, data, response) {
    if (err) return err

})

var stream = twitter.stream('statuses/filter', {
    track: 'javascript'
});
stream.on('data', function (event) {
    fs.writeFile('test.json', JSON.stringify(event, null, 4), () => {
        if (event.retweeted_status !== undefined) {
            console.log('File wrote');
        } else {
            console.log('Its not a RT');

        }
    });
});
app.listen(port, () => console.log(`Listening on port ${port}!`))