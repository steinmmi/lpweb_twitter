const Twit = require('twit')
const config = require('../config.js');
const T = new Twit(config)
let stream

function streamSearch(str, _callback) {
    if (stream)
        stream.stop()
    stream = T.stream('statuses/filter', {
        track: str
    });

    stream.on('tweet', function (event) {
        _callback(event)
    });
}

module.exports = {
    streamSearch
}