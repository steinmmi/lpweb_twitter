import Twit = require('twit')
import config = require('../config.json');
const T = new Twit(config)
let streamInstance: Twit.Stream


export module stream {
    export function search(data: StreamQuery, _callback: Function) {
        if (streamInstance)
            streamInstance.stop()

        streamInstance = T.stream('statuses/filter', {
            track: data['q']
        });

        streamInstance.on('tweet', function (event) {
            _callback(event)
        });
    }
}