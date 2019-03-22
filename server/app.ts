import * as TwitterModule from './src/twitterModule'
import express from 'express';
import iosocket from 'socket.io';
import cors from 'cors';

const http = require("http")
const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
const server = http.createServer(app);
const io = iosocket(server)
const port = 3000;
const fUsers : any[] = [];
const fTweets : any[] = [];
io.on('connection', function (socket) {
    socket.emit('connection:favorites', {tweets: fTweets, users: fUsers})

    socket.on('autocomplete:users', (data: string) => {
        TwitterModule.get.users_search({q : data, count: 3}).then((data: any) => {
            const users = data.map((value: any) => {
                return TwitterModule.tool.jsonToUser(value)
            })
            socket.emit('autocomplete:users', users)
        })
    })
    socket.on('new search', (data) => {
        TwitterModule.stream.search(data, (event : Object) => {
            io.emit('new tweet', event)
        })
    })
    socket.on('user:data', (data) => {
        TwitterModule.get.user(data).then(user => {
            const nUser = TwitterModule.tool.jsonToUser(user);
            socket.emit('user:data', nUser);   
        })
    })
    socket.on('tweet:data', (data) => {

        TwitterModule.get.tweet(data).then((tweet) => {
            const nTweet = TwitterModule.tool.jsonToTweet(tweet);
            socket.emit('tweet:data', nTweet);
        })
    })
    socket.on('favorites:tweets:add', (tweet) => {
        fTweets.push(tweet);
        socket.broadcast.emit('favorites:tweets:add', tweet)
    })
    socket.on('favorites:tweets:remove', (tweet) => {
        fTweets.splice(fTweets.indexOf(tweet), 1)
        socket.broadcast.emit('favorites:tweets:remove', tweet)
    })
    socket.on('favorites:users:add', (user) => {
        fUsers.push(user);
        socket.broadcast.emit('favorites:users:add', user)
    })
    socket.on('favorites:users:remove', (user) => {
        fUsers.splice(fUsers.indexOf(user), 1);
        socket.broadcast.emit('favorites:users:remove', user)
    })
    socket.on('trends:data', (request?) => {
        TwitterModule.get.trends().then((trends: any) => {
            socket.emit('trends:data', trends[0].trends);
        })
    })
});


function init () {
    console.log('oui');
    
    TwitterModule.get.trends().then((data) => {
        console.log(data);
    })
}
// init();
server.listen(port, '0.0.0.0')