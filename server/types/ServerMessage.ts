import Message from '../../types/Message';
import ResponseMessage from './ResponseMessage';
import ClientManager from './ClientManager';

export default class ServerMessage {
    message: Message;
    readonly clientManager: ClientManager;

    constructor(message: Message, clientManager: ClientManager) {
        this.message = message;
        this.clientManager = clientManager;
    }

    
    public get type(): string {
        return this.message.type;
    }

    respond(message: Message | string) {
        if (typeof message === 'string') {
            const responseMessage: ResponseMessage = {
                type: 'ResponseMessage',
                requestId: this.message.requestId,
                message: message,
            };
    
            this.clientManager.broadcastMessage(responseMessage);
        } else {
            // might need to adjust requestId to reflect initial message requestId
            this.clientManager.broadcastMessage(message);
        }
    }
}
