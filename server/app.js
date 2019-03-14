const Twitter = require('twitter');
const config = require('./config.js');
const app = require('express')()
const http = require('http').Server(app);
const io = require('socket.io')(http)

const fs = require('fs')
const port = 3000

const twitter = new Twitter(config)
var params = {
    q: '#macron',
    count: 1,
    result_type: 'recent',
    lang: 'fr',
    tweet_mode: 'extended'
}

io.on('connection', function (socket) {
    console.log('a user connected');
});

twitter.get('search/tweets', params, function (err, data, response) {
    if (err) return err

})

var stream = twitter.stream('statuses/filter', {
    track: 'javascript'
});
stream.on('data', function (event) {
    console.log("oui");

    io.emit('new tweet', event)
});

http.listen(port, '0.0.0.0')