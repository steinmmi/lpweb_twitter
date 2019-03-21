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

io.on('connection', function (socket) {
    socket.on('autocomplete:users', (data: string) => {
        TwitterModule.get.users_search({q : data, count: 3}, ( err: any, data: []) => {
            const users = data.map((value) => {
                return TwitterModule.tool.jsonToUser(value)
            })
            io.emit('autocomplete:users', users)
        })
    })
    socket.on('new search', (data) => {
        console.log(data);

        TwitterModule.stream.search(data, (event : Object) => {
            io.emit('new tweet', event)
        })
    })

    socket.on('favorites:tweets:add', (tweet) => {
        socket.broadcast.emit('favorites:tweets:add', tweet)
    })
    socket.on('favorites:tweets:remove', (tweet) => {
        socket.broadcast.emit('favorites:tweets:remove', tweet)
    })
    socket.on('favorites:users:add', (user) => {
        socket.broadcast.emit('favorites:users:add', user)
    })
    socket.on('favorites:users:remove', (user) => {
        socket.broadcast.emit('favorites:users:remove', user)
    })
});


function init () {
    let data : StreamQuery = {
        q: '',
        res: true,
        rt: true,
        follow: '...'
    }
    TwitterModule.stream.search(data, (event : Object) => {
        io.emit('new tweet', event)
    })    
}
// init();
server.listen(port, '0.0.0.0')