export function filterMessage(message: MessageEvent, messageType: string): boolean {
    return JSON.parse(message?.data ?? '{}').type === messageType;
}
