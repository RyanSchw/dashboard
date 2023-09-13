export default class Message {
    // when a message is sent over the web socket it loses the type. write the type via string to know what to cast it back into
    readonly type: string;

    // add unique fingerprint to each communication for debugging and to track the status of requests
    readonly requestId: string;

    constructor(type: string) {
        this.type = type;
        this.requestId = crypto.randomUUID();
    }
}
