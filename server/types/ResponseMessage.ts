import Message from '../../types/Message';

export default interface ResponseMessage extends Message {
    type: 'ResponseMessage';
    message: string;
}
