import { WebSocket } from 'ws';
import Message from '../../types/Message';
import ResponseMessage from './ResponseMessage';

export default class ServerMessage {
    message: Message;
    readonly clients: Map<any, any>;

    constructor(message: Message, clients: Map<any, any>) {
        this.message = message;
        this.clients = clients;
    }

    
    public get type(): string {
        return this.message.type;
    }

    respond(message: string) {
        const responseMessage: ResponseMessage = {
            type: 'ResponseMessage',
            requestId: this.message.requestId,
            message: message,
        };

        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(responseMessage));
            }
        });
    }
}
