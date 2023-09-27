import Message from './Message';

export default interface HueMessage extends Message {
    type: 'HueMessage';

    light1Brightness: number;
}
