import Twit = require('twit')
import config = require('../config.json');
const T = new Twit(config)
let streamInstance: Twit.Stream


export module stream {
    export function search(data: StreamQuery, _callback: Function) {
        if (streamInstance)
            streamInstance.stop()

        console.log(data);
        
        streamInstance = T.stream('statuses/filter', {
            track: data['q'] || undefined,
            follow: data['follow'] || undefined
        });

        streamInstance.on('tweet', function (event) {
            const tweet = tool.jsonToTweet(event);
            if(!data.rt && tweet.isRetweet) return 0;
            if(!data.res && tweet.isReplying) return 0;
            _callback(tweet)
        });
    }
}

export module get {
    export function users_search(req: {
        q: string,
        page?: number,
        count?: number,
        include_entities?: boolean
    }) {
        return new Promise((resolve, reject) => {
            T.get('users/search', req, (err, data) => {
                if(err) reject();
                resolve(data)
            })
        })
    }

    export function search(q: string) {
        return new Promise((resolve, reject) => {
            T.get('search/tweets', {q: q, result_type: 'popular'}, (err, data) => {
                if(err) reject();
                resolve(data);
            })
        })
    }

    export function user(id: string) {
        return new Promise((resolve, reject) => {
            T.get('users/show', {user_id: id}, (err, data) => {
                if (err) reject()
                resolve(data)
            })
        })
        
    }

    export function tweet(id: string) {
        return new Promise((resolve, reject) => {
            T.get('statuses/show', {id: id}, (err, data) => {
                if(err) reject()
                resolve(data)
            })
        })
        
    }
    export function trends( id = '23424819') {
        return new Promise((resolve, reject) => {
            T.get('trends/place', {id:id}, (err, data) => {
                if(err) reject()
                resolve(data)
            })
        })
        
    }
}

export module tool {
    export function jsonToUser(json: any): User {
        let u: User;
        u = {
            description: json.description,
            followers: json.followers_count,
            friends: json.friends_count,
            id: json.id_str,
            name: json.name,
            url: json.url,
            screen_name: json.screen_name,
            profile_image: json.profile_image_url
        }
        return u;
    }
    
    export function jsonToTweet(json : any): Tweet {
        let t: Tweet
        t = {
            id: json.id,
            id_str: json.id_str,
            message: json.truncated && json.extended_tweet ? json.extended_tweet.full_text : json.text,
            isQuoting: json.is_quote_status ? json.quoted_status_id : false,
            isReplying: json.in_reply_to_user_id ? json.in_reply_to_status_id : false,
            isRetweet: json.retweeted_status ? json.retweeted_status : false,
            user: jsonToUser(json.user)
        }
        return t;
    }
}