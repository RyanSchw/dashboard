export function filterMessage(message: MessageEvent, messageType: string[]): boolean {
    return messageType.includes(JSON.parse(message?.data ?? '{}').type);
}
