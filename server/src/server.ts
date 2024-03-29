import 'dotenv/config';
import { IS_DEV_MODE } from './config';

import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import sessionParser from './sessions/sessionParser';
import handleMessage from './router';
import AutomationsManager from './automations/AutomationsManager';

import { Request } from 'express';
import HueApp from './applets/HueApp';
import WeatherApp from './applets/WeatherApp';
import Message from '../../types/Message';
import ServerMessage from '../types/ServerMessage';
import ClientManager from '../types/ClientManager';

function onSocketError(err) {
    console.error(err);
}

const app = express();
const map = new Map();

/////
// instantiate all the singleton classes (communications, automations, etc)
/////
// set up class to manage all incoming/outgoing websocket messages
export const clientManager = new ClientManager(map);

// set up automations that run periodically
const automationsManager = new AutomationsManager(clientManager);

export const hueApp = new HueApp();
export const weatherApp = new WeatherApp();


/////
// set up base server
/////
app.use(sessionParser);

app.post('/login', function (req, res) {
    const id = crypto.randomUUID();

    req.session.userId = id;
    res.send({ result: 'OK', message: 'Session updated' });
});

app.delete('/logout', function (req, res) {
    const ws = map.get(req.session.userId);

    console.log(`Destroying session for user ${req.session.userId}`);
    req.session.destroy(function () {
        if (ws) ws.close();

        res.send({ result: 'OK', message: 'Session destroyed' });
    });
});

const server = createServer(app);
// detached from server so the server can still handle other requests
// clientTracking will be done manually based on session info
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', function (request, socket, head) {
    socket.on('error', onSocketError);

    // @ts-ignore https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js
    sessionParser(request, {}, () => {
        if (IS_DEV_MODE) {
            (request as Request).session.userId = request.headers['user_id'] as string ?? 'devuser';
        } else if (!(request as Request).session.userId) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        socket.removeListener('error', onSocketError);

        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function (ws, request) {
    const userId = (request as Request).session.userId;
    map.set(userId, ws);

    ws.on('error', console.error);

    ws.on('message', function (message) {
        try {
            console.log(`Received message ${message} from user ${userId}`);
            const messageWithType = JSON.parse(message.toString()) as Message;
            const serverMessage = new ServerMessage(messageWithType, clientManager);

            handleMessage(serverMessage);
        } catch (error) {
            console.error(error);
        }
    });

    ws.on('close', function () {
        map.delete(userId);
    });
});

export default server;
