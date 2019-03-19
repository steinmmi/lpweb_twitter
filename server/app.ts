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
    socket.on('new search', (data) => {
        console.log(data);

        TwitterModule.stream.search(data, (event : Object) => {
            io.emit('new tweet', event)
        })
    })
});


function init () {
    let data : StreamQuery = {
        q: 'Gilets jaunes',
        res: true,
        rt: true
    }
    TwitterModule.stream.search(data, (event : Object) => {
        console.log(JSON.stringify(event));
        
        io.emit('new tweet', event)
    })    
}
init();
server.listen(port, '0.0.0.0')