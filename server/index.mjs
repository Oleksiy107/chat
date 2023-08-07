import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import path, { dirname } from 'path'; 
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 5554;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicPath = new URL('public', `file://${__dirname}`).pathname


app.use(express.static(publicPath));

io.on('connection', socket => {
    socket.on('send name', username => {
        io.emit('send name', username);
    });

    socket.on('send message', chat => {
        io.emit('send message', chat);
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
