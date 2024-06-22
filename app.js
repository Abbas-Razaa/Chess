const express = require('express')
const http = require('http')
const socket = require('socket.io')
const { Chess } = require('chess.js')
const path = require('path')
const app = express()
const server = http.createServer(app)
const io = socket(server)

const chess = new Chess()
let players = {}
let currentPlayer = 'W';

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', { title : 'Chess Game' })
})

io.on('connection', function (uniquesocket) {
    console.log('Connected')

    // uniquesocket.on('disconnect', function () {
    //     console.log('Disconnected')
    // })

    if(!players.white){
        players.white = uniquesocket.id
        uniquesocket.emit('playerRole', 'w')
    } else if (!players.black){
        players.black = uniquesocket.id
        uniquesocket.emit('playerRole', 'b')
    } else {
        uniquesocket.emit('spectatorRole')
    }

    uniquesocket.on('disconnect', function(){
        if(uniquesocket.id === players.white){
            delete players.white
        }
        else if(uniquesocket.id === players.black){
            delete players.black
        }
    })
})

server.listen(3000, function () {
    console.log('Server running on port 3000')
})