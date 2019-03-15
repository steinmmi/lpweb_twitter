const streamService = require('./src/stream')
const app = require('express')()
const http = require('http').Server(app);
const io = require('socket.io')(http)
const port = 3000

io.on('connection', function (socket) {
    socket.on('new search', (s) => {
        console.log(s);

        streamService.streamSearch(s, (event) => {
            io.emit('new tweet', event)
        })
    })
});
streamService.streamSearch('gilets jaunes', (event) => {
    io.emit('new tweet', event)
})
http.listen(port, '0.0.0.0')