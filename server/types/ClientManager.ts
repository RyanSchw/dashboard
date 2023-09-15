import { WebSocket } from 'ws';
import Message from '../../types/Message';

export default class ClientManager {
    readonly clients: Map<any, any>;

    constructor(clients: Map<any, any>) {
        this.clients = clients;
    }

    broadcastMessage(message: Message) {
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
}
